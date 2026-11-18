import { Suspense, lazy, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './store/AppContext'
import { AppShell } from './components/layout/AppShell'
import { Loader2 } from 'lucide-react'
import { Playground } from './pages/Playground'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Courses = lazy(() => import('./pages/Courses').then((m) => ({ default: m.Courses })))
const LessonDetail = lazy(() => import('./pages/LessonDetail').then((m) => ({ default: m.LessonDetail })))
const Practice = lazy(() => import('./pages/Practice').then((m) => ({ default: m.Practice })))
const KnowledgeMap = lazy(() => import('./pages/KnowledgeMap').then((m) => ({ default: m.KnowledgeMap })))
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })))

function LabPage() {
  const code = sessionStorage.getItem('pa-lab-code')
  useEffect(() => { sessionStorage.removeItem('pa-lab-code') }, [])
  return <Playground initialCode={code || undefined} draftKey="__free__" />
}

function Loading() {
  return <div className="flex items-center justify-center py-20 text-slate-500"><Loader2 className="animate-spin" size={28} /></div>
}

function AppRoutes() {
  const { ready } = useApp()
  if (!ready) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pyblue to-pyblue-dark flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-lg">Py</span></div><Loader2 className="animate-spin mx-auto text-slate-500" size={22} /><p className="text-xs muted mt-3">正在准备学习空间…</p></div></div>

  return (
    <AppShell>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/map" element={<KnowledgeMap />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HashRouter>
  )
}
