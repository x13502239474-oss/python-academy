import type { Lesson } from '../../types'

export const stage2Lessons: Lesson[] = [
  {
    id: 's2-01',
    stageId: 2,
    order: 1,
    title: '变量：贴标签的储物盒',
    subtitle: '给数据起个名字',
    hook: '想象你有一堆储物盒，每个盒子上贴着标签。你想放东西进去、想找东西出来，只要看标签就行——变量就是这样的盒子。',
    objectives: ['用自己的话说出变量是什么', '会定义变量并赋值', '理解变量的值可以被覆盖'],
    analogy: '变量 = 一个贴了标签的盒子。标签是变量名（比如 name），盒子里装的东西是值（比如 "Mike"）。你随时可以把盒子里的东西换成别的。',
    content: `# 变量是什么

**变量 = 装数据的盒子 + 盒子上的标签。**

定义变量非常简单，用 \`=\` 号：

\`\`\`python
name = "Mike"
age = 15
\`\`\`

这里发生了两件事：
1. 创建一个叫 \`name\` 的盒子，把文字 \`"Mike"\` 放进去
2. 创建一个叫 \`age\` 的盒子，把数字 \`15\` 放进去

注意 \`=\` 在这里**不是"等于"**，而是"把右边的值装进左边的盒子"，叫**赋值**。

## 变量的值可以改

\`\`\`python
score = 80
print(score)   # 80
score = 90     # 换成新值
print(score)   # 90
\`\`\`

后面的赋值会覆盖前面的，盒子里的东西被换掉了。

## 变量命名的规矩

- 只能用字母、数字、下划线，且不能以数字开头
- 区分大小写：\`Name\` 和 \`name\` 是两个不同的盒子
- 起有意义的名字：\`age\` 比 \`a\` 好，\`total_price\` 比 \`tp\` 好`,
    examples: [
      {
        title: '个人信息小卡片',
        code: 'name = "Mike"\ncity = "深圳"\nhobby = "编程"\n\nprint("姓名：", name)\nprint("城市：", city)\nprint("爱好：", hobby)',
        expectedOutput: '姓名： Mike\n城市： 深圳\n爱好： 编程',
        lines: [
          { code: 'name = "Mike"', explain: '创建变量 name，把字符串 "Mike" 装进去。文字要加英文引号。' },
          { code: 'print("姓名：", name)', explain: '输出文字和变量的值。注意变量 name 没有引号——有引号就变成纯文字了。' },
        ],
      },
    ],
    visual: {
      kind: 'variable',
      title: '变量盒子的变化过程',
      description: '看每一步执行后，各个"盒子"里装了什么。',
      variables: [{ name: 'name', value: '"Mike"' }, { name: 'age', value: '15' }],
      steps: [
        { label: '第 1 步', detail: 'name = "Mike"', state: [{ name: 'name', value: '"Mike"' }, { name: 'age', value: '（空）' }] },
        { label: '第 2 步', detail: 'age = 15', state: [{ name: 'name', value: '"Mike"' }, { name: 'age', value: '15' }] },
        { label: '第 3 步', detail: 'age = 16（过了一年）', state: [{ name: 'name', value: '"Mike"' }, { name: 'age', value: '16' }] },
      ],
    },
    compare: [
      { conceptA: '变量 name', conceptB: '字符串 "name"', diff: '变量不加引号，代表盒子里的值；加引号就是一段普通文字。', example: 'print(name) 输出盒子里的内容；print("name") 只输出 name 这四个字母。' },
    ],
    pitfalls: ['把 = 理解成数学的"等于"——它是"赋值"，把右边装进左边。', '用数字开头命名变量，如 2name，会报错。'],
    sources: [{ book: 'pcc3', chapter: '第2章 2.2节' }, { book: 'abs3', chapter: '第1章 1.4节' }],
    prerequisites: ['s1-05', 's1-06'],
    task: '创建 3 个变量记录你的一件物品（名称、颜色、数量），然后用 print 输出一句话介绍它。',
    exercises: [
      { id: 's2-01-q1', qtype: 'blank', stem: '在 Python 中，把值 10 装进变量 x 的写法是：x ______ 10', answer: '=', explanation: '赋值用等号 =，含义是"把右边的值装进左边的变量"。', difficulty: 1 },
      { id: 's2-01-q2', qtype: 'predict', stem: '执行 x = 1；x = 2；print(x) 后输出什么？', keywords: [['2']], explanation: '后一次赋值覆盖前一次，所以输出 2。', difficulty: 1 },
      { id: 's2-01-q3', qtype: 'single', stem: '下面哪个变量名是合法的？', options: ['A. 2name', 'B. my-name', 'C. my_name', 'D. my name'], answer: 'C', explanation: '变量名只能用字母数字下划线，且不能以数字开头，不能含空格或连字符。', difficulty: 2 },
    ],
    minutes: 9,
    env: 'browser',
  },
  {
    id: 's2-02',
    stageId: 2,
    order: 2,
    title: '字符串：文字的魔法',
    subtitle: '处理文本的基本功',
    hook: '"你好"、一句话、一整篇文章——在 Python 里这些都叫字符串。玩转它，你就能自动处理大量文字。',
    objectives: ['会创建和拼接字符串', '掌握常用字符串方法', '理解转义字符和 f-string'],
    analogy: '字符串就像一串珍珠项链，每个字符是一颗珠子。你可以数有几颗、截取一段、把两段接起来。',
    content: `# 字符串常用操作

字符串就是用引号包起来的一段文字，单引号双引号都行：\`'你好'\` 或 \`"你好"\`。

## 拼接与重复

\`\`\`python
first = "Hello"
last = "World"
print(first + " " + last)   # Hello World
print("哈" * 3)             # 哈哈哈
\`\`\`

## 常用方法（方法就是"字符串能做的事"）

\`\`\`python
s = "  hello  "
print(len(s))          # 长度 9（含空格）
print(s.strip())       # 去掉两端空格 → "hello"
print(s.upper())       # 全大写 → "  HELLO  "
print("a,b,c".split(","))  # 按逗号切开 → ['a', 'b', 'c']
\`\`\`

## f-string：最舒服的拼接方式

在字符串前加 \`f\`，就能直接用 \`{}\` 插入变量：

\`\`\`python
name = "Mike"
age = 15
print(f"我叫{name}，今年{age}岁")
# 我叫Mike，今年15岁
\`\`\`

这比用一堆加号拼接清楚多了，强烈推荐。

## 换行与转义

\`\\n\` 表示换行，\`\\t\` 表示制表符（Tab）：

\`\`\`python
print("第一行\\n第二行")
\`\`\``,
    examples: [
      {
        title: '生成一张个性化名片',
        code: 'name = "Mike"\ntitle = "Python 学习者"\ncity = "深圳"\n\ncard = f"姓名：{name}\\n职位：{title}\\n城市：{city}"\nprint(card)',
        expectedOutput: '姓名：Mike\n职位：Python 学习者\n城市：深圳',
        lines: [
          { code: 'card = f"...{name}..."', explain: 'f-string 里 {name} 会被替换成变量的值，\\n 会变成换行。' },
        ],
      },
    ],
    sources: [{ book: 'pcc3', chapter: '第2章 2.3节' }, { book: 'abs3', chapter: '第8章 字符串与文本编辑' }],
    prerequisites: ['s2-01'],
    exercises: [
      { id: 's2-02-q1', qtype: 'predict', stem: 'print("ab" * 3) 的输出是？', keywords: [['ababab']], explanation: '字符串乘以整数表示重复，ab 重复 3 次得到 ababab。', difficulty: 1 },
      { id: 's2-02-q2', qtype: 'single', stem: '想输出"我叫Mike"（Mike 是变量 name 的值），最推荐哪种写法？', options: ['A. "我叫" + name', 'B. f"我叫{name}"', 'C. print(name)', 'D. "我叫 name"'], answer: 'B', explanation: 'f-string 清晰易读，是格式化字符串最推荐的方式。', difficulty: 2 },
    ],
    minutes: 10,
    env: 'browser',
  },
  {
    id: 's2-03',
    stageId: 2,
    order: 3,
    title: '整数、浮点数与数字运算',
    subtitle: '让电脑帮你算账',
    hook: 'Python 是个超级计算器，加减乘除样样行，而且永远不会算错。',
    objectives: ['区分整数和浮点数', '掌握基本运算符', '理解整除、取余、幂运算'],
    content: `# 数字与运算

Python 里有两类常见的数字：

- **整数 int**：没有小数点，如 \`10\`、\`-5\`、\`2026\`
- **浮点数 float**：带小数点，如 \`3.14\`、\`0.5\`、\`2.0\`

## 基本运算

\`\`\`python
print(3 + 2)   # 加 → 5
print(3 - 2)   # 减 → 1
print(3 * 2)   # 乘 → 6
print(3 / 2)   # 除 → 1.5（结果总是浮点数）
\`\`\`

## 三个特别的运算符

\`\`\`python
print(7 // 2)   # 整除 → 3（只要整数部分）
print(7 % 2)    # 取余 → 1（除完剩下的）
print(2 ** 3)   # 幂 → 8（2的3次方）
\`\`\`

**取余 \% 特别有用**：判断一个数是不是偶数，看它除以 2 的余数是不是 0。

## 运算顺序

和数学一样：先乘除后加减，括号优先。

\`\`\`python
print((1 + 2) * 3)   # 9
\`\`\``,
    examples: [
      {
        title: '购物结账小程序',
        code: 'apple = 3   # 单价 3 元\nbanana = 2  # 单价 2 元\ncount_apple = 5\ncount_banana = 4\n\ntotal = apple * count_apple + banana * count_banana\nprint(f"总价：{total} 元")\nprint(f"平均每样：{total / 2:.2f} 元")',
        expectedOutput: '总价：23 元\n平均每样：11.50 元',
        lines: [
          { code: 'total = apple * count_apple + ...', explain: '先算乘法再算加法，和数学运算顺序一致。' },
          { code: '{total / 2:.2f}', explain: ':.2f 表示保留两位小数，这是 f-string 的格式控制。' },
        ],
      },
    ],
    visual: {
      kind: 'variable',
      title: '算式一步步算',
      description: '观察运算过程中每个变量的值。',
      steps: [
        { label: '第 1 步', detail: 'apple = 3, count_apple = 5', state: [{ name: 'apple', value: '3' }, { name: 'count_apple', value: '5' }] },
        { label: '第 2 步', detail: 'apple * count_apple = 15', state: [{ name: '小计', value: '15' }] },
        { label: '第 3 步', detail: 'banana * count_banana = 8', state: [{ name: '小计2', value: '8' }] },
        { label: '第 4 步', detail: '15 + 8 = 23', state: [{ name: 'total', value: '23' }] },
      ],
    },
    sources: [{ book: 'pcc3', chapter: '第2章 2.4节' }, { book: 'abs3', chapter: '第1章 1.2节' }],
    prerequisites: ['s2-01'],
    exercises: [
      { id: 's2-03-q1', qtype: 'blank', stem: '7 除以 2 的余数用表达式写作 7 ______ 2，结果是 1。', answer: '%', accepted: ['取余', 'mod'], explanation: '% 是取余运算符，7 % 2 = 1。', difficulty: 1 },
      { id: 's2-03-q2', qtype: 'predict', stem: 'print(7 // 2) 输出什么？', keywords: [['3']], explanation: '// 是整除，只保留整数部分，7 // 2 = 3。', difficulty: 2 },
    ],
    minutes: 8,
    env: 'browser',
  },
  {
    id: 's2-04',
    stageId: 2,
    order: 4,
    title: '布尔值与比较',
    subtitle: '程序的"是"与"否"',
    hook: '程序做决定靠的是"对还是错"。Python 里，对错是一种专门的值——布尔值。',
    objectives: ['理解布尔值 True/False', '掌握比较运算符', '会用布尔值表达判断'],
    analogy: '布尔值就像电灯开关，只有"开"和"关"两种状态，对应 True（真）和 False（假）。没有中间态。',
    content: `# 布尔值 True / False

布尔值只有两个：**True（真）** 和 **False（假）**。注意首字母大写。

\`\`\`python
print(3 > 2)   # True
print(3 < 2)   # False
\`\`\`

## 比较运算符

| 符号 | 含义 | 例子 | 结果 |
|---|---|---|---|
| == | 等于 | 3 == 3 | True |
| != | 不等于 | 3 != 4 | True |
| > | 大于 | 5 > 3 | True |
| < | 小于 | 5 < 3 | False |
| >= | 大于等于 | 5 >= 5 | True |
| <= | 小于等于 | 5 <= 4 | False |

## 一个超级重要的坑

**\`=\` 和 \`==\` 完全不同！**

- \`=\` 是赋值：把值装进变量
- \`==\` 是比较：问"两边相等吗"，答案是 True 或 False

\`\`\`python
x = 5        # 赋值
print(x == 5)  # 比较 → True
\`\`\`

布尔值是下一阶段 if 判断的基础，一定要理解透。`,
    examples: [
      {
        title: '检查成绩是否及格',
        code: 'score = 72\nprint(f"成绩：{score}")\nprint("是否及格：", score >= 60)\nprint("是否优秀：", score >= 90)\nprint("满分吗：", score == 100)',
        expectedOutput: '成绩：72\n是否及格： True\n是否优秀： False\n满分吗： False',
        lines: [
          { code: 'score >= 60', explain: '这是一个比较，结果是 True 或 False，而不是一个数字。' },
        ],
      },
    ],
    compare: [
      { conceptA: '= ', conceptB: '==', diff: '= 是赋值（把右边装进左边）；== 是比较（判断两边是否相等，返回 True/False）。', example: 'x = 5 让 x 变成 5；x == 5 问"x 是 5 吗"。' },
    ],
    sources: [{ book: 'pcc3', chapter: '第5章 5.2节' }, { book: 'abs3', chapter: '第2章 2.1-2.2节' }],
    prerequisites: ['s2-01', 's2-03'],
    exercises: [
      { id: 's2-04-q1', qtype: 'single', stem: '表达式 5 == 5 的结果是？', options: ['A. 5', 'B. True', 'C. False', 'D. 报错'], answer: 'B', explanation: '== 比较两个值是否相等，5 等于 5，所以结果是布尔值 True。', difficulty: 1 },
      { id: 's2-04-q2', qtype: 'predict', stem: 'print(10 != 10) 输出什么？', keywords: [['False']], explanation: '!= 表示不等于，10 并不不等于 10，所以是 False。', difficulty: 2 },
    ],
    minutes: 7,
    env: 'browser',
  },
  {
    id: 's2-05',
    stageId: 2,
    order: 5,
    title: '数据类型转换',
    subtitle: '让不同类型互相变身',
    hook: '用户输入的年龄是文字 "15"，可你要拿它算数——这时候就得让数据"变个身"。',
    objectives: ['掌握 int()/float()/str() 转换', '知道什么时候必须转换', '避免类型转换的常见错误'],
    content: `# 类型转换

Python 提供了三个常用的"转换器"：

\`\`\`python
int("15")     # 字符串 → 整数 15
float("3.14") # 字符串 → 浮点数 3.14
str(15)       # 整数 → 字符串 "15"
\`\`\`

## 为什么需要转换

input() 接收的用户输入**永远是字符串**。想拿它算数，必须先转成数字：

\`\`\`python
age = input("请输入年龄：")   # 得到的是字符串
# print(age + 1)             # 报错！文字不能加数字
age = int(age)                # 转成整数
print(age + 1)                # 正常
\`\`\`

## 字符串和数字的拼接

\`\`\`python
# print("年龄：" + 15)      # 报错
print("年龄：" + str(15))   # 正确：先转成字符串
# 或者用 f-string，最省事：
print(f"年龄：{15}")
\`\`\`

## 转换失败的坑

\`int("abc")\` 会报错，因为 "abc" 转不成数字。转换前要确保内容合法。`,
    examples: [
      {
        title: '一个简易加法器',
        code: 'a = "10"\nb = "20"\nprint("字符串相加：", a + b)       # 拼接成 1020\nprint("转为数字相加：", int(a) + int(b))  # 30',
        expectedOutput: '字符串相加： 1020\n转为数字相加： 30',
        lines: [
          { code: 'a + b', explain: '两个字符串相加是拼接，得到 "1020"。' },
          { code: 'int(a) + int(b)', explain: '先转成整数再相加，得到数字 30。' },
        ],
      },
    ],
    sources: [{ book: 'pcc3', chapter: '第2章 2.4节' }, { book: 'abs3', chapter: '第1章 1.6.6节' }],
    prerequisites: ['s2-01', 's2-02', 's2-03'],
    exercises: [
      { id: 's2-05-q1', qtype: 'predict', stem: 'int("3") + int("4") 的结果是？', keywords: [['7']], explanation: '两个字符串先转成整数 3 和 4，相加得到 7。', difficulty: 1 },
      { id: 's2-05-q2', qtype: 'single', stem: 'input() 函数接收到的用户输入，默认是什么类型？', options: ['A. 整数', 'B. 浮点数', 'C. 字符串', 'D. 布尔值'], answer: 'C', explanation: 'input() 永远返回字符串，需要数字时必须用 int() 或 float() 转换。', difficulty: 2 },
    ],
    minutes: 8,
    env: 'browser',
  },
  {
    id: 's2-06',
    stageId: 2,
    order: 6,
    title: '列表：装一串数据的盒子',
    subtitle: '一次管理很多东西',
    hook: '如果变量是单个盒子，列表就是一个"多格储物柜"——一个名字下面能装一大串东西。',
    objectives: ['会创建列表', '掌握索引访问元素', '会增删改列表元素'],
    analogy: '列表像一排带编号的储物柜。编号从 0 开始（程序员习惯从 0 数），你说几号，我就给你几号柜子里的东西。',
    content: `# 列表 list

列表用方括号 \`[]\` 创建，里面放一串数据：

\`\`\`python
fruits = ["苹果", "香蕉", "橘子"]
print(fruits)   # ['苹果', '香蕉', '橘子']
\`\`\`

## 索引：从 0 开始

\`\`\`python
print(fruits[0])   # 苹果（第 1 个）
print(fruits[1])   # 香蕉（第 2 个）
print(fruits[-1])  # 橘子（倒数第 1 个）
\`\`\`

**关键：索引从 0 数起**。第 1 个元素是 \`[0]\`，不是 \`[1]\)。这是新手最常踩的坑。
负数索引从后往前数，\`-1\` 是最后一个。

## 增删改

\`\`\`python
fruits[0] = "西瓜"        # 改：把第 1 个换成西瓜
fruits.append("葡萄")     # 增：末尾追加
del fruits[1]             # 删：删掉第 2 个
\`\`\`

## 长度

\`len(fruits)\` 返回列表元素个数。`,
    examples: [
      {
        title: '购物清单',
        code: 'shopping = ["牛奶", "面包", "鸡蛋"]\nprint(f"要买 {len(shopping)} 样东西")\nprint("第一样：", shopping[0])\nshopping.append("水果")\nprint("追加后：", shopping)',
        expectedOutput: '要买 3 样东西\n第一样： 牛奶\n追加后： [\'牛奶\', \'面包\', \'鸡蛋\', \'水果\']',
        lines: [
          { code: 'shopping[0]', explain: '索引 0 是第一个元素"牛奶"。' },
          { code: 'shopping.append("水果")', explain: 'append 方法在列表末尾添加一个新元素。' },
        ],
      },
    ],
    visual: {
      kind: 'variable',
      title: '列表索引对照',
      description: '列表 fruits = ["苹果", "香蕉", "橘子"] 的索引位置。',
      steps: [
        { label: '索引 0', detail: 'fruits[0] → 苹果', state: [{ name: '0', value: '苹果' }, { name: '1', value: '香蕉' }, { name: '2', value: '橘子' }] },
        { label: '索引 1', detail: 'fruits[1] → 香蕉（不是苹果！）', state: [{ name: '0', value: '苹果' }, { name: '1', value: '香蕉' }, { name: '2', value: '橘子' }] },
        { label: '负数索引', detail: 'fruits[-1] → 橘子', state: [{ name: '-3', value: '苹果' }, { name: '-2', value: '香蕉' }, { name: '-1', value: '橘子' }] },
      ],
    },
    pitfalls: ['以为第一个元素索引是 1——Python 从 0 开始。', '访问不存在的索引（越界）会报 IndexError。'],
    sources: [{ book: 'pcc3', chapter: '第3章 列表简介' }, { book: 'abs3', chapter: '第6章 列表' }],
    prerequisites: ['s2-01'],
    task: '创建一个"待办事项"列表，添加 3 件事，然后追加第 4 件并输出全部。',
    exercises: [
      { id: 's2-06-q1', qtype: 'blank', stem: '列表 nums = [10, 20, 30]，要取出 20，应该写 nums[______]。', answer: '1', explanation: '索引从 0 开始，20 是第二个元素，所以索引是 1。', difficulty: 1 },
      { id: 's2-06-q2', qtype: 'predict', stem: 'nums = [1, 2]；nums.append(3)；print(len(nums)) 输出什么？', keywords: [['3']], explanation: 'append 追加后列表变成 [1,2,3]，长度是 3。', difficulty: 2 },
    ],
    minutes: 9,
    env: 'browser',
  },
  {
    id: 's2-07',
    stageId: 2,
    order: 7,
    title: '字典：用"名字"找东西',
    subtitle: '键值对的力量',
    hook: '如果列表靠"编号"找东西，字典就靠"名字"找。想知道张三的电话，你不会翻遍通讯录数第几个，而是直接搜"张三"。',
    objectives: ['理解键值对结构', '会创建和访问字典', '掌握增删改遍历'],
    analogy: '字典像一本真正的词典：你查"苹果"这个"键"，就能找到它的解释这个"值"。键是唯一的名字，值是对应的内容。',
    content: `# 字典 dict

字典用花括号 \`{}\` 创建，由"键: 值"组成：

\`\`\`python
person = {"name": "Mike", "age": 15, "city": "深圳"}
\`\`\`

## 按键访问

\`\`\`python
print(person["name"])   # Mike
print(person["age"])    # 15
\`\`\`

列表用数字索引，字典用**键**索引。键通常是字符串。

## 增删改

\`\`\`python
person["age"] = 16            # 改
person["hobby"] = "编程"       # 增
del person["city"]            # 删
\`\`\`

## get() 更安全

访问不存在的键会报错。用 \`get()\` 可以避免：

\`\`\`python
print(person.get("phone", "未填写"))
# 找不到 phone 时返回"未填写"，不报错
\`\`\`

## 遍历

\`\`\`python
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

字典非常适合表示"一个人的多项信息""一个物品的属性"这类结构化数据。`,
    examples: [
      {
        title: '个人通讯录',
        code: 'contacts = {\n    "张三": "138-0000",\n    "李四": "139-1111",\n}\nprint("张三的电话：", contacts["张三"])\ncontacts["王五"] = "137-2222"\nfor name, phone in contacts.items():\n    print(f"{name} → {phone}")',
        expectedOutput: '张三的电话： 138-0000\n张三 → 138-0000\n李四 → 139-1111\n王五 → 137-2222',
        lines: [
          { code: 'contacts["张三"]', explain: '用名字（键）找到对应的电话号码（值）。' },
          { code: 'for name, phone in contacts.items()', explain: 'items() 把每个键值对拆成两个变量，方便遍历。for 循环下一阶段会详细讲。' },
        ],
      },
    ],
    compare: [
      { conceptA: '列表', conceptB: '字典', diff: '列表用数字索引（位置），适合"一串有序数据"；字典用键（名字），适合"有关联的多项信息"。', example: '购物清单用列表；一个人的姓名年龄电话用字典。' },
    ],
    sources: [{ book: 'pcc3', chapter: '第6章 字典' }, { book: 'abs3', chapter: '第7章 字典与数据结构化' }],
    prerequisites: ['s2-06'],
    task: '用字典记录一本图书的信息（书名、作者、价格、年份），输出其中两项。',
    exercises: [
      { id: 's2-07-q1', qtype: 'single', stem: '字典中用来定位值的是？', options: ['A. 索引数字', 'B. 键 key', 'C. 行号', 'D. 长度'], answer: 'B', explanation: '字典通过键来存取值，而不是像列表那样用数字索引。', difficulty: 1 },
      { id: 's2-07-q2', qtype: 'predict', stem: 'd = {"a": 1}；print(d.get("b", 0)) 输出什么？', keywords: [['0']], explanation: 'get() 找不到键 b 时返回默认值 0，不会报错。', difficulty: 2 },
    ],
    minutes: 9,
    env: 'browser',
  },
  {
    id: 's2-08',
    stageId: 2,
    order: 8,
    title: '元组、集合与列表操作进阶',
    subtitle: '更多容器与批量技巧',
    hook: '除了列表和字典，Python 还有两个"亲戚"：元组（不能改的列表）和集合（自动去重）。认识它们，工具箱更全。',
    objectives: ['区分列表/元组/集合', '掌握切片操作', '会用列表推导式'],
    content: `# 另外两种容器

## 元组 tuple：不可变的列表

用圆括号 \`()\` 创建，创建后**不能修改**：

\`\`\`python
point = (10, 20)
print(point[0])   # 10
# point[0] = 5    # 报错！元组不能改
\`\`\`

适合放不希望被改动的数据，比如坐标、配置项。

## 集合 set：自动去重

用花括号创建（但没有键值对），元素**不重复、无序**：

\`\`\`python
nums = {1, 2, 2, 3}
print(nums)   # {1, 2, 3}，重复的 2 被去掉了
\`\`\`

常用来去重和做交集并集。

## 切片：截取列表的一段

\`\`\`python
nums = [0, 1, 2, 3, 4]
print(nums[1:3])   # [1, 2]（含头不含尾）
print(nums[:2])    # [0, 1]（从头开始）
print(nums[2:])    # [2, 3, 4]（到末尾）
\`\`\`

## 列表推导式：一行生成列表

\`\`\`python
squares = [x * x for x in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]
\`\`\`

这是 Python 的"语法糖"，用一行代码替代一个循环，写熟了非常高效。`,
    examples: [
      {
        title: '去重与统计',
        code: 'tags = ["Python", "编程", "Python", "自动化"]\nunique = list(set(tags))\nprint("去重后：", unique)\n\nnums = [x for x in range(1, 6)]\nprint("奇数：", [x for x in nums if x % 2 == 1])',
        lines: [
          { code: 'list(set(tags))', explain: 'set 去掉重复，再用 list 转回列表。' },
          { code: '[x for x in nums if x % 2 == 1]', explain: '列表推导式加 if 条件，筛出奇数。' },
        ],
      },
    ],
    compare: [
      { conceptA: '列表 []', conceptB: '元组 () / 集合 {}', diff: '列表可改、有序、可重复；元组不可改、有序；集合无序、自动去重。', example: '购物车用列表；坐标用元组；标签去重用集合。' },
    ],
    sources: [{ book: 'pcc3', chapter: '第4章 4.3-4.5节' }, { book: 'abs3', chapter: '第6章 6.7节' }],
    prerequisites: ['s2-06', 's2-07'],
    exercises: [
      { id: 's2-08-q1', qtype: 'single', stem: '元组和列表最主要的区别是？', options: ['A. 元组能存数字', 'B. 元组创建后不能修改', 'C. 元组用花括号', 'D. 元组不能遍历'], answer: 'B', explanation: '元组是不可变序列，创建后元素不能被修改。', difficulty: 2 },
      { id: 's2-08-q2', qtype: 'predict', stem: 'print({1, 2, 2, 3}) 输出几个元素？', keywords: [['3', '三']], explanation: '集合自动去重，重复的 2 只保留一个，所以是 3 个元素。', difficulty: 2 },
    ],
    minutes: 10,
    env: 'browser',
  },
]
