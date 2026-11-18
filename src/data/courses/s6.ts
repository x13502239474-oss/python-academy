import type { Lesson } from '../../types'

export const stage6Lessons: Lesson[] = [
  {
    id: 's6-01',
    stageId: 6,
    order: 1,
    title: '文件与文件夹管理',
    subtitle: '让 Python 替你整理乱糟糟的下载目录',
    hook: '下载文件夹里堆了几百个文件？与其一个个手动拖，不如写十行代码，让 Python 一眼看清都有什么，再按需归档。',
    objectives: ['会用 pathlib 表示路径并遍历文件夹', '会判断文件是否存在、批量筛选文件', '知道如何安全地删除文件'],
    content: `# 文件与文件夹管理（需要本地环境）

**这一课需要 Windows + VS Code 本地环境。**浏览器运行在隔离沙箱里，看不到你电脑上的真实文件夹，更没法整理它们。所有文件管理代码都要在本地跑。

处理回收站式的安全删除，推荐装一个小工具库：

\`\`\`
pip install send2trash
\`\`\`

## 路径：先学会『报地址』

\`pathlib\` 是处理路径的推荐工具（Python 自带，不用装）：

\`\`\`python
from pathlib import Path

p = Path("D:/下载/报告.xlsx")
print(p.name)        # 报告.xlsx
print(p.suffix)      # .xlsx
print(p.stem)        # 报告
print(p.parent)      # D:/下载
\`\`\`

写路径时用**正斜杠 /**，避开反斜杠转义的麻烦。

## 遍历文件夹

\`\`\`python
folder = Path("D:/下载")
for f in folder.iterdir():        # 只看这一层
    if f.is_file():
        print(f.name)

for f in folder.rglob("*.xlsx"):  # 递归找所有 Excel
    print(f)
\`\`\`

\`glob()\` 匹配当前层，\`rglob()\` 连子文件夹一起翻。\`*.xlsx\` 里的星号代表任意文件名。

## 创建、判断、删除

- \`folder.mkdir(exist_ok=True)\`：建文件夹，已存在也不报错
- \`p.exists()\` / \`p.is_file()\` / \`p.is_dir()\`：判断状态
- \`p.unlink()\`：删除文件；\`p.rmdir()\`：删除空文件夹

**重要**：\`unlink()\` 是彻底删除，不进回收站！练习时先用 \`send2trash\` 或只 \`print\` 不删，确认无误再动手。

## 真实办公场景

每月把『下载』里的 \`.xlsx\` 全部挑出来，移进『财务报表/2026』文件夹——这段脚本十秒钟搞定，还不会漏。`,
    examples: [
      {
        title: '扫描下载文件夹并分类统计',
        code: 'from pathlib import Path\n\nfolder = Path("D:/下载")\nif not folder.exists():\n    print("文件夹不存在，请检查路径")\nelse:\n    summary = {}\n    for f in folder.iterdir():\n        if f.is_file():\n            ext = f.suffix.lower() or "无扩展名"\n            summary[ext] = summary.get(ext, 0) + 1\n    print("下载目录里共有", sum(summary.values()), "个文件")\n    for ext, count in sorted(summary.items(), key=lambda x: -x[1]):\n        print(f"{ext}: {count} 个")',
        lines: [
          { code: 'folder.iterdir()', explain: '遍历文件夹里直接包含的内容，返回的是 Path 对象，不是纯字符串。' },
          { code: 'f.suffix.lower()', explain: '取出扩展名并转小写，这样 .XLSX 和 .xlsx 会被算成一类。' },
          { code: 'summary.get(ext, 0) + 1', explain: '字典计数常用套路：取不到就用默认值 0，再加一。' },
        ],
      },
    ],
    pitfalls: ['在路径里用反斜杠又没转义，如 "D:\\下载"——推荐直接写正斜杠 "D:/下载"。', '用 unlink() 删除后才发现删错了——它不进回收站，练习时先只打印不删。', '遍历时又建文件夹又删文件，导致遍历结果变化——先收集列表，再统一处理。'],
    sources: [{ book: 'abs3', chapter: '第11章 组织文件' }],
    prerequisites: ['s5-04'],
    task: '写一个脚本，扫描你桌面上的一个文件夹，统计各类文件（按扩展名）的数量，并输出结果。',
    exercises: [
      {
        id: 's6-01-q1',
        qtype: 'single',
        stem: '想递归找出一个文件夹及其所有子文件夹里的 Excel 文件，最合适的方法是？',
        options: ['A. p.iterdir()', 'B. p.rglob(\'*.xlsx\')', 'C. p.name', 'D. p.exists()'],
        answer: 'B',
        explanation: 'rglob() 会递归遍历所有子目录，配合通配符 *.xlsx 就能找出全部 Excel 文件；iterdir() 只看当前一层。',
      },
      {
        id: 's6-01-q2',
        qtype: 'blank',
        stem: 'Path(\'报告.xlsx\') 的 ______ 属性可以得到字符串 \'.xlsx\'（只写属性名）。',
        answer: 'suffix',
        accepted: ['suffix 属性'],
        explanation: 'suffix 返回文件扩展名（含点号）；stem 返回去掉扩展名后的主文件名。',
      },
      {
        id: 's6-01-q3',
        qtype: 'boolean',
        stem: '调用 Path.unlink() 删除的文件会被放进回收站，随时可以还原。',
        answer: '错',
        explanation: 'unlink() 是彻底删除，不经过回收站；想安全删除可以用 send2trash 库。',
      },
    ],
    minutes: 13,
    env: 'local',
  },
  {
    id: 's6-02',
    stageId: 6,
    order: 2,
    title: '批量重命名文件',
    subtitle: '几百个文件，一次改好名字',
    hook: '从相机拷出来的照片叫 IMG_0001、IMG_0002……想改成『旅行_001』这样的名字，手动改要点到手酸。',
    objectives: ['会用 rename 批量改名', '掌握 stem 与 suffix 拆分文件名', '养成先预览再执行的安全习惯'],
    content: `# 批量重命名（需要本地环境）

**这一课需要 Windows + VS Code 本地环境。**浏览器出于安全限制无法访问你的本地文件，重命名这种操作只能在本地完成。本课只用标准库，先把 pip 环境确认好：

\`\`\`
python -m pip install --upgrade pip
\`\`\`

## 单个文件改名

\`Path.rename(新路径)\` 就能改名，注意要给**完整的新路径**：

\`\`\`python
from pathlib import Path

old = Path("D:/照片/IMG_0001.jpg")
new = old.with_name("旅行_001.jpg")
old.rename(new)
\`\`\`

\`with_name()\` 保留原来的文件夹，只换文件名，比自己拼字符串安全。

## 拆开文件名

- \`p.stem\`：主文件名，如 IMG_0001
- \`p.suffix\`：扩展名，如 .jpg

重新编号时要把这两部分拼回去，别忘了扩展名。

## 批量改名三步走

1. **先列出**：用 \`glob()\` 找到所有目标文件
2. **再预览**：只 \`print\` 出『旧名 → 新名』，看一遍对不对
3. **后执行**：确认无误才真正 \`rename()\`

\`\`\`python
files = sorted(Path("D:/照片").glob("IMG_*.jpg"))
for i, f in enumerate(files, start=1):
    new = f.with_name(f"旅行_{i:03d}{f.suffix}")
    print(f"{f.name} → {new.name}")   # 先预览
    # f.rename(new)                   # 确认后再取消注释
\`\`\`

\`{i:03d}\` 让编号变成 001、002、003，排序时整整齐齐。

## 两个必须注意的坑

- **目标名已存在**：在 Windows 上会直接覆盖，造成不可逆丢失！预览时检查新名是否已存在。
- **改名又排序**：先 \`sorted()\` 固定顺序，再编号，否则每次运行结果可能不一样。`,
    examples: [
      {
        title: '给月度报表统一加前缀',
        code: 'from pathlib import Path\n\nfolder = Path("D:/报表")\nfiles = sorted(f for f in folder.glob("*.xlsx") if not f.name.startswith("2026"))\nplan = []\nfor f in files:\n    new = f.with_name(f"2026_{f.stem}{f.suffix}")\n    plan.append((f, new))\n\nprint("预览改名方案：")\nfor old, new in plan:\n    print(f"  {old.name} → {new.name}")\n\n# 确认无误后，把下面这段的注释打开\n# for old, new in plan:\n#     if not new.exists():\n#         old.rename(new)\n#     else:\n#         print("跳过（已存在）：", new.name)',
        lines: [
          { code: 'if not f.name.startswith("2026")', explain: '过滤掉已经改过名的文件，避免重复运行时名字越加越长。' },
          { code: 'f"2026_{f.stem}{f.suffix}"', explain: '用 stem 和 suffix 拼回完整文件名，前缀加上年份。' },
          { code: 'if not new.exists()', explain: '执行前检查目标是否已存在，防止覆盖已有文件。' },
        ],
      },
    ],
    pitfalls: ['直接拼字符串改扩展名，把 报告.xlsx 改成 报告_新.txt 导致文件打不开。', '跳过预览直接批量执行，改完才发现顺序或格式不对。', '目标文件已存在还强行 rename，在 Windows 上会静默覆盖原文件。'],
    sources: [{ book: 'abs3', chapter: '第11章 组织文件' }],
    prerequisites: ['s6-01'],
    task: '写一个批量改名脚本：把某个文件夹里所有的 .txt 文件加上『备份_』前缀，先打印预览方案，确认逻辑正确后再加执行代码。',
    exercises: [
      {
        id: 's6-02-q1',
        qtype: 'blank',
        stem: 'Path(\'照片.jpg\') 的 ______ 属性可以得到主文件名 \'照片\'（不含扩展名，只写属性名）。',
        answer: 'stem',
        explanation: 'stem 是不含扩展名的主文件名；suffix 才是含点号的扩展名。',
      },
      {
        id: 's6-02-q2',
        qtype: 'boolean',
        stem: '批量改名时，直接执行 rename 而不先预览，是很安全的做法。',
        answer: '错',
        explanation: '应该先打印改名方案预览，确认无误再执行；否则一旦规则写错，可能覆盖或改乱大量文件。',
      },
      {
        id: 's6-02-q3',
        qtype: 'debug',
        stem: '想把 a.txt 改名为 b.txt，写了 Path(\'b.txt\').rename(\'a.txt\')，结果反了。正确的写法应该是什么？',
        keywords: [['a.txt', 'b.txt'], ['rename', 'with_name']],
        explanation: 'rename 的调用对象是原文件，参数是新路径，应写成 Path(\'a.txt\').rename(\'b.txt\')，或用 with_name 生成新路径。',
      },
    ],
    minutes: 12,
    env: 'local',
  },
  {
    id: 's6-03',
    stageId: 6,
    order: 3,
    title: '文本文件批量处理与正则表达式',
    subtitle: '从一堆文字里精准捞出你要的内容',
    hook: '一千个文本文件里找出所有手机号？靠肉眼找会疯，靠正则只要一行模式。',
    objectives: ['会用 re 模块做查找与替换', '理解常见正则符号的含义', '能批量读取文本并处理内容'],
    content: `# 正则与批量文本处理

**说明**：这一课的『正则演示』部分在浏览器实验室就能跑（re 是内置模块）；『批量读写文件』部分**需要 Windows + VS Code 本地环境**，因为浏览器安全限制不允许访问本地文件。先备好环境：

\`\`\`
python -m pip install --upgrade pip
\`\`\`

## re 模块三件套

\`\`\`python
import re

text = "联系我：138-0000-1234 或 139-1111-5678"
pattern = r"1\\d{2}-\\d{4}-\\d{4}"

print(re.findall(pattern, text))     # 找出全部匹配，返回列表
print(re.search(pattern, text))      # 找第一个，返回匹配对象
print(re.sub(pattern, "***", text))  # 把匹配内容替换掉
\`\`\`

## 常见符号速查

- \`\\d\` 数字，\`\\w\` 字母数字下划线，\`\\s\` 空白
- \`.\` 任意字符，\`*\` 重复零次或多次，\`+\` 至少一次
- \`{n}\` 重复 n 次，\`{n,m}\` 重复 n 到 m 次
- \`[]\` 字符集合，如 \`[0-9]\`；\`^\` 开头，\`$\` 结尾

前面的 \`r\` 表示**原始字符串**，写正则时一定要加，否则反斜杠会被 Python 先转义一次。

## 批量处理文本文件（本地）

\`\`\`python
from pathlib import Path

for f in Path("D:/日志").glob("*.txt"):
    content = f.read_text(encoding="utf-8")
    hits = re.findall(r"ERROR.*", content)
    if hits:
        print(f.name, "发现", len(hits), "条错误")
\`\`\`

## 真实办公场景

从几百份客服聊天记录里，正则提取所有订单号和手机号；或把日志里的乱码统一替换掉。学会正则，这类『大海捞针』的活儿就从小时级变成秒级。`,
    examples: [
      {
        title: '提取文本里的手机号（浏览器可跑）',
        code: 'import re\n\ntext = "张三 138-0000-1234，李四 139-1111-5678，王五 137-2222-9999"\nphones = re.findall(r"1\\d{2}-\\d{4}-\\d{4}", text)\nprint("找到", len(phones), "个号码：")\nfor p in phones:\n    print("  ", p)\n\nmasked = re.sub(r"(\\d{3})-(\\d{4})-(\\d{4})", r"\\1****\\3", text)\nprint("脱敏后：", masked)',
        expectedOutput: '找到 3 个号码：\n   138-0000-1234\n   139-1111-5678\n   137-2222-9999\n脱敏后： 张三 138****1234，李四 139****5678，王五 137****9999',
        lines: [
          { code: 'r"1\\d{2}-\\d{4}-\\d{4}"', explain: '1 开头，两位数字，短杠，四位数字，短杠，四位数字。前面的 r 表示原始字符串。' },
          { code: 're.sub(...)', explain: '把匹配到的号码按分组重写，中间四位用星号代替，实现脱敏。' },
          { code: 'r"\\1****\\3"', explain: '\\1 和 \\3 代表第 1、3 个括号捕获的内容，这就是『分组引用』。' },
        ],
      },
      {
        title: '批量扫描日志里的错误（本地运行）',
        code: 'from pathlib import Path\nimport re\n\nfolder = Path("D:/日志")\ntotal = 0\nfor f in folder.glob("*.txt"):\n    text = f.read_text(encoding="utf-8")\n    errors = re.findall(r"ERROR:\\s*(.+)", text)\n    if errors:\n        total += len(errors)\n        print(f"{f.name}：{len(errors)} 条错误")\nprint("合计错误：", total)',
        lines: [
          { code: 'f.read_text(encoding="utf-8")', explain: '一次性读出文本文件；中文内容务必指定 utf-8。' },
          { code: 'r"ERROR:\\s*(.+)"', explain: '匹配 ERROR: 后面空白之外的所有内容，括号把它捕获成一个分组。' },
        ],
      },
    ],
    compare: [
      { conceptA: 're.search()', conceptB: 're.findall()', diff: 'search 只找第一个匹配，返回匹配对象（找不到是 None）；findall 找出所有匹配，返回字符串列表（找不到是空列表）。', example: '判断有没有手机号用 search；要把所有手机号都取出来用 findall。' },
    ],
    pitfalls: ['忘记加原始字符串前缀 r，反斜杠被 Python 提前转义，正则失效。', '把 \\d 写成 d，少了反斜杠就变成普通字母，匹配不到数字。', '读中文文本没写 encoding="utf-8"，读出乱码后再做匹配全是徒劳。'],
    sources: [{ book: 'abs3', chapter: '第9章 使用正则表达式匹配文本模式' }, { book: 'abs3', chapter: '第11章 组织文件' }],
    prerequisites: ['s5-04', 's6-01'],
    task: '先用 re.findall 从一段文字里提取所有 Electronic 邮箱地址（正则可用浏览器跑），再写一个本地脚本，统计某个文件夹里所有 .txt 文件中某个关键词出现的次数。',
    exercises: [
      {
        id: 's6-03-q1',
        qtype: 'single',
        stem: '正则里 \\d 表示什么？',
        options: ['A. 字母 d', 'B. 一个数字', 'C. 小数点', 'D. 一个空格'],
        answer: 'B',
        explanation: '\\d 是数字字符的简写，等价于 [0-9]。',
      },
      {
        id: 's6-03-q2',
        qtype: 'predict',
        stem: '执行下面代码输出什么？\nimport re\nprint(re.findall(r\'\\d+\', \'a12b345\'))',
        keywords: [['12', '345']],
        explanation: '\\d+ 匹配连续的数字，文本里有两段连续数字 12 和 345，findall 返回列表 [\'12\', \'345\']。',
      },
      {
        id: 's6-03-q3',
        qtype: 'blank',
        stem: '在 Python 写正则时，通常在模式字符串前加字母 ______ 表示原始字符串，避免反斜杠被转义。',
        answer: 'r',
        accepted: ['R'],
        explanation: 'r 前缀表示原始字符串，字符串里的反斜杠不会被 Python 转义，正则模式才能正确传给 re 模块。',
      },
    ],
    minutes: 15,
    env: 'local',
  },
  {
    id: 's6-04',
    stageId: 6,
    order: 4,
    title: 'Excel 数据读取与写入',
    subtitle: '让 Python 帮你填表、汇总、做报表',
    hook: '每月把几十张 Excel 里的数据复制到总表？这种『人肉复制粘贴』，Python 几秒钟就能干完，还不出错。',
    objectives: ['会用 openpyxl 读取现有表格', '会写入数据并保存新文件', '能批量处理多行数据'],
    content: `# Excel 自动化（需要本地环境）

**这一课需要 Windows + VS Code 本地环境。**浏览器安全限制让它无法读写你电脑上的 .xlsx 文件，这类任务必须在本地跑。先安装操作 Excel 的库：

\`\`\`
pip install openpyxl
\`\`\`

openpyxl 只处理新版 \`.xlsx\` 格式，老式 \`.xls\` 不支持。

## 读一个表格

\`\`\`python
from openpyxl import load_workbook

wb = load_workbook("D:/报表/销售.xlsx")
ws = wb.active                    # 当前工作表
print(ws.max_row, ws.max_column) # 行数和列数

for row in ws.iter_rows(min_row=2, values_only=True):
    print(row)                   # 每一行是一个元组
\`\`\`

\`values_only=True\` 让 iter_rows 直接返回单元格的值，而不是单元格对象。

## 写一个表格

\`\`\`python
from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws.append(["姓名", "部门", "工资"])   # 写表头
ws.append(["张三", "财务", 8000])
wb.save("D:/报表/新员工.xlsx")
\`\`\`

\`append()\` 总是在最后加一行，最适合逐行写入。

## 单元格的读写

\`ws[\'A1\']\` 取单元格，\`.value\` 才是里面的内容：

\`\`\`python
ws["A1"] = "新标题"              # 写入
print(ws["A1"].value)            # 读取
\`\`\`

## 真实办公场景

把 12 个月的销售表逐个读进来，用 Python 汇总出每个月的总额，再写进一张新表保存——从『复制一下午』变成『运行一次』。记得：**先另存为新文件，别直接覆盖原始报表**。`,
    examples: [
      {
        title: '汇总员工工资并生成新表',
        code: 'from openpyxl import Workbook, load_workbook\n\nsource = load_workbook("D:/报表/工资明细.xlsx")\nws = source.active\n\ntotal = 0\ncount = 0\nfor row in ws.iter_rows(min_row=2, values_only=True):\n    if row[2] is not None:\n        total += row[2]\n        count += 1\n\nresult = Workbook()\nout = result.active\nout.append(["统计项", "数值"])\nout.append(["人数", count])\nout.append(["工资总额", total])\nout.append(["平均工资", round(total / count, 2) if count else 0])\nresult.save("D:/报表/工资汇总.xlsx")\nprint("汇总完成，共", count, "人")',
        lines: [
          { code: 'iter_rows(min_row=2, values_only=True)', explain: '从第 2 行开始读（跳过表头），直接拿到每行的值组成的元组。' },
          { code: 'if row[2] is not None:', explain: '跳过空单元格，避免把空值当数字相加导致报错。' },
          { code: 'result.save(...)', explain: '保存为新文件，不改动原始明细表，数据安全。' },
        ],
      },
    ],
    pitfalls: ['把 .xls 老格式交给 openpyxl，会打不开——先用 Excel 另存为 .xlsx。', '直接 save 到原文件路径，一旦逻辑写错原始数据就丢了——务必另存新文件。', '忘记给写入的数据调用 wb.save()，以为改了内存里的对象就存盘了。'],
    sources: [{ book: 'abs3', chapter: '第14章 Excel电子表格' }],
    prerequisites: ['s5-04', 's2-07'],
    task: '写一个脚本：读取一张 Excel（含姓名和分数两列），把分数大于等于 60 的人筛选出来，写入一张新表并保存。',
    exercises: [
      {
        id: 's6-04-q1',
        qtype: 'single',
        stem: 'openpyxl 主要用来处理哪种文件格式？',
        options: ['A. .xls', 'B. .xlsx', 'C. .csv', 'D. .pdf'],
        answer: 'B',
        explanation: 'openpyxl 用于读写新版 .xlsx 文件，不支持老式 .xls 格式。',
      },
      {
        id: 's6-04-q2',
        qtype: 'blank',
        stem: '把内存中的工作簿真正保存到磁盘，需要调用工作簿对象的 ______ () 方法（只写方法名）。',
        answer: 'save',
        explanation: 'wb.save(文件名) 才会把修改写入磁盘；不调用它，所有改动只停留在内存里。',
      },
      {
        id: 's6-04-q3',
        qtype: 'boolean',
        stem: '用 openpyxl 处理报表时，为了安全，最好把结果保存成一个新文件，而不是直接覆盖原始文件。',
        answer: '对',
        explanation: '另存新文件能保留原始数据，一旦处理逻辑有误也不会破坏源报表。',
      },
    ],
    minutes: 15,
    env: 'local',
  },
  {
    id: 's6-05',
    stageId: 6,
    order: 5,
    title: 'PDF 与图片处理',
    subtitle: '合并合同、压缩照片，批量搞定',
    hook: '十份 PDF 合同要合并成一份，几十张照片要统一缩小尺寸——这种纯体力的活，正是 Python 最擅长的。',
    objectives: ['会读取、合并 PDF 并提取文字', '会用 Pillow 调整图片尺寸与格式', '能批量处理一个文件夹里的图片'],
    content: `# PDF 与图片处理（需要本地环境）

**这一课需要 Windows + VS Code 本地环境。**浏览器安全限制让它无法读写本地的 PDF 和图片文件，必须在本地完成。安装两个常用库：

\`\`\`
pip install pypdf pillow
\`\`\`

## PDF：读、拆、合

\`pypdf\` 负责处理 PDF：

\`\`\`python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("D:/合同/合同1.pdf")
print("页数：", len(reader.pages))
print(reader.pages[0].extract_text())   # 提取第一页文字

writer = PdfWriter()
for p in reader.pages:
    writer.add_page(p)
for extra in ["D:/合同/合同2.pdf"]:
    for p in PdfReader(extra).pages:
        writer.add_page(p)
with open("D:/合同/合并.pdf", "wb") as f:
    writer.write(f)
\`\`\`

注意：扫描版 PDF 是图片，\`extract_text()\` 取不出文字，需要先做 OCR。

## 图片：Pillow  basics

\`Pillow\` 是 Python 图像处理的标配：

\`\`\`python
from PIL import Image

img = Image.open("D:/照片/IMG_001.jpg")
print(img.size, img.format)        # 尺寸和格式
img.thumbnail((800, 800))          # 等比缩到最大 800x800
img.save("D:/照片/小图.jpg")
\`\`\`

\`thumbnail()\` 保持比例，不会把图片拉伸变形。还能用 \`img.rotate(90)\` 旋转、\`img.convert("RGB")\` 转色彩模式。

## 真实办公场景

把员工上传的证件照统一压到 800 像素以内再归档，既省空间又统一规格；把季度报告的几个 PDF 合成一个发给领导。这些原本要开软件一张张点的活，写段脚本一次跑完。`,
    examples: [
      {
        title: '批量压缩照片尺寸',
        code: 'from pathlib import Path\nfrom PIL import Image\n\nsrc = Path("D:/照片/原始")\ndst = Path("D:/照片/压缩")\ndst.mkdir(exist_ok=True)\n\ncount = 0\nfor f in src.glob("*.jpg"):\n    with Image.open(f) as img:\n        img.thumbnail((800, 800))\n        img.save(dst / f.name)\n        count += 1\n        print(f.name, "→", img.size)\n\nprint("共处理", count, "张照片")',
        lines: [
          { code: 'dst.mkdir(exist_ok=True)', explain: '确保输出文件夹存在；exist_ok=True 表示已存在也不报错。' },
          { code: 'img.thumbnail((800, 800))', explain: '等比缩放，最长边不超过 800 像素，不会变形。' },
          { code: 'with Image.open(f) as img:', explain: '用 with 管理图片对象，用完自动关闭，避免占用文件。' },
        ],
      },
    ],
    pitfalls: ['扫描版 PDF 用 extract_text() 却取不到文字——它是图片，要先做 OCR。', '用 resize() 直接指定宽高导致图片被拉伸变形——用 thumbnail() 保持比例。', '保存 JPEG 时图片模式是 RGBA，报错——先 convert("RGB") 再保存。'],
    sources: [{ book: 'abs3', chapter: '第17章 PDF文档和Word文档' }, { book: 'abs3', chapter: '第21章 绘制图形和操作图像' }],
    prerequisites: ['s6-01'],
    task: '写一个脚本：把某个文件夹里的所有 PNG 图片等比缩小到 600 像素，另存到新文件夹，并统计处理了多少张。',
    exercises: [
      {
        id: 's6-05-q1',
        qtype: 'single',
        stem: '想保持比例把一张大图缩小到指定大小，Pillow 里推荐用哪个方法？',
        options: ['A. resize()', 'B. thumbnail()', 'C. crop()', 'D. rotate()'],
        answer: 'B',
        explanation: 'thumbnail() 会等比缩放并保持宽高比，不会拉伸变形；resize() 按指定尺寸强行缩放可能变形。',
      },
      {
        id: 's6-05-q2',
        qtype: 'blank',
        stem: '在 pypdf 中，PdfReader 对象的 ______ 属性可以告诉你这份 PDF 一共有多少页（只写属性名）。',
        answer: 'pages',
        explanation: 'len(reader.pages) 返回 PDF 的页数，pages 是一个包含所有页的列表。',
      },
      {
        id: 's6-05-q3',
        qtype: 'boolean',
        stem: '对扫描版（图片型）PDF 使用 extract_text()，通常能直接拿到里面的文字内容。',
        answer: '错',
        explanation: '扫描版 PDF 的正文是图片，没有文本层，extract_text() 取不到内容，需要先做 OCR 识别。',
      },
    ],
    minutes: 14,
    env: 'local',
  },
  {
    id: 's6-06',
    stageId: 6,
    order: 6,
    title: '网页数据获取基础',
    subtitle: '让 Python 帮你把网上的信息抓回来',
    hook: '想把某个公示页面上的名单整理成表格？手动复制粘贴容易漏，写段脚本一次抓回来才靠谱。',
    objectives: ['会用 requests 获取网页内容', '能检查响应状态并做基本解析', '了解网页抓取的边界与礼貌原则'],
    content: `# 网页数据获取（需要本地环境）

**这一课需要 Windows + VS Code 本地环境。**浏览器出于安全限制有跨域（CORS）策略，JS 不能随便读取其他网站的内容；而且浏览器沙箱也不能把结果直接写进你的本地文件。所以网页抓取脚本要在本地跑。先安装两个库：

\`\`\`
pip install requests beautifulsoup4
\`\`\`

## requests 发请求

\`\`\`python
import requests

url = "https://www.example.com"
r = requests.get(url, timeout=10)
print(r.status_code)     # 200 表示成功
print(r.text[:200])      # 网页的 HTML 文本
\`\`\`

几个好习惯：

- **一定要写 timeout**：否则网络卡住时程序会一直等
- **检查 status_code**：200 成功，404 找不到，403 被拒绝
- **带上 User-Agent**：有些网站会拒绝没有标识的请求

如果不想装第三方库，Python 自带的 \`urllib.request\` 也能发请求，只是写法啰嗦一些。

## BeautifulSoup 解析 HTML

拿到 HTML 后，从中提取想要的内容：

\`\`\`python
from bs4 import BeautifulSoup

soup = BeautifulSoup(r.text, "html.parser")
print(soup.title.text)                     # 网页标题
for a in soup.find_all("a"):               # 所有链接
    print(a.get_text(), a.get("href"))
\`\`\`

## 礼貌抓取与边界

- 先看网站的 \`robots.txt\`，遵守它的规则
- 别高频请求，适当 \`time.sleep(1)\`，不要给对方服务器添麻烦
- 只抓公开可见的信息，不碰需要登录的私密数据，不绕过任何验证机制

## 浏览器端为什么做不到

在网页实验室里，你的代码运行在沙箱中。浏览器不允许它随意向别的域名发请求（CORS），也不允许把抓到的数据写进你的本地文件——这是保护用户的安全设计，不是 Python 的问题。`,
    examples: [
      {
        title: '用 BeautifulSoup 解析一段 HTML',
        code: 'from bs4 import BeautifulSoup\n\nhtml = """<html><head><title>示例页面</title></head>\n<body><h1>通知公告</h1>\n<ul>\n<li><a href="/a.html">第一条</a></li>\n<li><a href="/b.html">第二条</a></li>\n</ul></body></html>"""\n\nsoup = BeautifulSoup(html, "html.parser")\nprint("网页标题：", soup.title.text)\nprint("大标题：", soup.h1.text)\nfor a in soup.find_all("a"):\n    print(a.get_text(), "→", a.get("href"))',
        expectedOutput: '网页标题： 示例页面\n大标题： 通知公告\n第一条 → /a.html\n第二条 → /b.html',
        lines: [
          { code: 'soup.title.text', explain: '取 <title> 标签里的文字内容。' },
          { code: 'soup.find_all("a")', explain: '找出所有 <a> 链接标签，返回一个列表，可以逐个遍历。' },
          { code: 'a.get("href")', explain: '取链接的 href 属性；用 get 即使属性不存在也不会报错。' },
        ],
      },
    ],
    compare: [
      { conceptA: 'requests', conceptB: 'urllib.request', diff: 'requests 是第三方库，API 简洁好用，需要安装；urllib.request 是 Python 自带的，不用装但写法更繁琐。', example: '日常抓取推荐 requests；不方便装库的纯净环境可用 urllib。' },
    ],
    pitfalls: ['requests.get() 不写 timeout，网络异常时程序卡住不动。', '不看 status_code 就直接用 r.text，把 404 错误页当成正常数据解析。', '在浏览器实验室里尝试 requests.get 别的网站，因跨域限制失败——这是浏览器安全策略，要换本地环境。'],
    sources: [{ book: 'abs3', chapter: '第13章 Web内容爬取' }],
    prerequisites: ['s5-05', 's6-01'],
    task: '在本地用 requests 打开 https://www.example.com，打印状态码和网页标题；再写一段 BeautifulSoup 代码，从给定的 HTML 里提取所有链接文字。',
    exercises: [
      {
        id: 's6-06-q1',
        qtype: 'single',
        stem: 'requests.get() 返回结果中，哪个属性表示 HTTP 状态码（200 代表成功）？',
        options: ['A. r.text', 'B. r.status_code', 'C. r.url', 'D. r.content'],
        answer: 'B',
        explanation: 'status_code 是响应状态码，200 表示请求成功；text 是网页文本内容。',
      },
      {
        id: 's6-06-q2',
        qtype: 'boolean',
        stem: '在浏览器实验室里，可以像在本地一样直接用 requests 抓取任意网站并保存到本地文件。',
        answer: '错',
        explanation: '浏览器有跨域（CORS）与沙箱安全限制，不能随意请求其他域名，也不能写本地文件；这类任务必须在本地环境完成。',
      },
      {
        id: 's6-06-q3',
        qtype: 'blank',
        stem: '用 requests 发请求时，加上 ______ 参数可以设定超时时间（如 10 秒），避免程序一直等待（只写参数名）。',
        answer: 'timeout',
        explanation: 'timeout=10 表示最多等待 10 秒，超时就抛出异常，避免程序无限期卡住。',
      },
    ],
    minutes: 15,
    env: 'local',
  },
]
