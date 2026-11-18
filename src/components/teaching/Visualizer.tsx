import { useState } from 'react'
import { StepForward, RotateCcw, Braces } from 'lucide-react'
import type { VisualSpec } from '../../types'

/** 编程思维可视化：把变量变化 / 循环执行 / 函数调用变成可点击的单步演示。 */
export function Visualizer({ spec }: { spec: VisualSpec }) {
  const steps = spec.steps || []
  const [idx, setIdx] = useState(0)
  const hasSteps = steps.length > 0

  if (spec.kind === 'function' && spec.calls && spec.calls.length) {
    return (
      <div className="surface p-4 space-y-3">
        <div className="flex items-center gap-2"><Braces size={18} className="text-pyblue-light" /><h3 className="section-title">{spec.title}</h3></div>
        <p className="text-sm muted">{spec.description}</p>
        <div className="space-y-2">
          {spec.calls.map((c, i) => (
            <div key={i} className="surface-soft p-3 flex items-center gap-3 font-mono text-[13px]">
              <span className="text-pyblue-light">调用</span>
              <span className="text-slate-100">{c.name}({c.args})</span>
              <span className="text-slate-500">→</span>
              <span className="text-pyyellow">返回 {c.returns}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!hasSteps) return null

  const step = steps[idx]
  return (
    <div className="surface p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="section-title flex items-center gap-2"><StepForward size={17} className="text-pyyellow" />{spec.title}</h3>
        <span className="chip border-white/10 muted font-mono">{idx + 1} / {steps.length}</span>
      </div>
      <p className="text-sm muted">{spec.description}</p>

      <div className="surface-soft p-4">
        <div className="font-mono text-sm text-slate-100 mb-3">{step.label}：{step.detail}</div>
        {step.state && step.state.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {step.state.map((v, i) => (
              <div key={i} className="rounded-lg bg-[#060b16] border border-white/[0.08] p-2.5">
                <div className="text-[11px] muted">{v.name}</div>
                <div className="font-mono text-sm text-pyyellow mt-1 truncate">{v.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button className="btn-ghost flex-1 py-2" onClick={() => setIdx((i) => (i - 1 + steps.length) % steps.length)}><RotateCcw size={15} />上一步</button>
        <button className="btn-primary flex-1 py-2" onClick={() => setIdx((i) => (i + 1) % steps.length)}>下一步<StepForward size={15} /></button>
      </div>
    </div>
  )
}
