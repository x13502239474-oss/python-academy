import type { Lesson, Question } from '../../types'
import { stage1Lessons } from './s1'
import { stage2Lessons } from './s2'
import { stage3Lessons } from './s3'
import { stage4Lessons } from './s4'
import { stage5Lessons } from './s5'
import { stage6Lessons } from './s6'
import { stage7Lessons } from './s7'
import { stage8Lessons } from './s8'

/** 全部课程，按阶段、序号排列 */
export const lessons: Lesson[] = [
  ...stage1Lessons,
  ...stage2Lessons,
  ...stage3Lessons,
  ...stage4Lessons,
  ...stage5Lessons,
  ...stage6Lessons,
  ...stage7Lessons,
  ...stage8Lessons,
]

export const lessonMap = new Map(lessons.map((l) => [l.id, l]))

export function getLesson(id: string): Lesson | undefined {
  return lessonMap.get(id)
}

/** 把每课的练习展开成题库（带 stageId / knowledgePoint / difficulty） */
export const questions: Question[] = lessons.flatMap((lesson) =>
  lesson.exercises.map((ex, idx) => ({
    id: ex.id,
    lessonId: lesson.id,
    stageId: lesson.stageId,
    order: idx + 1,
    qtype: ex.qtype,
    stem: ex.stem,
    options: ex.options,
    answer: ex.answer,
    accepted: ex.accepted,
    keywords: ex.keywords,
    explanation: ex.explanation,
    knowledgePoint: lesson.title,
    code: ex.code,
    testCases: ex.testCases,
    difficulty: (idx === 0 ? 1 : idx === 1 ? 2 : 3) as 1 | 2 | 3,
  })),
)

export const questionMap = new Map(questions.map((q) => [q.id, q]))
