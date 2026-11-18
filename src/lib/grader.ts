import type { JudgeResult, Question } from '../types'

/** 归一化：去空格、标点，全角转半角，统一小写 */
export function normalize(s: string): string {
  return s
    .replace(/[\uFF01-\uFF5E]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
    .replace(/\u3000/g, ' ')
    .replace(/[\s,，。.、;；:：!！?？"'『』""'']/g, '')
    .toLowerCase()
}

/** 判断题宽口径识别 */
function parseBoolean(s: string): boolean | null {
  const n = normalize(s)
  if (['对', '正确', '是', 'true', 't', 'yes', 'y', '1', '√', 'v'].includes(n)) return true
  if (['错', '错误', '否', 'false', 'f', 'no', 'n', '0', 'x', '×'].includes(n)) return false
  return null
}

/**
 * 通用判题引擎。program 题需要外部传入运行结果（runCode），其余题型本地判分。
 */
export function judge(q: Question, userAnswer: string, programOutput?: string): JudgeResult {
  const qtype = q.qtype

  if (qtype === 'program') {
    const cases = q.testCases || []
    if (!cases.length) {
      return { correct: false, score: 0, feedback: '本题缺少测试用例，无法判分。' }
    }
    if (programOutput === undefined) {
      return { correct: false, score: 0, feedback: '还没有运行代码。请先点击运行，再提交判题。' }
    }
    const lines = programOutput.trim().split(/\r?\n/).map((l) => l.trim())
    let passed = 0
    const details: string[] = []
    cases.forEach((tc, i) => {
      const expectLines = tc.expected.trim().split(/\r?\n/).map((l) => l.trim())
      const ok = expectLines.every((line, j) => lines[j] === line) && lines.length >= expectLines.length
      if (ok) passed++
      else details.push(`用例 ${i + 1}：期望「${tc.expected.trim()}」，实际「${programOutput.trim()}」`)
    })
    const score = passed / cases.length
    return {
      correct: score >= 0.999,
      score,
      feedback: score >= 0.999
        ? `太棒了！全部 ${cases.length} 个测试用例通过。`
        : `通过了 ${passed}/${cases.length} 个测试用例。${details.join('；')}`,
    }
  }

  if (qtype === 'single') {
    const a = normalize(userAnswer)
    const correct = normalize(String(q.answer))
    const accepted = (q.accepted || []).map(normalize)
    const ok = a === correct || accepted.includes(a)
    return { correct: ok, score: ok ? 1 : 0, feedback: ok ? '回答正确。' : `正确答案是 ${String(q.answer)}。${q.explanation}` }
  }

  if (qtype === 'multiple') {
    const expected = (Array.isArray(q.answer) ? q.answer : [q.answer]).filter((v): v is string => typeof v === 'string').map(normalize).sort()
    const got = userAnswer.split(/[,，;；\s]+/).map(normalize).filter(Boolean).sort()
    const ok = expected.length === got.length && expected.every((v, i) => v === got[i])
    return { correct: ok, score: ok ? 1 : 0, feedback: ok ? '回答正确。' : `正确答案是 ${(Array.isArray(q.answer) ? q.answer : [q.answer]).join('、')}。${q.explanation}` }
  }

  if (qtype === 'boolean') {
    const got = parseBoolean(userAnswer)
    const expect = parseBoolean(String(q.answer))
    const ok = got !== null && got === expect
    return { correct: ok, score: ok ? 1 : 0, feedback: ok ? '判断正确。' : `正确答案：${expect ? '对' : '错'}。${q.explanation}` }
  }

  if (qtype === 'blank') {
    const a = normalize(userAnswer)
    const accepted = [normalize(String(q.answer)), ...(q.accepted || []).map(normalize)]
    const ok = accepted.includes(a)
    return { correct: ok, score: ok ? 1 : 0, feedback: ok ? '填写正确。' : `参考答案：${String(q.answer)}。${q.explanation}` }
  }

  if (qtype === 'code-complete' || qtype === 'predict' || qtype === 'debug') {
    // 这类题用判分要点组：命中比例 >=70% 判对
    const groups = q.keywords || [[normalize(String(q.answer))]]
    const a = normalize(userAnswer)
    const hit: string[] = []
    const missed: string[] = []
    groups.forEach((g) => {
      const ok = g.some((kw) => a.includes(normalize(kw)))
      if (ok) hit.push(g[0])
      else missed.push(g[0])
    })
    const score = hit.length / groups.length
    const ok = score >= 0.7
    return {
      correct: ok,
      score,
      hitPoints: hit,
      missedPoints: missed,
      feedback: ok
        ? `回答正确，命中 ${hit.length}/${groups.length} 个要点。`
        : `命中 ${hit.length}/${groups.length} 个要点，还差：${missed.join('、')}。${q.explanation}`,
    }
  }

  return { correct: false, score: 0, feedback: '未知题型。' }
}

/** 从题库统计学习数据 */
export function accuracyOf(answers: { correct: boolean }[]): number {
  if (!answers.length) return 0
  return Math.round((answers.filter((a) => a.correct).length / answers.length) * 100)
}
