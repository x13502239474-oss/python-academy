import type { Lesson } from '../../types'

export const stage7Lessons: Lesson[] = [
  {
    id: 's7-01',
    stageId: 7,
    order: 1,
    title: 'CSV 文件处理',
    subtitle: '把一张表格压平成一行文字',
    hook: '你用 Excel 存过通讯录吗？如果把表格里的格子线全擦掉，只留逗号隔开每一格，它就成了 CSV——最容易和别人交换的表格格式。',
    objectives: ['用自己的话说出 CSV 是什么', '会用 csv.reader 与 DictReader 读取表格数据', '会用 csv.writer 写出一行数据', '知道浏览器里如何用 io.StringIO 模拟文件'],
    analogy: 'CSV 像一张被压平的表格：格子线没有了，逗号就是格子线，换行就是新的一行。表头是每列的名字，下面的每行是一条记录。',
    content: `# CSV：最朴素的表格文件

**CSV = 逗号分隔值**（Comma-Separated Values）。它本质是一个纯文本文件：用逗号隔开同一行的各列，用换行表示新的一行。记事本、Excel、WPS 都能打开它。

## 它长什么样

\`\`\`
姓名,年龄,城市
小明,18,深圳
小红,20,北京
\`\`\`

第一行叫**表头**，说明每列是什么；下面每行是一条记录。可以把它想成一张被"压平"的表格——格子线没了，逗号就是格子线。

## 读取：reader 与 DictReader

Python 自带的 \`csv\` 模块专干这件事：

- \`csv.reader\`：把每行读成列表，如 \`['小明', '18', '深圳']\`
- \`csv.DictReader\`：把每行读成字典，用表头当键，如 \`{'姓名': '小明'}\`

DictReader 更省心：你不记第几列，只记列名。列名一变，代码也不用改下标。

## 写入：writer

用 \`writer.writerow([...])\` 写一行。本地真实文件要写 \`open("data.csv", newline="", encoding="utf-8")\`，其中 \`newline=""\` 能避免 Windows 下多出空行。

## 浏览器里怎么演示

真文件要靠 \`open()\`，但手机浏览器出于安全**碰不到你的真实文件**。我们用 \`io.StringIO\` 在内存里造一个"假文件"，\`csv\` 模块照读不误。把 \`io.StringIO(data)\` 换成 \`open("data.csv", encoding="utf-8")\`，其余代码一模一样。

> 这招叫"用内存模拟文件"，是浏览器里演示文件处理的标准做法。从课堂里的字符串，到工作中真实的报表，中间只差一个打开方式。`,
    examples: [
      {
        title: '用 DictReader 读一张内存表格',
        code: `import csv
import io

data = """姓名,年龄,城市
小明,18,深圳
小红,20,北京"""
f = io.StringIO(data)          # 浏览器里用内存模拟文件
reader = csv.DictReader(f)     # 表头自动变成字典的键
for row in reader:
    print(row["姓名"], "今年", row["年龄"], "岁，住在", row["城市"])`,
        expectedOutput: `小明 今年 18 岁，住在 深圳
小红 今年 20 岁，住在 北京`,
        lines: [
          { code: `data = """姓名,年龄,城市..."""`, explain: '用三引号写一段多行文字，模拟一个 CSV 文件的全部内容。' },
          { code: `io.StringIO(data)`, explain: '把字符串包装成"类文件"对象，这样 csv 模块就能像读真文件一样读它。' },
          { code: `csv.DictReader(f)`, explain: '第一行表头被当作字典的键，之后每行都变成一个字典。' },
          { code: `row["姓名"]`, explain: '按列名取值，比记下标 row[0] 清楚得多。' },
        ],
      },
      {
        title: '把数据写成 CSV',
        code: `import csv
import io

buf = io.StringIO()
writer = csv.writer(buf, lineterminator="\\n")
writer.writerow(["姓名", "年龄"])   # 先写表头
writer.writerow(["小刚", 22])
print(buf.getvalue())`,
        expectedOutput: `姓名,年龄
小刚,22`,
        lines: [
          { code: `csv.writer(buf, lineterminator="\\n")`, explain: 'writer 负责把一行数据转成逗号分隔的文字；这里指定换行符，让结果更干净。' },
          { code: `writer.writerow([...])`, explain: '每调用一次写一行，列表里的每一项占一格。' },
          { code: `buf.getvalue()`, explain: '取出内存"文件"里累积的全部文字。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: 'CSV 文件',
        conceptB: 'Excel 表格',
        diff: 'CSV 只存纯文字和逗号，没有格式、公式、多个工作表，但任何软件都能打开；Excel 功能强却依赖专门软件。',
        example: '程序之间交换数据、做数据清洗，用 CSV；给人看带样式的报表，用 Excel。',
      },
    ],
    pitfalls: [
      '用中文逗号"，"当分隔符——CSV 默认只认英文半角逗号。',
      '以为浏览器能直接 open 本地文件——做不到，要用 io.StringIO 模拟。',
      '本地写文件时忘了 newline="" ，Windows 下每行之间会多出空行。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第14章 附近（使用 CSV 数据）' },
      { book: 'abs3', chapter: '第18章 CSV、JSON和XML文件' },
    ],
    prerequisites: ['s5-04', 's6-01'],
    task: '把示例数据改成你自己的 3 行记录（比如一周的三笔开销），用 DictReader 读出来并逐行打印。',
    exercises: [
      {
        id: 's7-01-q1',
        qtype: 'single',
        stem: 'CSV 文件中，分隔同一行各列数据最常用的符号是？',
        options: ['A. 空格', 'B. 英文半角逗号', 'C. 中文逗号', 'D. 换行符'],
        answer: 'B',
        explanation: 'CSV 全称逗号分隔值，默认用英文半角逗号隔开各列；换行符用来分隔不同的行。',
      },
      {
        id: 's7-01-q2',
        qtype: 'predict',
        stem: '下面代码的输出是什么？\nimport csv, io\nr = csv.reader(io.StringIO(\"苹果,3\\n香蕉,5\"))\nfor row in r:\n    print(row[0])',
        answer: '',
        keywords: [['苹果'], ['香蕉']],
        explanation: 'csv.reader 把每行读成列表，row[0] 是第一列，依次输出苹果、香蕉。',
      },
      {
        id: 's7-01-q3',
        qtype: 'blank',
        stem: '用 csv.DictReader 读取时，字典的键来自 CSV 的第一行，这一行叫作 ______。',
        answer: '表头',
        accepted: ['header', '表头行', '标题行'],
        explanation: 'DictReader 会把第一行当作表头，用其中的列名作为每行字典的键。',
      },
    ],
    minutes: 10,
    env: 'browser',
  },
  {
    id: 's7-02',
    stageId: 7,
    order: 2,
    title: 'JSON 数据深入',
    subtitle: '互联网世界通用的数据格式',
    hook: '你用的每一个手机应用，几乎都在和服务器交换 JSON。它长得像 Python 字典，却又不是字典——今天把这对"双胞胎"分清。',
    objectives: ['说出 JSON 是什么以及在哪些地方见到它', '会用 json.loads 把 JSON 字符串转成 Python 数据', '会用 json.dumps 把 Python 数据转成 JSON 字符串', '知道 ensure_ascii=False 的作用'],
    analogy: 'JSON 像一种"通用普通话"：不同语言写的程序都听得懂。Python 字典是它的母语版本，长得几乎一样，但 JSON 的键必须加英文双引号。',
    content: `# JSON：程序之间说话的普通话

**JSON** 是一种用文字表示结构化数据的格式。它源自 JavaScript，但现在几乎所有编程语言都能读写，是网络传数据的事实标准。

## 它长什么样

\`\`\`json
{
  "name": "小明",
  "age": 18,
  "skills": ["Python", "SQL"],
  "active": true
}
\`\`\`

它和 Python 字典很像，但有几个硬规矩：**键必须加英文双引号**、文字用双引号、布尔值是 \`true\` / \`false\`、空值是 \`null\`（Python 里对应 \`True\` / \`False\` / \`None\`）。

## 两个核心函数

- \`json.loads(字符串)\`：把 JSON 文字"读出"成 Python 数据（load string）
- \`json.dumps(数据)\`：把 Python 数据"写成" JSON 文字（dump string）

记住一句口诀：**带 s 的处理字符串**。还有两个不带 s 的 \`json.load\` / \`json.dump\`，它们是直接读写文件的，留给本地环境用。

## 嵌套与取值

JSON 可以一层套一层：字典里装列表，列表里再装字典。取值就一层层往里走，如 \`data["skills"][0]\`。

## 让中文正常显示

默认 \`json.dumps\` 会把中文转成 \`\\u5c0f\\u660e\` 这样的编码。加上 \`ensure_ascii=False\` 就能原样显示中文；再加 \`indent=2\` 还能自动缩进，方便人读。

> 浏览器里的 \`json\` 是标准库，直接 \`import json\` 就能用，不需要安装。`,
    examples: [
      {
        title: '解析一段 JSON 文字',
        code: `import json

text = '{"name": "小明", "age": 18, "skills": ["Python", "SQL"]}'
data = json.loads(text)        # 字符串 → Python 字典
print("姓名：", data["name"])
print("年龄：", data["age"])
print("第一个技能：", data["skills"][0])`,
        expectedOutput: `姓名： 小明
年龄： 18
第一个技能： Python`,
        lines: [
          { code: `json.loads(text)`, explain: '把 JSON 格式的字符串解析成 Python 字典。' },
          { code: `data["skills"][0]`, explain: '先按键 skills 取出列表，再用下标 0 取第一个元素。' },
        ],
      },
      {
        title: '把 Python 数据写成 JSON',
        code: `import json

info = {"name": "小红", "city": "深圳", "done": True}
print(json.dumps(info, ensure_ascii=False))
print(json.dumps(info, ensure_ascii=False, indent=2))`,
        expectedOutput: `{"name": "小红", "city": "深圳", "done": true}
{
  "name": "小红",
  "city": "深圳",
  "done": true
}`,
        lines: [
          { code: `ensure_ascii=False`, explain: '让中文按原样输出，而不是变成 \\u 编码。' },
          { code: `indent=2`, explain: '按 2 个空格缩进排版，人看起来更清楚。' },
          { code: `True → true`, explain: 'Python 的 True 在 JSON 里写成小写的 true。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: 'JSON 字符串',
        conceptB: 'Python 字典',
        diff: 'JSON 是文字（字符串），用来传输和保存；字典是内存里的对象，用来操作。两者要靠 loads / dumps 互相转换。',
        example: '从网络收到的是 JSON 字符串，json.loads 之后才能用 data["name"] 取值。',
      },
    ],
    pitfalls: [
      '手写 JSON 时用单引号或键不加引号——标准 JSON 必须用英文双引号。',
      '把 json.loads 用在文件对象上——它只接收字符串，文件要先 read()。',
      '中文显示成 \\u5c0f\\u660e——加 ensure_ascii=False 即可。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第14章 附近（JSON 数据）' },
      { book: 'abs3', chapter: '第18章 CSV、JSON和XML文件' },
    ],
    prerequisites: ['s2-07', 's5-04'],
    task: '把两位朋友的姓名和年龄组成列表，先 json.dumps 成字符串，再 json.loads 回来，确认内容一致。',
    exercises: [
      {
        id: 's7-02-q1',
        qtype: 'single',
        stem: '把 JSON 格式的字符串变成 Python 字典，应该用哪个函数？',
        options: ['A. json.dumps', 'B. json.loads', 'C. print', 'D. str'],
        answer: 'B',
        explanation: 'json.loads 负责把 JSON 字符串解析成 Python 数据；json.dumps 是反方向。',
      },
      {
        id: 's7-02-q2',
        qtype: 'predict',
        stem: '执行 import json; print(json.dumps({\"ok\": True, \"n\": None})) 的输出是？',
        answer: '',
        keywords: [['true'], ['null']],
        explanation: 'Python 的 True 和 None 转成 JSON 后变成小写的 true 和 null。',
      },
      {
        id: 's7-02-q3',
        qtype: 'blank',
        stem: 'json.dumps 时加上参数 ______ 可以让中文不转义成编码。',
        answer: 'ensure_ascii=False',
        accepted: ['ensure_ascii', 'ensure_ascii=False'],
        explanation: 'ensure_ascii=False 让中文字符原样输出，否则会被转成 \\u 开头的编码。',
      },
    ],
    minutes: 11,
    env: 'browser',
  },
  {
    id: 's7-03',
    stageId: 7,
    order: 3,
    title: '数据清洗基础',
    subtitle: '分析之前，先把数据洗干净',
    hook: '真实世界的数据几乎都是"脏"的：多打了一个空格、空着不填、大小写乱七八糟。直接拿去算，结果一定让你怀疑人生。',
    objectives: ['识别常见的几类脏数据', '会用 strip 去掉多余空白', '会跳过空值并做安全的数据类型转换', '会对数据去重'],
    analogy: '数据清洗就像洗菜下锅：泥沙要冲掉，烂叶子要摘掉，大小不一的要切整齐。菜洗干净了，后面怎么炒都不会出错。',
    content: `# 数据清洗：把脏数据洗干净

行业里有句话：**数据分析八成时间花在清洗上**。清洗没做好，后面的统计全是错的。

## 常见的"脏"长什么样

- 多余空白：\`" 苹果 "\` 和 \`"苹果"\` 看起来像，程序却当成两个东西
- 空值：空字符串 \`""\`，或者 JSON 里的 \`null\`、Python 里的 \`None\`
- 格式不统一：\`"88"\` 是文字，\`88\` 才是数字，文字直接相加会变成拼接
- 重复记录：同一条数据出现两次
- 命名混乱：\`"北京"\`、\`" 北京"\`、\`"beijing"\` 指同一个地方

## 清洗三板斧

1. **统一格式**：\`s.strip()\` 去两端空白，\`s.lower()\` 统一大小写
2. **处理空值**：先判断 \`if s:\` 再转换，空的跳过或记为 \`None\`
3. **去重**：用 \`if item not in cleaned\` 或 \`set()\`

## 顺序很重要

一定要**先 strip 再去重**。否则 \`" 苹果 "\` 和 \`"苹果"\` 会被当成两条不同数据，清洗完还是重复。

## 浏览器里怎么练

这些操作只用列表、字典和字符串方法，不需要读写文件，浏览器里直接跑。示例用内存里的列表当"原始数据"，本地项目里把它换成从 CSV / JSON 读进来的数据即可——清洗逻辑完全通用。

> 记住：清洗的目标不是"让数据好看"，而是"让数据可信"。`,
    examples: [
      {
        title: '去掉空白、空值和重复',
        code: `raw = [" 苹果 ", "香蕉", "", "苹果", "  橘子  "]
cleaned = []
for item in raw:
    name = item.strip()          # 先去掉两端空白
    if name and name not in cleaned:   # 跳过空字符串，并且去重
        cleaned.append(name)
print(cleaned)`,
        expectedOutput: `['苹果', '香蕉', '橘子']`,
        lines: [
          { code: `item.strip()`, explain: '去掉字符串两端的空格，" 苹果 " 变成 "苹果"。' },
          { code: `if name and ...`, explain: '空字符串是假值，if name 为假时跳过；not in 保证不重复添加。' },
        ],
      },
      {
        title: '安全地处理缺失值和类型转换',
        code: `rows = [
    {"name": "小明", "score": "88"},
    {"name": "小红", "score": ""},
    {"name": "小刚", "score": "92"},
]
for r in rows:
    s = r["score"].strip()
    r["score"] = int(s) if s else None   # 空的记为 None，不硬转
print(rows)`,
        expectedOutput: `[{'name': '小明', 'score': 88}, {'name': '小红', 'score': None}, {'name': '小刚', 'score': 92}]`,
        lines: [
          { code: `int(s) if s else None`, explain: '条件表达式：s 非空才转整数，否则记为 None，避免 int("") 报错。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '脏数据',
        conceptB: '干净数据',
        diff: '脏数据含空白、空值、重复和不一致格式，直接统计会出错；干净数据格式统一、无重复、类型正确，可以放心分析。',
        example: '" 88 " 和 "" 是脏的；88 和 None（明确表示缺失）是干净的。',
      },
    ],
    pitfalls: [
      '把空字符串 "" 和 None 混为一谈——前者是"填了但没内容"，后者是"压根没填"，处理策略不同。',
      '去重前忘了 strip，" 苹果 " 和 "苹果" 会被当成两条。',
      '直接对空字符串 int("")，会抛出 ValueError。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第14章 附近（数据整理）' },
      { book: 'abs3', chapter: '第18章 附近', note: '数据清洗为融合两书数据处理思想的归纳拓展主题' },
    ],
    prerequisites: ['s7-01', 's7-02'],
    task: '找 5 个含多余空格和空值的字符串，写一段代码把它们洗成干净的列表，并数一数洗掉了几条。',
    exercises: [
      {
        id: 's7-03-q1',
        qtype: 'boolean',
        stem: '数据清洗应该在数据分析之前做，否则统计结果可能不可信。',
        answer: '对',
        explanation: '脏数据会直接污染统计结果，所以清洗是分析的前置步骤。',
      },
      {
        id: 's7-03-q2',
        qtype: 'predict',
        stem: '执行 print(\"  hi  \".strip()) 输出什么？',
        answer: '',
        keywords: [['hi']],
        explanation: 'strip() 去掉字符串首尾的空白，结果是 hi。',
      },
      {
        id: 's7-03-q3',
        qtype: 'multiple',
        stem: '下面哪些属于常见的脏数据？（多选）',
        options: ['A. 多余的空格', 'B. 缺失的空值', 'C. 重复的记录', 'D. 已经统一成小写的字母'],
        answer: ['A', 'B', 'C'],
        explanation: '多余空格、空值、重复记录都会干扰统计；统一格式反而是清洗要达到的目标。',
      },
    ],
    minutes: 11,
    env: 'browser',
  },
  {
    id: 's7-04',
    stageId: 7,
    order: 4,
    title: '基础数据分析与 Matplotlib 可视化',
    subtitle: '让数字说话，让图表讲故事',
    hook: '给你 30 个数字，你盯半天也看不出规律；画成一张图，三秒钟就看出谁高谁低。这就是可视化的力量。',
    objectives: ['会计算总数、平均值、最大值、最小值', '知道 Matplotlib 需要本地 Python 环境', '能用文本方式做基础统计', '理解柱状图、折线图适合表达什么'],
    analogy: '统计像给数据"算总账"，画图像给数据"拍证件照"：账算清了才心里有数，照片一摆出来别人一眼就懂。',
    content: `# 从数字到图表

## 先学会"算总账"

基础分析就是几个问题：一共多少？平均多少？最高最低是多少？Python 自带 \`sum()\`、\`len()\`、\`max()\`、\`min()\`，几行就够。这部分在浏览器里也能跑，是我们推荐的**文本统计**方案。

## 再学会"拍照片"

图表能让趋势一目了然：

- **柱状图**：比较不同类别的多少，比如各月销售额
- **折线图**：看随时间变化的趋势，比如每日步数
- **饼图**：看各部分占比

## 关于环境的实话：Matplotlib 在浏览器里受限

Matplotlib 是最流行的绘图库，但它依赖本地图形环境，在当前手机浏览器的在线实验室里**无法稳定安装和运行**。所以这一课标注为 \`local\`：请按前面的教程准备好 Windows + VS Code，执行 \`pip install matplotlib\` 后再画图。

不想装库也没关系——示例一用纯 Python 做文本统计，浏览器里照样能跑通，学到的分析思路一模一样。**工具会变，思路不变。**

## 画图四步曲

导入 \`matplotlib.pyplot\`（约定缩写为 \`plt\`）→ 准备 x / y 数据 → 选一种图（如 \`plt.bar\`）→ 加标题坐标后 \`plt.show()\`。

> 中文字体若显示成方块，是字体设置问题，不影响代码逻辑；本地查阅相关字体配置即可解决。`,
    examples: [
      {
        title: '文本统计：不装任何库也能分析（浏览器可跑）',
        code: `scores = [88, 92, 75, 96, 80]
print("人数：", len(scores))
print("总分：", sum(scores))
print("平均分：", round(sum(scores) / len(scores), 1))
print("最高分：", max(scores), "最低分：", min(scores))`,
        expectedOutput: `人数： 5
总分： 431
平均分： 86.2
最高分： 96 最低分： 75`,
        lines: [
          { code: `sum(scores) / len(scores)`, explain: '总分除以人数就是平均分。' },
          { code: `round(..., 1)`, explain: '保留 1 位小数，让结果更好读。' },
          { code: `max / min`, explain: '内置函数直接给出最大最小值。' },
        ],
      },
      {
        title: 'Matplotlib 画柱状图（需本地环境）',
        code: `# 先执行：pip install matplotlib
import matplotlib.pyplot as plt

months = ["1月", "2月", "3月", "4月"]
sales = [120, 150, 98, 200]
plt.bar(months, sales)          # 柱状图
plt.title("季度销售额")
plt.xlabel("月份")
plt.ylabel("销售额（元）")
plt.show()`,
        expectedOutput: `（本地弹出图片窗口：1月120、2月150、3月98、4月200 四根柱子）`,
        lines: [
          { code: `plt.bar(months, sales)`, explain: 'bar 画柱状图，适合比较不同月份的数值大小。' },
          { code: `plt.title / xlabel / ylabel`, explain: '给图加标题和坐标轴说明，别人才能看懂。' },
          { code: `plt.show()`, explain: '显示图片；忘了它，图就不会弹出来。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '文本统计',
        conceptB: '可视化图表',
        diff: '文本统计给出精确数字、任何环境都能跑；图表直观展示趋势和对比，但需要绘图库，浏览器里受限。',
        example: '先算"平均 86.2 分"确认结果，再画柱状图看清每个人高低。',
      },
    ],
    pitfalls: [
      '在手机浏览器里 import matplotlib 失败——这是环境限制，不是代码错了，请切到本地环境。',
      '忘了调用 plt.show()，图不会显示。',
      '把列表长度当成平均值（len 是"个数"，不是"平均"）。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第15章 生成数据、第16章 下载数据', note: '可视化部分需本地 Python 环境' },
      { book: 'abs3', chapter: '第18章 附近（数据与可视化拓展）' },
    ],
    prerequisites: ['s7-03', 's6-01'],
    task: '用文本统计方法算出你一周开销的总数和平均值；如果已配好本地环境，再把它画成一张柱状图。',
    exercises: [
      {
        id: 's7-04-q1',
        qtype: 'boolean',
        stem: 'Matplotlib 绘图能在当前手机浏览器的在线实验室里稳定、直接地运行。',
        answer: '错',
        explanation: 'Matplotlib 依赖本地图形环境，浏览器里受限，本课标注 local，需要在本地 Python 中运行。',
      },
      {
        id: 's7-04-q2',
        qtype: 'blank',
        stem: '求列表 list1 中的最大值，使用内置函数 ______()。',
        answer: 'max',
        accepted: ['max', 'max()'],
        explanation: 'max(list1) 返回列表中的最大值；最小值用 min()。',
      },
      {
        id: 's7-04-q3',
        qtype: 'predict',
        stem: '执行 print(round(431 / 5, 1)) 输出什么？',
        answer: '',
        keywords: [['86.2']],
        explanation: '431 / 5 = 86.2，round(..., 1) 保留一位小数，结果仍是 86.2。',
      },
    ],
    minutes: 14,
    env: 'local',
  },
  {
    id: 's7-05',
    stageId: 7,
    order: 5,
    title: 'HTTP 基础与 API 是什么',
    subtitle: '让程序学会上网要数据',
    hook: '你刷手机时，应用一直在悄悄向服务器"要数据"：要今天的天气、要新的消息。它们之间说话的规矩叫 HTTP，开的那个窗口叫 API。',
    objectives: ['说出客户端、服务器、请求、响应的关系', '知道 GET 与 POST 的大致区别', '理解 API 是什么', '认识两个真实可用的公开接口'],
    analogy: 'API 像餐厅的菜单：你（客户端）按菜单点单（发请求），厨房（服务器）做好端出来（返回响应）。菜单上没写的菜，你点不到——接口规定了你能要什么。',
    content: `# HTTP 与 API：程序之间怎么聊天

## 一次对话的四要素

- **客户端**：发请求的一方，比如你的浏览器或手机应用
- **服务器**：接收请求、返回数据的一方
- **请求 request**：客户端说"我想要什么"
- **响应 response**：服务器说"给你，或者出错了"

你输入一个网址、按下回车，就是发了一次 HTTP 请求。

## 常见的动作与状态码

- **GET**：取数据，参数常写在网址后面，如 \`?q=python&page=1\`
- **POST**：提交数据，比如发一条评论，数据放在请求体里
- **200**：成功；**404**：没找到；**500**：服务器内部出错

## API 是什么

API（应用程序接口）就是别人开放给你的"数据窗口"。你按约定好的网址和参数去要，对方按约定好的格式（通常是 JSON）给你。这样你不用知道对方数据库长什么样。

## 真实可用的公开接口（不是编的）

本课只举两个真实存在的公开接口，你可以立刻在浏览器打开验证：

- \`https://httpbin.org/get\` —— 专门用来测试 HTTP 请求，会把你发的参数原样返回
- \`https://api.github.com\` —— GitHub 的公开接口，例如访问 \`https://api.github.com/users/octocat\` 能看到一个真实用户的信息

示例里也会出现"模拟数据示例"字样：那是**模仿真实接口返回结构**写的字符串，方便你在不联网时练习解析。我们绝不会编造一个根本不存在的接口地址——那只会把你带偏。

## 浏览器里的限制

在线实验室为了安全，通常不允许随意访问外部网络。所以这一课以**概念 + 本地网络请求**为主：示例用字符串演示解析，本地环境可以用 \`urllib.request\` 或第三方库真正发请求。`,
    examples: [
      {
        title: '解析一份模拟数据示例（结构仿照真实接口 https://api.github.com）',
        code: `import json

# 模拟数据示例：真实接口 https://api.github.com 返回的数据结构类似下面
fake_response = '{"login": "octocat", "public_repos": 8, "followers": 1000}'
user = json.loads(fake_response)
print("用户名：", user["login"])
print("公开仓库数：", user["public_repos"])
print("粉丝数：", user["followers"])`,
        expectedOutput: `用户名： octocat
公开仓库数： 8
粉丝数： 1000`,
        lines: [
          { code: `fake_response`, explain: '这是一段模拟数据示例，用来练习解析；真实数据请用 urllib 从接口获取。' },
          { code: `json.loads(...)`, explain: '接口返回的通常是 JSON 字符串，解析成字典后才能按键取值。' },
        ],
      },
      {
        title: '拼一个真实接口的网址（不发请求，也能看懂参数）',
        code: `# https://httpbin.org/get 是真实公开的测试接口
base = "https://httpbin.org/get"
params = [("q", "python"), ("page", "1")]
query = "&".join(k + "=" + v for k, v in params)
print(base + "?" + query)`,
        expectedOutput: `https://httpbin.org/get?q=python&page=1`,
        lines: [
          { code: `params`, explain: '网址里问号后面的部分叫查询参数，用 & 连接，形式是 键=值。' },
          { code: `"&".join(...)`, explain: '把每组参数拼成 键=值，再用 & 串起来，正是 GET 参数的写法。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: 'GET',
        conceptB: 'POST',
        diff: 'GET 把参数放网址里，用来"取数据"，能被收藏和缓存；POST 把数据放请求体，用来"提交数据"，更适合发评论、登录。',
        example: '看文章用 GET；发一条评论用 POST。',
      },
    ],
    pitfalls: [
      '把模拟数据当成真实接口返回的结果——模拟数据只是练习解析用的字符串。',
      '凭空编造一个接口地址——本课只用 httpbin.org 和 api.github.com 这类可验证的公开接口。',
      '把 404 当成"成功"——404 表示资源没找到，200 才是成功。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第17章 使用API', note: '示例接口 httpbin.org 与 api.github.com 均为公开可用接口' },
      { book: 'abs3', chapter: '第18章 附近（网络与数据拓展）' },
    ],
    prerequisites: ['s4-05', 's5-05'],
    task: '在浏览器打开 https://httpbin.org/get 看看返回的 JSON 长什么样，再用上面的模拟数据练习一次解析。',
    exercises: [
      {
        id: 's7-05-q1',
        qtype: 'single',
        stem: 'HTTP 请求中，最常用来"获取资源"的方法是？',
        options: ['A. GET', 'B. POST', 'C. UPDATE', 'D. DELETE'],
        answer: 'A',
        explanation: 'GET 用于获取资源，参数通常写在网址里；POST 多用于提交数据。',
      },
      {
        id: 's7-05-q2',
        qtype: 'boolean',
        stem: '本课示例里用到的 httpbin.org 和 api.github.com 是编造出来、实际并不能访问的接口。',
        answer: '错',
        explanation: '这两个都是真实、公开、可直接访问的接口；模拟数据只是模仿其返回结构，绝不能编造虚构接口。',
      },
      {
        id: 's7-05-q3',
        qtype: 'blank',
        stem: '服务器返回状态码 ______ 通常表示请求成功。',
        answer: '200',
        accepted: ['200', '200 OK'],
        explanation: '200 表示请求成功；常见的还有 404（未找到）和 500（服务器错误）。',
      },
    ],
    minutes: 10,
    env: 'browser',
  },
  {
    id: 's7-06',
    stageId: 7,
    order: 6,
    title: 'Web 应用与 Flask 入门',
    subtitle: '用 Python 写出自己的第一个网页',
    hook: '你每次打开网页，背后往往有个程序在认真接请求、回内容。Flask 让这件听起来很高级的事，几行代码就能做到。',
    objectives: ['理解 Web 应用"接收请求、返回内容"的基本流程', '会写出一个最小的 Flask 应用', '理解路由的作用', '知道 Flask 必须在本地环境运行'],
    analogy: 'Web 应用像一家小餐馆：网址是门牌号，路由是服务员，负责把客人带到对应的桌子（函数）；厨房做好菜（返回值）再端给客人（浏览器）。',
    content: `# 用 Flask 做自己的网页

## Web 应用到底在干什么

它就是一个**一直运行的程序**：浏览器发来请求，它根据网址决定调用哪个函数，把函数返回的内容送回浏览器。内容和逻辑都在服务器上，所以叫"服务端"。

## Flask 是什么

Flask 是一个轻量的 Python Web 框架，"轻"在核心简单、上手快，几行就能跑起来。更大的项目常用 Django——教材里讲的是 Django，思想相通，这里用 Flask 入门更省力。

## 先装再跑

这一课标注 \`local\`：在命令行执行 \`pip install flask\`，新建一个 \`app.py\`，写入最小应用，然后运行 \`python app.py\`。看到提示后，在浏览器打开 \`http://127.0.0.1:5000\` 就能看到你的网页。

> \`127.0.0.1\` 是"本机"的意思：这个网站只跑在你自己电脑上，别人访问不到，正好用来练习。

## 路由：网址和函数的对应关系

装饰器 \`@app.route("/")\` 把"根网址"和下面的函数绑在一起。你还可以写 \`@app.route("/user/<name>")\`，尖括号里的 \`name\` 会作为参数传给函数——网址不同，看到的内容就不同。

## 为什么浏览器实验室做不到

在线实验室运行的是临时代码，不能在你手机上启动一个长期运行的服务器。所以这一课必须切到本地 Windows + VS Code 环境，这也是"从学习走向实际应用"必经的一步。`,
    examples: [
      {
        title: '最小的 Flask 应用（需本地环境）',
        code: `# 先执行：pip install flask
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "你好，这是我的第一个网页！"

if __name__ == "__main__":
    app.run(debug=True)`,
        expectedOutput: `本地运行 python app.py 后，浏览器访问 http://127.0.0.1:5000 显示：你好，这是我的第一个网页！`,
        lines: [
          { code: `app = Flask(__name__)`, explain: '创建一个 Flask 应用实例，__name__ 让框架知道去哪里找资源。' },
          { code: `@app.route("/")`, explain: '路由装饰器：把根网址 / 交给 home 函数处理。' },
          { code: `app.run(debug=True)`, explain: '启动本地服务器；debug 模式下改代码会自动重载，方便调试。' },
        ],
      },
      {
        title: '带动态参数的多页面',
        code: `from flask import Flask

app = Flask(__name__)

@app.route("/user/<name>")
def user(name):
    return f"你好，{name}！欢迎光临。"

if __name__ == "__main__":
    app.run(debug=True)`,
        expectedOutput: `访问 http://127.0.0.1:5000/user/小明 显示：你好，小明！欢迎光临。`,
        lines: [
          { code: `@app.route("/user/<name>")`, explain: '尖括号声明一段动态路径，这部分内容会作为参数传给函数。' },
          { code: `def user(name)`, explain: '参数名要和路由里的 <name> 一致，Flask 会自动把网址里的值传进来。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '静态网页',
        conceptB: 'Flask Web 应用',
        diff: '静态网页内容写死在文件里，谁看都一样；Flask 应用每次请求都能动态生成内容，比如显示不同用户的名字。',
        example: '公司简介适合静态页；个人中心、留言板适合 Web 应用。',
      },
    ],
    pitfalls: [
      '在手机浏览器里 import flask 失败——必须在本地环境安装并运行。',
      '改了代码却没看到变化——debug 模式会自动重载，否则要手动重启服务器。',
      '端口 5000 被别的程序占用——关掉占用程序，或换一个端口。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第18-20章 Django入门及部署', note: '教材讲 Django，此处用更轻量的 Flask 演示同类 Web 应用思想' },
      { book: 'abs3', chapter: '第12章 附近（程序部署思路）' },
    ],
    prerequisites: ['s7-05', 's5-05'],
    task: '本地新建 app.py，写出首页和 /user/<name> 两个路由，启动后分别访问两个网址，确认显示不同内容。',
    exercises: [
      {
        id: 's7-06-q1',
        qtype: 'blank',
        stem: 'Flask 中声明"网址路径对应哪个函数"的装饰器是 @app.______。',
        answer: 'route',
        accepted: ['route', 'route()', '@app.route'],
        explanation: '@app.route(路径) 把某个网址和函数绑定起来，这就是路由。',
      },
      {
        id: 's7-06-q2',
        qtype: 'boolean',
        stem: 'Flask 应用可以直接在手机浏览器的在线实验室里启动服务器并长期运行。',
        answer: '错',
        explanation: '在线实验室无法启动本地服务器，Web 应用必须在本地 Python 环境中运行。',
      },
      {
        id: 's7-06-q3',
        qtype: 'predict',
        stem: '定义了 @app.route("/about") 后，访问哪个网址路径会触发对应函数？',
        answer: '',
        keywords: [['/about']],
        explanation: '路由里的路径就是触发条件，访问 /about 时 Flask 才会调用那个函数。',
      },
    ],
    minutes: 14,
    env: 'local',
  },
]
