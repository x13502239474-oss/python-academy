import type { Lesson } from '../../types'

/**
 * 第五阶段：函数（9 课）
 * content 内不使用反引号；可运行代码放在 examples，expectedOutput 均在本机 Python 3.13 实跑核对。
 */
export const stage5Lessons: Lesson[] = [
  {
    id: 's5-01',
    stageId: 5,
    order: 1,
    title: '为什么需要函数',
    subtitle: '把一段代码起个名字，从此不用再抄第二遍',
    hook: '同一套打折算法，你在三个订单里抄了三遍。折扣一改，你打算改几个地方？',
    objectives: [
      '说出复制粘贴代码的三个麻烦',
      '解释「函数就是给一段代码起名字」',
      '写出并调用一个最简单的函数',
    ],
    analogy: '自动售货机：投币、按同一个按钮就掉出一瓶水。函数就是造一次、按无数次的机器。',
    terms: [
      { term: '函数', plain: '一段起了名字的代码，可以反复使用。' },
      { term: '定义', plain: '把代码写下来起名字，此时还不执行。' },
      { term: '调用', plain: '用函数名让这段代码真正跑一次。' },
    ],
    content: `## 一、为什么需要它：三段几乎一样的代码

算三笔订单的实付金额：单价乘数量，再打九折。三笔各写三行，结果都对，但埋了三个雷：

| 问题 | 表现 | 后果 |
| --- | --- | --- |
| 改一处要改多处 | 折扣变了，三处都要改 | 漏改一处就错账 |
| 越写越长 | 每多一笔订单多三行 | 一百笔就是三百行 |
| 没法命名 | 只能靠读代码猜 | 过两周自己都看不懂 |

**重复的代码，就是等着出错的代码。**

## 二、概念解释：函数是「给一段代码起名字」

把几行代码打包，起一个名字，以后喊名字就等于执行这几行。

| 说法 | 意思 |
| --- | --- |
| 定义 | 把代码写下、贴上名字标签，此时只是被记下来 |
| 调用 | 喊一声名字（加括号），这段代码才执行一次 |

于是同一段逻辑只写一遍，想用几次喊几次。改只改那一处，主程序只剩名字。

## 三、语法与使用规则

| 部分 | 写法 | 说明 |
| --- | --- | --- |
| 定义开头 | def 函数名(): | 行尾必须有英文冒号 |
| 函数体 | 缩进 4 个空格的行 | 缩进必须一致 |
| 调用 | 函数名() | 括号不能省 |

三条硬规则：名字后面必须有一对英文括号，没有参数也要写空括号；def 那行的冒号不能漏；函数体必须比 def 多缩进一层。命名用小写加下划线，比如 order_total。

## 四、逐步演示

第一步，先照直写，三笔订单各算一遍，确认结果对。

第二步，抽公共部分：三笔只有单价和数量不同，把「算实付」写成函数，会变的东西留成参数。

第三步，改成调用，主程序变成三行，运行确认输出不变。

第四步，把折扣改成 0.85，只改函数体里一个数字，三笔同时生效。

## 五、深入一层：函数省的不是行数，是「改错的地方」

很多人第一次看到函数，觉得它只是把代码缩短了。真正的好处不在行数，在于**同一份逻辑只有一处**。

举个具体的：折扣原来是 0.9（九折），现在临时改成 0.85（八五折）。三笔订单硬抄的版本要改三处，改完还得祈祷自己没漏；写成函数之后，改函数体里的一个数字，所有调用同时生效。

| 做法 | 改一处要动几个地方 | 漏改的风险 |
| --- | --- | --- |
| 三笔硬抄 | 3 处 | 高，改完还得逐行核对 |
| 写成函数 | 1 处 | 零 |

不过也别走另一个极端，把所有三行代码都抽成函数。判断标准很朴素：**同样或几乎同样的代码出现两次以上，并且以后还可能变，就抽；只出现一次、也不打算复用的，留着更清楚。** 过度抽象比重复更难维护，因为读代码的人要在文件之间反复跳。

最后一句话值得记住：函数名是给人看的。order_total 一看就知道算订单总额，f1 这种名字等于没起。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| NameError: name order_total is not defined | 调用写在定义之前 | 定义放上面 |
| 定义了函数，运行却没输出 | 只定义没调用 | 补一行名字加括号 |
| SyntaxError: expected ':' | def 行漏冒号 | 补英文冒号 |
| IndentationError | 函数体没缩进 | 统一 4 个空格 |

只出现一次的代码没必要硬抽，重复两次以上、以后还会用的才值得起名字。`,
    examples: [
      {
        title: '改造前：三笔订单抄三遍',
        intro: '三笔订单的算法完全一样，只是数字不同。',
        code: `p1 = 25 * 2
t1 = p1 * 0.9
print("订单 1：", t1)

p2 = 40 * 3
t2 = p2 * 0.9
print("订单 2：", t2)

p3 = 18 * 5
t3 = p3 * 0.9
print("订单 3：", t3)`,
        expectedOutput: `订单 1： 45.0
订单 2： 108.0
订单 3： 81.0`,
        lines: [
          { code: 'p1 = 25 * 2', explain: '先算小计，得 50。' },
          { code: 't1 = p1 * 0.9', explain: '再打九折，得 45.0。' },
          { code: 'print("订单 1：", t1)', explain: '连打印格式也重复了三遍，格式一改同样要改三次。' },
        ],
        trace: [
          { step: '第 1-3 行', state: 'p1 = 50，t1 = 45.0' },
          { step: '第 5-11 行', state: '分别得到 108.0 与 81.0' },
        ],
      },
      {
        title: '改造后：定义一次，调用三次',
        intro: '同样结果，代码从十二行压到七行。',
        code: `def order_total(price, count):
    subtotal = price * count
    return subtotal * 0.9

print("订单 1：", order_total(25, 2))
print("订单 2：", order_total(40, 3))
print("订单 3：", order_total(18, 5))`,
        expectedOutput: `订单 1： 45.0
订单 2： 108.0
订单 3： 81.0`,
        lines: [
          { code: 'def order_total(price, count):', explain: '需要单价和数量两个数据。' },
          { code: 'return subtotal * 0.9', explain: 'return 把结果交回调用方。' },
          { code: 'print("订单 2：", order_total(40, 3))', explain: '同一个函数换两个参数就是另一笔订单，主程序只关心传什么。' },
        ],
        trace: [
          { step: '第 1-3 行', state: '登记函数，无输出' },
          { step: '第 5-7 行', state: '三次调用，得到 45.0、108.0、81.0' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '复制粘贴的代码',
        conceptB: '函数',
        diff: '复制出来的每份都独立，改动要逐份同步；函数只有一份定义，改一次全部生效。',
      },
    ],
    pitfalls: [
      '只定义不调用，运行后什么输出都没有。',
      '先调用后定义，报 NameError。',
      'def 行漏冒号，直接 SyntaxError。',
      '函数体缩进不一致，报 IndentationError。',
    ],
    keyPoints: [
      '函数 = 给一段代码起名字，定义一次、调用多次。',
      '三大问题：改多处、越写越长、无法命名。',
      '写法：def、名字加括号、冒号、函数体缩进。',
      '省下的不是字数，是改漏一处的风险。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第4章 函数' },
    ],
    prerequisites: ['s4-04'],
    task: '翻出你写过的最长一段练习代码，找出重复两次以上的三行，抽成函数。',
    exercises: [
      {
        id: 's5-01-q1',
        qtype: 'single',
        stem: '函数最核心的作用是什么？',
        options: ['A. 让程序更快', 'B. 给一段代码起名字，让它能反复使用', 'C. 让程序联网', 'D. 省内存'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：函数解决的是同一段逻辑写了很多遍。\n逐步演示：把三行写进 def 起名，之后写名字加括号即可。\n易错提醒：函数不会让程序变快。',
      },
      {
        id: 's5-01-q2',
        qtype: 'blank',
        stem: '在 Python 里定义函数，行首使用的关键字是 ______。',
        answer: 'def',
        accepted: ['def', 'DEF', 'Def'],
        explanation:
          '答案：def。\n思路：定义函数的第一行永远以 def 开头。\n逐步演示：def 空格 名字 括号 冒号，回车后缩进写函数体。\n易错提醒：写成 define 或 function 都不行。',
      },
      {
        id: 's5-01-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出完整输出。',
        code: 'def show(n):\n    print("第", n, "次")\n\nshow(1)\nshow(2)',
        keywords: [['第 1 次'], ['第 2 次'], ['两行', '2 行']],
        explanation:
          '答案：两行，依次是「第 1 次」「第 2 次」。\n思路：定义本身不输出，两次调用各执行一遍。\n逐步演示：第一次 n 为 1，第二次为 2。\n易错提醒：def 那行只是登记。',
      },
      {
        id: 's5-01-q4',
        qtype: 'blank',
        stem: '调用函数时，函数名后面必须跟一对 ______，否则你拿到的只是函数本身。',
        answer: '括号',
        accepted: ['括号', '()', '英文括号', '圆括号', '小括号'],
        explanation:
          '答案：括号。\n思路：括号是「现在执行」的开关。\n逐步演示：写 order_total 只是引用，加 (25, 2) 才执行。\n易错提醒：不加括号不报错，只是什么都没发生。',
      },
      {
        id: 's5-01-q5',
        qtype: 'program',
        stem: '定义函数 square(n) 返回 n 的平方，输出三行：\n3 的平方是 9\n5 的平方是 25\n10 的平方是 100',
        answer: '',
        testCases: [{ stdin: '', expected: '3 的平方是 9\n5 的平方是 25\n10 的平方是 100' }],
        explanation:
          '答案（参考答案）：\ndef square(n):\n    return n * n\n\nprint("3 的平方是", square(3))\nprint("5 的平方是", square(5))\nprint("10 的平方是", square(10))\n\n思路：把算平方抽成函数，主程序负责调用。\n逐步演示：square(3) 时 n 为 3，返回 9。\n易错提醒：用 print 不 return 就拿不到返回值。',
      },
    ],
    minutes: 15,
    env: 'browser',
  },
  {
    id: 's5-02',
    stageId: 5,
    order: 2,
    title: '定义与调用',
    subtitle: '写下来不等于执行，喊名字才开始',
    hook: '你把函数的代码敲完，点了运行，屏幕上一片安静。是写错了吗？',
    objectives: [
      '写出符合规范的 def 语句与函数体',
      '说清「定义」和「调用」的区别',
      '解释调用时为什么要加括号',
    ],
    analogy: '定义函数像把菜谱写进本子，厨房一点动静都没有；调用才是照着菜谱开火。',
    terms: [
      { term: 'def', plain: '定义函数的关键字，来自 define。' },
      { term: '函数体', plain: 'def 下面缩进的那几行，调用时才执行。' },
      { term: '函数对象', plain: '函数本身，可以赋值、传递，但不执行。' },
    ],
    content: `## 一、为什么需要它：定义和执行是两件事

新手最常卡住的不是语法，而是「我明明写了，为什么没反应」。

Python 读到 def，只做一件事：把下面缩进的那几行打包、挂上名字，然后继续往下读。**它不会执行函数体。** 真正让代码跑起来的是调用：名字后面跟一对括号。

## 二、概念解释：名字、括号、函数体

| 组成 | 长什么样 | 作用 |
| --- | --- | --- |
| def | def | 登记一个函数 |
| 名字 | say_hello | 调用时喊的名字 |
| 括号 | () | 放参数，没参数也不能省 |
| 冒号加缩进 | 冒号换行缩进 4 格 | 划分出属于它的代码 |

函数名和变量同级，可以赋给别的变量，也可以当参数传出去。但**只有名字加括号才是调用**。

## 三、语法与使用规则

| 规则 | 正确写法 | 错误写法 |
| --- | --- | --- |
| 关键字小写 | def | Def |
| 括号成对 | def hi(): | def hi(: |
| 行尾冒号 | def hi(): | def hi() |
| 调用加括号 | hi() | hi |

三个补充规则：定义必须在调用之前；定义和调用之间空一行；同一文件里函数名不能重复，后定义的会悄悄覆盖前一个，而且不报错。

## 四、逐步演示

第一步，只写定义，运行后屏幕应该什么都没有。

第二步，末尾顶格写 say_hello()，再运行，两行都出现了。

第三步，再写一行调用，输出变成四行——代码一份，效果两次。

第四步，把调用挪到定义上面，看 NameError 的报错，再改回来。

## 五、深入一层：定义和调用，电脑具体做了什么

把这两件事分开看，很多怪现象就解释得通了。

| 阶段 | 电脑做了什么 | 屏幕上有没有输出 |
| --- | --- | --- |
| 定义（def 那几行） | 把整块代码打包，用一个名字挂在内存里 | 没有，一行都不执行 |
| 调用（名字加括号） | 跳进函数体，从上往下执行，遇到 return 或末尾再回来 | 取决于函数体里有没有 print |

所以下面这段代码只定义不调用，运行结果是「什么都没发生」：

def say_hi():
    print('你好')

原因很明确：登记而已，没人喊它。

调用发生的时候，电脑会记一笔「我是从第几行来的」，执行完再从那儿继续。这个记录机制叫调用栈，后面学递归时会反复用到——递归太深报的 RecursionError，就是这笔账记满了。

还有个细节：函数体里可以再调用别的函数。调用的那一刻才去找那个名字，所以只要在真正调用之前定义好，顺序上略有前后也能跑。但为了让读代码的人不头疼，习惯上还是把定义写在调用的上面。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 运行后没有输出 | 只定义没调用 | 补一行名字加括号 |
| NameError: name xxx is not defined | 调用写在定义之前 | 把 def 移到上面 |
| 输出里出现 function 字样 | 只写名字没加括号 | 补上括号 |
| IndentationError: expected an indented block | def 下面没缩进 | 缩进 4 格 |

一个函数可以被调用零次、一次、一百次。

## 七、一个小结

一句话收束这一课：def 是登记，括号是启动。看到「函数写了却没反应」，先找有没有括号；看到「打印出来是 function 而不是结果」，就是忘了括号。
`,
    examples: [
      {
        title: '定义之后什么都没发生',
        intro: '先定义，再输出提示，最后调用两次。',
        code: `def say_hello():
    print("你好，我是函数")
    print("我正在被执行")

print("--- 定义完了，上面什么都没发生 ---")

say_hello()
say_hello()`,
        expectedOutput: `--- 定义完了，上面什么都没发生 ---
你好，我是函数
我正在被执行
你好，我是函数
我正在被执行`,
        lines: [
          { code: 'def say_hello():', explain: '登记函数，冒号表示「下面属于我」。' },
          { code: '    print("你好，我是函数")', explain: '缩进 4 格，定义阶段不执行。' },
          { code: 'say_hello()', explain: '第一次调用：跳进函数体执行两行 print，屏幕上出现两行。' },
        ],
        trace: [
          { step: '第 1-3 行', state: '登记函数，无输出' },
          { step: '第 5-8 行', state: '一行提示加两次调用的四行输出' },
        ],
      },
      {
        title: '加括号和不加括号，拿到的是两种东西',
        intro: '用 type 直接问 Python 它是什么类型。',
        code: `def greet():
    return "你好"

print(type(greet))
print(type(greet()))`,
        expectedOutput: `<class 'function'>
<class 'str'>`,
        lines: [
          { code: 'type(greet)', explain: '不加括号：拿到函数本身，类型是 function。' },
          { code: 'type(greet())', explain: '加括号：先执行拿到「你好」，类型是 str。' },
          { code: 'print(type(greet()))', explain: '对比两行输出：一个是 function，一个是 str，这就是加不加括号的分水岭。' },
        ],
        trace: [
          { step: '第 1-2 行', state: '登记 greet，未执行' },
          { step: '第 4-5 行', state: '先输出 function，再输出 str' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '定义（def）',
        conceptB: '调用（名字加括号）',
        diff: '定义只登记不执行；调用才执行函数体，调几次执行几次。',
      },
    ],
    pitfalls: [
      '定义完忘了写调用，看到空白以为代码错了。',
      '调用写在定义上面，报 NameError。',
      '只写函数名不写括号，程序什么都不做。',
      'def 行漏冒号，或函数体忘记缩进。',
    ],
    keyPoints: [
      'def 只登记不执行，调用才执行。',
      '调用写法是名字加一对括号。',
      '定义必须在调用之前。',
      '不加括号拿函数对象，加上才拿结果。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第4章 函数' },
    ],
    prerequisites: ['s5-01'],
    task: '写一个无参函数输出三个学习目标，分别调用零次、一次、三次，观察输出行数。',
    exercises: [
      {
        id: 's5-02-q1',
        qtype: 'boolean',
        stem: '函数只要定义好，程序运行时就会自动执行一次。',
        answer: '错',
        explanation:
          '答案：错。\n思路：定义只是登记，执行靠调用。\n逐步演示：只有 def 没有调用的文件，运行后屏幕空白。\n易错提醒：「我明明写了却没反应」九成是忘了调用。',
      },
      {
        id: 's5-02-q2',
        qtype: 'single',
        stem: '调用一个无参函数，正确的写法是哪一个？',
        options: ['A. 函数名', 'B. 函数名()', 'C. 函数名:', 'D. def 函数名'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：调用 = 名字加一对括号。\n逐步演示：A 只是引用；C 语法错误；D 是定义开头。\n易错提醒：无参函数括号空着，但不能省。',
      },
      {
        id: 's5-02-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请按顺序写出完整输出。',
        code: 'def hi():\n    print("A")\n    print("B")\n\nhi()\nprint("C")',
        keywords: [['A'], ['B'], ['C']],
        explanation:
          '答案：依次输出 A、B、C，各占一行。\n思路：hi() 执行函数体两行，再回到主程序。\n逐步演示：第 5 行输出 A、B；第 6 行输出 C。\n易错提醒：C 不会在 A 前面。',
      },
      {
        id: 's5-02-q4',
        qtype: 'blank',
        stem: '只写函数名、不写括号时，你拿到的是这个函数______，而不是执行结果。',
        answer: '本身',
        accepted: ['本身', '对象', '函数对象', '自己', '本体'],
        explanation:
          '答案：本身（函数对象）。\n思路：括号才是执行动作。\n逐步演示：type(greet) 得 function，加括号得 str。\n易错提醒：不加括号不报错，所以特别难找。',
      },
      {
        id: 's5-02-q5',
        qtype: 'program',
        stem: '定义 hello() 输出「你好」、bye() 输出「再见」，主程序先调 hello 两次再调 bye 一次，输出三行：你好、你好、再见',
        answer: '',
        testCases: [{ stdin: '', expected: '你好\n你好\n再见' }],
        explanation:
          '答案（参考答案）：\ndef hello():\n    print("你好")\n\ndef bye():\n    print("再见")\n\nhello()\nhello()\nbye()\n\n思路：两个函数各管一件事，主程序安排顺序。\n逐步演示：定义不执行，两次 hello() 各输出一行。\n易错提醒：调用要顶格写。',
      },
    ],
    minutes: 15,
    env: 'browser',
  },
  {
    id: 's5-03',
    stageId: 5,
    order: 3,
    title: '参数与返回值',
    subtitle: '函数怎么收数据，又怎么把结果交回来',
    hook: '两个函数都算出了 120，一个的结果能继续计算，另一个只能看一眼就没了。差别在哪？',
    objectives: [
      '用位置参数把数据传进函数',
      '用 return 把结果交回调用方',
      '说出 return 与 print 的区别',
    ],
    analogy: 'print 是把结果贴在公告栏上给大家看；return 是把结果装进信封递给叫你干活的人。',
    terms: [
      { term: '参数', plain: '定义时括号里的占位名字。' },
      { term: '实参', plain: '调用时真正传进去的值。' },
      { term: 'None', plain: '表示什么都没有，没写 return 时默认返回它。' },
    ],
    content: `## 一、为什么需要它：函数要能收能交

只会打印的函数，像一台只会喊号码的取餐机：你听得到，但拿不到东西。

**参数负责进，return 负责出。** 有了进和出，函数才能像积木一样拼接。

## 二、概念解释：进与出

| 概念 | 位置 | 作用 |
| --- | --- | --- |
| 参数 | 定义时的括号里 | 声明我需要几个数据 |
| 实参 | 调用时的括号里 | 真正递进去的值 |
| return | 函数体里 | 交回结果并结束函数 |

调用 bmi(55, 1.65) 时，55 按位置传给第一个参数。顺序错了结果就错，而且不报错。

return 有两个作用：**交回结果**，以及**立刻结束整个函数**。写在 return 后面的代码永远不会执行。如果函数里没有 return，Python 会悄悄返回 None。

## 三、语法与使用规则

| 写法 | 说明 | 例子 |
| --- | --- | --- |
| def 名(参数1, 参数2): | 声明两个参数 | def bmi(weight, height): |
| 名(值1, 值2) | 按顺序传值 | bmi(55, 1.65) |
| return 表达式 | 交回结果并结束 | return w / h ** 2 |
| 不写 return | 返回 None | 只 print 的函数 |

三条必记：参数个数要对上，少传一个报 TypeError；return 一旦执行函数立刻结束；return 可以返回任何东西。

## 四、逐步演示

第一步，写只打印的函数，x = 函数(...) 时 x 是 None。

第二步，把 print 换成 return，x 才是那个数字。

第三步，写 print(x * 2)，看它能不能算出新结果。

第四步，在 return 下面再写一行 print，运行后它不会出现。

## 五、深入一层：return 的三个细节

第一个细节：没有 return，函数照样会「返回」，返回的是 None。很多人以为不写 return 就没有返回值，其实拿到的是 None，打印出来是 None，参与加法就报 TypeError。

第二个细节：return 一执行，函数立刻结束，后面的代码是死代码。

def check(n):
    if n < 0:
        return '负数'
        print('这行永远不执行')
    return '非负'

第三个细节：return a, b 返回的不是两个值，是**一个元组**。调用处写 x, y = f() 之所以能接住，是因为元组可以拆包；写成 result = f() 就得到 (a, b) 这个整体。

| 写法 | 拿到的东西 | 之后能做什么 |
| --- | --- | --- |
| print(x) 结尾 | None | 几乎什么都不能做 |
| return x | x 本身 | 继续运算、存起来、再传给别人 |
| return a, b | 元组 (a, b) | 可拆包，也可当整体用 |

一句话总结：**print 是给人看的，return 是给程序用的。** 想让结果继续参与计算，就必须 return。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 打印对了，变量却是 None | 只 print 没 return | 改成 return |
| TypeError: missing required argument | 参数给少了 | 补齐参数 |
| 结果算错但没报错 | 参数顺序传反 | 按定义顺序传 |
| return 后面的代码不执行 | return 立刻结束函数 | 代码放到前面 |

记一句话：**print 给眼睛看，return 给程序用。**

## 七、参数是怎么对上的

最后把「参数怎么对上」这件事说透。调用 bmi(55, 1.65) 时，Python 按**位置**把 55 交给第一个参数 weight、1.65 交给第二个 height。名字只是函数内部的叫法，调用方不需要知道。

于是有个推论：参数的**顺序**是契约。定义是 bmi(weight, height)，调用时传成 bmi(1.65, 55)，语法完全合法，结果却是身高 55 米、体重 1.65 公斤，算出来一个荒唐的 BMI。程序不会报错，因为它不知道你想表达什么。

这就是为什么参数一多就该用关键字参数（下一课的内容）：把顺序靠记忆改成靠名字，错误立刻显形。
`,
    examples: [
      {
        title: '两个参数，一个返回值',
        intro: '函数收体重和身高，算出 BMI 交回结果。',
        code: `def bmi(weight, height):
    return round(weight / (height ** 2), 1)

print("A 的 BMI：", bmi(55, 1.65))
print("B 的 BMI：", bmi(70, 1.78))`,
        expectedOutput: `A 的 BMI： 20.2
B 的 BMI： 22.1`,
        lines: [
          { code: 'def bmi(weight, height):', explain: '按位置对应：先体重，后身高。' },
          { code: 'round(..., 1)', explain: '两个星号是乘方，round 保留 1 位小数。' },
          { code: 'print("A 的 BMI：", bmi(55, 1.65))', explain: '调用时 55 交给 weight、1.65 交给 height，返回值直接进了 print。' },
        ],
        trace: [
          { step: '调用 bmi(55, 1.65)', state: '1.65 的平方是 2.7225' },
          { step: '做除法', state: '20.2020...，返回 20.2' },
        ],
      },
      {
        title: 'print 和 return 的对照实验',
        intro: '两个函数做同一件事，只差最后一步。',
        code: `def total_print(price, count):
    print("合计", price * count)

def total_return(price, count):
    return price * count

result = total_print(30, 4)
print("print 版本的返回值：", result)

result2 = total_return(30, 4)
print("return 版本拿到的值：", result2)
print("这个值还能继续算：", result2 * 2)`,
        expectedOutput: `合计 120
print 版本的返回值： None
return 版本拿到的值： 120
这个值还能继续算： 240`,
        lines: [
          { code: 'print("合计", price * count)', explain: '只显示，没有交回值。' },
          { code: 'result = total_print(30, 4)', explain: '有一行输出，但 result 是 None。' },
          { code: 'result2 * 2', explain: 'result2 真的是 120，能继续算。' },
        ],
        trace: [
          { step: '调用 total_print', state: '输出「合计 120」，返回 None' },
          { step: '调用 total_return', state: '返回 120，再输出 120 与 240' },
        ],
      },
    ],
    compare: [
      {
        conceptA: 'print',
        conceptB: 'return',
        diff: 'print 只显示，函数依然返回 None；return 把值交给调用方，屏幕上不显示但能继续计算。',
      },
    ],
    pitfalls: [
      '只 print 不 return，调用方拿到 None。',
      '在 return 后面继续写代码，那是死代码。',
      '参数顺序传反，不报错但结果荒谬。',
      '以为 print 出来的东西能被别处使用。',
    ],
    keyPoints: [
      '参数负责进，return 负责出。',
      'return 交回结果并立刻结束函数。',
      '没写 return 的函数返回 None。',
      'print 给眼睛看，return 给程序用。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第4章 函数' },
    ],
    prerequisites: ['s5-02'],
    task: '写两个版本的体温判断函数：一个只 print，一个 return，用变量接收返回值并打印。',
    exercises: [
      {
        id: 's5-03-q1',
        qtype: 'single',
        stem: '关于 print 和 return，下面哪种说法正确？',
        options: [
          'A. print 把结果交给调用方',
          'B. return 把结果交给调用方，print 只是显示',
          'C. 两者完全一样',
          'D. return 只能用在循环里',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：print 是输出，return 是返回值。\n逐步演示：只 print 的函数，用变量接收得到 None。\n易错提醒：能打印出结果不代表调用方拿到了结果。',
      },
      {
        id: 's5-03-q2',
        qtype: 'boolean',
        stem: '一个函数里没有写 return，调用它得到的结果是 None。',
        answer: '对',
        explanation:
          '答案：对。\n思路：执行完没遇到 return，自动返回 None。\n逐步演示：def f(): print("hi") 执行 x = f()，x 是 None。\n易错提醒：None 不是 0，拿它运算会 TypeError。 易错提醒：None 不是 0，拿它运算会 TypeError。延伸一句：判断函数有没有返回值，最直接的办法是把调用结果赋给变量再打印出来看。',
      },
      {
        id: 's5-03-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行完整输出。',
        code: 'def add(a, b):\n    print(a + b)\n\nx = add(2, 3)\nprint(x)',
        keywords: [['5'], ['None']],
        explanation:
          '答案：第一行 5，第二行 None。\n思路：函数里是 print 不是 return。\n逐步演示：先输出 5；没有 return 所以返回 None。\n易错提醒：很多人以为第二行也是 5。',
      },
      {
        id: 's5-03-q4',
        qtype: 'code-complete',
        stem: '下面函数想返回 n 的两倍，主程序应输出 12。请补全空缺处的关键字。',
        code: 'def double(n):\n    ____ n * 2\n\nprint(double(6))',
        keywords: [['return', '返回'], ['12']],
        explanation:
          '答案：return。\n思路：要把值交回调用方只能用 return。\n逐步演示：补成 return n * 2，n 为 6 时返回 12。\n易错提醒：填 print 会输出 12 和 None 两行。 易错提醒：填 print 会输出 12 和 None 两行。延伸一句：凡是「主程序还要拿这个结果继续算」的场合，都只能用 return。',
      },
      {
        id: 's5-03-q5',
        qtype: 'program',
        stem: '定义 area(width, height) 返回面积，输出两行：\n房间 A 的面积 12\n两间合计 27\n\n（A 宽 3 高 4；B 宽 5 高 3）',
        answer: '',
        testCases: [{ stdin: '', expected: '房间 A 的面积 12\n两间合计 27' }],
        explanation:
          '答案（参考答案）：\ndef area(width, height):\n    return width * height\n\na = area(3, 4)\nb = area(5, 3)\nprint("房间 A 的面积", a)\nprint("两间合计", a + b)\n\n思路：函数只算并返回，输出交给主程序。\n逐步演示：12 与 15，合计 27。\n易错提醒：函数里用 print 的话，a 和 b 都是 None。',
      },
    ],
    visual: {
      kind: 'function',
      title: '同一件事，两种收尾方式',
      description: '左边只把结果喊出来，右边把结果装进信封递回去。',
      calls: [
        { name: 'bmi', args: 'weight=55, height=1.65', returns: '20.2（交回调用方）' },
        { name: 'total_print', args: 'price=30, count=4', returns: 'None（只打印）' },
        { name: 'total_return', args: 'price=30, count=4', returns: '120（乘 2 得 240）' },
      ],
    },
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's5-04',
    stageId: 5,
    order: 4,
    title: '默认参数与关键字参数',
    subtitle: '能省的参数、能读懂顺序的写法',
    hook: '参数一多，你自己都记不清第三个位置该填什么。有没有办法让调用更省事？',
    objectives: [
      '给参数设置默认值，让调用可以省略',
      '说出默认参数为什么必须放在后面',
      '用关键字参数调用，让顺序无关',
    ],
    analogy: '默认参数像奶茶店的默认配置：不说就是常温三分糖；关键字参数像点单时说「少冰」。',
    terms: [
      { term: '默认参数', plain: '定义时给了默认值，调用不传就用它。' },
      { term: '关键字参数', plain: '调用时写「参数名=值」，按名字对应。' },
      { term: '必填参数', plain: '没有默认值，调用时必须传。' },
    ],
    content: `## 一、为什么需要它：参数一多就难用

函数如果所有参数都必须传，调用方就被绑死了。

默认参数解决「能省」：给参数一个常用值，不传就用它。关键字参数解决「好读」：make(True, False, 3) 没人知道是什么，改成带名字的写法一眼就懂。

## 二、概念解释：默认值与名字对应

默认参数写在定义处，形式是 参数名=默认值。关键字参数写在调用处，形式是 参数名=值，它告诉 Python 这个值给谁。

关键规则：**有默认值的参数必须放在没有默认值的参数后面。** def f(a=1, b) 会直接语法错误，因为第一个位置被默认值占住后，后面的必填参数没法对应。

## 三、语法与使用规则

| 写法 | 含义 | 是否合法 |
| --- | --- | --- |
| def f(a, b=2): | b 有默认值，放后面 | 合法 |
| def f(a=1, b): | 默认参数在前 | 报错 |
| f(b=3, a=1) | 关键字参数，顺序打乱 | 合法 |
| f(a=1, 3) | 关键字在前、位置在后 | 报错 |

混用只有一条铁律：**位置参数必须全部写在关键字参数前面。** 同一个参数也不能既按位置又按名字传，f(1, a=2) 会报 got multiple values。

## 四、逐步演示

第一步，定义 greet(name, greeting="你好")，只传 name，观察用的是默认问候语。

第二步，传第二个参数覆盖默认值，输出随之改变。

第三步，改用 greet(greeting="晚上好", name="小张")，顺序反了也正确。

第四步，把默认参数写到前面，运行看报错。

## 五、深入一层：默认值只在定义时算一次

这是最容易踩的一个坑。默认值在函数**定义**的时候就已经算好存起来了，不是每次调用重新算。

def add_item(item, box=[]):
    box.append(item)
    return box

print(add_item('苹果'))
print(add_item('香蕉'))

第二行打印出来是 ['苹果', '香蕉']，不是只有香蕉。因为那个空列表在定义时就建好了，两次调用共用同一个。想避开这个坑，默认值写 None，函数体里再判断：

def add_item(item, box=None):
    if box is None:
        box = []
    box.append(item)
    return box

还有两条调用规则要记牢：位置参数必须写在关键字参数前面，order('咖啡', count=2) 合法，order(count=2, '咖啡') 直接语法错误；同一个参数不能既按位置传又按关键字传，order('咖啡', item='牛奶') 会报「传了多个值」。

默认值适合「绝大多数情况都这样」的参数，比如打印的分隔符、保留几位小数。如果某个参数十次调用有八次都要显式传，那就不该给它默认值——默认值反而成了干扰。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| non-default argument follows default argument | 默认参数写在前面 | 挪到最后 |
| positional argument follows keyword argument | 位置参数写在关键字后 | 位置参数提前 |
| got multiple values for argument | 同一参数传了两次 | 只保留一种 |
| unexpected keyword argument | 关键字名字拼错 | 核对参数名 |

参数超过三个时优先用关键字调用，可读性比省下的几个字重要。

## 七、默认值该给谁

判断标准可以更具体一点：看这个参数「不传的时候，有没有一个天然合理的选择」。打印分隔符默认空格、保留小数默认两位，都属于此列；而单价、数量这类核心数据没有合理默认值，给了默认值反而会让漏传参数的错误被悄悄吞掉。
`,
    examples: [
      {
        title: '默认值让第二个参数可以省略',
        intro: '三种调用：只传姓名、按位置传两个、用关键字传第二个。',
        code: `def greet(name, greeting="你好"):
    return greeting + "，" + name

print(greet("小林"))
print(greet("小王", "早上好"))
print(greet("小张", greeting="晚上好"))`,
        expectedOutput: `你好，小林
早上好，小王
晚上好，小张`,
        lines: [
          { code: 'def greet(name, greeting="你好"):', explain: 'greeting 有默认值，必须写在后面。' },
          { code: 'greet("小张", greeting="晚上好")', explain: '用关键字指定，意图清楚。' },
          { code: 'print(greet("小林"))', explain: '只传一个名字，greeting 用默认的「你好」，输出「你好，小林」。' },
        ],
        trace: [
          { step: '第 4 行', state: '只传 name，用默认值' },
          { step: '第 5-6 行', state: '第二个参数被覆盖' },
        ],
      },
      {
        title: '关键字参数让顺序不再重要',
        intro: '故意打乱顺序，还混用两种传法。',
        code: `def order(item, count=1, note="无"):
    return item + " x" + str(count) + "（" + note + "）"

print(order("咖啡"))
print(order("咖啡", 3))
print(order(count=2, item="面包"))
print(order("牛奶", note="加冰"))`,
        expectedOutput: `咖啡 x1（无）
咖啡 x3（无）
面包 x2（无）
牛奶 x1（加冰）`,
        lines: [
          { code: 'def order(item, count=1, note="无"):', explain: '默认值全部排在后面。' },
          { code: 'order(count=2, item="面包")', explain: '顺序与定义相反也没关系。' },
          { code: 'print(order("咖啡"))', explain: '只传品名，count 用 1、note 用「无」，输出「咖啡 x1（无）」。' },
        ],
        trace: [
          { step: '第 4-5 行', state: 'count 从 1 变 3' },
          { step: '第 6-7 行', state: '按名字赋值，输出「面包 x2」「牛奶 x1」' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '位置参数',
        conceptB: '关键字参数',
        diff: '位置靠顺序对应，写得短但要看记忆；关键字靠名字对应，顺序无关、意图明确。',
      },
    ],
    pitfalls: [
      '默认参数写在必填参数前面，语法错误。',
      '位置参数写在关键字参数后面，语法错误。',
      '同一个参数既按位置又按名字传。',
      '关键字名拼错，报 unexpected keyword argument。',
    ],
    keyPoints: [
      '默认参数让调用可省略，必须放在后面。',
      '关键字参数按名字对应，顺序可打乱。',
      '混用铁律：位置参数全写在关键字前面。',
      '参数多时用关键字调用。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第4章 函数' },
    ],
    prerequisites: ['s5-03'],
    task: '写一个发通知的函数，参数是收件人、标题（默认「通知」）、内容（默认空），用三种方式各调用一次。',
    exercises: [
      {
        id: 's5-04-q1',
        qtype: 'single',
        stem: '定义 def f(a, b=1) 时，带默认值的参数应该放在什么位置？',
        options: ['A. 最前面', 'B. 最后面', 'C. 任意位置', 'D. 另写一个函数'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：位置匹配从左往右，默认参数在前会让后面的必填参数没位置。\n逐步演示：def f(a=1, b) 直接报语法错误。\n易错提醒：这是语法强制，写反了跑不起来。',
      },
      {
        id: 's5-04-q2',
        qtype: 'blank',
        stem: '用关键字参数调用时，写法是「参数名 ______ 值」，例如 greet(name="小林")。',
        answer: '=',
        accepted: ['=', '等于号', '等号'],
        explanation:
          '答案：=（等号）。\n思路：关键字参数的形式就是 参数名=值。\n逐步演示：greet(greeting="早上好", name="小王") 按名字对应。\n易错提醒：这是赋值等号，不是两个等号。',
      },
      {
        id: 's5-04-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行结果。',
        code: 'def area(w, h=2):\n    return w * h\n\nprint(area(5))\nprint(area(5, 3))',
        keywords: [['10'], ['15']],
        explanation:
          '答案：第一行 10，第二行 15。\n思路：第一次只传 w，h 用默认值 2。\n逐步演示：area(5) 等于 area(5, 2)。\n易错提醒：默认值只在「不传」时生效。 易错提醒：默认值只在「不传」时生效。延伸一句：数一数调用时给了几个位置参数，剩下的才由默认值补上，这样就不会猜错。',
      },
      {
        id: 's5-04-q4',
        qtype: 'blank',
        stem: '关键字参数之所以能打乱顺序，是因为 Python 按参数______匹配，而不是按位置。',
        answer: '名',
        accepted: ['名', '名称', '名字', '参数名'],
        explanation:
          '答案：名（参数名）。\n思路：位置靠第几个对应，关键字靠叫什么对应。\n逐步演示：order(count=2, item="面包") 按名字填值。\n易错提醒：名字必须与定义完全一致。',
      },
      {
        id: 's5-04-q5',
        qtype: 'program',
        stem: '定义 wrap(text, left="[", right="]") 返回夹在括号间的字符串，输出三行：\n[重要]\n【提示】\n(完成)',
        answer: '',
        testCases: [{ stdin: '', expected: '[重要]\n【提示】\n(完成)' }],
        explanation:
          '答案（参考答案）：\ndef wrap(text, left="[", right="]"):\n    return left + text + right\n\nprint(wrap("重要"))\nprint(wrap("提示", left="【", right="】"))\nprint(wrap("完成", "(", ")"))\n\n思路：默认参数管常用情况，关键字管特殊符号。\n逐步演示：第一次全默认，后两次换括号。\n易错提醒：第三个参数只传 right 不行。',
      },
    ],
    minutes: 16,
    env: 'browser',
  },
  {
    id: 's5-05',
    stageId: 5,
    order: 5,
    title: '可变参数 *args 与 **kwargs',
    subtitle: '为什么 print 能接一百个参数',
    hook: 'print 你给它一个参数它能打，给它五个也能打。它怎么知道你会传几个？',
    objectives: [
      '用 *args 接收数量不定的位置参数',
      '用 **kwargs 接收数量不定的关键字参数',
      '说出星号参数被收成了什么类型',
    ],
    analogy: '一个能伸缩的口袋：东西一件件丢进去，它自己收成一包。',
    terms: [
      { term: '可变参数', plain: '数量不固定的参数。' },
      { term: 'args', plain: '约定名字，装位置参数，类型是元组。' },
      { term: 'kwargs', plain: '约定名字，装关键字参数，类型是字典。' },
    ],
    content: `## 一、为什么需要它：参数个数不固定

print("a") 可以，print("a", "b", 1, 2, 3) 也可以，它从不抱怨参数太多。原因就是定义里用了可变参数。

求和可能是 2 个数也可能是 20 个；打日志要附带任意多个字段；封装别人的函数时你不知道调用方会传什么。这些都需要可变参数。

## 二、概念解释：一个星号收元组，两个星号收字典

| 写法 | 收什么 | 内部类型 | 调用示例 |
| --- | --- | --- | --- |
| *args | 多余的位置参数 | 元组 | f(1, 2, 3) |
| **kwargs | 多余的关键字参数 | 字典 | f(a=1, b=2) |

星号不是「一个参数」，而是「把剩下的都收进来」。所以可以收一个值，也可以收一百个，收不到就是空的元组或字典，**不会报错**。

名字 args、kwargs 只是约定，写 *nums、**info 完全一样。魔法在星号上。

## 三、语法与使用规则

| 规则 | 说明 |
| --- | --- |
| 星号写在参数名前 | def f(*nums) |
| 一个星号收位置参数 | 收到元组，可 for 遍历 |
| 两个星号收关键字参数 | 收到字典，用 items() |
| 普通参数写在前面 | 否则会被收走 |

调用时也能用星号把列表拆开传：f(*[1, 2, 3]) 等价于 f(1, 2, 3)。

## 四、逐步演示

第一步，写 def add_all(*nums)，函数体第一行 print(nums)，看它打印出带小括号的一串。

第二步，用 for 遍历累加，调用时传 2 个、4 个、0 个各看一次。

第三步，写 def make_profile(name, **info)，用 items() 遍历打印键值对。

第四步，对照 print：它本质上是 print(*objects)。

## 五、深入一层：星号在定义处和调用处，方向正好相反

同一个星号，写在两个地方干的是两件相反的事：

| 出现位置 | 作用 | 例子 |
| --- | --- | --- |
| 函数定义里 | 把散着的参数**收**成一个 | def f(*args) 收到元组 |
| 函数调用里 | 把一个序列**拆**成散着的参数 | f(*[1, 2, 3]) 等于 f(1, 2, 3) |

一个星号收位置参数，收成**元组**，所以 args 能遍历、能 len、能 sum，但不能改。两个星号收关键字参数，收成**字典**，所以能 items() 遍历。

四类参数同时出现时，顺序是固定的，写错就语法错误：

| 顺序 | 类型 | 写法 |
| --- | --- | --- |
| 1 | 普通位置参数 | a, b |
| 2 | 默认参数 | c=1 |
| 3 | 可变位置参数 | *args |
| 4 | 可变关键字参数 | **kwargs |

print 能接一百个参数，靠的就是 def print(*args, sep=' ', end='\n') 这种签名：想打几个打几个，格式还能调。看懂这一条，星号参数就不再神秘。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 收到的永远只有一个值 | 忘了写星号 | 参数名前加星号 |
| takes 0 positional arguments | 定义没写星号却传多个 | 补上 *args |
| 遍历 kwargs 只拿到键 | 直接 for k in kwargs | 改用 items() |
| 参数被普通参数抢走 | 普通参数写在星号后 | 放最前面 |

可变参数很灵活，但会让签名变模糊；参数含义复杂时宁可写清楚几个具名参数。

## 七、一个容易忽略的细节

细节提醒：*args 收到的是元组，所以它不能被修改。想在函数里调整这批数据，先转成列表：nums = list(nums)。另外空调用是合法的，add_all() 会让 nums 变成空元组，返回 0——这也解释了为什么求和函数在没参数时不报错。
`,
    examples: [
      {
        title: '一个星号：想加几个数就加几个',
        intro: '传两个、传四个、一个都不传，都不报错。',
        code: `def add_all(*nums):
    print("收到的是：", nums)
    total = 0
    for n in nums:
        total = total + n
    return total

print(add_all(1, 2))
print(add_all(1, 2, 3, 4))
print(add_all())`,
        expectedOutput: `收到的是： (1, 2)
3
收到的是： (1, 2, 3, 4)
10
收到的是： ()
0`,
        lines: [
          { code: 'def add_all(*nums):', explain: '星号把位置参数收进 nums，类型是元组。' },
          { code: 'add_all()', explain: '不传时 nums 是空元组，返回 0。' },
          { code: 'print(add_all(1, 2, 3, 4))', explain: '传四个数，nums 就是 (1, 2, 3, 4)，累加得 10。' },
        ],
        trace: [
          { step: 'add_all(1, 2)', state: 'nums = (1, 2)，total = 3' },
          { step: 'add_all()', state: 'nums = ()，返回 0' },
        ],
      },
      {
        title: '两个星号：收一包带名字的配置',
        intro: '必填姓名在前，后面跟着数量不定的关键字参数。',
        code: `def make_profile(name, **info):
    print("姓名：", name)
    for key, value in info.items():
        print(" ", key, "=", value)

make_profile("小林", city="杭州", age=28)`,
        expectedOutput: `姓名： 小林
  city = 杭州
  age = 28`,
        lines: [
          { code: 'def make_profile(name, **info):', explain: '**info 把「名字=值」收成字典。' },
          { code: 'print(" ", key, "=", value)', explain: '第一个空格加逗号补的空格。' },
          { code: 'make_profile("小林", city="杭州", age=28)', explain: 'city 和 age 都进了 info 字典，name 按位置拿到「小林」。' },
        ],
        trace: [
          { step: '调用', state: 'info = {city: 杭州, age: 28}' },
          { step: '两次循环', state: '输出「  city = 杭州」与「  age = 28」' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '*args',
        conceptB: '**kwargs',
        diff: '一个星号收无名字的位置参数成元组；两个星号收带名字的关键字参数成字典。',
      },
    ],
    pitfalls: [
      '定义时忘写星号，所有参数被塞进第一个形参。',
      '遍历 kwargs 只拿到键，忘了 items()。',
      '普通参数写在 *args 后面，收不到值。',
      '以为 args、kwargs 是关键字，其实只是名字。',
    ],
    keyPoints: [
      '一个星号收位置参数成元组，两个星号收关键字参数成字典。',
      '收不到值时是空元组或空字典，不报错。',
      'args 和 kwargs 只是名字，起作用的是星号。',
      'print 能接任意多个参数，因为用了可变参数。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第4章 函数' },
    ],
    prerequisites: ['s5-04'],
    task: '写函数 report(title, *items, **meta)：打印标题、逐行打印 items、最后打印 meta。',
    exercises: [
      {
        id: 's5-05-q1',
        qtype: 'single',
        stem: '定义 def f(*nums)，调用 f(1, 2, 3) 时，nums 是什么类型？',
        options: ['A. 列表', 'B. 元组', 'C. 字典', 'D. 整数'],
        answer: 'B',
        explanation:
          '答案：B（元组）。\n思路：一个星号收集位置参数，结果是元组。\n逐步演示：print(nums) 输出 (1, 2, 3)。\n易错提醒：元组不能修改，要增删先转 list(nums)。',
      },
      {
        id: 's5-05-q2',
        qtype: 'blank',
        stem: '想接收数量不定的关键字参数，参数名前要写 ______（写出完整形式）。',
        answer: '**kwargs',
        accepted: ['**kwargs', '** kwarg', '**kw', '两个星号kwargs'],
        explanation:
          '答案：**kwargs。\n思路：一个星号收位置参数，两个星号收关键字参数。\n逐步演示：def f(**info) 调用 f(a=1) 后 info 是 {a: 1}。\n易错提醒：写成 *kwargs 传 a=1 会报错。',
      },
      {
        id: 's5-05-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行结果。',
        code: 'def total(*nums):\n    result = 0\n    for n in nums:\n        result = result + n\n    return result\n\nprint(total(1, 2, 3))\nprint(total())',
        keywords: [['6'], ['0']],
        explanation:
          '答案：第一行 6，第二行 0。\n思路：nums 收元组，逐个累加；空调用时元组为空。\n逐步演示：(1, 2, 3) 累加得 6；() 不循环。\n易错提醒：空调用不报错，这是可变参数的特点。',
      },
      {
        id: 's5-05-q4',
        qtype: 'code-complete',
        stem: '下面函数想对任意多个数求和并返回，主程序应输出 6。请补全空缺处的关键字。',
        code: 'def add_all(*nums):\n    total = 0\n    for n in nums:\n        total = total + n\n    ____ total\n\nprint(add_all(1, 2, 3))',
        keywords: [['return', '返回'], ['6']],
        explanation:
          '答案：return。\n思路：要让调用方拿到结果必须 return。\n逐步演示：累加得 6，返回后输出 6。\n易错提醒：改成 print 会多输出一个 None。 易错提醒：改成 print 会多输出一个 None。延伸一句：函数里既 print 又 return，是最常见的重复输出原因，写之前先想清楚结果是给谁看的。',
      },
      {
        id: 's5-05-q5',
        qtype: 'program',
        stem: '定义 average(*nums) 返回平均值，输出两行：\n平均 90.0\n平均 85.0\n\n（第一次传 80、90、100，第二次传 70、80、90、100）',
        answer: '',
        testCases: [{ stdin: '', expected: '平均 90.0\n平均 85.0' }],
        explanation:
          '答案（参考答案）：\ndef average(*nums):\n    return sum(nums) / len(nums)\n\nprint("平均", average(80, 90, 100))\nprint("平均", average(70, 80, 90, 100))\n\n思路：sum 求和、len 数个数。\n逐步演示：270 / 3 = 90.0；340 / 4 = 85.0。\n易错提醒：用整除符号会输出 90 和 85。 易错提醒：用整除符号会输出 90 和 85。延伸一句：nums 是元组，能直接传给 sum 和 len，不需要先转成列表。',
      },
    ],
    minutes: 17,
    env: 'browser',
  },
  {
    id: 's5-06',
    stageId: 5,
    order: 6,
    title: '局部变量与全局变量',
    subtitle: '函数里的变量，出了门就没人认识',
    hook: '函数里改了一个变量，回到外面一看，值根本没变。是没改成功吗？',
    objectives: [
      '说出局部变量和全局变量的区别',
      '解释函数内赋值为什么不影响外面',
      '用 global 修改全局变量并知道它的代价',
    ],
    analogy: '函数像一间独立办公室：你在里面新买一把椅子，出门带不走；墙上挂的制度你看得到。',
    terms: [
      { term: '局部变量', plain: '函数内部创建的变量，只在这个函数里存在。' },
      { term: '全局变量', plain: '函数外创建的变量，整个文件都能读。' },
      { term: 'global', plain: '声明「我要改外面那个全局变量」。' },
    ],
    content: `## 一、为什么需要它：同名不等于同一个

外面写 count = 10，函数里写 count = 99 并打印，结果是函数内 99、函数外还是 10。

其实改成功了——只是改的是另一个变量。**函数里的赋值语句会在函数内部新建一个局部变量**，它和外面那个刚好同名，却毫无关系。

## 二、概念解释：局部与全局

| 类型 | 在哪创建 | 谁能看见 | 活到什么时候 |
| --- | --- | --- | --- |
| 局部变量 | 函数内部 | 只有这个函数 | 函数结束就消失 |
| 全局变量 | 函数外部 | 整个文件 | 程序结束才消失 |

规则两句话：**函数内可以读全局变量；函数内赋值等于新建局部变量。**

Python 这样设计是为了保护你：调用函数只关心它返回什么，不用担心它顺手把别的变量改了。

## 三、语法与使用规则

| 需求 | 写法 | 说明 |
| --- | --- | --- |
| 读全局变量 | 直接用名字 | 不需要声明 |
| 函数内新建同名变量 | count = 99 | 不影响外面 |
| 修改全局变量 | global count | 写在函数体第一行 |

关于 global 三条建议：能不用就不用；非要用就写在最前面；一个函数改多个全局变量，说明职责太重该拆了。

## 四、逐步演示

第一步，全局 count = 10，函数内打印它，调用后看到 10，证明能读。

第二步，函数内加 count = 99，再调用：函数内 99、函数外 10。

第三步，函数体第一行加 global count，把赋值改成加法，连续调两次，外面打印 12。

第四步，删掉 global 再运行，外面又回到 10。

## 五、深入一层：global 为什么被劝退

global 能用，但在正经代码里很少见，原因有三个：

| 问题 | 具体表现 |
| --- | --- |
| 改不动来源 | 读函数时看不出它偷偷改了外面的什么 |
| 难测试 | 每次测试都要先摆好全局状态，测完还得复原 |
| 难排查 | 一个变量被十个函数改，出问题时不知道是谁干的 |

替代方案很直接：**把要改的值当参数传进去，把新值 return 出来。**

def add_one(count):
    return count + 1

count = add_one(count)

两行代码，函数变成纯粹的「进一个、出一个」，不碰外面的任何东西。这种函数最好测：给 10 得 11，跟环境无关。

那什么时候确实要用 global？写小型脚本、做状态计数器这类「图省事」的场景，或者学习阶段验证概念。一旦代码超过一两百行，或者要被别人调用，就该把 global 换掉。

顺带区分一个易混点：在函数里**读**全局变量不需要 global，只有**赋值**才需要。读的时候 Python 找不到本地名字，自然去外面找。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 函数内改了外面没变 | 赋值新建了局部变量 | 写 global |
| UnboundLocalError | 既赋值又读同一名字 | 用 global 或换名字 |
| NameError: 变量未定义 | 在函数外访问局部变量 | 用 return 带出来 |
| 用了 global 结果还不对 | global 写在赋值之后 | 移到最前面 |

global 是逃生出口，不是日常通道。函数最好的形态是「算完 return 出来」。

## 七、读和写的区别再强调一次

读和写的区别值得再强调一次，因为它是这一课唯一的硬规则：函数里**读**全局变量随便读，**赋值**才是新建局部变量。所以「我在函数里改了它，外面却没变」不是 Python 的 bug，是这条规则在起作用。
`,
    examples: [
      {
        title: '函数里的赋值，改的是另一个变量',
        intro: '两处 count，一处全局一处局部。',
        code: `count = 10

def change():
    count = 99
    print("函数内 count：", count)

change()
print("函数外 count：", count)`,
        expectedOutput: `函数内 count： 99
函数外 count： 10`,
        lines: [
          { code: 'count = 10', explain: '在函数外创建，这是全局变量。' },
          { code: 'count = 99', explain: '函数内赋值会新建局部 count。' },
          { code: 'print("函数外 count：", count)', explain: '外面仍然是 10：函数里的 99 是另一个变量，函数一结束就消失。' },
        ],
        trace: [
          { step: '第 1 行', state: '全局 count = 10' },
          { step: '调用 change()', state: '局部 99，外面仍是 10' },
        ],
      },
      {
        title: 'global：明确说要改外面那个',
        intro: '同一个例子加上 global，结果完全不同。',
        code: `count = 10

def add_one():
    global count
    count = count + 1

add_one()
add_one()
print("加了两次之后：", count)`,
        expectedOutput: `加了两次之后： 12`,
        lines: [
          { code: 'global count', explain: '声明下面指外面那个全局变量。' },
          { code: 'count = count + 1', explain: '读全局的 10，加 1 再写回。' },
          { code: 'add_one()', explain: '每调用一次全局 count 加 1，两次之后是 12。' },
        ],
        trace: [
          { step: '第一次调用', state: 'count = 11' },
          { step: '第二次调用', state: 'count = 12，输出 12' },
        ],
      },
    ],
    compare: [
      {
        conceptA: '局部变量',
        conceptB: '全局变量',
        diff: '局部在函数内创建、只在函数内可见、函数结束即消失；全局在顶层创建、哪里都能读。',
      },
    ],
    pitfalls: [
      '以为函数内赋值会改到外面同名变量。',
      '函数内先赋值后读同一名字，报 UnboundLocalError。',
      '在函数外访问函数内局部变量，报 NameError。',
      'global 写在赋值之后，看起来没生效。',
    ],
    keyPoints: [
      '函数内赋值会新建局部变量。',
      '函数内可以直接读全局变量。',
      '改全局必须用 global，且写在最前面。',
      '优先用参数和 return 传数据。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第4章 函数' },
    ],
    prerequisites: ['s5-03'],
    task: '写一个不用 global 的计数器：函数接收当前值返回加一后的值；再用 global 版本实现一次。',
    exercises: [
      {
        id: 's5-06-q1',
        qtype: 'boolean',
        stem: '函数内部新建的变量，函数执行结束后在外面仍然可以访问。',
        answer: '错',
        explanation:
          '答案：错。\n思路：局部变量的生命周期只到函数结束。\n逐步演示：函数里写 temp = 1，外面 print(temp) 报 NameError。\n易错提醒：想在外面用值，正确做法是 return。',
      },
      {
        id: 's5-06-q2',
        qtype: 'single',
        stem: '函数内写了一句 count = 99，而外面也有 count。这行代码做了什么？',
        options: ['A. 把外面那个改成 99', 'B. 在函数内新建了局部变量', 'C. 报错', 'D. 删掉全局变量'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：函数内出现赋值，Python 认为你要定义局部变量。\n逐步演示：调用后函数内是 99，外面不变。\n易错提醒：不报错，所以容易误判成改成功了。',
      },
      {
        id: 's5-06-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行完整输出。',
        code: 'n = 100\n\ndef change():\n    n = 5\n    print("里面", n)\n\nchange()\nprint("外面", n)',
        keywords: [['里面 5'], ['外面 100']],
        explanation:
          '答案：第一行「里面 5」，第二行「外面 100」。\n思路：函数内的 n = 5 是局部变量。\n逐步演示：调用时新建局部 n，结束后销毁。\n易错提醒：若加 global，第二行会变成「外面 5」。',
      },
      {
        id: 's5-06-q4',
        qtype: 'blank',
        stem: '如果确实要在函数内部修改全局变量，必须在函数体里用关键字 ______ 声明它。',
        answer: 'global',
        accepted: ['global', 'Global', 'GLOBAL'],
        explanation:
          '答案：global。\n思路：它告诉 Python「这个名字指外面的那个」。\n逐步演示：写 global count 后再 count = count + 1。\n易错提醒：必须写在函数体最前面。 易错提醒：必须写在函数体最前面。延伸一句：只读全局变量不用声明，只有赋值才需要，这是 global 最容易记混的地方。',
      },
      {
        id: 's5-06-q5',
        qtype: 'program',
        stem: '定义全局变量 total = 0，函数 add(n) 用 global 把 n 累加上去。依次调用 add(10)、add(20)、add(30)，输出一行：合计 60',
        answer: '',
        testCases: [{ stdin: '', expected: '合计 60' }],
        explanation:
          '答案（参考答案）：\ntotal = 0\n\ndef add(n):\n    global total\n    total = total + n\n\nadd(10)\nadd(20)\nadd(30)\nprint("合计", total)\n\n思路：全局 total 保存累计值。\n逐步演示：10、30、60 依次累积。\n易错提醒：漏写 global，输出「合计 0」。 易错提醒：漏写 global，输出「合计 0」。延伸一句：漏写时函数里的 total 是新建的局部变量，外面的 total 一直没动。',
      },
    ],
    minutes: 17,
    env: 'browser',
  },
  {
    id: 's5-07',
    stageId: 5,
    order: 7,
    title: '作用域 LEGB',
    subtitle: '四个抽屉，从近到远找名字',
    hook: '同一个名字 x，函数里有一份、外面也有一份，Python 到底听谁的？',
    objectives: [
      '说出 LEGB 四个字母各代表什么',
      '用 LEGB 顺序判断同名变量谁生效',
      '在嵌套函数里用 nonlocal 修改外层变量',
    ],
    analogy: '找东西：先翻自己抽屉，再翻爸妈房间，再翻客厅储物柜，最后才去楼下便利店。',
    terms: [
      { term: '作用域', plain: '一个名字能被看见的范围。' },
      { term: 'Local', plain: '当前函数内部，最近的一层。' },
      { term: 'Built-in', plain: 'Python 自带的名字，比如 print、len。' },
    ],
    content: `## 一、为什么需要它：同名变量听谁的

程序一大，变量名难免重复。所以 Python 有一套明确的查找规则，叫 LEGB。

L 是 Local（当前函数内），E 是 Enclosing（外层函数），G 是 Global（全局），B 是 Built-in（内置）。从 L 开始一层层往外，**第一个找到的就是它，后面一概不看**。

好处是每个函数都能放心用 i、temp 这些常见名字。

## 二、概念解释：四层抽屉

| 层级 | 位置 | 典型内容 |
| --- | --- | --- |
| Local | 当前函数体内 | 参数、函数里赋值的变量 |
| Enclosing | 外层嵌套函数 | 外层函数的变量 |
| Global | 文件顶层 | 模块级变量、函数名 |
| Built-in | Python 内置 | print、len、range |

一个名字被找到后，更外层的同名变量就被遮住了，但并没有消失。

嵌套函数有个特殊规则：内层可以读外层变量，但想修改必须用 nonlocal 声明。

## 三、语法与使用规则

| 需求 | 写法 | 作用范围 |
| --- | --- | --- |
| 读外层变量 | 直接用名字 | 内层函数能读 |
| 改外层函数变量 | nonlocal 名 | 只对外层有效 |
| 改全局变量 | global 名 | 只对全局有效 |

三条容易踩的规则：nonlocal 只能用在嵌套函数里；一个变量在函数里被赋过值，整个函数内它就是局部的，会导致 UnboundLocalError；内置名字可以被覆盖，写 len = 5 之后 len("abc") 会报错。

## 四、逐步演示

第一步，全局 x = "全局"，outer 里 x = "外层"，inner 里 x = "局部"，三层各打印一次。

第二步，删掉 inner 里的赋值，inner 就打印「外层」。

第三步，在 inner 里加 nonlocal x 并修改，看 outer 里的 x 有没有变。

第四步，把 nonlocal 改成 global，这次变的是最外层的 x。

## 五、深入一层：LEGB 现场推演一遍

名字查找就四个抽屉，从近到远：

| 字母 | 层 | 在哪 |
| --- | --- | --- |
| L | Local | 当前函数内部 |
| E | Enclosing | 外层嵌套函数 |
| G | Global | 模块顶层 |
| B | Built-in | Python 自带的 print、len 等 |

拿三层同名变量的例子走一遍：

x = '全局'
def outer():
    x = '嵌套'
    def inner():
        x = '局部'
        print(x)

inner 里打印时，先翻 L 找到「局部」，命中就停，根本不看外面。把 inner 里那行 x = '局部' 删掉，它才会翻到 E，打印「嵌套」。再把 outer 里的也删掉，才轮到 G 的「全局」。

nonlocal 是给 E 层用的：想改外层函数的变量，写 nonlocal x；想改最外面模块的，写 global x。两个关键字都必须写在函数体的最前面，写在赋值后面就是语法错误。

一个实用推论：**同名变量不要跨层乱用。** 内层想用外层的东西，起个不一样的名字，比背 LEGB 顺序省心得多。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| UnboundLocalError | 函数内某处赋值，整个函数内都是局部 | 用 global 或 nonlocal |
| 改了外层变量外面没变 | 少了 nonlocal | 赋值前加 nonlocal |
| nonlocal 报 SyntaxError | 没有外层函数 | 只在嵌套函数内用 |
| 内置函数突然不能用 | 变量名覆盖了 len、sum | 换个变量名 |

看懂 LEGB，读别人代码会快很多：先判断变量在哪一层创建。

## 七、一个自测方法

自测方法：写完嵌套函数，在每一层 print 一次同名变量，把输出从上到下读一遍。哪一层打印的值和你预期不一样，问题就在那一层的查找顺序上，不用猜。
`,
    examples: [
      {
        title: '三层同名变量，各说各的',
        intro: '三个 x 住在三层抽屉里，各打印一次。',
        code: `x = "全局"

def outer():
    x = "嵌套"
    def inner():
        x = "局部"
        print("inner 里看到：", x)
    inner()
    print("outer 里看到：", x)

outer()
print("最外层看到：", x)`,
        expectedOutput: `inner 里看到： 局部
outer 里看到： 嵌套
最外层看到： 全局`,
        lines: [
          { code: 'x = "全局"', explain: '最外层创建，属于 Global 层。' },
          { code: 'x = "局部"', explain: 'Local 层优先级最高。' },
          { code: 'print("inner 里看到：", x)', explain: 'inner 先从自己这层找，命中「局部」，外面两层都不看。' },
        ],
        trace: [
          { step: '第 1 行', state: 'Global：x = 全局' },
          { step: '进入 outer 与 inner', state: 'Enclosing：嵌套；Local：局部' },
        ],
      },
      {
        title: 'nonlocal：改的是外层，不是全局',
        intro: '内层函数修改外层计数器，counter 返回的是内层函数本身。',
        code: `def counter():
    n = 0
    def step():
        nonlocal n
        n = n + 1
        return n
    return step

c = counter()
print(c())
print(c())
print(c())`,
        expectedOutput: `1
2
3`,
        lines: [
          { code: 'nonlocal n', explain: '声明下面改的是外层函数的 n。' },
          { code: 'return step', explain: '返回内层函数本身，不执行。' },
          { code: 'print(c())', explain: 'c 是 inner 那个函数，每调一次 n 加 1，依次输出 1、2、3。' },
        ],
        trace: [
          { step: '调用 counter()', state: '创建 n = 0，返回 step' },
          { step: '三次 c()', state: 'n 依次为 1、2、3' },
        ],
      },
    ],
    compare: [
      {
        conceptA: 'global',
        conceptB: 'nonlocal',
        diff: 'global 指向最外层全局变量；nonlocal 指向最近一层外层函数里的变量。',
      },
    ],
    pitfalls: [
      '函数内先使用后赋值同一变量，报 UnboundLocalError。',
      '想改外层变量却只写名字，结果新建了局部变量。',
      '在最外层函数用 nonlocal，报没有外层作用域。',
      '用 len、sum 当变量名，覆盖了内置函数。',
    ],
    keyPoints: [
      'LEGB：Local → Enclosing → Global → Built-in。',
      '找到第一个就停，外层同名变量被遮住但依然存在。',
      '内层读外层不用声明，改必须用 nonlocal。',
      '作用域隔离让函数能放心用常见名字。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第4章 函数' },
    ],
    prerequisites: ['s5-06'],
    task: '写一个嵌套函数：外层保存基数，内层接收一个数返回两数之和，再改成用 nonlocal 修改基数。',
    exercises: [
      {
        id: 's5-07-q1',
        qtype: 'single',
        stem: 'Python 查找变量名的顺序，正确的是哪一个？',
        options: [
          'A. 全局 → 局部 → 内置 → 外层',
          'B. 局部 → 外层函数 → 全局 → 内置',
          'C. 内置 → 全局 → 局部 → 外层',
          'D. 外层 → 局部 → 内置 → 全局',
        ],
        answer: 'B',
        explanation:
          '答案：B，也就是 LEGB。\n思路：从最近的作用域开始，找不到才往外走。\n逐步演示：L 当前函数、E 外层、G 全局、B 内置。\n易错提醒：顺序反过来解释不了同名变量覆盖现象。',
      },
      {
        id: 's5-07-q2',
        qtype: 'blank',
        stem: '在嵌套函数里想修改外层函数的变量，需要用的关键字是 ______。',
        answer: 'nonlocal',
        accepted: ['nonlocal', 'non-local', 'Nonlocal'],
        explanation:
          '答案：nonlocal。\n思路：它的意思是「不是本地的，也不是全局的」。\n逐步演示：写 nonlocal n 后再 n = n + 1，改的是外层 n。\n易错提醒：改全局要用 global。',
      },
      {
        id: 's5-07-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出一行结果。',
        code: 'x = "全局"\n\ndef outer():\n    x = "外层"\n    def inner():\n        print(x)\n    inner()\n\nouter()',
        keywords: [['外层'], ['Enclosing', '嵌套']],
        explanation:
          '答案：输出「外层」。\n思路：inner 内部没有 x，往上一层找。\n逐步演示：Local 没有；Enclosing 找到「外层」。\n易错提醒：只要外层有，就轮不到全局。',
      },
      {
        id: 's5-07-q4',
        qtype: 'blank',
        stem: 'LEGB 四个字母里，L 代表的是 ______ 作用域（写出英文单词）。',
        answer: 'Local',
        accepted: ['Local', 'local', '局部', '局部作用域'],
        explanation:
          '答案：Local（局部）。\n思路：L 是最近的一层，当前函数内部。\n逐步演示：参数和函数体内赋值的变量都属于 Local。\n易错提醒：不要和 Global 混。',
      },
      {
        id: 's5-07-q5',
        qtype: 'program',
        stem: '写嵌套函数 make_counter()：n 初始为 100，内层函数每次调用把 n 加 10 并返回，外层返回内层函数。调用两次输出两行：110、120',
        answer: '',
        testCases: [{ stdin: '', expected: '110\n120' }],
        explanation:
          '答案（参考答案）：\ndef make_counter():\n    n = 100\n    def step():\n        nonlocal n\n        n = n + 10\n        return n\n    return step\n\nc = make_counter()\nprint(c())\nprint(c())\n\n思路：n 属于外层作用域，内层修改必须用 nonlocal。\n逐步演示：第一次 110，第二次 120。\n易错提醒：漏写 nonlocal 会报 UnboundLocalError。',
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's5-08',
    stageId: 5,
    order: 8,
    title: '匿名函数与高阶函数',
    subtitle: '一行写完的小函数，和把函数当参数传',
    hook: '排序名单时，按名字排、按分数排，除了那一句比较规则，其余代码完全一样。难道要写两个排序函数？',
    objectives: [
      '写出 lambda 并判断什么场景适合用它',
      '说清函数为什么能像数字一样被传递',
      '用 map、filter、sorted 的 key 处理数据',
    ],
    analogy: 'lambda 像一次性餐具，适合临时用一下；def 函数像正规餐具，适合天天用。',
    terms: [
      { term: 'lambda', plain: '一行写完的匿名函数，冒号右边是返回值。' },
      { term: '高阶函数', plain: '接收函数作为参数，或返回一个函数。' },
      { term: 'key 参数', plain: 'sorted 用来指定按什么规则比较。' },
    ],
    content: `## 一、为什么需要它：只差一句规则

要把名单按分数排。不用高阶函数的话，你得为每种排序写一遍完整算法，真正的差别只有一行：比较什么。

Python 的解法是把「比较规则」抽出来当参数传：sorted(名单, key=规则)。规则本身就是一个函数，短到不值得为它起名字，这就是 lambda 的用武之地。

## 二、概念解释：函数也是一种值

在 Python 里，函数和数字、字符串一样，可以被赋值、被传递。你能写 x = 5，也能写 f = print；能把 5 传给函数，也能把 print 传给函数。

高阶函数因此不神秘：它只是「参数位置上放的不是数字，而是函数」。

lambda 的语法是 lambda 参数: 表达式。冒号右边表达式的值就是返回值，不用写 return，也写不了。

## 三、语法与使用规则

| 写法 | 含义 | 说明 |
| --- | --- | --- |
| lambda x: x * 2 | 一个参数 | 返回 x 乘 2 |
| sorted(列表, key=lambda x: x[1]) | 按第二个元素排 | key 接收函数 |
| list(map(lambda n: n * 2, 列表)) | 每个元素都变 | 要套 list |
| list(filter(lambda n: n > 0, 列表)) | 只留满足条件的 | 按真假筛选 |

三条实用规则：lambda 只能写一个表达式，不能写赋值、循环、多条语句；需要多行逻辑必须用 def；sorted 的 key 收到的是「每个元素」。

## 四、逐步演示

第一步，先写 def double(n): return n * 2，用 map 调用，确认要套 list 才看到全部内容。

第二步，把同一个函数改成 lambda，对比两段代码。

第三步，用 sorted 加 key 排序装元组的列表，先按默认、再按第二个元素。

第四步，用 filter 筛出符合条件的元素，再用 sum 求和。

## 五、深入一层：map、filter 和推导式怎么选

三样东西都能做「批量处理」，选择看可读性：

| 写法 | 适合 | 例子 |
| --- | --- | --- |
| 列表推导式 | 变换、筛选，最常用 | [n * 2 for n in nums] |
| map | 已有现成函数，直接套 | list(map(str, nums)) |
| filter | 已有现成判断函数 | list(filter(bool, nums)) |

多数情况下推导式更清楚，因为它把「怎么变」和「变什么」写在一行里，不用先想 list() 包一层。map 和 filter 返回的是迭代器，不是列表，所以要么用 list 包起来，要么直接 sum、for 消费掉。

lambda 的限制只有一条但很硬：冒号右边必须是**单个表达式**，不能写语句。所以 for 循环、if 语句、print 都不行，赋值也不行。能用一行算出来的才适合 lambda。

最值得记住的用法是 sorted 的 key：

people = [('小林', 28), ('小王', 35), ('小张', 22)]
print(sorted(people, key=lambda p: p[1]))

按年龄排序，一行搞定。比写一个 def 再传进去省事，也比手动实现排序靠谱。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 输出 map object at 0x... | 返回的是迭代器 | 套 list(...) |
| lambda 里写 return 报错 | 不能有 return | 直接写表达式 |
| lambda 里写 for 报错 | 只能有一个表达式 | 改用 def |
| sorted 的 key 取错部分 | 把元素当成整个列表 | key 收到单个元素 |

lambda 适合一眼能看懂的场景，想塞进层层嵌套的条件时就该用 def。

## 七、lambda 最适合的三个地方

lambda 真正高频的场合只有三个：sorted 的 key、max 与 min 的 key、以及一次性的简单变换。除此之外，写个 def 更清楚。判断标准是：需要给它起名字、需要在多处使用、需要写注释，三条中任一成立，就换成 def。
`,
    examples: [
      {
        title: 'lambda 与 sorted 的 key',
        intro: '第一个把 lambda 当参数传给 sorted，第二个直接调用。',
        code: `items = [("笔", 3), ("本子", 12), ("橡皮", 1)]
by_price = sorted(items, key=lambda x: x[1])
print(by_price)

square = lambda x: x * x
print(square(7))`,
        expectedOutput: `[('橡皮', 1), ('笔', 3), ('本子', 12)]
49`,
        lines: [
          { code: 'items = [("笔", 3), ("本子", 12), ("橡皮", 1)]', explain: '列表里装元组，每个是「名称, 价格」。' },
          { code: 'key=lambda x: x[1]', explain: '取元组第二个元素作为比较值。' },
          { code: 'square = lambda x: x * x', explain: 'lambda 也能起名字用，但这样不如直接写 def，起名字的 lambda 失去了「临时」的意义。' },
        ],
        trace: [
          { step: 'sorted 逐个取 key', state: '3、12、1' },
          { step: '排序结果', state: '按 1、3、12 排列' },
        ],
      },
      {
        title: 'map 与 filter：批量变换与批量筛选',
        intro: '同一个列表，map 每个元素乘 2，filter 只留奇数。',
        code: `nums = [1, 2, 3, 4, 5, 6]
doubled = list(map(lambda n: n * 2, nums))
odds = list(filter(lambda n: n % 2 == 1, nums))
print(doubled)
print(odds)
print(sum(odds))`,
        expectedOutput: `[2, 4, 6, 8, 10, 12]
[1, 3, 5]
9`,
        lines: [
          { code: 'map(lambda n: n * 2, nums)', explain: '对每个元素执行一次函数，返回迭代器。' },
          { code: 'filter(lambda n: n % 2 == 1, nums)', explain: '只有返回 True 的留下。' },
          { code: 'print(sum(odds))', explain: 'odds 是 [1, 3, 5]，求和得 9，说明 filter 留下的是原值不是布尔值。' },
        ],
        trace: [
          { step: 'map', state: '[2, 4, 6, 8, 10, 12]' },
          { step: 'filter 与 sum', state: '[1, 3, 5]，求和得 9' },
        ],
      },
    ],
    compare: [
      {
        conceptA: 'lambda',
        conceptB: 'def 函数',
        diff: 'lambda 只能一个表达式、没有名字、适合临时用；def 能写多行、有名字、能写分支。',
      },
    ],
    pitfalls: [
      '忘了套 list，打印出对象地址。',
      '在 lambda 里写 return 或多条语句。',
      'sorted 的 key 里把 x 当成整个列表。',
      'lambda 嵌套太深，可读性还不如 def。',
    ],
    keyPoints: [
      'lambda 是一行写完的匿名函数，冒号右边就是返回值。',
      '函数可以像数字一样赋值、传参。',
      'sorted 的 key 接收函数，按返回值比较。',
      'map 变换、filter 筛选，结果通常套 list。',
    ],
    sources: [
      { book: 'both', chapter: '第8章 函数', note: 'lambda、map、filter 与排序 key' },
    ],
    prerequisites: ['s5-03'],
    task: '给一份「姓名, 分数」列表，用 sorted 加 lambda 按分数排一次，再用 filter 挑出 90 分以上的人。',
    exercises: [
      {
        id: 's5-08-q1',
        qtype: 'single',
        stem: '下面哪种情况最适合用 lambda，而不是 def？',
        options: [
          'A. 需要写二十行带多个分支的逻辑',
          'B. 需要一个临时小规则，比如按元组第二个元素排序',
          'C. 需要在函数里写文档',
          'D. 需要处理文件读写异常',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：lambda 的定位是一行能写清的临时规则。\n逐步演示：sorted(data, key=lambda x: x[1]) 一句表达排序依据。\n易错提醒：复杂逻辑必须用 def。',
      },
      {
        id: 's5-08-q2',
        qtype: 'boolean',
        stem: 'lambda 里可以写 for 循环和多条语句，只要用分号隔开就行。',
        answer: '错',
        explanation:
          '答案：错。\n思路：lambda 冒号右边只能是单个表达式。\n逐步演示：lambda x: print(x); x + 1 直接 SyntaxError。\n易错提醒：lambda 里连 return 都不能写。 易错提醒：lambda 里连 return 都不能写。延伸一句：需要多行逻辑就老老实实写 def，lambda 的定位就是一行能算完的小函数。',
      },
      {
        id: 's5-08-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行结果。',
        code: 'nums = [3, 1, 2]\nprint(sorted(nums))\nprint(sorted(nums, key=lambda n: -n))',
        keywords: [['[1, 2, 3]'], ['[3, 2, 1]']],
        explanation:
          '答案：第一行 [1, 2, 3]，第二行 [3, 2, 1]。\n思路：默认从小到大；key 把数变成相反数再比较。\n逐步演示：-3、-1、-2 排序后对应 3、2、1。\n易错提醒：key 只改依据，不改元素本身。',
      },
      {
        id: 's5-08-q4',
        qtype: 'code-complete',
        stem: '下面代码想按从大到小排序并输出 [4, 3, 1]，请补全空缺处的关键字。',
        code: 'nums = [4, 1, 3]\nprint(sorted(nums, key=____ x: -x))',
        keywords: [['lambda'], ['[4, 3, 1]']],
        explanation:
          '答案：lambda。\n思路：key 需要一个函数，这里临时定义规则。\n逐步演示：key=lambda x: -x 后排序输出 [4, 3, 1]。\n易错提醒：写 def 会语法错误。 易错提醒：写 def 会语法错误。延伸一句：key 接收的是一个函数对象，lambda 和 def 定义的名字都能传，区别只在写起来长短。',
      },
      {
        id: 's5-08-q5',
        qtype: 'program',
        stem: '已知 scores = [("小林", 82), ("小王", 95), ("小张", 71)]，用 sorted 加 lambda 按分数从高到低排序，逐行输出姓名和分数：\n小王 95\n小林 82\n小张 71',
        answer: '',
        testCases: [{ stdin: '', expected: '小王 95\n小林 82\n小张 71' }],
        explanation:
          '答案（参考答案）：\nscores = [("小林", 82), ("小王", 95), ("小张", 71)]\nranked = sorted(scores, key=lambda x: x[1], reverse=True)\nfor name, score in ranked:\n    print(name, score)\n\n思路：key 取第二个元素比较，reverse=True 让大的在前。\n逐步演示：排序后依次是 95、82、71。\n易错提醒：漏写 reverse=True 会变成从低到高。',
      },
    ],
    minutes: 17,
    env: 'browser',
  },
  {
    id: 's5-09',
    stageId: 5,
    order: 9,
    title: '递归与函数设计思想',
    subtitle: '函数调用自己，一层层下去再一层层回来',
    hook: '要算 5 的阶乘，你会 5 乘 4 乘 3 乘 2 乘 1。可如果让函数先算 4 的阶乘，再乘 5 呢？',
    objectives: [
      '说出递归的两个必备条件',
      '写出阶乘与求和的递归版本',
      '按展开和返回两个阶段读懂递归',
    ],
    analogy: '俄罗斯套娃：想打开最大的，得先打开里面那个；一直开到最小的实心娃娃，再一层层合回去。',
    terms: [
      { term: '递归', plain: '函数在自己的函数体里调用自己。' },
      { term: '终止条件', plain: '让递归停下来的判断，也叫出口。' },
      { term: 'RecursionError', plain: '递归层数超过上限时抛出的错误。' },
    ],
    content: `## 一、为什么需要它：问题自己套自己

5 的阶乘等于 5 乘 4 的阶乘，4 的阶乘等于 4 乘 3 的阶乘，一直问到 1 的阶乘等于 1。

这种「大问题拆成同样形状的小问题」的结构就是递归。文件目录遍历、树的查找都是这种形状，用循环写很别扭，用递归几乎就是问题的直译。

## 二、概念解释：两个必备条件

| 条件 | 作用 | 缺失后果 |
| --- | --- | --- |
| 终止条件 | 什么时候不用再往下问 | 无限调用，直到 RecursionError |
| 递推关系 | 大问题 = 当前值 + 小一号的问题 | 算不出结果 |

以阶乘为例：终止条件是 n == 1 时返回 1；递推是 n 乘 fact(n - 1)。

执行分两个阶段：**先一层层往下展开**，每层都在等下一层；**触发终止条件后，再一层层往上返回**。展开时函数没有算完，返回时才真正乘起来。

## 三、语法与使用规则

| 部分 | 写法 | 说明 |
| --- | --- | --- |
| 终止条件 | if n == 1: return 1 | 放在最前面 |
| 递推 | return n * fact(n - 1) | 参数向终止条件靠近 |
| 错误写法 | return n * fact(n) | 参数没变，到不了出口 |

三条硬规则：每次递归参数必须更接近终止条件；终止条件要写在递归调用之前；Python 默认递归深度约一千层，超过就报错。

## 四、逐步演示

第一步，先写循环版确认结果，fact(4) 算得 24。

第二步，写递归版，进入函数时打印「进入 fact n」，看到 4、3、2、1 依次出现，这是展开。

第三步，在 return 之前加一行打印，看到 2、6、24 依次出现，这是返回。

第四步，删掉终止条件再运行，会看到 RecursionError。

## 五、深入一层：递归的三道保险

递归写不对，通常是缺了其中一道：

| 保险 | 作用 | 缺了会怎样 |
| --- | --- | --- |
| 终止条件 | 什么时候停 | 无限往下钻，RecursionError |
| 规模递减 | 每次离终止更近一步 | 停在原地打转，同样爆栈 |
| 结果能合回来 | 每层拿到小结果再拼 | 算出来是 None 或错的 |

拿阶乘 4 走一遍：

| 阶段 | 发生什么 |
| --- | --- |
| 往下 | fact(4) 要 fact(3)，fact(3) 要 fact(2)，fact(2) 要 fact(1) |
| 到底 | fact(1) 命中终止条件，直接返回 1 |
| 往上 | 2×1=2、3×2=6、4×6=24，一层层乘回来 |

往下四层，往上三次乘法，最后得 24。这个「先钻到底，再一层层回填」的顺序，是读递归的唯一正确姿势：不要试图在脑子里同时跟踪所有层，只盯住「当前这层要什么、能返回什么」。

Python 默认递归深度约一千层，超过就报 RecursionError。所以求和、求长度这类能用循环解决的事，优先用循环；递归留给「结构本身就是嵌套」的问题，比如目录树遍历、JSON 解析、汉诺塔。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| RecursionError: maximum recursion depth exceeded | 没有出口或参数没靠近出口 | 补 if 出口，每次减 1 |
| 返回 None | 某个分支漏了 return | 检查每条路径 |
| 结果比预期大 | 终止条件写错 | 核对边界 |
| 程序卡死 | 同一子问题重复计算 | 改用循环 |

函数设计四原则：一个函数只做一件事；名字要说清意图，calc 不如 calc_tax；参数别太多；优先返回结果而不是打印，返回值能被组合、能被测试。`,
    examples: [
      {
        title: '阶乘：看它怎么下去，又怎么回来',
        intro: '进入和返回时各打印一行，把递归的两个阶段暴露出来。',
        code: `def fact(n):
    print("进入 fact", n)
    if n == 1:
        print("到达最底层，返回 1")
        return 1
    result = n * fact(n - 1)
    print("fact", n, "返回", result)
    return result

print("最终结果：", fact(4))`,
        expectedOutput: `进入 fact 4
进入 fact 3
进入 fact 2
进入 fact 1
到达最底层，返回 1
fact 2 返回 2
fact 3 返回 6
fact 4 返回 24
最终结果： 24`,
        lines: [
          { code: 'if n == 1:', explain: '终止条件：到 1 就直接返回 1。' },
          { code: 'result = n * fact(n - 1)', explain: '先算 fact(n-1)，等它返回再乘 n。' },
          { code: 'print("fact", n, "返回", result)', explain: '在返回之后才执行，所以是 2、6、24。' },
        ],
        trace: [
          { step: '展开 4 → 3 → 2 → 1', state: '四层都停在 result = ...' },
          { step: '逐层返回', state: '2、6、24，最后输出 24' },
        ],
      },
      {
        title: '递归求和：结构更简单，思路一样',
        intro: '递推是「n 加上 1 到 n-1 的和」，出口是 n 为 0 时返回 0。',
        code: `def total(n):
    if n == 0:
        return 0
    return n + total(n - 1)

print("1 到 5 的和：", total(5))`,
        expectedOutput: `1 到 5 的和： 15`,
        lines: [
          { code: 'if n == 0:', explain: '出口：加到 0 就没有可加的了。' },
          { code: 'return n + total(n - 1)', explain: '当前数加上小一号的总和。' },
          { code: 'print("1 到 5 的和：", total(5))', explain: '从 total(5) 开始往下展开，最后一路加回到 15。' },
        ],
        trace: [
          { step: '展开', state: 'total(5) → ... → total(0)' },
          { step: '返回累加', state: '1、3、6、10、15' },
        ],
      },
    ],
    visual: {
      kind: 'function',
      title: 'fact(4)：先展开四层，再返回四层',
      description: '上层函数暂停，等下层结果回来才继续乘。返回顺序与展开完全相反。',
      calls: [
        { name: 'fact', args: '4', returns: '24（4 乘 fact(3)）' },
        { name: 'fact', args: '3', returns: '6（3 乘 fact(2)）' },
        { name: 'fact', args: '2', returns: '2（2 乘 fact(1)）' },
        { name: 'fact', args: '1', returns: '1（终止条件）' },
      ],
      steps: [
        { label: '第 1 层展开', detail: 'fact(4) 需要 4 乘 fact(3)，先暂停', state: [{ name: '等待中', value: '4 * fact(3)' }] },
        { label: '第 2 层展开', detail: 'fact(3) 需要 3 乘 fact(2)', state: [{ name: '等待中', value: '3 * fact(2)' }] },
        { label: '第 3 层展开', detail: 'fact(2) 需要 2 乘 fact(1)', state: [{ name: '等待中', value: '2 * fact(1)' }] },
        { label: '第 4 层触底', detail: 'fact(1) 命中终止条件，返回 1', state: [{ name: 'fact(1)', value: '返回 1' }] },
        { label: '第 3 层返回', detail: '2 乘 1 得 2，交给上一层', state: [{ name: 'fact(2)', value: '返回 2' }] },
        { label: '第 2 层返回', detail: '3 乘 2 得 6', state: [{ name: 'fact(3)', value: '返回 6' }] },
        { label: '第 1 层返回', detail: '4 乘 6 得 24，调用结束', state: [{ name: 'fact(4)', value: '返回 24' }] },
      ],
    },
    compare: [
      {
        conceptA: '递归',
        conceptB: '循环',
        diff: '递归把问题拆成同形状的小问题，代码短、贴近定义；循环效率高、不占调用栈。',
      },
    ],
    pitfalls: [
      '忘记终止条件，运行直接 RecursionError。',
      '递归调用时参数没变，永远到不了出口。',
      '终止条件写在递归调用后面，永远执行不到。',
      '某个分支漏了 return，结果变成 None。',
    ],
    keyPoints: [
      '递归必须有终止条件和靠近出口的递推。',
      '没有终止条件或参数不收敛，抛 RecursionError。',
      '执行分两阶段：先展开，再返回。',
      '四原则：一件事、名字说清意图、参数别太多、优先返回值。',
    ],
    sources: [
      { book: 'both', chapter: '第8章 函数', note: '递归与函数设计' },
    ],
    prerequisites: ['s5-07'],
    task: '用递归写倒计时函数：打印 n，再递归 n-1，到 0 时打印「发射」，然后删掉终止条件看报错。',
    exercises: [
      {
        id: 's5-09-q1',
        qtype: 'single',
        stem: '一个递归函数必须具备的条件是什么？',
        options: [
          'A. 必须有 return，不能有 print',
          'B. 必须有终止条件，且每次递归都更接近它',
          'C. 必须有两个以上参数',
          'D. 必须放在类内部',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：递归是自己调用自己，必须有办法停下来。\n逐步演示：fact 里用 if n == 1 作出出口，递归写成 fact(n - 1)。\n易错提醒：只有出口不够，参数还必须朝出口变化。',
      },
      {
        id: 's5-09-q2',
        qtype: 'boolean',
        stem: '递归函数如果没有终止条件，会一直调用自己，直到 Python 抛出 RecursionError。',
        answer: '对',
        explanation:
          '答案：对。\n思路：每层调用占一点调用栈，栈满就报错。\n逐步演示：def f(n): return f(n) 一运行就报错。\n易错提醒：报错是 Python 在保护你。',
      },
      {
        id: 's5-09-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行结果。',
        code: 'def f(n):\n    if n == 1:\n        return 1\n    return n * f(n - 1)\n\nprint(f(3))\nprint(f(4))',
        keywords: [['6'], ['24']],
        explanation:
          '答案：第一行 6，第二行 24。\n思路：这是阶乘递归，f(3) = 3×2×1。\n逐步演示：f(3) 展开到 f(1) 后逐层返回 2、6。\n易错提醒：每次返回的是 1 到 n 的乘积。',
      },
      {
        id: 's5-09-q4',
        qtype: 'blank',
        stem: '递归函数里那个让递归停下来的判断条件，叫做______条件。',
        answer: '终止',
        accepted: ['终止', '结束', '出口', '边界', '基线'],
        explanation:
          '答案：终止（也叫出口、基线条件）。\n思路：递归必须有「不用再往下问」的那一步。\n逐步演示：阶乘里是 if n == 1，求和里是 if n == 0。\n易错提醒：它必须真的能被执行到。',
      },
      {
        id: 's5-09-q5',
        qtype: 'program',
        stem: '用递归写函数 total(n)，返回 1 到 n 的和（n 为 0 时返回 0）。输出两行：\n1 到 10 的和 55\n1 到 100 的和 5050',
        answer: '',
        testCases: [{ stdin: '', expected: '1 到 10 的和 55\n1 到 100 的和 5050' }],
        explanation:
          '答案（参考答案）：\ndef total(n):\n    if n == 0:\n        return 0\n    return n + total(n - 1)\n\nprint("1 到 10 的和", total(10))\nprint("1 到 100 的和", total(100))\n\n思路：出口是 n 为 0 返回 0，递推是 n 加上小一号的和。\n逐步演示：展开到 0 后逐层返回，得 55 与 5050。\n易错提醒：出口写成 n == 1 时，total(0) 会传 -1，导致 RecursionError。',
      },
    ],
    minutes: 20,
    env: 'browser',
  },
]
