/// <reference lib="webworker" />

/**
 * Pyodide 运行环境，独立于主页面（Module Worker）。
 * - 本地托管运行时（public/pyodide），离线可用，不依赖外部 CDN
 * - ESM 动态 import（module worker 里 importScripts 不可用）
 * - 捕获 stdout / stderr
 * - sys.settrace 协作式超时检测，限制死循环
 * - 用户代码只能用 Python 标准库，不接触 DOM
 */

// Vite 的 base 在 worker 里通过 import.meta.env.BASE_URL 获取
const BASE_URL = (import.meta.env.BASE_URL as string) || '/'
const PYODIDE_BASE = `${BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/'}pyodide/`

type InMsg = { type: 'run'; code: string; jobId: number; timeoutMs: number }

let pyodide: any = null
let loading: Promise<any> | null = null

function loadPyodideRuntime() {
  if (pyodide) return Promise.resolve(pyodide)
  if (loading) return loading
  loading = (async () => {
    try {
      // @ts-ignore - module worker 用动态 import 加载 ESM 版 Pyodide（本地托管）
      const mod = await import(/* @vite-ignore */ `${PYODIDE_BASE}pyodide.mjs`)
      const p = await mod.loadPyodide({ indexURL: PYODIDE_BASE })
      pyodide = p
      self.postMessage({ type: 'ready' })
      return p
    } catch (err: any) {
      self.postMessage({ type: 'load-error', message: String(err?.message || err) })
      throw err
    }
  })()
  return loading
}

// Worker 一创建就预加载 Python，页面打开即就绪（不必等用户点运行）
loadPyodideRuntime().catch(() => {})

self.onmessage = async (e: MessageEvent<InMsg>) => {
  const { type, code, jobId, timeoutMs } = e.data
  if (type !== 'run') return

  try {
    const p = await loadPyodideRuntime()
    p.globals.set('__pa_deadline', (Date.now() + timeoutMs) / 1000)

    const program = `
import sys, io, time, traceback

_out = io.StringIO()
_err = io.StringIO()
sys.stdout = _out
sys.stderr = _err

def _pa_input(*a, **k):
    raise RuntimeError('浏览器环境不支持 input()，请改用变量直接赋值。')
_builtins = __import__('builtins')
_builtins_input = _builtins.input
_builtins.input = _pa_input

def _pa_guard(frame, event, arg):
    if event == 'line' and time.time() > __pa_deadline:
        raise TimeoutError('执行超时：可能存在死循环，已自动停止（限制 5 秒）。')
    return _pa_guard

_user_code = ${JSON.stringify(code)}
sys.settrace(_pa_guard)
try:
    exec(compile(_user_code, '<string>', 'exec'), globals())
except TimeoutError as _te:
    _err.write(str(_te) + '\\n')
except BaseException:
    _err.write(traceback.format_exc())
finally:
    sys.settrace(None)
    _builtins.input = _builtins_input
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__

(_out.getvalue(), _err.getvalue())
`
    const result = await p.runPythonAsync(program)
    const stdout = result.get(0) ?? ''
    const stderr = result.get(1) ?? ''
    result.destroy()
    self.postMessage({ type: 'result', jobId, stdout: String(stdout), stderr: String(stderr) })
  } catch (err: any) {
    self.postMessage({ type: 'result', jobId, stdout: '', stderr: String(err?.message || err) })
  }
}
