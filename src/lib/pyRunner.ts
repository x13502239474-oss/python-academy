/**
 * 共享的浏览器端 Python 运行器（单例 Worker）。
 * 课程页的编程题、练习题页都走这里，避免每次都新建 Worker 重新加载 Pyodide。
 * 页面可见的代码实验室仍使用自己的 Worker 实例，互不干扰。
 */

export interface RunResult {
  stdout: string
  stderr: string
}

let worker: Worker | null = null
let seq = 0
const pending = new Map<number, (r: RunResult) => void>()

function settleAll(message: string) {
  pending.forEach((resolve) => resolve({ stdout: '', stderr: message }))
  pending.clear()
}

function ensureWorker(): Worker {
  if (worker) return worker
  const w = new Worker(new URL('../workers/pyodide.worker.ts', import.meta.url), { type: 'module' })
  w.onmessage = (e: MessageEvent) => {
    const data = e.data || {}
    if (data.type === 'result') {
      const cb = pending.get(data.jobId)
      if (cb) {
        pending.delete(data.jobId)
        cb({ stdout: data.stdout || '', stderr: data.stderr || '' })
      }
    } else if (data.type === 'load-error') {
      settleAll('Python 运行时加载失败：' + (data.message || '未知原因'))
    }
  }
  w.onerror = () => settleAll('Python 运行环境启动失败，请刷新页面重试。')
  worker = w
  return w
}

/** 运行一段 Python 代码，返回标准输出与错误输出 */
export function runPython(code: string, timeoutMs = 5000): Promise<RunResult> {
  const w = ensureWorker()
  const jobId = ++seq
  return new Promise<RunResult>((resolve) => {
    pending.set(jobId, resolve)
    w.postMessage({ type: 'run', code, jobId, timeoutMs })
    // 兜底：Worker 内部已有超时保护，这里再兜一层，避免 Promise 永远不落地
    window.setTimeout(() => {
      const cb = pending.get(jobId)
      if (cb) {
        pending.delete(jobId)
        cb({ stdout: '', stderr: `运行超时（超过 ${Math.round(timeoutMs / 1000)} 秒），请检查是否有死循环。` })
      }
    }, timeoutMs + 8000)
  })
}
