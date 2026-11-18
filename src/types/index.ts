// ===== 课程领域模型 =====

export type SourceBook = 'pcc3' | 'abs3' | 'both' | 'update'

export interface SourceRef {
  book: SourceBook
  chapter: string
  section?: string
  note?: string
}

export interface CodeExample {
  title: string
  code: string
  /** 逐行解释：行号 -> 说明 */
  lines?: { code: string; explain: string }[]
  expectedOutput?: string
}

export interface CompareItem {
  conceptA: string
  conceptB: string
  diff: string
  example?: string
}

export interface VisualSpec {
  kind: 'variable' | 'loop' | 'function' | 'flow'
  title: string
  description: string
  /** 变量可视化：初始变量表 */
  variables?: { name: string; value: string }[]
  /** 循环/流程可视化：执行步骤 */
  steps?: { label: string; detail: string; state?: { name: string; value: string }[] }[]
  /** 函数调用可视化 */
  calls?: { name: string; args: string; returns: string }[]
}

/** 课程内练习题（终结性判题用） */
export interface LessonExercise {
  id: string
  qtype: QuestionType
  stem: string
  options?: string[]
  /** 单选/多选/判断/填空必填；predict/debug 用 keywords 代替 */
  answer?: string | string[]
  accepted?: string[]
  keywords?: string[][]
  explanation: string
  /** 难度（可选，题库展开时会按题序自动补齐） */
  difficulty?: 1 | 2 | 3
  /** 编程题的测试用例 */
  testCases?: { stdin: string; expected: string }[]
  /** 代码补全/预测题的初始代码 */
  code?: string
}

export interface Lesson {
  id: string
  stageId: number
  order: number
  title: string
  subtitle: string
  /** 生活化导入问题 */
  hook: string
  /** 学习目标（可观测行为） */
  objectives: string[]
  /** 知识讲解段落，支持简单 markdown 语义（# 标题、**加粗**、`代码`） */
  content: string
  /** 大白话解释 / 生活比喻 */
  analogy?: string
  /** 可运行代码示例 */
  examples: CodeExample[]
  /** 易混淆对比 */
  compare?: CompareItem[]
  /** 编程思维可视化 */
  visual?: VisualSpec
  /** 常见错误 */
  pitfalls?: string[]
  /** 来源标注 */
  sources: SourceRef[]
  /** 必须先掌握的知识点 id */
  prerequisites: string[]
  /** 实践任务描述 */
  task?: string
  /** 课末练习 */
  exercises: LessonExercise[]
  /** 预计时长（分钟） */
  minutes: number
  /** 环境要求：browser 浏览器可跑 / local 需要本地 Python */
  env: 'browser' | 'local'
}

export interface Stage {
  id: number
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  goals: string[]
  courseIds: string[]
}

// ===== 题目与判题 =====

export type QuestionType =
  | 'single'   // 单选
  | 'multiple' // 多选
  | 'boolean'  // 判断
  | 'blank'    // 填空
  | 'code-complete' // 代码补全
  | 'predict'  // 运行预测
  | 'program'  // 编程题
  | 'debug'    // 排错题

export interface Question {
  id: string
  lessonId: string
  stageId: number
  order: number
  qtype: QuestionType
  stem: string
  options?: string[]
  answer?: string | string[]
  accepted?: string[]
  keywords?: string[][]
  explanation: string
  knowledgePoint: string
  code?: string
  testCases?: { stdin: string; expected: string }[]
  difficulty: 1 | 2 | 3
}

export interface JudgeResult {
  correct: boolean
  score: number
  /** 命中的判分要点 */
  hitPoints?: string[]
  /** 未覆盖的要点 */
  missedPoints?: string[]
  feedback: string
}

// ===== 学习记录 =====

export interface AnswerRecord {
  questionId: string
  userAnswer: string
  correct: boolean
  timestamp: number
  attempts: number
}

export interface WrongItem {
  questionId: string
  wrongCount: number
  lastWrong: number
  nextReview: number
  interval: number
  resolved: boolean
  userAnswer: string
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: number
  lastPosition?: number
}

export interface Note {
  id: string
  lessonId: string
  content: string
  createdAt: number
  updatedAt: number
}

export interface Favorite {
  lessonId: string
  createdAt: number
}

export interface DailyActivity {
  date: string // YYYY-MM-DD
  minutes: number
  lessonsCompleted: number
  questionsAnswered: number
}

export interface UserProfile {
  name: string
  createdAt: number
  streak: number
  lastStudyDate: string
  totalMinutes: number
  dailyGoalMinutes: number
}

export interface AppState {
  profile: UserProfile
  lessonProgress: Record<string, LessonProgress>
  answers: AnswerRecord[]
  wrongBook: Record<string, WrongItem>
  notes: Note[]
  favorites: Favorite[]
  activity: Record<string, DailyActivity>
  codeDrafts: Record<string, string>
}
