import { useNavigate } from 'react-router-dom'
import {
  Flame, Clock, BookOpenCheck, Target, ChevronRight, Sparkles,
  CalendarDays, Brain, Play, TrendingUp,
} from 'lucide-react'
import { ProgressRing } from '../components/ui/ProgressRing'
import { stages, stageMap } from '../data/stages'
import { lessons, lessonMap } from '../data/courses'
import { useApp } from '../store/AppContext'
import { todayKey } from '../store/db'

export function Home() {
  const navigate = useNavigate()
  const { state } = useApp()

  const totalLessons = lessons.length
  const doneCount = Object.values(state.lessonProgress).filter((p) => p.completed).length
  const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0

  // 当前阶段：第一个未完成的课所在阶段
  const currentLesson = lessons.find((l) => !state.lessonProgress[l.id]?.completed) || lessons[lessons.length - 1]
  const currentStage = stageMap.get(currentLesson.stageId) || stages[0]

  const today = todayKey()
  const todayAct = state.activity[today]
  const todayMin = todayAct?.minutes || 0
  const goal = state.profile.dailyGoalMinutes
  const goalPct = Math.min(100, Math.round((todayMin / goal) * 100))

  // 待复习：到期的错题
  const dueWrong = Object.values(state.wrongBook).filter((w) => !w.resolved && w.nextReview <= Date.now())

  // 最近学习
  const recent = Object.values(state.lessonProgress)
    .filter((p) => p.completed && p.completedAt)
    .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
    .slice(0, 3)
    .map((p) => lessonMap.get(p.lessonId))
    .filter(Boolean)

  const hour = new Date().getHours()
  const greet = hour < 6 ? '夜深了' : hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'

  return (
    <div className="space-y-5 animate-fade-up">
      {/* 顶部问候 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm muted">{greet}，{state.profile.name} 👋</p>
          <h1 className="text-xl font-bold mt-0.5">继续你的 Python 之旅</h1>
        </div>
        <div className="flex items-center gap-1.5 chip border-danger/30 text-danger">
          <Flame size={15} className="fill-danger" />连续 {state.profile.streak} 天
        </div>
      </div>

      {/* 中央仪表盘 */}
      <div className="surface p-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3776ab 0, transparent 60%)' }} />
        <ProgressRing value={pct} size={196} stroke={13}>
          <span className="text-4xl font-bold tabular-nums text-white">{pct}<span className="text-xl text-slate-400">%</span></span>
          <span className="text-xs muted mt-1">总进度</span>
          <span className="text-[11px] text-pyblue-light mt-2">{doneCount}/{totalLessons} 节</span>
        </ProgressRing>
        <div className="mt-5 text-center">
          <div className="text-xs muted">当前阶段</div>
          <div className="font-semibold mt-1 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: currentStage.color }} />
            阶段 {currentStage.id} · {currentStage.title}
          </div>
        </div>
        <button onClick={() => navigate(`/lesson/${currentLesson.id}`)} className="btn-primary mt-5 w-full max-w-xs py-3">
          <Play size={17} fill="currentColor" />继续学习：{currentLesson.title}
        </button>
      </div>

      {/* 今日任务 */}
      <div className="surface p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><Target size={18} className="text-pyyellow" /><h2 className="section-title">今日任务</h2></div>
          <span className="text-xs muted">{todayMin}/{goal} 分钟</span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.07] overflow-hidden mb-3">
          <div className="h-full rounded-full bg-gradient-to-r from-pyblue to-pyyellow transition-all" style={{ width: `${goalPct}%` }} />
        </div>
        <div className="flex gap-2 text-xs">
          <span className={`chip ${todayAct?.lessonsCompleted ? 'border-ok/30 text-ok' : 'border-white/10 muted'}`}><BookOpenCheck size={13} />学 {todayAct?.lessonsCompleted || 0} 节</span>
          <span className={`chip ${todayAct?.questionsAnswered ? 'border-ok/30 text-ok' : 'border-white/10 muted'}`}><Target size={13} />答 {todayAct?.questionsAnswered || 0} 题</span>
          <span className="chip border-white/10 muted"><Clock size={13} />{todayMin} 分钟</span>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => navigate('/wrong')} className="surface-soft p-4 text-left hover:bg-white/[0.06] transition">
          <div className="flex items-center justify-between">
            <Brain size={20} className="text-danger" />
            <ChevronRight size={16} className="text-slate-600" />
          </div>
          <div className="text-2xl font-bold mt-3 tabular-nums">{dueWrong.length}</div>
          <div className="text-xs muted mt-0.5">待复习知识点</div>
        </button>
        <button onClick={() => navigate('/map')} className="surface-soft p-4 text-left hover:bg-white/[0.06] transition">
          <div className="flex items-center justify-between">
            <TrendingUp size={20} className="text-pyblue-light" />
            <ChevronRight size={16} className="text-slate-600" />
          </div>
          <div className="text-2xl font-bold mt-3 tabular-nums">{lessons.length}</div>
          <div className="text-xs muted mt-0.5">知识点地图节点</div>
        </button>
      </div>

      {/* 下一节推荐 */}
      <div className="surface p-4">
        <div className="flex items-center gap-2 mb-3"><Sparkles size={17} className="text-pyblue-light" /><h2 className="section-title">下一节推荐</h2></div>
        <button onClick={() => navigate(`/lesson/${currentLesson.id}`)} className="w-full flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${currentStage.color}20`, color: currentStage.color }}>
            <BookOpenCheck size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-slate-100">{currentLesson.title}</div>
            <div className="text-xs muted truncate">{currentLesson.subtitle}</div>
          </div>
          <ChevronRight size={18} className="text-slate-600" />
        </button>
      </div>

      {/* 最近学习 */}
      {recent.length > 0 && (
        <div className="surface p-4">
          <div className="flex items-center gap-2 mb-3"><CalendarDays size={17} className="text-slate-400" /><h2 className="section-title">最近学习</h2></div>
          <div className="space-y-2">
            {recent.map((l) => l && (
              <button key={l.id} onClick={() => navigate(`/lesson/${l.id}`)} className="w-full flex items-center gap-2.5 py-1.5 text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-ok shrink-0" />
                <span className="text-[13px] text-slate-300 flex-1 truncate">{l.title}</span>
                <span className="text-[11px] muted">{new Date(state.lessonProgress[l.id].completedAt!).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
