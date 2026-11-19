import type { Lesson } from '../../types'

/**
 * 第九阶段：综合实践（6 个项目）
 * 每个项目都按「需求 → 拆解 → 思路 → 逐步实现 → 常见错误 → 成果 → 拓展」走一遍，
 * 练的是把前面八阶段的知识拼成能跑的东西。
 */
export const stage9Lessons: Lesson[] = [
  {
    id: 's9-01',
    stageId: 9,
    order: 1,
    title: '项目一：个人记账程序',
    subtitle: '从一堆零散支出到一张清楚账目',
    hook: '每月月底都不知道钱花哪了。与其翻支付记录一条条加，不如写个几十行的小程序，把记录丢进去，分类合计和结余自动算好。',
    objectives: [
      '把一句模糊需求拆成四到五条可执行的功能',
      '为记账数据设计「列表套字典」的结构并说明为什么这样选',
      '用函数分工完成记录、汇总、分类、输出四件事',
      '独立写出按月筛选与结余计算，并解释浮点数的显示问题',
    ],
    analogy:
      '写程序和记账本是一个道理：先定好每行写什么（日期、类型、分类、金额），再定每月怎么合计。表格的列就是字典的键，一行账就是列表里的一个字典。结构定好了，后面只是加减法。',
    terms: [
      { term: '项目', plain: '一个能独立运行、解决一件具体小事的程序，不一定很大。' },
      { term: '需求拆解', plain: '把「我想记账」这种一句话，拆成一条条能动手做的具体功能。' },
      { term: '数据结构', plain: '数据在程序里怎么摆放。记账用「列表装字典」，一条账一个字典。' },
      { term: '汇总', plain: '把很多条明细按某个规则加在一起，比如按分类加、按月加。' },
      { term: '最小闭环', plain: '先让最核心的一条路走通（存进去能看到合计），再往上加功能。' },
    ],
    content: `## 一、项目需求

要做的东西一句话说清：**把每天的收支记下来，随时能看这个月花了多少、花在哪、还剩多少。**

把这句话拆成需求清单，分成三档：

| 档位 | 需求 | 说明 |
| --- | --- | --- |
| 必须做 | 记录一条账（日期、类型、分类、金额） | 类型只有收入和支出两种 |
| 必须做 | 算收入合计、支出合计、结余 | 结余 = 收入 - 支出 |
| 必须做 | 按分类统计支出 | 餐饮多少、交通多少，从大到小排 |
| 必须做 | 按月份筛选后再统计 | 输入 2026-03 只看三月 |
| 可以后做 | 预算提醒、导出文件、图形界面 | 第一版不做，留到拓展 |

需求清单的价值在于**划清边界**。不写清楚，就会一边写一边加功能，最后哪个都没写完。

## 二、功能拆解

一条需求对应一个函数，这是最省心的分法：

| 功能 | 函数 | 输入 | 输出 |
| --- | --- | --- | --- |
| 记一笔 | add_record | 记账列表、日期、类型、分类、金额 | 无（往列表里追加） |
| 按月汇总 | summary | 记账列表、年月字符串 | 收入、支出两个数 |
| 分类统计 | by_category | 记账列表 | 分类到金额的字典 |
| 打印账目 | print_report | 汇总结果、分类字典 | 屏幕上的几行字 |

拆到这个粒度有个检验办法：**每个函数都该能用一句人话说清它干什么**。说不清，说明它管得太宽，还得再拆。

## 三、开发思路

第一步，先定数据结构。一条账有四个信息，用字典最自然：日期是字符串，类型是「收入」或「支出」，分类是字符串，金额是数字。多条账放进列表，就成了「列表套字典」。

第二步，为什么不用一个大字符串拼账目？因为字符串没法算。要合计就得先把金额从文字里抠出来再转数字，等于给自己找麻烦。**数据先摆成能算的形状，显示是最后一步的事。**

第三步，先跑通最小闭环：能存一条账、能打印合计。这一步跑通了，后面的分类、按月都只是在这个骨架上加分支。

第四步，才去处理输出格式：金额想显示成 70.5 而不是 70.50000000000001，就要注意浮点数；想让分类按金额从大到小排，就要在输出时排序，而不是在存储时排序。

## 四、逐步实现

第一步，建空列表和添加函数。添加函数只做一件事：把四个参数装成字典，塞进列表。

第二步，写汇总函数。遍历列表，遇到收入加进收入变量，遇到支出加进支出变量，最后把两个数一起返回。**返回两个值用元组**，调用时一行拆成两个变量。

第三步，写分类统计。还是遍历，但这次用字典累加：字典里没有这个分类就给 0，有就取出来加。这个「get 一下再赋值」的写法要练到不用想。

第四步，写按月筛选。在遍历的最前面加一句判断：日期不以这个年月开头就跳过。**用 continue 跳过，比套一层 if 更清楚。**

第五步，把结果打印出来。打印放在最后，因为前面几步的数据都能直接看，调试时先确认数字对不对，再管好不好看。

下面两个例子就是第二到第五步的完整代码，先照着跑一遍，再改动数据看结果怎么变。

## 五、常见错误

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 合计变成 28.542 这样的长串 | 金额被当字符串用加号拼接 | 确认金额是数字，字符串要 float 转一次 |
| KeyError: '餐饮' | 字典里没这个键就直接取 | 用 get(键, 0) 先取默认值 |
| 按月筛选筛不出来 | 日期格式不统一，有的写 2026/3/1 | 统一成补零格式 2026-03-01 |
| 结余是负数但显示成 -0.0 | 浮点数精度残留 | 输出时用 round 保留两位 |
| 分类排序乱了 | 在存储时排序，后来加的账打乱顺序 | 存储不管顺序，输出时再 sorted |

## 六、最终成果

跑完之后你应该看到三段输出：收入合计、支出合计、本月结余，接着是一行行分类金额。这个程序三十几行，但已经把「数据结构设计 → 函数分工 → 遍历累加 → 条件筛选 → 格式化输出」这条主干走完了一遍。后面五个项目都是在这条主干上加东西。

## 七、拓展挑战

第一个，把记账列表存成 JSON 文件，下次打开还能读回来（用第六阶段的 json 模块）。

第二个，加一条预算线：支出超过预设值就打印一句提醒。

第三个，把每月结余按月份排成一张小表，看趋势。

第四个，把分类统计结果写成 CSV，用 Excel 打开画个饼图。`,
    examples: [
      {
        title: '遍历一遍，把合计和分类都算出来',
        intro: '这是记账程序的核心循环。四条账，一次遍历同时完成收入合计、支出合计、分类累加三件事。浏览器里可以直接跑。',
        code: `records = [
    {'date': '2026-03-01', 'type': '支出', 'category': '餐饮', 'amount': 28.5},
    {'date': '2026-03-02', 'type': '收入', 'category': '工资', 'amount': 8000},
    {'date': '2026-03-05', 'type': '支出', 'category': '餐饮', 'amount': 42},
    {'date': '2026-03-09', 'type': '支出', 'category': '交通', 'amount': 6},
]

income = 0
expense = 0
by_category = {}

for r in records:
    if r['type'] == '收入':
        income += r['amount']
    else:
        expense += r['amount']
        by_category[r['category']] = by_category.get(r['category'], 0) + r['amount']

print('收入合计', income)
print('支出合计', expense)
print('本月结余', income - expense)
for category, amount in by_category.items():
    print(category, amount)`,
        expectedOutput: `收入合计 8000
支出合计 76.5
本月结余 7923.5
餐饮 70.5
交通 6`,
        lines: [
          { code: 'records = [...]', explain: '四条账，每条是一个字典；外层方括号说明这是一个列表。' },
          { code: 'by_category = {}', explain: '空字典，准备按分类累加金额。键是分类名，值是金额。' },
          { code: 'if r[\"type\"] == \"收入\"', explain: '按类型分成两路：收入只加收入，支出既加支出又要进分类统计。' },
          { code: 'by_category.get(r[\"category\"], 0) + r[\"amount\"]', explain: '先取这个分类已有的金额，没有就当 0，再加上本笔金额，最后写回字典。' },
          { code: 'for category, amount in by_category.items()', explain: 'items() 一次取出键和值，循环体里就能直接用两个变量。' },
        ],
        trace: [
          { step: '第 8-10 行', state: 'income=0、expense=0、by_category 为空字典' },
          { step: '第 1 条账（餐饮 28.5）', state: 'expense=28.5，by_category 变成 餐饮→28.5' },
          { step: '第 2 条账（工资 8000）', state: 'income=8000，expense 不变' },
          { step: '第 3 条账（餐饮 42）', state: 'expense=70.5，餐饮→70.5（28.5+42）' },
          { step: '第 4 条账（交通 6）', state: 'expense=76.5，新增 交通→6' },
          { step: '打印阶段', state: '结余 8000-76.5=7923.5，再逐条打印分类' },
        ],
        tryIt: '把第 3 条账的金额改成 100，看「支出合计」和「餐饮」两个数字分别变成多少。',
      },
      {
        title: '拆成函数，并且加上按月筛选',
        intro: '把散在流程里的代码装进函数，再加一个按月统计。注意 summary 用元组一次返回两个数。',
        code: `def add_record(records, date, kind, category, amount):
    records.append({'date': date, 'type': kind, 'category': category, 'amount': amount})

def summary(records, month):
    income = 0
    expense = 0
    for r in records:
        if not r['date'].startswith(month):
            continue
        if r['type'] == '收入':
            income += r['amount']
        else:
            expense += r['amount']
    return income, expense

records = []
add_record(records, '2026-03-01', '支出', '餐饮', 28.5)
add_record(records, '2026-03-02', '收入', '工资', 8000)
add_record(records, '2026-03-18', '支出', '房租', 2200)
add_record(records, '2026-02-20', '支出', '餐饮', 31)

print('记录条数', len(records))
for month in ['2026-03', '2026-02']:
    income, expense = summary(records, month)
    print(month, '收入', income, '支出', expense, '结余', income - expense)`,
        expectedOutput: `记录条数 4
2026-03 收入 8000 支出 2228.5 结余 5771.5
2026-02 收入 0 支出 31 结余 -31`,
        lines: [
          { code: 'def add_record(records, date, kind, category, amount)', explain: '五个参数里第一个是列表本身，函数直接往里追加，不需要 return。' },
          { code: 'if not r[\"date\"].startswith(month)', explain: '日期是 2026-03-01 这种格式，用 startswith 判断月份最省事。' },
          { code: 'continue', explain: '不是这个月的直接跳过，后面的加法不执行，比缩进一层 if 更清楚。' },
          { code: 'return income, expense', explain: '逗号分隔返回两个值，本质是返回一个元组。' },
          { code: 'income, expense = summary(records, month)', explain: '左边两个变量，正好接住两个返回值。' },
        ],
        trace: [
          { step: '第 12-15 行', state: 'records 里依次追加 4 个字典，条数变成 4' },
          { step: '第 18 行 第一次调用', state: 'month=2026-03，前三条账通过筛选，第四条被 continue 跳过' },
          { step: '第 18 行 第二次调用', state: 'month=2026-02，只有第四条通过，收入为 0' },
          { step: '打印', state: '三月结余 5771.5，二月结余 -31（支出大于收入）' },
        ],
        tryIt: '给 add_record 再加一条 2026-03 的账，看看三月的合计怎么变，二月的有没有受影响。',
      },
    ],
    compare: [
      {
        conceptA: '存储时排序',
        conceptB: '输出时排序',
        diff: '存储时排序，新加一条账就破坏顺序，还得再排一次；输出时排序，每次打印都按当下数据现算。',
        example: 'sorted(by_category.items(), key=lambda item: item[1], reverse=True)',
      },
      {
        conceptA: '字典直接取值',
        conceptB: '字典 get 取值',
        diff: '键不存在时直接取会抛 KeyError 让程序停住；get 给一个默认值，累加统计时不会中断。',
        example: 'by_category.get(name, 0) + amount',
      },
    ],
    pitfalls: [
      '金额写成字符串，合计时变成 28.542 这样的拼接结果。',
      '累加时不用 get，第一次遇到分类就 KeyError 崩掉。',
      '日期格式不统一，2026/3/1 和 2026-03-01 混着写，按月筛选直接筛不到。',
      '把打印语句塞进 summary 函数里，函数就不能复用了，想换个格式输出得改函数本身。',
      '浮点数直接打印，出现 70.50000000000001 这种尾巴，忘了 round。',
    ],
    keyPoints: [
      '需求先分三档（必须做、可以后做、不做），边界清楚才不会边写边加。',
      '记账的数据结构选「列表套字典」：一条账一个字典，字典的键就是表格的列名。',
      '一个功能一个函数，每个函数都能用一句人话说清。',
      '字典累加用 get(键, 0)，避免第一次遇到新分类就崩。',
      '存储不管顺序，排序和格式化都放在输出阶段。',
    ],
    sources: [
      { book: 'update', chapter: '综合实践', section: '项目一：个人记账程序', note: '按需求拆解—最小闭环—逐步扩展的路线设计' },
      { book: 'pcc3', chapter: '第 8 章', section: '函数', note: '函数拆分与返回值' },
    ],
    prerequisites: ['s5-01', 's3-06', 's4-04'],
    task: '把课堂上的记账程序补成完整版：增加按月查看、分类排序输出、以及一条「支出超过 1000 提醒」的功能，然后把三次运行的输出截图保存下来对比。',
    exercises: [
      {
        id: 's9-01-q1',
        qtype: 'single',
        stem: '记账程序里，一条账用字典存、多条账用列表存。这样选的主要原因是什么？',
        options: [
          'A. 因为列表比字典运行速度快',
          'B. 因为字典的键天然对应「日期、类型、分类、金额」这几列，列表负责装多条，取用和计算都方便',
          'C. 因为 Python 不允许字典装字典',
          'D. 因为字符串不方便打印',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：数据结构要挑「后面怎么用」最顺的形状。一条账有四个固定字段，正好一张小表，字典的键就是列名。\n逐步演示：records[0]["amount"] 直接拿到第一条账的金额，不用记第几位；要遍历所有账就 for r in records。\n易错提醒：不是列表快、字典慢这种性能理由，选结构先看方不方便取和算。',
        difficulty: 1,
      },
      {
        id: 's9-01-q2',
        qtype: 'blank',
        stem: '下面这行要给分类累加金额，字典里还没这个分类时按 0 算。填出缺失的方法名：\n\nby_category[cat] = by_category.______(cat, 0) + amount',
        answer: 'get',
        accepted: ['get', 'GET', 'Get'],
        explanation:
          '答案：get。\n思路：字典的 get 方法可以带一个默认值，键不存在时返回它，不会报错。\n逐步演示：第一次遇到「餐饮」，by_category.get("餐饮", 0) 返回 0，0 加 28.5 得 28.5，再写回字典。\n易错提醒：写成 by_category[cat] 直接取，第一次就 KeyError，程序当场停下。',
        difficulty: 2,
      },
      {
        id: 's9-01-q3',
        qtype: 'predict',
        stem: '下面代码中有一条账是二月的。请写出运行后的两行输出。',
        code: `records = [
    {'date': '2026-03-01', 'type': '支出', 'amount': 100},
    {'date': '2026-02-28', 'type': '支出', 'amount': 30},
    {'date': '2026-03-20', 'type': '收入', 'amount': 500},
]
month = '2026-03'
income = 0
expense = 0
for r in records:
    if not r['date'].startswith(month):
        continue
    if r['type'] == '收入':
        income += r['amount']
    else:
        expense += r['amount']
print('收入', income, '支出', expense)`,
        keywords: [['收入', '500'], ['支出', '100']],
        explanation:
          '答案：收入 500 支出 100。\n思路：startswith 把二月的账过滤掉，只剩 3 月 1 日和 3 月 20 日两条。\n逐步演示：3 月 1 日是支出，expense 变 100；3 月 20 日是收入，income 变 500；二月那条被 continue 跳过。\n易错提醒：判断写成了 r["date"] == month 就永远不成立，因为日期后面还有 -01。',
        difficulty: 2,
      },
      {
        id: 's9-01-q4',
        qtype: 'debug',
        stem: '下面统计分类的代码一运行就报 KeyError: 餐饮。找出问题并说明改法。',
        code: `by_category = {}
for name, amount in [('餐饮', 28.5), ('餐饮', 42)]:
    by_category[name] = by_category[name] + amount`,
        keywords: [['get', '默认值'], ['第一次', '不存在'], ['KeyError']],
        explanation:
          '答案：把 by_category[name] 改成 by_category.get(name, 0)。\n思路：第一次遇到「餐饮」时字典里没有这个键，右边取值那一步就抛 KeyError。\n逐步演示：第一次循环取 by_category["餐饮"] 失败；改成 get("餐饮", 0) 得到 0，0+28.5 写入；第二次 get 得到 28.5，28.5+42 得 70.5。\n易错提醒：报错位置在等号右边，不是赋值语句写错了，看错误信息里的 KeyError 就知道是缺键。',
        difficulty: 3,
      },
      {
        id: 's9-01-q5',
        qtype: 'program',
        stem: '下面是一组支出记录，请按分类汇总金额，并按金额从大到小输出，每行「分类 金额」。\n\n数据：餐饮 28.5、交通 6、餐饮 42、房租 2200.0、交通 3.5\n\n期望输出三行：房租 2200.0 / 餐饮 70.5 / 交通 9.5',
        answer: '',
        testCases: [{ stdin: '', expected: '房租 2200.0\n餐饮 70.5\n交通 9.5' }],
        explanation:
          '答案（参考答案）：\nrecords = [("餐饮", 28.5), ("交通", 6), ("餐饮", 42), ("房租", 2200.0), ("交通", 3.5)]\nby_category = {}\nfor name, amount in records:\n    by_category[name] = by_category.get(name, 0) + amount\nfor name, amount in sorted(by_category.items(), key=lambda item: item[1], reverse=True):\n    print(name, amount)\n\n思路：先累加，再排序输出。排序键写成 item[1] 才是按金额排，不是按分类名。\n逐步演示：累加后字典是 餐饮 70.5、交通 9.5、房租 2200.0；sorted 加 reverse=True 从大到小；最后逐行打印。\n易错提醒：key 写成 item[0] 就按分类名的编码顺序排，输出顺序不对，判题判不过。',
        difficulty: 3,
      },
    ],
    minutes: 30,
    env: 'browser',
  },
  {
    id: 's9-02',
    stageId: 9,
    order: 2,
    title: '项目二：文件批量整理工具',
    subtitle: '三十个文件乱堆在下载文件夹里，一条规则全归位',
    hook: '下载文件夹里躺着几十个文件，图片、表格、PDF 混在一起。手动拖分类要拖半小时，写个脚本跑一遍三秒钟。',
    objectives: [
      '用 pathlib 遍历目录并判断文件类型',
      '按扩展名规则把文件移动到对应子文件夹',
      '写批量重命名，保证编号补零、后缀统一小写',
      '先预演再动手：把要做的操作打印出来确认，再真改文件',
    ],
    analogy:
      '批量整理像给一筐混装零件分类：先定好分格规则（螺丝一格、钉子一格），再一个个拿出来看属于哪格。规则表就是那个分格方案，脚本就是那只不停搬东西的手。',
    terms: [
      { term: 'pathlib', plain: 'Python 自带的路径模块，把文件夹和文件当成对象来操作，比拼字符串稳。' },
      { term: '遍历目录', plain: '把文件夹里每一个文件都拿出来过一遍，通常用 iterdir 或 glob。' },
      { term: '扩展名', plain: '文件名最后一个点后面的部分，比如 报告.pdf 的 .pdf。' },
      { term: '移动', plain: '把文件从 A 文件夹挪到 B 文件夹，原位置就不留了。' },
      { term: '预演', plain: '先把「准备做什么」打印出来看一遍，确认没问题再真正执行。' },
    ],
    content: `## 一、项目需求

目标一句话：**把一个乱文件夹按类型分好，并且能批量改名。**

需求清单：

| 档位 | 需求 | 说明 |
| --- | --- | --- |
| 必须做 | 扫描指定文件夹里的所有文件 | 不管子文件夹，只管当前这一层 |
| 必须做 | 按扩展名分到 文档、图片、表格、文本、其他 五个子文件夹 | 规则写在一张表里，方便改 |
| 必须做 | 每类整理完打印一份清单 | 哪类几个文件、都是哪些 |
| 必须做 | 批量重命名：图片统一改成 图片01.jpg 这种 | 编号补零，后缀转小写 |
| 可以后做 | 按修改日期分年份文件夹、重复文件检测 | 第一版不做 |

## 二、功能拆解

| 功能 | 函数 | 输入 | 输出 |
| --- | --- | --- | --- |
| 建测试文件夹 | make_demo_files | 目标路径 | 一堆演示文件 |
| 按类型归类 | sort_by_suffix | 文件夹路径、规则字典 | 每类数量 |
| 批量改名 | rename_images | 文件夹路径 | 改名记录 |
| 打印报告 | print_report | 数量字典 | 屏幕清单 |

规则字典长这样：键是扩展名，值是目标文件夹名。想加一种类型，只改这个字典，不改逻辑。**把规则和数据分开，是这个项目最重要的习惯。**

## 三、开发思路

第一步，先造几个测试文件。真实文件不敢乱动，自己建一批假文件，弄坏了也不心疼。

第二步，确认遍历方式。pathlib 的 iterdir 会把文件夹里的东西一个个给出来，文件和子文件夹都有，所以要先判断 is_file。

第三步，移动前把动作打印出来。这一步能救你：如果规则写反了，预演会显示「照片.jpg → 文档」，你立刻能发现，而不是等文件全搬错了才反应过来。

第四步，真正移动。用 shutil.move，注意传的是字符串路径更保险。

第五步，改名单独做一次，别和分类混在一个循环里。两件事混在一起，出问题分不清是哪一步的错。

## 四、逐步实现

第一步，用 Path 建文件夹。mkdir 带 exist_ok=True，文件夹已存在也不报错，重复运行不会中断。

第二步，写规则字典。键记得带点，值是中文文件夹名。扩展名统一转小写再查，避免 .JPG 查不到。

第三步，遍历时用 list(work.iterdir()) 先转成列表。原因很关键：一边遍历一边移动文件，相当于一边翻书架一边搬书，容易漏。先拍个快照再动。

第四步，查不到规则的文件丢进「其他」。这是兜底，不然没见过的扩展名会让程序崩掉。

第五步，打印报告时按固定顺序输出，别依赖字典顺序，自己指定 文档、图片、表格、文本、其他 的顺序，输出才稳定好核对。

下面的例子把上面五步完整跑了一遍，自带演示文件，可以直接运行。

## 五、常见错误

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 遍历时漏文件 | 一边遍历一边移动 | 先 list() 转列表再遍历 |
| .JPG 没被识别 | 扩展名大小写不一致 | 查表前统一 lower() |
| FileExistsError | 目标文件夹不存在就移动 | 移动前 mkdir(exist_ok=True) |
| 把子文件夹也当文件处理 | 没判断 is_file | 加 if not f.is_file(): continue |
| 改完名顺序错乱 | 没按文件名排序就开始编号 | 先 sorted 再编号 |
| 真文件被误移 | 没预演 | 先只打印不移动，确认后再执行 |

## 六、最终成果

运行结束应该看到四行左右的清单，每行是「分类 数量 文件名、文件名」。再跑一次改名脚本，文件名变成 图片01.jpg 这种带补零编号的形式。

这个项目的价值不在代码量，而在于**「预演 → 执行」的习惯**：对真实文件做操作之前，先让程序把计划说一遍。

## 七、拓展挑战

第一个，加入按年份归档：读文件的修改时间，把它们分到 2025 年、2026 年这样的文件夹里。

第二个，检测重名文件：内容完全相同但名字不同的，列出来让人决定删哪个。

第三个，加一个 dry-run 开关：命令行参数带 --dry 就只打印不执行。这已经是真实工具的写法了。

第四个，把整理记录写成 CSV，方便以后回溯「哪个文件被挪到哪了」。`,
    examples: [
      {
        title: '按扩展名分类，并打印每类清单',
        intro: '这段代码会自己建一个「整理演示」文件夹和六个假文件，分类完再打印清单。需要在本地电脑运行，因为它要真的建文件夹。',
        code: `from pathlib import Path
import shutil

work = Path('整理演示')
work.mkdir(exist_ok=True)
for name in ['报告.pdf', '照片1.jpg', '照片2.jpg', '数据.csv', '笔记.txt']:
    (work / name).write_text('示例内容', encoding='utf-8')

rules = {'.pdf': '文档', '.jpg': '图片', '.csv': '表格', '.txt': '文本'}

for f in list(work.iterdir()):
    if not f.is_file():
        continue
    target = rules.get(f.suffix, '其他')
    folder = work / target
    folder.mkdir(exist_ok=True)
    shutil.move(str(f), str(folder / f.name))

for name in ['文档', '图片', '表格', '文本', '其他']:
    folder = work / name
    if not folder.exists():
        continue
    files = sorted(p.name for p in folder.iterdir())
    print(name, len(files), '、'.join(files))`,
        expectedOutput: `文档 1 报告.pdf
图片 2 照片1.jpg、照片2.jpg
表格 1 数据.csv
文本 1 笔记.txt`,
        lines: [
          { code: 'work = Path(\"整理演示\")', explain: 'Path 把字符串变成路径对象，后面用斜杠就能接子路径。' },
          { code: 'work.mkdir(exist_ok=True)', explain: '建文件夹；exist_ok=True 表示已经存在也不报错，方便反复运行。' },
          { code: 'rules.get(f.suffix, \"其他\")', explain: 'suffix 是带点的扩展名；规则表里没有的，一律归到「其他」，防止崩溃。' },
          { code: 'for f in list(work.iterdir())', explain: '先转成列表再遍历。边遍历边移动会让遍历器找不到原来的文件。' },
          { code: 'shutil.move(str(f), str(folder / f.name))', explain: '移动文件，源和目标都给字符串路径；目标文件名保持不变。' },
          { code: 'if not folder.exists(): continue', explain: '某类一个文件都没有时，文件夹可能根本不存在，跳过避免报错。' },
        ],
        trace: [
          { step: '第 4-6 行', state: '建出 整理演示 文件夹，里面有 5 个文件' },
          { step: '第 10 行', state: '转成列表后得到 5 个文件对象，顺序按系统给的来' },
          { step: '第 1 个文件 报告.pdf', state: 'suffix 是 .pdf，查表得 文档；建 文档 文件夹并移动' },
          { step: '第 2、3 个文件', state: '两张照片都进入 图片 文件夹' },
          { step: '第 4、5 个文件', state: '分别进入 表格 和 文本' },
          { step: '打印阶段', state: '按固定顺序逐类输出数量与文件名' },
        ],
        tryIt: '把规则表里的 .jpg 改成 .png，再运行一次会发生什么？先想清楚再跑。',
      },
      {
        title: '批量重命名：编号补零、后缀小写',
        intro: '给图片统一改成 图片01.jpg、图片02.jpg。注意编号补零，否则图片10 会排在图片2 前面。',
        code: `from pathlib import Path

work = Path('发票')
work.mkdir(exist_ok=True)
for name in ['a.jpg', 'b.jpg', 'c.png', '说明.txt']:
    (work / name).write_text('x', encoding='utf-8')

index = 0
for f in sorted(work.iterdir()):
    if f.suffix.lower() not in ['.jpg', '.png']:
        continue
    index += 1
    new_name = '图片' + str(index).zfill(2) + f.suffix.lower()
    f.rename(work / new_name)
    print(f.name, '->', new_name)

print('处理完成，共', index, '个文件')`,
        expectedOutput: `a.jpg -> 图片01.jpg
b.jpg -> 图片02.jpg
c.png -> 图片03.png
处理完成，共 3 个文件`,
        lines: [
          { code: 'for f in sorted(work.iterdir())', explain: '先按文件名排序，编号顺序才稳定，不会每次跑出来都不一样。' },
          { code: 'f.suffix.lower() not in [...]', explain: '扩展名转小写再判断，.JPG 也能认出来；不在名单里的跳过。' },
          { code: 'str(index).zfill(2)', explain: '把数字补到两位：1 变 01，10 还是 10，排序时不会错位。' },
          { code: 'f.rename(work / new_name)', explain: '重命名就是换个同目录下的新路径，rename 直接完成。' },
          { code: 'print(f.name, \"->\", new_name)', explain: '先打印再改名也可以，但这里改名已在上一行执行，f.name 仍是旧名，所以日志看着是对的。' },
        ],
        trace: [
          { step: '第 4-5 行', state: '发票 文件夹里出现 a.jpg、b.jpg、c.png、说明.txt' },
          { step: '排序后', state: '顺序为 a.jpg、b.jpg、c.png、说明.txt' },
          { step: 'a.jpg', state: 'index=1，新名 图片01.jpg，改完原名消失' },
          { step: 'b.jpg / c.png', state: 'index=2、3，分别得到 图片02.jpg、图片03.png' },
          { step: '说明.txt', state: '后缀不在名单，跳过，index 不加' },
        ],
        tryIt: '把 zfill(2) 改成 zfill(3)，输出会变成什么样？如果有 12 个文件，补零位数不够会怎样？',
      },
    ],
    compare: [
      {
        conceptA: 'shutil.move',
        conceptB: 'Path.rename',
        diff: 'move 可以跨文件夹搬运，也能顺便改名；rename 是同目录换名字，跨盘有时会失败。',
        example: 'shutil.move(str(src), str(dst)) 用于归类；f.rename(new_path) 用于改名。',
      },
      {
        conceptA: '直接遍历',
        conceptB: '先 list 再遍历',
        diff: '边遍历边增删文件会让遍历器跳过或重复；先转列表相当于拍快照，后续随便改。',
        example: 'for f in list(folder.iterdir()):',
      },
    ],
    pitfalls: [
      '一边 iterdir 一边 move，结果漏掉一半文件。',
      '扩展名没转小写，.JPG 全被归到「其他」。',
      '目标文件夹不存在就直接移动，报错中断。',
      '没判断 is_file，把子文件夹也当文件移动，报权限错误。',
      '在真实的重要文件夹上直接跑，没有先预演，移错了很难还原。',
    ],
    keyPoints: [
      '规则放字典、逻辑放函数：加新类型只改字典。',
      '做文件操作前先 list 快照，避免边遍历边改。',
      '扩展名统一 lower 再匹配，兼容大小写混写。',
      '编号用 zfill 补零，排序才不会乱。',
      '对真实文件动手前，先打印计划（预演），确认后再执行。',
    ],
    sources: [
      { book: 'update', chapter: '综合实践', section: '项目二：文件批量整理工具' },
      { book: 'abs3', chapter: '第 9 章', section: '组织文件', note: 'shutil 与路径操作' },
    ],
    prerequisites: ['s6-02', 's8-11'],
    task: '在自己的「下载」文件夹里挑三个不重要的文件复制到测试目录，写出归类 + 改名脚本，先打印预演结果，确认无误后再执行，最后把整理前后的目录截图对比。',
    exercises: [
      {
        id: 's9-02-q1',
        qtype: 'single',
        stem: '下面哪种写法能在「边遍历边移动文件」时不漏文件？',
        options: [
          'A. for f in folder.iterdir(): 里直接 move',
          'B. 先 for f in list(folder.iterdir()) 转成列表，再遍历移动',
          'C. 用 while 循环搭配 iterdir',
          'D. 先删掉已处理的文件再继续遍历',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：iterdir 是边遍历边向文件夹要下一个，移动文件会改变目录内容，遍历器就会跳项。\n逐步演示：先 list() 把所有条目拍成快照，之后移动多少都不影响这份快照。\n易错提醒：这不是性能优化，是正确性问题，文件少的时候也可能出错。',
        difficulty: 2,
      },
      {
        id: 's9-02-q2',
        qtype: 'blank',
        stem: '要把编号 1 显示成 01，需要对字符串调用哪个方法补齐前导零？\n\nnew_name = "图片" + str(index).______(2) + ".jpg"',
        answer: 'zfill',
        accepted: ['zfill', 'ZFILL', 'zfill()'],
        explanation:
          '答案：zfill。\n思路：zfill(n) 把字符串补到 n 位，不够的在左边填 0。\n逐步演示："1".zfill(2) 得 "01"；"10".zfill(2) 得 "10" 不变；"1".zfill(3) 得 "001"。\n易错提醒：用 rjust 需要自己写填充字符，zfill 专门处理数字补零，更直接。',
        difficulty: 2,
      },
      {
        id: 's9-02-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？注意扩展名的大小写。',
        code: `rules = {'.jpg': '图片', '.txt': '文本'}
for name in ['a.JPG', 'b.jpg']:
    suffix = name[name.rfind('.'):]
    print(name, '->', rules.get(suffix, '其他'))`,
        keywords: [['a.JPG', '其他'], ['b.jpg', '图片']],
        explanation:
          '答案：a.JPG -> 其他，b.jpg -> 图片。\n思路：rfind 取出带点的后缀，这里没有转小写，.JPG 和 .jpg 是两个不同的键。\n逐步演示：a.JPG 取出 .JPG，规则表里没有，get 返回默认值「其他」；b.jpg 取出 .jpg，命中规则。\n易错提醒：真实脚本里要在查表前加 .lower()，否则大写扩展名的文件全被归到「其他」。',
        difficulty: 2,
      },
      {
        id: 's9-02-q4',
        qtype: 'debug',
        stem: '下面的脚本想把文件移进分类文件夹，但一运行就报 FileNotFoundError。指出原因和改法。',
        code: `from pathlib import Path
import shutil
work = Path('相册')
work.mkdir(exist_ok=True)
(work / 'a.jpg').write_text('x', encoding='utf-8')
for f in list(work.iterdir()):
    if not f.is_file():
        continue
    shutil.move(str(f), str(work / '图片' / f.name))`,
        keywords: [['图片', '文件夹', '不存在'], ['mkdir'], ['先建', '目标']],
        explanation:
          '答案：目标文件夹 相册/图片 不存在，移动时找不到落脚点。移动前先执行 (work / "图片").mkdir(exist_ok=True)。\n思路：move 只会把文件搬过去，不会自动创建目标目录。\n逐步演示：先建好 相册/图片，再 move 到 相册/图片/a.jpg 就成功了。\n易错提醒：报错信息里的路径是移动的目标路径，看到路径最后一段是新文件夹名，就该想到目录没建。',
        difficulty: 3,
      },
      {
        id: 's9-02-q5',
        qtype: 'program',
        stem: '给定一组文件名，请统计每种扩展名各有多少个，按扩展名字母顺序输出，每行「扩展名 数量」。\n\n文件名列表：a.txt、b.jpg、c.txt、d.pdf、e.jpg、f.txt\n\n期望输出三行：.jpg 2 / .pdf 1 / .txt 3',
        answer: '',
        testCases: [{ stdin: '', expected: '.jpg 2\n.pdf 1\n.txt 3' }],
        explanation:
          '答案（参考答案）：\nnames = ["a.txt", "b.jpg", "c.txt", "d.pdf", "e.jpg", "f.txt"]\ncount = {}\nfor name in names:\n    suffix = name[name.rfind("."):].lower()\n    count[suffix] = count.get(suffix, 0) + 1\nfor suffix in sorted(count):\n    print(suffix, count[suffix])\n\n思路：用 rfind 从右往左找最后一个点，取出后缀；字典累加计数；sorted 默认按字符串升序。\n逐步演示：.txt 出现 3 次、.jpg 2 次、.pdf 1 次；sorted 后顺序是 .jpg、.pdf、.txt（按字符编码 j < p < t）。\n易错提醒：用 split(".")[1] 会漏掉文件名里带点的情况，比如 v1.2.txt 就取错了。',
        difficulty: 3,
      },
    ],
    minutes: 30,
    env: 'local',
  },
  {
    id: 's9-03',
    stageId: 9,
    order: 3,
    title: '项目三：CSV 与 Excel 报表工具',
    subtitle: '别人发来的乱表格，进去出来是一份干净报表',
    hook: '同事发来一份采购明细 CSV，让你统计每个品名花了多少钱，还要交一份 Excel 给领导。手工筛选加总，一天就过去了。',
    objectives: [
      '用 csv 模块读写文件，说清 encoding 与 newline 两个参数的作用',
      '把从 CSV 读出来的字符串安全转换成数字并处理转换失败的行',
      '用字典完成分组汇总，并按金额排序输出',
      '用 openpyxl 把结果写成两个工作表的 Excel 文件',
    ],
    analogy:
      'CSV 就是一列列用逗号隔开的纯文本，像一张没有格线的表格；Excel 文件则是带格式、带多个工作表的精装本。工具做的事就是：把精装本拆成便于计算的零件，算完再装订回精装本。',
    terms: [
      { term: 'CSV', plain: '用逗号分隔的纯文本表格，一行一条记录，Excel 也能打开。' },
      { term: '表头', plain: 'CSV 第一行，写着每一列叫什么名字，DictReader 靠它给每行起字段名。' },
      { term: 'utf-8-sig', plain: '带 BOM 标记的 UTF-8，专治 Excel 打开中文变乱码。' },
      { term: '脏数据', plain: '空值、空格、单位混在数字里、金额写成 1,200 这类干扰计算的内容。' },
      { term: 'openpyxl', plain: '第三方库，用 Python 读写 xlsx 文件，需要 pip install openpyxl。' },
    ],
    content: `## 一、项目需求

目标：**读入一份采购明细，输出一份能直接交付的报表。**

| 档位 | 需求 | 说明 |
| --- | --- | --- |
| 必须做 | 读取 CSV，跳过空行 | 编码用 utf-8-sig，避免 Excel 打开乱码 |
| 必须做 | 计算每行金额 = 单价 × 数量 | 两列都可能是文字，要转成数字 |
| 必须做 | 按品名汇总金额，从大到小排 | 这就是领导要看的结论 |
| 必须做 | 输出总金额与总行数 | 用来核对有没有漏算 |
| 必须做 | 结果写成 Excel，两个工作表 | 一个明细，一个汇总 |
| 可以后做 | 加上日期区间筛选、图表 | 第二版再说 |

## 二、功能拆解

| 功能 | 函数 | 输入 | 输出 |
| --- | --- | --- | --- |
| 读数据 | read_rows | 文件路径 | 字典列表 |
| 清洗 | to_number | 任意值 | 数字或 None |
| 汇总 | summarize | 字典列表 | 品名到金额的字典 |
| 写 Excel | write_report | 明细、汇总、路径 | 生成文件 |
| 主流程 | main | 无 | 打印统计信息 |

这里多了一个 to_number 函数，专门负责「把可能带脏字符的文字变成数字」。**转换逻辑单独成函数，是因为它最容易出错，也最需要单独测试。**

## 三、开发思路

第一步，先看清数据。打开原始 CSV 用记事本看一眼：有没有表头？编码是 UTF-8 还是 GBK？金额里有没有千分位逗号？这一步花两分钟，能省两小时。

第二步，先原样读进来打印前三行。不做任何计算，确认字段名对得上（比如列名是 单价 还是 价格）。

第三步，再动计算。算之前把数字列逐列转换，转换失败的行打印警告并跳过，不要让一行脏数据毁掉整份报表。

第四步，汇总排序，把结果打印出来人工核对一遍。总金额对不对，一眼就能看出数量级是否离谱。

第五步，最后才写 Excel。因为 Excel 只是呈现层，数据不对，写出来也是错的。

## 四、逐步实现

第一步，用 csv.DictReader 打开文件。每行直接是字典，键就是表头文字，取值用 row["品名"] 这种写法，不用记列号。

第二步，写 to_number：先把值转成字符串、去掉空格和逗号，再尝试 float，失败返回 None。调用方看到 None 就知道这行不参与计算。

第三步，遍历行算金额。单价乘数量，累加到总额，同时按品名累加到字典。这一步和记账项目的分类统计是同一个套路。

第四步，排序输出。用 sorted 加 key 指定按金额排、reverse=True 从大到小。

第五步，openpyxl 写文件。创建工作簿，默认有一个活动工作表，改名成「汇总」，逐行写入；再用 create_sheet 建第二个表写明细，最后 save。

下面两个例子，第一个是纯标准库的读写与汇总，可以在浏览器里跑；第二个是 Excel 输出，需要本地装 openpyxl。

## 五、常见错误

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| Excel 打开中文乱码 | 写文件时用了 utf-8 | 改用 utf-8-sig |
| 每行之间多一个空行 | Windows 下没写 newline='' | open 时加 newline='' |
| 金额算出来是 0 或报错 | 列里带空格、逗号、单位 | 先 strip、replace，再 float |
| 一行坏数据让程序崩掉 | 没做转换失败判断 | to_number 返回 None 并跳过该行 |
| ModuleNotFoundError: openpyxl | 没装第三方库 | pip install openpyxl，并确认虚拟环境已激活 |
| 写出的 xlsx 打不开 | 忘了 wb.save，或用错扩展名 | 结尾必须 save 到 .xlsx |

## 六、最终成果

运行完你会看到两段输出：总行数、总金额，以及按品名从大到小的金额清单；同时目录里多出一个报表文件，打开后有两个工作表。明细表能一眼看到原始数据，汇总表就是结论。

## 七、拓展挑战

第一个，加日期区间参数：只统计某个月的记录。

第二个，处理千分位和货币符号：把 1,200.50 元和 ￥88 都能正确转成数字。

第三个，用 openpyxl 给汇总表加一行合计，并设置列宽、加粗表头。

第四个，把「每月 × 每品名」做成二维交叉表，这是数据分析里最常见的形状。`,
    examples: [
      {
        title: '读 CSV、算金额、按品名汇总',
        intro: '为了能直接运行，这里用一段内嵌的 CSV 文本代替文件，读取逻辑和读真实文件完全一样。浏览器里可跑。',
        code: `import csv
from io import StringIO

raw = """日期,品名,单价,数量
2026-03-01,笔记本,12.5,4
2026-03-02,钢笔,38,1
2026-03-05,笔记本,12.5,2
2026-03-08,文件夹,6,5"""

total = 0
by_name = {}
for row in csv.DictReader(StringIO(raw)):
    amount = float(row['单价']) * int(row['数量'])
    total += amount
    by_name[row['品名']] = by_name.get(row['品名'], 0) + amount

print('合计', total)
for name, amount in sorted(by_name.items(), key=lambda item: item[1], reverse=True):
    print(name, amount)`,
        expectedOutput: `合计 143.0
笔记本 75.0
钢笔 38.0
文件夹 30.0`,
        lines: [
          { code: 'csv.DictReader(StringIO(raw))', explain: 'DictReader 把第一行当表头，之后每行给成字典；这里用 StringIO 把字符串伪装成文件。' },
          { code: 'float(row[\"单价\"]) * int(row[\"数量\"])', explain: 'CSV 读出来全是字符串，必须显式转换：单价用 float，数量用 int，否则就成了字符串重复。' },
          { code: 'by_name.get(row[\"品名\"], 0) + amount', explain: '按品名累加，规则和记账项目一模一样。' },
          { code: 'sorted(by_name.items(), key=lambda item: item[1], reverse=True)', explain: '按元组第 2 个元素（金额）排序并倒序，得到从大到小的清单。' },
        ],
        trace: [
          { step: '表头解析', state: '字段名为 日期、品名、单价、数量' },
          { step: '第 1 行', state: '12.5×4=50.0，total=50.0，笔记本→50.0' },
          { step: '第 2 行', state: '38×1=38.0，total=88.0，钢笔→38.0' },
          { step: '第 3 行', state: '12.5×2=25.0，total=113.0，笔记本→75.0' },
          { step: '第 4 行', state: '6×5=30.0，total=143.0，文件夹→30.0' },
          { step: '输出阶段', state: '排序后依次打印 笔记本 75.0、钢笔 38.0、文件夹 30.0' },
        ],
        tryIt: '把钢笔那行的单价改成 "38元"，看程序会报什么错，然后想想 to_number 函数该怎么写才能兜住。',
      },
      {
        title: '写出 CSV 再读回来核对',
        intro: '验证「写进去的东西能原样读回来」是处理表格的基本功。注意 open 的两个参数：newline 和 encoding。这段需在本地运行。',
        code: `import csv

rows = [
    ['日期', '品名', '金额'],
    ['2026-03-01', '笔记本', 50.0],
    ['2026-03-02', '钢笔', 38.0],
    ['2026-03-08', '文件夹', 30.0],
]

with open('明细.csv', 'w', newline='', encoding='utf-8') as f:
    csv.writer(f).writerows(rows)

with open('明细.csv', newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    total = 0
    count = 0
    for row in reader:
        total += float(row['金额'])
        count += 1

print('行数', count)
print('金额合计', total)`,
        expectedOutput: `行数 3
金额合计 118.0`,
        lines: [
          { code: 'open(..., \"w\", newline=\"\", encoding=\"utf-8\")', explain: '写 CSV 必须加 newline=""，否则 Windows 会给每行多加一个空行。' },
          { code: 'csv.writer(f).writerows(rows)', explain: 'writerows 一次写入多行，每行是一个列表；v 会自动处理逗号和引号转义。' },
          { code: 'csv.DictReader(f)', explain: '读回来时用 DictReader，第一行自动当表头，后面按列名取值。' },
          { code: 'float(row[\"金额\"])', explain: '读回来的金额是字符串，转 float 才能相加。' },
        ],
        trace: [
          { step: '写入阶段', state: '明细.csv 里出现 4 行文本，表头 + 3 条记录' },
          { step: '读取阶段', state: 'DictReader 跳过表头，给出 3 个字典' },
          { step: '第 1 条', state: 'count=1，total=50.0' },
          { step: '第 2、3 条', state: 'count=3，total=118.0' },
          { step: '打印', state: '行数 3、金额合计 118.0' },
        ],
        tryIt: '把 newline="" 删掉，在 Windows 上重跑，用记事本打开 明细.csv 看看多了什么。',
      },
    ],
    compare: [
      {
        conceptA: 'csv 模块',
        conceptB: 'openpyxl',
        diff: 'csv 只能处理纯文本表格，靠标准库即可；openpyxl 能读写带格式、多工作表的 xlsx，需要额外安装。',
        example: '临时数据处理走 csv；要交付给同事的正式报表走 openpyxl。',
      },
      {
        conceptA: 'utf-8',
        conceptB: 'utf-8-sig',
        diff: '两者内容一样，后者开头多一个 BOM 标记；Excel 靠这个标记认出这是 UTF-8，中文才不会乱码。',
        example: '写给人用 Excel 打开的 CSV，用 utf-8-sig 最省事。',
      },
    ],
    pitfalls: [
      '写 CSV 忘了 newline=""，Windows 上每行之间多一个空行。',
      '直接用 row["金额"] + 1 计算，字符串加数字直接 TypeError。',
      '遇到一行脏数据没有兜底，整份报表跑不出来。',
      '写 Excel 前没装 openpyxl，或者装到了别的虚拟环境里。',
      '金额用 float 累加后直接展示，出现 118.00000000000001 这种尾巴。',
    ],
    keyPoints: [
      'CSV 读出来的每个字段都是字符串，参与计算前必须转换。',
      '写 CSV 用 newline=""，写给人看的 CSV 用 encoding="utf-8-sig"。',
      '转换单独写成 to_number，脏数据跳过并留痕，别让一行毁掉全表。',
      '汇总用字典累加，输出时 sorted 加 key 指定排序字段。',
      '先核对数据再写 Excel，呈现层永远放在最后。',
    ],
    sources: [
      { book: 'update', chapter: '综合实践', section: '项目三：CSV 与 Excel 报表工具' },
      { book: 'abs3', chapter: '第 14 章', section: '处理 CSV 文件和 JSON 数据' },
      { book: 'pcc3', chapter: '第 16 章', section: '下载数据' },
    ],
    prerequisites: ['s6-03', 's8-12'],
    task: '找一份真实的小表格（自己造一份也行，至少 20 行、含一行故意写坏的金额），用项目里的思路跑通：清洗、汇总、导出两个工作表的 Excel，并把「跳过了哪几行」打印出来。',
    exercises: [
      {
        id: 's9-03-q1',
        qtype: 'single',
        stem: '在 Windows 上用 csv 模块写文件，open 时为什么建议加 newline=""？',
        options: [
          'A. 不加的话文件无法写入',
          'B. 不加的话换行符会被转换两次，每行之间多出空行',
          'C. 加了能让文件体积更小',
          'D. 加了才能写中文',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：csv 模块自己会写换行符，文本模式又会把换行符转换一次，两次叠加就成了空行。\n逐步演示：不加 newline=""，记事本里每行后面跟一个空行；加上之后恢复正常一行一条。\n易错提醒：中文乱码是 encoding 的问题，和 newline 无关，两个参数各管一件事。',
        difficulty: 1,
      },
      {
        id: 's9-03-q2',
        qtype: 'blank',
        stem: '用 csv 读文件后，想把「单价」这一列当数字用，需要先做类型转换。补全代码：\n\nprice = ______(row["单价"])',
        answer: 'float',
        accepted: ['float', 'FLOAT'],
        explanation:
          '答案：float。\n思路：CSV 里所有内容都是字符串，12.5 读进来是 "12.5"，不能直接参与乘法。\n逐步演示：float("12.5") 得 12.5，之后 12.5 * 4 才等于 50.0。\n易错提醒：用 int 会把 12.5 直接报错，整数列才用 int。',
        difficulty: 2,
      },
      {
        id: 's9-03-q3',
        qtype: 'predict',
        stem: '下面代码输出什么？注意读进来的值是什么类型。',
        code: `import csv
from io import StringIO

raw = """品名,金额
A,10
B,20"""
total = 0
for row in csv.DictReader(StringIO(raw)):
    total = total + row['金额']
print(total)`,
        keywords: [['1020'], ['字符串', '拼接']],
        explanation:
          '答案：输出 1020。\n思路：CSV 读出来的金额是字符串 "10" 和 "20"，加号在这里做的是字符串拼接。\n逐步演示：""+"10" 得 "10"，再 +"20" 得 "1020"，打印出来就是 1020，看着像数字其实是文字。\n易错提醒：这个坑最阴，程序不报错但结果是错的；看到 1020 而不是 30，就该想到没转数字。',
        difficulty: 2,
      },
      {
        id: 's9-03-q4',
        qtype: 'debug',
        stem: '下面的清洗函数遇到单价写成 "1,200" 时仍然崩溃。指出原因并给出改法。',
        code: `def to_number(value):
    try:
        return float(value)
    except ValueError:
        return None

print(to_number('1,200'))`,
        keywords: [['逗号'], ['replace'], ['float']],
        explanation:
          '答案：float("1,200") 抛 ValueError，函数直接返回 None，这一行数据被当成脏数据丢掉。改法是先把逗号去掉：float(value.replace(",", ""))。\n思路：千分位逗号是纯展示用的符号，计算前必须清掉。\n逐步演示："1,200".replace(",", "") 得 "1200"，float("1200") 得 1200.0。\n易错提醒：还能遇到空格、￥、元这些字符，先用 strip 去空格、replace 去符号，再 float 最稳。',
        difficulty: 3,
      },
      {
        id: 's9-03-q5',
        qtype: 'program',
        stem: '给定下面这段 CSV 文本，请计算每行金额（单价 × 数量），输出合计，再按品名金额从大到小输出。\n\n品名,单价,数量\n铅笔,2.5,10\n橡皮,1.5,6\n铅笔,2.5,4\n尺子,4,3\n\n期望输出四行：合计 56.0 / 铅笔 35.0 / 尺子 12.0 / 橡皮 9.0',
        answer: '',
        testCases: [{ stdin: '', expected: '合计 56.0\n铅笔 35.0\n尺子 12.0\n橡皮 9.0' }],
        explanation:
          '答案（参考答案）：\nimport csv\nfrom io import StringIO\nraw = "品名,单价,数量\\n铅笔,2.5,10\\n橡皮,1.5,6\\n铅笔,2.5,4\\n尺子,4,3"\ntotal = 0\ndetail = {}\nfor row in csv.DictReader(StringIO(raw)):\n    amount = float(row["单价"]) * int(row["数量"])\n    total += amount\n    detail[row["品名"]] = detail.get(row["品名"], 0) + amount\nprint("合计", total)\nfor name in sorted(detail, key=lambda k: detail[k], reverse=True):\n    print(name, detail[name])\n\n思路：和课堂例子同一套路，只是排序时直接对字典的键排序、用键去取金额。\n逐步演示：铅笔 25.0+10.0=35.0，橡皮 9.0，尺子 12.0，合计 56.0；排序后 35.0 > 12.0 > 9.0。\n易错提醒：忘记 float 转换会得到 2.510 这种拼接结果，合计也会完全不对。',
        difficulty: 3,
      },
    ],
    minutes: 32,
    env: 'local',
  },
  {
    id: 's9-04',
    stageId: 9,
    order: 4,
    title: '项目四：网络信息获取工具',
    subtitle: '把网页接口的数据，规规矩矩存成一张表',
    hook: '想看的数据在一个网站的分页列表里，一页十条，一共五十页。手抄不现实，复制粘贴也对不齐，能不能让程序自己翻页抓完？',
    objectives: [
      '说清一次接口请求的完整流程：地址、参数、响应、状态码',
      '写分页循环，并把终止条件写对，避免死循环',
      '处理超时、非 200 状态码、JSON 解析失败三类异常',
      '把抓到的数据按字段写成 CSV，并记录失败页以便重试',
    ],
    analogy:
      '抓数据像去图书馆复印资料：先报书名（请求地址），管理员去库里找（服务器处理），找到了给你一叠纸（响应内容）；找不到就告诉你没有（状态码 404）。分页就是一本厚书，一册一册地借。',
    terms: [
      { term: '接口', plain: '网站给程序留的数据入口，访问一个地址就返回结构化数据，不是网页。' },
      { term: '请求参数', plain: '跟在地址后面说明要什么的条件，比如第几页、每页多少条。' },
      { term: '状态码', plain: '服务器返回的三位数字：200 成功、404 找不到、403 没权限、500 服务器出错。' },
      { term: 'JSON', plain: '一种文本格式，用大括号和中括号装数据，Python 里能用字典列表表示。' },
      { term: '限速', plain: '别一秒发几十个请求，加个短暂等待，对服务器客气一点，也更不容易被封。' },
    ],
    content: `## 一、项目需求

目标：**从分页接口把数据抓全，存成一张能用的 CSV。**

| 档位 | 需求 | 说明 |
| --- | --- | --- |
| 必须做 | 按页请求，直到没有下一页 | 终止条件写清楚 |
| 必须做 | 从 JSON 里取出需要的字段 | 只要名字、价格、库存这几列 |
| 必须做 | 每次请求设超时 | 卡住不能一直等 |
| 必须做 | 出错不退出，记录失败页继续 | 抓完再回头补 |
| 必须做 | 结果写成 CSV | 表头 + 一行一条记录 |
| 可以后做 | 增量抓取、定时运行 | 第二版再说 |

## 二、功能拆解

| 功能 | 函数 | 输入 | 输出 |
| --- | --- | --- | --- |
| 抓一页 | fetch_page | 页码 | 解析后的字典 |
| 取字段 | pick_fields | 一条原始记录 | 精简后的字典 |
| 存文件 | save_csv | 记录列表、路径 | 生成 CSV |
| 主流程 | crawl | 总页数上限 | 全部记录、失败页清单 |

把网络请求单独关在 fetch_page 里，好处很明显：以后要换接口、加请求头、加代理，只改这一个函数。

## 三、开发思路

第一步，先手动看一次返回。用浏览器打开接口地址，或者在代码里打印前 200 个字符，确认它是 JSON 还是 HTML。**返回的是一张网页却按 JSON 解析，是最常见的翻车点。**

第二步，确认分页怎么表示：是页码 page=1、2、3，还是游标 next_cursor？终止条件通常是「返回的列表为空」或「next 字段为 false」。

第三步，写死循环的上限。就算终止条件写错了，也不能无限跑——加一个最大页数保护，比如最多 50 页。

第四步，异常分三类处理：网络超时（重试一次）、状态码不是 200（记录并跳过）、JSON 解析失败（大概率返回了错误页）。

第五步，全部抓完再统一写文件。中途写文件容易写出半截内容。

还有一条容易被忽略的原则：**只抓公开、允许抓的数据。** 需要登录才能看的内容、明确写在 robots 协议里禁止抓的路径，都不要碰；抓取频率压到自己都觉得客气的程度。技术上做得到，不代表可以随便做，这条比代码本身更重要。真要做长期项目，先看对方有没有提供官方接口或数据导出，走正规入口最省事。

## 四、逐步实现

第一步，导入 requests，调 get 时带上 params 和 timeout。params 用字典，requests 会自动拼到地址里，不用自己拼字符串。

第二步，检查 status_code。不是 200 就抛出自己的异常，让上层记录页码。

第三步，response.json() 解析。如果接口返回的不是 JSON，这一步会抛错，正好被 except 抓住。

第四步，写分页循环。用一个 while，每次成功后 page 加一，没有下一页就 break，同时检查有没有超过最大页数。

第五步，写 CSV。字段名固定成一行表头，逐条写字典，用 utf-8-sig 方便 Excel 打开。

下面的第一个例子用一段内嵌的 JSON 文本演示解析与筛选，浏览器里能跑；第二个例子用假函数模拟分页抓取，逻辑和真实请求完全一致，也可以直接跑。

## 五、常见错误

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| JSONDecodeError | 返回的是网页或错误提示，不是 JSON | 先打印前 200 字符看看是什么 |
| 程序卡住不动 | 没设 timeout | get 时加 timeout=10 |
| 只抓到第一页 | 循环里没更新 page | 每轮结束 page += 1 |
| 死循环跑了几千次 | 终止条件永远不成立 | 加最大页数保护 |
| 403 或 429 | 请求太快或缺请求头 | 加延时、加 User-Agent、降频 |
| KeyError: price | 字段名猜错了 | 先打印一条原始记录看真实键名 |

## 六、最终成果

跑完应该看到「共抓到 N 条，失败 M 页」这样的汇总，目录里出现一个 CSV，Excel 能正常打开，中文不乱码。失败页清单留着，网络好时补抓。

## 七、拓展挑战

第一个，加自动重试：失败页等两秒再试一次，还失败才放弃。

第二个，做增量：记录已抓过的最大日期，下次只抓新的。

第三个，抓完做个简单统计：价格分布、库存为 0 的有多少。

第四个，把数据存进 SQLite，用 SQL 做筛选，比每次重抓省事。`,
    examples: [
      {
        title: '解析 JSON 响应，按条件筛选',
        intro: '真实场景里这段文本是 requests 拿回来的响应内容。这里先把它当字符串放好，只练解析和筛选，浏览器里能跑。',
        code: `import json

response_text = """{"total": 3, "items": [
  {"name": "笔记本", "price": 12.5, "stock": 40},
  {"name": "钢笔", "price": 38, "stock": 0},
  {"name": "文件夹", "price": 6, "stock": 120}
]}"""

data = json.loads(response_text)
print('总条数', data['total'])

for item in data['items']:
    status = '缺货' if item['stock'] == 0 else '可售'
    print(item['name'], item['price'], status)

value = sum(i['price'] * i['stock'] for i in data['items'])
print('库存总值', round(value, 1))`,
        expectedOutput: `总条数 3
笔记本 12.5 可售
钢笔 38 缺货
文件夹 6 可售
库存总值 1220.0`,
        lines: [
          { code: 'json.loads(response_text)', explain: '把 JSON 文本变成 Python 的字典；外层是大括号就是字典，方括号就是列表。' },
          { code: 'data[\"items\"]', explain: '按 JSON 里的键名取值，得到三条记录的列表。' },
          { code: '\"缺货\" if item[\"stock\"] == 0 else \"可售\"', explain: '条件表达式，一行写完二选一，比 if-else 两行紧凑。' },
          { code: 'sum(i[\"price\"] * i[\"stock\"] for i in data[\"items\"])', explain: '生成器表达式直接求和，等价于先算一堆乘积再相加。' },
        ],
        trace: [
          { step: '解析阶段', state: 'data 变成 {total: 3, items: [三个字典]}' },
          { step: '第 1 条', state: '笔记本库存 40，判为可售' },
          { step: '第 2 条', state: '钢笔库存 0，判为缺货' },
          { step: '求和', state: '12.5×40 + 38×0 + 6×120 = 500 + 0 + 720 = 1220.0' },
        ],
        tryIt: '把筛选条件改成「价格大于 10 的才打印」，想想判断应该加在哪一行。',
      },
      {
        title: '分页循环：翻到没有下一页为止',
        intro: '这里用 fake_get 假装是网络请求，返回两页数据。重点看 while 的终止条件和 page 的累加，这两处换成真实 requests 也是同样写法。',
        code: `def fake_get(url):
    pages = {
        'page=1': {'items': ['苹果', '香蕉'], 'next': True},
        'page=2': {'items': ['橙子'], 'next': False},
    }
    for key, value in pages.items():
        if key in url:
            return value
    return {'items': [], 'next': False}

all_items = []
page = 1
while True:
    data = fake_get('https://example.com/fruits?page=' + str(page))
    all_items.extend(data['items'])
    if not data['next']:
        break
    page += 1

print('共抓到', len(all_items), '条')
print(all_items)`,
        expectedOutput: `共抓到 3 条
['苹果', '香蕉', '橙子']`,
        lines: [
          { code: 'all_items = []', explain: '先准备一个空列表，把每一页的数据都并进来。' },
          { code: 'while True:', explain: '先假设要一直翻，靠里面的 break 决定什么时候停。' },
          { code: 'all_items.extend(data[\"items\"])', explain: 'extend 把另一列表里的元素逐个加进来，和 append 加整个列表不同。' },
          { code: 'if not data[\"next\"]: break', explain: '没有下一页就跳出循环，这是真正的终止条件。' },
          { code: 'page += 1', explain: '一定放在 break 之后，否则最后一页会重复请求。' },
        ],
        trace: [
          { step: 'page=1', state: '拿到 2 条，next 为 True，不 break，page 变 2' },
          { step: 'page=2', state: '拿到 1 条，next 为 False，break' },
          { step: '结束', state: 'all_items 共 3 条，打印 3 和列表内容' },
        ],
        tryIt: '把 page += 1 挪到 break 前面会发生什么？动手改一下跑一遍，看输出条数变化。',
      },
    ],
    compare: [
      {
        conceptA: 'response.text',
        conceptB: 'response.json()',
        diff: 'text 是原始字符串，适合看内容和排查错误页；json() 直接解析成字典，适合取字段，但返回不是 JSON 时会报错。',
        example: '先 print(r.text[:200]) 确认内容，再 r.json() 取值。',
      },
      {
        conceptA: 'append',
        conceptB: 'extend',
        diff: 'append 把整个对象塞进列表，列表里多一个元素；extend 把另一个列表的元素逐个加入。',
        example: '分页合并数据用 extend，收集整页结果用 append。',
      },
    ],
    pitfalls: [
      '没设 timeout，网络一卡程序就永远停在那里。',
      '不检查 status_code 直接解析，403 的提示页被当 JSON 解析，报错看不懂。',
      '分页循环里忘了 page += 1，抓到第一页就一直重复。',
      '只靠 next 字段判断终止，接口异常时可能永远不结束，缺一个最大页数兜底。',
      '请求太密被限流，返回 429，还以为是代码写错了。',
    ],
    keyPoints: [
      '先确认返回的是 JSON 再解析，排查问题先看前 200 个字符。',
      '请求必须带 timeout，程序不能无限等。',
      '分页循环三件套：更新页码、判断终止、最大页数保护。',
      '异常分三类处理，失败页记录下来继续跑，不要一处失败全盘退出。',
      '对服务器客气一点：加延时、别并发猛打，这是能用长久的前提。',
    ],
    sources: [
      { book: 'update', chapter: '综合实践', section: '项目四：网络信息获取工具' },
      { book: 'pcc3', chapter: '第 17 章', section: '使用 API' },
      { book: 'abs3', chapter: '第 16 章', section: '处理 JSON 与网络请求' },
    ],
    prerequisites: ['s8-07', 's6-04'],
    task: '找一个允许公开访问的接口（天气、汇率、公开测试接口都行），抓两页数据存成 CSV；故意把接口地址改错一次，观察状态码和异常处理是否按预期工作，把两次的终端输出都记录下来。',
    exercises: [
      {
        id: 's9-04-q1',
        qtype: 'single',
        stem: '写分页抓取时，下面哪个做法最能保证程序不会无限跑下去？',
        options: [
          'A. 用 for 循环代替 while 循环就够了',
          'B. 除了判断「没有下一页」，再加一个最大页数上限',
          'C. 每次请求之间加 sleep',
          'D. 把 timeout 设得很小',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：终止条件依赖接口返回的字段，一旦接口行为异常（永远返回 next 为真），循环就停不下来。\n逐步演示：while page <= max_page 或者循环里判断 page 超过上限就 break，双保险。\n易错提醒：sleep 是限速，timeout 是防止单次卡死，都不是防死循环的手段。',
        difficulty: 2,
      },
      {
        id: 's9-04-q2',
        qtype: 'blank',
        stem: '把接口返回的 JSON 文本转成 Python 字典，用 json 模块的哪个函数？\n\nimport json\ndata = json.______(response_text)',
        answer: 'loads',
        accepted: ['loads', 'LOADS'],
        explanation:
          '答案：loads。\n思路：带 s 的处理字符串（string），不带 s 的处理文件对象。\n逐步演示：文本 {"a": 1} 传给 json.loads 后得到 Python 字典，就能用键 a 取值；json.load(f) 则直接从打开的文件读。\n易错提醒：写成 load 并传字符串会报类型错误，记住 s 代表 string。',
        difficulty: 2,
      },
      {
        id: 's9-04-q3',
        qtype: 'predict',
        stem: '下面代码输出几行？每行内容是什么？',
        code: `import json

data = json.loads('{"items": [{"name": "A", "stock": 0}, {"name": "B", "stock": 5}]}')
for item in data['items']:
    if item['stock'] == 0:
        continue
    print(item['name'], item['stock'])`,
        keywords: [['1', 'B', '5'], ['跳过', 'A']],
        explanation:
          '答案：只输出一行，内容是 B 5。\n思路：stock 为 0 的那条被 continue 跳过，不执行后面的 print。\n逐步演示：A 的 stock 是 0，命中条件直接进入下一轮；B 的 stock 是 5，打印 B 5。\n易错提醒：continue 只是跳过本轮，循环本身继续，不是 break 退出。',
        difficulty: 2,
      },
      {
        id: 's9-04-q4',
        qtype: 'debug',
        stem: '下面的抓取函数在接口返回 404 时，错误信息完全看不出问题出在哪。指出原因和改进方向。',
        code: `import requests

def fetch_page(page):
    r = requests.get('https://example.com/api/items', params={'page': page})
    return r.json()`,
        keywords: [['status_code', '200'], ['timeout'], ['r.text', '排查']],
        explanation:
          '答案：没检查 status_code，也没设 timeout；404 返回的是错误页，json() 解析失败只抛出含糊的 JSONDecodeError。\n思路：请求三步走——设超时、查状态码、再解析。\n逐步演示：加 timeout=10；r.status_code != 200 时抛出带页码和状态码的异常；排查时先 print(r.text[:200]) 看真实内容。\n易错提醒：把错误页当 JSON 解析，报错信息永远指向 json 模块，实际病根在请求。',
        difficulty: 3,
      },
      {
        id: 's9-04-q5',
        qtype: 'program',
        stem: '给定一段 JSON 文本，请筛出价格大于 10 的商品，先输出这些商品的个数，再逐个输出「名称 价格」。\n\nJSON：[{"name": "键盘", "price": 199}, {"name": "鼠标垫", "price": 9.9}, {"name": "显示器", "price": 899}]\n\n期望输出三行：超过十元的商品数 2 / 键盘 199 / 显示器 899',
        answer: '',
        testCases: [{ stdin: '', expected: '超过十元的商品数 2\n键盘 199\n显示器 899' }],
        explanation:
          '答案（参考答案）：\nimport json\nraw = \'[{"name": "键盘", "price": 199}, {"name": "鼠标垫", "price": 9.9}, {"name": "显示器", "price": 899}]\'\nitems = json.loads(raw)\nexpensive = [i for i in items if i["price"] > 10]\nprint("超过十元的商品数", len(expensive))\nfor item in expensive:\n    print(item["name"], item["price"])\n\n思路：先解析成列表，用列表推导式过滤，再输出数量与明细。\n逐步演示：199 和 899 都大于 10，9.9 被过滤，所以数量是 2，顺序保持原样。\n易错提醒：判断写成 price > "10" 是字符串比较，结果会不对；数字才能比大小。',
        difficulty: 3,
      },
    ],
    minutes: 32,
    env: 'local',
  },
  {
    id: 's9-05',
    stageId: 9,
    order: 5,
    title: '项目五：一周运营数据分析',
    subtitle: '把一串数字变成三句能说出口的结论',
    hook: '老板问「这周数据怎么样」。你手上有七天的数字，但直接报一串原始数据等于没回答。得先算几个指标，再看趋势，最后用一句人话说清好还是不好。',
    objectives: [
      '算出总量、均值、中位数、最高最低这五个基础指标',
      '说清均值和中位数什么时候会给出不同结论',
      '用环比公式算增长率，并解释正负号的含义',
      '用字符画出一条能贴进报告的趋势柱状图',
    ],
    analogy:
      '一堆数字像一筐刚捞上来的鱼，直接端上桌没人吃。分析就是挑出最大那条、算算平均多重、看看是不是一天比一天肥，最后说一句「这周鱼情不错」。指标是刀，结论才是菜。',
    terms: [
      { term: '均值', plain: '所有数加起来除以个数，就是平常说的平均。' },
      { term: '中位数', plain: '把数字从小到大排好，正中间那个；偶数个就取中间两个的平均。' },
      { term: '环比', plain: '这一期和上一期比，公式是（本期 - 上期）÷ 上期 × 100%。' },
      { term: '离群值', plain: '明显偏离其他数字的极端值，会把均值拉得看不出真实水平。' },
      { term: '统计描述', plain: '用几个指标概括一批数据的整体情况，不逐条看。' },
    ],
    content: `## 一、项目需求

手上是一周的每日访问量，目标是**产出三样东西：五个指标、一句趋势结论、一张字符图。**

| 档位 | 需求 | 说明 |
| --- | --- | --- |
| 必须做 | 算总量、均值、中位数、最高、最低 | 五个基础指标 |
| 必须做 | 算出环比增长率 | 和上一期对比，带正负号 |
| 必须做 | 用字符画出趋势柱状图 | 不依赖任何第三方库 |
| 必须做 | 输出一段话总结 | 人要能直接读、直接引用 |
| 可以后做 | 用 matplotlib 画正式图、按周汇总 | 第二版再说 |

## 二、功能拆解

| 功能 | 函数 | 输入 | 输出 |
| --- | --- | --- | --- |
| 统计描述 | describe | 数字列表 | 五个指标 |
| 环比 | growth | 本期数、上期数 | 百分比字符串 |
| 字符图 | bar_chart | 月份到数值的字典 | 屏幕上的柱状图 |
| 总结 | summary_text | 指标、结论 | 一段话 |

先用标准库 statistics 算指标，这个模块里 mean、median、mode 都是现成的，不用自己写循环。

## 三、开发思路

第一步，先看数据长什么样：多少条、有没有 0、有没有异常大的值。**0 特别值得警惕**，因为算增长率时它会在分母上。

第二步，先算均值和中位数两个都算。只报均值容易被极端值带偏——比如某天做了推广，访问量翻十倍，均值立刻好看，但日常水平没变，这时候中位数更接近真实情况。

第三步，算环比。公式是（本期 - 上期）÷ 上期 × 100%。上期为 0 时这个公式没有意义，要单独判断，输出「上期无数据」而不是让程序崩掉。

第四步，画字符图。最简单的办法是把数值除以一个基准值，得到几个井号重复几次。基准值取多少决定图的高度，取 10 时 120 就是 12 个井号。

第五步，写结论。结论要具体：「本周合计 1938，日均 161.5，周五最高 210」，比「数据表现良好」有用一百倍。

## 四、逐步实现

第一步，把数据装进列表。顺序按日期排好，这一步错了后面全错。

第二步，调 statistics.mean 和 statistics.median。注意 mean 对整数列表可能返回整数（正好整除时），round 之后显示成 161.5 这种形式更清楚。

第三步，用 max 和 min 拿极值。想同时知道是哪一天最高，就对字典用 max 加 key 参数。

第四步，写 growth 函数：先判断上期是不是 0，是就返回一句提示；不是就算百分比，正数前面加个加号，负数自带减号。

第五步，画图并打印。图的宽度要按最大值算，不然柱子会超出屏幕。

下面的例子先算指标，再画图，两段都能在浏览器里跑。

## 五、常见错误

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| ZeroDivisionError | 算环比时分母是 0 | 先判断上期是否为 0 |
| 均值高得离谱 | 有极端值，没看中位数 | 两个指标一起报 |
| 柱状图长到换行 | 基准值取太小 | 基准值按最大值的十分之一取 |
| 图表顺序乱 | 用字典却没指定顺序 | 按日期列表的顺序遍历 |
| round 之后原数据变了 | 以为 round 会改原值 | round 返回新值，原列表不变 |
| 结论和数据对不上 | 手写结论时抄错数字 | 结论里的数字全部由变量拼出来 |

## 六、最终成果

运行完屏幕上应该出现：天数、总计、平均、中位数、最高与最低，接着四行柱状图，每行是「月份 若干井号 数值」。参数换一批数据，图会跟着变。

数据量小时，字符图完全够用；要贴进正式报告再上 matplotlib，那是第八阶段讲过的事。

## 七、拓展挑战

第一个，加上标准差，说明数据波动大不大。

第二个，把七天的数据按周汇总，做周环比。

第三个，加一条基准线：低于日均值的日期打印一个向下箭头，一眼看出哪天拖了后腿。

第四个，把指标和结论写成一段 Markdown，直接粘进周报。`,
    examples: [
      {
        title: '五个基础指标一次算清',
        intro: '用 statistics 模块算总量、均值、中位数、最高最低。这十二个数字是某应用两周的日访问量。',
        code: `import statistics

visits = [120, 135, 128, 150, 142, 160, 175, 168, 155, 190, 210, 205]

print('天数', len(visits))
print('总计', sum(visits))
print('平均', round(statistics.mean(visits), 2))
print('中位数', statistics.median(visits))
print('最高', max(visits), '最低', min(visits))`,
        expectedOutput: `天数 12
总计 1938
平均 161.5
中位数 157.5
最高 210 最低 120`,
        lines: [
          { code: 'statistics.mean(visits)', explain: '总和除以个数。1938 ÷ 12 正好是 161.5，没有除不尽的尾巴。' },
          { code: 'statistics.median(visits)', explain: '排序后取中间；12 个是偶数，取第 6 个和第 7 个的平均。' },
          { code: 'round(..., 2)', explain: '保留两位小数，返回新值，原来的列表不受影响。' },
          { code: 'max(visits), min(visits)', explain: '内置函数直接取最大最小，不用自己写循环比较。' },
        ],
        trace: [
          { step: '排序后', state: '120, 128, 135, 142, 150, 155, 160, 168, 175, 190, 205, 210' },
          { step: '中位数', state: '第 6 个 155 与第 7 个 160，平均得 157.5' },
          { step: '均值对比', state: '均值 161.5 略高于中位数 157.5，说明后半段数值偏高，但没有极端离群值' },
        ],
        tryIt: '把最后一个数字 205 改成 2000，再跑一次。均值涨到多少？中位数变了吗？这就是离群值的影响。',
      },
      {
        title: '用井号画一条趋势柱状图',
        intro: '不装任何库也能把趋势画出来：数值除以基准值，得到要重复几个字符。贴进周报完全够看。',
        code: `data = {'一月': 120, '二月': 135, '三月': 128, '四月': 150}
base = 10

for month, value in data.items():
    bars = '#' * (value // base)
    print(month, bars, value)`,
        expectedOutput: `一月 ############ 120
二月 ############# 135
三月 ############ 128
四月 ############### 150`,
        lines: [
          { code: 'base = 10', explain: '基准值，决定一个井号代表多少。取 10 表示一个井号约等于 10 次访问。' },
          { code: '\"#\" * (value // base)', explain: '整除算出要几个井号，字符串乘整数就是重复拼接。150 // 10 得 15。' },
          { code: 'print(month, bars, value)', explain: '三样一起打印，中间自动加空格；后面附上真实数值，读图不会失真。' },
        ],
        trace: [
          { step: '一月', state: '120 // 10 = 12，画 12 个井号' },
          { step: '二月', state: '135 // 10 = 13，画 13 个井号' },
          { step: '三月', state: '128 // 10 = 12，和一月一样长，相差的 8 在图上体现不出来' },
          { step: '四月', state: '150 // 10 = 15，最长的一条' },
        ],
        tryIt: '把 base 改成 20，图会变短还是变长？如果某天数值是 5，会画出几个井号？',
      },
    ],
    compare: [
      {
        conceptA: '均值',
        conceptB: '中位数',
        diff: '均值被极端值拉动，反映总量摊平后的水平；中位数只看位置，抗干扰，反映典型水平。',
        example: '数据 1、2、3、4、100：均值 22，中位数 3，这时报中位数更诚实。',
      },
      {
        conceptA: '字符图',
        conceptB: 'matplotlib',
        diff: '字符图零依赖、能直接贴进纯文本报告、终端可看；matplotlib 能出正式图片，但需要安装库。',
        example: '日常自查用字符图，交付汇报用图片。',
      },
    ],
    pitfalls: [
      '算环比时上期为 0，直接除导致 ZeroDivisionError。',
      '只报均值，碰上有极端值的一天，结论完全失真。',
      '以为 round 会修改原列表，结果后续计算用了没四舍五入的数。',
      '柱状图基准值取太小，一行几十个井号把终端挤爆。',
      '手工在结论里抄数字，抄错一位就前后矛盾；正确做法是从变量拼字符串。',
    ],
    keyPoints: [
      '基础五指标：总量、均值、中位数、最高、最低，一起报才不容易被误导。',
      '环比公式（本期 - 上期）÷ 上期 × 100%，分母为 0 时必须单独处理。',
      '字符图靠整除和字符串乘整数实现，零依赖就能看趋势。',
      '结论里的数字全部由变量拼出，绝不手抄。',
      '分析的目标是一句能说出口的结论，指标只是中间产物。',
    ],
    sources: [
      { book: 'update', chapter: '综合实践', section: '项目五：一周运营数据分析' },
      { book: 'pcc3', chapter: '第 15 章', section: '生成数据' },
      { book: 'abs3', chapter: '第 17 章', section: '保持时间、计划任务和启动程序' },
    ],
    prerequisites: ['s8-08', 's8-09'],
    task: '记录自己连续七天的学习时长，用项目里的方法算出五个指标、算出末两天对前两天的环比，并画一张字符图，最后写三句话结论贴到笔记里。',
    exercises: [
      {
        id: 's9-05-q1',
        qtype: 'single',
        stem: '某组数据是 10、11、12、13、200。下面说法正确的是？',
        options: [
          'A. 均值 49.2，比中位数 12 更能代表典型水平',
          'B. 中位数 12 比均值 49.2 更能代表典型水平，因为 200 是离群值',
          'C. 这组数据没有中位数',
          'D. 最大值 200 应该直接删掉再算',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：均值把总和摊到每个样本上，一个极端值会把均值拉高；中位数只看位置，不受极端值影响。\n逐步演示：总和 246，除以 5 得 49.2；排序后中间那个是 12。日常水平显然是 12 附近。\n易错提醒：看到离群值不代表可以随手删，先查清它是不是真实数据，再决定怎么处理。',
        difficulty: 2,
      },
      {
        id: 's9-05-q2',
        qtype: 'blank',
        stem: '上一期是 120，本期是 150。环比增长率的计算式是：\n\nrate = (150 - 120) / ______ * 100',
        answer: '120',
        accepted: ['120', '上期', '上一期'],
        explanation:
          '答案：120，也就是上一期的数值。\n思路：环比的分母永远是上期，不是本期，也不是两者的平均。\n逐步演示：30 ÷ 120 = 0.25，乘 100 得 25.0，表示增长 25%。\n易错提醒：分母用成本期会算出 20%，那是另一个指标（占比），不是环比。',
        difficulty: 2,
      },
      {
        id: 's9-05-q3',
        qtype: 'predict',
        stem: '下面代码输出什么？注意 // 和 * 的作用。',
        code: `value = 47
base = 10
bars = '#' * (value // base)
print(bars, len(bars))`,
        keywords: [['####', '4'], ['47', '4']],
        explanation:
          '答案：输出 #### 4。\n思路：47 // 10 整除得 4，字符串乘 4 得到四个井号。\n逐步演示：47 除以 10 是 4.7，整除丢掉小数部分得 4，所以只有四个井号，第七个单位的零头被舍掉了。\n易错提醒：如果用 / 会得到 4.7，字符串没法乘小数，直接报错。',
        difficulty: 2,
      },
      {
        id: 's9-05-q4',
        qtype: 'debug',
        stem: '下面的环比函数在上一期为 0 时崩溃。指出原因并写出改法。',
        code: `def growth(current, previous):
    return (current - previous) / previous * 100

print(growth(150, 0))`,
        keywords: [['0', '分母'], ['判断'], ['ZeroDivisionError']],
        explanation:
          '答案：previous 为 0 时除零，抛 ZeroDivisionError。改法是先判断：如果 previous 为 0，返回 None 或一句提示。\n思路：分母为 0 的除法在任何语言里都不成立，必须在算之前拦住。\n逐步演示：加 if previous == 0: return None，调用方看到 None 就输出「上期无数据，无法计算环比」。\n易错提醒：把 0 偷偷改成 1 是错的，那会算出一个假的百分比，比报错更危险。',
        difficulty: 3,
      },
      {
        id: 's9-05-q5',
        qtype: 'program',
        stem: '给定五天的销售额：周一 120、周二 90、周三 150、周四 130、周五 200。请输出四行：\n总销售额\n平均（保留一位小数，用 round）\n中位数\n最高 星期几 数值\n\n期望输出：总销售额 690 / 平均 138 / 中位数 130 / 最高 周五 200',
        answer: '',
        testCases: [{ stdin: '', expected: '总销售额 690\n平均 138\n中位数 130\n最高 周五 200' }],
        explanation:
          '答案（参考答案）：\nimport statistics\nsales = {"周一": 120, "周二": 90, "周三": 150, "周四": 130, "周五": 200}\nvalues = list(sales.values())\nprint("总销售额", sum(values))\nprint("平均", round(statistics.mean(values), 1))\nprint("中位数", statistics.median(values))\nbest = max(sales, key=lambda day: sales[day])\nprint("最高", best, sales[best])\n\n思路：先把字典的值取成列表给 statistics 用；找最高那一天要对字典用 max 加 key，这样返回的是键（星期几）而不是数值。\n逐步演示：总和 690，均值 138.0（round 后仍是 138），排序后中间是 130，最大 200 对应周五。\n易错提醒：max(values) 只返回 200，不知道是哪一天；必须 max(sales, key=...) 才能拿到星期名。',
        difficulty: 3,
      },
    ],
    minutes: 30,
    env: 'browser',
  },
  {
    id: 's9-06',
    stageId: 9,
    order: 6,
    title: '项目六：任务管理程序',
    subtitle: '用一个类把待办清单从头管到尾',
    hook: '待办散在便签、聊天记录和脑子里，永远漏掉最要紧那件。写个自己的任务管理器：加任务、标完成、按优先级排序、生成周报。',
    objectives: [
      '用类把「任务数据」和「操作任务的方法」装在一起',
      '实现添加、完成、筛选待办、按优先级排序四个方法',
      '说清 sorted 返回新列表、不修改原列表这一点带来的影响',
      '把任务列表序列化为 JSON 文本，并原样恢复',
    ],
    analogy:
      '类像一个带抽屉的收纳盒，任务清单放在盒子里，取任务、标完成、排序这些动作也都长在盒子上。走的时候拎起盒子就走，不用满地找零件。',
    terms: [
      { term: '类', plain: '自己定义的一种数据类型，把数据和处理数据的方法打包在一起。' },
      { term: '实例', plain: '按类造出来的具体对象，一个实例就是一份独立的任务清单。' },
      { term: '方法', plain: '写在类里面的函数，第一个参数固定是 self，代表这个实例自己。' },
      { term: '序列化', plain: '把内存里的对象变成一段可保存的文本，json.dumps 干的就是这事。' },
      { term: '反序列化', plain: '把文本还原成对象，对应 json.loads。' },
    ],
    content: `## 一、项目需求

目标：**做一个能长期用的任务管理器，功能不多但每一条都扎实。**

| 档位 | 需求 | 说明 |
| --- | --- | --- |
| 必须做 | 添加任务，带标题和优先级 | 优先级 1 最急，3 最不急 |
| 必须做 | 把某个任务标记完成 | 找不到要给出提示，不能静默失败 |
| 必须做 | 列出还没完成的任务 | 按优先级从急到缓排 |
| 必须做 | 打印全部任务的状态报表 | 一行一条，带 done 或 todo |
| 必须做 | 保存成 JSON 文本并读回 | 关掉程序数据不丢 |
| 可以后做 | 截止日期、命令行参数、多清单切换 | 第二版再说 |

## 二、功能拆解

这个项目换一种组织方式：不写一堆散函数，而是定义一个 TaskManager 类。

| 方法 | 作用 | 输入 | 输出 |
| --- | --- | --- | --- |
| add | 加一条任务 | 标题、优先级 | 新任务字典 |
| finish | 标记完成 | 标题 | 成功与否 |
| pending | 取未完成任务 | 无 | 排好序的列表 |
| report | 打印报表 | 无 | 屏幕输出 |
| to_json | 转成 JSON 文本 | 无 | 字符串 |

判断标准很简单：**换一种组织方式能让「数据 + 操作」不再分家，就用类。** 如果只是几个互不相干的计算，用函数更轻。

## 三、开发思路

第一步，先定一条任务长什么样。四个字段：标题、优先级、是否完成，加上可选的创建时间。用字典最灵活，以后加字段不用改结构。

第二步，把列表放进构造函数。__init__ 里 self.tasks = []，每个实例都有自己独立的一份清单，互不干扰。

第三步，逐个加方法。add 只管追加，finish 负责查找并改状态，pending 负责筛选和排序。**每个方法只做一件事**，这样出问题时定位特别快。

第四步，排序放在读取时做，不改变 self.tasks 的顺序。sorted 返回的是新列表，原列表保持添加顺序，这样报表和待办可以各用各的排序规则。

第五步，加序列化。to_json 用 json.dumps 加 ensure_ascii=False，中文才不会被转成密密麻麻的编码；读回时用 json.loads，再逐条塞回列表。

## 四、逐步实现

第一步，写 __init__，只做一件事：建空列表。

第二步，写 add：把三个参数装成字典，append 进去，把新任务返回出去方便调用方检查。

第三步，写 finish：遍历列表找标题相同的，找到就把 done 改成 True 并 return True；循环结束还没找到就 return False。**别用 for-else 之外的隐式写法，显式返回最清楚。**

第四步，写 pending：列表推导式筛出未完成的，sorted 按优先级排，返回新列表。

第五步，写 report：遍历全部任务，按优先级排序后逐条打印，完成的和未完成的用不同标记。

第六步，写 to_json 和 from_json，把整个清单存取一遍，测试一次「存了再读」，确认条数和内容都对。

下面的例子先跑通类的基本操作，再看序列化。

## 五、常见错误

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 改了一个实例，另一个也变了 | 列表定义在类里而不是 __init__ 里，被所有实例共享 | 把 self.tasks 放进 __init__ |
| 调用方法报缺参数 | 忘了 self | 定义时第一个参数写 self，调用时不传 |
| 排序后原列表也变了 | 用了 list.sort 而不是 sorted | sorted 返回新列表，sort 原地改 |
| 保存的中文变乱码 | json.dumps 默认转义非 ASCII | 加 ensure_ascii=False |
| finish 找不到任务也不报错 | 没处理找不到的分支 | 返回 False，调用方给提示 |
| 优先级比较结果怪 | 优先级存成了字符串 | 存数字，'10' 和 '9' 比较会出错 |

## 六、最终成果

跑完能看到待办数量和一张按优先级排好的报表。再加一次保存与读取，把 JSON 文本打印出来，你会发现整个清单就是一行字符串——这就是程序关掉之后数据还能回来的原因。

这个项目把第七阶段的类、第八阶段的 json、第四阶段的排序全用上了，是整门课的收尾。

## 七、拓展挑战

第一个，加截止日期字段，让 pending 先按日期排、再按优先级排。

第二个，加删除和修改方法，把增删改查补全。

第三个，把数据存进 SQLite，支持多个清单（工作、生活分开）。

第四个，做成命令行工具：python task.py add 「写周报」 1，直接在终端操作。`,
    examples: [
      {
        title: '一个类管住整份清单',
        intro: '添加、完成、筛选、报表四个方法一次看全。注意每个方法都带 self，self.tasks 是每个实例自己的清单。',
        code: `class TaskManager:
    def __init__(self):
        self.tasks = []

    def add(self, title, priority=2):
        task = {'title': title, 'priority': priority, 'done': False}
        self.tasks.append(task)
        return task

    def finish(self, title):
        for task in self.tasks:
            if task['title'] == title:
                task['done'] = True
                return True
        return False

    def pending(self):
        return [t for t in self.tasks if not t['done']]

    def report(self):
        for task in sorted(self.tasks, key=lambda t: t['priority']):
            mark = 'done' if task['done'] else 'todo'
            print(task['priority'], task['title'], mark)


manager = TaskManager()
manager.add('交周报', 1)
manager.add('买牛奶', 3)
manager.add('复习第七章', 2)
manager.finish('买牛奶')

print('待办', len(manager.pending()))
manager.report()`,
        expectedOutput: `待办 2
1 交周报 todo
2 复习第七章 todo
3 买牛奶 done`,
        lines: [
          { code: 'def __init__(self):', explain: '构造函数，造实例时自动执行；在这里建空列表，保证每个实例一份独立清单。' },
          { code: 'self.tasks.append(task)', explain: '往自己的清单里追加，不需要 return 也能改到实例的状态。' },
          { code: 'for task in self.tasks: ... return False', explain: '找到就立刻 return True 结束；整个循环跑完还没找到，才执行最后的 return False。' },
          { code: '[t for t in self.tasks if not t[\"done\"]]', explain: '列表推导式筛选未完成任务，返回新列表，不改动 self.tasks。' },
          { code: 'sorted(self.tasks, key=lambda t: t[\"priority\"])', explain: '按优先级升序排，数字小的（更急）排在前面；原列表顺序不变。' },
        ],
        trace: [
          { step: 'manager = TaskManager()', state: '建出一个实例，self.tasks 是空列表' },
          { step: '三次 add', state: '清单里依次有 交周报(1)、买牛奶(3)、复习第七章(2)' },
          { step: 'finish("买牛奶")', state: '遍历到第二条匹配，done 变 True，返回 True' },
          { step: 'pending()', state: '筛出 交周报 和 复习第七章，得到 2' },
          { step: 'report()', state: '按优先级排序后依次打印 1、2、3 三条' },
        ],
        tryIt: '把 finish("买牛奶") 改成 finish("买咖啡")，返回值会是什么？报表里会多出什么变化？',
      },
      {
        title: '存成 JSON 文本，再原样读回来',
        intro: '程序关掉数据就没了，所以要把清单转成文本。ensure_ascii=False 是让中文保持人眼可读的关键。',
        code: `import json

tasks = [
    {'title': '交周报', 'priority': 1, 'done': False},
    {'title': '买牛奶', 'priority': 3, 'done': True},
]

text = json.dumps(tasks, ensure_ascii=False)
print(text)
print('字符数', len(text))

back = json.loads(text)
print('恢复后条数', len(back))
print('第一条标题', back[0]['title'])`,
        expectedOutput: `[{"title": "交周报", "priority": 1, "done": false}, {"title": "买牛奶", "priority": 3, "done": true}]
字符数 95
恢复后条数 2
第一条标题 交周报`,
        lines: [
          { code: 'json.dumps(tasks, ensure_ascii=False)', explain: '字典列表直接转成 JSON 文本；ensure_ascii=False 保留中文原样。' },
          { code: 'json.loads(text)', explain: '文本变回 Python 的列表套字典，结构完全一致。' },
          { code: 'back[0][\"title\"]', explain: '恢复后就是普通列表字典，取值方式和原来一样。' },
        ],
        trace: [
          { step: 'dumps 阶段', state: 'Python 的 True 会写成 JSON 的 true，小写' },
          { step: '字符数', state: '整段文本 95 个字符（含空格和标点）' },
          { step: 'loads 阶段', state: 'true 又变回 Python 的 True，可以继续 if task["done"] 判断' },
        ],
        tryIt: '把 ensure_ascii 去掉（默认是 True），再打印一次，看看中文变成了什么样子。',
      },
    ],
    compare: [
      {
        conceptA: 'list.sort()',
        conceptB: 'sorted(list)',
        diff: 'sort 在原来的列表上直接改，返回 None；sorted 返回一个新列表，原列表不动。',
        example: 'tasks.sort(key=...) 改了原顺序；sorted(tasks, key=...) 只影响返回值。',
      },
      {
        conceptA: '类方法操作 self',
        conceptB: '函数接收列表参数',
        diff: '方法把数据藏在实例里，调用时不用反复传清单；函数每次都显式传列表，更轻但参数多。',
        example: 'manager.add("写周报", 1) 对 add(records, "写周报", 1)',
      },
    ],
    pitfalls: [
      '把 self.tasks = [] 写在类体里（方法外），所有实例共用同一个列表。',
      '定义方法时漏了 self，调用时报参数数量不对。',
      '想靠 tasks.sort() 拿到排序结果，结果拿到的是 None。',
      'json.dumps 不加 ensure_ascii=False，中文全变成编码，人没法读也没法改。',
      '优先级存成字符串，排序时 10 排在 9 前面。',
    ],
    keyPoints: [
      '类把数据和方法装在一起，实例之间互不干扰，关键在 __init__ 里初始化。',
      '一个方法只做一件事：add 只管加，finish 只管改状态，pending 只管筛。',
      'sorted 返回新列表，原列表保持添加顺序，两份排序可以共存。',
      '序列化用 json.dumps 加 ensure_ascii=False，中文保持可读。',
      '找不到任务要显式返回 False，静默失败会让 bug 藏很久。',
    ],
    sources: [
      { book: 'update', chapter: '综合实践', section: '项目六：任务管理程序' },
      { book: 'pcc3', chapter: '第 9 章', section: '类', note: '类与实例、方法' },
      { book: 'abs3', chapter: '第 16 章', section: '读写 JSON' },
    ],
    prerequisites: ['s7-03', 's7-05', 's6-04'],
    task: '把任务管理器改成能存到文件里的版本：启动时读 tasks.json，退出时写回去；再加一个「删除已完成任务」的方法，连续增删三轮后确认文件内容与屏幕报表一致。',
    exercises: [
      {
        id: 's9-06-q1',
        qtype: 'single',
        stem: '为什么 self.tasks = [] 必须写在 __init__ 里面，不能写在类体里？',
        options: [
          'A. 写在类体里语法错误，程序跑不起来',
          'B. 写在类体里会成为所有实例共享的一份列表，改一个实例会连累其他实例',
          'C. 写在类体里的列表不能被 append',
          'D. 写在类体里就没办法用 len 统计',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：类体里的赋值只执行一次，属于类本身的属性；__init__ 里用 self 赋值，每个实例各有一份。\n逐步演示：类体写法下，manager_a.tasks 和 manager_b.tasks 指向同一个列表，a 加一条任务，b 里也会看到。\n易错提醒：语法上行得通，程序不报错，所以这个 bug 特别隐蔽，只能靠观察现象发现。',
        difficulty: 2,
      },
      {
        id: 's9-06-q2',
        qtype: 'blank',
        stem: '要按优先级从小到大排一份任务列表，又不想改动原列表的顺序，应该用哪个内置函数？\n\nordered = ______(tasks, key=lambda t: t["priority"])',
        answer: 'sorted',
        accepted: ['sorted', 'SORTED'],
        explanation:
          '答案：sorted。\n思路：sorted 返回排好序的新列表，原列表保持原样；列表自身的 sort 方法才是原地修改。\n逐步演示：tasks 顺序是 3、1、2，sorted 后返回 1、2、3，而 tasks 本身还是 3、1、2。\n易错提醒：写成 sort 会返回 None，赋值给 ordered 就得到 None，后面用就报错。',
        difficulty: 2,
      },
      {
        id: 's9-06-q3',
        qtype: 'predict',
        stem: '用下面这段代码，只打印未完成任务的标题，输出是什么？',
        code: `tasks = [
    {'title': '交周报', 'priority': 1, 'done': False},
    {'title': '买牛奶', 'priority': 3, 'done': True},
    {'title': '复习第七章', 'priority': 2, 'done': False},
]
for task in sorted(tasks, key=lambda t: t['priority']):
    if task['done']:
        continue
    print(task['title'])`,
        keywords: [['交周报'], ['复习第七章']],
        explanation:
          '答案：先交周报，再复习第七章，共两行。\n思路：先按优先级排序（1、2、3），再跳过已完成的那条。\n逐步演示：排序后顺序是 交周报(1)、复习第七章(2)、买牛奶(3)；前两条 done 为 False 被打印，第三条被 continue 跳过。\n易错提醒：如果遍历的是原列表而不是排序结果，顺序会变成 交周报、复习第七章 之外的另一种排法，这里恰好相同，换数据就会不同。',
        difficulty: 2,
      },
      {
        id: 's9-06-q4',
        qtype: 'debug',
        stem: '下面的代码想让任务清单按优先级排好，但打印出来顺序没变。指出原因和改法。',
        code: `tasks = [
    {'title': 'A', 'priority': 3},
    {'title': 'B', 'priority': 1},
    {'title': 'C', 'priority': 2},
]
tasks = tasks.sort(key=lambda t: t['priority'])
for task in tasks:
    print(task['title'])`,
        keywords: [['sort', 'None'], ['sorted'], ['返回值']],
        explanation:
          '答案：sort 是原地排序，返回值是 None，赋回去之后 tasks 变成 None，遍历就报 TypeError。改成 tasks = sorted(tasks, key=...) 或直接 tasks.sort(...) 不赋值。\n思路：区分「原地修改、返回 None」和「返回新对象」两类方法。\n逐步演示：正确写法一是 tasks.sort(key=...) 然后直接遍历；写法二是 ordered = sorted(tasks, key=...) 遍历 ordered。\n易错提醒：同类的坑还有 list.append 返回 None、dict.update 返回 None，看到方法返回 None 就别接。',
        difficulty: 3,
      },
      {
        id: 's9-06-q5',
        qtype: 'program',
        stem: '用类实现一个任务清单：能添加任务（标题、优先级）、标记完成、取未完成任务并按优先级排序。\n\n依次执行：add 写周报 2、add 修 bug 1、add 买咖啡 3、finish 买咖啡；然后先输出待办数量，再按优先级逐个输出待办标题。\n\n期望输出三行：待办 2 / 修 bug / 写周报',
        answer: '',
        testCases: [{ stdin: '', expected: '待办 2\n修 bug\n写周报' }],
        explanation:
          '答案（参考答案）：\nclass TaskList:\n    def __init__(self):\n        self.tasks = []\n    def add(self, title, priority):\n        self.tasks.append({"title": title, "priority": priority, "done": False})\n    def finish(self, title):\n        for task in self.tasks:\n            if task["title"] == title:\n                task["done"] = True\n    def pending_titles(self):\n        left = [t for t in self.tasks if not t["done"]]\n        return [t["title"] for t in sorted(left, key=lambda t: t["priority"])]\n\n思路：先用列表推导式筛未完成，再 sorted 排优先级，最后把标题抽出来。\n逐步演示：买咖啡完成后被筛掉；剩下 写周报(2) 和 修 bug(1)，排序后 修 bug 在前。\n易错提醒：直接对 self.tasks 排序会打乱原顺序，报表和待办就没法各用各的排序了。',
        difficulty: 3,
      },
    ],
    minutes: 32,
    env: 'browser',
  },
]

