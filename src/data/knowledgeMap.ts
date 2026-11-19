export interface MapNode {
  id: string
  label: string
  lessonId: string
  stageId: number
  /** 前置知识点 id */
  deps: string[]
  /** 简要说明 */
  desc: string
  /** 在图中的层级（列），0 起 */
  level: number
}

/**
 * Python 知识地图：按依赖关系连接。level 决定横向排布顺序。
 * 九阶段版本：从变量起步，经字符串/容器/判断/循环/函数，分叉到文件、异常、模块，
 * 再汇入类与对象，最后落到数据处理、网络、自动化与综合实战。
 */
export const knowledgeNodes: MapNode[] = [
  { id: 'basic', label: '变量与数据类型', lessonId: 's2-01', stageId: 2, deps: [], desc: '一切的起点：给数据起名字，分清整数、浮点、字符串、布尔。', level: 0 },
  { id: 'string', label: '字符串处理', lessonId: 's3-01', stageId: 3, deps: ['basic'], desc: '索引、切片、常用方法，处理一切"文字"。', level: 1 },
  { id: 'container', label: '列表与元组', lessonId: 's3-04', stageId: 3, deps: ['basic'], desc: '一次装一批数据，按下标取用。', level: 1 },
  { id: 'condition', label: '条件判断', lessonId: 's4-01', stageId: 4, deps: ['basic'], desc: '让程序做决定：if / elif / else。', level: 1 },
  { id: 'dict', label: '字典与集合', lessonId: 's3-07', stageId: 3, deps: ['container'], desc: '按键取值、自动去重，处理"对应关系"的利器。', level: 2 },
  { id: 'loop', label: '循环', lessonId: 's4-04', stageId: 4, deps: ['condition', 'container'], desc: '让程序自动重复：for / while / break / continue。', level: 2 },
  { id: 'function', label: '函数', lessonId: 's5-01', stageId: 5, deps: ['loop'], desc: '把代码打包复用，输入参数、输出结果。', level: 3 },
  { id: 'file', label: '文件读写', lessonId: 's6-01', stageId: 6, deps: ['function'], desc: '让数据留下来：文本、CSV、JSON。', level: 4 },
  { id: 'exception', label: '异常处理', lessonId: 's6-05', stageId: 6, deps: ['function'], desc: '出错也不崩溃：try / except / finally。', level: 4 },
  { id: 'module', label: '模块与第三方库', lessonId: 's7-01', stageId: 7, deps: ['function'], desc: '站在巨人肩膀上：import、pip、虚拟环境。', level: 4 },
  { id: 'class', label: '类与对象', lessonId: 's7-03', stageId: 7, deps: ['function', 'module'], desc: '用代码描述真实事物：属性、方法、继承、多态。', level: 5 },
  { id: 'regex', label: '正则与文本处理', lessonId: 's8-06', stageId: 8, deps: ['string', 'module'], desc: '用模式匹配批量处理杂乱文本。', level: 5 },
  { id: 'data', label: '数据处理', lessonId: 's8-08', stageId: 8, deps: ['file', 'dict'], desc: '清洗、分组、汇总、可视化。', level: 6 },
  { id: 'web', label: '网络与 API', lessonId: 's8-07', stageId: 8, deps: ['module', 'exception'], desc: '发 HTTP 请求、解析 JSON、拿真实数据。', level: 6 },
  { id: 'automation', label: '自动化脚本', lessonId: 's8-11', stageId: 8, deps: ['file', 'exception', 'module'], desc: '文件整理、批量改名、Excel 与 PDF 批量处理。', level: 6 },
  { id: 'db', label: '数据库', lessonId: 's8-10', stageId: 8, deps: ['file', 'data'], desc: 'SQLite 存取结构化数据，比文件更可靠。', level: 7 },
  { id: 'project', label: '综合实战', lessonId: 's9-01', stageId: 9, deps: ['class', 'data', 'web', 'automation'], desc: '独立完成六个项目，把知识变成能力。', level: 8 },
]

export const nodeMap = new Map(knowledgeNodes.map((n) => [n.id, n]))
