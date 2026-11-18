import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { AppState, Note } from '../types'
import { createDefaultState, loadState, saveState, todayKey } from './db'

interface AppContextValue {
  state: AppState
  ready: boolean
  completeLesson: (lessonId: string) => void
  recordAnswer: (questionId: string, userAnswer: string, correct: boolean, knowledgePoint: string) => void
  addNote: (lessonId: string, content: string) => void
  updateNote: (id: string, content: string) => void
  deleteNote: (id: string) => void
  toggleFavorite: (lessonId: string) => void
  saveCodeDraft: (lessonId: string, code: string) => void
  addStudyMinutes: (minutes: number) => void
  setProfileName: (name: string) => void
  setDailyGoal: (minutes: number) => void
  resetAll: () => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(createDefaultState)
  const [ready, setReady] = useState(false)
  const saveTimer = useRef<number | null>(null)

  useEffect(() => {
    loadState().then((s) => {
      setState(s)
      setReady(true)
    })
  }, [])

  // 防抖持久化，避免频繁写库
  useEffect(() => {
    if (!ready) return
    if (saveTimer.current) window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      void saveState(state)
    }, 250)
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current)
    }
  }, [state, ready])

  const touchToday = (s: AppState, patch: Partial<AppState['activity'][string]>): AppState => {
    const key = todayKey()
    const prev = s.activity[key] || { date: key, minutes: 0, lessonsCompleted: 0, questionsAnswered: 0 }
    return { ...s, activity: { ...s.activity, [key]: { ...prev, ...patch } } }
  }

  const updateStreak = (s: AppState): AppState => {
    const today = todayKey()
    if (s.profile.lastStudyDate === today) return s
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yKey = todayKey(yesterday)
    const streak = s.profile.lastStudyDate === yKey ? s.profile.streak + 1 : 1
    return { ...s, profile: { ...s.profile, lastStudyDate: today, streak } }
  }

  const value: AppContextValue = {
    state,
    ready,
    completeLesson: (lessonId) =>
      setState((s) => {
        if (s.lessonProgress[lessonId]?.completed) return s
        let next: AppState = {
          ...s,
          lessonProgress: {
            ...s.lessonProgress,
            [lessonId]: { lessonId, completed: true, completedAt: Date.now() },
          },
        }
        next = touchToday(next, { lessonsCompleted: (next.activity[todayKey()]?.lessonsCompleted || 0) + 1 })
        return updateStreak(next)
      }),
    recordAnswer: (questionId, userAnswer, correct, knowledgePoint) =>
      setState((s) => {
        const prevRecord = s.answers.find((a) => a.questionId === questionId)
        const attempts = (prevRecord?.attempts || 0) + 1
        const answers = [s.answers.filter((a) => a.questionId !== questionId), { questionId, userAnswer, correct, timestamp: Date.now(), attempts }].flat()

        let wrongBook = { ...s.wrongBook }
        if (!correct) {
          const prev = wrongBook[questionId]
          const count = (prev?.wrongCount || 0) + 1
          // 间隔复习：1,2,4,7,15 天
          const intervals = [1, 2, 4, 7, 15, 30]
          const idx = Math.min(count - 1, intervals.length - 1)
          const days = intervals[idx]
          wrongBook[questionId] = {
            questionId,
            wrongCount: count,
            lastWrong: Date.now(),
            nextReview: Date.now() + days * 86400000,
            interval: days,
            resolved: false,
            userAnswer,
          }
        } else if (wrongBook[questionId] && !wrongBook[questionId].resolved) {
          const prev = wrongBook[questionId]
          wrongBook[questionId] = { ...prev, resolved: true, interval: 0, nextReview: Date.now() }
        }

        let next: AppState = { ...s, answers, wrongBook }
        next = touchToday(next, { questionsAnswered: (next.activity[todayKey()]?.questionsAnswered || 0) + 1 })
        // 记录错误知识点（复用 answers 里的 knowledgePoint 扩展字段通过 wrongBook 的 note）
        void knowledgePoint
        return updateStreak(next)
      }),
    addNote: (lessonId, content) =>
      setState((s) => {
        const now = Date.now()
        const note: Note = { id: `note-${now}-${Math.random().toString(36).slice(2, 6)}`, lessonId, content, createdAt: now, updatedAt: now }
        return { ...s, notes: [note, ...s.notes] }
      }),
    updateNote: (id, content) =>
      setState((s) => ({ ...s, notes: s.notes.map((n) => (n.id === id ? { ...n, content, updatedAt: Date.now() } : n)) })),
    deleteNote: (id) => setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) })),
    toggleFavorite: (lessonId) =>
      setState((s) => {
        const exists = s.favorites.some((f) => f.lessonId === lessonId)
        return {
          ...s,
          favorites: exists ? s.favorites.filter((f) => f.lessonId !== lessonId) : [{ lessonId, createdAt: Date.now() }, ...s.favorites],
        }
      }),
    saveCodeDraft: (lessonId, code) => setState((s) => ({ ...s, codeDrafts: { ...s.codeDrafts, [lessonId]: code } })),
    addStudyMinutes: (minutes) =>
      setState((s) => {
        let next = touchToday(s, { minutes: (s.activity[todayKey()]?.minutes || 0) + minutes })
        next = { ...next, profile: { ...next.profile, totalMinutes: next.profile.totalMinutes + minutes } }
        return updateStreak(next)
      }),
    setProfileName: (name) => setState((s) => ({ ...s, profile: { ...s.profile, name } })),
    setDailyGoal: (minutes) => setState((s) => ({ ...s, profile: { ...s.profile, dailyGoalMinutes: minutes } })),
    resetAll: async () => {
      const fresh = createDefaultState()
      localStorage.removeItem('state')
      setState(fresh)
      await saveState(fresh)
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
