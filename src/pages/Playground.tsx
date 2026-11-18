import { useEffect, useRef, useState } from 'react'
import { Play, RotateCcw, Copy, Save, Check, Loader2, Terminal, Info, BookOpen } from 'lucide-react'
import { CodeEditor } from '../components/editor/CodeEditor'
import { useApp } from '../store/AppContext'

const DEFAULT_CODE = `# 欢迎来到 Python 实验室！
# 点【运行】看看会发生什么

name = "程序员"
print(f"你好，{name}！")

for i in range(1, 4):
    print(f"第 {i} 次循环")`

export function Playground({ initialCode, draftKey }: { initialCode?: string; draftKey?: string } = {}) {
  const { state, saveCodeDraft } = useApp()
  const storageKey = draftKey || '__free__'
  const [code, setCode] = useState<string>(() => initialCode ?? state.codeDrafts[storageKey] ?? DEFAULT_CODE)
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [running, setRunning] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const workerRef = useRef<Worker | null>(null)
  const jobRef = useRef(0)
  const readyResolve = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (initialCode !== undefined) setCode(initialCode)
  }, [initialCode])

  useEffect(() => {
    const worker = new Worker(new URL('../workers/pyodide.worker.ts', import.meta.url), { type: 'module' })
    workerRef.current = worker
    worker.onmessage = (e) => {
      if (e.data.type === 'result') {
        setStdout(e.data.stdout || '')
        setStderr(e.data.stderr || '')
        setRunning(false)
      } else if (e.data.type === 'ready') {
        setLoaded(true)
        readyResolve.current?.()
      } else if (e.data.type === 'load-error') {
        setStderr('Python 运行时加载失败：' + e.data.message)
        setRunning(false)
      }
    }
    return () => worker.terminate()
  }, [])

  const run = () => {
    setRunning(true)
    setStdout('')
    setStderr('')
    const jobId = ++jobRef.current
    workerRef.current?.postMessage({ type: 'run', code, jobId, timeoutMs: 5000 })
  }

  const clear = () => {
    setCode('')
    setStdout('')
    setStderr('')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const save = () => {
    saveCodeDraft(storageKey, code)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Terminal className="text-pyyellow" size={26} /> Python 实验室</h1>
          <p className="muted text-sm mt-1">写代码 · 点运行 · 看结果，每一步都算数。</p>
        </div>
        <span className={`chip mt-1 shrink-0 ${loaded ? 'border-ok/40 text-ok' : 'border-white/10 text-slate-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${loaded ? 'bg-ok' : 'bg-slate-500'}`} />
          {loaded ? 'Python 就绪' : '正在加载 Python…'}
        </span>
      </div>

      {/* 编辑器 */}
      <div className="surface overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2 text-xs muted">
            <span className="w-2 h-2 rounded-full bg-[#e5685f]" />
            <span className="w-2 h-2 rounded-full bg-[#ffd43b]" />
            <span className="w-2 h-2 rounded-full bg-[#4fb286]" />
            <span className="ml-2 font-mono">main.py</span>
          </div>
          <span className="text-[11px] text-slate-500">横向滑动查看长代码</span>
        </div>
        <div className="p-3">
          <CodeEditor value={code} onChange={setCode} />
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="grid grid-cols-4 gap-2">
        <button className="btn-primary col-span-1" onClick={run} disabled={running} aria-label={running ? '运行中' : '运行'} title="运行">
          {running ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
          <span className="hidden sm:inline">{running ? '运行中' : '运行'}</span>
        </button>
        <button className="btn-ghost" onClick={clear} aria-label="清空" title="清空"><RotateCcw size={18} /><span className="hidden sm:inline">清空</span></button>
        <button className="btn-ghost" onClick={copy} aria-label={copied ? '已复制' : '复制'} title="复制">{copied ? <Check size={18} className="text-ok" /> : <Copy size={18} />}<span className="hidden sm:inline">{copied ? '已复制' : '复制'}</span></button>
        <button className="btn-ghost" onClick={save} aria-label={saved ? '已保存' : '保存'} title="保存">{saved ? <Check size={18} className="text-ok" /> : <Save size={18} />}<span className="hidden sm:inline">{saved ? '已保存' : '保存'}</span></button>
      </div>

      {/* 输出区 */}
      <div className="surface overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="section-title">运行结果</span>
          {stderr && <span className="chip border-danger/40 text-danger">有错误</span>}
        </div>
        <div className="p-4 min-h-[140px] font-mono text-[13px] leading-6">
          {!stdout && !stderr && <p className="text-slate-600">运行后，程序的输出会显示在这里…</p>}
          {stdout && <pre data-testid="py-stdout" className="whitespace-pre-wrap break-words text-slate-200 m-0">{stdout}</pre>}
          {stderr && <pre data-testid="py-stderr" className="whitespace-pre-wrap break-words text-danger mt-2 m-0">{stderr}</pre>}
        </div>
      </div>

      {/* 双模式说明 */}
      <div className="surface-soft p-4 flex gap-3">
        <Info size={18} className="text-pyblue-light shrink-0 mt-0.5" />
        <div className="text-[13px] text-slate-400 leading-relaxed space-y-2">
          <p><strong className="text-slate-200">学习模式（当前）</strong>：浏览器里通过 Pyodide 运行，支持 Python 标准库，适合学语法、练逻辑。有 5 秒执行保护，防止死循环卡住。</p>
          <p><strong className="text-slate-200">实战模式</strong>：文件整理、Excel、PDF 等需要读写本地真实文件，浏览器出于安全无法做到。这些课程会标注 🖥️，并附 Windows + VS Code 完整配置教程。</p>
          <p className="flex items-center gap-1.5 text-pyblue-light"><BookOpen size={14} /> 不支持 input() 输入，请用变量直接赋值来练习。</p>
        </div>
      </div>
    </div>
  )
}
