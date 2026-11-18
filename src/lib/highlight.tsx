import React from 'react'

const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
  'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in',
  'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
])
const BUILTINS = new Set([
  'print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple', 'sum', 'min', 'max',
  'round', 'abs', 'type', 'input', 'open', 'enumerate', 'zip', 'sorted', 'reversed', 'append', 'get',
  'items', 'keys', 'values', 'split', 'strip', 'upper', 'lower', 'join', 'format', 'isinstance',
])

/** 轻量 Python 语法高亮，返回 React 节点。逐字符扫描，避免正则嵌套出错。 */
export function highlightPython(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  let i = 0
  let key = 0
  while (i < code.length) {
    const ch = code[i]
    // 注释
    if (ch === '#') {
      let j = i
      while (j < code.length && code[j] !== '\n') j++
      out.push(<span className="tok-com" key={key++}>{code.slice(i, j)}</span>)
      i = j
      continue
    }
    // 字符串（支持三引号与前缀 f/r/b）
    let prefixLen = 0
    if ((ch === 'f' || ch === 'r' || ch === 'b' || ch === 'F' || ch === 'R' || ch === 'B') && (code[i + 1] === '"' || code[i + 1] === "'")) {
      prefixLen = 1
    }
    const q = code[i + prefixLen]
    if (q === '"' || q === "'") {
      const triple = code[i + prefixLen + 1] === q && code[i + prefixLen + 2] === q
      const quote = triple ? q.repeat(3) : q
      let j = i + prefixLen + quote.length
      let escaped = false
      while (j < code.length) {
        if (escaped) { escaped = false; j++; continue }
        if (code[j] === '\\') { escaped = true; j++; continue }
        if (code.slice(j, j + quote.length) === quote) { j += quote.length; break }
        j++
      }
      out.push(<span className="tok-str" key={key++}>{code.slice(i, j)}</span>)
      i = j
      continue
    }
    // 数字
    if (/[0-9]/.test(ch) && (i === 0 || !/[A-Za-z_]/.test(code[i - 1]))) {
      let j = i
      while (j < code.length && /[0-9._]/.test(code[j])) j++
      out.push(<span className="tok-num" key={key++}>{code.slice(i, j)}</span>)
      i = j
      continue
    }
    // 标识符
    if (/[A-Za-z_]/.test(ch)) {
      let j = i
      while (j < code.length && /[A-Za-z0-9_]/.test(code[j])) j++
      const word = code.slice(i, j)
      let cls = ''
      if (KEYWORDS.has(word)) cls = 'tok-kw'
      else if (BUILTINS.has(word)) cls = 'tok-fn'
      else if (code[j] === '(') cls = 'tok-fn'
      out.push(cls ? <span className={cls} key={key++}>{word}</span> : <React.Fragment key={key++}>{word}</React.Fragment>)
      i = j
      continue
    }
    // 运算符
    if ('+-*/%<>=!&|^~'.includes(ch)) {
      let j = i
      while (j < code.length && '+-*/%<>=!&|^~'.includes(code[j])) j++
      out.push(<span className="tok-op" key={key++}>{code.slice(i, j)}</span>)
      i = j
      continue
    }
    out.push(<React.Fragment key={key++}>{ch}</React.Fragment>)
    i++
  }
  return out
}
