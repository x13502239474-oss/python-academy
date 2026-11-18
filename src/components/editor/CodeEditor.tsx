import React, { useRef } from 'react'
import { highlightPython } from '../../lib/highlight'

interface Props {
  value: string
  onChange: (v: string) => void
  minLines?: number
}

/**
 * 移动端友好的代码编辑器：
 * - 透明 textarea 覆盖在高亮层上，输入体验原生
 * - Tab 键插入 4 空格；自动续缩进
 * - 横向滚动，不换行
 */
export function CodeEditor({ value, onChange, minLines = 8 }: Props) {
  const taRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const next = value.slice(0, start) + '    ' + value.slice(end)
      onChange(next)
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 4 })
    } else if (e.key === 'Enter') {
      const start = ta.selectionStart
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      const currentLine = value.slice(lineStart, start)
      const indent = currentLine.match(/^\s*/)?.[0] || ''
      const extra = /:\s*$/.test(currentLine) ? '    ' : ''
      if (indent || extra) {
        e.preventDefault()
        const insert = '\n' + indent + extra
        const next = value.slice(0, start) + insert + value.slice(ta.selectionEnd)
        onChange(next)
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + insert.length
        })
      }
    }
  }

  const lines = value.split('\n')
  const lineCount = Math.max(minLines, lines.length)

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#060b16] border border-white/[0.08]">
      {/* 行号 + 代码：整体横向滚动 */}
      <div className="code-editor overflow-x-auto overflow-y-hidden text-[13px] leading-[22px]">
        <div className="flex min-w-full" style={{ minHeight: lineCount * 22 }}>
          {/* 行号 */}
          <div className="sticky left-0 z-10 select-none text-right pr-3 pl-2.5 text-slate-600 bg-[#060b16] border-r border-white/[0.06] font-mono" style={{ minWidth: 40 }}>
            {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          {/* 高亮层 + 输入层 */}
          <div className="relative flex-1" style={{ minWidth: `max(100%, ${Math.max(...lines.map((l) => l.length), 30)}ch)` }}>
            <pre className="pointer-events-none absolute inset-0 m-0 px-3 py-0 font-mono whitespace-pre text-slate-200" aria-hidden>
              {lines.map((line, i) => <div key={i}>{highlightPython(line)}{'\u200b'}</div>)}
            </pre>
            <textarea
              ref={taRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              className="code-editor absolute inset-0 w-full h-full resize-none bg-transparent text-transparent caret-pyyellow px-3 py-0 font-mono whitespace-pre outline-none border-0"
              style={{ minHeight: lineCount * 22 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
