import type { Lesson } from '../../types'

export const stage4Lessons: Lesson[] = [
  {
    id: 's4-01',
    stageId: 4,
    order: 1,
    title: '什么是函数（用自动售货机比喻）',
    subtitle: '给一段代码起个名字，随时拿来用',
    hook: '你投币、按一下按钮，自动售货机内部忙活一阵，掉出一瓶饮料。你不需要懂它内部构造——函数就是这样一台『代码售货机』。',
    objectives: [
      '用自己的话说出函数是什么',
      '理解函数能避免重复、方便修改',
      '会定义并调用一个最简单的函数',
    ],
    analogy: '函数像自动售货机：参数是『你投的币和按的按钮』，函数体是『机器内部动作』，返回值是『掉出来的饮料』。你不关心内部，按对按钮就行。',
    content: `# 函数：给一段代码起个名字

想象一台自动售货机：你投币、按按钮，它内部完成一连串动作，最后掉出一瓶饮料。你不必知道它怎么运转，只要按对按钮。函数就是这样一台『代码售货机』。

## 为什么需要函数

- **避免重复**：同一段代码要用十次，写成函数只用定义一次
- **方便修改**：要改进逻辑，只改函数这一处，所有调用它的地方都跟着更新
- **拆分复杂问题**：把一个大任务拆成一个个小功能，逐个攻克

## 调用一个函数

\`\`\`python
print("你好")        # print 是别人写好的函数
len([1, 2, 3])       # len 也是函数，得到长度 3
\`\`\`

使用函数叫『调用』，写法是 函数名(参数)。括号里给它的东西叫**参数**（原料），它给出的结果叫**返回值**（产品）。

> 函数把『做什么』封装起来，让主程序变得清爽好读。`,
    examples: [
      {
        title: '用函数改造重复代码',
        code: 'def say_hello():\n    print("你好！")\n    print("欢迎学习 Python！")\n\nsay_hello()\nsay_hello()',
        expectedOutput: '你好！\n欢迎学习 Python！\n你好！\n欢迎学习 Python！',
        lines: [
          { code: 'def say_hello():', explain: 'def 表示定义函数，后面跟函数名和冒号。注意这里只是定义，代码不会执行。' },
          { code: 'say_hello()', explain: '调用函数，缩进里的两行才会真正执行。调用几次就执行几次。' },
        ],
      },
    ],
    visual: {
      kind: 'function',
      title: '函数像自动售货机',
      description: '调用就是投币按按钮，函数内部干活后交出结果。',
      calls: [
        { name: 'say_hello', args: '（无）', returns: '打印两行问候，没有返回值' },
        { name: 'len', args: '[1, 2, 3]', returns: '3' },
        { name: 'print', args: '你好', returns: '在屏幕上显示，没有返回值' },
      ],
    },
    compare: [
      { conceptA: '定义函数 def', conceptB: '调用函数', diff: '定义只是写好说明书，代码不会执行；调用才是按按钮，让函数真正干活。', example: 'def say_hello(): 写好后没有任何输出；say_hello() 调用后才打印。' },
    ],
    pitfalls: [
      '定义函数时忘了写冒号或缩进。',
      '只定义不调用，以为代码会自动运行。',
      '函数名和变量名起成一样，造成混淆。',
    ],
    sources: [{ book: 'pcc3', chapter: '第8章 函数' }, { book: 'abs3', chapter: '第4章 函数' }],
    prerequisites: ['s3-02'],
    task: '定义一个函数 introduce()，里面打印你的名字和爱好，然后调用它两次，观察输出。',
    exercises: [
      { id: 's4-01-q1', qtype: 'single', stem: '关于函数，下面说法正确的是？', options: ['A. 定义函数时里面的代码会立即执行', 'B. 函数必须被调用才会执行其中的代码', 'C. 函数不能有名字', 'D. 一个函数只能调用一次'], answer: 'B', explanation: '定义函数只是把它存起来，只有调用时才会执行内部代码，而且可以调用任意多次。' },
      { id: 's4-01-q2', qtype: 'boolean', stem: '函数名和变量名可以完全一样，Python 会自动区分它们，所以不用担心混淆。', answer: '错', explanation: '同名会互相覆盖、造成混淆，应当避免使用相同的名字。' },
    ],
    minutes: 9,
    env: 'browser',
  },
  {
    id: 's4-02',
    stageId: 4,
    order: 2,
    title: '定义函数与参数',
    subtitle: '给函数喂不同的原料',
    hook: '同样一句『你好』，想对小明说、又想对小红说，总不能写两个函数。把名字做成参数，一个函数就够用了。',
    objectives: [
      '会定义带参数的函数',
      '理解形参和实参的区别',
      '能按正确的顺序和个数传递多个参数',
    ],
    analogy: '参数像函数的『进料口』：定义时留好几个空位（形参），调用时把具体材料（实参）塞进去，函数就能加工出不同的结果。',
    content: `# 给函数传参数

函数真正的威力，在于能接收不同的原料，产出不同的结果。

## 定义带参数的函数

\`\`\`python
def greet(name):
    print("你好，", name, "！")

greet("小明")
greet("小红")
\`\`\`

定义时的 name 叫**形参**（形式上的占位），调用时传进去的『小明』叫**实参**（实际的数据）。

## 多个参数

\`\`\`python
def add(a, b):
    print(a + b)

add(3, 5)   # 输出 8
\`\`\`

多个参数用逗号隔开，调用时按顺序一一对应。

## 参数让函数通用

没有参数的函数每次都做一样的事；有了参数，同一段代码能处理无数种情况——这正是函数值得抽象的原因。`,
    examples: [
      {
        title: '计算长方形面积',
        code: 'def area(width, height):\n    result = width * height\n    print("面积是", result)\n\narea(3, 4)\narea(5, 6)',
        expectedOutput: '面积是 12\n面积是 30',
        lines: [
          { code: 'def area(width, height):', explain: '定义两个形参 width 和 height，调用时按顺序传入实际数值。' },
          { code: 'area(3, 4)', explain: 'width 得到 3，height 得到 4，算出面积 12。' },
        ],
      },
    ],
    compare: [
      { conceptA: '形参', conceptB: '实参', diff: '形参是定义函数时写在括号里的占位变量；实参是调用函数时真正传进去的具体值。', example: 'def greet(name) 里的 name 是形参；greet(『小明』) 里的『小明』是实参。' },
    ],
    pitfalls: [
      '调用时参数的个数和顺序与定义不一致。',
      '把参数名写错，导致 NameError。',
      '以为形参的值会永久保留，其实每次调用都是全新的。',
    ],
    sources: [{ book: 'pcc3', chapter: '第8章' }, { book: 'abs3', chapter: '第4章' }],
    prerequisites: ['s4-01'],
    task: '定义函数 power(a, b)，输出 a 的 b 次方，然后调用它计算 2 的 3 次方。',
    exercises: [
      { id: 's4-02-q1', qtype: 'blank', stem: '定义函数时写在括号里、用来接收数据的变量叫 ______ 数（填『形』或『实』）。', answer: '形', explanation: '定义时的变量叫形参，调用时传入的具体值叫实参。' },
      { id: 's4-02-q2', qtype: 'predict', stem: 'def add(a, b):\n    print(a + b)\nadd(2, 7)', keywords: [['9']], explanation: 'a 得到 2，b 得到 7，相加输出 9。' },
    ],
    minutes: 10,
    env: 'browser',
  },
  {
    id: 's4-03',
    stageId: 4,
    order: 3,
    title: '返回值',
    subtitle: '让函数把一个结果交还给你',
    hook: '有些函数只负责『说给你听』（打印），有些函数会算出一个结果递给你——后者才真正能在程序里接着用。',
    objectives: [
      '理解 return 的作用与执行时机',
      '会使用返回值参与后续运算',
      '能区分打印 print 与返回 return',
    ],
    analogy: 'return 像售货机的出货口：你按按钮（调用函数），机器内部处理后把饮料（结果）递出来。递出来你才能拿着它继续做事。',
    content: `# 让函数交出结果

有些函数只是打印（比如 print），有些函数会算出一个结果交还给你——这就是**返回值**，用 return 实现。

## return 的基本用法

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)   # 8
\`\`\`

调用 add(3, 5) 这个表达式的值，就是 return 后面的结果。可以把它存进变量、参与运算。

## return 会结束函数

一旦执行到 return，函数立刻结束，后面的代码不再执行。

\`\`\`python
def check(n):
    if n < 0:
        return "负数"
    return "非负数"
\`\`\`

## 没有 return 时

如果函数里不写 return，它默认返回 None，表示『什么都没有』。

> 打印是『说给你听』，返回是『递给你一个结果』。两者千万别混。`,
    examples: [
      {
        title: '判断奇偶数（返回结果）',
        code: 'def parity(n):\n    if n % 2 == 0:\n        return "偶数"\n    else:\n        return "奇数"\n\nprint(parity(4))\nprint(parity(7))',
        expectedOutput: '偶数\n奇数',
        lines: [
          { code: 'return "偶数"', explain: '把结果『偶数』交还给调用处，函数随即结束。' },
          { code: 'print(parity(4))', explain: 'parity(4) 的值就是『偶数』，print 把它显示出来。' },
        ],
      },
    ],
    visual: {
      kind: 'function',
      title: '返回值的传递过程',
      description: '参数送进去，函数算完把结果递回来。',
      calls: [
        { name: 'add', args: '3, 5', returns: '8（return a + b）' },
        { name: 'parity', args: '4', returns: '偶数' },
        { name: 'parity', args: '7', returns: '奇数' },
      ],
    },
    compare: [
      { conceptA: 'print', conceptB: 'return', diff: 'print 只是把内容显示在屏幕上，函数本身没有结果；return 把结果交还给调用者，可以被存进变量继续使用。', example: 'print(add(3, 5)) 能显示 8，是因为 add 用 return 把 8 交了出来。' },
    ],
    pitfalls: [
      '以为函数会自动打印返回值，其实要自己写 print。',
      '在 return 后面还写代码，误以为会执行（其实不会）。',
      '把 print 当成 return 用，导致调用处拿不到任何结果。',
    ],
    sources: [{ book: 'pcc3', chapter: '第8章' }, { book: 'abs3', chapter: '第4章' }],
    prerequisites: ['s4-02'],
    task: '定义函数 max2(a, b)，用 return 返回两个数中较大的那个，并调用它验证结果。',
    exercises: [
      { id: 's4-03-q1', qtype: 'predict', stem: 'def f(x):\n    return x * 2\nprint(f(5) + 1)', keywords: [['11']], explanation: 'f(5) 返回 10，加 1 得 11。返回值可以像普通数字一样参与运算。' },
      { id: 's4-03-q2', qtype: 'blank', stem: '函数里用来把结果交还给调用者的关键字是 ______。', answer: 'return', accepted: ['Return', 'RETURN'], explanation: 'return 用来返回结果并结束函数。' },
      { id: 's4-03-q3', qtype: 'program', stem: '编程题：编写函数 is_even(n)，接收一个整数，是偶数就返回 True，否则返回 False。主程序读取一个整数输入，调用函数并打印结果（True 或 False）。', code: 'def is_even(n):\n    # 在这里补全代码\n    pass\nn = int(input())\nprint(is_even(n))', testCases: [{ stdin: '4', expected: 'True' }, { stdin: '7', expected: 'False' }], answer: '', explanation: '用 return n % 2 == 0 即可返回布尔结果。4 是偶数返回 True，7 是奇数返回 False。' },
    ],
    minutes: 11,
    env: 'browser',
  },
  {
    id: 's4-04',
    stageId: 4,
    order: 4,
    title: '默认参数与关键字参数',
    subtitle: '让函数的调用更省心',
    hook: '点奶茶时你常说『要中杯、少糖』，但大多数时候懒得说——店家有默认配置。函数的默认参数也是这个意思。',
    objectives: [
      '会定义带默认值的参数',
      '理解默认参数必须放在普通参数之后',
      '会用关键字参数按名字传值',
    ],
    analogy: '默认参数像套餐的标配：你不特别说明，就按标配来；你特别说了，就按你的要求换。关键字参数则是『点名下单』，报名字不报顺序。',
    content: `# 让参数更灵活

## 默认参数

定义函数时给参数一个默认值：调用时不传就用默认值，传了就用你给的值。

\`\`\`python
def greet(name, greeting="你好"):
    print(greeting, name)

greet("小明")           # 你好 小明
greet("小红", "早上好")  # 早上好 小红
\`\`\`

注意：**有默认值的参数必须放在没有默认值的参数后面**，否则会报错。

## 关键字参数

调用时用『参数名=值』的形式指定，就不必死记顺序：

\`\`\`python
def introduce(name, age):
    print(name, age)

introduce(age=15, name="小明")   # 顺序打乱也没关系
\`\`\`

## 两者结合

\`\`\`python
def order(main, drink="可乐"):
    print("主食：", main, "饮料：", drink)

order("汉堡", drink="雪碧")
\`\`\`

> 默认参数减少重复输入，关键字参数让调用更清晰、更不容易出错。`,
    examples: [
      {
        title: '个性化问候',
        code: 'def greet(name, greeting="你好"):\n    print(greeting + "，" + name)\n\ngreet("小明")\ngreet("老师", greeting="下午好")',
        expectedOutput: '你好，小明\n下午好，老师',
        lines: [
          { code: 'def greet(name, greeting="你好"):', explain: 'greeting 有默认值，调用时可以不传。' },
          { code: 'greet("老师", greeting="下午好")', explain: '用关键字参数指定 greeting，跳过默认值。' },
        ],
      },
    ],
    compare: [
      { conceptA: '位置参数', conceptB: '关键字参数', diff: '位置参数按定义时的顺序一一对应；关键字参数用『参数名=值』指定，顺序随意、更清晰。', example: 'introduce(15, 『小明』) 容易看错；introduce(age=15, name=『小明』) 一目了然。' },
    ],
    pitfalls: [
      '把带默认值的参数写在普通参数前面，导致 SyntaxError。',
      '关键字参数的名字写错，会报 TypeError。',
      '同一个参数既按位置传、又按关键字传，重复赋值。',
    ],
    sources: [{ book: 'pcc3', chapter: '第8章' }, { book: 'abs3', chapter: '第4章' }],
    prerequisites: ['s4-02', 's4-03'],
    task: '定义函数 make_coffee(size="中杯", sugar="少糖")，打印出配置，然后分别用默认参数和关键字参数各调用一次。',
    exercises: [
      { id: 's4-04-q1', qtype: 'single', stem: '关于默认参数，下面说法正确的是？', options: ['A. 默认参数必须写在最前面', 'B. 有默认值的参数要放在没有默认值的参数后面', 'C. 默认参数调用时一定要传值', 'D. 默认参数不允许有默认值'], answer: 'B', explanation: '为了避免歧义，带默认值的参数必须放在普通参数之后。' },
      { id: 's4-04-q2', qtype: 'predict', stem: 'def f(a, b=2):\n    print(a + b)\nf(3)', keywords: [['5']], explanation: '调用只传了 a=3，b 用默认值 2，输出 5。' },
    ],
    minutes: 10,
    env: 'browser',
  },
  {
    id: 's4-05',
    stageId: 4,
    order: 5,
    title: '模块、导入与标准库（含项目文件组织）',
    subtitle: '站在别人的肩膀上写代码',
    hook: '你想算平方根，难道要自己从零写算法？Python 早就有人写好了——import 一下就能用，这叫『不要重复造轮子』。',
    objectives: [
      '理解模块与导入的作用',
      '掌握 import、from、as 三种导入写法',
      '知道常见标准库的用途与多文件项目的基本组织',
    ],
    analogy: '模块像工具箱：math 是『数学工具箱』，random 是『抽签工具箱』。import 就是把工具箱搬到面前，之后从里面拿工具用。',
    content: `# 站在别人的肩膀上

Python 之所以强大，是因为有大量现成的工具包（模块）。别人把好用的功能写好，你 import 一下就能用。

## import 导入模块

\`\`\`python
import math
print(math.sqrt(16))   # 4.0，开平方
print(math.pi)         # 3.14159...
\`\`\`

导入后用『模块名.功能名』的方式使用。

## 几种导入方式

- \`import math\`：导入整个模块，用 math.sqrt
- \`from math import sqrt\`：只导入某个功能，直接用 sqrt
- \`import math as m\`：起别名，用 m.sqrt

## 常用标准库

- **math**：数学计算
- **random**：随机数，如 random.randint(1, 10)
- **time**：时间相关
- **datetime**：日期处理

## 项目文件组织

代码变多时，要拆成多个 .py 文件：每个文件就是一个模块。比如 game.py 放游戏逻辑，utils.py 放工具函数，主文件 main.py 用 import 把它们组合起来。同一目录下的模块直接 import 文件名即可。

> 在浏览器实验室里，math、random 这类标准库也能直接用。`,
    examples: [
      {
        title: '用 math 解决数学问题',
        code: 'import math\nfrom math import floor\n\nprint("16 的平方根：", math.sqrt(16))\nprint("π 保留两位：", round(math.pi, 2))\nprint("3.9 向下取整：", floor(3.9))',
        expectedOutput: '16 的平方根： 4.0\nπ 保留两位： 3.14\n3.9 向下取整： 3',
        lines: [
          { code: 'import math', explain: '导入 math 模块，之后用 math.功能名 调用。' },
          { code: 'from math import floor', explain: '只导入 floor 这一个功能，可以直接写 floor(3.9)。' },
        ],
      },
    ],
    compare: [
      { conceptA: 'import math', conceptB: 'from math import sqrt', diff: '前者导入整个模块，用功能时要加 math. 前缀；后者只导入指定功能，可以直接用 sqrt()，但不能再调用模块里其他功能。', example: 'import math 后用 math.sqrt；from math import sqrt 后直接写 sqrt。' },
    ],
    pitfalls: [
      '只写了 import math，调用时却直接写 sqrt(16)，忘了加模块名前缀。',
      '模块名拼写错误，导致 ModuleNotFoundError。',
      '在浏览器环境里尝试导入需要本地文件的第三方库。',
    ],
    sources: [{ book: 'pcc3', chapter: '第8章 8.8节' }, { book: 'abs3', chapter: '第3章 3.3节导入模块' }],
    prerequisites: ['s4-01'],
    task: '导入 math 模块，计算半径为 5 的圆的面积（π 乘以半径的平方），保留两位小数后输出。',
    exercises: [
      { id: 's4-05-q1', qtype: 'single', stem: '执行 import math 后，要计算 16 的平方根，正确的写法是？', options: ['A. sqrt(16)', 'B. math.sqrt(16)', 'C. math(16)', 'D. root(16)'], answer: 'B', explanation: '用 import math 导入整个模块后，要通过『模块名.功能名』调用，即 math.sqrt(16)。' },
      { id: 's4-05-q2', qtype: 'predict', stem: 'import math；print(math.floor(3.9)) 输出什么？', keywords: [['3']], explanation: 'floor 是向下取整，3.9 向下取整为 3。' },
    ],
    minutes: 10,
    env: 'browser',
  },
]
