import { useState } from 'react'
import { CheckCircle2, XCircle, Lightbulb, Send, RotateCcw } from 'lucide-react'
import type { Question, JudgeResult } from '../../types'
import { highlightPython } from '../../lib/highlight'

interface Props {
  question: Question
  onSubmit: (q: Question, answer: string, result: JudgeResult) => void
  /** 编程题运行环境：给定代码返回输出 */
  runProgram?: (code: string) => Promise<{ stdout: string; stderr: string }>
}

export function ExerciseCard({ question: q, onSubmit, runProgram }: Props) {
  const [answer, setAnswer] = useState('')
  const [multi, setMulti] = useState<string[]>([])
  const [result, setResult] = useState<JudgeResult | null>(null)
  const [programOut, setProgramOut] = useState('')
  const [showDetail, setShowDetail] = useState(false)

  const toggleMulti = (opt: string) => {
    setMulti((m) => m.includes(opt) ? m.filter((x) => x !== opt) : [...m, opt])
  }

  const judgeNow = async (judgeFn: (answer: string, programOutput?: string) => JudgeResult) => {
    if (q.qtype === 'program' && runProgram) {
      const out = await runProgram(answer)
      setProgramOut(out.stdout + (out.stderr ? '\n' + out.stderr : ''))
      const r = judgeFn(answer, out.stdout)
      setResult(r)
      onSubmit(q, answer, r)
    } else {
      const finalAnswer = q.qtype === 'multiple' ? multi.join(',') : answer
      const r = judgeFn(finalAnswer)
      setResult(r)
      onSubmit(q, finalAnswer, r)
    }
  }

  // 延迟导入 judge，避免循环依赖
  const doJudge = async () => {
    const { judge } = await import('../../lib/grader')
    await judgeNow((a, po) => judge(q, a, po))
  }

  const options = q.options || []

  return (
    <div className="surface p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="text-[13px] leading-relaxed text-slate-200 whitespace-pre-wrap">{q.stem}</div>
        <span className="chip border-white/10 text-slate-400 shrink-0 text-[10px]">{q.qtype === 'program' ? '编程' : q.qtype === 'predict' ? '预测' : q.qtype === 'debug' ? '排错' : q.qtype === 'blank' ? '填空' : q.qtype === 'boolean' ? '判断' : q.qtype === 'multiple' ? '多选' : '单选'}</span>
      </div>

      {q.code && (
        <pre className="rounded-lg bg-[#060b16] border border-white/[0.08] p-3 text-[12px] leading-5 overflow-x-auto m-0"><code className="font-mono text-slate-200">{highlightPython(q.code)}</code></pre>
      )}

      {(q.qtype === 'single' || q.qtype === 'multiple') && (
        <div className="space-y-2">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => q.qtype === 'multiple' ? toggleMulti(opt[0] || opt) : setAnswer(opt[0] || opt)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition ${q.qtype === 'multiple' ? (multi.includes(opt[0] || opt) ? 'border-pyblue bg-pyblue/15 text-white' : 'border-white/[0.08] bg-white/[0.03]') : (answer === (opt[0] || opt) ? 'border-pyblue bg-pyblue/15 text-white' : 'border-white/[0.08] bg-white/[0.03]')}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {q.qtype === 'boolean' && (
        <div className="flex gap-2">
          {['对', '错'].map((v) => (
            <button key={v} onClick={() => setAnswer(v)} className={`flex-1 py-2.5 rounded-xl border text-sm ${answer === v ? 'border-pyblue bg-pyblue/15 text-white' : 'border-white/[0.08] bg-white/[0.03]'}`}>{v}</button>
          ))}
        </div>
      )}

      {(q.qtype === 'blank' || q.qtype === 'predict' || q.qtype === 'code-complete' || q.qtype === 'debug') && (
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={q.qtype === 'blank' ? '填入你的答案…' : '写出你的答案…'}
          className="w-full rounded-xl bg-[#060b16] border border-white/[0.1] px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-pyblue"
        />
      )}

      {q.qtype === 'program' && (
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="在这里编写你的 Python 代码，然后点击提交（自动运行测试用例）…"
          rows={6}
          className="code-editor w-full rounded-xl bg-[#060b16] border border-white/[0.1] p-3 text-[13px] text-slate-100 font-mono outline-none focus:border-pyblue resize-y"
          spellCheck={false}
        />
      )}

      {!result && (
        <button className="btn-primary w-full py-2.5" onClick={doJudge}><Send size={16} />提交判题</button>
      )}

      {result && (
        <div className={`rounded-xl p-3 border ${result.correct ? 'border-ok/30 bg-ok/[0.08]' : 'border-danger/30 bg-danger/[0.08]'}`}>
          <div className={`flex items-center gap-2 font-medium text-sm ${result.correct ? 'text-ok' : 'text-danger'}`}>
            {result.correct ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
            {result.correct ? '回答正确！' : '还差一点'}
            <span className="ml-auto text-xs font-mono">{Math.round(result.score * 100)}%</span>
          </div>
          {programOut && <pre className="mt-2 text-[11px] text-slate-400 whitespace-pre-wrap font-mono">输出：{programOut.trim()}</pre>}
          <button onClick={() => setShowDetail((s) => !s)} className="mt-2 flex items-center gap-1.5 text-xs text-pyblue-light"><Lightbulb size={14} />{showDetail ? '收起解析' : '查看解析'}</button>
          {showDetail && <p className="mt-2 text-[13px] text-slate-300 leading-relaxed">{result.feedback}</p>}
          {!result.correct && (
            <button onClick={() => { setResult(null); setAnswer(''); setMulti([]); setProgramOut('') }} className="mt-3 flex items-center gap-1.5 text-xs muted hover:text-slate-200"><RotateCcw size={13} />再试一次</button>
          )}
        </div>
      )}
    </div>
  )
}
