import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Network, Check, Lock, ArrowRight, GitBranch } from 'lucide-react'
import { knowledgeNodes, nodeMap, type MapNode } from '../data/knowledgeMap'
import { useApp } from '../store/AppContext'
import { stageMap } from '../data/stages'

export function KnowledgeMap() {
  const navigate = useNavigate()
  const { state } = useApp()
  const [selected, setSelected] = useState<MapNode | null>(null)

  const isDone = (n: MapNode) => !!state.lessonProgress[n.lessonId]?.completed
  const maxLevel = Math.max(...knowledgeNodes.map((n) => n.level))

  const depsDone = (n: MapNode) => n.deps.every((d) => {
    const node = nodeMap.get(d)
    return node && isDone(node)
  })

  const downstream = selected ? knowledgeNodes.filter((n) => n.deps.includes(selected.id)) : []

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Network className="text-pyblue-light" size={24} />Python 知识地图</h1>
        <p className="muted text-sm mt-1">知识点不是孤岛。看清它们的依赖，学起来更有章法。</p>
      </div>

      <div className="surface-soft p-3 flex items-center gap-4 text-[11px] muted">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-ok" />已掌握</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" />未学习</span>
        <span className="flex items-center gap-1.5"><GitBranch size={13} />连线 = 前置依赖</span>
      </div>

      {/* 可横向滚动的分层地图 */}
      <div className="surface p-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max pb-2">
          {Array.from({ length: maxLevel + 1 }, (_, level) => {
            const nodes = knowledgeNodes.filter((n) => n.level === level)
            return (
              <div key={level} className="flex flex-col gap-3 justify-center" style={{ minWidth: 150 }}>
                <div className="text-[10px] muted text-center">阶段 {level + 1}</div>
                {nodes.map((n) => {
                  const done = isDone(n)
                  const unlocked = depsDone(n)
                  const stage = stageMap.get(n.stageId)
                  return (
                    <button
                      key={n.id}
                      onClick={() => setSelected(n)}
                      className={`relative w-[150px] text-left rounded-xl border p-3 transition hover:scale-[1.02] ${selected?.id === n.id ? 'border-pyblue bg-pyblue/15' : done ? 'border-ok/40 bg-ok/[0.08]' : unlocked ? 'border-white/[0.12] bg-white/[0.04]' : 'border-white/[0.06] bg-white/[0.02] opacity-60'}`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${stage?.color}22`, color: stage?.color }}>
                          {done ? <Check size={14} /> : unlocked ? <ArrowRight size={13} /> : <Lock size={12} />}
                        </span>
                        <span className="w-2 h-2 rounded-full" style={{ background: done ? '#4fb286' : unlocked ? '#64748b' : '#334155' }} />
                      </div>
                      <div className="text-[13px] font-medium text-slate-100 leading-tight">{n.label}</div>
                      <div className="text-[10px] muted mt-1">{n.deps.length ? `前置 ${n.deps.length} 项` : '起点'}</div>
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* 节点详情 */}
      {selected && (
        <div className="surface p-5 animate-fade-up">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="chip" style={{ borderColor: `${stageMap.get(selected.stageId)?.color}55`, color: stageMap.get(selected.stageId)?.color }}>
                  {stageMap.get(selected.stageId)?.title}
                </span>
                {isDone(selected) && <span className="chip border-ok/40 text-ok"><Check size={12} />已掌握</span>}
              </div>
              <h2 className="text-xl font-bold">{selected.label}</h2>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mt-3">{selected.desc}</p>

          {selected.deps.length > 0 && (
            <div className="mt-4">
              <div className="text-xs muted mb-2">需要先掌握</div>
              <div className="flex flex-wrap gap-2">
                {selected.deps.map((d) => {
                  const node = nodeMap.get(d)
                  if (!node) return null
                  const ok = isDone(node)
                  return (
                    <span key={d} className={`chip ${ok ? 'border-ok/30 text-ok' : 'border-white/10 muted'}`}>
                      {ok ? <Check size={12} /> : <Lock size={11} />}{node.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {downstream.length > 0 && (
            <div className="mt-4">
              <div className="text-xs muted mb-2">学完可以通往</div>
              <div className="flex flex-wrap gap-2">
                {downstream.map((n) => <span key={n.id} className="chip border-pyblue/30 text-pyblue-light">{n.label}</span>)}
              </div>
            </div>
          )}

          <button className="btn-primary mt-5 w-full py-3" onClick={() => navigate(`/lesson/${selected.lessonId}`)}>
            前往课程：{knowledgeNodes.find((n) => n.lessonId === selected.lessonId)?.label}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
