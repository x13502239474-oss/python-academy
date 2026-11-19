import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target, RotateCcw, BookOpen, Trophy, Filter } from 'lucide-react'
import { questions, lessonMap } from '../data/courses'
import { stages } from '../data/stages'
import { useApp } from '../store/AppContext'
import { ExerciseCard } from '../components/teaching/ExerciseCard'
import { runPython } from '../lib/pyRunner'
import { accuracyOf } from '../lib/grader'
import type { Question, JudgeResult } from '../types'

export function Practice() {
  const navigate = useNavigate()
  const { state, recordAnswer } = useApp()
  const [tab, setTab] = useState<'quiz' | 'wrong'>('quiz')
  const [stageFilter, setStageFilter] = useState<number | 0>(0)
  const [current, setCurrent] = useState(0)

  const pool = stageFilter ? questions.filter((q) => q.stageId === stageFilter) : questions
  const q = pool[current % Math.max(pool.length, 1)]

  const dueWrong = Object.values(state.wrongBook)
    .filter((w) => !w.resolved)
    .sort((a, b) => a.nextReview - b.nextReview)

  const accuracy = accuracyOf(state.answers)

  const submit = (question: Question, answer: string, result: JudgeResult) => {
    recordAnswer(question.id, answer, result.correct, question.knowledgePoint)
  }

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">练习中心</h1>
        <p className="muted text-sm mt-1">做中学，错中记。共 {questions.length} 道题等你挑战。</p>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="surface-soft p-3 text-center">
          <div className="text-2xl font-bold text-pyblue-light tabular-nums">{state.answers.length}</div>
          <div className="text-[11px] muted mt-1">累计答题</div>
        </div>
        <div className="surface-soft p-3 text-center">
          <div className="text-2xl font-bold text-ok tabular-nums">{accuracy}%</div>
          <div className="text-[11px] muted mt-1">正确率</div>
        </div>
        <div className="surface-soft p-3 text-center">
          <div className="text-2xl font-bold text-danger tabular-nums">{dueWrong.length}</div>
          <div className="text-[11px] muted mt-1">错题待复习</div>
        </div>
      </div>

      {/* Tab */}
      <div className="flex gap-2 p-1 rounded-xl bg-white/[0.04]">
        <button onClick={() => setTab('quiz')} className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 ${tab === 'quiz' ? 'bg-white/[0.1] text-white' : 'muted'}`}><Trophy size={15} />闯关练习</button>
        <button onClick={() => setTab('wrong')} className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 ${tab === 'wrong' ? 'bg-white/[0.1] text-white' : 'muted'}`}><RotateCcw size={15} />错题本 {dueWrong.length > 0 && <span className="text-xs text-danger">·{dueWrong.length}</span>}</button>
      </div>

      {tab === 'quiz' && (
        <>
          {/* 阶段筛选 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <Filter size={15} className="text-slate-500 shrink-0" />
            <button onClick={() => { setStageFilter(0); setCurrent(0) }} className={`chip shrink-0 ${stageFilter === 0 ? 'border-pyblue text-pyblue-light bg-pyblue/10' : 'border-white/10 muted'}`}>全部</button>
            {stages.map((s) => (
              <button key={s.id} onClick={() => { setStageFilter(s.id); setCurrent(0) }} className={`chip shrink-0 ${stageFilter === s.id ? 'border-pyblue text-pyblue-light bg-pyblue/10' : 'border-white/10 muted'}`}>阶段{s.id}</button>
            ))}
          </div>
          {q && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs muted">第 {current + 1} / {pool.length} 题 · {lessonMap.get(q.lessonId)?.title}</span>
                <button onClick={() => navigate(`/lesson/${q.lessonId}`)} className="flex items-center gap-1 text-xs text-pyblue-light"><BookOpen size={13} />回看课程</button>
              </div>
              <ExerciseCard key={q.id} question={q} onSubmit={submit} runProgram={runPython} />
              <div className="flex gap-2">
                <button className="btn-ghost flex-1 py-2.5" onClick={() => setCurrent((c) => (c - 1 + pool.length) % pool.length)}>上一题</button>
                <button className="btn-ghost flex-1 py-2.5" onClick={() => setCurrent((c) => (c + 1) % pool.length)}>下一题</button>
              </div>
            </>
          )}
        </>
      )}

      {tab === 'wrong' && (
        <>
          {dueWrong.length === 0 ? (
            <div className="surface p-8 text-center">
              <Target size={36} className="text-ok mx-auto mb-3" />
              <p className="font-medium">错题本是空的</p>
              <p className="muted text-sm mt-1">要么你还没开始做题，要么都答对了——继续保持！</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs muted">按复习时间排序。答对后会自动移出错题本，间隔逐次拉长（1/2/4/7/15 天）。</p>
              {dueWrong.map((w, i) => {
                const question = questions.find((qq) => qq.id === w.questionId)
                if (!question) return null
                return (
                  <div key={w.questionId}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="chip border-danger/30 text-danger text-[10px]">错 {w.wrongCount} 次</span>
                      <span className="text-[11px] muted">{lessonMap.get(question.lessonId)?.title}</span>
                    </div>
                    <ExerciseCard key={`${w.questionId}-${i}`} question={question} onSubmit={submit} runProgram={runPython} />
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
