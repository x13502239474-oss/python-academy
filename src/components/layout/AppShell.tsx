import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, BookOpen, Target, Terminal, User, Code2 } from 'lucide-react'

const navItems = [
  { to: '/', label: '首页', icon: Home },
  { to: '/courses', label: '课程', icon: BookOpen },
  { to: '/practice', label: '练习', icon: Target },
  { to: '/lab', label: '实验室', icon: Terminal },
  { to: '/profile', label: '我的', icon: User },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const inLesson = location.pathname.startsWith('/lesson/')

  return (
    <div className="min-h-screen">
      {/* 桌面侧栏 */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 flex-col border-r border-white/[0.06] bg-ink-900/70 backdrop-blur-xl z-30 px-4 py-6">
        <div className="flex items-center gap-2.5 px-2 mb-9">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pyblue to-pyblue-dark flex items-center justify-center"><Code2 size={20} className="text-white" /></div>
          <div>
            <div className="font-bold text-sm">Python Academy</div>
            <div className="text-[10px] muted">从零开始，掌握编程</div>
          </div>
        </div>
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${isActive ? 'bg-pyblue/15 text-white' : 'text-slate-400 hover:bg-white/[0.05]'}`}>
              <item.icon size={19} strokeWidth={1.8} />
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/map" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${isActive ? 'bg-pyblue/15 text-white' : 'text-slate-400 hover:bg-white/[0.05]'}`}>
            <span className="w-[19px] text-center text-base">◇</span>
            知识地图
          </NavLink>
        </nav>
        <div className="px-2 text-[10px] muted leading-relaxed">
          数据仅存本机 · 无需注册<br />v1.0 · 本地优先学习平台
        </div>
      </aside>

      {/* 移动端顶部标题栏 */}
      <header className="md:hidden safe-top sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-ink-950/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pyblue to-pyblue-dark flex items-center justify-center"><Code2 size={16} className="text-white" /></div>
          <span className="font-bold text-sm">Python Academy</span>
        </div>
        <span className="text-[10px] muted">从零开始，掌握编程</span>
      </header>

      {/* 主内容 */}
      <main className={`${inLesson ? '' : 'pb-24 md:pb-8'} md:pl-60`}>
        <div className="mx-auto max-w-2xl px-4 py-5 md:py-8">
          {children}
        </div>
      </main>

      {/* 移动端底部导航 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-bottom bg-ink-900/90 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="grid grid-cols-5">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `flex flex-col items-center gap-1 py-2.5 transition ${isActive ? 'text-pyblue-light' : 'text-slate-500'}`}>
              {({ isActive }) => <>
                <item.icon size={21} strokeWidth={isActive ? 2.2 : 1.7} />
                <span className="text-[10px]">{item.label}</span>
              </>}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
