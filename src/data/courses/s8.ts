import type { Lesson } from '../../types'

export const stage8Lessons: Lesson[] = [
  {
    id: 's8-01',
    stageId: 8,
    order: 1,
    title: '项目一：个人记账系统',
    subtitle: '从今天起，把每一笔花销都管起来',
    hook: '钱花到哪儿了？很多人月底都说不清。今天你亲手写一个记账本，让每一笔开销都留下痕迹——这是从"学着写"到"写来用"的第一步。',
    objectives: ['把一个真实需求拆成可执行的功能', '用字典表示一笔账、用列表管理多笔账', '写出"菜单循环 + 函数分派"的程序结构', '完成一个能记账、查看、汇总的小程序'],
    analogy: '记账系统像一本带目录的账本：一笔账是一行字（字典），整本账是很多行（列表），菜单就是目录，翻到哪页由你说了算。',
    content: `# 项目一：个人记账系统

## 一、项目需求

做一个能记录日常开销的小程序：每笔账包含日期、项目、金额三项信息。程序提供菜单，能记一笔、看全部、按项目汇总、退出。浏览器环境用内存列表保存数据；本地版本只需把列表换成文件读写，逻辑不用改。

## 二、功能拆解

1. 数据结构：用字典表示一笔账，用列表装下所有账目。
2. 记一笔：接收三项输入，追加到列表。
3. 看全部：逐行打印每一笔。
4. 做汇总：按项目累计金额，并算出总支出。
5. 主循环：用 while 显示菜单，根据选择调用不同函数，输入 0 退出。

## 三、开发思路

先把"一笔账"长什么样定清楚，再让列表管很多笔；每个功能写成独立函数，主菜单只负责调度。这种"分而治之"的思路，是后面所有项目的通用套路。

## 四、逐步实现

先写 \`add_record\` 完成添加；再写 \`show_all\` 逐行打印；然后写 \`summary\` 做分组累计；最后用 while 循环把菜单串起来。记住：每写完一个函数就单独测一次，别攒到最后一起调试。

## 五、常见错误

金额忘了用 \`int\` 或 \`float\` 转换，字符串相加会变成拼接；字典键名写错（如把"金额"写成"钱"），取值就找不到；退出条件是 \`choice == "0"\`，别写成赋值 \`=\`；列表为空时求平均会除以零。

## 六、最终成果

运行后出现菜单：输入 1 记账、2 查看、3 汇总、0 退出。选择汇总时，能清楚看到每个项目各花了多少、总共花了多少——一个真正能拿去用的记账本。

## 七、拓展挑战

给账目增加"分类"字段并按分类统计；本地版用 \`json.dumps\` 把数据存成文件，下次打开还能接着记；再加一个"撤销上一笔"的功能。`,
    examples: [
      {
        title: '核心数据结构与汇总函数',
        code: `def add_record(records, date, item, amount):
    records.append({"date": date, "item": item, "amount": amount})

def summary(records):
    total = 0
    by_item = {}
    for r in records:
        total += r["amount"]
        by_item[r["item"]] = by_item.get(r["item"], 0) + r["amount"]
    return total, by_item

records = []
add_record(records, "2026-11-19", "午餐", 25)
add_record(records, "2026-11-19", "公交", 4)
total, by_item = summary(records)
print("总支出：", total)
print("分项：", by_item)`,
        expectedOutput: `总支出： 29
分项： {'午餐': 25, '公交': 4}`,
        lines: [
          { code: `{"date": date, ...}`, explain: '一笔账用一个字典表示，字段名固定，后面取值才不会乱。' },
          { code: `by_item.get(r["item"], 0)`, explain: 'get 的第二个参数是默认值：这个项目第一次出现时从 0 开始累加。' },
        ],
      },
      {
        title: '菜单主循环：把功能串起来',
        code: `records = []
while True:
    print("1 记一笔  2 看全部  3 汇总  0 退出")
    choice = input("请选择：")
    if choice == "0":
        print("再见！")
        break
    elif choice == "1":
        item = input("项目：")
        amount = int(input("金额："))
        add_record(records, "今天", item, amount)
    elif choice == "3":
        total, _ = summary(records)
        print("总支出：", total)`,
        expectedOutput: `（菜单循环运行：输入 0 时输出：再见！）`,
        lines: [
          { code: `while True`, explain: '无限循环让菜单一直显示，直到遇到 break 才结束。' },
          { code: `choice == "0"`, explain: '用 == 比较字符串；记得把输入转成整数的地方也要一致。' },
        ],
      },
    ],
    visual: {
      kind: 'flow',
      title: '记账程序的一次菜单循环',
      description: '看一次"显示菜单 → 读入选择 → 分派功能 → 回到菜单"的完整流程。',
      steps: [
        { label: '第 1 步：显示菜单', detail: '打印 1 记一笔 / 2 看全部 / 3 汇总 / 0 退出' },
        { label: '第 2 步：读入选择', detail: 'choice = input("请选择：")', state: [{ name: 'choice', value: '"1"' }] },
        { label: '第 3 步：判断分派', detail: 'if choice == "0" 退出；elif 是 "1" 调用 add_record', state: [{ name: 'records', value: '[一笔新账]' }] },
        { label: '第 4 步：回到菜单', detail: '循环继续，等待下一次操作；输入 0 时 break 结束' },
      ],
    },
    compare: [
      {
        conceptA: '字典表示一笔账',
        conceptB: '列表表示所有账',
        diff: '字典用一个名字（键）定位一项信息，适合描述"一笔账"；列表按下标存放很多笔，适合管理"一本账"。',
        example: 'records[0]["amount"] 表示第一笔账的金额。',
      },
    ],
    pitfalls: [
      '金额没转成数字，导致 25 + 4 变成 "25" + "4" 拼成 "254"。',
      '把退出判断 choice == "0" 写成 choice = "0"，赋值和比较搞混。',
      '列表为空时直接算平均值，出现除以零错误。',
    ],
    sources: [
      {
        book: 'abs3',
        chapter: '第12章 设计并部署命令行程序（及末尾各章项目）',
        note: '本项目的命令行菜单结构来自 abs3，数据组织与汇总借鉴 pcc3 数据处理章节，是融合两书重构的项目',
      },
      { book: 'pcc3', chapter: '第6章 字典、第14章 附近（数据处理）' },
    ],
    prerequisites: ['s4-01', 's6-01', 's7-01', 's7-02'],
    task: '给记账系统加上"删除最后一笔"的功能：输入 4 时弹出 records 的最后一项，并提示删除成功。',
    exercises: [
      {
        id: 's8-01-q1',
        qtype: 'program',
        stem: '编程题：先从标准输入读入一个整数 n（支出笔数），接着读入 n 个整数金额（每个占一行）。输出两行：第一行「总计：X」，第二行「平均：Y」，其中 X 是金额总和，Y 是平均值并保留 1 位小数。例如输入 3、10、20、30，应输出「总计：60」和「平均：20.0」。',
        code: `n = int(input())
amounts = []
for _ in range(n):
    amounts.append(int(input()))
# 在这里计算总计和平均，并按格式输出`,
        answer: '',
        testCases: [{ stdin: '3\n10\n20\n30\n', expected: '总计：60\n平均：20.0' }],
        explanation: '用循环读入 n 个金额，sum 求总计，sum/len 求平均，再用 f-string 的 :.1f 保留一位小数。注意输出文字要和题目一致。',
      },
      {
        id: 's8-01-q2',
        qtype: 'single',
        stem: '在记账系统里，用哪种数据结构表示\"一笔账\"（含日期、项目、金额）最合适？',
        options: ['A. 一个整数', 'B. 一个字典', 'C. 一个字符串', 'D. 一个布尔值'],
        answer: 'B',
        explanation: '字典能用键存多项相关信息，如 date、item、amount，正好描述一笔账。',
      },
      {
        id: 's8-01-q3',
        qtype: 'debug',
        stem: '有同学写 total = total + amount，其中 amount = input() 得到的是 \"25\"，结果 total 变成了字符串拼接。该怎么改？',
        answer: '',
        keywords: [['int', 'float', '转换']],
        explanation: 'input() 返回的永远是字符串，计算前要先用 int(amount) 或 float(amount) 转成数字。',
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's8-02',
    stageId: 8,
    order: 2,
    title: '项目二：自动文件整理工具',
    subtitle: '让乱糟糟的下载文件夹自己归位',
    hook: '下载文件夹里图片、文档、压缩包全堆在一起？写个小程序，按文件类型自动分门别类——这正是 Python 最擅长的"体力活"。',
    objectives: ['用 pathlib 遍历文件夹并判断文件类型', '按扩展名把文件分到不同文件夹', '安全地移动文件并处理重名', '养成先预览再执行的好习惯'],
    analogy: '文件整理工具像一位勤劳的图书管理员：先看书名（扩展名）判断类别，再按类别放到对应书架（文件夹），而且动手前先列一张清单核对。',
    content: `# 项目二：自动文件整理工具

## 一、项目需求

写一个程序，把"下载"文件夹里的文件按扩展名归类：图片放"图片"，PDF 和 Word 放"文档"，其余放"其他"。要求不误删、不覆盖，整理完打印一份清单。

## 二、功能拆解

1. 遍历源文件夹里的每一项，跳过文件夹只处理文件。
2. 用 \`suffix\` 取扩展名并转成小写。
3. 按映射表找到目标类别，没有就归"其他"。
4. 创建目标文件夹（已存在就复用）。
5. 移动文件，遇到同名先改名，避免覆盖。

## 三、开发思路

路径别用字符串硬拼，交给 \`pathlib.Path\`——它用 \`/\` 运算符拼路径，跨平台不会出错。移动文件用 \`shutil.move\`。最关键的一步：先写"预览模式"，只打印将要做什么，确认无误再真正执行。

## 四、逐步实现

先写遍历并打印每个文件的扩展名；再加分类映射表 \`rules\`；然后创建目标文件夹；最后调用 \`shutil.move\`。每一步都在小文件夹里试跑，别一上来就拿真实资料开刀。

## 五、常见错误

源路径写错导致"找不到文件"；把文件夹也当文件移动；目标文件夹忘了 \`exist_ok=True\` 会报"已存在"错误；两个同名文件直接移动会互相覆盖；文件正被其他程序占用时移动会失败。

## 六、最终成果

运行后，杂乱的下载文件夹被整理得井井有条，屏幕上列出"照片.jpg → 图片"这样的清单，一目了然。

## 七、拓展挑战

按修改日期归档到"2026-11"这样的月份文件夹；递归处理子文件夹；把操作写成日志记录到文本文件；加一个"撤销上次整理"的功能。`,
    examples: [
      {
        title: '按扩展名分类并移动',
        code: `from pathlib import Path
import shutil

source = Path("下载")
target = Path("整理后")
rules = {".jpg": "图片", ".png": "图片", ".pdf": "文档", ".docx": "文档"}

for f in source.iterdir():
    if not f.is_file():
        continue
    folder = rules.get(f.suffix.lower(), "其他")
    dest_dir = target / folder
    dest_dir.mkdir(parents=True, exist_ok=True)
    shutil.move(str(f), str(dest_dir / f.name))
    print(f"移动：{f.name} → {folder}")`,
        expectedOutput: `移动：照片.jpg → 图片
移动：说明.pdf → 文档
移动：misc.txt → 其他`,
        lines: [
          { code: `f.suffix.lower()`, explain: 'suffix 取扩展名（含点号），lower 统一成小写，避免 .JPG 漏判。' },
          { code: `target / folder`, explain: 'Path 重载了 / 运算符用来拼路径，比字符串拼接安全。' },
          { code: `mkdir(parents=True, exist_ok=True)`, explain: '一次创建多级目录；目录已存在也不报错。' },
        ],
      },
      {
        title: '先预览：只看看，不动手',
        code: `from pathlib import Path

for f in Path("下载").iterdir():
    if f.is_file():
        print(f.name, "的扩展名是", f.suffix or "（无）")`,
        expectedOutput: `照片.jpg 的扩展名是 .jpg
说明.pdf 的扩展名是 .pdf
README 的扩展名是 （无）`,
        lines: [
          { code: `f.suffix or "（无）"`, explain: '没有扩展名时 suffix 是空字符串，用 or 给出提示文字。' },
          { code: `只 print 不 move`, explain: '预览模式能帮你发现规则写错、路径写错等问题，是安全整理的护身符。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '预览模式',
        conceptB: '执行模式',
        diff: '预览模式只打印计划、不改动文件，用来检查规则；执行模式才真正移动文件。先预览后执行，能避免不可逆的错误。',
        example: '开发时固定用预览，确认清单正确后，再把 move 那行代码放开。',
      },
    ],
    pitfalls: [
      '路径用字符串硬拼，反斜杠和斜杠混用，换个系统就出错——用 pathlib。',
      '忘了跳过文件夹，把整个子目录当文件移动。',
      '同名文件直接移动会覆盖，移动前要检查目标是否存在并改名。',
    ],
    sources: [
      {
        book: 'abs3',
        chapter: '第12章 设计并部署命令行程序（及末尾各章项目）',
        note: '本项目融合两书重构：文件遍历与自动化思路来自 abs3，pathlib 写法为现代 Python 推荐方式',
      },
      { book: 'pcc3', chapter: '第10章 附近（文件与异常处理）' },
    ],
    prerequisites: ['s5-04', 's6-01'],
    task: '先写一个只打印不移动的预览版，确认规则正确后，再加入真正移动的代码，并给同名文件自动加序号。',
    exercises: [
      {
        id: 's8-02-q1',
        qtype: 'single',
        stem: '在 pathlib 中，表达式 Path("a") / "b" 表示什么？',
        options: ['A. 做除法运算', 'B. 拼接路径得到 a/b', 'C. 比较两个路径', 'D. 删除文件'],
        answer: 'B',
        explanation: 'Path 重载了 / 运算符，用来把两段路径拼成 a/b，跨平台都正确。',
      },
      {
        id: 's8-02-q2',
        qtype: 'boolean',
        stem: '真正移动文件之前，先写\"预览模式\"打印将要做的操作，是个好习惯。',
        answer: '对',
        explanation: '预览能在不改动文件的前提下检查规则和路径，避免不可逆的误操作。',
      },
      {
        id: 's8-02-q3',
        qtype: 'predict',
        stem: '执行 Path(\"note.TXT\").suffix.lower() 得到什么？',
        answer: '',
        keywords: [['.txt']],
        explanation: 'suffix 得到 ".TXT"，lower() 转成小写 ".txt"，正好用于统一扩展名。',
      },
    ],
    minutes: 16,
    env: 'local',
  },
  {
    id: 's8-03',
    stageId: 8,
    order: 3,
    title: '项目三：Excel 数据分析工具',
    subtitle: '让表格自己算出答案',
    hook: '面对几百行销售记录，手工加一遍又慢又容易错。写个程序读进去、算一算、写回来——这才是 Python 帮你省时间的正确姿势。',
    objectives: ['用 openpyxl 读取 Excel 数据', '跳过表头并逐行累计', '把统计结果写入新文件', '识别并处理单元格类型问题'],
    analogy: '这个工具像一位会计助手：按行翻账本（读每一行），把同名科目的金额累加（分组统计），最后在账本末尾写一张汇总表（写回文件）。',
    content: `# 项目三：Excel 数据分析工具

## 一、项目需求

有一份"销售.xlsx"，每行是"产品、金额"。请统计每个产品的销售额，把结果打印出来，并另存为一份新表格，不破坏原始文件。

## 二、功能拆解

1. 用 \`load_workbook\` 打开工作簿，取活动工作表。
2. 从第 2 行开始遍历，跳过表头。
3. 逐行取产品名和金额，空的跳过。
4. 用字典按产品累计金额。
5. 打印汇总，并在新工作簿中写入结果、保存。

## 三、开发思路

表头只是说明，不是数据，所以 \`min_row=2\` 很关键。金额在 Excel 里可能是数字，也可能是文字，统一用 \`float()\` 转成数字再累加。永远写新文件（如"销售_统计后.xlsx"），别覆盖原件。

## 四、逐步实现

先只读前 3 行看看数据结构；再写累计字典；然后打印结果；最后用 \`openpyxl.Workbook()\` 新建表格写入并保存。每步都拿一小段数据验证。

## 五、常见错误

\`min_row\` 设成 1，把表头"产品、金额"当成数据累计；单元格是字符串没转数字，导致拼接；把 \`None\` 直接转 float 报错；直接 \`wb.save("销售.xlsx")\` 覆盖了原始文件，数据找不回来。

## 六、最终成果

屏幕输出"苹果：1200.00 元"这样的汇总，同时生成新文件"销售_统计后.xlsx"，里面是一张干净的统计表——原件完好无损。

## 七、拓展挑战

把统计结果做成柱状图插入表格；一次处理一个文件夹里的多份表格；只统计金额大于 100 的记录；按月份分组做对比。`,
    examples: [
      {
        title: '读取并分组统计',
        code: `# 先执行：pip install openpyxl
from openpyxl import load_workbook

wb = load_workbook("销售.xlsx", data_only=True)
ws = wb.active

total_by_product = {}
for row in ws.iter_rows(min_row=2, values_only=True):
    product, amount = row[0], row[1]
    if product is None or amount is None:
        continue
    total_by_product[product] = total_by_product.get(product, 0) + float(amount)

for name, money in total_by_product.items():
    print(f"{name}：{money:.2f} 元")`,
        expectedOutput: `苹果：1200.00 元
香蕉：800.00 元`,
        lines: [
          { code: `min_row=2`, explain: '从第 2 行开始读，跳过第 1 行的表头。' },
          { code: `values_only=True`, explain: '直接拿到单元格的值，而不是 Cell 对象，处理更方便。' },
          { code: `float(amount)`, explain: '统一转成数字，避免字符串拼接；:.2f 让输出保留两位小数。' },
        ],
      },
      {
        title: '把结果写入新文件',
        code: `from openpyxl import Workbook

out = Workbook()
sheet = out.active
sheet["A1"] = "产品"
sheet["B1"] = "销售额"
for i, (name, money) in enumerate(total_by_product.items(), start=2):
    sheet.cell(row=i, column=1, value=name)
    sheet.cell(row=i, column=2, value=round(money, 2))
out.save("销售_统计后.xlsx")
print("已保存到新文件，原文件未改动")`,
        expectedOutput: `已保存到新文件，原文件未改动`,
        lines: [
          { code: `enumerate(..., start=2)`, explain: '从 2 开始编号，正好跳过新表的表头行。' },
          { code: `out.save("销售_统计后.xlsx")`, explain: '写到新文件名，保护原始数据，这是数据处理的好习惯。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '原文件',
        conceptB: '统计结果新文件',
        diff: '原文件保留原始数据，随时可复查；结果文件只放加工后的内容，方便交付。两者分开，出错也能重来。',
        example: '"销售.xlsx" 只读不改，"销售_统计后.xlsx" 用来写汇总。',
      },
    ],
    pitfalls: [
      'min_row 写成 1，把表头也当数据参与统计。',
      '单元格是字符串却直接相加，变成文字拼接而不是数值累加。',
      '直接保存回原文件名，覆盖了原始数据，无法恢复。',
    ],
    sources: [
      {
        book: 'abs3',
        chapter: '第12章 设计并部署命令行程序（及末尾各章项目）',
        note: '本项目融合两书重构：命令行与数据处理流程参考 abs3，openpyxl 为现代 Excel 处理工具',
      },
      { book: 'pcc3', chapter: '第14章 附近（数据处理）' },
    ],
    prerequisites: ['s6-03', 's7-03'],
    task: '给统计脚本加一个筛选：只统计金额大于 100 的记录，并把结果写入新文件。',
    exercises: [
      {
        id: 's8-03-q1',
        qtype: 'blank',
        stem: 'openpyxl 中打开一个已存在工作簿，使用的函数是 ______()。',
        answer: 'load_workbook',
        accepted: ['load_workbook', 'load_workbook()'],
        explanation: 'load_workbook(文件名) 用来读取已有的 Excel 文件；新建工作簿用 Workbook()。',
      },
      {
        id: 's8-03-q2',
        qtype: 'multiple',
        stem: '处理 Excel 数据时，哪些做法容易导致错误？（多选）',
        options: ['A. 忘记跳过表头行', 'B. 数字单元格是字符串却直接相加', 'C. min_row 设成 1 把表头当数据', 'D. 把金额转成 float 再累加'],
        answer: ['A', 'B', 'C'],
        explanation: 'A、B、C 都会让统计结果出错；转成 float 再算是正确做法。',
      },
      {
        id: 's8-03-q3',
        qtype: 'boolean',
        stem: '为了省事，处理完 Excel 后直接覆盖保存原文件是最安全的做法。',
        answer: '错',
        explanation: '覆盖原文件会丢失原始数据，一旦逻辑出错无法恢复；应另存为新文件。',
      },
    ],
    minutes: 18,
    env: 'local',
  },
  {
    id: 's8-04',
    stageId: 8,
    order: 4,
    title: '项目四：个人任务管理程序',
    subtitle: '把待办事项交给程序替你记',
    hook: '待办事项越积越多，脑子记不住？写一个任务管理程序，添加、完成、删除、统计都交给它，你只需要决定先做哪一件。',
    objectives: ['设计合理的任务数据结构', '实现任务的增删改查', '用布尔值表示完成状态', '写出清晰的主菜单循环'],
    analogy: '任务管理程序像一张便利贴墙：每张便利贴是一项任务（字典），墙上贴了很多张（列表），写完了就打个勾（done=True），不需要的就撕掉。',
    content: `# 项目四：个人任务管理程序

## 一、项目需求

做一个命令行小工具：能添加任务、查看所有任务、把某任务标记为完成、删除任务、统计还有几件没做。数据在浏览器里用内存列表保存，本地版可换成 JSON 文件持久化。

## 二、功能拆解

1. 任务结构：\`id\`、\`title\`、\`done\` 三个字段。
2. 添加：分配一个不重复的 id，状态设为未完成。
3. 查看：每行显示"序号、标题、是否完成"。
4. 完成/删除：按 id 找到任务再操作。
5. 统计：数一数 \`done\` 为 \`False\` 的任务有几个。

## 三、开发思路

状态用布尔值 \`True\` / \`False\`，别用『完成』和『未完成』这种字符串——字符串容易写法不一致。id 用一个独立变量递增分配，删除后也不会重复。每个操作写成函数，主循环只做"读选择、调函数、打印结果"。

## 四、逐步实现

先写 \`add_task\` 和 \`list_tasks\` 跑通"添加→查看"；再写 \`finish\` 用循环按 id 查找；然后写 \`remove\`；最后加统计和菜单。查找时一旦找到就 \`return\`，别继续往后找。

## 五、常见错误

id 写死导致重复；把状态写成字符串，判断时拼错字母就永远匹配不上；修改任务时循环里没 \`return\`，结果找到了还继续跑；空列表时直接取 \`tasks[0]\` 报错。

## 六、最终成果

菜单里有添加、查看、完成、删除、统计五项。运行后你能清楚地看到哪些任务已完成、还剩几件要做——一个真正帮你减负的小工具。

## 七、拓展挑战

给任务加优先级和截止日期；按状态过滤只看未完成；本地版把任务存成 JSON 文件，关掉程序再打开还在；加一个"清空已完成"的批量操作。`,
    examples: [
      {
        title: '任务数据结构与添加、查看',
        code: `tasks = []
next_id = 1

def add_task(title):
    global next_id
    tasks.append({"id": next_id, "title": title, "done": False})
    next_id += 1

def list_tasks():
    for t in tasks:
        mark = "√" if t["done"] else " "
        print(f"[{mark}] {t['id']}. {t['title']}")

add_task("写周报")
add_task("复习 Python")
list_tasks()`,
        expectedOutput: `[ ] 1. 写周报
[ ] 2. 复习 Python`,
        lines: [
          { code: `global next_id`, explain: '函数里要修改全局变量 next_id，必须用 global 声明。' },
          { code: `"√" if t["done"] else " "`, explain: 'done 为 True 就打勾，否则留空，用布尔值控制显示最清楚。' },
        ],
      },
      {
        title: '按 id 完成任务',
        code: `def finish(task_id):
    for t in tasks:
        if t["id"] == task_id:
            t["done"] = True
            return True
    return False

print("完成第 1 项：", finish(1))
list_tasks()`,
        expectedOutput: `完成第 1 项： True
[√] 1. 写周报
[ ] 2. 复习 Python`,
        lines: [
          { code: `if t["id"] == task_id`, explain: '按 id 精确查找，id 不重复才能保证找到的正是那一项。' },
          { code: `return True`, explain: '找到并处理完就立刻返回，避免循环继续做多余的事。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '布尔状态 True / False',
        conceptB: '字符串状态 "完成" / "未完成"',
        diff: '布尔值只有两种取值，判断简单不会写错；字符串可能有空格、错别字、大小写差异，判断时极易漏掉。',
        example: 'if t["done"] 一眼就懂；if t["state"] == "已完成 " 多一个空格就永远不成立。',
      },
    ],
    pitfalls: [
      '用字符串表示完成状态，写法不一致导致判断永远不成立。',
      'id 写死或重复，完成第 1 项时可能误改另一项。',
      '循环找到任务后忘了 return，继续遍历做了多余操作。',
    ],
    sources: [
      {
        book: 'abs3',
        chapter: '第12章 设计并部署命令行程序（及末尾各章项目）',
        note: '本项目融合两书重构：命令行程序骨架来自 abs3，任务建模思路借鉴 pcc3 字典与列表章节',
      },
      { book: 'pcc3', chapter: '第6章 字典、第8章 附近（函数）' },
    ],
    prerequisites: ['s4-01', 's2-07'],
    task: '给任务管理程序加上"统计未完成数量"菜单项：遍历列表，数出 done 为 False 的任务并打印。',
    exercises: [
      {
        id: 's8-04-q1',
        qtype: 'program',
        stem: '编程题：先读入一个整数 n，接着读入 n 行，每行是 0 或 1（0 表示未完成，1 表示已完成）。输出一行「未完成：X」，X 为 0 出现的次数。例如输入 5、0、1、0、0、1，应输出「未完成：3」。',
        code: `n = int(input())
states = []
for _ in range(n):
    states.append(int(input()))
# 在这里统计 0 的个数并按格式输出`,
        answer: '',
        testCases: [{ stdin: '5\n0\n1\n0\n0\n1\n', expected: '未完成：3' }],
        explanation: '用循环读入 n 个状态，再用 states.count(0) 数出未完成任务数，最后按格式输出。',
      },
      {
        id: 's8-04-q2',
        qtype: 'single',
        stem: '表示任务的\"完成 / 未完成\"状态，最合适的数据类型是？',
        options: ['A. 整数', 'B. 布尔值', 'C. 列表', 'D. 字典'],
        answer: 'B',
        explanation: '布尔值 True / False 只有两种状态，语义清晰，判断时不会因写法不一致出错。',
      },
      {
        id: 's8-04-q3',
        qtype: 'predict',
        stem: '执行 print([0, 1, 0, 1, 0].count(0)) 输出什么？',
        answer: '',
        keywords: [['3']],
        explanation: 'count(0) 统计列表中 0 出现的次数，共 3 次，输出 3。',
      },
    ],
    minutes: 16,
    env: 'browser',
  },
  {
    id: 's8-05',
    stageId: 8,
    order: 5,
    title: '项目五：简单 Web 应用',
    subtitle: '把你写的东西放到网页上',
    hook: '前面写的程序都只能在命令行里跑。最后一个项目，我们把它变成一个网页——打开浏览器就能用，这才是"从学习走向实际应用"的完整闭环。',
    objectives: ['用 Flask 写出可添加待办的小网站', '区分 GET 请求与 POST 提交', '用 request.form 读取表单数据', '理解项目从命令行到网页的迁移过程'],
    analogy: '这个网站像一张在线便利贴墙：浏览器是访客，Flask 是墙的管理员；访客填表提交（POST）就贴一张，刷新页面（GET）就看到全部。',
    content: `# 项目五：简单 Web 应用

## 一、项目需求

把项目四的任务清单搬到网页上：打开首页能看到所有待办，页面上有输入框，提交后新增一项。数据先用内存列表保存，本地运行即可体验。

## 二、功能拆解

1. 一个首页路由 \`/\`，同时接受 GET（显示）和 POST（提交）。
2. GET 时生成任务列表的 HTML 页面。
3. POST 时用 \`request.form\` 读取输入框内容，加入列表。
4. 提交后用 \`redirect\` 回到首页，避免刷新重复提交。
5. 再加一个 \`/api/todos\` 返回 JSON，让程序也能读数据。

## 三、开发思路

同一个网址要处理两种请求：第一次打开是 GET，用来显示；填表提交是 POST，用来写入。所以 \`@app.route\` 要写 \`methods=["GET", "POST"]\`。HTML 可以直接用字符串拼接（入门够用），进阶再用模板文件。

## 四、逐步实现

先写只返回"你好"的最小应用跑通；再加任务列表的 HTML 拼接；然后处理 POST 提交；最后加 JSON 接口。每改一次都在浏览器刷新看效果。

## 五、常见错误

路由忘了写 \`methods=["POST"]\`，提交时报 405；表单 input 的 \`name\` 和 \`request.form.get\` 里的名字对不上，永远读到空值；忘写 \`debug=True\`，改代码要手动重启；端口 5000 被占用。

## 六、最终成果

本地启动后打开 \`http://127.0.0.1:5000\`，能看到待办清单，输入内容点添加，列表立刻变长；访问 \`/api/todos\` 还能拿到 JSON 数据——一个真正的 Web 应用诞生了。

## 七、拓展挑战

用模板文件（Jinja2）代替字符串拼接；把数据存进 SQLite 数据库，关闭程序也不丢；加上删除按钮和完成勾选；把应用部署到云平台让别人也能访问。`,
    examples: [
      {
        title: '能添加待办的首页（需本地环境）',
        code: `# 先执行：pip install flask
from flask import Flask, request, redirect, url_for

app = Flask(__name__)
todos = []

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        todos.append(request.form.get("title", "").strip())
        return redirect(url_for("index"))
    items = "".join(f"<li>{t}</li>" for t in todos)
    return f"<h1>待办清单</h1><ul>{items}</ul>" \\
           f"<form method='post'><input name='title'>" \\
           f"<button>添加</button></form>"

if __name__ == "__main__":
    app.run(debug=True)`,
        expectedOutput: `本地运行 python app.py 后，访问 http://127.0.0.1:5000 显示待办清单；提交后列表新增一项`,
        lines: [
          { code: `methods=["GET", "POST"]`, explain: '同一个网址既要显示又要接收提交，两种方法一并声明。' },
          { code: `request.form.get("title", "")`, explain: '读取表单里 name 为 title 的输入框；给默认值""，没填也不会报错。' },
          { code: `redirect(url_for("index"))`, explain: '提交后跳回首页，避免刷新页面导致重复提交。' },
        ],
      },
      {
        title: '再提供一个 JSON 接口',
        code: `from flask import jsonify

@app.route("/api/todos")
def api_todos():
    return jsonify({"count": len(todos), "items": todos})`,
        expectedOutput: `访问 http://127.0.0.1:5000/api/todos 得到类似：{"count": 1, "items": ["写周报"]}`,
        lines: [
          { code: `jsonify(...)`, explain: '把 Python 字典转成 JSON 响应，并设置正确的响应类型。' },
          { code: `/api/todos`, explain: '这种给程序读的接口就是 API，和网页共用同一份数据。' },
        ],
      },
    ],
    compare: [
      {
        conceptA: 'GET 请求',
        conceptB: 'POST 请求',
        diff: 'GET 用来"看"，参数出现在网址里，适合打开页面；POST 用来"交"，数据放在请求体里，适合提交表单。',
        example: '打开待办清单是 GET；点"添加"按钮提交内容是 POST。',
      },
    ],
    pitfalls: [
      '路由忘了写 methods=["POST"]，提交表单时报 405 方法不允许。',
      'input 的 name 与 request.form.get 的参数名不一致，读到空字符串。',
      '没开 debug 模式，改代码后必须手动重启服务器才生效。',
    ],
    sources: [
      {
        book: 'pcc3',
        chapter: '第18-20章 Django入门及部署',
        note: '教材讲 Django，本项目用更轻量的 Flask 实现同类 Web 应用，是融合两书重构的实战项目',
      },
      { book: 'abs3', chapter: '第12章 附近（程序部署与项目组织）' },
    ],
    prerequisites: ['s7-06', 's5-05'],
    task: '给网页版待办加上"删除"功能：每项旁边放一个按钮，提交 id 后从列表中移除，再跳回首页。',
    exercises: [
      {
        id: 's8-05-q1',
        qtype: 'single',
        stem: 'Flask 路由要接收表单的 POST 提交，@app.route 里必须写哪个参数？',
        options: ['A. method="post"', 'B. methods=["POST"]', 'C. post=True', 'D. 什么都不用写'],
        answer: 'B',
        explanation: 'methods 参数接收一个方法列表，写 methods=["GET", "POST"] 才能处理提交。',
      },
      {
        id: 's8-05-q2',
        qtype: 'boolean',
        stem: 'request.form 用来读取 GET 请求带过来的网址参数。',
        answer: '错',
        explanation: 'request.form 读取 POST 表单数据；GET 的网址参数用 request.args 读取。',
      },
      {
        id: 's8-05-q3',
        qtype: 'blank',
        stem: 'Flask 中把 Python 字典变成 JSON 响应，使用 ______() 函数。',
        answer: 'jsonify',
        accepted: ['jsonify', 'jsonify()'],
        explanation: 'jsonify 会把字典转成 JSON 格式并设置正确的响应类型，适合写 API 接口。',
      },
    ],
    minutes: 18,
    env: 'local',
  },
]
