import { describe, it, expect } from 'vitest'
import { judge, normalize, accuracyOf } from './grader'
import type { Question } from '../types'

const base: Omit<Question, 'qtype' | 'answer' | 'stem'> = {
  id: 't', lessonId: 's1-01', stageId: 1, order: 1,
  explanation: '解析', knowledgePoint: '测试', difficulty: 1,
}

describe('normalize 归一化', () => {
  it('全角转半角并去空格标点', () => {
    expect(normalize('Ｍｉｋｅ！')).toBe('mike')
    expect(normalize(' 3 ， 1 4 ')).toBe('314')
  })
})

describe('单选题', () => {
  const q: Question = { ...base, qtype: 'single', stem: '选B', answer: 'B', options: ['A', 'B'] }
  it('正确字母', () => expect(judge(q, 'B').correct).toBe(true))
  it('小写变体', () => expect(judge(q, ' b ').correct).toBe(true))
  it('错误答案', () => expect(judge(q, 'A').correct).toBe(false))
})

describe('判断题宽口径', () => {
  const q: Question = { ...base, qtype: 'boolean', stem: '对错', answer: '对' }
  it('多种"对"的表达', () => {
    expect(judge(q, '正确').correct).toBe(true)
    expect(judge(q, '√').correct).toBe(true)
    expect(judge(q, 'true').correct).toBe(true)
  })
  it('错误表达', () => expect(judge(q, '错').correct).toBe(false))
})

describe('填空题接受变体', () => {
  const q: Question = { ...base, qtype: 'blank', stem: '填空', answer: 'print', accepted: ['输出', '打印'] }
  it('标准答案', () => expect(judge(q, 'print()').correct || judge(q, 'print').correct).toBe(true))
  it('接受变体', () => expect(judge(q, '输出').correct).toBe(true))
  it('错误答案', () => expect(judge(q, 'input').correct).toBe(false))
})

describe('多选题', () => {
  const q: Question = { ...base, qtype: 'multiple', stem: '多选', answer: ['A', 'C'] }
  it('顺序无关', () => expect(judge(q, 'C,A').correct).toBe(true))
  it('少选判错', () => expect(judge(q, 'A').correct).toBe(false))
})

describe('要点组判分（代码补全/预测/排错）', () => {
  const q: Question = { ...base, qtype: 'predict', stem: '预测输出', keywords: [['2', '二'], ['3', '三'], ['4', '四']] }
  it('全部命中判对', () => expect(judge(q, '输出是2、3、4').correct).toBe(true))
  it('2/3=66.7% 未达70%判错', () => expect(judge(q, '输出是2和3').correct).toBe(false))
  it('命中不足判错', () => expect(judge(q, '只有2').correct).toBe(false))
})

describe('编程题测试用例判分', () => {
  const q: Question = {
    ...base, qtype: 'program', stem: '输出1到3', answer: '',
    testCases: [{ stdin: '', expected: '1\n2\n3' }],
  }
  it('输出匹配', () => expect(judge(q, '', '1\n2\n3').correct).toBe(true))
  it('输出不匹配', () => expect(judge(q, '', '1\n2').correct).toBe(false))
  it('未运行', () => expect(judge(q, '').correct).toBe(false))
})

describe('正确率统计', () => {
  it('计算百分比', () => expect(accuracyOf([{ correct: true }, { correct: false }, { correct: true }])).toBe(67))
  it('空数组', () => expect(accuracyOf([])).toBe(0))
})
