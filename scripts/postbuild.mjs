// 构建后在 dist 写入 .nojekyll，避免 GitHub Pages 的 Jekyll 忽略下划线目录/文件。
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
if (fs.existsSync(dist)) {
  fs.writeFileSync(path.join(dist, '.nojekyll'), '')
  console.log('✓ dist/.nojekyll 已写入（GitHub Pages 部署用）')
}
