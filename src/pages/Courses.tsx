import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock, Clock, ChevronDown, Laptop2, Smartphone } from 'lucide-react'
import { stages } from '../data/stages'
import { lessons, lessonMap } from '../data/courses'
import { useApp } from '../store/AppContext'
import { StageIcon } from '../components/ui/StageIcon'

export function Courses() {
  const navigate = useNavigate()
  const { state } = useApp()
  const [openStage, setOpenStage] = useState<number | null>(1)

  // 判断课程是否解锁：第一阶段全开；后续阶段需前一阶段完成 60%
  const stageUnlocked = (stageId: number) => {
    if (stageId === 1) return true
    const prev = stages.find((s) => s.id === stageId - 1)
    if (!prev) return true
    const done = prev.courseIds.filter((id) => state.lessonProgress[id]?.completed).length
    return done / prev.courseIds.length >= 0.6
  }

  const totalDone = Object.values(state.lessonProgress).filter((p) => p.completed).length

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">课程体系</h1>
        <p className="muted text-sm mt-1">八阶段循序渐进 · {lessons.length} 节课 · 已完成 {totalDone} 节</p>
      </div>

      <div className="space-y-3">
        {stages.map((stage) => {
          const unlocked = stageUnlocked(stage.id)
          const done = stage.courseIds.filter((id) => state.lessonProgress[id]?.completed).length
          const pct = Math.round((done / stage.courseIds.length) * 100)
          const isOpen = openStage === stage.id
          return (
            <div key={stage.id} className={`surface overflow-hidden ${!unlocked ? 'opacity-70' : ''}`}>
              <button
                className="w-full flex items-center gap-3 p-4 text-left"
                onClick={() => setOpenStage(isOpen ? null : stage.id)}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${stage.color}1f`, color: stage.color }}>
                  <StageIcon name={stage.icon} size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">阶段 {stage.id}</span>
                    {!unlocked && <Lock size={12} className="text-slate-500" />}
                  </div>
                  <h2 className="font-semibold text-slate-100 truncate">{stage.title}</h2>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1 flex-1 rounded-full bg-white/[0.07] overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: stage.color }} />
                    </div>
                    <span className="text-[11px] muted tabular-nums">{done}/{stage.courseIds.length}</span>
                  </div>
                </div>
                <ChevronDown size={18} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="border-t border-white/[0.06] px-3 pb-3 pt-2 space-y-1">
                  <p className="text-xs muted px-2 pb-2 leading-relaxed">{stage.description}</p>
                  {stage.courseIds.map((cid) => {
                    const lesson = lessonMap.get(cid)
                    if (!lesson) return null
                    const completed = state.lessonProgress[cid]?.completed
                    return (
                      <button
                        key={cid}
                        onClick={() => unlocked && navigate(`/lesson/${cid}`)}
                        disabled={!unlocked}
                        className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.05] transition text-left disabled:cursor-not-allowed"
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono ${completed ? 'bg-ok/20 text-ok' : 'bg-white/[0.06] text-slate-400'}`}>
                          {completed ? <Check size={15} /> : String(lesson.order).padStart(2, '0')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-slate-200 truncate">{lesson.title}</div>
                          <div className="text-[11px] muted truncate">{lesson.subtitle}</div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`chip py-0.5 ${lesson.env === 'browser' ? 'border-pyblue/30 text-pyblue-light' : 'border-pyyellow/30 text-pyyellow'}`}>
                            {lesson.env === 'browser' ? <Smartphone size={11} /> : <Laptop2 size={11} />}
                          </span>
                          <span className="text-[11px] muted flex items-center gap-1"><Clock size={11} />{lesson.minutes}′</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
