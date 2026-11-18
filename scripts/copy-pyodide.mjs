// 把 pyodide npm 包的运行时文件复制到 public/pyodide，实现本地托管（离线可用，不依赖外部 CDN）。
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const src = path.join(root, 'node_modules', 'pyodide')
const dst = path.join(root, 'public', 'pyodide')

const files = [
  'pyodide.mjs',
  'pyodide.asm.js',
  'pyodide.asm.wasm',
  'python_stdlib.zip',
  'pyodide-lock.json',
]

if (!fs.existsSync(src)) {
  console.error('pyodide 包未安装，请先 npm install')
  process.exit(1)
}
fs.mkdirSync(dst, { recursive: true })
for (const f of files) {
  const from = path.join(src, f)
  if (!fs.existsSync(from)) {
    console.error('缺少文件: ' + f)
    process.exit(1)
  }
  fs.copyFileSync(from, path.join(dst, f))
  const kb = Math.round(fs.statSync(path.join(dst, f)).size / 1024)
  console.log(`copied ${f} (${kb} KB)`)
}
console.log('Pyodide 运行时已复制到 public/pyodide')
