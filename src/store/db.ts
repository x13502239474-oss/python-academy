import type { AppState, UserProfile } from '../types'

const DB_NAME = 'python-academy-db'
const DB_VERSION = 1
const STORE = 'app-state'
const KEY = 'state'

const defaultProfile: UserProfile = {
  name: '学习者',
  createdAt: Date.now(),
  streak: 0,
  lastStudyDate: '',
  totalMinutes: 0,
  dailyGoalMinutes: 15,
}

export function createDefaultState(): AppState {
  return {
    profile: { ...defaultProfile },
    lessonProgress: {},
    answers: [],
    wrongBook: {},
    notes: [],
    favorites: [],
    activity: {},
    codeDrafts: {},
  }
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

/** 从 IndexedDB 读取完整状态；失败时回退到 localStorage，再失败返回默认。 */
export async function loadState(): Promise<AppState> {
  try {
    const db = await openDB()
    const state = await new Promise<AppState | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(KEY)
      req.onsuccess = () => resolve(req.result as AppState | undefined)
      req.onerror = () => reject(req.error)
    })
    db.close()
    if (state && state.profile) return { ...createDefaultState(), ...state }
  } catch {
    // IndexedDB 不可用，回退 localStorage
  }
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...createDefaultState(), ...JSON.parse(raw) }
  } catch {
    // 忽略
  }
  return createDefaultState()
}

/** 写入状态到 IndexedDB，并同步写一份到 localStorage 作为兜底。 */
export async function saveState(state: AppState): Promise<void> {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // localStorage 可能满，忽略
  }
  try {
    const db = await openDB()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).put(state, KEY)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
    db.close()
  } catch {
    // IndexedDB 写入失败时 localStorage 兜底已生效
  }
}

export async function clearAllData(): Promise<void> {
  localStorage.removeItem(KEY)
  try {
    const db = await openDB()
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).clear()
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    })
    db.close()
  } catch {
    // 忽略
  }
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
