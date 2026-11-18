// 课程数据机器校验：把 TS 数据用 esbuild 转译后导入，检查结构与一致性。
// 运行：node scripts/validate-courses.mjs
import { build } from 'esbuild'
import { pathToFileURL } from 'url'
import path from 'path'
import fs from 'fs'
import os from 'os'

const root = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), '..')
const entry = path.join(root, 'src/data/courses/index.ts')
const tmp = path.join(os.tmpdir(), `pa-courses-${Date.now()}.mjs`)

let errors = []
let warnings = []
let stats = { lessons: 0, exercises: 0, questions: 0, stages: new Set(), examples: 0, visuals: 0, local: 0, browser: 0 }

try {
  await build({
    entryPoints: [entry],
    outfile: tmp,
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: true,
    logLevel: 'silent',
  })
  const mod = await import(pathToFileURL(tmp).href)
  const { lessons, questions, questionMap } = mod

  stats.lessons = lessons.length
  stats.exercises = lessons.reduce((n, l) => n + l.exercises.length, 0)
  stats.questions = questions.length
  stats.examples = lessons.reduce((n, l) => n + l.examples.length, 0)
  stats.visuals = lessons.filter((l) => l.visual).length
  stats.local = lessons.filter((l) => l.env === 'local').length
  stats.browser = lessons.filter((l) => l.env === 'browser').length

  const ids = new Set()
  const qids = new Set()
  const required = ['id', 'stageId', 'order', 'title', 'subtitle', 'hook', 'objectives', 'content', 'examples', 'sources', 'prerequisites', 'exercises', 'minutes', 'env']

  for (const l of lessons) {
    for (const f of required) {
      if (l[f] === undefined || l[f] === null || (Array.isArray(l[f]) && l[f].length === 0 && f !== 'prerequisites')) {
        errors.push(`课程 ${l.id} 缺少必填字段或为空: ${f}`)
      }
    }
    if (ids.has(l.id)) errors.push(`课程 id 重复: ${l.id}`)
    ids.add(l.id)
    stats.stages.add(l.stageId)
    if (!['browser', 'local'].includes(l.env)) errors.push(`课程 ${l.id} env 非法: ${l.env}`)
    if (!Array.isArray(l.objectives) || l.objectives.length < 2) errors.push(`课程 ${l.id} 学习目标少于2条`)
    if (!Array.isArray(l.examples) || l.examples.length < 1) errors.push(`课程 ${l.id} 无代码示例`)
    l.examples?.forEach((ex, i) => {
      if (!ex.code || ex.code.length < 10) errors.push(`课程 ${l.id} 示例${i + 1} 代码过短或缺失`)
    })
    if (!Array.isArray(l.sources) || l.sources.length < 1) errors.push(`课程 ${l.id} 无来源标注`)
    l.sources?.forEach((s) => {
      if (!['pcc3', 'abs3', 'both', 'update'].includes(s.book)) errors.push(`课程 ${l.id} 来源 book 非法: ${s.book}`)
      if (!s.chapter) errors.push(`课程 ${l.id} 来源缺少章节`)
    })
    // 前置依赖必须存在
    l.prerequisites?.forEach((p) => { if (p && !ids.has(p) && p !== l.id) warnings.push(`课程 ${l.id} 前置 ${p} 待全部加载后复核`) })
    // 练习
    l.exercises?.forEach((ex) => {
      if (qids.has(ex.id)) errors.push(`题目 id 重复: ${ex.id}`)
      qids.add(ex.id)
      if (!ex.stem || ex.stem.length < 4) errors.push(`题目 ${ex.id} 题干过短`)
      if (!ex.explanation || ex.explanation.length < 4) errors.push(`题目 ${ex.id} 缺解析`)
      const needAnswer = ['single', 'multiple', 'boolean', 'blank']
      const needKeywords = ['predict', 'code-complete', 'debug']
      if (needAnswer.includes(ex.qtype) && ex.answer === undefined) errors.push(`题目 ${ex.id} (${ex.qtype}) 缺 answer`)
      if (needKeywords.includes(ex.qtype) && (!ex.keywords || !ex.keywords.length)) errors.push(`题目 ${ex.id} (${ex.qtype}) 缺 keywords`)
      if (ex.qtype === 'program' && (!ex.testCases || !ex.testCases.length)) errors.push(`题目 ${ex.id} 编程题缺测试用例`)
      // 题干内未转义半角双引号检测（粗略：出现在中文之间的 " ）
      if (/[\u4e00-\u9fa5]"[\u4e00-\u9fa5]/.test(ex.stem)) warnings.push(`题目 ${ex.id} 题干含中文间的半角双引号，请确认已转义`)
    })
  }

  // 题库展开一致性
  if (questions.length !== stats.exercises) errors.push(`题库数量(${questions.length}) != 课程练习总数(${stats.exercises})`)
  questions.forEach((q) => {
    if (!qMapHas(questionMap, q.id)) errors.push(`题库 map 缺: ${q.id}`)
    if (!ids.has(q.lessonId)) errors.push(`题目 ${q.id} 的 lessonId 不存在: ${q.lessonId}`)
  })

  // 复核前置依赖
  for (const l of lessons) {
    l.prerequisites?.forEach((p) => { if (p && !ids.has(p)) errors.push(`课程 ${l.id} 前置课程不存在: ${p}`) })
  }
} catch (e) {
  errors.push(`加载/转译失败: ${e.message}`)
} finally {
  try { fs.unlinkSync(tmp) } catch {}
}

function qMapHas(map, id) { return map.has(id) }

stats.stages = [...stats.stages].sort((a, b) => a - b)
console.log('=== 课程数据统计 ===')
console.log(`课程数: ${stats.lessons}`)
console.log(`覆盖阶段: ${stats.stages.join(', ')}`)
console.log(`代码示例: ${stats.examples}`)
console.log(`可视化演示: ${stats.visuals}`)
console.log(`练习/题目: ${stats.exercises} / ${stats.questions}`)
console.log(`浏览器可跑: ${stats.browser} | 需本地环境: ${stats.local}`)
console.log('=== 校验结果 ===')
if (warnings.length) {
  console.log(`⚠ 警告 ${warnings.length} 条:`)
  warnings.slice(0, 20).forEach((w) => console.log('  - ' + w))
}
if (errors.length) {
  console.log(`✗ 错误 ${errors.length} 条:`)
  errors.slice(0, 40).forEach((e) => console.log('  - ' + e))
  process.exit(1)
} else {
  console.log('✓ 全部通过')
}
