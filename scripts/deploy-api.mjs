/**
 * 通过 GitHub REST Git Data API 部署（不依赖 git push / 不需要 workflow 权限）。
 *
 * 适用：本机 git 协议经代理不通，但 api.github.com 可用的环境。
 * 认证：环境变量 GITHUB_TOKEN（不写入任何文件）。
 *
 * 用法：GITHUB_TOKEN=xxx node scripts/deploy-api.mjs
 *
 * 原理：
 * 1. 递归收集文件 → 为每个文件创建 blob（POST /git/blobs）
 * 2. 创建嵌套 tree（POST /git/trees）
 * 3. 创建 commit（POST /git/commits）
 * 4. 创建/更新 ref（POST/PATCH /git/refs）
 * 分支：main = 源码，gh-pages = dist 构建产物
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const TOKEN = process.env.GITHUB_TOKEN
const OWNER = 'x13502239474-oss'
const REPO = 'python-academy'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const API = `https://api.github.com/repos/${OWNER}/${REPO}`

if (!TOKEN) { console.error('缺少 GITHUB_TOKEN'); process.exit(1) }

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'Content-Type': 'application/json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'python-academy-deploy',
}

let reqCount = 0
async function api(method, url, body, retries = 3) {
  for (let i = 0; i < retries; i++) {
    reqCount++
    let res
    try {
      res = await fetch(url, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      })
    } catch (e) {
      if (i === retries - 1) throw e
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
      continue
    }
    if (res.ok) {
      const text = await res.text()
      return text ? JSON.parse(text) : {}
    }
    const txt = await res.text()
    // 限流/服务端错误重试
    if ((res.status === 403 || res.status === 429 || res.status >= 500) && i < retries - 1) {
      const wait = res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0'
        ? 60000 : 2000 * (i + 1)
      console.log(`  [${res.status}] 重试 ${url.split('/').slice(-2).join('/')} 等待 ${wait / 1000}s`)
      await new Promise((r) => setTimeout(r, wait))
      continue
    }
    throw new Error(`${method} ${url} -> ${res.status}: ${txt.slice(0, 300)}`)
  }
}

/** 判断文件是否二进制 */
function isBinary(buf) {
  const len = Math.min(buf.length, 8000)
  for (let i = 0; i < len; i++) if (buf[i] === 0) return true
  return false
}

/** 收集目录下所有文件（相对路径），支持排除规则 */
function collect(dir, baseDir, exclude) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const rel = path.relative(baseDir, full).split(path.sep).join('/')
    if (exclude(rel, full)) continue
    const st = fs.statSync(full)
    if (st.isDirectory()) out.push(...collect(full, baseDir, exclude))
    else out.push({ rel, full, size: st.size })
  }
  return out
}

/** 为一批文件创建 blob，返回 {path, sha, mode, type} */
async function createBlobs(files, label) {
  const results = []
  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    const buf = fs.readFileSync(f.full)
    const bin = isBinary(buf)
    const body = bin
      ? { content: buf.toString('base64'), encoding: 'base64' }
      : { content: buf.toString('utf8'), encoding: 'utf-8' }
    const blob = await api('POST', `${API}/git/blobs`, body)
    results.push({ path: f.rel, sha: blob.sha, mode: '100644', type: 'blob' })
    if ((i + 1) % 10 === 0 || i === files.length - 1) {
      console.log(`  [${label}] blob ${i + 1}/${files.length}`)
    }
  }
  return results
}

/** 用扁平 tree（base_tree 为空）一次性提交整棵树 */
async function createTree(entries) {
  // Git Data API 支持一次提交包含全部 blob 引用的 tree（用 path 含 / 的条目）
  const tree = await api('POST', `${API}/git/trees`, { tree: entries })
  return tree.sha
}

async function getRef(branch) {
  try {
    const r = await api('GET', `${API}/git/ref/heads/${branch}`)
    return r.object.sha
  } catch (e) {
    if (String(e.message).includes('404')) return null
    throw e
  }
}

async function deployBranch(branch, files, label, message) {
  console.log(`\n=== 部署分支 ${branch}（${label}，${files.length} 个文件）===`)
  const entries = await createBlobs(files, branch)
  const treeSha = await createTree(entries)
  const parent = await getRef(branch)
  const commit = await api('POST', `${API}/git/commits`, {
    message,
    tree: treeSha,
    ...(parent ? { parents: [parent] } : {}),
  })
  if (parent) {
    await api('PATCH', `${API}/git/refs/heads/${branch}`, { sha: commit.sha, force: true })
  } else {
    await api('POST', `${API}/git/refs`, { ref: `refs/heads/${branch}`, sha: commit.sha })
  }
  console.log(`✓ ${branch} -> ${commit.sha.slice(0, 10)}`)
}

async function main() {
  // ---------- main：完整源码 ----------
  const srcExclude = (rel) =>
    rel === '.git' || rel.startsWith('.git/') ||
    rel === 'node_modules' || rel.startsWith('node_modules/') ||
    rel === 'dist' || rel.startsWith('dist/') ||
    rel === 'tmp' || rel.startsWith('tmp/') ||
    rel === 'tsconfig.tsbuildinfo' || rel.endsWith('.tsbuildinfo') ||
    rel.startsWith('public/pyodide/') ||
    rel.startsWith('.github/workflows/') ||
    rel === '.DS_Store'
  const srcFiles = collect(ROOT, ROOT, srcExclude)
  await deployBranch('main', srcFiles, '源码', 'Python Academy: 零基础 Python 交互式学习平台完整源码')

  // ---------- gh-pages：构建产物 ----------
  const distDir = path.join(ROOT, 'dist')
  if (!fs.existsSync(distDir)) { console.error('dist 不存在，请先 VITE_BASE=/python-academy/ npm run build'); process.exit(1) }
  const distFiles = collect(distDir, distDir, () => false)
  await deployBranch('gh-pages', distFiles, '构建产物', 'Deploy Python Academy to GitHub Pages')

  console.log(`\n完成，共 ${reqCount} 次 API 请求`)
}

main().catch((e) => { console.error('部署失败:', e.message); process.exit(1) })
