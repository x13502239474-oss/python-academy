// 课程数据机器校验 v2（深度扩充版）
// 运行：node scripts/validate-courses.mjs
// 检查：字段完整性、id 唯一、练习数量与题型分布、示例解析完整度、正文深度、前置依赖存在、阶段索引一致
import { build } from 'esbuild'
import { pathToFileURL } from 'url'
import path from 'path'
import fs from 'fs'
import os from 'os'

const root = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), '..')
const coursesEntry = path.join(root, 'src/data/courses/index.ts')
const stagesFile = path.join(root, 'src/data/stages.ts')
const stamp = Date.now()
const tmpEntry = path.join(os.tmpdir(), `pa-entry-${stamp}.ts`)
const tmpOut = path.join(os.tmpdir(), `pa-courses-${stamp}.mjs`)

// Windows 下 esbuild 解析不了 file:// 说明符，这里统一用正斜杠绝对路径
const spec = (abs) => JSON.stringify(abs.replace(/\\/g, '/'))
fs.writeFileSync(
  tmpEntry,
  `export * from ${spec(coursesEntry)}\nexport { stages } from ${spec(stagesFile)}\n`,
  'utf8',
)

const errors = []
const warnings = []
const stats = {
  lessons: 0, exercises: 0, examples: 0, visuals: 0, local: 0, browser: 0,
  perStage: {}, contentChars: 0, minContent: Infinity, minContentId: '', programQ: 0,
}

const cjk = (s) => (String(s).match(/[\u4e00-\u9fa5]/g) || []).length

try {
  await build({
    entryPoints: [tmpEntry],
    outfile: tmpOut,
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: true,
    logLevel: 'silent',
  })
  const { lessons, questions, questionMap, stages } = await import(pathToFileURL(tmpOut).href)

  stats.lessons = lessons.length
  stats.exercises = lessons.reduce((n, l) => n + l.exercises.length, 0)
  stats.examples = lessons.reduce((n, l) => n + l.examples.length, 0)
  stats.visuals = lessons.filter((l) => l.visual).length
  stats.local = lessons.filter((l) => l.env === 'local').length
  stats.browser = lessons.filter((l) => l.env === 'browser').length

  const ids = new Set()
  const qids = new Set()
  const required = ['id', 'stageId', 'order', 'title', 'subtitle', 'hook', 'objectives', 'content', 'examples', 'sources', 'prerequisites', 'exercises', 'minutes', 'env', 'terms', 'pitfalls', 'keyPoints']

  for (const l of lessons) {
    stats.perStage[l.stageId] = (stats.perStage[l.stageId] || 0) + 1

    for (const f of required) {
      if (l[f] === undefined || l[f] === null || (Array.isArray(l[f]) && l[f].length === 0 && f !== 'prerequisites')) {
        errors.push(`课程 ${l.id} 缺少必填字段或为空: ${f}`)
      }
    }
    if (ids.has(l.id)) errors.push(`课程 id 重复: ${l.id}`)
    ids.add(l.id)

    if (!['browser', 'local'].includes(l.env)) errors.push(`课程 ${l.id} env 非法: ${l.env}`)
    if (!(l.minutes >= 10 && l.minutes <= 40)) warnings.push(`课程 ${l.id} 课时 ${l.minutes} 分钟超出常见区间`)
    if (!l.analogy) errors.push(`课程 ${l.id} 缺少生活化比喻 analogy`)
    if ((l.objectives || []).length < 3) errors.push(`课程 ${l.id} 学习目标少于 3 条`)
    if ((l.terms || []).length < 3) errors.push(`课程 ${l.id} 术语表少于 3 条`)
    if ((l.pitfalls || []).length < 3) errors.push(`课程 ${l.id} 常见错误少于 3 条`)
    if ((l.keyPoints || []).length < 3) errors.push(`课程 ${l.id} 本课小结少于 3 条`)
    if (!l.task || l.task.length < 10) errors.push(`课程 ${l.id} 缺少课后实战任务`)

    // 正文深度
    const chars = cjk(l.content)
    stats.contentChars += chars
    if (chars < stats.minContent) { stats.minContent = chars; stats.minContentId = l.id }
    if (chars < 750) errors.push(`课程 ${l.id} 正文过短（中文字符 ${chars}，要求 ≥750）`)
    const h2 = (String(l.content).match(/^## /gm) || []).length
    if (h2 < 5) errors.push(`课程 ${l.id} 正文小节仅 ${h2} 个，要求 ≥5（知识点分层不足）`)
    if (/Lorem|TODO|待补充|示例文本/.test(l.content)) errors.push(`课程 ${l.id} 正文含占位文字`)

    // 代码示例
    if ((l.examples || []).length < 1) errors.push(`课程 ${l.id} 无代码示例`)
    let traced = 0
    l.examples?.forEach((ex, i) => {
      const tag = `课程 ${l.id} 示例${i + 1}`
      if (!ex.title) errors.push(`${tag} 缺标题`)
      if (!ex.intro) warnings.push(`${tag} 缺 intro 说明`)
      if (!ex.code || ex.code.length < 10) errors.push(`${tag} 代码过短或缺失`)
      if (!ex.expectedOutput) errors.push(`${tag} 缺 expectedOutput（运行结果）`)
      if (!ex.lines || ex.lines.length < 3) errors.push(`${tag} 逐行解析少于 3 条`)
      if (ex.trace && ex.trace.length) traced++
      ex.lines?.forEach((ln) => {
        if (!ln.code || !ln.explain) errors.push(`${tag} 逐行解析存在空项`)
      })
    })
    if (l.examples?.length && traced === 0) warnings.push(`课程 ${l.id} 没有任何示例提供 trace（程序运行过程）`)

    // 来源
    if ((l.sources || []).length < 1) errors.push(`课程 ${l.id} 无来源标注`)
    l.sources?.forEach((s) => {
      if (!['pcc3', 'abs3', 'both', 'update'].includes(s.book)) errors.push(`课程 ${l.id} 来源 book 非法: ${s.book}`)
      if (!s.chapter) errors.push(`课程 ${l.id} 来源缺少章节`)
    })

    // 练习：数量 + 题型分布
    const exs = l.exercises || []
    if (exs.length < 5) errors.push(`课程 ${l.id} 练习仅 ${exs.length} 道，要求 ≥5`)
    if (!exs.some((e) => e.qtype === 'program')) errors.push(`课程 ${l.id} 缺少编程题（program），必须有一道真正写代码的练习`)
    const last = exs[exs.length - 1]
    if (last && last.qtype !== 'program') warnings.push(`课程 ${l.id} 最后一题不是编程题（建议由易到难，编程题收尾）`)

    l.exercises?.forEach((ex) => {
      const tag = `题目 ${ex.id}`
      if (qids.has(ex.id)) errors.push(`题目 id 重复: ${ex.id}`)
      qids.add(ex.id)
      if (!ex.id.startsWith(l.id + '-q')) errors.push(`${tag} 题号未跟随课程 id（应为 ${l.id}-qN）`)
      if (!ex.stem || ex.stem.length < 6) errors.push(`${tag} 题干过短`)
      if (!ex.explanation || cjk(ex.explanation) < 40) errors.push(`${tag} 解析过短（中文字符 ${cjk(ex.explanation)}，要求 ≥40）`)
      if (!/答案/.test(ex.explanation)) warnings.push(`${tag} 解析缺少「答案：」段`)
      const needAnswer = ['single', 'multiple', 'boolean', 'blank']
      const needKeywords = ['predict', 'code-complete', 'debug']
      if (needAnswer.includes(ex.qtype) && ex.answer === undefined) errors.push(`${tag} (${ex.qtype}) 缺 answer`)
      if (needKeywords.includes(ex.qtype) && (!ex.keywords || !ex.keywords.length)) errors.push(`${tag} (${ex.qtype}) 缺 keywords`)
      if (ex.qtype === 'single' || ex.qtype === 'multiple') {
        if (!ex.options || ex.options.length < 3) errors.push(`${tag} 选择题选项少于 3 个`)
      }
      if (ex.qtype === 'program') {
        stats.programQ++
        if (!ex.testCases || !ex.testCases.length) errors.push(`${tag} 编程题缺测试用例`)
        ex.testCases?.forEach((tc) => {
          if (tc.expected === undefined || tc.expected === '') errors.push(`${tag} 测试用例 expected 为空`)
        })
        if (!/print|for|if|=/.test(ex.explanation)) warnings.push(`${tag} 编程题解析里似乎没有参考代码`)
      }
      if (/[\u4e00-\u9fa5]"[\u4e00-\u9fa5]/.test(ex.stem)) warnings.push(`${tag} 题干含中文之间的半角双引号，请确认已转义`)
    })
  }

  // 题库展开一致性
  if (questions.length !== stats.exercises) errors.push(`题库数量(${questions.length}) != 课程练习总数(${stats.exercises})`)
  questions.forEach((q) => {
    if (!questionMap.has(q.id)) errors.push(`题库 map 缺: ${q.id}`)
    if (!ids.has(q.lessonId)) errors.push(`题目 ${q.id} 的 lessonId 不存在: ${q.lessonId}`)
  })

  // 前置依赖必须存在
  for (const l of lessons) {
    l.prerequisites?.forEach((p) => { if (p && !ids.has(p)) errors.push(`课程 ${l.id} 前置课程不存在: ${p}`) })
    l.prerequisites?.forEach((p) => { if (p === l.id) errors.push(`课程 ${l.id} 把自己列为前置`) })
  }

  // 阶段索引一致性
  for (const st of stages) {
    if (!st.courseIds || !st.courseIds.length) { errors.push(`阶段 ${st.id} courseIds 为空`); continue }
    st.courseIds.forEach((cid) => { if (!ids.has(cid)) errors.push(`阶段 ${st.id} 引用了不存在的课程: ${cid}`) })
    const actual = lessons.filter((l) => l.stageId === st.id).length
    if (st.courseIds.length !== actual) errors.push(`阶段 ${st.id} courseIds 数量(${st.courseIds.length}) 与课程数(${actual}) 不一致`)
  }
  const stageIds = new Set(stages.map((s) => s.id))
  lessons.forEach((l) => { if (!stageIds.has(l.stageId)) errors.push(`课程 ${l.id} 的 stageId ${l.stageId} 无对应阶段`) })
} catch (e) {
  errors.push(`加载/转译失败: ${e.message}`)
} finally {
  try { fs.unlinkSync(tmpEntry) } catch {}
  try { fs.unlinkSync(tmpOut) } catch {}
}

console.log('=== 课程数据统计 ===')
console.log(`课程数: ${stats.lessons}`)
console.log(`阶段分布: ${Object.entries(stats.perStage).sort((a, b) => a[0] - b[0]).map(([k, v]) => `S${k}:${v}`).join('  ')}`)
console.log(`代码示例: ${stats.examples} | 可视化: ${stats.visuals}`)
console.log(`练习/题目: ${stats.exercises} | 其中编程题: ${stats.programQ}`)
console.log(`浏览器可跑: ${stats.browser} | 需本地环境: ${stats.local}`)
console.log(`正文中文总量: ${stats.contentChars} 字，平均每课 ${Math.round(stats.contentChars / (stats.lessons || 1))} 字，最短 ${stats.minContentId}(${stats.minContent} 字)`)
console.log('=== 校验结果 ===')
if (warnings.length) {
  console.log(`⚠ 警告 ${warnings.length} 条:`)
  warnings.slice(0, 25).forEach((w) => console.log('  - ' + w))
}
if (errors.length) {
  console.log(`✗ 错误 ${errors.length} 条:`)
  errors.slice(0, 60).forEach((e) => console.log('  - ' + e))
  process.exit(1)
} else {
  console.log('✓ 全部通过')
}
