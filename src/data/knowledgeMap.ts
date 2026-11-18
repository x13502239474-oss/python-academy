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
 */
export const knowledgeNodes: MapNode[] = [
  { id: 'basic', label: '变量与数据类型', lessonId: 's2-01', stageId: 2, deps: [], desc: '一切的起点：用变量装数据，认识字符串和数字。', level: 0 },
  { id: 'list', label: '列表与字典', lessonId: 's2-06', stageId: 2, deps: ['basic'], desc: '一次管理一串数据，列表按下标、字典按键。', level: 1 },
  { id: 'condition', label: '条件判断', lessonId: 's3-01', stageId: 3, deps: ['basic'], desc: '让程序做决定：if / else。', level: 1 },
  { id: 'loop', label: '循环', lessonId: 's3-04', stageId: 3, deps: ['list', 'condition'], desc: '让程序自动重复：for / while。', level: 2 },
  { id: 'function', label: '函数', lessonId: 's4-01', stageId: 4, deps: ['condition', 'loop'], desc: '把代码打包复用，输入参数输出结果。', level: 3 },
  { id: 'module', label: '模块与标准库', lessonId: 's4-05', stageId: 4, deps: ['function'], desc: '站在巨人的肩膀上，import 现成工具。', level: 4 },
  { id: 'file', label: '文件处理', lessonId: 's5-04', stageId: 5, deps: ['module'], desc: '读写真实文件，让数据留存。', level: 5 },
  { id: 'exception', label: '异常处理', lessonId: 's5-05', stageId: 5, deps: ['function'], desc: '让程序出错也不崩溃：try / except。', level: 5 },
  { id: 'class', label: '类与对象', lessonId: 's5-01', stageId: 5, deps: ['function'], desc: '用代码描述真实世界的事物。', level: 5 },
  { id: 'automation', label: '自动化项目', lessonId: 's6-01', stageId: 6, deps: ['file', 'module', 'exception'], desc: '文件整理、Excel、PDF，真正解决实际问题。', level: 6 },
  { id: 'data', label: '数据处理', lessonId: 's7-01', stageId: 7, deps: ['file', 'list'], desc: 'CSV / JSON / 清洗 / 可视化。', level: 6 },
  { id: 'web', label: '数据与 Web', lessonId: 's7-05', stageId: 7, deps: ['module', 'exception'], desc: 'HTTP、API、Flask 网页入门。', level: 7 },
  { id: 'project', label: '综合实战', lessonId: 's8-01', stageId: 8, deps: ['automation', 'data', 'class', 'web'], desc: '独立完成完整项目，融会贯通。', level: 8 },
]

export const nodeMap = new Map(knowledgeNodes.map((n) => [n.id, n]))
