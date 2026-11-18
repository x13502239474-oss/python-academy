import type { Lesson } from '../../types'

export const stage1Lessons: Lesson[] = [
  {
    id: 's1-01',
    stageId: 1,
    order: 1,
    title: '什么是编程？',
    subtitle: '给电脑写一张"说明书"',
    hook: '你有没有想过：为什么你点一下手机上的按钮，它就知道该做什么？其实有人提前"告诉"了它——这就是编程。',
    objectives: ['用自己的话说出"编程"是什么', '理解程序就是一步一步的指令', '说出 2 个编程能解决的生活问题'],
    analogy: '把电脑想象成一个非常听话但完全不懂变通的助手。它不会"猜"你的意思，你必须把每一步都说得清清楚楚。编程，就是你给这个助手写的一张超级详细的说明书。',
    content: `# 编程到底是什么

**编程 = 写指令，让电脑帮你做事。**

你每天做的很多事其实是"按步骤执行"的。比如泡一杯茶：

1. 拿一个杯子
2. 放入茶包
3. 倒进热水
4. 等 3 分钟
5. 拿出来茶包

这就是一个"程序"——一系列按顺序执行的步骤。电脑程序也是这样，只不过步骤要用它能听懂的语言（编程语言）来写。

## 为什么电脑需要这么"啰嗦"

电脑很笨，也很忠实。它不会自动补全你想说的话。你写错一个字、漏掉一步，它就会照着错的做，或者干脆停下来报错。

好消息是：电脑从不喊累。同样的事让它做 1 万次，它也会认认真真做 1 万次，而且每次都一样。这正是编程的价值——**把重复、繁琐的事情交给电脑**。

## 程序 = 数据 + 步骤

一个程序通常只有两样东西：

- **数据**：要处理的东西（比如数字、文字、名单）
- **步骤**：怎么处理这些数据（比如相加、排序、筛选）

后面你会学到，变量用来装数据，语句用来写步骤。就这么简单。`,
    examples: [
      {
        title: '让电脑向你问好',
        code: 'print("你好，世界！")\nprint("我正在学习编程。")',
        expectedOutput: '你好，世界！\n我正在学习编程。',
        lines: [
          { code: 'print("你好，世界！")', explain: 'print 是"打印"的意思，括号里写你想让电脑显示的内容。文字要用引号包起来。' },
          { code: 'print("我正在学习编程。")', explain: '再来一条指令，电脑会接着显示第二行。程序就是一行一行往下执行的。' },
        ],
      },
    ],
    compare: [
      { conceptA: '人做事', conceptB: '电脑做事', diff: '人会"意会"、会跳步、会举一反三；电脑只会严格照你写的每一步来，不多也不少。', example: '你说"把门关上"，人知道要轻轻关；电脑需要你说清楚"用多大力气、移动到什么角度"。' },
    ],
    pitfalls: ['以为电脑"应该懂我的意思"——它真的不懂，要把每一步写清楚。', '中文引号和英文引号混用——Python 里必须用英文引号 " " 或 \' \'。'],
    sources: [{ book: 'pcc3', chapter: '第1章 起步' }, { book: 'abs3', chapter: '第1章 Python基础' }],
    prerequisites: [],
    task: '试着修改上面的例子，让电脑输出三行关于你自己的介绍。',
    exercises: [
      { id: 's1-01-q1', qtype: 'boolean', stem: '电脑会主动"猜"你想做什么，所以写代码可以写得模糊一些。', answer: '错', explanation: '电脑只会严格执行你写的指令，不会猜测意图，所以必须写得明确。', difficulty: 1 },
      { id: 's1-01-q2', qtype: 'single', stem: '下面哪个最能概括"编程"？', options: ['A. 修理电脑硬件', 'B. 写指令让电脑做事', 'C. 给电脑装系统', 'D. 上网搜索资料'], answer: 'B', explanation: '编程的本质就是写一系列指令，让电脑按步骤完成任务。', difficulty: 1 },
    ],
    minutes: 8,
    env: 'browser',
  },
  {
    id: 's1-02',
    stageId: 1,
    order: 2,
    title: 'Python 能做什么？',
    subtitle: '一门语言，万千用途',
    hook: '有人说 Python 能"几乎做任何事"。这话有点夸张，但它确实能干的事多得惊人——从自动填表到训练人工智能。',
    objectives: ['说出 Python 的 4 个常见用途', '理解本课程"双模式"安排的原因', '知道哪些任务手机浏览器能跑、哪些要本地环境'],
    analogy: 'Python 就像一把瑞士军刀：里面有小刀、剪刀、螺丝刀……不同场合掏出不同工具。你不需要一开始就用上所有工具，先把手上这个用熟。',
    content: `# Python 的用武之地

Python 是一门**通用编程语言**，意思是它不专门为某一件事设计，什么都能干一点。常见的用途有：

## 1. 自动化办公（省时间）
批量重命名文件、自动整理文件夹、往 Excel 里填数据、合并 PDF……这些重复劳动，Python 几秒钟搞定。

## 2. 数据处理与分析（找规律）
处理表格、清洗数据、画统计图。财务、运营、科研人员都用它。

## 3. 网页与网络应用（做产品）
很多网站后台、小程序后端都是 Python 写的。你熟悉的豆瓣早期就用 Python。

## 4. 人工智能与科学计算（前沿）
目前最火的人工智能领域，Python 是绝对主力语言。

## 关于这门课的"双模式"

你主要用 **iPhone** 学习，这里要说句实在话：

- **学习模式（手机浏览器）**：基础语法、变量、循环、函数这些，我们做了在线代码实验室，你打开网页就能写、能跑、能看结果。
- **实战模式（Windows + VS Code）**：文件整理、Excel、PDF 这些需要读写你电脑里的真实文件，浏览器出于安全考虑**做不到**。这些课会明确标注 🖥️，并给你完整的本地环境搭建教程。

我们不会假装手机上能跑所有东西——这样对你才诚实。`,
    examples: [
      {
        title: '一个小小的"数据处理"预览',
        code: 'prices = [12, 35, 8, 20]\ntotal = sum(prices)\nprint("总价：", total, "元")\nprint("平均：", round(total / len(prices), 2), "元")',
        expectedOutput: '总价： 75 元\n平均： 18.75 元',
        lines: [
          { code: 'prices = [12, 35, 8, 20]', explain: '把 4 个价格放进一个叫 prices 的列表里。' },
          { code: 'total = sum(prices)', explain: 'sum() 帮我们把列表里的数字全加起来。' },
          { code: 'print("总价：", total, "元")', explain: 'print 里可以用逗号隔开多个内容，输出时会用空格连接。' },
          { code: 'round(..., 2)', explain: 'round 让小数保留 2 位。' },
        ],
      },
    ],
    sources: [{ book: 'pcc3', chapter: '第1章、第15-20章' }, { book: 'abs3', chapter: '前言及第11-24章' }],
    prerequisites: ['s1-01'],
    task: '在代码实验室里把价格改成你自己的 4 个数字，看看总价怎么变。',
    exercises: [
      { id: 's1-02-q1', qtype: 'multiple', stem: '下面哪些是 Python 的常见用途？（多选）', options: ['A. 自动化办公', 'B. 数据处理', 'C. 网页开发', 'D. 人工智能'], answer: ['A', 'B', 'C', 'D'], explanation: '这四个都是 Python 大显身手的领域。', difficulty: 1 },
      { id: 's1-02-q2', qtype: 'boolean', stem: '文件批量整理这类任务，在手机浏览器里也能直接读写手机文件，和电脑上完全一样。', answer: '错', explanation: '浏览器出于安全限制无法随意读写本地文件，这类实战任务需要 Windows + VS Code 本地环境。', difficulty: 1 },
    ],
    minutes: 7,
    env: 'browser',
  },
  {
    id: 's1-03',
    stageId: 1,
    order: 3,
    title: 'Python 与其他语言的区别',
    subtitle: '为什么新手适合先学 Python',
    hook: '编程语言有几百种，为什么全世界的新手课大多推荐 Python？因为它"说人话"。',
    objectives: ['说出 Python 相对 C/Java 的 2 个特点', '理解"解释型语言"的大致含义', '知道 Python 的短板在哪'],
    analogy: '如果编程是说话，C 语言像严谨的法律条文（每个标点都要较真），Python 像日常聊天（更接近人的表达习惯）。新手当然先从聊天学起。',
    content: `# 为什么先学 Python

## 语法简洁，接近自然语言

同样是"打印一句话"：

- **Python**：\`print("你好")\` —— 一行搞定
- **Java**：需要写好几行，还要声明类和方法
- **C**：要引入头文件、写 main 函数

Python 把新手最容易劝退的"样板代码"都省了，让你直接专注于"解决问题的逻辑"。

## 解释型语言：写完就能跑

Python 是**解释型**语言，你写完代码，解释器一行一行读、一行一行执行，改完立刻能重跑，不用漫长的"编译"等待。这对手学习非常友好——改一下，马上看到结果。

## 有强大的"现成工具库"

Python 有句名言："不要重复造轮子。"你想做的事，大概率有人写好了库（现成工具包），拿来 \`import\` 就能用。这是它如此流行的关键。

## 客观地说，它也有短板

- **运行速度**：比 C、Java 慢一些。但对你做的大多数事（办公、数据、小项目）完全够用。
- **手机端限制**：完整的 Python 环境跑在电脑上；手机浏览器只能通过特殊技术（Pyodide）跑基础代码，这正是本课程双模式的原因。

> 结论：作为第一门语言，Python 让你最快获得"我能写出程序"的成就感。`,
    examples: [
      {
        title: '感受 Python 的简洁',
        code: '# 同样是交换两个变量的值\na = 1\nb = 2\na, b = b, a   # Python 一行搞定\nprint(a, b)   # 输出：2 1',
        expectedOutput: '2 1',
        lines: [
          { code: 'a, b = b, a', explain: 'Python 支持"同时赋值"，交换两个变量不用临时变量，这在很多语言里要写三行。' },
          { code: '# 开头是注释', explain: '# 后面的内容电脑不执行，是写给人看的说明。' },
        ],
      },
    ],
    sources: [{ book: 'pcc3', chapter: '第1章、第2章' }],
    prerequisites: ['s1-01', 's1-02'],
    exercises: [
      { id: 's1-03-q1', qtype: 'single', stem: 'Python 被称为"解释型"语言，主要意思是：', options: ['A. 只能用来解释文字', 'B. 代码写完后逐行执行，改完能立刻重跑', 'C. 必须先编译成其他语言', 'D. 只能在手机上跑'], answer: 'B', explanation: '解释型语言由解释器逐行读取执行，修改后立即生效，非常适合学习时反复尝试。', difficulty: 2 },
    ],
    minutes: 6,
    env: 'browser',
  },
  {
    id: 's1-04',
    stageId: 1,
    order: 4,
    title: '安装与环境（双模式说明）',
    subtitle: '手机上怎么学，电脑上怎么练',
    hook: '工欲善其事，必先利其器。我们把两条路都给你铺好，你按需要选。',
    objectives: ['知道手机端学习无需任何安装', '了解 Windows 本地环境需要装什么', '明白什么时候该切换到实战模式'],
    content: `# 两种学习模式

## 📱 模式一：手机浏览器（零安装）

你现在打开这个网站，进入"实验室"页面，就能直接写 Python、点运行看结果。背后用的是一项叫 **Pyodide** 的技术，它把 Python 解释器编译成了网页能运行的形式。

**能做什么**：基础语法、字符串、列表、字典、循环、函数、类、简单的标准库。
**限制**：不能读写你手机里的真实文件，也不能装 Excel、PDF 这类第三方库。

一句话：**跟着本课前 5 个阶段走，手机完全够用。**

## 🖥️ 模式二：Windows 本地环境（实战必需）

从第 6 阶段开始，要处理你电脑上的真实文件，就需要完整的 Python 环境。搭建步骤：

**第 1 步：安装 Python**
1. 打开官网 \`python.org/downloads\`，下载最新版（3.11 及以上）
2. 安装时**务必勾选** "Add Python to PATH"（这一步最容易漏，漏了后面命令认不出来）
3. 点 Install Now，等它装完

**第 2 步：验证安装**
按 \`Win + R\`，输入 \`cmd\` 回车，在黑色窗口里输入：
\`\`\`
python --version
\`\`\`
如果显示 \`Python 3.x.x\`，说明成功了。

**第 3 步：安装编辑器 VS Code**
1. 到 \`code.visualstudio.com\` 下载安装
2. 打开后点左侧扩展图标，搜索 "Python"，安装微软官方的 Python 扩展

**第 4 步：运行第一段代码**
新建一个文件 \`hello.py\`，写入 \`print("你好")\`，在文件上点右键"在终端中运行 Python 文件"。

> 详细图文教程会在第 6 阶段开头再完整走一遍。现在你只要知道：需要实战时，路是通的。`,
    examples: [
      {
        title: '本地环境的第一个验证',
        code: '# 在本地命令行运行这段，确认环境正常\nimport sys\nprint("Python 版本：", sys.version)\nprint("环境正常！")',
        lines: [
          { code: 'import sys', explain: 'import 是"导入"，sys 是 Python 自带的一个模块，里面装着系统信息。' },
          { code: 'sys.version', explain: '这里能读出当前 Python 的版本号。' },
        ],
      },
    ],
    sources: [{ book: 'pcc3', chapter: '第1章 1.1-1.6节' }, { book: 'abs3', chapter: '第1章' }],
    prerequisites: ['s1-01'],
    exercises: [
      { id: 's1-04-q1', qtype: 'boolean', stem: '安装 Python 时，"Add Python to PATH"这个选项装不装都一样。', answer: '错', explanation: '一定要勾选，否则命令行里无法识别 python 命令，是新手最常见的坑。', difficulty: 1 },
    ],
    minutes: 10,
    env: 'local',
  },
  {
    id: 's1-05',
    stageId: 1,
    order: 5,
    title: '第一个 Python 程序',
    subtitle: 'HELLO, WORLD!',
    hook: '每个程序员的第一段代码，几乎都是让电脑说出"Hello, world!"。今天轮到你了。',
    objectives: ['独立写出并运行第一个程序', '理解 .py 文件是什么', '知道程序的执行顺序是从上到下'],
    analogy: '写第一个程序就像学骑车第一次踩踏板——动作本身很简单，但踩下去的那一刻，你就"会了"。',
    content: `# 写下你的第一行代码

在"实验室"页面输入下面这行，然后点【运行】：

\`\`\`python
print("Hello, world!")
\`\`\`

你会看到下方输出 \`Hello, world!\`。恭喜，你已经是程序员了！

## 拆开看看这行代码

- \`print\` 是一个**函数**，作用是"把内容显示出来"
- \`( )\` 叫**括号**，你要显示的东西放在里面
- \`"Hello, world!"\` 是**字符串**，也就是一段文字，必须加引号

## 程序从上往下执行

Python 会一行一行往下读。所以先写的先输出：

\`\`\`python
print("第一行")
print("第二行")
print("第三行")
\`\`\`

输出就是三行，顺序和代码顺序一模一样。

## 关于 .py 文件

在本地环境里，Python 代码保存在以 \`.py\` 结尾的文件里。文件名可以随便起，比如 \`hello.py\`、\`我的第一个程序.py\`。点运行时，Python 会从这个文件的第一行开始，一路执行到最后一行。`,
    examples: [
      {
        title: '一个有仪式感的自我介绍',
        code: 'print("=" * 20)\nprint("你好，我是 Mike")\nprint("我正在学习 Python")\nprint("=" * 20)',
        expectedOutput: '====================\n你好，我是 Mike\n我正在学习 Python\n====================',
        lines: [
          { code: 'print("=" * 20)', explain: '字符串乘以数字，表示重复。这里把 "=" 重复 20 次，做出一条分隔线。' },
          { code: 'print("你好，我是 Mike")', explain: '把 Mike 换成你自己的名字，运行看看。' },
        ],
      },
    ],
    sources: [{ book: 'pcc3', chapter: '第1章 1.3节' }, { book: 'abs3', chapter: '第1章 1.5节' }],
    prerequisites: ['s1-01'],
    task: '写一个程序，输出一条分隔线、你的名字、你学 Python 的原因，再加一条分隔线。',
    exercises: [
      { id: 's1-05-q1', qtype: 'predict', stem: '下面代码的输出是什么？\nprint("A")\nprint("B")\nprint("C")', keywords: [['A'], ['B'], ['C']], explanation: '程序从上往下依次执行，三行分别输出 A、B、C。', difficulty: 1 },
      { id: 's1-05-q2', qtype: 'blank', stem: '要把文字显示出来，使用的函数是 ______（）（填函数名）。', answer: 'print', accepted: ['print()', '输出'], explanation: 'print() 函数用于把内容打印输出到屏幕。', difficulty: 1 },
    ],
    minutes: 6,
    env: 'browser',
  },
  {
    id: 's1-06',
    stageId: 1,
    order: 6,
    title: 'print() 函数的玩法',
    subtitle: '让输出随心所欲',
    hook: 'print 不只是"打印文字"，它还能算数、拼内容、换行、做分隔——玩熟了特别顺手。',
    objectives: ['会用 print 输出多种类型', '理解逗号的拼接作用', '掌握 end 参数改变结尾'],
    analogy: '把 print 想成一个传话员：你给它什么它就喊什么。给它数字就喊数字，给它算式就先算好再喊。',
    content: `# print() 的更多用法

## 输出不同类型

\`\`\`python
print(100)          # 数字，不用引号
print(3 + 5)        # 算式，先算再输出 8
print("3 + 5")      # 加了引号就是纯文字，原样输出 3 + 5
\`\`\`

注意最后两行的区别：**引号决定它是"算式"还是"文字"**。

## 用逗号拼接

\`\`\`python
name = "Mike"
print("你好，", name)     # 输出：你好， Mike
\`\`\`

逗号会自动在各项之间加一个空格。

## 改变结尾：end 参数

print 默认输出后换行。想让内容排在同一行，用 \`end\`：

\`\`\`python
print("加载中", end="")
print("完成！")
# 输出：加载中完成！（在同一行）
\`\`\`

## 重复输出小技巧

\`\`\`python
print("★" * 10)   # ★★★★★★★★★★
\`\`\``,
    examples: [
      {
        title: '打印一个小票据',
        code: 'print("---- 收银小票 ----")\nprint("苹果", 3, "个", 5 * 3, "元")\nprint("香蕉", 2, "把", 2 * 2, "元")\nprint("------------------")',
        expectedOutput: '---- 收银小票 ----\n苹果 3 个 15 元\n香蕉 2 把 4 元\n------------------',
        lines: [
          { code: 'print("苹果", 3, "个", 5 * 3, "元")', explain: 'print 里可以混合文字和数字，算式 5*3 会先算出 15 再输出。' },
        ],
      },
    ],
    sources: [{ book: 'pcc3', chapter: '第2章 2.3节' }, { book: 'abs3', chapter: '第1章 1.6节' }],
    prerequisites: ['s1-05'],
    exercises: [
      { id: 's1-06-q1', qtype: 'predict', stem: 'print("2 + 3") 的输出是？', keywords: [['2', '+', '3']], explanation: '因为有引号，所以原样输出文字 2 + 3，不会算成 5。', difficulty: 2 },
    ],
    minutes: 7,
    env: 'browser',
  },
  {
    id: 's1-07',
    stageId: 1,
    order: 7,
    title: '注释与代码规范',
    subtitle: '写给未来的自己看',
    hook: ' code 是写给电脑看的，注释是写给人看的——包括一个月后完全忘了自己在干啥的你自己。',
    objectives: ['会用 # 写单行注释', '知道为什么要写注释', '了解命名和缩进的基本规范'],
    content: `# 注释：给代码做批注

Python 里，\`#\` 后面的内容不会被执行，是写给人看的说明：

\`\`\`python
# 计算总价
price = 10   # 单价
count = 3    # 数量
print(price * count)
\`\`\`

## 该写什么样的注释

好的注释解释**"为什么"**，而不是复述"是什么"：

- ❌ 差：\`x = 5   # 把 5 赋值给 x\`（这是废话，代码本身就看出来了）
- ✅ 好：\`timeout = 30   # 超过 30 秒视为超时，参照需求文档\`

## 命名规范

- 变量名用小写字母、数字、下划线，如 \`user_name\`、\`total_price\`
- 不要用中文拼音缩写让人猜，尽量见名知意
- 不能用数字开头，不能用空格

## 缩进很重要

Python 用**缩进**（空格）来表示代码的归属关系。目前你还用不到，但记住：缩进不是装饰，是语法的一部分。后面学循环和函数时，缩进错了程序就会出错。

> 一个小约定：缩进统一用 4 个空格。`,
    examples: [
      {
        title: '带注释的清楚代码',
        code: '# 个人介绍小程序\nname = "Mike"       # 姓名\nage = 15            # 年龄\n\n# 输出介绍\nprint("我叫", name)\nprint("今年", age, "岁")',
        lines: [
          { code: '# 个人介绍小程序', explain: '整行注释，说明这段代码的目的。' },
          { code: 'name = "Mike"       # 姓名', explain: '行尾注释，解释这一个变量的含义。' },
          { code: '（空行）', explain: '适当空行能把代码分组，读起来更清楚。' },
        ],
      },
    ],
    sources: [{ book: 'pcc3', chapter: '第2章 2.5节、第4章 4.6节' }],
    prerequisites: ['s1-05'],
    exercises: [
      { id: 's1-07-q1', qtype: 'single', stem: 'Python 中单行注释用什么符号开头？', options: ['A. //', 'B. #', 'C. /*', 'D. --'], answer: 'B', explanation: 'Python 用 # 表示单行注释，# 后的内容不会被程序执行。', difficulty: 1 },
    ],
    minutes: 6,
    env: 'browser',
  },
  {
    id: 's1-08',
    stageId: 1,
    order: 8,
    title: '常见运行错误与读报错',
    subtitle: '别怕，报错是朋友',
    hook: '新手最怕的就是红色报错。其实报错是 Python 在认真告诉你"哪儿错了"，学会读它，调试速度翻倍。',
    objectives: ['不害怕报错', '会定位报错的行号和类型', '认识最常见的 3 类错误'],
    analogy: '报错就像导航说"前方道路不通，请掉头"——它不是在骂你，是在帮你找到对的路。',
    content: `# 读懂错误提示

程序出错时，Python 会打印一段"追溯信息"（traceback）。别慌，从**最后一行**往前看：

\`\`\`
Traceback (most recent call last):
  File "main.py", line 3, in <module>
    print(你好)
NameError: name '你好' is not defined
\`\`\`

- \`line 3\`：**出错在第 3 行**，先去看这一行
- \`NameError: ... not defined\`：**错误类型**，这里是"用了没定义的名字"

## 三大常见错误

### 1. SyntaxError（语法错误）
代码写法不符合规则，比如漏了括号、引号没配对、中文标点。程序根本跑不起来。

### 2. NameError（名字错误）
用了一个不存在的变量名。常见原因：拼写错误、忘记先赋值。

### 3. TypeError（类型错误）
对错误的类型做了操作，比如 \`"3" + 5\`（文字不能和数字相加）。

## 调试三步法

1. **看最后一行**：知道是什么错
2. **找到行号**：定位到哪一行
3. **读那一行**：检查拼写、标点、引号、缩进

> 记住：每个程序员每天都在看报错。看得多就熟练了，这不丢人。`,
    examples: [
      {
        title: '一个故意写错的例子（观察报错）',
        code: '# 下面这行会报错，因为 msg 没有先定义\nprint(msg)',
        lines: [
          { code: 'print(msg)', explain: 'msg 从未赋值，运行时会抛出 NameError: name \'msg\' is not defined。试着先写 msg = "你好" 再运行。' },
        ],
      },
    ],
    pitfalls: ['用了中文引号 "" 或中文括号——Python 只认英文半角符号。', '变量名拼写不一致，比如定义时 name 用时 nmae。'],
    sources: [{ book: 'pcc3', chapter: '第1章 1.4节、第2章 2.2.2节' }, { book: 'abs3', chapter: '第5章 调试' }],
    prerequisites: ['s1-05', 's1-06'],
    exercises: [
      { id: 's1-08-q1', qtype: 'single', stem: '报错信息里的 "line 3" 告诉我们什么？', options: ['A. 程序有 3 处错误', 'B. 错误大约在第 3 行', 'C. 要运行 3 遍', 'D. 等待 3 秒'], answer: 'B', explanation: 'line 3 指明出错的代码行号，是定位问题最重要的线索。', difficulty: 1 },
      { id: 's1-08-q2', qtype: 'debug', stem: '代码 print("你好"）用了中文右括号，会报什么错？', keywords: [['SyntaxError', '语法']], explanation: '中英文标点混用会导致语法错误 SyntaxError，Python 只认英文半角标点。', difficulty: 2 },
    ],
    minutes: 8,
    env: 'browser',
  },
]
