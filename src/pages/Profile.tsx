import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  NotebookPen, Star, Clock, Trophy,
  Settings, Trash2, Flame, Edit2, Check, X, Download,
} from 'lucide-react'
import { useApp } from '../store/AppContext'
import { lessonMap, questions } from '../data/courses'
import { accuracyOf } from '../lib/grader'
import { todayKey } from '../store/db'

export function Profile() {
  const navigate = useNavigate()
  const {
    state, setProfileName, setDailyGoal, deleteNote, resetAll,
  } = useApp()
  const [editingName, setEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState(state.profile.name)
  const [tab, setTab] = useState<'notes' | 'favorites' | 'history' | 'settings'>('notes')

  const doneLessons = Object.values(state.lessonProgress).filter((p) => p.completed)
  const accuracy = accuracyOf(state.answers)
  const totalMin = state.profile.totalMinutes
  const activeDays = Object.values(state.activity).filter((a) => a.minutes > 0).length

  const codeDrafts = Object.entries(state.codeDrafts).filter(([, v]) => v && v.trim())

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `python-academy-backup-${todayKey()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const tabs = [
    { id: 'notes' as const, label: '笔记', icon: NotebookPen, count: state.notes.length },
    { id: 'favorites' as const, label: '收藏', icon: Star, count: state.favorites.length },
    { id: 'history' as const, label: '学习记录', icon: Clock, count: doneLessons.length },
    { id: 'settings' as const, label: '设置', icon: Settings, count: 0 },
  ]

  return (
    <div className="space-y-5 animate-fade-up">
      <h1 className="text-2xl font-bold">我的</h1>

      {/* 资料卡 */}
      <div className="surface p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pyblue to-pyblue-dark flex items-center justify-center text-2xl font-bold text-white">
            {state.profile.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} className="flex-1 min-w-0 rounded-lg bg-[#060b16] border border-white/10 px-2 py-1 text-sm outline-none focus:border-pyblue" />
                <button onClick={() => { setProfileName(nameDraft.trim() || '学习者'); setEditingName(false) }} className="text-ok"><Check size={18} /></button>
                <button onClick={() => { setNameDraft(state.profile.name); setEditingName(false) }} className="text-slate-500"><X size={18} /></button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold truncate">{state.profile.name}</h2>
                <button onClick={() => setEditingName(true)} className="text-slate-500 hover:text-slate-300"><Edit2 size={14} /></button>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs muted mt-1"><Flame size={13} className="text-danger" />连续学习 {state.profile.streak} 天 · 累计 {activeDays} 天</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/[0.06]">
          <div className="text-center"><div className="text-lg font-bold text-pyblue-light tabular-nums">{doneLessons.length}</div><div className="text-[10px] muted">已学课程</div></div>
          <div className="text-center"><div className="text-lg font-bold text-ok tabular-nums">{accuracy}%</div><div className="text-[10px] muted">正确率</div></div>
          <div className="text-center"><div className="text-lg font-bold text-pyyellow tabular-nums">{Math.floor(totalMin / 60)}h{totalMin % 60}m</div><div className="text-[10px] muted">学习时长</div></div>
          <div className="text-center"><div className="text-lg font-bold text-danger tabular-nums">{Object.values(state.wrongBook).filter((w) => !w.resolved).length}</div><div className="text-[10px] muted">待复习</div></div>
        </div>
      </div>

      {/* 学习统计 */}
      <div className="surface p-4">
        <div className="flex items-center gap-2 mb-3"><Trophy size={17} className="text-pyyellow" /><h2 className="section-title">学习统计</h2></div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="surface-soft p-3"><div className="text-xl font-bold tabular-nums">{state.answers.length}</div><div className="text-[10px] muted mt-1">答题总数</div></div>
          <div className="surface-soft p-3"><div className="text-xl font-bold tabular-nums">{questions.length}</div><div className="text-[10px] muted mt-1">题库总量</div></div>
          <div className="surface-soft p-3"><div className="text-xl font-bold tabular-nums">{codeDrafts.length}</div><div className="text-[10px] muted mt-1">保存的代码</div></div>
        </div>
      </div>

      {/* Tab 内容 */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 min-w-fit py-2 px-2 rounded-lg text-xs flex items-center justify-center gap-1.5 whitespace-nowrap ${tab === t.id ? 'bg-white/[0.1] text-white' : 'muted'}`}>
              <Icon size={14} />{t.label}{t.count > 0 && <span className="text-[10px] opacity-60">{t.count}</span>}
            </button>
          )
        })}
      </div>

      {tab === 'notes' && (
        <div className="space-y-3">
          {state.notes.length === 0 ? <Empty text="还没有笔记，去课程里随手记两句吧" /> : state.notes.map((n) => (
            <div key={n.id} className="surface p-4">
              <div className="flex items-center justify-between mb-2">
                <button onClick={() => navigate(`/lesson/${n.lessonId}`)} className="text-xs text-pyblue-light truncate">{lessonMap.get(n.lessonId)?.title}</button>
                <button onClick={() => deleteNote(n.id)} className="text-slate-600 hover:text-danger"><Trash2 size={14} /></button>
              </div>
              <p className="text-[13px] text-slate-300 whitespace-pre-wrap">{n.content}</p>
              <div className="text-[10px] muted mt-2">{new Date(n.updatedAt).toLocaleString('zh-CN')}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'favorites' && (
        <div className="space-y-3">
          {state.favorites.length === 0 ? <Empty text="还没有收藏的知识点" /> : state.favorites.map((f) => {
            const l = lessonMap.get(f.lessonId)
            if (!l) return null
            return (
              <button key={f.lessonId} onClick={() => navigate(`/lesson/${f.lessonId}`)} className="surface p-4 w-full text-left flex items-center gap-3">
                <Star size={16} className="text-pyyellow fill-pyyellow shrink-0" />
                <div className="min-w-0 flex-1"><div className="text-sm text-slate-100">{l.title}</div><div className="text-xs muted truncate">{l.subtitle}</div></div>
              </button>
            )
          })}
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-2">
          {doneLessons.length === 0 ? <Empty text="还没有学习记录，从第一节课开始吧" /> : doneLessons
            .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
            .map((p) => {
              const l = lessonMap.get(p.lessonId)
              if (!l) return null
              return (
                <button key={p.lessonId} onClick={() => navigate(`/lesson/${p.lessonId}`)} className="surface-soft p-3 w-full text-left flex items-center gap-3">
                  <Check size={15} className="text-ok shrink-0" />
                  <span className="text-[13px] text-slate-300 flex-1 truncate">{l.title}</span>
                  <span className="text-[10px] muted">{new Date(p.completedAt!).toLocaleDateString('zh-CN')}</span>
                </button>
              )
            })}
        </div>
      )}

      {tab === 'settings' && (
        <div className="space-y-3">
          <div className="surface p-4">
            <div className="flex items-center gap-2 mb-3"><Clock size={17} className="text-pyblue-light" /><h2 className="section-title">每日目标</h2></div>
            <div className="flex items-center gap-3">
              <input type="range" min={5} max={60} step={5} value={state.profile.dailyGoalMinutes} onChange={(e) => setDailyGoal(Number(e.target.value))} className="flex-1 accent-pyblue" />
              <span className="text-sm font-medium tabular-nums w-16 text-right">{state.profile.dailyGoalMinutes} 分钟</span>
            </div>
          </div>
          <button onClick={exportData} className="surface-soft p-4 w-full flex items-center gap-3 text-left">
            <Download size={17} className="text-pyblue-light" />
            <div><div className="text-sm text-slate-200">导出学习数据</div><div className="text-[11px] muted">备份为 JSON 文件</div></div>
          </button>
          <button onClick={() => { if (confirm('确定清空全部学习进度、笔记和错题吗？此操作不可恢复。')) void resetAll() }} className="surface-soft p-4 w-full flex items-center gap-3 text-left border-danger/20">
            <Trash2 size={17} className="text-danger" />
            <div><div className="text-sm text-danger">清空所有数据</div><div className="text-[11px] muted">重置到初始状态</div></div>
          </button>
          <div className="text-[11px] muted leading-relaxed px-2">
            所有数据保存在本机浏览器（IndexedDB + LocalStorage），不上传云端、无需注册。刷新或关闭浏览器后依然保留。换设备或清理浏览器数据会丢失，建议定期导出备份。
          </div>
        </div>
      )}
    </div>
  )
}

function Empty({ text }: { text: string }) {
  return <div className="surface p-8 text-center muted text-sm">{text}</div>
}
