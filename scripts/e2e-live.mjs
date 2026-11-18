// 针对线上真实部署地址的端到端验证（含 Pyodide 真实运行 Python）
import { chromium } from 'playwright-core'
const BASE = process.env.LIVE_BASE || 'https://x13502239474-oss.github.io/python-academy/'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const results = []
const check = (n, ok, d = '') => { results.push(ok); console.log(`${ok ? '✓' : '✗'} ${n}${d ? ' — ' + d : ''}`) }

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] })
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  const failed = []
  page.on('requestfailed', (r) => failed.push(r.url() + ' ' + (r.failure()?.errorText || '')))

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(1500)
  const h1 = await page.locator('h1').first().textContent()
  check('线上首页渲染', !!h1 && h1.includes('Python'), `标题=${h1}`)

  // 课程页
  await page.goto(BASE + '#/courses', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
  const stages = await page.getByText(/阶段 \d/).count()
  check('线上课程 8 阶段', stages >= 8, `阶段元素=${stages}`)

  // 实验室：Pyodide 真实运行（线上 wasm 较大，给足超时）
  await page.goto(BASE + '#/lab', { waitUntil: 'domcontentloaded' })
  let ready = false
  try { await page.getByText('Python 就绪').waitFor({ timeout: 120000 }); ready = true } catch {}
  check('线上 Pyodide 加载就绪', ready)

  if (ready) {
    const ta = page.locator('textarea').first()
    await ta.fill('nums = [1, 2, 3]\nprint("线上运行:", sum(nums) * 7)')
    await page.getByRole('button', { name: /运行/ }).click()
    await page.waitForTimeout(3000)
    const out = await page.locator('[data-testid="py-stdout"]').textContent().catch(() => '')
    check('线上真实运行 Python', !!out && out.includes('42'), `输出=${out?.trim()}`)
  }

  // 无横向溢出
  await page.goto(BASE, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  check('手机端无横向溢出', overflow <= 2, `溢出=${overflow}px`)

  const jsErrors = errors.filter((e) => !/favicon/.test(e))
  check('无运行时 JS 错误', jsErrors.length === 0, jsErrors.slice(0, 2).join(' | '))
  check('无资源加载失败', failed.length === 0, failed.slice(0, 2).join(' | '))

  await ctx.close()
} finally {
  await browser.close()
}
const p = results.filter(Boolean).length
console.log(`\n=== 线上 E2E: ${p}/${results.length} 通过 ===`)
if (p < results.length) process.exit(1)
