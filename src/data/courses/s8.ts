import type { Lesson } from '../../types'

/**
 * 第八阶段：进阶与实战（12 课）
 * 覆盖推导式、迭代器与生成器、装饰器、标准库、时间、正则、网络请求、数据处理、
 * 可视化、数据库、文件自动化、Office 自动化与工程规范。
 * 写作约定：content 内不使用反引号，所有可运行代码放在 examples 里；输出均用 Python 3.13 实测。
 */
export const stage8Lessons: Lesson[] = [
  {
    id: 's8-01',
    stageId: 8,
    order: 1,
    title: '推导式',
    subtitle: '一行写完「遍历 + 筛选 + 变换」',
    hook: '要把 200 个商品价格全部打九折，你打算写一个五行的 for 循环，还是写一行就搞定？',
    objectives: [
      '能把一个「建空列表 + for + append」的循环改写成列表推导式',
      '能用 if 在推导式里筛选，用 if-else 在推导式里分流',
      '能写出字典推导式和集合推导式',
      '能判断一段推导式是否嵌套过深、应该退回普通循环',
    ],
    analogy:
      '推导式像一条流水线：原材料从传送带那头进来（遍历），质检员挑出合格的（筛选），工人做一道加工（变换），成品直接装箱（生成新列表）。普通循环是你自己一件一件搬，推导式是把整条线一次装好。',
    terms: [
      { term: '推导式', plain: '用一对方括号或花括号，在一行里完成「遍历 + 加工 + 收集」的写法。' },
      { term: '可迭代对象', plain: '能被 for 一个个取出来的东西，比如列表、字符串、字典、range。' },
      { term: '表达式', plain: '能算出一个值的写法，比如 p * 1.1、n * n。' },
      { term: '嵌套', plain: '推导式里再套一层推导式，像箱子里装盒子。' },
    ],
    content: `## 一、为什么需要它（知识背景）

假设你有一张价格表，要把每个价格都加上 10% 的税。用前面学过的写法，得这样走一遍：

先准备一个空列表，然后 for 循环取出每个价格，乘 1.1，再 append 进去。四五行代码，只为表达一句「每个价格乘 1.1」。如果还要筛选出大额商品，就得再写一个循环、再建一个空列表。

问题不在于代码长，而在于**噪音太多**：空列表、append、循环变量这些细节盖住了你真正想说的意思。读代码的人要读完五行才知道你在做「变换」。推导式就是把这些噪音压掉，让「对每一项做什么」成为句子的主干。

## 二、概念解释

推导式（comprehension）是把「遍历一个序列、对每项做处理、把结果收集成新容器」这三件事压进一行的语法。它的骨架永远是：

**新容器 = [ 对每一项做什么 for 每一项 in 原序列 ]**

方括号决定结果是什么类型：方括号是列表，花括号配冒号是字典，光花括号是集合。中间的「对每一项做什么」是一个表达式，写什么就得到什么。

关键要建立的心智模型：**它仍然是一个循环**，只是把循环的三件杂事（建容器、append、return）交给了 Python。它不会比 for 循环跑得更快多少，它换来的是可读性。

## 三、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| 基本形态 | 对每项做一个变换 | [p * 2 for p in prices] |
| 带 if 过滤 | 只保留满足条件的项，项数会变少 | [p for p in prices if p > 50] |
| 带 if-else | 每一项都保留，按条件分两类处理 | ['贵' if p > 50 else '便宜' for p in prices] |
| 字典推导式 | 花括号 + 冒号，产出键值对 | {n: p for n, p in zip(names, prices)} |
| 集合推导式 | 花括号不配冒号，自动去重 | {w[0] for w in words} |

必须记住的三条规则：

第一，**if 和 if-else 位置不同**。过滤用的 if 写在 for 后面，它决定「这一项要不要」；if-else 写在 for 前面，它决定「这一项变成什么」。写错位置会直接报语法错误。

第二，**冒号只在字典推导式里出现**。花括号里没有冒号，Python 就当成集合，重复元素会被自动去掉。

第三，**结果一定是新容器**。原列表一个元素都不会被改动，想要覆盖原变量必须自己赋值回去。

## 四、逐步演示（分步骤）

第一步：先老老实实写循环版本。建空列表、for、append，跑通，确认结果对。

第二步：把 append 里那个值提出来，放到最前面，删掉空列表和 append，两头补上方括号。这时你已经得到推导式了。

第三步：如果要筛选，把 if 条件加在 for 的后面，先只筛不改，看长度对不对。

第四步：如果要分流，把 if-else 整个表达式挪到 for 前面，注意 else 后面不能省。

第五步：用 print 把结果打出来，和循环版本的结果对比。两个结果必须完全一样，否则就是写错了位置。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| SyntaxError: invalid syntax | 把过滤的 if 写到了 for 前面 | 过滤 if 放 for 后面，if-else 放 for 前面 |
| 结果里全是 True/False | 只写了条件，没写取值 | 条件后面要有 else，且两边都返回真正的值 |
| 拿到的是生成器不是列表 | 用了圆括号 | 圆括号是生成器表达式，要列表就用方括号 |
| 原列表没变 | 以为推导式会就地修改 | 推导式返回新容器，要写 prices = [...] |

## 六、什么时候别用它

推导式最大的陷阱是「一行写完很爽，然后越写越长」。判断标准很简单：**嵌套超过两层、或者一行超过 80 个字符，就退回普通循环**。

比如「把二维表格里每一行的有效值拉平成一个列表」，写成两层 for 还能读；再加一层 if 和一层 if-else，就变成天书了。这时候一个带好变量名的普通循环，比一行炫技的推导式有价值得多。代码是写给人看的，顺便给机器执行。`,
    examples: [
      {
        title: '列表推导式的三种形态：变换、过滤、分流',
        intro: '同一份价格表，用三种写法处理，注意 if 的位置变了，结果的含义也跟着变。',
        code: `prices = [12.5, 88, 30, 45.5, 60]

# 1) 基本形态：对每一项做同一个变换
with_tax = [round(p * 1.1, 1) for p in prices]
print("含税价：", with_tax)

# 2) 带 if 过滤：只留下满足条件的
big = [p for p in prices if p >= 50]
print("大额：", big)

# 3) 带 if-else：每一项都要，但分成两类处理
tags = ["贵" if p >= 50 else "便宜" for p in prices]
print("标签：", tags)`,
        expectedOutput: `含税价： [13.8, 96.8, 33.0, 50.1, 66.0]
大额： [88, 60]
标签： ['便宜', '贵', '便宜', '便宜', '贵']`,
        lines: [
          { code: 'with_tax = [round(p * 1.1, 1) for p in prices]', explain: '把每个价格乘 1.1 并保留一位小数，结果装进新列表，原列表不动。' },
          { code: '[p for p in prices if p >= 50]', explain: 'if 在 for 后面，表示先取出再判断，不合格的直接丢掉，所以只剩 2 个元素。' },
          { code: '["贵" if p >= 50 else "便宜" for p in prices]', explain: 'if-else 在 for 前面，表示每个元素都要产出一个值，只是值分两种，所以还是 5 个元素。' },
          { code: 'print("大额：", big)', explain: '逗号分隔时 print 自动补一个空格，输出里「大额：」后面就是这样来的。' },
        ],
        trace: [
          { step: '第 1 轮 p = 12.5', state: 'with_tax 追加 13.8；12.5 < 50，不进 big；标签为「便宜」' },
          { step: '第 2 轮 p = 88', state: 'with_tax 追加 96.8；88 >= 50，进 big；标签为「贵」' },
          { step: '第 4 轮 p = 45.5', state: '45.5 * 1.1 = 50.05，四舍五入后是 50.1，但它 < 50 所以不进 big' },
          { step: '循环结束', state: 'with_tax 有 5 项，big 有 2 项，tags 有 5 项' },
        ],
        tryIt: '把第 2 条的门槛从 50 改成 40，再猜一下 big 会多出哪个价格。',
      },
      {
        title: '字典推导式与集合推导式',
        intro: '两个列表能用 zip 配成一张表；花括号不加冒号就变成集合，重复项会自动消失。',
        code: `# 字典推导式：把两个列表配成一张价目表
names = ["苹果", "香蕉", "橙子"]
prices = [6.5, 3.2, 5.0]
price_table = {n: p for n, p in zip(names, prices)}
print(price_table)

# 再筛一遍：只保留 6 元以下的
cheap = {n: p for n, p in price_table.items() if p < 6}
print(cheap)

# 集合推导式：自动去重，只留首字母
words = ["apple", "Avocado", "banana", "apricot"]
initials = {w[0].lower() for w in words}
print(sorted(initials))`,
        expectedOutput: `{'苹果': 6.5, '香蕉': 3.2, '橙子': 5.0}
{'香蕉': 3.2, '橙子': 5.0}
['a', 'b']`,
        lines: [
          { code: '{n: p for n, p in zip(names, prices)}', explain: 'zip 把两个列表按位置配对，冒号左边当键、右边当值。' },
          { code: '{n: p for n, p in price_table.items() if p < 6}', explain: '对字典用 items() 才能同时拿到键和值，然后按值筛选。' },
          { code: '{w[0].lower() for w in words}', explain: '花括号里没有冒号，所以是集合，重复的 a 只会留一个。' },
          { code: 'print(sorted(initials))', explain: '集合本身无序，排序后输出才稳定，否则每次运行顺序可能不同。' },
        ],
        trace: [
          { step: 'zip 配对', state: '(苹果, 6.5)、(香蕉, 3.2)、(橙子, 5.0) 三组' },
          { step: '建字典', state: 'price_table = {苹果: 6.5, 香蕉: 3.2, 橙子: 5.0}' },
          { step: '筛选后', state: '6.5 和 5.0 不满足 p < 6，只剩香蕉 3.2 和橙子 5.0' },
          { step: '集合去重', state: "apple、apricot 都给 a，最终集合是 {'a', 'b'}" },
        ],
        tryIt: '把筛选条件改成 p <= 6.5，看看字典里会多回哪一项。',
      },
    ],
    compare: [
      {
        conceptA: 'if 写在 for 后面',
        conceptB: 'if-else 写在 for 前面',
        diff: '前者是「过滤」，项数会减少；后者是「分流」，每一项都留下，只是值不同。',
        example: '[p for p in xs if p > 0] 与 [p if p > 0 else 0 for p in xs]',
      },
      {
        conceptA: '列表推导式',
        conceptB: '生成器表达式',
        diff: '方括号一次性把所有结果算出来放进内存；圆括号只造一个「按需生产」的对象，遍历一次就空了。',
        example: '[n * n for n in range(3)] 与 (n * n for n in range(3))',
      },
    ],
    pitfalls: [
      '把过滤的 if 写在 for 前面，Python 直接报语法错误，因为那里只接受完整的 if-else 表达式。',
      '写了 if 忘了 else，或者 else 后面留空，导致语法不完整。',
      '以为推导式会修改原列表，其实它永远返回一个新容器。',
      '对字典直接写 for k in d 却想同时用值，忘了要写 d.items()。',
      '三层嵌套硬要压成一行，三个月后自己都读不懂。',
    ],
    keyPoints: [
      '推导式的骨架是「表达式 for 变量 in 序列」，方括号决定类型。',
      '过滤 if 在 for 后，分流 if-else 在 for 前，位置一错就报错。',
      '字典推导式靠冒号区分，集合推导式靠「没有冒号」区分。',
      '推导式不修改原数据，只生成新容器。',
      '嵌套超过两层或一行太长时，普通循环更专业。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第4章 操作列表' },
      { book: 'abs3', chapter: '第1章 Python 基础', note: '推导式属进阶主题，教材仅简要提及，本课做了扩展' },
    ],
    prerequisites: ['s4-04', 's3-04'],
    task: '把自己之前写过的任意一个「建空列表 + for + append」的循环，改写成推导式，两种写法都跑一遍，用 print 对比结果是否完全一致。',
    exercises: [
      {
        id: 's8-01-q1',
        qtype: 'single',
        stem: '关于列表推导式，下面哪种说法是正确的？',
        options: [
          'A. 推导式会就地修改原列表的元素',
          'B. 推导式一定返回一个新的列表对象',
          'C. 推导式只能处理数字，不能处理字符串',
          'D. 推导式必须搭配 append 使用',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：本题考查推导式的本质——它是一次「造新容器」的运算，不是就地修改。\n逐步演示：prices = [10, 20] 之后执行 doubled = [p * 2 for p in prices]，doubled 是 [20, 40]，而 prices 仍然是 [10, 20]，两个列表在内存里是不同的对象。\n易错提醒：很多人以为写 prices = [...] 才算修改，其实就算写成同一个变量名，也是先造新列表再绑定，原列表对象并没有被改。',
      },
      {
        id: 's8-01-q2',
        qtype: 'boolean',
        stem: '在列表推导式中，用于「过滤」的 if 必须写在 for 关键字的后面。',
        answer: '对',
        explanation:
          '答案：对。\n思路：过滤 if 的位置决定了它作用于「取出的每一项」，所以语法规定它跟在 for 子句后面。\n逐步演示：正确写法是 [p for p in prices if p > 50]；如果写成 [p if p > 50 for p in prices]，Python 会报 SyntaxError，因为 for 前面的 if 必须配一个 else 构成完整的三元表达式。\n易错提醒：把「过滤」和「分流」混为一谈是最常见的错误，记住一句话——筛选放后面，二选一放前面。',
      },
      {
        id: 's8-01-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请按 print 的真实格式写出结果。',
        code: "print([x * 2 for x in range(4) if x % 2 == 0])",
        keywords: [
          ['[0, 4]', '[0,4]'],
          ['列表', 'list'],
        ],
        explanation:
          '答案：[0, 4]。\n思路：range(4) 产出 0、1、2、3，过滤条件是「除以 2 余 0」，只留 0 和 2，再分别乘 2 得到 0 和 4。\n逐步演示：第一轮 x = 0，0 % 2 == 0 成立，产出 0 * 2 = 0；第二轮 x = 1，余 1，跳过；第三轮 x = 2，成立，产出 4；第四轮 x = 3，跳过。\n易错提醒：容易把 range(4) 当成 1 到 4，那样会得到 [4]，另外别漏掉方括号，输出是列表而不是两个数字。',
      },
      {
        id: 's8-01-q4',
        qtype: 'blank',
        stem: '要由两个等长列表 names 和 prices 生成一张价目表，写成 price = {n: p ______ n, p in zip(names, prices)}。横线处应填的关键字是什么？',
        answer: 'for',
        accepted: ['for', 'for 关键字'],
        explanation:
          '答案：for。\n思路：字典推导式的骨架是「键: 值 for 变量 in 序列」，冒号把键和值分开，for 负责提供数据来源。\n逐步演示：zip(names, prices) 把两个列表按位置配对，for n, p in ... 每次取出一对，冒号左边当键、右边当值，最终得到 {苹果: 6.5, 香蕉: 3.2, 橙子: 5.0}。\n易错提醒：漏掉 for 写成 {n: p n, p in ...} 会直接报语法错误；把冒号写成逗号则变成集合，而且元素是元组，含义完全不同。',
      },
      {
        id: 's8-01-q5',
        qtype: 'program',
        stem: '给定列表 nums = [3, 8, 12, 5, 20]，请用一条列表推导式取出所有大于 8 的数，并求它们的平方，最后打印这个列表。只输出一行结果。',
        answer: '',
        testCases: [{ stdin: '', expected: '[144, 400]' }],
        explanation:
          '答案：\n代码如下：\n\nnums = [3, 8, 12, 5, 20]\nresult = [n * n for n in nums if n > 8]\nprint(result)\n\n思路：先用过滤条件 n > 8 筛掉 3、8、5，再对留下的 12 和 20 做平方。\n逐步演示：3 不满足，跳过；8 不满足（条件是严格大于），跳过；12 满足，产出 144；5 跳过；20 满足，产出 400。最终列表是 [144, 400]，print 输出的就是这一行。\n易错提醒：把条件写成 n >= 8 会多出 8 的平方 64；把平方写在 if 后面会变成语法错误；print 列表时方括号和逗号后的空格都是自动的，不要自己拼字符串。',
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's8-02',
    stageId: 8,
    order: 2,
    title: '迭代器与生成器',
    subtitle: '让数据「用的时候才生产」',
    hook: '要读一个 8GB 的日志文件，可你的电脑只有 8GB 内存，为什么有的程序照样能一行行处理完？',
    objectives: [
      '能说清可迭代对象和迭代器的区别',
      '能解释 for 循环内部调用了 iter 和 next',
      '能用 yield 把普通函数改写成生成器',
      '能判断一段代码该用列表还是生成器',
    ],
    analogy:
      '列表像把一整箱矿泉水搬回家，喝不完也得先占着地方；生成器像装了净水器，拧一下出一杯，不喝就不出水，永远只占一个杯子的空间。',
    terms: [
      { term: '可迭代对象', plain: '能用 for 遍历的东西，比如列表、字符串、字典、文件。' },
      { term: '迭代器', plain: '真正干活的「取数员」，每次 next 给你一个，取完就抛 StopIteration 报到。' },
      { term: 'yield', plain: '函数里的「暂停键 + 出货口」，产出一次就停在那里，下次再继续。' },
      { term: '惰性求值', plain: '不提前算，等真要用了才算，省内存也省时间。' },
    ],
    content: `## 一、为什么需要它（知识背景）

前面处理数据，习惯先造一个列表装下全部结果。数据只有几十条时没问题，一旦是十万行日志、一千万条记录，这个列表会把内存吃光，程序直接崩掉。

更麻烦的是，有些数据根本没法一次装完：键盘输入是源源不断的、传感器每秒都在产生新值、文件可能比内存还大。你需要的不是「一整箱数据」，而是「一个能按需取数的水龙头」。

生成器就是那个水龙头。它不预先算好所有结果，而是每次被要的时候才算一个、给一个。Python 里所有 for 循环其实早就在用这套机制，只是隐藏起来了。

## 二、概念解释

先把两个容易混的词分开。

**可迭代对象**：身上带 __iter__ 方法的东西，列表、字符串、字典、range、文件都是。它的作用是「能交出迭代器」。

**迭代器**：身上同时带 __iter__ 和 __next__ 的东西。__next__ 每调用一次就吐出一个值，吐完了抛 StopIteration 异常。它是一次性的，走到底就废了。

for 循环做了三件事：先对可迭代对象调用 iter() 拿到迭代器，然后反复调用 next() 取值，直到捕获 StopIteration 就安静地结束。这就是为什么 for 循环不需要你写「判断是否到头」。

**生成器**是迭代器的一种，写起来最省事：函数里出现 yield，这个函数就不再是普通函数，而是一个「生成器工厂」。调用它不会执行函数体，只会返回一个生成器对象；每次 next 才推进到下一个 yield。

## 三、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| iter(x) | 拿到 x 的迭代器 | it = iter([1, 2, 3]) |
| next(it) | 取下一个值，取完抛 StopIteration | next(it) 得到 1 |
| yield 值 | 产出一个值并暂停，下次从这里继续 | yield n |
| 生成器表达式 | 圆括号版推导式，按需产出 | (n * n for n in range(5)) |
| list(gen) | 一次性把生成器掏空变成列表 | list(squares) |

三条必须记住的规则：

第一，**生成器只能遍历一次**。第一次 for 走完，它就空了，再遍历得到的是空气。需要重复用就 list() 存下来。

第二，**函数体不会在调用时执行**。写 gen = countdown(3) 时一行都没跑，只有 next 或 for 才真正开始。

第三，**yield 会记住现场**。局部变量、执行到哪一行，全部冻结在那里，下次从冻结点继续，这是它和 return 最本质的区别。

## 四、逐步演示（分步骤）

第一步：写一个普通列表版。用循环把 1 到 3 装进列表再返回，跑通，观察内存里确实有 3 个元素。

第二步：把 return 那一行换成 yield，函数立刻变成生成器。此时 print(函数名(3)) 会显示 generator object，而不是列表。

第三步：用 for 遍历这个生成器，输出和列表版一模一样，但内存里从来没有同时存在 3 个值。

第四步：手动用 next 试三次，第四次会抛 StopIteration，你就亲眼看到 for 循环在背后处理的到底是什么。

第五步：把同一个生成器遍历两次，第二次是空的，记住这个坑。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 第二次遍历没有任何输出 | 生成器已被掏空 | 需要复用就先 list() 存下来 |
| 调用函数后什么都没打印 | 函数体里有 yield，调用只创建对象 | 用 for 或 next 真正驱动它 |
| TypeError: 'generator' object is not subscriptable | 对生成器用了下标 | 先转成 list，或用 itertools.islice |
| 函数里混用 return 值和 yield | 有 yield 时 return 只能提前结束 | 想要列表就别用 yield |

## 六、实际用途

读大文件是生成器最经典的主场。不用 readlines 一次性把整本读进内存，而是 for line in f 一行行处理，内存占用恒定。

无限序列也是它的强项。写一个不断产出斐波那契数的生成器，调用方用多少取多少，永远不会「算到天荒地老」。标准库里的 itertools.count 就是这样一个无限计数器。

流水线也是常见用法：读文件是生成器，清洗是生成器，统计是生成器，三段串起来，数据像水一样流过，中间不落地。`,
    examples: [
      {
        title: 'for 循环背后：iter 与 next',
        intro: '手动扮演一次 for 循环，你会看到它到底在跟谁打交道。',
        code: `nums = [10, 20, 30]

it = iter(nums)
print(type(it).__name__)
print(next(it))
print(next(it))
print(next(it))
# 再取一次会抛 StopIteration，for 就是靠捕获它来结束循环
try:
    next(it)
except StopIteration:
    print("取完了")`,
        expectedOutput: `list_iterator
10
20
30
取完了`,
        lines: [
          { code: 'it = iter(nums)', explain: '向列表要一个迭代器，列表本身不是迭代器，它只是「能交出迭代器」。' },
          { code: 'print(type(it).__name__)', explain: '打印类型名，说明拿到的确实是一个 list_iterator 对象。' },
          { code: 'print(next(it))', explain: '每调用一次吐一个值，并且记住走到哪了。' },
          { code: 'except StopIteration:', explain: '取完后再 next 会抛出这个异常，for 循环内部正是捕获它然后正常退出。' },
        ],
        trace: [
          { step: 'iter(nums) 之后', state: 'it 指向列表开头，还没取任何值' },
          { step: '第一次 next', state: '返回 10，it 内部指针移到 20 前面' },
          { step: '第三次 next', state: '返回 30，指针已到末尾' },
          { step: '第四次 next', state: '抛 StopIteration，被 except 捕获并打印「取完了」' },
        ],
        tryIt: '把 try 里的 next(it) 改成两次，观察会打印几次「取完了」。',
      },
      {
        title: '用 yield 写生成器，并验证它只能用一次',
        intro: '同一个倒数逻辑，用 yield 写出来，再对比生成器表达式和列表的差别。',
        code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

for x in countdown(3):
    print("倒数", x)

# 生成器表达式：方括号换成圆括号，不提前占内存
squares = (i * i for i in range(5))
print(list(squares))

# 同一个生成器遍历第二次，什么也拿不到
gen = (i for i in range(3))
print(list(gen))
print(list(gen))`,
        expectedOutput: `倒数 3
倒数 2
倒数 1
[0, 1, 4, 9, 16]
[0, 1, 2]
[]`,
        lines: [
          { code: 'yield n', explain: '产出当前 n 并暂停，函数状态冻结在这一行，下次从下一行继续。' },
          { code: 'for x in countdown(3):', explain: '调用 countdown 只是造出生成器，for 才开始一步步驱动它。' },
          { code: 'squares = (i * i for i in range(5))', explain: '圆括号是生成器表达式，此时一个平方都还没算。' },
          { code: 'print(list(gen)) 第二遍', explain: '生成器已被掏空，第二次得到空列表，这是它和列表最大的区别。' },
        ],
        trace: [
          { step: 'countdown(3) 被调用', state: '返回生成器对象，函数体一行都没执行' },
          { step: '第一次 for 取值', state: 'n = 3，产出 3，暂停在 yield 处' },
          { step: '第二次 for 取值', state: '从 yield 下一行继续，n 变 2，再产出 2' },
          { step: 'n 减到 0', state: 'while 结束，生成器正常终止，for 静默退出' },
          { step: 'list(gen) 第二次', state: '生成器已耗尽，返回 []' },
        ],
        tryIt: '把 countdown 里的 yield n 改成 yield n * 10，看输出怎么变。',
      },
    ],
    compare: [
      {
        conceptA: '可迭代对象',
        conceptB: '迭代器',
        diff: '前者只要能交出迭代器就行，可以反复遍历；后者自己是「一次性取数员」，走到底就废了。',
        example: '[1, 2, 3] 是前者，iter([1, 2, 3]) 是后者',
      },
      {
        conceptA: '列表',
        conceptB: '生成器',
        diff: '列表一次算完、占满内存、可反复用；生成器按需产出、几乎不占内存、只能用一次。',
        example: '[i for i in range(10**6)] 与 (i for i in range(10**6))',
      },
    ],
    pitfalls: [
      '以为调用生成器函数就会执行函数体，其实要 for 或 next 才真正开始。',
      '把生成器遍历两次，第二次拿到空结果，还以为代码坏了。',
      '对生成器用 len() 或下标，两者都不支持。',
      '在生成器里写 return 一个值，以为能拿到，其实那个值只会进异常的 args。',
      '用生成器表达式做需要多次遍历的判断，结果第二遍数据全没了。',
    ],
    keyPoints: [
      'for 循环内部先 iter 再反复 next，靠 StopIteration 结束。',
      '生成器函数调用后不执行，只返回一个可迭代的生成器对象。',
      'yield 会冻结现场，下次从暂停处继续，这是它和 return 的根本区别。',
      '生成器只能遍历一次，需要复用先转成列表。',
      '处理大文件、无限序列、多段流水线时优先考虑生成器。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第1章 Python 基础', note: '生成器属进阶主题，教材未展开，本课做了补充' },
    ],
    prerequisites: ['s4-04', 's5-03'],
    task: '写一个生成器函数 fib(n)，依次产出前 n 个斐波那契数，用 for 打印出来。再写一个「无限版」的，用 itertools.islice 只取前 10 个。',
    exercises: [
      {
        id: 's8-02-q1',
        qtype: 'single',
        stem: '列表和生成器最主要的区别是什么？',
        options: [
          'A. 列表只能存数字，生成器什么都能存',
          'B. 列表会一次性把所有元素放进内存，生成器按需一个个产出',
          'C. 生成器比列表慢，所以不常用',
          'D. 列表只能用 for 遍历，生成器只能用 while',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：本题考查生成器的核心价值——惰性求值，它不预先算完，而是被要一次给一个。\n逐步演示：[i for i in range(10**7)] 会真的造出一千万个整数，内存立刻飙升；而 (i for i in range(10**7)) 几乎瞬间完成，只占一个对象的位置，for 到第几个才算到第几个。\n易错提醒：生成器并不「更快」，它的优势是内存，把生成器用来做需要反复随机访问的操作反而会吃亏。',
      },
      {
        id: 's8-02-q2',
        qtype: 'boolean',
        stem: '一个生成器被 for 循环完整遍历一次之后，再遍历它还能拿到同样的元素。',
        answer: '错',
        explanation:
          '答案：错。\n思路：生成器是迭代器，内部只有一个向前的指针，走到底就耗尽，不会自动回到开头。\n逐步演示：gen = (i for i in range(3))；第一次 list(gen) 得到 [0, 1, 2]；第二次 list(gen) 得到 []。想要重复用，必须先 data = list(gen) 把结果固定下来。\n易错提醒：这个坑在「先算一次总数、再遍历打印」的场景里特别常见，第二次结果永远是空的。',
      },
      {
        id: 's8-02-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请按 print 的真实格式写出这一行结果。',
        code: `gen = (x for x in [1, 2, 3])
print(sum(gen), sum(gen))`,
        keywords: [['6 0', '6  0']],
        explanation:
          '答案：6 0。\n思路：第一次 sum 把生成器掏空，得到 1+2+3=6；第二次面对的是已经耗尽的生成器，sum 只能得到 0。\n逐步演示：sum 内部就是 for 循环不断 next，第一次走完三个值并触发 StopIteration 结束；第二次一开始就 StopIteration，累加器保持初始值 0。\n易错提醒：如果换成列表 [1, 2, 3]，两次都会输出 6，很多人就是被列表的习惯误导了。',
      },
      {
        id: 's8-02-q4',
        qtype: 'blank',
        stem: '要让下面的函数变成生成器，横线处应填的关键字是：def nums(): ______ 1; yield 2。请只填这个关键字。',
        answer: 'yield',
        accepted: ['yield', 'yield 1'],
        explanation:
          '答案：yield。\n思路：只要函数体里出现 yield，这个函数就会被 Python 认定为生成器函数，调用它返回的是生成器对象。\n逐步演示：写成 yield 1 之后，nums() 不再返回 1，而是返回一个生成器；用 next(nums()) 才能拿到 1。\n易错提醒：写成 return 1 就变成普通函数，只返回一个值，函数就结束了，不会暂停。',
      },
      {
        id: 's8-02-q5',
        qtype: 'program',
        stem: '写一个生成器函数 countdown(n)，从 n 开始倒数到 1，每个数单独一行打印。用 countdown(3) 调用，输出三行，依次是 3、2、1。',
        answer: '',
        testCases: [{ stdin: '', expected: '3\n2\n1' }],
        explanation:
          '答案：\n代码如下：\n\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor x in countdown(3):\n    print(x)\n\n思路：用 while 控制边界，yield 产出当前值并暂停，n -= 1 写在 yield 后面，下次恢复时才会执行。\n逐步演示：n=3 时产出 3；恢复后 n 变 2，产出 2；再恢复 n 变 1，产出 1；再恢复 n 变 0，while 不成立，生成器结束。\n易错提醒：如果先写 n -= 1 再 yield，第一个输出的会是 2，最后一个变成 0，边界完全错位。',
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's8-03',
    stageId: 8,
    order: 3,
    title: '装饰器基础',
    subtitle: '不改原函数，给它套一层外挂',
    hook: '你写了 30 个函数，现在想给每个都加上「运行耗时」的打印，难道要改 30 遍？',
    objectives: [
      '能说出函数可以像数字一样被赋值、传参、返回',
      '能看懂闭包为什么能记住外层变量',
      '能解释装饰器就是「收一个函数、还一个新函数」',
      '能写出最简单的装饰器，并说清 @ 语法糖做了什么',
    ],
    analogy:
      '装饰器像给手机套壳：手机还是那个手机，功能一点没改，但你现在拿起来的是「手机 + 壳」。想换壳随时换，手机本身不用动一颗螺丝。',
    terms: [
      { term: '一等对象', plain: '能赋值给变量、能当参数传、能当返回值的东西，函数在 Python 里就是这样。' },
      { term: '闭包', plain: '内层函数记住了外层函数的变量，外层结束后这些变量还活着。' },
      { term: '装饰器', plain: '一个接收函数、返回新函数的函数，用来在原函数前后加料。' },
      { term: '语法糖', plain: '写起来更甜的简写，@ 就是 f = deco(f) 的简写。' },
    ],
    content: `## 一、为什么需要它（知识背景）

给函数加日志、加计时、加权限校验，是每个项目都会遇到的需求。最直接的做法是打开每个函数，在开头和结尾各插几行。问题是：三十个函数要改三十遍，以后想改格式又要改三十遍；更糟的是业务代码被日志代码淹没，谁也看不懂原来在干什么。

更好的思路是「横切」：功能还是原来那个功能，我在外面包一层，进入前做点事、出去后做点事，原函数一行不改。这就是装饰器要解决的问题。

要理解装饰器，得先接受一件对新手来说有点反直觉的事：**函数在 Python 里也是一种普通对象**。

## 二、概念解释

函数能赋值给变量（f = double），能放进列表，能当参数传给别的函数，也能作为返回值返回。既然函数能当参数、能当返回值，那就可以写一个「专门加工函数的函数」。

这个加工函数长这样：接收一个函数，在内部定义一个新的函数，新函数里先干点别的事，再调用原函数，最后把新函数返回出去。

内层函数怎么记得住外层的那个 func？靠闭包。闭包就是内层函数把外层函数的变量「背在身上」，即使外层函数早就返回了，那些变量依然活着。所以 wrapper 每次被调用，都还能找到它包着的原函数。

装饰器的本质只有一句话：**接收函数、返回新函数**。

## 三、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| 手动装饰 | 把函数传进去再赋值回来 | greet = log(greet) |
| @ 语法糖 | 写在 def 上一行，等价于上面那行 | @log 然后 def greet() |
| 通用参数 | 用 *args, **kwargs 接住任意参数 | def wrapper(*args, **kwargs) |
| 带参数的装饰器 | 外面再套一层，先收配置再收函数 | @repeat(3) |
| functools.wraps | 保留原函数的名字和文档字符串 | @functools.wraps(func) |

三条规则：

第一，**装饰器必须返回一个可调用的东西**。忘了写 return wrapper，函数名就变成 None，调用时报 not callable。

第二，**参数要原样转发**。wrapper 里必须写 func(*args, **kwargs)，少写一个星号就会把列表当成一个参数塞进去。

第三，**@ 是从下往上生效的**。两个装饰器叠在一起，靠近 def 的那个先包，远的后包。

## 四、逐步演示（分步骤）

第一步：写一个普通函数 add，正常调用，确认返回正确。

第二步：写一个 log_calls 函数，参数是一个函数，内部定义 wrapper，wrapper 里打印再调用原函数，最后 return wrapper。

第三步：手动装饰 add = log_calls(add)，再调用 add(2, 3)，观察多出来的两行打印。

第四步：把 add = log_calls(add) 删掉，改成在 def add 上面写 @log_calls，行为完全一样，这就是语法糖。

第五步：想给装饰器传配置（比如重复三次），就在最外面再套一层函数，先收配置、返回真正的装饰器。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| TypeError: 'NoneType' object is not callable | 装饰器忘了 return wrapper | 在装饰器末尾返回内层函数 |
| TypeError: wrapper() takes 0 positional arguments | wrapper 没写 *args | 用 *args, **kwargs 全接住 |
| 函数名变成了 wrapper | 没有用 functools.wraps | 给 wrapper 加 @functools.wraps(func) |
| @repeat(3) 报错 takes 1 argument | 忘了带参数装饰器要多套一层 | 三层结构：收配置、收函数、收参数 |

## 六、进阶：带参数的装饰器

@repeat(3) 这种写法，为什么能带括号？因为 repeat(3) 先被调用，返回的才是一个真正的装饰器。也就是说，带参数的装饰器比普通装饰器多一层：最外层收配置，中间层收函数，最内层收调用参数。三层看着吓人，其实每层职责都很清楚。

实际项目里，计时、日志、重试、缓存、权限校验几乎都是装饰器的形态，Flask 的路由 @app.route 也是。看懂这一课，后面读框架源码就不会一头雾水。`,
    examples: [
      {
        title: '函数是对象，闭包会记住现场',
        intro: '先把地基看清：函数能当参数传，内层函数能记住外层变量。',
        code: `def apply(func, value):
    return func(value)

def double(x):
    return x * 2

print(apply(double, 21))

def make_counter():
    count = 0
    def step():
        nonlocal count
        count += 1
        return count
    return step

c1 = make_counter()
print(c1(), c1(), c1())
c2 = make_counter()
print(c2())`,
        expectedOutput: `42
1 2 3
1`,
        lines: [
          { code: 'print(apply(double, 21))', explain: '把函数 double 当普通参数传进去，在 apply 内部再调用它。' },
          { code: 'def step():', explain: '内层函数引用了外层的 count，这就是闭包。' },
          { code: 'nonlocal count', explain: '声明「我要改的是外层的 count」，不写这行 Python 会当成新建局部变量并报错。' },
          { code: 'c2 = make_counter()', explain: '每次调用都创建一套全新的 count，所以 c2 从 1 重新开始。' },
        ],
        trace: [
          { step: 'apply(double, 21)', state: 'func 指向 double，value 是 21，返回 42' },
          { step: 'c1 = make_counter()', state: '创建了一个 count = 0 的私有空间，返回 step 函数' },
          { step: 'c1() 三次', state: 'count 依次变成 1、2、3，都被记住' },
          { step: 'c2 = make_counter()', state: '又开了一套新的 count = 0，与 c1 互不影响' },
        ],
        tryIt: '把 nonlocal count 删掉再运行，看看报什么错，理解为什么必须声明。',
      },
      {
        title: '写一个日志装饰器，再写一个带参数的装饰器',
        intro: '第一个装饰器在调用前后各打印一行；第二个能接收「重复几次」这个配置。',
        code: `def log_calls(func):
    def wrapper(*args, **kwargs):
        print("调用", func.__name__, "参数", args)
        result = func(*args, **kwargs)
        print("返回", result)
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

print("结果", add(2, 3))

def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print("你好", name)

greet("小林")`,
        expectedOutput: `调用 add 参数 (2, 3)
返回 5
结果 5
你好 小林
你好 小林
你好 小林`,
        lines: [
          { code: 'def wrapper(*args, **kwargs):', explain: '星号把任意数量的位置参数和关键字参数都接住，再原样转发给原函数。' },
          { code: 'return wrapper', explain: '装饰器必须还一个新函数回去，漏了这行 add 就变成 None。' },
          { code: '@log_calls', explain: '等价于 add = log_calls(add)，此后 add 这个名字指向的是 wrapper。' },
          { code: '@repeat(3)', explain: '先调用 repeat(3) 得到 decorator，再用它装饰 greet，所以要多一层。' },
        ],
        trace: [
          { step: '定义 add 时', state: 'add 被 log_calls 包住，add 实际指向 wrapper' },
          { step: '调用 add(2, 3)', state: 'args = (2, 3)，先打印「调用 add 参数 (2, 3)」' },
          { step: 'wrapper 内部调用 func', state: '真正的 add 执行，返回 5，打印「返回 5」' },
          { step: 'greet("小林")', state: 'repeat 让 wrapper 循环 3 次，每次都调用原 greet' },
        ],
        tryIt: '把 @repeat(3) 改成 @repeat(1)，输出应该只剩一行「你好 小林」。',
      },
    ],
    compare: [
      {
        conceptA: '直接改函数内部',
        conceptB: '用装饰器包一层',
        diff: '前者把业务逻辑和辅助逻辑搅在一起，改一次要动很多地方；后者原函数保持干净，辅助功能可插可拔。',
        example: '在函数里写 print(耗时) 与在外面套 @timer',
      },
      {
        conceptA: '普通装饰器',
        conceptB: '带参数的装饰器',
        diff: '前者两层（收函数、收参数），后者三层（收配置、收函数、收参数）。',
        example: '@log 与 @repeat(3)',
      },
    ],
    pitfalls: [
      '装饰器里忘了 return wrapper，函数名变成 None。',
      'wrapper 只写 ()，原函数有参数就报 TypeError。',
      '忘记 *args 前面的星号，把整个列表当成一个参数传进去。',
      '在 wrapper 里调用 func 却忘了 return 它的结果，调用方拿到 None。',
      '带参数的装饰器少套一层，导致 @repeat 直接收到函数而不是数字。',
    ],
    keyPoints: [
      '函数是一等对象，可以赋值、传参、返回。',
      '闭包让内层函数记住外层变量，外层返回后依然有效。',
      '装饰器 = 接收函数、返回新函数，本质是一次函数替换。',
      '@deco 就是 f = deco(f) 的简写。',
      '带参数的装饰器要三层：配置、函数、参数。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数' },
      { book: 'abs3', chapter: '第1章 Python 基础', note: '装饰器属进阶主题，教材仅提及，本课做了扩展' },
    ],
    prerequisites: ['s5-08', 's5-07'],
    task: '写一个装饰器 timer，用 time.perf_counter 记录函数运行时间并打印「函数名 耗时 x.xxxx 秒」，用它装饰一个循环一百万次的求和函数。',
    exercises: [
      {
        id: 's8-03-q1',
        qtype: 'single',
        stem: '装饰器的本质是什么？',
        options: [
          'A. 修改原函数内部的代码',
          'B. 接收一个函数，返回一个新的函数',
          'C. 把函数变成字符串',
          'D. 让函数运行得更快',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：装饰器不碰原函数一行代码，它只是造一个 wrapper 包在外面，然后把名字重新绑定到 wrapper 上。\n逐步演示：@log 之后，add 这个名字其实指向 wrapper，wrapper 内部保存着原来的 add。调用 add(2, 3) 实际是调用 wrapper(2, 3)，再由 wrapper 去调原函数。\n易错提醒：装饰器不会自动提升性能，它甚至因为多一层调用而略微变慢，它买的是「可维护性」。',
      },
      {
        id: 's8-03-q2',
        qtype: 'boolean',
        stem: '在 def 上方写 @deco，等价于在这段 def 之后写 func = deco(func)。',
        answer: '对',
        explanation:
          '答案：对。\n思路：@ 是纯粹的语法糖，Python 在定义完函数后立刻把它传给装饰器，再把返回值绑定回原名。\n逐步演示：\n@log\ndef add(a, b): return a + b\n\n和\n\ndef add(a, b): return a + b\nadd = log(add)\n\n两段完全等价，前者只是更易读。\n易错提醒：@ 的执行时机是「定义时」，不是「调用时」，所以装饰器里的 print 会在定义那一刻就跑一次。',
      },
      {
        id: 's8-03-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请写出 print 的那一行结果。',
        code: `def deco(f):
    def w():
        return f() + "!"
    return w

@deco
def hi():
    return "hi"

print(hi())`,
        keywords: [['hi!'], ['hi', '感叹号']],
        explanation:
          '答案：hi!。\n思路：@deco 把 hi 换成了 w，调用 hi() 实际调用 w()，w 内部先拿到原函数的返回值 hi，再拼一个感叹号。\n逐步演示：定义 hi 时，deco(hi) 返回 w，hi 指向 w；调用 hi() 进入 w；w 调用原来的 hi 得到 hi；拼接后返回 hi!；最后 print 输出 hi!。\n易错提醒：容易忽略 @ 的替换作用，以为 hi() 还是原来那个函数，其实它已经是 w 了。',
      },
      {
        id: 's8-03-q4',
        qtype: 'blank',
        stem: '写一个能接住任意参数的 wrapper 时，函数头的第一个参数要写成 ______（三个字符）。请填出这三个字符。',
        answer: '*args',
        accepted: ['*args', '* args', '＊args'],
        explanation:
          '答案：*args。\n思路：星号把调用时传来的所有位置参数打包成一个元组，再原样转发给原函数，这样装饰器才能通用于任何函数。\n逐步演示：wrapper(*args, **kwargs) 里，调用 add(2, 3) 时 args 是 (2, 3)；执行 func(*args) 时星号又把元组拆开成两个参数，正好对上原函数的 a 和 b。\n易错提醒：漏掉星号写成 args，就会把 (2, 3) 整个元组当成一个参数传进去，原函数收到的数量不对，直接报错。',
      },
      {
        id: 's8-03-q5',
        qtype: 'program',
        stem: '写一个装饰器 shout，它把被装饰函数的返回值全部转成大写。用它装饰一个无参数函数 greet，返回 hello，最后打印 greet() 的结果。只输出一行。',
        answer: '',
        testCases: [{ stdin: '', expected: 'HELLO' }],
        explanation:
          '答案：\n代码如下：\n\ndef shout(func):\n    def wrapper():\n        return func().upper()\n    return wrapper\n\n@shout\ndef greet():\n    return "hello"\n\nprint(greet())\n\n思路：装饰器接收原函数，wrapper 里先调用原函数拿到 hello，再用 upper 转成大写返回。\n逐步演示：定义 greet 时被 shout 包装，greet 指向 wrapper；print(greet()) 进入 wrapper；wrapper 调用原 greet 得到 hello；upper 后得到 HELLO；print 输出 HELLO。\n易错提醒：忘了 return wrapper 会让 greet 变成 None；在 wrapper 里忘了 return 会把大写结果丢掉，print 出来是 None。',
      },
    ],
    minutes: 19,
    env: 'browser',
  },
  {
    id: 's8-04',
    stageId: 8,
    order: 4,
    title: '常用标准库',
    subtitle: '别人已经写好的轮子，直接拿来用',
    hook: '要统计一篇文章里每个词出现几次，你准备写三十行代码，还是用一行现成的？',
    objectives: [
      '能用 Counter 统计频次并取前几名',
      '能用 defaultdict 免去「先判断键在不在」的麻烦',
      '能用 namedtuple 让元组带上有意义的名字',
      '能说出 itertools 三个常用函数各自解决什么问题',
    ],
    analogy:
      '标准库像厨房自带的抽屉：刀、剪、削皮器都是现成的，你不用每次都自己打铁。真正的工夫不在于造工具，而在于知道哪个抽屉里放着什么。',
    terms: [
      { term: '标准库', plain: '装 Python 时自带的一批模块，不用额外安装就能 import。' },
      { term: 'Counter', plain: '专门数数的容器，喂给它一堆东西，它告诉你每样出现了几次。' },
      { term: 'defaultdict', plain: '取不存在的键时自动给一个默认值的字典。' },
      { term: 'namedtuple', plain: '可以用点号取字段的元组，比下标好读。' },
      { term: 'itertools', plain: '专门处理「排列、组合、拼接、无限序列」的工具箱。' },
    ],
    content: `## 一、为什么需要它（知识背景）

新手最常见的浪费，是把别人早就写好、还经过千万人验证的东西，自己从零再写一遍。

举例：统计词频。你会建空字典，遍历每个词，判断在不在字典里，在就加一，不在就设为 1。这段代码没错，但 Python 的 collections 里有个 Counter，一行就能得到同样的结果，还自带「取前 N 名」的方法。

标准库的价值在于：它是随 Python 一起装好的，不联网、不装包、直接用；而且它的边界情况（空列表、重复键、超大数字）都被处理过了，你不需要自己踩一遍坑。

## 二、概念解释

这一课挑四个最常用的抽屉。

**collections** 是「容器加强包」。Counter 是计数器，本质是「元素到次数」的字典；defaultdict 是带默认值的字典，取不存在的键不会报 KeyError，而是自动建一个；namedtuple 是给元组的每个位置起名字，读起来像对象。

**itertools** 是「序列加工厂」。chain 把多个序列首尾相接；combinations 列出所有组合；count 造一个无限递增的序列。

**random** 负责随机，做抽奖、洗牌、模拟都靠它。**math** 负责数学函数，最大公约数、开方、取整、三角函数都在里面。

它们共同的思路是：**不要自己造，先搜一下有没有现成的**。

## 三、语法与使用规则

| 模块 | 常用写法 | 作用 |
| --- | --- | --- |
| collections | Counter(列表) | 统计每个元素出现次数 |
| collections | counter.most_common(2) | 取出现最多的前 2 项 |
| collections | defaultdict(int) | 取不存在的键时自动得到 0 |
| collections | namedtuple('P', ['x', 'y']) | 造一个带字段名的元组类型 |
| itertools | chain(a, b) | 把两个序列接成一个 |
| itertools | combinations(seq, 2) | 所有两两组合 |
| itertools | islice(count(10, 5), 3) | 从无限序列里安全地取 3 个 |
| random | seed(7) 后 randint(1, 100) | 固定随机结果，方便复现 |
| math | gcd(12, 18)、sqrt(16)、floor(3.9) | 最大公约数、开方、向下取整 |

几条经验：

第一，**Counter 的结果是字典**，可以直接用键取值，也可以用 most_common 排序。

第二，**defaultdict 必须告诉它默认值是什么类型**，写 int 得到 0，写 list 得到空列表。

第三，**无限序列一定要用 islice 截断**，直接 list(count()) 会把内存吃干。

第四，**用 random 做实验时先 seed**，否则每次结果都不同，没法验证。

## 四、逐步演示（分步骤）

第一步：import 需要的模块，注意是 from collections import Counter 还是 import collections，两种写法取用时不一样。

第二步：先跑 counter = Counter(votes)，print 出来看结构，确认它是一个「元素到次数」的字典。

第三步：调 most_common(2)，观察返回的是列表，里面是元组，不是字典。

第四步：用 defaultdict(int) 做分组累加，直接写 by_cat[key] += n，不用先判断键是否存在。

第五步：用 itertools 试一个组合场景，再用 islice 从 count 里安全取几个，别直接 list 无限序列。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| NameError: name 'Counter' is not defined | 只 import collections | 写成 from collections import Counter |
| KeyError: '水果' | 用了普通 dict 直接累加 | 换成 defaultdict(int)，或先用 get 取默认值 |
| 程序卡死、内存爆掉 | 对 itertools.count 用了 list | 用 islice 限定个数 |
| 每次运行随机结果都不同 | 没有设置随机种子 | 在取随机数前调 random.seed(固定值) |

## 六、怎么自己查标准库

不用背。记住三步：先搜「python + 你想做的事 + 关键词」，优先看 docs.python.org 官方文档；打开后看页首的示例，通常三五行的例子就能解决你的问题；最后看函数签名里每个参数的含义。

官方文档全英文，可以用浏览器的翻译，但函数名和参数名不要翻译，直接照着敲。`,
    examples: [
      {
        title: 'Counter、defaultdict、namedtuple 三个容器',
        intro: '三个最常用的加强容器，各解决一类「手写很啰嗦」的问题。',
        code: `from collections import Counter, defaultdict, namedtuple

votes = ["苹果", "香蕉", "苹果", "橙子", "苹果", "香蕉"]
counter = Counter(votes)
print(counter)
print(counter.most_common(2))

sales = [("水果", 30), ("蔬菜", 12), ("水果", 18)]
by_cat = defaultdict(int)
for cat, amount in sales:
    by_cat[cat] += amount
print(dict(by_cat))

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)`,
        expectedOutput: `Counter({'苹果': 3, '香蕉': 2, '橙子': 1})
[('苹果', 3), ('香蕉', 2)]
{'水果': 48, '蔬菜': 12}
3 4`,
        lines: [
          { code: 'counter = Counter(votes)', explain: '把整个列表喂进去，直接得到每个元素的出现次数，不用自己写循环。' },
          { code: 'print(counter.most_common(2))', explain: '按次数从高到低返回前 2 名，结果是列表套元组。' },
          { code: 'by_cat = defaultdict(int)', explain: '声明默认值是 0，第一次遇到「水果」这个键时自动得到 0，可以直接 +=。' },
          { code: 'Point = namedtuple("Point", ["x", "y"])', explain: '定义一个带字段名的元组类型，取用时写 p.x 而不是 p[0]。' },
        ],
        trace: [
          { step: '统计 votes', state: '苹果出现 3 次、香蕉 2 次、橙子 1 次' },
          { step: 'most_common(2)', state: "返回 [('苹果', 3), ('香蕉', 2)]" },
          { step: '遍历 sales', state: 'by_cat 先自动建「水果」= 0，累加后为 48；蔬菜为 12' },
          { step: '构造 Point(3, 4)', state: 'p 是一个带 x、y 两个字段的元组，取 p.x 得到 3' },
        ],
        tryIt: '给 votes 再加三个「橙子」，看看 most_common 的第一名会不会换人。',
      },
      {
        title: 'itertools、random、math 各来一个真实用途',
        intro: '拼接菜单、抽两两配对、从无限计数器里安全取值，都是日常会遇到的场景。',
        code: `import itertools
import math
import random

print(list(itertools.chain([1, 2], [3, 4])))
print(list(itertools.combinations(["A", "B", "C"], 2)))
print(list(itertools.islice(itertools.count(10, 5), 3)))

random.seed(7)
print(random.randint(1, 100))
random.seed(7)
print(random.choice(["石头", "剪刀", "布"]))

print(math.gcd(12, 18), math.sqrt(16), math.floor(3.9))`,
        expectedOutput: `[1, 2, 3, 4]
[('A', 'B'), ('A', 'C'), ('B', 'C')]
[10, 15, 20]
42
剪刀
6 4.0 3`,
        lines: [
          { code: 'itertools.chain([1, 2], [3, 4])', explain: '把两个列表首尾接起来，不用先相加再复制。' },
          { code: 'itertools.combinations(列表, 2)', explain: '列出所有「任取两个」的组合，不考虑顺序，所以 A、B 只出现一次。' },
          { code: 'itertools.islice(itertools.count(10, 5), 3)', explain: 'count 是无限的（10、15、20、25…），islice 只取前 3 个，安全。' },
          { code: 'random.seed(7)', explain: '固定随机种子，保证每次运行得到同一串随机数，方便验证和调试。' },
        ],
        trace: [
          { step: 'chain 执行', state: '先吐出 1、2，再吐出 3、4，合成 [1, 2, 3, 4]' },
          { step: 'combinations 执行', state: '三选二的组合共 3 组，每组是元组' },
          { step: 'islice 执行', state: '从 10 开始每次加 5，取 10、15、20 后停止' },
          { step: 'gcd / sqrt / floor', state: '12 和 18 的最大公约数是 6，16 开方是 4.0，3.9 向下取整是 3' },
        ],
        tryIt: '把 seed(7) 改成 seed(1)，随机数会变，但每次运行依然固定。',
      },
    ],
    compare: [
      {
        conceptA: 'dict 直接累加',
        conceptB: 'defaultdict 直接累加',
        diff: '前者键不存在时抛 KeyError，要先判断或用 get；后者自动建默认值，代码短一半。',
        example: 'd[k] = d.get(k, 0) + 1 与 d[k] += 1',
      },
      {
        conceptA: 'most_common()',
        conceptB: 'sorted(d.items())',
        diff: '前者按次数降序，专为计数设计；后者默认按键排序，要按值排还得写 key 函数。',
        example: 'counter.most_common(3) 与 sorted(d.items(), key=lambda kv: kv[1], reverse=True)',
      },
    ],
    pitfalls: [
      '只写 import collections，却直接用 Counter，报 NameError。',
      'defaultdict 忘了传默认类型，写成 defaultdict()，一取新键就报错。',
      '对 itertools.count 用 list()，程序直接卡死。',
      '给 namedtuple 传字段名时用空格分隔的字符串写错位置，字段顺序对不上。',
      'random 忘了 seed，每次跑出来的结果都不一样，误以为代码有 bug。',
    ],
    keyPoints: [
      '标准库随 Python 自带，先查有没有现成的，再决定要不要自己写。',
      'Counter 专治计数，most_common 直接给出排行榜。',
      'defaultdict(int) 让「按类别累加」变成一行。',
      'itertools 负责拼接、组合、无限序列，无限序列必须用 islice 截断。',
      'random 加 seed 才能复现结果。',
    ],
    sources: [
      { book: 'update', chapter: 'Python 标准库速查（教材附录之外的补充）' },
      { book: 'abs3', chapter: '第1章 Python 基础', note: '标准库模块属扩展内容，教材未系统展开' },
    ],
    prerequisites: ['s7-01'],
    task: '用 Counter 统计一段 200 字的中文里每个字出现的次数，打印出现最多的 5 个字；再用 combinations 列出 4 个人两两握手的所有组合。',
    exercises: [
      {
        id: 's8-04-q1',
        qtype: 'single',
        stem: '要统计一个列表里每个元素出现的次数，最省事的做法是？',
        options: [
          'A. 用 Counter 直接统计',
          'B. 用 set 去重后数长度',
          'C. 用 sorted 排序后取第一个',
          'D. 用 len 除以元素个数',
        ],
        answer: 'A',
        explanation:
          '答案：A。\n思路：Counter 就是为「计数」这件事设计的容器，喂给它任何可迭代对象，返回元素到次数的映射。\n逐步演示：把「a、b、a」这个列表交给 Counter，会得到 a 对应 2、b 对应 1 的映射，之后可以用 most_common(1) 直接取出现次数最多的元素。\n易错提醒：set 只能去重，拿不到次数；len 只能告诉你总数，告诉不了每个元素各自出现了几次。',
      },
      {
        id: 's8-04-q2',
        qtype: 'boolean',
        stem: 'itertools.count() 可以造出无限长的序列，所以可以直接用 list() 把它转成列表。',
        answer: '错',
        explanation:
          '答案：错。\n思路：count 永远不停止，list 会一直往内存里塞，直到程序被系统杀掉。\n逐步演示：list(itertools.count()) 会不断追加 0、1、2、3……内存持续上涨，最终卡死或崩溃。正确做法是 itertools.islice(itertools.count(), 10) 限定只取 10 个。\n易错提醒：无限序列不是不能用，而是必须先截断再用，这是生成器「惰性」特性带来的必然要求。',
      },
      {
        id: 's8-04-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请按 print 的真实格式写出这一行。',
        code: `from collections import Counter
print(Counter("aab").most_common(1))`,
        keywords: [["[('a', 2)]", "[('a',2)]"], ["a", "2"]],
        explanation:
          '答案：[(a, 2)]，实际输出是带引号的 [(\'a\', 2)]。\n思路：字符串也能被统计，a 出现 2 次、b 出现 1 次，most_common(1) 取最多的那一项。\n逐步演示：Counter("aab") 相当于 Counter(["a", "a", "b"])，得到 a 对应 2、b 对应 1；most_common(1) 返回列表，里面第一个元素是「a 和 2」组成的元组。\n易错提醒：most_common 返回的是列表不是字典，所以输出外面是方括号；另外字符串会被逐字符拆开统计，不是整个单词。',
      },
      {
        id: 's8-04-q4',
        qtype: 'blank',
        stem: '要让字典在访问不存在的键时自动得到 0，应该这样构造：from collections import defaultdict 之后写 d = defaultdict(______)。请填这个内置类型名。',
        answer: 'int',
        accepted: ['int', 'int()'],
        explanation:
          '答案：int。\n思路：defaultdict 的参数是「默认值的工厂」，int() 不带参数时返回 0，正好用作计数起点。\n逐步演示：d = defaultdict(int) 之后，d["苹果"] += 1 第一次执行时，d 自动创建 d["苹果"] = 0，再加 1 变成 1，全程不会抛 KeyError。\n易错提醒：写成 defaultdict(0) 会报错，因为参数必须是可调用对象；想要默认空列表就传 list，不是 []。',
      },
      {
        id: 's8-04-q5',
        qtype: 'program',
        stem: '用 Counter 统计字符串 abracadabra 中出现次数最多的字符，打印该字符和次数，中间用一个空格分隔。只输出一行。',
        answer: '',
        testCases: [{ stdin: '', expected: 'a 5' }],
        explanation:
          '答案：\n代码如下：\n\nfrom collections import Counter\n\nc = Counter("abracadabra")\nch, n = c.most_common(1)[0]\nprint(ch, n)\n\n思路：most_common(1) 返回列表，取第 0 项得到元组（字符, 次数），再用两个变量接住。\n逐步演示：统计结果是 a 出现 5 次、b 2 次、r 2 次、c 1 次、d 1 次；most_common(1) 返回一个列表，里面装着「a 和 5」这个元组；解包后 ch 是 a，n 是 5；print 用逗号分隔自动补一个空格。\n易错提醒：直接 print(c.most_common(1)) 会输出带方括号和引号的形式，不符合题目要求；用逗号而不是加号拼接，才能自动得到那个空格。',
      },
    ],
    minutes: 17,
    env: 'browser',
  },
  {
    id: 's8-05',
    stageId: 8,
    order: 5,
    title: '时间与日期',
    subtitle: '把「几月几号」变成能计算的东西',
    hook: '距离你的生日还有多少天？如果是闰年又该怎么算——你打算掰手指，还是让程序算？',
    objectives: [
      '能创建 date 和 datetime 对象并取出年月日时分',
      '能用 strftime 格式化输出、用 strptime 解析字符串',
      '能用 timedelta 做日期加减与差值计算',
      '能说清时间处理最容易在时区上出什么问题',
    ],
    analogy:
      'date 是一张只写日期的便签，datetime 是精确到分钟的日程表，timedelta 是一把「时间长度」的尺子。便签加减尺子，得到新的便签；两张便签相减，得到尺子。',
    terms: [
      { term: 'date', plain: '只有年月日，没有时分秒。' },
      { term: 'datetime', plain: '年月日时分秒都有，是 date 的加强版。' },
      { term: 'timedelta', plain: '一段时间长度，比如 3 天、2 小时，可以加也可以减。' },
      { term: 'strftime', plain: '把时间对象变成指定格式的字符串，f 代表 format。' },
      { term: 'strptime', plain: '把字符串按指定格式解析成时间对象，p 代表 parse。' },
    ],
    content: `## 一、为什么需要它（知识背景）

「还有几天到期」「这条记录是哪一天的」「上个月 1 号到月底一共多少天」，这些问题用字符串根本算不了。字符串只能比较大小，没法做加减，遇到跨月、跨年、闰年更是灾难。

自己写日期计算，最容易出的错是：以为每个月都是 30 天、忘了二月有 29 天、把跨年算错。这些都是已经被解决过一万遍的问题，标准库的 datetime 全部处理好了。

datetime 把「时间」变成了一种真正的数据类型：它能加减、能比较、能格式化，还能精确到微秒。

## 二、概念解释

datetime 模块里有三个主角。

**date**：只关心日期，年月日。适合做「到期日」「生日」这类计算。

**datetime**：日期加时间，年月日时分秒。适合记录「什么时候发生的」。

**timedelta**：不是某个时刻，而是一段长度，比如 30 天、2 周、10 小时。它只能和 date / datetime 相加相减。

两个格式化的函数名字很像，记法很简单：**strftime 的 f 是 format（格式化输出），strptime 的 p 是 parse（解析输入）**。一个把对象变字符串，一个把字符串变对象，方向正好相反。

## 三、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| date(年, 月, 日) | 造一个日期 | date(2026, 11, 19) |
| datetime(年, 月, 日, 时, 分) | 造一个精确时刻 | datetime(2026, 11, 19, 9, 30) |
| strftime(格式) | 格式化成字符串 | d.strftime("%Y-%m-%d") |
| strptime(字符串, 格式) | 解析成 datetime | datetime.strptime(s, "%Y-%m-%d") |
| timedelta(days=n) | 造一段长度 | today + timedelta(days=30) |
| 两个日期相减 | 得到 timedelta | (d2 - d1).days |

常用格式符：%Y 四位年，%m 两位月，%d 两位日，%H 24 小时制，%M 分，%S 秒。

必须注意的三条：

第一，**格式符大小写敏感**。%m 是月，%M 是分钟，写成 %M 去解析日期会直接报错。

第二，**相减得到的是 timedelta，不是数字**。要天数就取 .days，要总秒数就取 .total_seconds()。

第三，**date 和 datetime 不能直接混着算**。两个 datetime 相减可以，date 减 datetime 会报 TypeError。

## 四、逐步演示（分步骤）

第一步：from datetime import date, datetime, timedelta，三个一起导入。

第二步：造一个固定日期而不是用 today，这样每次运行结果一致，方便验证。

第三步：用 strftime 打印成中文格式，观察 %Y年%m月%d日 里「年」「月」「日」是原样保留的。

第四步：用目标日期减去今天，取 .days 得到天数，注意结果是整数，不会带小数。

第五步：用 strptime 把一段用户输入的字符串解析成对象，再对它做加减，最后格式化成想要的样式输出。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| ValueError: time data does not match format | 格式符和字符串对不上 | 逐段核对，%m 是月，%M 是分 |
| TypeError: unsupported operand type | date 和 datetime 混算 | 统一成同一种类型再运算 |
| 结果少了 8 小时 | 用了 UTC 时间没转本地时区 | 明确时区，必要时用 zoneinfo 转换 |
| 天数算出来是 0 | 用了 date 相减但只取了秒 | date 相减取 .days，不要取 total_seconds |

## 六、为什么时间处理容易出错

时区是最大的坑。同一时刻，北京是下午 3 点，伦敦是早上 7 点，服务器常用 UTC 存时间，用户看到的是本地时间。如果不标注时区，跨时区比较就会出现「明明只差一分钟，算出来差 8 小时」。

第二个坑是夏令时，某些国家一年里会把时钟拨快或拨慢一小时，那一天的 2 点可能不存在，也可能出现两次。

第三个坑是「日期」和「时刻」混用。生日是日期，日志是时刻，把生日当成 datetime 存，跨时区显示时会漂移一天。

结论：只处理日期就用 date，需要精确时刻就用带时区的 datetime，别用字符串存时间。`,
    examples: [
      {
        title: '日期的创建、格式化与加减',
        intro: '固定一个日期做实验，算距离元旦还有几天，再看加减 30 天、减 2 周的结果。',
        code: `from datetime import date, timedelta

today = date(2026, 11, 19)
print(today.year, today.month, today.day)
print(today.strftime("%Y年%m月%d日"))
print("星期序号", today.weekday())

new_year = date(2027, 1, 1)
print("距离元旦还有", (new_year - today).days, "天")

print(today + timedelta(days=30))
print(today - timedelta(weeks=2))`,
        expectedOutput: `2026 11 19
2026年11月19日
星期序号 3
距离元旦还有 43 天
2026-12-19
2026-11-05`,
        lines: [
          { code: 'today = date(2026, 11, 19)', explain: '三个参数依次是年、月、日，必须都是整数。' },
          { code: 'today.strftime("%Y年%m月%d日")', explain: '把日期对象格式化成字符串，年月日三个汉字原样保留。' },
          { code: 'today.weekday()', explain: '返回 0 到 6，0 是周一，所以 3 表示周四。' },
          { code: '(new_year - today).days', explain: '两个日期相减得到 timedelta，取 .days 得到整数天数。' },
          { code: 'today + timedelta(days=30)', explain: '日期加一段长度，跨月时 Python 自动处理月份天数。' },
        ],
        trace: [
          { step: '创建 today', state: 'today = 2026-11-19，weekday 为 3（周四）' },
          { step: '相减', state: 'new_year - today 得到 timedelta，days 为 43' },
          { step: '加 30 天', state: '11 月只有 30 天，所以从 19 号推进到 12 月 19 号' },
          { step: '减 2 周', state: '11 月 19 日往前 14 天，落在 11 月 5 日' },
        ],
        tryIt: '把 today 改成 date(2024, 2, 28)，再加 timedelta(days=1)，看看闰年会不会跳到 29 号。',
      },
      {
        title: '解析字符串，再做时刻运算',
        intro: 'strptime 把一段文本变成时间对象，之后才能加减、比较、重新格式化。',
        code: `from datetime import datetime, timedelta

raw = "2026-03-08 14:30"
dt = datetime.strptime(raw, "%Y-%m-%d %H:%M")
print(dt.year, dt.hour)
print(dt.strftime("%Y/%m/%d %H:%M"))
print(dt + timedelta(hours=10))

d1 = datetime(2026, 3, 8)
d2 = datetime(2026, 3, 1)
gap = d1 - d2
print(gap.days, int(gap.total_seconds()))`,
        expectedOutput: `2026 14
2026/03/08 14:30
2026-03-09 00:30:00
7 604800`,
        lines: [
          { code: 'datetime.strptime(raw, "%Y-%m-%d %H:%M")', explain: '按给定格式解析字符串，格式必须和文本严格一致。' },
          { code: 'dt.strftime("%Y/%m/%d %H:%M")', explain: '同一个时刻可以换成任意格式输出，数据没变，只是显示方式变了。' },
          { code: 'dt + timedelta(hours=10)', explain: '加 10 小时会跨天，14:30 变成次日 00:30。' },
          { code: 'gap.total_seconds()', explain: 'timedelta 也可以取总秒数，7 天正好是 604800 秒。' },
        ],
        trace: [
          { step: '解析 raw', state: 'dt = 2026-03-08 14:30:00' },
          { step: '取字段', state: 'year 是 2026，hour 是 14' },
          { step: '加 10 小时', state: '23:30 之后再过 1 小时跨到 9 日 00:30' },
          { step: '相减', state: 'gap 是 7 天 0 秒，days = 7，total_seconds = 604800' },
        ],
        tryIt: '把格式里的 %H:%M 改成 %H-%M 再运行，观察会报什么错，理解「格式必须严格匹配」。',
      },
    ],
    compare: [
      {
        conceptA: 'strftime',
        conceptB: 'strptime',
        diff: '前者是「对象变字符串」，用于输出；后者是「字符串变对象」，用于输入。',
        example: 'dt.strftime("%Y-%m-%d") 与 datetime.strptime(s, "%Y-%m-%d")',
      },
      {
        conceptA: 'date',
        conceptB: 'datetime',
        diff: '前者只有年月日，适合生日、到期日；后者精确到时分秒，适合日志、订单时间。',
        example: 'date(2026, 3, 8) 与 datetime(2026, 3, 8, 14, 30)',
      },
    ],
    pitfalls: [
      '把 %m 和 %M 弄混，月份写成分钟，解析直接报错。',
      '两个日期相减后直接当数字用，忘了取 .days。',
      '用 now() 做实验，每次结果都变，没法对照输出。',
      '用字符串存日期，之后按字符串排序，出现 10 月排在 2 月前面。',
      '忽略了时区，服务器时间和用户本地时间差 8 小时。',
    ],
    keyPoints: [
      'date 管日期，datetime 管时刻，timedelta 管长度。',
      'strftime 输出、strptime 输入，方向相反，格式符大小写敏感。',
      '两个时间相减得到 timedelta，取 .days 拿天数。',
      '日期加减用 timedelta，跨月跨年由 Python 自动处理。',
      '时间要存成对象或带时区的形式，不要用字符串凑合。',
    ],
    sources: [
      { book: 'update', chapter: 'Python 标准库速查（datetime 模块补充）' },
      { book: 'pcc3', chapter: '附录 A 安装与排错', note: '教材附录涉及环境，时间处理在此补充' },
    ],
    prerequisites: ['s7-01'],
    task: '算出「距离下一个元旦还有多少天」，再算出你出生那天是星期几（用 date(年, 月, 日).weekday() 加 1 得到 1 到 7）。',
    exercises: [
      {
        id: 's8-05-q1',
        qtype: 'single',
        stem: '要表示「一段时长，比如 45 分钟」，应该用哪个类型？',
        options: ['A. date', 'B. datetime', 'C. timedelta', 'D. str'],
        answer: 'C',
        explanation:
          '答案：C。\n思路：date 和 datetime 表示「某个时刻」，timedelta 表示「两个时刻之间的距离」。\n逐步演示：timedelta(minutes=45) 可以直接和 datetime 相加，得到 45 分钟之后的时刻；两个 datetime 相减也会得到 timedelta。\n易错提醒：date 和 datetime 是点，timedelta 是线段，把「时长」存成 datetime 会导致无法做加减。',
      },
      {
        id: 's8-05-q2',
        qtype: 'boolean',
        stem: 'strftime 的作用是把字符串解析成 datetime 对象。',
        answer: '错',
        explanation:
          '答案：错。\n思路：strftime 的 f 是 format，负责把时间对象格式化成字符串；把字符串解析成对象的是 strptime，p 是 parse。\n逐步演示：datetime.now().strftime("%Y-%m-%d") 得到 "2026-11-19" 这样的字符串；反过来 datetime.strptime("2026-11-19", "%Y-%m-%d") 才得到对象。\n易错提醒：两个名字只差一个字母，记法是「f 输出、p 输入」，用反了会报没有该属性或格式不匹配。',
      },
      {
        id: 's8-05-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请写出 print 的那一行结果。',
        code: `from datetime import date
print((date(2026, 3, 10) - date(2026, 3, 1)).days)`,
        keywords: [['9'], ['9 天', '九天']],
        explanation:
          '答案：9。\n思路：两个日期相减得到 timedelta，取 .days 就是相差的天数，注意不含起始那天。\n逐步演示：3 月 1 日到 3 月 10 日，中间经过 2、3、4、5、6、7、8、9 号共 8 个整天，再加最后跳到 10 号这一天，差值是 9 天。\n易错提醒：很多人会算成 10 天，因为把 1 号本身也算进去了；相减算的是「间隔」，不是「包含几天」。',
      },
      {
        id: 's8-05-q4',
        qtype: 'blank',
        stem: '要把日期对象 d 格式化成 2026-11-19 这种「四位年-两位月-两位日」的字符串，应写 d.strftime("______")。请填出格式串。',
        answer: '%Y-%m-%d',
        accepted: ['%Y-%m-%d', '%Y/%m/%d'.replace('/', '-'), '%Y-%m-%d '],
        explanation:
          '答案：%Y-%m-%d。\n思路：%Y 是四位年份，%m 是两位月份，%d 是两位日期，中间的横线是普通字符，原样输出。\n逐步演示：d = date(2026, 11, 19) 时，%Y 给 2026，%m 给 11，%d 给 19，拼起来就是 2026-11-19。\n易错提醒：写成 %y 会得到两位年份 26；写成 %M 会变成分钟 00；格式串里的横线不能省，否则变成 20261119。',
      },
      {
        id: 's8-05-q5',
        qtype: 'program',
        stem: '计算 2026 年 1 月 1 日到 2026 年 12 月 25 日相差多少天，打印这个整数。只输出一行。',
        answer: '',
        testCases: [{ stdin: '', expected: '358' }],
        explanation:
          '答案：\n代码如下：\n\nfrom datetime import date\n\nd1 = date(2026, 1, 1)\nd2 = date(2026, 12, 25)\nprint((d2 - d1).days)\n\n思路：两个日期相减得到 timedelta，取 days 属性就是整数天数。\n逐步演示：2026 年不是闰年，12 月 25 日是本年第 359 天，从 1 月 1 日算起相差 358 天。\n易错提醒：直接用字符串拼接算不出来；用 total_seconds 再除 86400 也能得到 358，但多此一举，.days 更直接。',
      },
    ],
    minutes: 17,
    env: 'browser',
  },
  {
    id: 's8-06',
    stageId: 8,
    order: 6,
    title: '正则表达式',
    subtitle: '用一小段符号描述「长什么样的文字」',
    hook: '要从一段杂乱的客服记录里挑出所有手机号，你打算写十个 if 判断，还是写一行规则？',
    objectives: [
      '能说清正则表达式解决的是「模式匹配」而不是「精确查找」',
      '能用 findall、search、sub、split 完成四种常见提取任务',
      '能读懂 \\d \\w \\s + * ? {n,m} [] ^ $ 这些符号',
      '能用分组提取出需要的部分，并判断什么时候不该用正则',
    ],
    analogy:
      '普通查找像在人群里找一个叫「张三」的人；正则像举着一块牌子写「穿红衣服、身高一米八、戴眼镜的人」，符合描述的都会被拦下来。',
    terms: [
      { term: '正则表达式', plain: '用符号写成的「文字长相说明书」，描述你要找的东西长什么样。' },
      { term: '元字符', plain: '有特殊含义的符号，比如 \\d 代表一个数字。' },
      { term: '分组', plain: '用圆括号圈出一部分，方便单独取出。' },
      { term: '贪婪', plain: '能多吃就多吃，默认模式，尽量匹配更长的结果。' },
    ],
    content: `## 一、为什么需要它（知识背景）

不用正则，从一句话里取手机号大概要这么写：找到「1」开头的连续数字，数一数是不是 11 位，第二位是不是 3 到 9，前面不能粘着别的数字。写成代码就是一堆下标、切片、try-except，改一个规则要动一大片。

更麻烦的是「日期」「邮箱」「身份证」每种格式都要重写一遍，而且极容易漏掉边界情况。

正则表达式提供了另一条路：**你把「长什么样」描述出来，剩下的事交给引擎**。手机号就是「1 开头，第二位 3 到 9，后面再跟 9 个数字」，一句话说完。

## 二、概念解释

正则表达式（regular expression）是一串用特殊符号写成的模式。它不描述「具体内容」，而描述「形状」。

举例：\\d 表示「任意一个数字」，+ 表示「前面的东西出现一次或多次」，所以 \\d+ 就是「一串数字」。把它丢给 re.findall，所有连续数字都会被捞出来。

这个思路的转变很重要：普通字符串查找是「我要找 abc 这三个字符」，正则是「我要找符合这个形状的东西，具体是啥我不关心」。

## 三、语法与使用规则

| 符号 | 含义 | 示例 |
| --- | --- | --- |
| \\d | 一个数字 0-9 | \\d\\d 匹配 26 |
| \\w | 一个字母、数字或下划线 | \\w+ 匹配 hello_1 |
| \\s | 一个空白字符（空格、换行、制表） | a\\sb 匹配 a b |
| . | 任意一个字符（默认不含换行） | a.c 匹配 abc |
| * | 前面出现 0 次或多次 | ab* 匹配 a |
| + | 前面出现 1 次或多次 | ab+ 匹配 ab |
| ? | 前面出现 0 次或 1 次；跟在量词后表示非贪婪 | ab? 匹配 a |
| {n,m} | 前面出现 n 到 m 次 | \\d{3,4} 匹配 1234 |
| [] | 里面任意一个字符 | [abc] 匹配 b |
| ^ | 开头（在方括号内表示「非」） | ^\\d 必须以数字开头 |
| $ | 结尾 | \\d$ 必须以数字结尾 |
| () | 分组，可单独提取 | (\\d{4})-(\\d{2}) |

五个常用函数：

**re.search** 找第一个匹配，返回 Match 对象或 None。**re.match** 只从开头试，不匹配就 None。**re.findall** 找出所有匹配，返回列表。**re.sub** 替换。**re.split** 按模式切分。

三条铁律：

第一，**模式字符串前面加 r**。写 r"\\d+" 而不是 "\\\\d+"，否则反斜杠会被 Python 先转义一次。

第二，**search 和 match 返回的不是字符串**。要 .group() 取值，取不到会 AttributeError。

第三，**默认贪婪**。.* 会吃到最后一个可能的位置，想让它少吃就加问号变成 .*?。

## 四、逐步演示（分步骤）

第一步：先写最小的模式，比如只找 \\d+，跑 findall 看看捞出来什么，确认方向对不对。

第二步：逐步收紧。加上长度限制 {11}、开头限制 1、第二位范围 [3-9]，每加一条就重跑一次，观察结果变化。

第三步：需要分开取出年月日时，用圆括号分组，然后 m.group(1)、m.group(2)。

第四步：替换和切分用 sub 和 split，注意 sub 的第二个参数是替换成什么，第三个才是原文。

第五步：验证边界。空字符串、多余空格、超长数字都试一遍，确认不会误伤。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 报错 bad escape | 模式前没加 r，反斜杠被吃掉 | 所有模式都写成 r"..." |
| 结果把整段都匹配了 | .* 默认贪婪 | 改成 .*? 非贪婪 |
| AttributeError: NoneType has no group | search 没找到还硬取 group | 先判断 if m: 再取 |
| 抓到的号码多了一位 | 没加边界，粘到了后面的数字 | 用 \\b 或前后加 (?<!\\d) |

## 六、什么时候不该用正则

正则擅长「短、规整、无嵌套」的文本，比如电话、日期、邮箱、日志里的固定字段。

它不擅长嵌套结构。用正则解析 HTML 是最典型的反例：标签可以层层嵌套，属性顺序任意，还有注释和 CDATA，再复杂的正则也会漏。解析 HTML 请用专门的解析库。

另一个反例是 JSON。它有自己的语法，用 json.loads 一行解决，正则只会让你在转义字符上翻车。

判断标准：**如果这个格式能用一句话说清「长什么样」，用正则；如果需要一层层往下解析，就别用。**`,
    examples: [
      {
        title: '从一段文本里提取手机号和日期',
        intro: '先看不用正则有多麻烦，再看 findall 和 search 怎么一行解决。',
        code: `import re

text = "下单时间 2026-11-19，客服电话 13812345678，备用 13998887777"

phones = re.findall(r"1[3-9]\\d{9}", text)
print(phones)

m = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", text)
print(m.group(0))
print(m.group(1), m.group(2), m.group(3))`,
        expectedOutput: `['13812345678', '13998887777']
2026-11-19
2026 11 19`,
        lines: [
          { code: 're.findall(r"1[3-9]\\d{9}", text)', explain: '1 开头，第二位是 3 到 9 中任意一个，后面再跟 9 个数字，正好 11 位。' },
          { code: 'm = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", text)', explain: '三对圆括号把年月日分成三组，search 只找第一个匹配。' },
          { code: 'print(m.group(0))', explain: 'group(0) 是整个匹配到的内容，包含横线。' },
          { code: 'print(m.group(1), m.group(2), m.group(3))', explain: '按左括号出现的顺序编号，分别拿到年、月、日。' },
        ],
        trace: [
          { step: 'findall 扫描', state: '遇到 13812345678，1 开头、3 在范围内、共 11 位，收下' },
          { step: '继续扫描', state: '13998887777 同样符合，收下；「2026」不满足 1 开头，跳过' },
          { step: 'search 日期', state: '在「2026-11-19」处匹配成功，m 不为 None' },
          { step: '取分组', state: 'group(1)=2026，group(2)=11，group(3)=19' },
        ],
        tryIt: '把模式改成 r"1[3-9]\\d{8}"，再数数两个号码会变成几位。',
      },
      {
        title: '替换、切分、分组与贪婪模式',
        intro: 'sub 清理多余空格，split 按多个分隔符切分，再对比贪婪和非贪婪的差别。',
        code: `import re

print(re.sub(r"\\s+", " ", "小林   正在    学 Python"))
print(re.split(r"[,，;；]", "苹果,香蕉，橙子;西瓜"))

html = "<b>粗体</b><i>斜体</i>"
print(re.findall(r"<(\\w+)>", html))
print(re.findall(r"<.+>", html))
print(re.findall(r"<.+?>", html))

print(re.match(r"\\d+", "abc123"))
print(re.search(r"\\d+", "abc123").group())`,
        expectedOutput: `小林 正在 学 Python
['苹果', '香蕉', '橙子', '西瓜']
['b', 'i']
['<b>粗体</b><i>斜体</i>']
['<b>', '</b>', '<i>', '</i>']
None
123`,
        lines: [
          { code: 're.sub(r"\\s+", " ", text)', explain: '把「一串空白」替换成一个空格，多空格立刻变整齐。' },
          { code: 're.split(r"[,，;；]", s)', explain: '方括号里任意一个字符都能当分隔符，中英文标点一次全处理。' },
          { code: 're.findall(r"<.+>", html)', explain: '贪婪模式，. 一直吃到最后一个 >，整段被当成一个匹配。' },
          { code: 're.findall(r"<.+?>", html)', explain: '加问号变非贪婪，每遇到第一个 > 就收手，于是拆成四个标签。' },
          { code: 're.match(r"\\d+", "abc123")', explain: 'match 只从开头试，开头是 a 不是数字，直接返回 None。' },
        ],
        trace: [
          { step: 'sub 执行', state: '三段空白各自被替换成一个空格，得到整齐一行' },
          { step: 'split 执行', state: '四个分隔符位置被切开，得到 4 段' },
          { step: '贪婪匹配', state: '从第一个 < 一路吃到最后一个 >，只产生 1 个结果' },
          { step: '非贪婪匹配', state: '每遇到 > 就停，产生 4 个结果' },
        ],
        tryIt: '把 sub 的替换内容从空格改成空字符串，看看会得到什么。',
      },
    ],
    compare: [
      {
        conceptA: 're.match',
        conceptB: 're.search',
        diff: '前者只从字符串开头尝试匹配，开头不符立刻失败；后者会从头到尾找，任意位置命中就算成功。',
        example: 'match(r"\\d+", "abc123") 得 None，search 得 123',
      },
      {
        conceptA: '贪婪 .*',
        conceptB: '非贪婪 .*?',
        diff: '前者尽可能多匹配，后者满足最小条件就停。写 HTML 提取时差别巨大。',
        example: '<.+> 与 <.+?>',
      },
    ],
    pitfalls: [
      '模式前忘了写 r，反斜杠被 Python 先转义，报 bad escape 或匹配不到。',
      'search 返回 None 时直接取 group，报 AttributeError。',
      '用 .* 提取标签内容，贪婪导致整段都被吃掉。',
      '以为 match 和 search 一样，其实 match 只认开头。',
      '拿正则去解析 HTML 或 JSON，越写越复杂还是漏。',
    ],
    keyPoints: [
      '正则描述「形状」，不是「具体内容」。',
      '\\d 数字、\\w 单词字符、\\s 空白，加量词表示出现次数。',
      'findall 拿全部、search 拿第一个、sub 替换、split 切分。',
      '圆括号分组，group(1) 开始按顺序取。',
      '模式前加 r，默认贪婪，加问号变非贪婪。',
    ],
    sources: [{ book: 'abs3', chapter: '第9章 使用正则表达式匹配文本模式' }],
    prerequisites: ['s3-03'],
    task: '写三条正则：一条校验 11 位手机号，一条提取 YYYY-MM-DD 格式的日期，一条从一段文本里把所有邮箱地址找出来。每条都用 findall 或 fullmatch 验证三个正例和三个反例。',
    exercises: [
      {
        id: 's8-06-q1',
        qtype: 'single',
        stem: '正则表达式主要用来解决什么问题？',
        options: [
          'A. 让程序运行得更快',
          'B. 按「某种形状」在文本里查找和提取内容',
          'C. 把 Python 代码翻译成中文',
          'D. 压缩文件体积',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：正则描述的是模式，不是具体字符串，所以能一次覆盖一大类写法不同的文本。\n逐步演示：要找手机号，不用列出所有可能的号码，只写 1[3-9]\\d{9}，所有符合这个形状的 11 位号码都会被找出来。\n易错提醒：正则不是万能的解析器，遇到嵌套结构（HTML、JSON）应该用专门的库。',
      },
      {
        id: 's8-06-q2',
        qtype: 'boolean',
        stem: '写正则模式时，字符串前面加 r 是为了让反斜杠不被 Python 提前转义。',
        answer: '对',
        explanation:
          '答案：对。\n思路：r 前缀表示原始字符串，里面的反斜杠按字面保留，直接交给正则引擎。\n逐步演示：不加 r 时要写 "\\\\d+" 才能表示 \d+，加了 r 只写 r"\\d+" 就行。少写一个反斜杠就会变成转义字符，报 bad escape 或匹配错误。\n易错提醒：即使不加 r 有时也能跑，那是因为碰巧没触发转义，养成习惯永远加 r，成本最低。',
      },
      {
        id: 's8-06-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请按 print 的真实格式写出这一行。',
        code: `import re
print(re.findall(r"\\d+", "a12b3"))`,
        keywords: [["['12', '3']", "['12','3']"], ["12", "3"]],
        explanation:
          '答案：[\'12\', \'3\']。\n思路：\\d+ 匹配连续的一串数字，字符串里有两段数字，分别被捞出来放进列表。\n逐步演示：扫描到 a 不算数字，跳过；遇到 1 开始连续数字，一直吃到 2，得到 12；b 断开；遇到 3 得到 3；最终列表有两项，且都是字符串。\n易错提醒：findall 返回的永远是字符串列表，不会自动转成数字，要算加法得先 int()。',
      },
      {
        id: 's8-06-q4',
        qtype: 'blank',
        stem: '要匹配「一个或多个数字」，在 \\d 后面应加的符号是 ______。请填这一个符号。',
        answer: '+',
        accepted: ['+', '加号', '\\+'],
        explanation:
          '答案：+。\n思路：+ 表示前面的元素出现一次或多次，\\d+ 就是一串至少一位的数字。\n逐步演示：\\d 只匹配单个数字，遇到 123 只会匹配到 1；加上 + 之后，123 会整体被匹配。如果用 *，连空串都算匹配，容易出意外。\n易错提醒：+ 只管紧挨着它的那一个元素，\\d+ 是「多个数字」，不是「多个 \\d+ 组合」。',
      },
      {
        id: 's8-06-q5',
        qtype: 'program',
        stem: '用 re.findall 从字符串「订单2026年，批次0311，编号2027」中提取所有连续的四位数字，打印得到的列表。只输出一行。',
        answer: '',
        testCases: [{ stdin: '', expected: "['2026', '0311', '2027']" }],
        explanation:
          '答案：\n代码如下：\n\nimport re\n\ntext = "订单2026年，批次0311，编号2027"\nprint(re.findall(r"\\d{4}", text))\n\n思路：\\d{4} 表示正好四位数字，findall 把每一段都收进列表。\n逐步演示：2026 命中；0311 也是四位，命中（前导 0 不影响）；2027 命中；最终得到三个字符串。\n易错提醒：写成 \\d+ 会把更长的数字整段吃掉，写成 \\d{2,4} 则可能匹配到两位，只有 {4} 才是精确四位。',
      },
    ],
    minutes: 19,
    env: 'browser',
  },
  {
    id: 's8-07',
    stageId: 8,
    order: 7,
    title: '网络请求与 API 基础',
    subtitle: '用代码向别人家的服务器要数据',
    hook: '天气、汇率、快递、股票，这些数据都不在你电脑里，你的程序是怎么拿到它们的？',
    objectives: [
      '能说清一次 HTTP 请求里「请求」和「响应」各包含什么',
      '能区分 GET 与 POST 的适用场景，看懂 200/404/403/500 的含义',
      '能用 requests 发 GET 请求、传参数、读 JSON',
      '能写出带异常处理的请求代码，不让程序因一次失败就崩掉',
    ],
    analogy:
      '发请求像去餐厅点菜：你报菜名（URL 和参数），服务员记下送进厨房（服务器），厨房做好端出来（响应）。200 是顺利上菜，404 是菜单上根本没这道菜，403 是不让你点，500 是厨房自己着火了。',
    terms: [
      { term: 'HTTP', plain: '浏览器和服务器之间约定的说话格式，全世界通用。' },
      { term: 'API', plain: '别人开放给你的「点菜窗口」，按它的规矩问，它就按规矩答。' },
      { term: 'JSON', plain: '一种长得像 Python 字典的文本格式，跨语言通用的数据包装。' },
      { term: '状态码', plain: '服务器回你的三位数字，说明这次请求成没成、为什么没成。' },
      { term: '跨域', plain: '浏览器规定：网页脚本不能随便向别的网站要数据，除非对方明确允许。' },
    ],
    content: `## 一、为什么需要它（知识背景）

这一课在 Windows + VS Code 本地环境完成。原因是浏览器实验室运行在沙箱里，出于安全考虑禁止脚本直接向外网发请求，所以你需要在本地装好 Python 才能做真实的网络实验。

安装命令（国内镜像，复制到 VS Code 终端执行）：

pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple

装完用 pip show requests 确认版本号，有输出就说明成功了。

为什么要学这个？因为你电脑里没有天气、没有汇率、没有快递轨迹。这些数据都住在别人的服务器上，只有主动去问，它才会给你。

## 二、概念解释

一次网络请求就两件事：**你发出去一个请求，服务器回你一个响应**。

请求里带四样东西：地址（URL）、方法（GET 或 POST）、请求头（Headers，说明你是谁、能接受什么格式）、请求体（Body，POST 才常用，用来提交数据）。

响应里也带四样：状态码（三位数字）、响应头、响应体（真正的内容）、以及可选的 JSON 数据。

**GET** 用来「取」，参数拼在地址后面，能被浏览器记录、能被收藏。**POST** 用来「交」，数据放在请求体里，适合提交表单、上传、修改数据。

## 三、语法与使用规则

| 状态码 | 含义 | 你该怎么办 |
| --- | --- | --- |
| 200 | 成功 | 正常解析响应内容 |
| 301 / 302 | 重定向到别处 | requests 默认自动跟随，一般不用管 |
| 403 | 没有权限 | 检查是否需要 token，或对方禁止访问 |
| 404 | 地址不存在 | 检查 URL 拼写、用户是否存在 |
| 500 | 服务器内部错误 | 不是你的问题，稍后重试或联系对方 |

requests 的四个基本用法：

| 写法 | 作用 |
| --- | --- |
| requests.get(url, params={...}, headers={...}, timeout=10) | 发 GET，参数自动拼到地址上 |
| requests.post(url, json={...}) | 发 POST，字典自动转成 JSON |
| resp.status_code | 取状态码 |
| resp.json() | 把响应体解析成 Python 字典 |

三条必须遵守的规则：

第一，**永远写 timeout**。不写的话，对方服务器卡住，你的程序会跟着卡死，看起来像死机。

第二，**永远判断状态码**。200 才是正常，直接 resp.json() 而不检查，遇到 404 会拿到一段错误信息，解析时报莫名其妙的错。

第三，**用 raise_for_status() 让错误显形**。它在 4xx、5xx 时主动抛异常，配合 try-except 一次处理完。

## 四、逐步演示（分步骤）

第一步：先在浏览器里打开接口地址，肉眼确认它返回什么。看得懂再写代码，能省一半调试时间。

第二步：用 requests.get 拿到响应，先 print 状态码，确认是 200。

第三步：print 响应文本的前 200 个字符，看看结构长什么样。

第四步：调 resp.json() 转成字典，用键取值，打印你关心的字段。

第五步：加上 timeout 和 try-except，把网络错误、HTTP 错误分开处理，程序就不会因为一次失败整体崩掉。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| ModuleNotFoundError: requests | 没装库 | pip install requests 装好再运行 |
| JSONDecodeError | 返回的不是 JSON（可能是错误页） | 先看 status_code 和 resp.text |
| 程序长时间无响应 | 没设 timeout | 每次请求都加 timeout=10 |
| 403 Forbidden | 缺少 User-Agent 或 token | 加 headers，必要时申请密钥 |
| 浏览器里 fetch 报 CORS 错误 | 浏览器同源策略拦截 | 用 Python 发请求，或让对方开放跨域 |

## 六、浏览器为什么不能随便发跨域请求

假设你登录了银行网站，浏览器里存着你的登录凭证。这时你打开一个恶意网页，如果它能随便向银行发请求，你的钱就危险了。

所以浏览器定了条规矩：**网页脚本只能向「同源」的地址发请求**，协议、域名、端口三者全一样才算同源。想让跨域请求通过，服务器必须在响应头里明确写 Access-Control-Allow-Origin 允许你。

Python 脚本不受这条限制，因为它不是网页，没有「你的登录凭证被别的网页偷用」这个风险。这也是为什么很多数据采集、接口调试都用 Python 而不是浏览器。

## 七、本课用到的真实接口

本课示例使用 GitHub 的公开接口 https://api.github.com/users/octocat，这是 GitHub 官方提供的真实接口，无需注册即可访问，返回 octocat 这个演示账号的公开资料。另一个常用的是 https://httpbin.org/get，它会把你发过去的参数原样回显，非常适合调试。

这两个接口都是真实存在的，但返回的具体数值（比如仓库数、粉丝数）会随时间变化，所以本课示例只打印稳定的字段。`,
    examples: [
      {
        title: '发一个 GET 请求并读取 JSON',
        intro: '这段代码需要先安装 requests（pip install requests），输出为示意：状态码和用户名字段是稳定的，仓库数等数字会随接口实时变化。',
        code: `import requests

url = "https://api.github.com/users/octocat"
resp = requests.get(url, timeout=10)
print("状态码", resp.status_code)

data = resp.json()
print(data["login"], data["type"])
print("字段个数", len(data))`,
        expectedOutput: `状态码 200
octocat User
字段个数 17`,
        lines: [
          { code: 'resp = requests.get(url, timeout=10)', explain: '向这个地址发 GET 请求，最多等 10 秒，超时就抛异常而不是一直卡着。' },
          { code: 'print("状态码", resp.status_code)', explain: '先确认请求成功，200 才继续往下解析。' },
          { code: 'data = resp.json()', explain: '把响应体里的 JSON 文本解析成 Python 字典，之后就能用键取值。' },
          { code: 'print(data["login"], data["type"])', explain: 'login 是用户名，type 是账号类型，这两个字段稳定不变。' },
        ],
        trace: [
          { step: '发出请求', state: 'requests 把 URL、方法 GET、请求头打包发出去' },
          { step: '收到响应', state: 'status_code = 200，响应体是一段 JSON 文本' },
          { step: 'json() 解析', state: 'data 变成字典，含 login、type、public_repos 等字段' },
          { step: '取值打印', state: 'login 为 octocat，type 为 User' },
        ],
        tryIt: '把 URL 里的 octocat 换成 torvalds，看看返回的 login 和 type 有什么不同。',
      },
      {
        title: '带上异常处理的请求',
        intro: '这段代码需要先安装 requests，输出为示意。访问一个不存在的用户，服务器会返回 404，raise_for_status 会把它变成异常。',
        code: `import requests

url = "https://api.github.com/users/this-user-should-not-exist-12345"

try:
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    print("拿到数据", resp.json()["login"])
except requests.HTTPError:
    print("接口返回错误：", resp.status_code)
except requests.RequestException as e:
    print("网络出问题了：", type(e).__name__)`,
        expectedOutput: `接口返回错误： 404`,
        lines: [
          { code: 'resp.raise_for_status()', explain: '状态码是 4xx 或 5xx 时主动抛 HTTPError，让错误走异常流程，而不是悄悄往下走。' },
          { code: 'except requests.HTTPError:', explain: '专门接住「服务器答了，但答的是错误」，比如 404、403。' },
          { code: 'except requests.RequestException as e:', explain: '接住更宽的一类：连不上、超时、DNS 失败，这些属于根本没答上话。' },
          { code: 'type(e).__name__', explain: '打印异常类型名，方便区分到底是超时还是连接被拒。' },
        ],
        trace: [
          { step: '请求不存在的用户', state: 'GitHub 返回 404，响应体是一段错误说明' },
          { step: 'raise_for_status', state: '检测到 404，抛出 HTTPError' },
          { step: '第一个 except 命中', state: '打印「接口返回错误： 404」，后面的代码不再执行' },
          { step: '若断网', state: '会走第二个 except，打印 ConnectionError 之类的类型名' },
        ],
        tryIt: '把 URL 里的域名改成不存在的地址，观察会走到哪个 except 分支。',
      },
    ],
    compare: [
      {
        conceptA: 'GET',
        conceptB: 'POST',
        diff: 'GET 把参数拼在地址上，用于读取，会被缓存和记录；POST 把数据放在请求体里，用于提交和修改，不会被地址栏暴露。',
        example: 'requests.get(url, params={"q": "python"}) 与 requests.post(url, json={"name": "小林"})',
      },
      {
        conceptA: 'HTTPError',
        conceptB: 'ConnectionError',
        diff: '前者是「服务器答了但是错误状态码」，后者是「压根没连上」。处理方式不同：前者查权限和地址，后者查网络。',
        example: '404 属于前者，断网属于后者',
      },
    ],
    pitfalls: [
      '没装 requests 就运行，报 ModuleNotFoundError。',
      '不写 timeout，对方不响应时程序卡死。',
      '不检查状态码直接 resp.json()，遇到错误页解析失败。',
      '把 token 或密码硬写进代码再上传到 GitHub，造成泄露。',
      '在浏览器页面里用 fetch 请求别的站点，被 CORS 拦住还以为是代码错。',
    ],
    keyPoints: [
      '一次请求包含 URL、方法、请求头、请求体；响应包含状态码、头、体。',
      'GET 读数据，POST 交数据。',
      '200 成功、403 无权限、404 不存在、500 服务器出错。',
      'requests 的 get / post 配合 params、json、headers、timeout 就能覆盖大部分场景。',
      '永远写 timeout，永远判断状态码，永远用 try-except 兜住异常。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第17章 使用 API' },
      { book: 'abs3', chapter: '第13章 处理 Web 内容', note: '教材侧重网页抓取，本课侧重 API 调用' },
    ],
    prerequisites: ['s6-04', 's6-06'],
    task: '用 requests 访问 https://api.github.com/users/octocat，打印它的 login、public_repos 和 created_at 三个字段；再故意访问一个不存在的用户名，用 try-except 打印出 404。',
    exercises: [
      {
        id: 's8-07-q1',
        qtype: 'single',
        stem: '状态码 404 表示什么？',
        options: [
          'A. 请求成功，内容在响应体里',
          'B. 服务器内部出错，需要稍后重试',
          'C. 请求的地址或资源不存在',
          'D. 你没有权限访问这个资源',
        ],
        answer: 'C',
        explanation:
          '答案：C。\n思路：404 是 Not Found，意思是「服务器在，但你要的东西找不到」。\n逐步演示：访问 https://api.github.com/users/ 后面跟一个不存在的用户名，GitHub 会返回 404 和一段说明；而 403 是 Forbidden（不让你看），500 是服务器自己出错。\n易错提醒：404 不一定是你的代码错，也可能对方接口改地址了，先复制 URL 到浏览器验证。',
      },
      {
        id: 's8-07-q2',
        qtype: 'boolean',
        stem: '用 requests 发请求时应该设置 timeout，否则对方服务器不响应时程序可能一直卡住。',
        answer: '对',
        explanation:
          '答案：对。\n思路：requests 默认没有超时限制，网络层会一直等下去，程序看起来就像死机。\n逐步演示：requests.get(url, timeout=10) 表示连接和读取合计最多等 10 秒，超时抛 Timeout 异常，可以被 try-except 捕获，程序继续往下走。\n易错提醒：timeout 不是「总耗时上限」的精确保证，但足以避免无限等待，实际项目里几乎每个请求都应该写。',
      },
      {
        id: 's8-07-q3',
        qtype: 'predict',
        stem: '假设接口返回的 JSON 文本是 {"ok": true, "n": 3}，下面这段代码会输出什么？请写出 print 的那一行结果。',
        code: `import json
d = json.loads('{"ok": true, "n": 3}')
print(d["n"] + 1)`,
        keywords: [['4']],
        explanation:
          '答案：4。\n思路：json.loads 把 JSON 文本解析成字典，true 会自动变成 Python 的 True，数字 3 变成整数，可以直接参与运算。\n逐步演示：解析后 d 是「ok 为 True、n 为 3」这样的字典；d["n"] 取到 3；3 + 1 得到 4；print 输出 4。\n易错提醒：JSON 里必须用双引号，写成单引号会解析失败；JSON 的 true/false/null 对应 Python 的 True/False/None，大小写不一样。',
      },
      {
        id: 's8-07-q4',
        qtype: 'blank',
        stem: '要把字典 data 作为 JSON 请求体用 POST 发出去，应写 requests.post(url, ______=data)。请填这个参数名。',
        answer: 'json',
        accepted: ['json', 'data', 'json='],
        explanation:
          '答案：json。\n思路：传 json=data 时，requests 会自动把字典序列化成 JSON 字符串，并把请求头 Content-Type 设为 application/json。\n逐步演示：requests.post(url, json={"name": "小林"}) 发出去的内容是 {"name": "小林"} 这段 JSON，对方的服务器能直接按 JSON 解析。\n易错提醒：用 data=data 会按表单编码发送，格式完全不同；两者都合法，但要和对方的接口文档对上。',
      },
      {
        id: 's8-07-q5',
        qtype: 'program',
        stem: '下面的变量保存了一段模拟的接口返回（真实接口返回的结构与此相同）。请用 json 模块解析它，并打印 login 字段的值。只输出一行。',
        code: `raw = '{"login": "octocat", "public_repos": 8}'`,
        answer: '',
        testCases: [{ stdin: '', expected: 'octocat' }],
        explanation:
          '答案：\n代码如下：\n\nimport json\n\nraw = \'{"login": "octocat", "public_repos": 8}\'\ndata = json.loads(raw)\nprint(data["login"])\n\n思路：json.loads 把文本变成字典，再用键取值。真实场景里这一步就是 resp.json() 内部做的事。\n逐步演示：loads 解析后 data 是「login 为 octocat、public_repos 为 8」这样的字典；data["login"] 得到字符串 octocat；print 输出这一行。\n易错提醒：如果 raw 里用的是单引号，loads 会抛 JSONDecodeError，因为 JSON 规范只认双引号。',
      },
    ],
    minutes: 20,
    env: 'local',
  },
  {
    id: 's8-08',
    stageId: 8,
    order: 8,
    title: '数据处理：CSV 统计与清洗',
    subtitle: '一份脏表格，怎么变成能看的结论',
    hook: '运营发来一份销售表，里面有空格、有缺失、有文本数字，你怎么在十分钟内算出各城市销售额排名？',
    objectives: [
      '能用 csv 模块把 CSV 文本读成一行行字典',
      '能处理缺失值、把文本转成数字并跳过坏行',
      '能用字典完成分组汇总，再排序取前 N',
      '能把统计结果重新导出成 CSV 字符串',
    ],
    analogy:
      '清洗数据像洗菜：先挑掉烂的（坏行），再把泥冲掉（去空格），然后按种类分堆（分组），最后称重排名（汇总排序）。跳过任何一步，做出来的菜都不好吃。',
    terms: [
      { term: 'CSV', plain: '用逗号分隔的纯文本表格，Excel 能打开，程序也能读。' },
      { term: 'DictReader', plain: '按表头把每一行读成字典的读取器，第一行自动当键名。' },
      { term: '缺失值', plain: '表格里空着的格子，读进来是空字符串，不是 0。' },
      { term: '分组汇总', plain: '按某个字段把数据分成几堆，每堆算一个合计。' },
    ],
    content: `## 一、为什么需要它（知识背景）

真实的数据从来不是干净的。运营导出的销售表里，数量列可能空着，金额列可能写成「1,299」这种带逗号的字符串，城市名可能多打了一个空格，甚至整行都是重复的。

如果直接拿这些数据求和，程序要么报 ValueError，要么悄悄算出一个错得离谱的结果——后者更可怕，因为你不知道它错了。

所以数据处理有一套固定动作：**先看清楚，再洗干净，然后才统计**。这一课用一个真实形状的 CSV 走完整条链路。

## 二、概念解释

CSV 是最朴素的数据格式：一行一条记录，字段之间用逗号隔开，第一行通常是表头。

读 CSV 有两种方式。用 csv.reader 得到的是列表，要靠下标取值，读到第 5 列才知道那是金额，很难维护。用 csv.DictReader 得到的是字典，键就是表头，写 row["金额"] 一眼就懂。**处理有表头的数据，永远优先用 DictReader**。

清洗的核心判断是：这一行还能不能用。缺数量或缺单价的，算不出金额，直接跳过；数字带千分位逗号的，去掉逗号再转；文本前后有空格的，strip 掉。

统计的核心套路是：建一个空字典，遍历每一行，用「键存在就累加、不存在就初始化」的写法把结果堆起来。

## 三、语法与使用规则

| 写法 | 说明 |
| --- | --- |
| csv.DictReader(文件或文本流) | 每行读成字典，第一行自动作为键 |
| row["字段名"] | 按列名取值，取不到会 KeyError |
| int(row["数量"]) | 把文本转成整数，失败抛 ValueError |
| float(row["单价"]) | 转小数，适合金额 |
| 键 in 字典 | 判断分组是否已存在 |
| d.get(k, 0) + v | 不存在时用 0 起步，一行完成累加 |
| sorted(d.items(), key=lambda kv: kv[1], reverse=True) | 按值降序排 |
| csv.DictWriter(流, fieldnames=[...]) | 按指定列写出 CSV |

必须注意的四条：

第一，**CSV 读出来的全是字符串**。哪怕看起来是数字，也得自己 int 或 float，否则 "3" * 2 会得到 "33"。

第二，**空单元格是空字符串，不是 None**。int("") 会抛 ValueError，要用 try-except 接住。

第三，**DictReader 依赖表头**。表头有空格或错别字，所有取值都会失败，先 print 一下 fieldnames 确认。

第四，**写出时指定 lineterminator**。默认是 \\r\\n，在 Windows 上容易多出空行，显式写成 "\\n" 更干净。

## 四、逐步演示（分步骤）

第一步：把 CSV 当纯文本打印出来，肉眼看清表头和前几行，确认分隔符是逗号还是分号。

第二步：用 DictReader 读，先 print 第一行的键，确认列名拼写和你想的一样。

第三步：逐行转换类型，用 try-except 包住 int 和 float，转换失败就 continue 跳过，并统计跳过了几行。

第四步：建空字典做分组累加，先打印中间结果，确认每个城市的合计对不对。

第五步：排序取前 N，再导出成 CSV 字符串，粘贴到 Excel 里验证一遍。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| KeyError: '金额' | 表头有空格或大小写不一致 | print(reader.fieldnames) 核对 |
| ValueError: invalid literal for int | 单元格是空的或带逗号 | try-except 跳过，或先 replace(",", "") |
| 求和结果字符串拼接 | 忘了转数字 | int() 或 float() 转换后再算 |
| 导出的 CSV 每行之间多空行 | 默认行尾是 \\r\\n | 写 lineterminator="\\n" |
| 排名顺序不对 | 按字符串排序，10 排在 9 前面 | 按数值排序，key 取 kv[1] |

## 六、清洗的三条经验

第一，**永远先看数据再写代码**。花两分钟 print 前五行，比调试两小时划算。

第二，**跳过坏行要留痕**。至少 print 一下跳过了几行，否则数据少了一半你都不知道。

第三，**统计结果要能复现**。同一份数据跑两次结果必须一样，所以排序时不要依赖字典的原始顺序。`,
    examples: [
      {
        title: '读取、清洗、分组汇总',
        intro: '用 io.StringIO 把一段 CSV 文本变成可读的文件流，这样不用真实文件也能在浏览器里跑。',
        code: `import csv, io

raw = """日期,城市,产品,数量,单价
2026-01-05,北京,键盘,3,199
2026-01-05,上海,鼠标,10,89
2026-01-06,北京,键盘,,199
2026-01-06,广州,显示器,2,1299
2026-01-07,上海,鼠标,5,
2026-01-07,北京,显示器,1,1299
"""
reader = csv.DictReader(io.StringIO(raw))
rows = []
for r in reader:
    try:
        qty = int(r["数量"])
        price = float(r["单价"])
    except ValueError:
        continue
    rows.append({"城市": r["城市"], "产品": r["产品"], "金额": qty * price})

print("有效行", len(rows))

by_city = {}
for r in rows:
    by_city[r["城市"]] = by_city.get(r["城市"], 0) + r["金额"]
for city, amount in sorted(by_city.items(), key=lambda kv: kv[1], reverse=True):
    print(city, round(amount, 2))`,
        expectedOutput: `有效行 4
广州 2598.0
北京 1896.0
上海 890.0`,
        lines: [
          { code: 'reader = csv.DictReader(io.StringIO(raw))', explain: 'StringIO 把字符串包装成文件流，DictReader 才能像读文件一样读它。' },
          { code: 'qty = int(r["数量"])', explain: '文本转整数，空格子会抛 ValueError，被下面的 except 抓住。' },
          { code: 'except ValueError: continue', explain: '算不出金额的行直接跳过，进入下一轮循环。' },
          { code: 'by_city.get(r["城市"], 0) + r["金额"]', explain: '键不存在时从 0 起步，存在时取出旧值累加，一行完成分组汇总。' },
          { code: 'sorted(..., key=lambda kv: kv[1], reverse=True)', explain: '按元组第 2 项（金额）降序排，注意不是按城市名排。' },
        ],
        trace: [
          { step: '第 1 行 北京 键盘', state: 'qty=3、price=199，金额 597，进入 rows' },
          { step: '第 3 行 北京 键盘（数量为空）', state: 'int("") 抛 ValueError，整行跳过' },
          { step: '第 5 行 上海 鼠标（单价为空）', state: 'float("") 抛 ValueError，整行跳过' },
          { step: '汇总完成', state: 'by_city = {北京: 1896, 上海: 890, 广州: 2598}' },
          { step: '排序输出', state: '按金额降序：广州 2598、北京 1896、上海 890' },
        ],
        tryIt: '把 continue 改成 print 出被跳过的行号，看看究竟丢了几条数据。',
      },
      {
        title: '把统计结果导出成 CSV 字符串',
        intro: '统计完总要交出去，用 DictWriter 写到内存里，直接得到一段能粘进 Excel 的文本。',
        code: `import csv, io

summary = [("广州", 2598.0), ("北京", 1896.0), ("上海", 890.0)]

out = io.StringIO()
writer = csv.DictWriter(out, fieldnames=["城市", "金额"], lineterminator="\\n")
writer.writeheader()
for city, amount in summary:
    writer.writerow({"城市": city, "金额": round(amount, 2)})

print(out.getvalue().strip())`,
        expectedOutput: `城市,金额
广州,2598.0
北京,1896.0
上海,890.0`,
        lines: [
          { code: 'out = io.StringIO()', explain: '在内存里造一个「假文件」，写进去的内容可以用 getvalue 取出来。' },
          { code: 'csv.DictWriter(out, fieldnames=["城市", "金额"])', explain: 'fieldnames 决定列的顺序，也决定表头写什么。' },
          { code: 'writer.writeheader()', explain: '单独调用才会写表头，忘了它导出的文件就没有第一行。' },
          { code: 'lineterminator="\\n"', explain: '把行尾从默认的 \\r\\n 改成 \\n，避免在 Windows 上多出空行。' },
          { code: 'print(out.getvalue().strip())', explain: '取出全部文本，strip 去掉末尾多余的换行。' },
        ],
        trace: [
          { step: '创建 StringIO', state: 'out 是空的文本缓冲区' },
          { step: 'writeheader', state: '写入「城市,金额」并换行' },
          { step: '三行 writerow', state: '按 fieldnames 顺序写入，字典的键顺序不影响结果' },
          { step: 'getvalue', state: '拿到完整 CSV 文本，四行' },
        ],
        tryIt: '把 summary 里再加一行 ("深圳", 1200)，看看导出结果会插在哪里。',
      },
    ],
    compare: [
      {
        conceptA: 'csv.reader',
        conceptB: 'csv.DictReader',
        diff: '前者每行是列表，只能靠下标；后者每行是字典，用列名取值，列顺序变了也不影响代码。',
        example: 'row[3] 与 row["数量"]',
      },
      {
        conceptA: 'int(单元格)',
        conceptB: 'float(单元格)',
        diff: '数量用 int，金额用 float；int("12.5") 会直接报错，float("12") 则得到 12.0。',
        example: 'int("3") 得 3，float("3.5") 得 3.5',
      },
    ],
    pitfalls: [
      '直接对 CSV 值求和，结果是字符串拼接，比如 "3" + "10" 变成 "310"。',
      '空单元格没处理，int("") 抛 ValueError 让程序中断。',
      '按字符串排序金额，出现 9 排在 10 后面。',
      '忘了 writeheader，导出的 CSV 没有表头，别人看不懂。',
      '统计时依赖字典插入顺序，换个数据源结果就变了。',
    ],
    keyPoints: [
      'CSV 读出来全是字符串，数字要自己转换。',
      'DictReader 用列名取值，比下标可靠得多。',
      '缺失值用 try-except 跳过，并记录跳过了多少行。',
      '分组汇总的标准写法是 d[k] = d.get(k, 0) + v。',
      '排序要按数值而不是字符串，导出时指定 lineterminator。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第16章 下载数据' },
      { book: 'abs3', chapter: '第18章 用 CSV、JSON 和 XML 文件工作' },
    ],
    prerequisites: ['s6-03', 's3-07'],
    task: '给自己造一份 10 行的成绩 CSV（含 2 行缺失数据），算出每个人的总分并按总分降序打印，最后导出成一份新的 CSV 字符串。',
    exercises: [
      {
        id: 's8-08-q1',
        qtype: 'single',
        stem: '用 csv 模块读出来的数字，类型是什么？',
        options: [
          'A. 整数 int',
          'B. 浮点数 float',
          'C. 字符串 str',
          'D. 自动推断，数字就是 int',
        ],
        answer: 'C',
        explanation:
          '答案：C。\n思路：CSV 是纯文本格式，没有任何类型信息，读进来一律是字符串。\n逐步演示：单元格里写 199，读出来是 "199"；直接相加会变成字符串拼接 "199199"，必须先 int("199") 才能算数。\n易错提醒：pandas 之类的库会自动推断类型，但标准库 csv 不会，别把两者的习惯混用。',
      },
      {
        id: 's8-08-q2',
        qtype: 'boolean',
        stem: 'CSV 文件里空着的单元格，用 DictReader 读出来是 None。',
        answer: '错',
        explanation:
          '答案：错。\n思路：空单元格读出来是空字符串 ""，不是 None。\n逐步演示：数量列空着时，row["数量"] 得到 ""，int("") 会抛 ValueError: invalid literal for int() with base 10。所以要判断 if not row["数量"]: continue，或者直接用 try-except 跳过。\n易错提醒：用 is None 判断永远不成立，这个 bug 很隐蔽，因为代码不报错，只是漏掉了所有缺失行。',
      },
      {
        id: 's8-08-q3',
        qtype: 'predict',
        stem: 'CSV 文本第一行是表头 name,score，后面还有两行数据。下面这段代码会输出什么？',
        code: `import csv, io
raw = "name,score\\nA,90\\nB,85\\n"
print(len(list(csv.DictReader(io.StringIO(raw)))))`,
        keywords: [['2']],
        explanation:
          '答案：2。\n思路：DictReader 会把第一行当表头，只把后面的数据行当作记录。\n逐步演示：raw 共 3 行，第一行 name,score 被识别为列名，剩下 A,90 和 B,85 两条记录，所以列表长度是 2。\n易错提醒：如果误以为表头也算一行，会答成 3；用 csv.reader 才是 3 行，因为它不区分表头。',
      },
      {
        id: 's8-08-q4',
        qtype: 'blank',
        stem: '要按城市累加金额，且字典里还没有这个城市时从 0 开始，标准写法是 total[city] = total.______(city, 0) + amount。请填方法名。',
        answer: 'get',
        accepted: ['get', 'get()'],
        explanation:
          '答案：get。\n思路：dict.get(键, 默认值) 在键不存在时返回默认值，不会抛 KeyError。\n逐步演示：total 为空时，total.get("北京", 0) 返回 0，加 597 得到 597 并存回 total["北京"]；下次再遇到北京，get 返回 597，继续累加。\n易错提醒：直接写 total[city] 第一次就会 KeyError；用 defaultdict(int) 也可以，但那是另一条路，别和 get 混着写。',
      },
      {
        id: 's8-08-q5',
        qtype: 'program',
        stem: '给定下面的 CSV 文本（第一行是表头），请统计每种产品的总数量，按总数量从高到低打印，每行格式为「产品 数量」，中间一个空格。',
        code: `raw = "产品,数量\\n键盘,3\\n鼠标,10\\n键盘,1\\n显示器,2\\n"`,
        answer: '',
        testCases: [{ stdin: '', expected: '鼠标 10\n键盘 4\n显示器 2' }],
        explanation:
          '答案：\n代码如下：\n\nimport csv, io\n\nraw = "产品,数量\\n键盘,3\\n鼠标,10\\n键盘,1\\n显示器,2\\n"\ntotal = {}\nfor row in csv.DictReader(io.StringIO(raw)):\n    name = row["产品"]\n    total[name] = total.get(name, 0) + int(row["数量"])\n\nfor name, num in sorted(total.items(), key=lambda kv: kv[1], reverse=True):\n    print(name, num)\n\n思路：先按产品分组累加，再按值降序排，最后逐行打印。\n逐步演示：键盘 3 + 1 = 4；鼠标 10；显示器 2；排序后 10、4、2，对应鼠标、键盘、显示器。\n易错提醒：忘了 int 转换会得到 "31" 这种拼接结果；排序不写 key 会按产品名排，顺序完全不同。',
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's8-09',
    stageId: 8,
    order: 9,
    title: '数据可视化入门',
    subtitle: '让数字变成一眼能看懂的图',
    hook: '你跟老板说「这个月销量涨了 12%」，他点点头；你给他看一条向上的曲线，他立刻问「哪个产品带的」——差别在哪？',
    objectives: [
      '能在本地装好 matplotlib 并画出第一张图',
      '能分别画出折线图、柱状图、饼图并设置标题与标签',
      '能解决中文显示成方块的乱码问题',
      '能把图保存成图片文件而不是只在窗口里看一眼',
    ],
    analogy:
      '数据是食材，图表是摆盘。同一块牛排，堆在盘子里没人想吃，摆好盘就成了一道菜。摆盘不改变食材，但决定了别人愿不愿意看。',
    terms: [
      { term: 'matplotlib', plain: 'Python 最常用的画图库，几乎能画所有基础图表。' },
      { term: '折线图', plain: '用线连接数据点，看「随时间变化的趋势」。' },
      { term: '柱状图', plain: '用高低不同的柱子，比较「不同类别的大小」。' },
      { term: '饼图', plain: '用扇形面积表示占比，适合看「各部分占整体多少」。' },
      { term: 'savefig', plain: '把当前画好的图保存成图片文件。' },
    ],
    content: `## 一、为什么需要它（知识背景）

这一课在 Windows + VS Code 本地环境完成。原因是 matplotlib 是第三方库，需要真实安装；浏览器实验室里没有这个库，画不出图，也没有可以弹出的窗口。

安装命令（国内镜像）：

pip install matplotlib -i https://pypi.tuna.tsinghua.edu.cn/simple

装完用 python -c "import matplotlib; print(matplotlib.__version__)" 验证，能打印版本号就成功了。

为什么需要图？因为人眼对长度和位置的敏感度，远高于对数字的敏感度。一张表里有 30 个数字，你要花一分钟找最大值；画成柱状图，最高的那根一眼就能看到。

图表不是装饰，它是「让人快速做出判断」的工具。

## 二、概念解释

matplotlib 的画图逻辑很像画画：先准备一张画布（figure），在画布上放一块绘图区（axes），然后在绘图区里画线、画柱子、写标题，最后展示或保存。

它有两套写法。一套是面向对象式：fig, ax = plt.subplots()，然后 ax.plot(...)。另一套是快捷式：直接 plt.plot(...)，由 matplotlib 自己在后台维护当前画布。新手用快捷式更快，但图多了以后，面向对象式更清楚。

三种基础图各有各的用途，选错图比不画还糟：

**折线图**看趋势，横轴通常是时间。**柱状图**比大小，横轴是类别。**饼图**看占比，类别不宜超过 5 个。

## 三、语法与使用规则

| 写法 | 作用 |
| --- | --- |
| import matplotlib.pyplot as plt | 导入绘图模块，惯例缩写为 plt |
| plt.plot(x, y) | 画折线，x 和 y 长度必须一致 |
| plt.bar(x, y) | 画柱状图，x 是类别，y 是高度 |
| plt.pie(values, labels=..., autopct="%1.1f%%") | 画饼图，autopct 控制百分比显示 |
| plt.title / xlabel / ylabel | 设置标题和坐标轴名称 |
| plt.legend() | 显示图例，多组数据时必须加 |
| plt.savefig("out.png", dpi=150) | 保存成图片，dpi 控制清晰度 |
| plt.show() | 打开窗口显示，会阻塞程序直到关窗 |

三条规则：

第一，**x 和 y 的长度必须相同**，差一个就报 ValueError。

第二，**savefig 要写在 show 之前**。show 之后画布会被清空，再保存得到的是空白图。

第三，**中文必须单独设字体**，否则全是方块。

## 四、逐步演示（分步骤）

第一步：装库，导入 plt，先用两组最简单的数字画一条线，确认窗口能弹出来。

第二步：加标题、横轴名、纵轴名。中文会显示成方块，先忍着，下一步解决。

第三步：设置中文字体：plt.rcParams["font.sans-serif"] = ["SimHei"]，同时把负号显示修正。

第四步：换成柱状图或饼图，观察横轴含义的变化——柱子比的是类别，饼图比的是占比。

第五步：把 plt.show() 换成或补充 plt.savefig("chart.png")，去文件夹里确认图片真的生成了。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 中文全是方块 | 默认字体不含中文 | 设置 font.sans-serif 为 SimHei 或 Microsoft YaHei |
| 负号显示成方块 | 字体不支持负号 | 设置 axes.unicode_minus 为 False |
| 保存的图是空白 | savefig 写在 show 后面 | 先 savefig 再 show |
| x 和 y 长度不一致报错 | 数据条数没对齐 | 打印 len(x) 和 len(y) 核对 |
| 窗口一闪而过 | 脚本执行完立刻退出 | 保留 plt.show()，别在最后删掉 |

## 六、在浏览器里为什么做不到

浏览器实验室里的 Python 跑在 WebAssembly 沙箱中，没有图形界面，也没有安装 matplotlib 的文件系统。就算强行装上，画出来的图也没有窗口可以显示。

所以这一课必须在本地做。好消息是本地装一次就长期有效，以后所有画图需求都用同一套环境。

如果你暂时只能用手机，可以先跳过本课的实操，把代码抄进笔记，等到电脑上再跑。理解三种图各自的用途比跑通代码更重要。`,
    examples: [
      {
        title: '折线图与柱状图的最小写法',
        intro: '这段代码需要先安装 matplotlib，输出为示意：运行后会弹出窗口或在保存目录生成图片，不会打印文字。',
        code: `import matplotlib.pyplot as plt

months = ["1月", "2月", "3月", "4月", "5月"]
sales = [120, 135, 150, 160, 180]

plt.rcParams["font.sans-serif"] = ["SimHei"]
plt.rcParams["axes.unicode_minus"] = False

plt.plot(months, sales, marker="o", label="月销量")
plt.title("前五个月销量趋势")
plt.xlabel("月份")
plt.ylabel("销量")
plt.legend()
plt.savefig("line.png", dpi=150)
plt.show()`,
        expectedOutput: `（运行后弹出窗口显示折线图，并在当前目录生成 line.png）`,
        lines: [
          { code: 'plt.rcParams["font.sans-serif"] = ["SimHei"]', explain: '把默认字体换成黑体，否则「1月」会显示成方块。' },
          { code: 'plt.rcParams["axes.unicode_minus"] = False', explain: '让坐标轴上的负号用普通短横线显示，避免又是一个方块。' },
          { code: 'plt.plot(months, sales, marker="o", label="月销量")', explain: '画折线，marker 在每个点上画小圆点，label 给图例用。' },
          { code: 'plt.savefig("line.png", dpi=150)', explain: '保存成图片，dpi 越高越清晰，文件也越大。' },
          { code: 'plt.show()', explain: '弹出窗口显示，程序会停在这里直到你关闭窗口。' },
        ],
        trace: [
          { step: '设置字体', state: '全局默认字体改为 SimHei，负号改为普通横线' },
          { step: 'plot 绘制', state: '5 个点被依次连成一条上升的折线' },
          { step: '加标注', state: '标题、横轴名、纵轴名、图例依次写入画布' },
          { step: '保存并显示', state: 'line.png 落盘，随后弹窗展示同一张图' },
        ],
        tryIt: '把 marker="o" 删掉，再运行一次，看看折线上的圆点是不是消失了。',
      },
      {
        title: '饼图与多组柱状图',
        intro: '这段代码需要先安装 matplotlib，输出为示意。饼图看占比，柱状图可以并排放两组数据做对比。',
        code: `import matplotlib.pyplot as plt

plt.rcParams["font.sans-serif"] = ["SimHei"]
plt.rcParams["axes.unicode_minus"] = False

labels = ["水果", "蔬菜", "肉类", "其他"]
shares = [40, 25, 25, 10]

plt.pie(shares, labels=labels, autopct="%1.1f%%", startangle=90)
plt.title("家庭食品支出构成")
plt.savefig("pie.png", dpi=150)
plt.show()

products = ["键盘", "鼠标", "显示器"]
q1 = [30, 50, 12]
q2 = [45, 38, 20]
x = range(len(products))

plt.bar([i - 0.2 for i in x], q1, width=0.4, label="一季度")
plt.bar([i + 0.2 for i in x], q2, width=0.4, label="二季度")
plt.xticks(list(x), products)
plt.legend()
plt.savefig("bar.png", dpi=150)
plt.show()`,
        expectedOutput: `（运行后依次弹出饼图和柱状图窗口，并生成 pie.png、bar.png 两个文件）`,
        lines: [
          { code: 'plt.pie(shares, labels=labels, autopct="%1.1f%%")', explain: '按数值画扇形，labels 是每块的名称，autopct 显示保留一位小数的百分比。' },
          { code: 'startangle=90', explain: '从 12 点方向开始画，读起来更符合直觉。' },
          { code: '[i - 0.2 for i in x]', explain: '把第一组柱子整体左移 0.2，第二组右移 0.2，两组才不会叠在一起。' },
          { code: 'plt.xticks(list(x), products)', explain: '把横轴刻度从 0、1、2 换成产品名。' },
          { code: 'width=0.4', explain: '柱子宽度，两组加起来正好 0.8，留出一点缝隙。' },
        ],
        trace: [
          { step: '画饼图', state: '四个扇形按 40、25、25、10 的比例分配角度' },
          { step: '保存饼图', state: 'pie.png 生成，随后弹窗显示' },
          { step: '画两组柱', state: '同一类别下两根柱子左右并排，颜色自动区分' },
          { step: '替换刻度', state: '横轴显示键盘、鼠标、显示器，图例标明季度' },
        ],
        tryIt: '把 shares 改成 [60, 15, 15, 10]，看第一块扇形是不是明显变大。',
      },
    ],
    compare: [
      {
        conceptA: '折线图',
        conceptB: '柱状图',
        diff: '折线强调连续变化和趋势，横轴通常有时间顺序；柱状强调类别之间的大小对比，横轴顺序可以随意调。',
        example: '月度销量用折线，各产品销量对比用柱状',
      },
      {
        conceptA: 'savefig',
        conceptB: 'show',
        diff: '前者把图写进文件，可分享可存档；后者只在本机窗口显示，关掉就没了。顺序上 savefig 必须先执行。',
        example: 'plt.savefig("a.png") 与 plt.show()',
      },
    ],
    pitfalls: [
      '中文显示成方块，忘了设置 font.sans-serif。',
      'savefig 写在 show 之后，保存出来是空白图。',
      'x 和 y 长度不一致，报 ValueError。',
      '饼图放了十几个类别，扇形小到看不清占比。',
      '在浏览器实验室里试画图，找不到库也弹不出窗口。',
    ],
    keyPoints: [
      'matplotlib 需要本地安装，浏览器实验室跑不了。',
      '折线看趋势、柱状比大小、饼图看占比。',
      '中文乱码要设置 font.sans-serif，负号要关掉 unicode_minus。',
      'savefig 必须写在 show 之前。',
      '图表的目的不是好看，是让人快速做出判断。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第15章 生成数据' },
      { book: 'pcc3', chapter: '第16章 下载数据', note: '教材用真实下载数据作图，本课简化为内置数据' },
    ],
    prerequisites: ['s7-02'],
    task: '用自己最近 7 天的学习时长画一张折线图，加上标题和坐标轴名称，保存成 study.png，再换一种图（柱状或饼图）对比看效果。',
    exercises: [
      {
        id: 's8-09-q1',
        qtype: 'single',
        stem: '想展示「过去 12 个月的销量变化趋势」，最合适的图是？',
        options: ['A. 饼图', 'B. 折线图', 'C. 柱状图', 'D. 散点图'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：折线图的横轴天然表示连续的顺序（时间），线的起伏直接对应趋势的涨落。\n逐步演示：12 个月作为横轴，销量作为纵轴，连成线后，上升、下降、波动一目了然；换成饼图只能看占比，换成柱状图虽然也能看，但趋势感弱很多。\n易错提醒：饼图适合「一个整体分成几份」，一旦类别超过 5 个就没法看了。',
      },
      {
        id: 's8-09-q2',
        qtype: 'boolean',
        stem: '在 matplotlib 里，plt.show() 应该写在 plt.savefig() 之前。',
        answer: '错',
        explanation:
          '答案：错。\n思路：show 会显示并结束当前画布的绘制流程，之后再 savefig 往往得到一张空白图。\n逐步演示：正确顺序是先 plt.savefig("a.png") 把当前画布写入文件，再 plt.show() 展示；如果顺序反了，保存下来的文件打开是全白的，很容易误以为代码有问题。\n易错提醒：有些环境里反着写也能存下来，但这是偶然，不要依赖。',
      },
      {
        id: 's8-09-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请写出 print 的那一行结果。',
        code: `values = [1, 2, 3]
print(round(sum(values) / len(values), 2))`,
        keywords: [['2.0']],
        explanation:
          '答案：2.0。\n思路：这是画图前最常见的准备动作——先算出平均值，再决定坐标轴的刻度或参考线位置。\n逐步演示：sum 得到 6，len 是 3，6 / 3 得到 2.0（Python 3 的除法结果是浮点数），round 保留两位小数仍然是 2.0。\n易错提醒：round(2.0, 2) 不会变成整数 2，输出里的小数点会保留，写测试用例时不能想当然。',
      },
      {
        id: 's8-09-q4',
        qtype: 'blank',
        stem: '要把当前画好的图保存成 chart.png，应调用 plt.______("chart.png")。请填函数名。',
        answer: 'savefig',
        accepted: ['savefig', 'savefig()'],
        explanation:
          '答案：savefig。\n思路：save 是保存，fig 是 figure（画布），合起来就是「保存当前画布」。\n逐步演示：plt.savefig("chart.png", dpi=150) 会把当前画布写成 PNG 文件，dpi 越高越清晰；文件名后缀决定格式，写 .pdf 就存成 PDF。\n易错提醒：写成 savefig 而不是 saveFig，Python 区分大小写；另外它必须写在 show 之前。',
      },
      {
        id: 's8-09-q5',
        qtype: 'program',
        stem: '给定 12 个月的销量列表，请计算平均值并打印，保留 1 位小数。只输出一行。',
        code: `sales = [120, 135, 150, 160, 180, 210, 230, 220, 190, 170, 150, 140]`,
        answer: '',
        testCases: [{ stdin: '', expected: '171.2' }],
        explanation:
          '答案：\n代码如下：\n\nsales = [120, 135, 150, 160, 180, 210, 230, 220, 190, 170, 150, 140]\navg = sum(sales) / len(sales)\nprint(round(avg, 1))\n\n思路：总和除以个数得到平均值，round 保留一位小数。\n逐步演示：总和是 2055，个数是 12，2055 / 12 = 171.25，保留一位小数后四舍五入为 171.2（Python 的 round 在这种边界上按二进制实际值处理）。\n易错提醒：写成 round(avg, 1) 而不是 round(avg)，后者会取整变成 171；也不要自己拼字符串格式化，round 已经够了。',
      },
    ],
    minutes: 18,
    env: 'local',
  },
  {
    id: 's8-10',
    stageId: 8,
    order: 10,
    title: '数据库基础（SQLite）',
    subtitle: '数据一多，文件就不够用了',
    hook: '你用文本文件记了三个月的账，现在想查「上个月餐饮一共花了多少」，打算一行行翻吗？',
    objectives: [
      '能说出用纯文本存数据会遇到的三个具体问题',
      '能理解 SQLite 是「一个文件就是一个数据库」',
      '能用 sqlite3 建表、插入、查询、更新、删除',
      '能用参数化查询挡住 SQL 注入',
    ],
    analogy:
      '文本文件像一本流水账，找东西只能从头翻；数据库像带索引的档案柜，说清「哪一类、什么条件」，柜子直接把那几张卡片递到你手上。',
    terms: [
      { term: '数据库', plain: '专门用来存数据、查数据的软件，能快速找到你要的那几条。' },
      { term: '表', plain: '像一张 Excel 表，有列名（字段）和一行行记录。' },
      { term: 'SQL', plain: '对数据库说话的固定句式，全世界通用。' },
      { term: '主键', plain: '每行数据的唯一编号，不会重复，用来精确定位。' },
      { term: '参数化查询', plain: '把值单独交给数据库，而不是拼进 SQL 字符串，能防注入。' },
    ],
    content: `## 一、为什么需要它（知识背景）

这一课在 Windows + VS Code 本地环境完成。原因是数据库会把数据写到磁盘上的一个文件里，浏览器实验室没有持久的文件系统，关掉页面数据就没了。好消息是 sqlite3 是 Python 自带的标准库，**不需要 pip install**，打开终端就能用。

先说清楚：为什么不能一直用文本文件？

第一，**查得慢**。十万行记录里找某个用户，程序只能从头读一遍。数据量再大一点，一次查询要等好几秒。

第二，**改得险**。想改其中一行，得把整个文件读进内存、改完再整个写回去。如果写到一半断电，文件就废了。

第三，**管不住**。两个人同时写同一个文件，后写的会覆盖先写的；字段类型没人约束，金额列里可以塞进一句「abc」。

数据库把这三件事都解决了：有索引所以查得快，有事务所以改得安全，有字段类型和约束所以数据不会乱。

## 二、概念解释

SQLite 是一个「不用装服务器」的数据库。MySQL、PostgreSQL 都需要单独启动一个服务进程，SQLite 不用——它把整个数据库存成**一个文件**，程序直接读写这个文件。

这带来两个好处：零配置，拷走一个 .db 文件就等于拷走了整个数据库；单文件，备份极其简单。

代价是它不适合超大规模、超高并发的场景。但对个人项目、小型工具、本地数据分析来说，SQLite 完全够用，而且速度快得惊人。

表的结构和 Excel 很像：有列名和类型，一行是一条记录。区别在于每一列都要事先声明类型（INTEGER、REAL、TEXT），而且可以指定主键来自动编号。

## 三、语法与使用规则

五条基础 SQL，覆盖增删改查：

| 操作 | SQL 写法 | 说明 |
| --- | --- | --- |
| 建表 | CREATE TABLE 表名 (列名 类型, ...) | 只需执行一次 |
| 插入 | INSERT INTO 表名 (列1, 列2) VALUES (?, ?) | 问号是占位符 |
| 查询 | SELECT 列 FROM 表名 WHERE 条件 | 最常用的语句 |
| 更新 | UPDATE 表名 SET 列 = ? WHERE 条件 | 不写 WHERE 会改全部行 |
| 删除 | DELETE FROM 表名 WHERE 条件 | 不写 WHERE 会删全部行 |

Python 这边的三步流程：

第一步，conn = sqlite3.connect("data.db") 建立连接，文件不存在会自动创建。

第二步，cur = conn.cursor() 拿到游标，所有 SQL 都通过它执行。

第三步，执行完写操作后 conn.commit() 提交，最后 conn.close() 关闭。

三条铁律：

第一，**写操作必须 commit**。不提交的话，程序退出时改动全部丢失，你会以为代码没生效。

第二，**永远用问号占位**。把用户输入拼进 SQL 字符串，等于把家门钥匙交给陌生人。

第三，**UPDATE 和 DELETE 一定带 WHERE**。忘了写，整张表的数据会被一起改掉或删掉。

## 四、逐步演示（分步骤）

第一步：连一个内存库 sqlite3.connect(":memory:")，练习时用它可以随时重来，不留下垃圾文件。

第二步：建表，注意每个列都要写类型，id 用 INTEGER PRIMARY KEY AUTOINCREMENT 让它自动编号。

第三步：用 executemany 一次插入多行，观察第二个参数是「元组的列表」，每个元组对应一行。

第四步：查询时先 SELECT 再 fetchall，打印出来看结构——每行是一个元组。

第五步：改一行、删一行，每次都 commit，最后再查一次确认改动生效。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 插入后查不到数据 | 忘了 commit | 写完立刻 conn.commit() |
| sqlite3.OperationalError: no such table | 表没建或连错了文件 | 确认建表语句执行过，检查数据库路径 |
| 查询结果全是元组，不好读 | 默认按行返回元组 | 用 row_factory 或按下标取值 |
| 用户输入导致 SQL 报错或被篡改 | 用字符串拼接 SQL | 改成 ? 占位 + 参数元组 |
| 数据文件被锁 | 上一个连接没关 | 用完 conn.close() |

## 六、参数化查询为什么能防注入

假设你写的是「SELECT * FROM user WHERE name = '」加上用户输入再加「'」。用户在输入框里填 ' OR '1'='1，拼出来的语句就变成永真条件，整张表的数据全被捞出来。这就是 SQL 注入。

用问号占位就不一样：SQL 语句的结构先被数据库解析定型，用户输入永远只被当成「一个值」，哪怕里面有一堆引号和 OR，也只是个奇怪的字符串。

记住一句话：**SQL 里能用问号的地方，绝不用加号拼字符串。**`,
    examples: [
      {
        title: '建表、插入、查询、更新、删除走一遍',
        intro: '用内存数据库做实验，程序结束数据就消失，不会在磁盘上留下文件。',
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()

cur.execute("""
CREATE TABLE expense (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT NOT NULL,
    amount REAL NOT NULL
)
""")

cur.executemany(
    "INSERT INTO expense (item, amount) VALUES (?, ?)",
    [("早饭", 12.5), ("地铁", 6), ("午饭", 28)]
)
conn.commit()

cur.execute("SELECT item, amount FROM expense WHERE amount > ?", (10,))
for row in cur.fetchall():
    print(row)

cur.execute("SELECT SUM(amount), COUNT(*) FROM expense")
print(cur.fetchone())

cur.execute("UPDATE expense SET amount = ? WHERE item = ?", (30, "午饭"))
conn.commit()
print(cur.execute("SELECT amount FROM expense WHERE item = '午饭'").fetchone())

cur.execute("DELETE FROM expense WHERE item = ?", ("地铁",))
conn.commit()
print(cur.execute("SELECT COUNT(*) FROM expense").fetchone())

conn.close()`,
        expectedOutput: `('早饭', 12.5)
('午饭', 28.0)
(46.5, 3)
(30.0,)
(2,)`,
        lines: [
          { code: 'sqlite3.connect(":memory:")', explain: '冒号 memory 表示内存数据库，进程结束即销毁，适合练习和测试。' },
          { code: 'id INTEGER PRIMARY KEY AUTOINCREMENT', explain: '主键自动递增，插入时不用管 id，数据库自己编号。' },
          { code: 'cur.executemany(sql, 列表)', explain: '一次插入多行，列表里每个元组对应一行，问号按顺序被填上。' },
          { code: 'WHERE amount > ?", (10,)', explain: '注意 (10,) 这个逗号，单元素元组必须带逗号，否则只是加了括号的数字。' },
          { code: 'cur.fetchone()', explain: '只取一行，返回元组；SUM 和 COUNT 聚合成一行两列。' },
        ],
        trace: [
          { step: '建表后', state: 'expense 表有 id、item、amount 三列，暂时 0 行' },
          { step: '插入三行', state: 'id 自动为 1、2、3，金额是 12.5、6、28' },
          { step: '查询大于 10', state: '返回早饭 12.5 和午饭 28 两行，地钱 6 被过滤' },
          { step: '聚合查询', state: 'SUM 得 46.5，COUNT 得 3' },
          { step: '更新并删除', state: '午饭改成 30，地铁被删，最后只剩 2 行' },
        ],
        tryIt: '把 DELETE 语句的 WHERE 去掉，再运行一次，观察最后剩几行——这就是最危险的操作。',
      },
      {
        title: '参数化查询挡住注入',
        intro: '同一个用户输入，用拼接和用占位符的结果完全不同，这是安全意识的第一课。',
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE user (name TEXT, role TEXT)")
cur.executemany(
    "INSERT INTO user VALUES (?, ?)",
    [("小林", "学员"), ("老王", "管理员")]
)

bad = "小林' OR '1'='1"
sql = "SELECT * FROM user WHERE name = '" + bad + "'"
print("拼接写法拿到", len(cur.execute(sql).fetchall()), "行")

sql2 = "SELECT * FROM user WHERE name = ?"
print("参数化拿到", len(cur.execute(sql2, (bad,)).fetchall()), "行")

conn.close()`,
        expectedOutput: `拼接写法拿到 2 行
参数化拿到 0 行`,
        lines: [
          { code: 'bad = "小林\' OR \'1\'=\'1"', explain: '模拟攻击者在输入框里填入的恶意内容，引号会提前闭合 SQL 的字符串。' },
          { code: 'sql = "..." + bad + "..."', explain: '字符串拼接把用户输入当成了 SQL 语法的一部分。' },
          { code: 'cur.execute(sql2, (bad,))', explain: '结构先定型，用户输入只作为一个值参与比较，不会被当成语法。' },
          { code: 'len(...fetchall())', explain: '用行数对比两种写法的差异，一眼看出危险在哪。' },
        ],
        trace: [
          { step: '拼接后', state: "语句变成 WHERE name = '小林' OR '1'='1'，条件永真" },
          { step: '查询结果', state: '两行全部命中，攻击者拿到了不属于自己的数据' },
          { step: '参数化后', state: '数据库把整串内容当成一个名字去比较' },
          { step: '查询结果', state: '没有人的名字是这串奇怪文本，返回 0 行' },
        ],
        tryIt: '把 bad 改成正常名字「小林」，两种写法应该都返回 1 行。',
      },
    ],
    compare: [
      {
        conceptA: '文本文件',
        conceptB: 'SQLite 数据库',
        diff: '前者查得慢、改得险、没有约束；后者有索引、有事务、有类型约束，但需要写 SQL。',
        example: '记账.txt 与 book.db',
      },
      {
        conceptA: 'execute',
        conceptB: 'executemany',
        diff: '前者执行一条 SQL，参数是一个元组；后者执行同一条 SQL 多次，参数是「元组的列表」。',
        example: 'execute(sql, (1,)) 与 executemany(sql, [(1,), (2,)])',
      },
    ],
    pitfalls: [
      '插入后忘了 commit，关掉程序数据全没了。',
      'UPDATE 或 DELETE 漏写 WHERE，整张表被改或被清空。',
      '用字符串拼接 SQL，给自己埋下注入漏洞。',
      '单元素元组写成 (10) 而不是 (10,)，参数数量对不上。',
      '用完不 close，文件被锁住，下次连接报错。',
    ],
    keyPoints: [
      '文件存数据的三大问题：慢、险、管不住。',
      'SQLite 无需服务器，一个文件就是一个数据库，标准库自带。',
      '增删改查四件套：INSERT、SELECT、UPDATE、DELETE。',
      '写操作必须 commit，UPDATE 和 DELETE 必须带 WHERE。',
      '一律用问号占位，永不拼接 SQL 字符串。',
    ],
    sources: [
      { book: 'abs3', chapter: '第18章 用 CSV、JSON 和 XML 文件工作' },
      { book: 'pcc3', chapter: '第18章 项目扩展', note: '教材未系统讲数据库，此课为补充扩展' },
    ],
    prerequisites: ['s6-01'],
    task: '用 SQLite 建一张记账表，插入 5 条真实消费记录，查出总金额、最大一笔、以及每个类别的合计，最后删掉金额小于 5 元的记录。',
    exercises: [
      {
        id: 's8-10-q1',
        qtype: 'single',
        stem: 'SQLite 与 MySQL 相比，最大的特点是？',
        options: [
          'A. 不需要单独启动服务器，一个文件就是整个数据库',
          'B. 只能存文字，不能存数字',
          'C. 必须在浏览器里运行',
          'D. 不能执行 UPDATE 语句',
        ],
        answer: 'A',
        explanation:
          '答案：A。\n思路：SQLite 是嵌入式数据库，程序直接读写一个 .db 文件，没有独立的服务进程。\n逐步演示：sqlite3.connect("book.db") 第一次执行时会自动创建这个文件，之后所有表和数据都在里面；把它复制到另一台电脑，数据就跟着走了。\n易错提醒：方便不等于万能，SQLite 不适合高并发写入的大型系统，但个人工具和小项目完全够用。',
      },
      {
        id: 's8-10-q2',
        qtype: 'boolean',
        stem: '用 sqlite3 执行 INSERT 之后，必须调用 commit，否则程序退出后数据可能没有真正写入文件。',
        answer: '对',
        explanation:
          '答案：对。\n思路：SQLite 默认把写操作放在事务里，commit 才是「确认落盘」的那一刻。\n逐步演示：执行 INSERT 后立刻 close 而不 commit，重新连接查询会发现表里没有那行数据。加上 conn.commit() 之后，数据才持久化。\n易错提醒：查询不需要 commit，只有增删改需要；养成「写完就 commit」的习惯，比记住什么时候需要更可靠。',
      },
      {
        id: 's8-10-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请写出 print 的那一行结果。',
        code: `import sqlite3
conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE t (x INT)")
conn.executemany("INSERT INTO t VALUES (?)", [(1,), (2,)])
print(len(conn.execute("SELECT * FROM t").fetchall()))`,
        keywords: [['2']],
        explanation:
          '答案：2。\n思路：executemany 插入了两个元组，就是两行数据；fetchall 把结果全部取出，长度即行数。\n逐步演示：建表后 0 行；插入 (1,) 和 (2,) 后 2 行；SELECT * 拿到两个元组 (1,) 和 (2,)；len 得到 2。\n易错提醒：这里没有 commit 也能查到，是因为同一个连接内能看到未提交的改动；但换一个连接就查不到了。',
      },
      {
        id: 's8-10-q4',
        qtype: 'blank',
        stem: '为了防止 SQL 注入，插入语句应写成 INSERT INTO t (name) VALUES (______)，把值放到第二个参数里传。请填这个占位符。',
        answer: '?',
        accepted: ['?', '？', '问号'],
        explanation:
          '答案：?。\n思路：问号是参数占位符，SQL 结构先被解析定型，值再单独送进去，用户输入永远不会变成语法。\n逐步演示：cur.execute("INSERT INTO t (name) VALUES (?)", (name,))，无论 name 里有多少引号和 OR，都只被当成一个普通字符串。\n易错提醒：用 %s 或 f-string 拼进 SQL 都等于没防；占位符只认问号（sqlite3 里），别照搬其他数据库的写法。',
      },
      {
        id: 's8-10-q5',
        qtype: 'program',
        stem: '在内存数据库中建一张表 e（字段 item 文本、amount 实数），插入两行：早饭 12.5、午饭 34，然后查询金额总和并打印。只输出一行。',
        answer: '',
        testCases: [{ stdin: '', expected: '46.5' }],
        explanation:
          '答案：\n代码如下：\n\nimport sqlite3\n\nconn = sqlite3.connect(":memory:")\nconn.execute("CREATE TABLE e (item TEXT, amount REAL)")\nconn.executemany("INSERT INTO e VALUES (?, ?)", [("早饭", 12.5), ("午饭", 34)])\nprint(conn.execute("SELECT SUM(amount) FROM e").fetchone()[0])\nconn.close()\n\n思路：建表、插入、聚合查询三步，SUM 把金额加起来。\n逐步演示：两行插入后 SUM(amount) 得到 46.5；fetchone 返回元组 (46.5,)；取下标 0 得到数字 46.5；print 输出 46.5。\n易错提醒：忘了取 [0] 会打印 (46.5,) 这种带括号逗号的形式；把 34 写成字符串就会变成文本，SUM 结果不对。',
      },
    ],
    minutes: 20,
    env: 'local',
  },
  {
    id: 's8-11',
    stageId: 8,
    order: 11,
    title: '自动化脚本：文件与文件夹管理',
    subtitle: '让程序替你整理那堆乱七八糟的文件',
    hook: '下载文件夹里堆了 300 个文件，名字乱七八糟，你打算一个个改名，还是写十行代码？',
    objectives: [
      '能用 pathlib 列出、判断、改名、创建、删除文件',
      '能写出带序号的批量重命名脚本',
      '能按扩展名或日期把文件归类到子文件夹',
      '能在跑脚本之前先做副本，并用 try-except 兜住异常',
    ],
    analogy:
      '批量操作像用推土机整理院子：效率极高，但推错方向就全毁了。所以老手都先画一张地图（副本），确认路线没错，再开机器。',
    terms: [
      { term: 'pathlib', plain: 'Python 自带的路径工具，用对象的方式操作文件和文件夹。' },
      { term: 'Path', plain: '一个路径对象，能拼路径、读内容、改名字。' },
      { term: 'glob', plain: '按通配符找文件，比如 *.txt 表示所有文本文件。' },
      { term: 'rglob', plain: '递归地找，子文件夹里的也算。' },
      { term: '幂等', plain: '同一段脚本跑两次，结果和跑一次一样，不会越跑越乱。' },
    ],
    content: `## 一、为什么需要它（知识背景）

这一课在 Windows + VS Code 本地环境完成。原因是文件操作必须作用在真实的磁盘上，浏览器实验室没有可写的本地文件夹。pathlib 是标准库，不需要 pip install，直接 import 就能用。

手动整理文件的问题不在于累，而在于**容易错**。300 个文件里改错一个名字，你可能一个月后才发现；按扩展名归类时漏了一类，文件就永远躺在根目录。

脚本的优势是「规则一致」：你写清楚规则，它一丝不苟地执行 300 次，不会手抖，不会疲劳。

但脚本也有它的危险：一条 rm 或者一个错误的 rename，可以在 0.1 秒内毁掉 300 个文件。所以这一课的重点不是「怎么写」，而是「怎么安全地写」。

## 二、概念解释

pathlib 的核心是 Path 对象。一个 Path 既可以是文件，也可以是文件夹，甚至可以是还不存在的路径——它只是「一个地址」。

用 / 运算符拼路径是 pathlib 最舒服的地方：Path("data") / "a.txt" 会自动处理分隔符，Windows 的反斜杠和 Linux 的正斜杠都不用你操心。

常用的几组操作：

**看**：iterdir() 列出直接子项，glob("*.txt") 按模式找，rglob 递归找，exists() 判断存在，is_file() 和 is_dir() 判断类型。

**改**：rename(新路径) 改名或移动，write_text 写文本，read_text 读文本，mkdir 建文件夹。

**删**：unlink() 删文件，rmdir() 删空文件夹，整个目录树要用 shutil.rmtree。

## 三、语法与使用规则

| 写法 | 作用 |
| --- | --- |
| Path("data") / "a.txt" | 拼路径，自动处理分隔符 |
| p.iterdir() | 列出直接子项（文件和文件夹都算） |
| p.glob("*.txt") | 按模式匹配，不递归 |
| p.rglob("*.txt") | 递归匹配所有子目录 |
| p.exists() / p.is_file() / p.is_dir() | 判断存在与类型 |
| p.rename(p.with_name("新名.txt")) | 改名，with_name 只换文件名部分 |
| p.suffix / p.stem / p.name | 后缀、不含后缀的名字、完整名字 |
| p.mkdir(parents=True, exist_ok=True) | 建目录，已存在也不报错 |
| p.unlink() | 删除文件 |

四条安全规则：

第一，**先备份再动手**。把整个文件夹复制一份，脚本只在副本上跑，确认结果正确再对原件执行。

第二，**先打印再执行**。所有改名、删除的操作，第一版脚本一律只 print 不真做，肉眼核对清单。

第三，**全程 try-except**。一个文件被占用就会中断整个循环，剩下的文件处理不到，加 try 让它跳过继续。

第四，**保证幂等**。脚本跑两次的结果要和跑一次一样，所以归类前要判断目标文件夹是否已存在，改名时要检查新名字是否已被占用。

## 四、逐步演示（分步骤）

第一步：先用 print 列出所有文件名，确认你看到的和资源管理器里的一致。

第二步：写「只打印不执行」版本：对每个文件打印「将把 A 改成 B」，检查清单有没有错。

第三步：在副本文件夹上真正执行，打开资源管理器肉眼验收。

第四步：验收通过，再对原文件夹执行。执行前再确认一次路径写的是哪个。

第五步：给整个循环套上 try-except，把出错的文件名记下来，最后统一打印，方便单独处理。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| PermissionError | 文件正被别的程序打开 | 关掉 Excel、Word 再跑，或用 try-except 跳过 |
| FileExistsError | 目标名字已存在 | 改名时先检查，或加序号避免冲突 |
| 只处理了一部分就停了 | 中途某个文件报错，循环中断 | 每个文件单独 try-except |
| 跑了两次文件变成 01_01_xxx | 脚本不幂等 | 先判断文件名是否已经带序号 |
| 把文件删光了 | 路径写错，或循环里误用 unlink | 先备份，先打印，绝不先删 |

## 六、脚本写完先自检

问自己三个问题：如果这个脚本跑两遍，会发生什么？如果中间某个文件出错，剩下的还会继续吗？如果我手滑把路径改成 C 盘根目录，最坏的结果是什么？

第三个问题的答案，决定了你要不要先做备份。`,
    examples: [
      {
        title: 'pathlib 基本操作与批量重命名',
        intro: '在一个临时文件夹里造 4 个文件，按名字排序后加上两位序号前缀，最后清理干净。',
        code: `from pathlib import Path

folder = Path("demo")
folder.mkdir(exist_ok=True)

for name in ["报告.txt", "照片1.jpg", "照片2.jpg", "笔记.md"]:
    (folder / name).write_text("示例内容", encoding="utf-8")

print(sorted(p.name for p in folder.iterdir()))
print(folder.is_dir(), (folder / "报告.txt").is_file())

for i, p in enumerate(sorted(folder.iterdir()), start=1):
    p.rename(p.with_name(f"{i:02d}_{p.name}"))

print(sorted(p.name for p in folder.iterdir()))

for p in folder.iterdir():
    p.unlink()
folder.rmdir()
print("清理完成")`,
        expectedOutput: `['报告.txt', '照片1.jpg', '照片2.jpg', '笔记.md']
True True
['01_报告.txt', '02_照片1.jpg', '03_照片2.jpg', '04_笔记.md']
清理完成`,
        lines: [
          { code: 'folder = Path("demo")', explain: '只是造了一个路径对象，此时磁盘上还什么都没有。' },
          { code: 'folder.mkdir(exist_ok=True)', explain: '真正创建文件夹，exist_ok 让它在已存在时不报错，保证脚本可重复执行。' },
          { code: '(folder / name).write_text(...)', explain: '用斜杠拼路径，再写入内容，文件不存在会自动创建。' },
          { code: 'p.with_name(f"{i:02d}_{p.name}")', explain: '只替换文件名部分，保留所在目录；02d 表示补零到两位。' },
          { code: 'p.unlink() 与 folder.rmdir()', explain: '先删掉文件夹里的文件，才能删掉这个空文件夹。' },
        ],
        trace: [
          { step: '建目录并写入', state: 'demo 下有 4 个文件，内容都是「示例内容」' },
          { step: '排序打印', state: '按 Unicode 顺序，报告、照片1、照片2、笔记' },
          { step: 'enumerate 循环', state: 'i 从 1 到 4，每次拼出新名字再 rename' },
          { step: '重命名后', state: '文件名前面都多了 01_ 到 04_ 的序号' },
          { step: '清理', state: '4 个文件被删，空目录被移除' },
        ],
        tryIt: '把 02d 改成 03d，重新运行，看看序号变成几位。',
      },
      {
        title: '按扩展名归类，并批量替换内容',
        intro: '模拟整理下载文件夹：每个文件按后缀进入对应子文件夹，再把所有 txt 里的旧内容替换掉。',
        code: `from pathlib import Path
import shutil

src = Path("downloads")
src.mkdir(exist_ok=True)
for n in ["账单.csv", "截图.png", "简历.pdf", "旧截图.png", "备忘.txt"]:
    (src / n).write_text("草稿：旧内容", encoding="utf-8")

for p in list(src.iterdir()):
    if not p.is_file():
        continue
    target = src / p.suffix.lstrip(".")
    target.mkdir(exist_ok=True)
    p.rename(target / p.name)

for p in sorted(src.iterdir()):
    print(p.name, [f.name for f in sorted(p.iterdir())])

for p in src.rglob("*.txt"):
    try:
        text = p.read_text(encoding="utf-8")
        p.write_text(text.replace("旧内容", "新内容"), encoding="utf-8")
    except OSError as e:
        print("跳过", p.name, e)

print((src / "txt" / "备忘.txt").read_text(encoding="utf-8"))
shutil.rmtree(src)
print("整理完成")`,
        expectedOutput: `csv ['账单.csv']
pdf ['简历.pdf']
png ['截图.png', '旧截图.png']
txt ['备忘.txt']
草稿：新内容
整理完成`,
        lines: [
          { code: 'for p in list(src.iterdir()):', explain: '先转成列表再遍历，因为循环里会移动文件，边遍历边改容易漏。' },
          { code: 'target = src / p.suffix.lstrip(".")', explain: 'suffix 带点（.csv），lstrip 去掉点，用后缀名当文件夹名。' },
          { code: 'p.rename(target / p.name)', explain: '移动到目标文件夹，名字不变；rename 同时负责改名和移动。' },
          { code: 'src.rglob("*.txt")', explain: '递归查找，子文件夹里的 txt 也能被找到。' },
          { code: 'except OSError as e:', explain: '文件被占用、权限不足都会抛 OSError，接住它让循环继续。' },
        ],
        trace: [
          { step: '创建 5 个文件', state: '都在 downloads 根目录下' },
          { step: '归类', state: '按后缀建了 csv、pdf、png、txt 四个子文件夹' },
          { step: '两个 png', state: '截图.png 和旧截图.png 都进了 png 文件夹' },
          { step: '批量替换', state: 'rglob 找到备忘.txt，旧内容 被替换成 新内容' },
          { step: '清理', state: 'rmtree 删除整棵目录树' },
        ],
        tryIt: '把 replace 的两个参数对调，再跑一次，看看文件内容会变成什么。',
      },
    ],
    compare: [
      {
        conceptA: 'glob',
        conceptB: 'rglob',
        diff: '前者只在当前层找，后者会钻进所有子文件夹。整理下载目录时用 glob，全盘搜索时用 rglob。',
        example: 'p.glob("*.txt") 与 p.rglob("*.txt")',
      },
      {
        conceptA: 'unlink',
        conceptB: 'rmtree',
        diff: '前者删单个文件，后者删整棵目录树。后者一旦路径写错，后果无法挽回。',
        example: 'file.unlink() 与 shutil.rmtree(folder)',
      },
    ],
    pitfalls: [
      '直接对原文件夹跑脚本，没有先做副本。',
      '边遍历 iterdir 边 rename，结果漏掉一半文件。',
      '改名时不检查重名，FileExistsError 中断整个循环。',
      '脚本不幂等，跑两次文件名变成 01_01_xxx。',
      'rmtree 的路径变量拼错，删掉了不该删的目录。',
    ],
    keyPoints: [
      'pathlib 用 / 拼路径，跨平台不用管分隔符。',
      'iterdir、glob、rglob 覆盖了绝大多数查找需求。',
      '批量操作前先备份、先打印、后执行。',
      '循环里每个文件单独 try-except，别让一个错误中断全部。',
      '脚本要幂等，跑两次和跑一次结果一样。',
    ],
    sources: [{ book: 'abs3', chapter: '第11章 组织文件' }],
    prerequisites: ['s6-02', 's6-06'],
    task: '写一个脚本，把某个文件夹里所有 .jpg 按「拍摄月份」分到 2026-01 这样的子文件夹里（没有日期信息就按修改时间），先在副本上跑通，再加 try-except 打印出错清单。',
    exercises: [
      {
        id: 's8-11-q1',
        qtype: 'single',
        stem: '要递归查找某个文件夹及其所有子文件夹里的 txt 文件，应该用？',
        options: ['A. p.iterdir()', 'B. p.glob("*.txt")', 'C. p.rglob("*.txt")', 'D. p.exists()'],
        answer: 'C',
        explanation:
          '答案：C。\n思路：rglob 的 r 是 recursive（递归），会把所有层级的子目录都走一遍；glob 只看当前这一层。\n逐步演示：downloads 下有 txt 文件夹，备忘.txt 在里面，p.glob("*.txt") 找不到它，p.rglob("*.txt") 能找到。\n易错提醒：iterdir 只是列出所有直接子项，不做模式匹配；exists 只回答「在不在」，不找文件。',
      },
      {
        id: 's8-11-q2',
        qtype: 'boolean',
        stem: '批量重命名脚本写好之后，应该先在原文件夹上直接跑一次看看效果。',
        answer: '错',
        explanation:
          '答案：错。\n思路：批量操作不可逆，一次错误的重命名可能让几百个文件失去原名，很难还原。\n逐步演示：正确顺序是复制一份文件夹，在副本上跑，肉眼验收结果，确认无误后再对原件执行；更保险的做法是第一版脚本只 print 计划，不真的 rename。\n易错提醒：rename 不是「复制再改」，它直接把旧名字换掉，没有回收站可以恢复。',
      },
      {
        id: 's8-11-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请写出 print 的那一行结果。',
        code: `from pathlib import Path
p = Path("a/b.txt")
print(p.suffix, p.parent.name)`,
        keywords: [['.txt a', '.txt  a']],
        explanation:
          '答案：.txt a。\n思路：suffix 是后缀（带点），parent 是上一级目录，parent.name 就是那一级的名字。\n逐步演示：Path("a/b.txt") 的 name 是 b.txt，stem 是 b，suffix 是 .txt；parent 是 Path("a")，它的 name 是 a。print 用逗号分隔，中间自动一个空格。\n易错提醒：suffix 带点，写测试用例时别漏；parent 是路径对象，要 .name 才能拿到字符串。',
      },
      {
        id: 's8-11-q4',
        qtype: 'blank',
        stem: '要创建文件夹并让它在已存在时不报错，应写 p.mkdir(exist_ok=______)。请填这个布尔值。',
        answer: 'True',
        accepted: ['True', 'true', 'TRUE', '真'],
        explanation:
          '答案：True。\n思路：exist_ok=True 表示「已经有了就算了，别抛异常」，这是让脚本可重复执行的关键。\n逐步演示：第一次运行 p.mkdir(exist_ok=True) 创建目录；第二次运行目录已存在，但因为 exist_ok 为 True，不会抛 FileExistsError，后面的代码继续执行。\n易错提醒：默认值是 False，不写参数第二次运行就会中断；注意 True 首字母大写，小写的 true 在 Python 里是未定义变量。',
      },
      {
        id: 's8-11-q5',
        qtype: 'program',
        stem: '给定路径对象 p = Path("data/report_2026.csv")，请分别打印它的后缀和去掉后缀的文件名，中间用一个空格分隔。只输出一行。',
        answer: '',
        testCases: [{ stdin: '', expected: '.csv report_2026' }],
        explanation:
          '答案：\n代码如下：\n\nfrom pathlib import Path\n\np = Path("data/report_2026.csv")\nprint(p.suffix, p.stem)\n\n思路：suffix 取后缀（含点），stem 取不含后缀的文件名部分。\n逐步演示：p.name 是 report_2026.csv；suffix 是 .csv；stem 把后缀去掉，得到 report_2026；print 用逗号分隔自动补空格。\n易错提醒：stem 只去掉最后一段后缀，a.tar.gz 的 stem 是 a.tar；想要完整名字用 name，别混用。',
      },
    ],
    minutes: 20,
    env: 'local',
  },
  {
    id: 's8-12',
    stageId: 8,
    order: 12,
    title: 'Office 自动化与代码规范',
    subtitle: '让程序操作 Excel，也让别人看得懂你的代码',
    hook: '每周都要把 20 个 Excel 表加一行汇总，你打算复制粘贴到什么时候？',
    objectives: [
      '能用 openpyxl 读取单元格、遍历行、写入并保存',
      '能写脚本给多个 Excel 批量追加汇总行',
      '能说出 pypdf 和 Pillow 各自的用途',
      '能按命名、职责、注释、目录结构四条标准整理自己的项目',
    ],
    analogy:
      '代码规范像厨房的收纳规则：刀放刀架、调料按使用频率排。不是为了好看，而是为了三个月后你还能在十秒内找到那瓶盐。',
    terms: [
      { term: 'openpyxl', plain: '读写 .xlsx 文件的第三方库，能操作单元格和公式。' },
      { term: '工作表', plain: 'Excel 底部一个个标签页，一个文件可以有多个。' },
      { term: '单一职责', plain: '一个函数只干一件事，名字能一句话说清。' },
      { term: 'Pillow', plain: '处理图片的库，能裁剪、缩放、加水印、转格式。' },
      { term: 'pypdf', plain: '处理 PDF 的库，能合并、拆分、提取文字。' },
    ],
    content: `## 一、为什么需要它（知识背景）

这一课在 Windows + VS Code 本地环境完成。openpyxl、pypdf、Pillow 都是第三方库，必须真实安装；而且它们操作的是磁盘上的 .xlsx、.pdf、.jpg 文件，浏览器实验室读不到这些文件。

安装命令（国内镜像，逐个执行）：

pip install openpyxl -i https://pypi.tuna.tsinghua.edu.cn/simple

pip install pypdf -i https://pypi.tuna.tsinghua.edu.cn/simple

pip install Pillow -i https://pypi.tuna.tsinghua.edu.cn/simple

装完用 pip list 找到这三个包，确认版本号存在。

办公场景里的重复劳动最适合交给程序：每周给 20 个表加汇总行、把 100 张图统一缩放到 800 像素、把多个 PDF 合并成一份。这些事人工做要一下午，脚本只要几秒，而且不会出错。

后半段讲代码规范，因为它决定了你三个月后还能不能维护这些脚本。

## 二、概念解释

**openpyxl** 把 Excel 文件读成一个工作簿对象。一个工作簿里有多个工作表，一个工作表是一张网格，用 ws["A1"] 或者 ws.cell(row=1, column=1) 定位单元格。

读的时候用 load_workbook(路径)，写的时候改完要 save(路径)，不 save 等于白改。

**pypdf** 处理 PDF：合并、拆分、旋转、提取文字。**Pillow** 处理图片：缩放、裁剪、旋转、加水印、转格式。两者都是「读进来 → 改 → 存出去」的套路。

**代码规范**不是形式主义。命名清楚的函数让你不用读实现就知道它干什么；单一职责让你改一个功能时不需要理解整个文件；目录结构让新人（或者三个月后的你）三分钟就能找到入口。

## 三、语法与使用规则

openpyxl 常用操作：

| 写法 | 作用 |
| --- | --- |
| load_workbook("a.xlsx") | 打开工作簿 |
| wb.active 或 wb["Sheet1"] | 拿到工作表 |
| ws["A1"].value | 读单元格的值 |
| ws.max_row / ws.max_column | 已使用的最大行号、列号 |
| ws.iter_rows(min_row=2, values_only=True) | 逐行迭代，跳过表头 |
| ws.cell(row=r, column=c, value=v) | 写单元格 |
| ws.append([...]) | 在末尾追加一行 |
| wb.save("a.xlsx") | 保存，必须调用才会生效 |

代码规范四条：

**命名**：变量用名词（total_amount），函数用动词开头（calc_total），常量全大写（MAX_RETRY），不要用 a、b、tmp、data1。

**单一职责**：一个函数只做一件事。既要读文件又要算汇总又要写结果的函数，拆成三个。

**注释**：写「为什么」不写「是什么」。x = x + 1 不用解释，但「这里补 1 是因为表头占了一行」必须写。

**目录结构**：源码放 src，数据放 data，测试放 tests，入口文件放根目录，README 写清怎么装、怎么跑。

## 四、逐步演示（分步骤）

第一步：先只读不写。load_workbook 打开文件，print 出表名和 A1 的值，确认路径和结构都对。

第二步：用 iter_rows(values_only=True) 遍历所有行，跳过第一行表头，print 前 3 行看数据形状。

第三步：算出一个汇总值，用 ws.append 追加到末尾，save 到**一个新文件**，别覆盖原件。

第四步：打开新文件肉眼验收，确认汇总行在正确位置、数字格式没问题。

第五步：把逻辑抽成函数，加上 docstring 和类型提示，再写一个 README 说明用法。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| ModuleNotFoundError: openpyxl | 没装库 | pip install openpyxl |
| 改了数据但文件没变 | 忘了 wb.save() | 改完立刻 save 到新文件 |
| 读到的单元格是 None | 该格确实是空的，或行列号从 0 开始数 | Excel 行列都从 1 开始 |
| PermissionError | 文件正在 Excel 里打开 | 先关掉 Excel 再运行 |
| 日期读出来是一串数字 | Excel 内部把日期存成序列号 | 用 cell.number_format 判断或做转换 |

## 六、代码规范：让三个月后的你感谢现在的你

**命名**：calc_monthly_total 比 f2 好一万倍。名字里不要出现 data、info、temp 这种什么都没说的词。

**单一职责**：读 Excel 的函数不要顺便写数据库，算汇总的函数不要顺便发邮件。每个函数控制在 20 行以内，超过就该拆。

**注释**：解释「为什么这么做」，而不是「这行在干什么」。代码本身已经说明了后者。

**目录结构**：一个可维护的项目通常长这样——根目录放 README 和入口脚本，src 放业务代码，data 放输入数据，tests 放测试，requirements.txt 记录依赖。

**README 至少写四段**：这个项目干什么、怎么安装依赖、怎么运行、输入输出在哪。缺了这四段，别人（包括你）打开就是一脸茫然。

规范不是给别人看的，是给未来的自己省时间的。`,
    examples: [
      {
        title: '读取 Excel 并追加一行汇总',
        intro: '这段代码需要先安装 openpyxl，输出为示意：真实运行会生成一个新的 xlsx 文件，屏幕上只打印读取到的内容。',
        code: `from openpyxl import load_workbook

wb = load_workbook("sales.xlsx")
ws = wb.active
print("工作表", ws.title, "共", ws.max_row, "行")

total = 0
for row in ws.iter_rows(min_row=2, values_only=True):
    name, qty, price = row
    total += qty * price
    print(name, qty * price)

ws.append(["合计", None, total])
wb.save("sales_with_total.xlsx")
print("已保存，合计", total)`,
        expectedOutput: `工作表 Sheet 共 4 行
键盘 597
鼠标 890
显示器 2598
已保存，合计 4085`,
        lines: [
          { code: 'wb = load_workbook("sales.xlsx")', explain: '把整个工作簿读进内存，此时文件里的数据都已经可访问。' },
          { code: 'ws.iter_rows(min_row=2, values_only=True)', explain: '从第 2 行开始遍历，跳过表头；values_only 直接给值而不是单元格对象。' },
          { code: 'name, qty, price = row', explain: '按列顺序解包，列数不对会报 ValueError，正好能暴露表结构问题。' },
          { code: 'ws.append(["合计", None, total])', explain: '在最后一行后面追加一行，None 表示这一格留空。' },
          { code: 'wb.save("sales_with_total.xlsx")', explain: '存成新文件而不是覆盖原件，出问题还能回头对照。' },
        ],
        trace: [
          { step: '打开工作簿', state: 'ws 指向活动工作表，max_row 为 4（表头 + 3 行数据）' },
          { step: '第 1 行数据 键盘', state: 'qty=3、price=199，金额 597，total 变 597' },
          { step: '第 3 行数据 显示器', state: '金额 2598，total 累加到 4085' },
          { step: 'append 汇总行', state: '第 5 行写入「合计、空、4085」' },
          { step: 'save', state: '新文件 sales_with_total.xlsx 落盘，原文件不变' },
        ],
        tryIt: '把 save 的文件名改成和原文件一样，再运行一次，体会一下「覆盖原件」的风险。',
      },
      {
        title: '批量给多个 Excel 加汇总行（带异常处理）',
        intro: '这段代码需要先安装 openpyxl，输出为示意。真实场景里文件名和数字都不一样，这里只展示结构。',
        code: `from pathlib import Path
from openpyxl import load_workbook

src = Path("reports")
for path in sorted(src.glob("*.xlsx")):
    try:
        wb = load_workbook(path)
        ws = wb.active
        total = 0
        for row in ws.iter_rows(min_row=2, values_only=True):
            if row[1] is None:
                continue
            total += row[1]
        ws.append(["合计", total])
        wb.save(path)
        print(path.name, "合计", total)
    except Exception as e:
        print("跳过", path.name, type(e).__name__)`,
        expectedOutput: `1月.xlsx 合计 4085
2月.xlsx 合计 5210
跳过 3月.xlsx PermissionError`,
        lines: [
          { code: 'for path in sorted(src.glob("*.xlsx")):', explain: '遍历文件夹里所有 xlsx，排序保证每次处理顺序一致。' },
          { code: 'if row[1] is None: continue', explain: '空单元格读到的是 None，跳过它避免加法报错。' },
          { code: 'ws.append(["合计", total])', explain: '每处理完一个文件就追加一行汇总。' },
          { code: 'except Exception as e:', explain: '一个文件出错不影响其他文件，最后打印出错的文件名便于单独处理。' },
        ],
        trace: [
          { step: '遍历第 1 个文件', state: '累加得到 4085，追加汇总行并保存' },
          { step: '遍历第 2 个文件', state: '累加得到 5210，同样处理' },
          { step: '第 3 个文件被占用', state: '抛 PermissionError，被 except 接住，打印跳过' },
          { step: '循环结束', state: '前两个文件已加汇总，第三个保持原样，等着你关掉 Excel 再跑' },
        ],
        tryIt: '把 except 里的 type(e).__name__ 换成 str(e)，看看报错信息详细了多少。',
      },
    ],
    compare: [
      {
        conceptA: 'openpyxl',
        conceptB: 'pandas',
        diff: '前者操作单元格和格式，适合「改表格外观、加批注、合并单元格」；后者擅长整表统计，几行代码就能分组汇总。',
        example: 'ws["A1"] = "标题" 与 df.groupby("城市").sum()',
      },
      {
        conceptA: 'Pillow',
        conceptB: 'pypdf',
        diff: '前者处理位图（jpg、png），能做缩放裁剪加水印；后者处理 PDF，能做合并拆分提取文字。',
        example: 'Image.open("a.jpg").resize((800, 600)) 与 PdfReader("a.pdf")',
      },
    ],
    pitfalls: [
      '装库时网络超时，忘了加国内镜像。',
      '改完忘了 wb.save()，打开文件发现什么都没变。',
      '直接覆盖原文件，数据错了无法回头。',
      '函数写得又长又杂，叫 process_data，谁也不知道它处理了什么。',
      '项目没有 README，换台电脑就再也跑不起来。',
    ],
    keyPoints: [
      'openpyxl 读 Excel：load_workbook、iter_rows、cell、append、save。',
      '批量处理时每个文件单独 try-except，一个失败不影响其他。',
      '改完必须 save，尽量存成新文件保留原件。',
      'pypdf 管 PDF，Pillow 管图片，都是读改写三步。',
      '规范四条：好命名、单一职责、解释为什么的注释、清楚的目录结构。',
    ],
    sources: [
      { book: 'abs3', chapter: '第14章 处理 Excel 电子表格' },
      { book: 'abs3', chapter: '第17章 处理 PDF 和 Word 文档' },
      { book: 'abs3', chapter: '第21章 绘制图形和操作图像' },
      { book: 'abs3', chapter: '第12章 设计并部署命令行程序' },
    ],
    prerequisites: ['s8-11', 's7-02'],
    task: '做一个完整的迷你项目：src 放脚本、data 放一个 sales.xlsx、tests 放一个检查汇总值是否正确的脚本，根目录写 README 说明安装与运行方式，最后用 openpyxl 跑出带汇总行的新文件。',
    exercises: [
      {
        id: 's8-12-q1',
        qtype: 'single',
        stem: '用 openpyxl 修改了单元格之后，必须调用什么才能让改动写进文件？',
        options: ['A. wb.close()', 'B. wb.save(路径)', 'C. ws.append()', 'D. print(wb)'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：openpyxl 是在内存里操作工作簿对象，save 才是把内存里的结果序列化写回磁盘的那一刻。\n逐步演示：ws["A1"] = "新值" 只改了内存；必须 wb.save("a.xlsx") 之后，重新打开文件才能看到新值。close 只释放资源，不负责写盘。\n易错提醒：save 的路径写错会存到别的地方，或者直接覆盖你不想动的文件，建议存成新名字。',
      },
      {
        id: 's8-12-q2',
        qtype: 'boolean',
        stem: '一个函数既读 Excel、又算汇总、又发邮件，符合「单一职责」原则。',
        answer: '错',
        explanation:
          '答案：错。\n思路：单一职责要求一个函数只做一件事，这样改一处不会牵连其他功能。\n逐步演示：把三件事拆成 read_rows、calc_total、send_mail 三个函数，读 Excel 的格式变了只改第一个，邮件模板改了只改第三个，互不影响。\n易错提醒：拆得太碎也不对，判断标准是「能不能用一句话说清这个函数干什么」，超过一句就该拆。',
      },
      {
        id: 's8-12-q3',
        qtype: 'predict',
        stem: '下面这段代码会输出什么？请按 print 的真实格式写出两行结果。',
        code: `rows = [[1, 2], [3, 4]]
print([sum(r) for r in rows])`,
        keywords: [['[3, 7]', '[3,7]']],
        explanation:
          '答案：[3, 7]。\n思路：这是给 Excel 每行加汇总时最核心的一步——对二维列表的每一行求和。\n逐步演示：第一行 [1, 2]，sum 得 3；第二行 [3, 4]，sum 得 7；推导式把两个结果收进新列表。\n易错提醒：写成 sum(rows) 会报错，因为 sum 不能直接对列表的列表求和；必须逐行处理。',
      },
      {
        id: 's8-12-q4',
        qtype: 'blank',
        stem: '要按行遍历工作表并直接拿到单元格的值（而不是单元格对象），应写 ws.iter_rows(min_row=2, ______=True)。请填这个参数名。',
        answer: 'values_only',
        accepted: ['values_only', 'values only'],
        explanation:
          '答案：values_only。\n思路：这个参数让每行返回一个值的元组，省去再取 .value 的步骤，代码短且不易出错。\n逐步演示：不加时每行是 Cell 对象，要写 cell.value；加了之后直接 name, qty, price = row 解包即可。\n易错提醒：参数名是全小写加下划线，写成 valuesOnly 会报 unexpected keyword argument。',
      },
      {
        id: 's8-12-q5',
        qtype: 'program',
        stem: '给定二维列表 rows = [[1, 2, 3], [4, 5, 6]]，请为每一行计算总和并逐行打印（第一行打印第一行的和，第二行打印第二行的和）。只输出两行。',
        answer: '',
        testCases: [{ stdin: '', expected: '6\n15' }],
        explanation:
          '答案：\n代码如下：\n\nrows = [[1, 2, 3], [4, 5, 6]]\nfor r in rows:\n    print(sum(r))\n\n思路：遍历每一行，对该行调用 sum 得到合计，直接打印。\n逐步演示：第一轮 r = [1, 2, 3]，sum 得 6；第二轮 r = [4, 5, 6]，sum 得 15；两次 print 各占一行。\n易错提醒：写成 print(sum(rows)) 会直接报 TypeError；如果先算出列表再统一 print，会变成一行输出 [6, 15]，不符合题目要求。',
      },
    ],
    minutes: 20,
    env: 'local',
  },
]
