import { chromium } from 'playwright-core'

const BASE = process.env.E2E_BASE || 'http://127.0.0.1:5173/'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const results = []
function check(name, ok, detail = '') {
  results.push({ name, ok, detail })
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`)
}

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })

  // 1. 首页
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  const homeTitle = await page.locator('h1').first().textContent()
  check('首页加载', !!homeTitle && homeTitle.includes('Python'), `标题=${homeTitle}`)
  const progressText = await page.getByText('总进度').count()
  check('学习仪表盘渲染', progressText > 0)

  // 2. 底部导航 5 项
  const navCount = await page.locator('nav.fixed a').count()
  check('底部导航 5 项', navCount === 5, `实际=${navCount}`)

  // 3. 课程页
  await page.goto(BASE + '#/courses', { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const stageCount = await page.getByText(/阶段 \d/).count()
  check('课程页 8 阶段', stageCount >= 8, `阶段元素=${stageCount}`)

  // 4. 课程详情页 + 示例代码
  await page.goto(BASE + '#/lesson/s1-06', { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const detailTitle = await page.locator('h1').first().textContent()
  check('课程详情页', !!detailTitle && detailTitle.includes('print'), `标题=${detailTitle}`)
  const hasCode = await page.locator('pre code').count()
  check('课程代码示例渲染', hasCode > 0, `代码块=${hasCode}`)

  // 5. 实验室：Pyodide 真实运行
  await page.goto(BASE + '#/lab', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)
  // 等待 Pyodide 就绪（CDN 加载可能较慢）
  let ready = false
  try {
    await page.getByText('Python 就绪').waitFor({ timeout: 90000 })
    ready = true
  } catch {}
  check('Pyodide 加载就绪', ready)

  if (ready) {
    // 填入代码并运行
    const ta = page.locator('textarea').first()
    await ta.fill('x = 7\nprint("答案:", x * 6)')
    await page.getByRole('button', { name: /运行/ }).click()
    await page.waitForTimeout(2500)
    const output = await page.locator('[data-testid="py-stdout"]').textContent().catch(() => '')
    check('Python 代码真实运行', !!output && output.includes('42'), `输出=${output?.trim()}`)

    // 错误信息显示
    await ta.fill('print(未定义变量)')
    await page.getByRole('button', { name: /运行/ }).click()
    await page.waitForTimeout(1500)
    const errText = await page.getByText(/NameError|错误/).first().textContent().catch(() => '')
    check('Python 错误提示', !!errText, `错误=${errText?.slice(0, 40)}`)
  }

  // 6. 练习判题
  await page.goto(BASE + '#/lesson/s1-01', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const submitBtn = page.getByRole('button', { name: /提交判题/ }).first()
  if (await submitBtn.count()) {
    // 判断题选"错"再提交（s1-01-q1 正确答案是错）
    await page.getByRole('button', { name: '错', exact: true }).first().click()
    await submitBtn.click()
    await page.waitForTimeout(300)
    const okText = await page.getByText('回答正确！').count()
    check('练习自动判题', okText > 0)
  } else {
    check('练习自动判题', false, '未找到提交按钮')
  }

  // 7. 进度持久化：标记完成后刷新
  await page.goto(BASE + '#/lesson/s1-02', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await page.getByRole('button', { name: /标记本节学完/ }).click()
  await page.waitForTimeout(300)
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const doneText = await page.getByText('已完成本节').count()
  check('学习进度刷新后保留', doneText > 0)

  // 8. 知识地图
  await page.goto(BASE + '#/map', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const mapNodes = await page.getByText('变量与数据类型').count()
  check('知识地图渲染', mapNodes > 0)

  // 9. 无横向溢出（手机端）
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  check('手机端无横向溢出', overflow <= 2, `溢出=${overflow}px`)

  // 10. 页面错误检查
  const realErrors = errors.filter((e) => !e.includes('favicon') && !e.includes('net::ERR'))
  check('无运行时 JS 错误', realErrors.length === 0, realErrors.slice(0, 2).join(' | '))

  await ctx.close()
} finally {
  await browser.close()
}

const passed = results.filter((r) => r.ok).length
console.log(`\n=== E2E 结果: ${passed}/${results.length} 通过 ===`)
if (passed < results.length) process.exit(1)
