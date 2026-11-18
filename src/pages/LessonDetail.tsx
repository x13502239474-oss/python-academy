import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Check, Target, Lightbulb, Code2, ListChecks, NotebookPen,
  Sparkles, ChevronRight, Star, BookCopy, Play, AlertTriangle, FlaskConical,
} from 'lucide-react'
import { getLesson, lessons, questionMap } from '../data/courses'
import { stageMap } from '../data/stages'
import { useApp } from '../store/AppContext'
import { Markdown } from '../components/ui/Markdown'
import { highlightPython } from '../lib/highlight'
import { Visualizer } from '../components/teaching/Visualizer'
import { ExerciseCard } from '../components/teaching/ExerciseCard'
import type { JudgeResult, Question } from '../types'

export function LessonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, completeLesson, recordAnswer, addNote, toggleFavorite } = useApp()
  const lesson = id ? getLesson(id) : undefined
  const [noteText, setNoteText] = useState('')
  const [showNote, setShowNote] = useState(false)

  if (!lesson) {
    return <div className="surface p-8 text-center muted">课程不存在。<button className="text-pyblue-light mt-3" onClick={() => navigate('/courses')}>返回课程</button></div>
  }

  const stage = stageMap.get(lesson.stageId)
  const completed = state.lessonProgress[lesson.id]?.completed
  const favorited = state.favorites.some((f) => f.lessonId === lesson.id)
  const idx = lessons.findIndex((l) => l.id === lesson.id)
  const prev = lessons[idx - 1]
  const next = lessons[idx + 1]
  const notes = state.notes.filter((n) => n.lessonId === lesson.id)

  const handleAnswer = (q: Question, answer: string, result: JudgeResult) => {
    recordAnswer(q.id, answer, result.correct, q.knowledgePoint)
  }

  const runInLab = (code: string) => {
    sessionStorage.setItem('pa-lab-code', code)
    navigate('/lab')
  }

  return (
    <div className="space-y-5 animate-fade-up pb-4">
      <button onClick={() => navigate('/courses')} className="flex items-center gap-1.5 text-sm muted hover:text-slate-200"><ArrowLeft size={16} />返回课程</button>

      {/* 头部 */}
      <div className="surface p-5 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 blur-2xl" style={{ background: stage?.color }} />
        <div className="flex items-center gap-2 mb-3">
          <span className="chip" style={{ borderColor: `${stage?.color}55`, color: stage?.color }}>阶段 {stage?.id} · {stage?.title}</span>
          <span className="chip border-white/10 muted">{lesson.minutes} 分钟</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="muted text-sm mt-1">{lesson.subtitle}</p>
          </div>
          <button onClick={() => toggleFavorite(lesson.id)} className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border ${favorited ? 'border-pyyellow/50 bg-pyyellow/10' : 'border-white/10 bg-white/[0.04]'}`}>
            <Star size={18} className={favorited ? 'text-pyyellow fill-pyyellow' : 'text-slate-400'} />
          </button>
        </div>
        {lesson.env === 'local' && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-pyyellow/30 bg-pyyellow/[0.07] p-3 text-[13px] text-pyyellow/90">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>本课需要 <strong>Windows + VS Code 本地环境</strong>（文件 / Excel / PDF 等操作浏览器做不到），教程已在正文给出。</span>
          </div>
        )}
      </div>

      {/* 生活化导入 */}
      <div className="surface-soft p-4 border-l-2 border-l-pyyellow">
        <div className="flex items-center gap-2 text-pyyellow text-sm font-medium mb-2"><Sparkles size={16} />先想一个问题</div>
        <p className="text-[15px] text-slate-200 leading-relaxed">{lesson.hook}</p>
      </div>

      {/* 学习目标 */}
      <div className="surface p-4">
        <div className="flex items-center gap-2 mb-3"><Target size={18} className="text-pyblue-light" /><h3 className="section-title">学完这节，你能</h3></div>
        <ul className="space-y-2">
          {lesson.objectives.map((o, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300"><Check size={16} className="text-ok shrink-0 mt-0.5" />{o}</li>
          ))}
        </ul>
      </div>

      {/* 大白话比喻 */}
      {lesson.analogy && (
        <div className="surface p-4 flex gap-3">
          <div className="w-9 h-9 rounded-xl bg-pyblue/15 flex items-center justify-center shrink-0"><Lightbulb size={18} className="text-pyblue-light" /></div>
          <div>
            <h3 className="section-title mb-1.5">用生活的话说</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{lesson.analogy}</p>
          </div>
        </div>
      )}

      {/* 知识讲解 */}
      <div className="surface p-5">
        <div className="flex items-center gap-2 mb-2"><BookCopy size={18} className="text-pyblue-light" /><h3 className="section-title">知识讲解</h3></div>
        <Markdown content={lesson.content} />
      </div>

      {/* 思维可视化 */}
      {lesson.visual && <Visualizer spec={lesson.visual} />}

      {/* 代码示例 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2"><Code2 size={18} className="text-pyyellow" /><h3 className="section-title">动手写代码</h3></div>
        {lesson.examples.map((ex, i) => (
          <div key={i} className="surface overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-sm font-medium text-slate-200">{ex.title}</span>
              <button onClick={() => runInLab(ex.code)} className="flex items-center gap-1 text-xs text-pyblue-light hover:text-pyblue"><FlaskConical size={14} />在实验室运行</button>
            </div>
            <div className="p-4">
              <pre className="rounded-xl bg-[#060b16] border border-white/[0.08] p-3.5 text-[12.5px] leading-6 overflow-x-auto m-0"><code className="font-mono text-slate-200">{highlightPython(ex.code)}</code></pre>
              {ex.expectedOutput && (
                <div className="mt-3 rounded-xl bg-ok/[0.06] border border-ok/20 p-3">
                  <div className="text-[11px] text-ok mb-1">预期输出</div>
                  <pre className="m-0 font-mono text-[12px] text-slate-300 whitespace-pre-wrap">{ex.expectedOutput}</pre>
                </div>
              )}
              {ex.lines && ex.lines.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-xs muted font-medium">逐行拆解</div>
                  {ex.lines.map((ln, li) => (
                    <div key={li} className="flex gap-3 text-[13px]">
                      <code className="font-mono text-pyblue-light shrink-0 max-w-[45%] break-all">{ln.code}</code>
                      <span className="text-slate-400 leading-relaxed">→ {ln.explain}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 易混淆对比 */}
      {lesson.compare && lesson.compare.length > 0 && (
        <div className="surface p-4 space-y-3">
          <div className="flex items-center gap-2"><Sparkles size={18} className="text-pyyellow" /><h3 className="section-title">别搞混了</h3></div>
          {lesson.compare.map((c, i) => (
            <div key={i} className="surface-soft p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-pyblue-light">{c.conceptA}</span>
                <span className="text-slate-500">vs</span>
                <span className="text-pyyellow">{c.conceptB}</span>
              </div>
              <p className="text-[13px] text-slate-300 leading-relaxed">{c.diff}</p>
              {c.example && <p className="text-[12px] muted">例：{c.example}</p>}
            </div>
          ))}
        </div>
      )}

      {/* 常见错误 */}
      {lesson.pitfalls && lesson.pitfalls.length > 0 && (
        <div className="surface p-4">
          <div className="flex items-center gap-2 mb-3"><AlertTriangle size={18} className="text-danger" /><h3 className="section-title">新手常踩的坑</h3></div>
          <ul className="space-y-2">
            {lesson.pitfalls.map((p, i) => <li key={i} className="flex gap-2 text-[13px] text-slate-300 leading-relaxed"><span className="text-danger">•</span>{p}</li>)}
          </ul>
        </div>
      )}

      {/* 动手练习（答案门控：只在提交后显示解析） */}
      <div className="space-y-3">
        <div className="flex items-center gap-2"><ListChecks size={18} className="text-ok" /><h3 className="section-title">动手练习</h3><span className="chip border-white/10 muted text-[10px]">先自己做，再看解析</span></div>
        {lesson.exercises.map((ex) => {
          const q = questionMap.get(ex.id) || ({ ...ex, lessonId: lesson.id, stageId: lesson.stageId, order: 1, knowledgePoint: lesson.title, difficulty: 1 } as Question)
          return <ExerciseCard key={ex.id} question={q} onSubmit={handleAnswer} />
        })}
      </div>

      {/* 实践任务 */}
      {lesson.task && (
        <div className="surface p-4 flex gap-3 border-l-2 border-l-ok">
          <NotebookPen size={18} className="text-ok shrink-0 mt-0.5" />
          <div><h3 className="section-title mb-1.5">课后实战</h3><p className="text-[13px] text-slate-300 leading-relaxed">{lesson.task}</p></div>
        </div>
      )}

      {/* 笔记 */}
      <div className="surface p-4">
        <button onClick={() => setShowNote((s) => !s)} className="flex items-center gap-2 w-full text-left"><NotebookPen size={17} className="text-pyblue-light" /><h3 className="section-title flex-1">我的笔记</h3><span className="text-xs muted">{showNote ? '收起' : '写笔记'}</span></button>
        {showNote && (
          <div className="mt-3 space-y-3">
            <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="记下你的疑问、心得、或者临时灵感…" rows={3} className="w-full rounded-xl bg-[#060b16] border border-white/[0.1] p-3 text-sm text-slate-100 outline-none focus:border-pyblue resize-y" />
            <button className="btn-primary py-2" disabled={!noteText.trim()} onClick={() => { addNote(lesson.id, noteText); setNoteText('') }}>保存笔记</button>
            {notes.map((n) => (
              <div key={n.id} className="surface-soft p-3 text-[13px] text-slate-300 whitespace-pre-wrap">{n.content}</div>
            ))}
          </div>
        )}
      </div>

      {/* 来源标注 */}
      <div className="surface-soft p-4">
        <h3 className="text-xs muted mb-2">知识点来源（可回原书查阅）</h3>
        <div className="flex flex-wrap gap-2">
          {lesson.sources.map((s, i) => (
            <span key={i} className="chip border-white/10 text-slate-400 text-[11px]">
              {s.book === 'pcc3' ? '《从入门到实践》' : s.book === 'abs3' ? '《快速上手》' : s.book === 'both' ? '两本书' : '新版更新'} · {s.chapter}
            </span>
          ))}
        </div>
      </div>

      {/* 完成 + 翻页 */}
      <button
        className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 ${completed ? 'bg-ok/15 text-ok border border-ok/30' : 'btn-primary'}`}
        onClick={() => completeLesson(lesson.id)}
      >
        <Check size={18} />{completed ? '已完成本节' : '标记本节学完'}
      </button>
      <div className="flex gap-3">
        <button disabled={!prev} onClick={() => prev && navigate(`/lesson/${prev.id}`)} className="btn-ghost flex-1 py-2.5 disabled:opacity-40"><ArrowLeft size={15} />上一节</button>
        <button disabled={!next} onClick={() => next && navigate(`/lesson/${next.id}`)} className="btn-ghost flex-1 py-2.5 disabled:opacity-40">下一节<ChevronRight size={15} /></button>
      </div>
      <button onClick={() => navigate('/lab')} className="w-full flex items-center justify-center gap-2 text-sm text-pyblue-light py-2"><Play size={15} />去实验室自由练习</button>
    </div>
  )
}
