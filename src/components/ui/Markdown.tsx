import React from 'react'
import { highlightPython } from '../../lib/highlight'

/** 轻量 Markdown 渲染：满足课程内容需要，不引入额外依赖。 */
function renderInline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const tok = m[0]
    if (tok.startsWith('`')) out.push(<code key={k++}>{tok.slice(1, -1)}</code>)
    else if (tok.startsWith('**')) out.push(<strong key={k++}>{tok.slice(2, -2)}</strong>)
    else out.push(<em key={k++}>{tok.slice(1, -1)}</em>)
    last = m.index + tok.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function Markdown({ content }: { content: string }) {
  const lines = content.split('\n')
  const blocks: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // 代码块
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3)
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // 跳过结束 ```
      blocks.push(
        <pre key={key++}>
          <code>{lang.toLowerCase().includes('python') || !lang ? highlightPython(codeLines.join('\n')) : codeLines.join('\n')}</code>
        </pre>,
      )
      continue
    }

    // 标题
    const h = /^(#{1,4})\s+(.*)$/.exec(line)
    if (h) {
      const level = h[1].length
      const text = renderInline(h[2])
      if (level === 1) blocks.push(<h1 key={key++}>{text}</h1>)
      else if (level === 2) blocks.push(<h2 key={key++}>{text}</h2>)
      else blocks.push(<h3 key={key++} className="text-base font-semibold text-slate-100 mt-4 mb-2">{text}</h3>)
      i++
      continue
    }

    // 引用
    if (line.trim().startsWith('> ')) {
      const quote: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quote.push(lines[i].trim().slice(2))
        i++
      }
      blocks.push(<blockquote key={key++}>{quote.map((q, qi) => <div key={qi}>{renderInline(q)}</div>)}</blockquote>)
      continue
    }

    // 表格
    if (line.trim().startsWith('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|/.test(lines[i + 1])) {
      const header = line.trim().split('|').slice(1, -1).map((c) => c.trim())
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(lines[i].trim().split('|').slice(1, -1).map((c) => c.trim()))
        i++
      }
      blocks.push(
        <div key={key++} className="overflow-x-auto my-4">
          <table>
            <thead><tr>{header.map((c, ci) => <th key={ci}>{renderInline(c)}</th>)}</tr></thead>
            <tbody>{rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{renderInline(c)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      )
      continue
    }

    // 无序列表
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''))
        i++
      }
      blocks.push(<ul key={key++}>{items.map((t, ti) => <li key={ti}>{renderInline(t)}</li>)}</ul>)
      continue
    }

    // 有序列表
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      blocks.push(<ol key={key++}>{items.map((t, ti) => <li key={ti}>{renderInline(t)}</li>)}</ol>)
      continue
    }

    // 空行
    if (!line.trim()) {
      i++
      continue
    }

    // 普通段落：合并连续非空行
    const para: string[] = []
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\s*[-*]\s|\s*\d+\.\s|> )/.test(lines[i])) {
      para.push(lines[i].trim())
      i++
    }
    blocks.push(<p key={key++}>{renderInline(para.join(' '))}</p>)
  }

  return <div className="prose-py">{blocks}</div>
}
