import type { Lesson } from '../../types'

/**
 * 第四阶段：条件判断与循环（8 课）
 * 示例均经 Python 3.13 实跑验证，expectedOutput 逐字一致；不使用 input()，交互用预设列表模拟。
 */
export const stage4Lessons: Lesson[] = [
  {
    id: 's4-01',
    stageId: 4,
    order: 1,
    title: 'if 条件判断',
    subtitle: '让程序学会看情况办事',
    hook: '同样的天气，天气 App 有时提醒你带伞，有时一句话都不说。它凭什么决定要不要开口？',
    objectives: [
      '说出 if 解决了什么问题',
      '写出带冒号和缩进的 if 语句',
      '判断条件不成立时哪几行被跳过',
    ],
    analogy: 'if 像小区闸机：刷卡成功才开；不管开不开，后面排队的人照样往前走。',
    terms: [
      { term: '条件', plain: '能算出 True 或 False 的表达式，比如 score >= 60。' },
      { term: '布尔值', plain: '只有 True（真）和 False（假）两种值。' },
      { term: '代码块', plain: '缩进相同的一组代码，被整体执行或跳过。' },
    ],
    content: `## 一、为什么需要它

在此之前，程序都是一条直线：每行都执行。但真实世界要看情况：体温超过 37.5 度才提醒，余额够才允许付款。

**if 就是让程序自己挑路走的能力。**

## 二、概念解释

if 就是「如果」：条件成立才执行下面那块代码，不成立就整块跳过。

条件不是口号，而是**能算出 True 或 False 的表达式**。score >= 60 先比较两边，得到 True 或 False，这两个值合称布尔值。

## 三、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| if 条件: | 冒号表示「下面属于我」 | if score >= 60: |
| 缩进 4 空格 | 属于 if 的代码往右缩进 | 空格后 print |
| 顶格代码 | 不属于 if，无论如何都执行 | print("结束") |

三条硬规则：if 行尾必须是英文冒号；下一行必须缩进，否则报 IndentationError；判断相等用两个等号 ==。

## 四、逐步演示

第一步，把体温存进 temperature。第二步，写 if temperature >= 37.5:。第三步，换行缩进 4 格写 print。

第四步，顶格写 print("检查结束")。第五步，运行看到两行；把 38.2 改成 36.5，缩进那行消失，只剩顶格那行。


## 五、深入一层：条件其实是一个「值」

很多人以为 if 后面跟着的是「一句话」，其实它要的是一个**值**。Python 只关心这个值是真还是假，然后把对应的分支打开或关上。

| 写法 | 条件成立吗 | 说明 |
| --- | --- | --- |
| if True: | 成立 | 布尔值本身就能当条件 |
| if 5 > 3: | 成立 | 比较运算的结果是 True |
| if 0: | 不成立 | 数字 0 算假 |
| if 7: | 成立 | 非零数字都算真 |
| if '好的': | 成立 | 非空字符串算真 |
| if '': | 不成立 | 空字符串算假 |
| if []: | 不成立 | 空列表算假 |
| if None: | 不成立 | None 算假 |

规律一句话：**0、空字符串、空列表、空字典、None 都算假，其余都算真。**

于是有两种看起来很像、实际完全不同的判断：

score = 0
if score:
    print('有分数')
if score == 0:
    print('零分')

第一段什么都不打印，因为 0 是假；第二段打印「零分」，因为条件成立。**想判断「有没有值」就用 if 变量:，想判断「是不是等于某个数」必须写清楚比较。** 混用这两种写法，是新手写出「明明输入了 0 却提示没输入」的根源。

再补一条：Python 支持连续比较，score >= 0 and score <= 100 可以直接写成 0 <= score <= 100，读起来和数学一模一样。两种写法都对，后者更短也更不容易漏掉等号。

再看一个真实点的场景，把「条件」用在输入上：

age = 20
if age >= 18:
    print('可以注册')

条件成立时执行缩进块，不成立时整块跳过，程序继续往下走。注意 if 不会「返回结果」，它只决定要不要执行某段代码，这一点和后面要学的表达式不同。

判断条件写反是另一种常见故障。想表达「未成年不允许」，写成 if age >= 18: 打印「不允许」，逻辑就完全颠倒了。写完条件习惯性读一遍：「如果 年龄大于等于18，就提示不允许」——读着别扭，说明条件反了。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| SyntaxError: expected ':' | 漏冒号 | 补英文冒号 |
| IndentationError | 下一行没缩进 | 行首按 4 个空格 |
| 条件永远成立 | 把 == 写成 = | 比较用两个等号 |
| invalid character | 用了中文冒号 | 换成英文半角 |`,
    examples: [
      {
        title: '第一段会看情况的代码',
        intro: '只改一个数字，输出行数就变了。注意缩进行和顶格行的区别。',
        code: `temperature = 38.2
if temperature >= 37.5:
    print("体温偏高，注意休息")
print("检查结束")`,
        expectedOutput: `体温偏高，注意休息
检查结束`,
        lines: [
          { code: 'if temperature >= 37.5:', explain: '38.2 >= 37.5 得 True；冒号表示下面属于这个 if。' },
          { code: '    print("体温偏高，注意休息")', explain: '缩进 4 格，条件为真才执行。' },
          { code: 'print("检查结束")', explain: '顶格，不在 if 里，真假都执行。' },
        ],
        trace: [
          { step: '第 1-2 行', state: 'temperature = 38.2，比较得 True' },
          { step: '第 3 行', state: '输出「体温偏高，注意休息」' },
          { step: '第 4 行', state: '输出「检查结束」' },
        ],
        tryIt: '把 38.2 改成 36.5，数一数输出少了几行，想清楚为什么。',
      },
    ],
    compare: [
      {
        conceptA: 'if 后面的条件',
        conceptB: 'if 下面缩进的代码',
        diff: '条件只负责算真假；缩进的代码是动作，条件为真才轮到它。',
        example: 'if score >= 60: 是提问；print("及格") 是条件成立后才做的事。',
      },
    ],
    visual: {
      kind: 'flow',
      title: '一次 if 判断走了哪条路',
      description: '条件先算出布尔值，再由它决定是否进入缩进块，最后两路汇合到顶格代码。',
      steps: [
        { label: '准备数据', detail: 'score 里放着 72', state: [{ name: 'score', value: '72' }] },
        { label: '计算条件', detail: 'score >= 60 算出 True', state: [{ name: '条件结果', value: 'True' }] },
        { label: '条件为真', detail: '进入缩进块执行 print', state: [{ name: '执行', value: '打印「及格」' }] },
        { label: '条件为假', detail: '整块跳过', state: [{ name: '执行', value: '跳过缩进块' }] },
        { label: '继续往下', detail: '顶格代码两路都执行', state: [{ name: '执行', value: '打印「结束」' }] },
      ],
    },
    pitfalls: [
      'if 行尾漏写冒号，报错箭头却指向下一行，容易看错位置。',
      '用了中文冒号或中文括号，肉眼看不出，程序直接拒绝运行。',
      '以为条件不成立程序就停了——它只跳过缩进块，后面照常执行。',
    ],
    keyPoints: [
      'if：条件成立才执行缩进块，不成立整块跳过。',
      '条件必须能算出 True 或 False，比较运算最常用。',
      '顶格代码不受 if 控制，无论真假都会执行。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第5章 if 语句' },
      { book: 'abs3', chapter: '第2章 if-else 和流程控制' },
    ],
    prerequisites: ['s2-07', 's2-08'],
    task: '体温超过 37.3 就输出提醒，最后无论多少度都输出「记录已保存」。改三次数值观察输出。',
    exercises: [
      {
        id: 's4-01-q1',
        qtype: 'single',
        stem: 'if 后面的条件，最终必须算出一个什么样的结果？',
        options: ['A. 一段文字', 'B. True 或 False', 'C. 任意数字', 'D. 空值'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：if 只认「真」和「假」两种结论。\n逐步演示：score >= 60 先算出布尔值，再据此决定是否进入缩进块。\n易错提醒：非空文字也会被当成 True，但初学阶段用比较表达式最清楚。',
        difficulty: 1,
      },
      {
        id: 's4-01-q2',
        qtype: 'boolean',
        stem: '条件不成立时，if 的缩进块被跳过，但 if 之外顶格的代码仍会执行。',
        answer: '对',
        explanation:
          '答案：对。\n思路：if 只控制缩进块。\n逐步演示：条件为 False 时跳过缩进块，接着执行顶格的 print。\n易错提醒：条件不成立不等于程序结束，只是少走一段路。',
        difficulty: 1,
      },
      {
        id: 's4-01-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出哪几行？请按顺序写出。',
        code: 'score = 72\nif score >= 60:\n    print("及格")\n    print("继续加油")\nprint("结束")',
        keywords: [['及格'], ['继续加油'], ['结束']],
        explanation:
          '答案：依次输出「及格」「继续加油」「结束」。\n思路：72 >= 60 为真，缩进两行都执行，顶格那行也执行。\n逐步演示：进入 if 块打印两行，退出后打印「结束」。\n易错提醒：缩进块里两行都归 if 管，不是只有第一行。',
        difficulty: 2,
      },
      {
        id: 's4-01-q4',
        qtype: 'blank',
        stem: 'if 那一行的末尾必须写一个符号，告诉 Python「下面这块属于我」，这个符号是 ______。',
        answer: '冒号',
        accepted: [':', '冒号', '英文冒号', '英文半角冒号'],
        explanation:
          '答案：冒号（英文半角 :）。\n思路：冒号加缩进是 Python 表示代码块的固定组合。\n逐步演示：if score >= 60: 后换行缩进，语法才完整。\n易错提醒：中文冒号会报 invalid character，屏幕上几乎看不出差别。',
        difficulty: 2,
      },
      {
        id: 's4-01-q5',
        qtype: 'program',
        stem: '已知 score = 58。低于 60 时输出「需要补考」，最后无论多少分都输出「成绩已登记」。\n\n共两行，顺序不能反。',
        answer: '',
        testCases: [{ stdin: '', expected: '需要补考\n成绩已登记' }],
        explanation:
          '答案（参考答案）：\nscore = 58\nif score < 60:\n    print("需要补考")\nprint("成绩已登记")\n\n思路：补考提示放进缩进块，登记提示必须顶格。\n逐步演示：58 < 60 为真，执行缩进 print，再执行顶格 print。\n易错提醒：最后一行也缩进，它就成了 if 的一部分，与要求不符。',
        difficulty: 3,
      },
    ],
    minutes: 15,
    env: 'browser',
  },
  {
    id: 's4-02',
    stageId: 4,
    order: 2,
    title: 'if-else 二选一',
    subtitle: '不是这样就一定是那样',
    hook: '体温正常时程序总得说点什么。可 if 只负责「条件成立」那一半，另一半交给谁？',
    objectives: [
      '写出 if-else 的完整结构',
      '说清 else 为什么不需要条件',
      '判断两段互斥代码中哪一段会执行',
    ],
    analogy: 'if-else 像红绿灯：绿灯走左边，红灯走右边，不可能两边都走，也不会两边都不走。',
    terms: [
      { term: 'else', plain: '「否则」，兜住所有条件不成立的情况。' },
      { term: '互斥', plain: '两件事不可能同时发生，只能发生一件。' },
      { term: '兜底', plain: '前面都没命中时，最后必须接住的那条路。' },
    ],
    content: `## 一、为什么需要它

上一课的 if 只描述「条件成立时做什么」，不成立时什么也不说。可体温正常也得说「正常」，没及格也得说「要补考」。

只用 if，你得再写一个条件完全相反的第二段，写漏一种情况就会出现「两条都不执行」的空档。**else 就是兜底的那条路，不用写条件。**

## 二、概念解释

if-else：条件成立走 if 块，不成立走 else 块。两条路**互斥且必选其一**，不会同时执行，也不会都不执行。

关键点：else 后面不写条件，只写冒号，因为它接的是「剩下所有情况」。写成 else score < 60: 是语法错误。

## 三、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| if 条件: | 第一选择 | if score >= 60: |
| 缩进块 A | 条件成立时执行 | print("通过") |
| else: | 否则，只跟冒号 | else: |
| 缩进块 B | 条件不成立时执行 | print("补考") |

三条规则：else 必须与 if 左对齐；else 后面写任何条件都报 SyntaxError；else 不能单独存在。

## 四、逐步演示

第一步，写 if 分支：体温偏高的提醒。第二步，顶格写 else:，与 if 左对齐。第三步，在 else 下缩进 4 格写体温正常的输出。

第四步，运行，只输出其中一行。第五步，把体温改成 38.2 再运行，输出换成另一行。第六步，故意写成 else temperature < 37.5:，看报错再改回来。


## 五、深入一层：else 不是「另一个条件」

三个高频坑，先看第一个：写成 else 条件: 是语法错误，else 后面直接跟冒号，不能带条件。要带条件就改用 elif。

第二个坑更隐蔽：拿 else 兜住本该单独处理的异常情况。密码校验写成「如果密码正确就进入，否则提示密码错误」，看着没毛病；可如果用户对象压根没取到，else 也会说「密码错误」，排查时会被这句话带到沟里去。稳妥的写法是先判断数据是否存在，再判断密码对不对。

第三个坑：把互斥的两件事写成两个独立的 if。两个独立 if 在条件同时成立时会**都执行**，而 if-else 保证只走一条。判断「及格还是不及格」这种非此即彼的事，就该用 if-else。

对照表：

| 场景 | 该用 | 不该用 |
| --- | --- | --- |
| 非此即彼（及格/不及格） | if-else | 两个独立 if |
| 多档分区间 | if-elif-else | 一串独立 if |
| 只有一件事需要判断 | 单个 if | 硬凑一个 else: pass |

最后补一个省行数的写法，条件表达式（有些书叫三元运算）：

level = '发烧' if temperature >= 37.3 else '正常'

读法是先看中间那个条件：成立取前面的值，不成立取后面的值。体温 36.8 得到「正常」，38 得到「发烧」。它适合简单二选一；一旦要嵌套两层以上，就该老老实实改回 if-else，否则几个月后自己都读不懂。

最后补一句实战结论：二选一的场景里，if-else 的表达力比两个 if 强，因为它在代码结构上就告诉读代码的人「这两条路互斥」。读代码的人不用去验证条件是否重叠，看一眼结构就明白了。结构本身就是一种说明。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| SyntaxError: invalid syntax | else 后面写了条件 | 删掉条件只留 else: |
| IndentationError | else 与 if 没对齐 | 让两者左对齐 |
| else 里的代码不执行 | 前面没有配对的 if | else 必须紧跟 if 块 |
| 输出两行都有 | 写成了两个独立 if | 第二条改用 else |`,
    examples: [
      {
        title: '体温的两条路',
        intro: '同一段代码，只差一个数字，输出就换了一行。注意 else 与 if 左对齐。',
        code: `temperature = 36.5
if temperature >= 37.5:
    print("体温偏高")
else:
    print("体温正常")
print("--- 检查结束 ---")`,
        expectedOutput: `体温正常
--- 检查结束 ---`,
        lines: [
          { code: 'if temperature >= 37.5:', explain: '36.5 >= 37.5 得 False，if 分支不执行。' },
          { code: 'else:', explain: '与 if 左对齐，只跟冒号，兜住不成立的情况。' },
          { code: 'print("--- 检查结束 ---")', explain: '顶格，两条路走完都会执行。' },
        ],
        trace: [
          { step: '第 1-2 行', state: 'temperature = 36.5，条件得 False' },
          { step: '第 5-6 行', state: '进入 else，输出「体温正常」' },
          { step: '第 7 行', state: '输出分隔行，程序结束' },
        ],
        tryIt: '把 36.5 改成 38.2，先预测哪行消失、哪行出现，再运行。',
      },
    ],
    compare: [
      {
        conceptA: '两个独立的 if',
        conceptB: 'if-else',
        diff: '两个 if 可能都执行、也可能都不执行；if-else 一定只执行其中一个。',
        example: '用两个 if 判断体温，条件没接上就会一句话都不说。',
      },
    ],
    pitfalls: [
      'else 后面加条件（else score < 60:），直接报语法错误。',
      'else 缩进了一格，与 if 没对齐，运行时报 IndentationError。',
      '把该用 else 的地方写成第二个 if，两条路都执行的 bug 就此埋下。',
    ],
    keyPoints: [
      'if-else 是二选一：互斥、必选其一、只执行一个分支。',
      'else 不带条件，只带冒号，兜的是其他所有情况。',
      'else 必须与对应的 if 左对齐。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第5章 if 语句' },
      { book: 'abs3', chapter: '第2章 if-else 和流程控制' },
    ],
    prerequisites: ['s4-01'],
    task: '年龄大于等于 18 输出「可以观看」，否则输出「需要家长陪同」，最后输出「检票完成」。',
    exercises: [
      {
        id: 's4-02-q1',
        qtype: 'single',
        stem: '关于 if-else，下面哪种说法正确？',
        options: ['A. 两个分支可能同时执行', 'B. 两个分支可能都不执行', 'C. 一定执行且只执行其中一个', 'D. else 永远优先执行'],
        answer: 'C',
        explanation:
          '答案：C。\n思路：条件只有真和假两种结果，各对应一个分支。\n逐步演示：True 走 if 块，False 走 else 块，没有第三种情况。\n易错提醒：只有两个独立 if 才可能都不执行或都执行。',
        difficulty: 1,
      },
      {
        id: 's4-02-q2',
        qtype: 'boolean',
        stem: 'else 后面也可以写条件，用来做更细致的判断。',
        answer: '错',
        explanation:
          '答案：错。\n思路：else 的含义是「以上都不成立」，不允许再判断。\n逐步演示：写 else score < 60: 会直接报 SyntaxError；要判断应该用 elif。\n易错提醒：else 后面只跟一个英文冒号。',
        difficulty: 1,
      },
      {
        id: 's4-02-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？',
        code: 'n = 4\nif n % 2 == 0:\n    print("偶数")\nelse:\n    print("奇数")',
        keywords: [['偶数']],
        explanation:
          '答案：输出「偶数」。\n思路：4 除以 2 余 0，条件成立。\n逐步演示：0 == 0 为 True，进入 if 块打印，else 块被跳过。\n易错提醒：else 写在后面不代表它也会执行。',
        difficulty: 2,
      },
      {
        id: 's4-02-q4',
        qtype: 'blank',
        stem: '在 if-else 结构中，用来兜住「条件不成立」那种情况的关键字是 ______。',
        answer: 'else',
        accepted: ['else', 'ELSE', '否则'],
        explanation:
          '答案：else。\n思路：if 管成立，else 管不成立。\n逐步演示：写完 if 的缩进块后，顶格写 else: 再缩进写另一条路。\n易错提醒：else 全小写且不能独立使用。',
        difficulty: 2,
      },
      {
        id: 's4-02-q5',
        qtype: 'program',
        stem: '已知 number = 7。用 if-else 判断奇偶，输出一行：7 是奇数',
        answer: '',
        testCases: [{ stdin: '', expected: '7 是奇数' }],
        explanation:
          '答案（参考答案）：\nnumber = 7\nif number % 2 == 0:\n    print(number, "是偶数")\nelse:\n    print(number, "是奇数")\n\n思路：用求余判断奇偶，余 0 是偶数，否则是奇数。\n逐步演示：7 % 2 得 1，条件 False，进入 else 输出。\n易错提醒：用加号拼数字和文字会报 TypeError，逗号分隔才对。',
        difficulty: 3,
      },
    ],
    minutes: 14,
    env: 'browser',
  },
  {
    id: 's4-03',
    stageId: 4,
    order: 3,
    title: 'if-elif-else 多条件判断',
    subtitle: '分段判断，顺序决定结果',
    hook: '成绩分 A、B、C、D 四档，if-else 只能分及格和不及格。要分四类，难道写四层嵌套？',
    objectives: [
      '写出三段以上的 if-elif-else 结构',
      '说清为什么只执行第一个成立的分支',
      '判断 elif 顺序写反后会输出什么',
    ],
    analogy: 'elif 像机场安检通道：先查头等舱，再查商务舱。一旦被放行，就不会再去后面排队。',
    terms: [
      { term: 'elif', plain: 'else if 的缩写，意思是「否则，如果……」。' },
      { term: '分支链', plain: 'if、elif、else 串成的一条链，从上往下试。' },
      { term: '命中', plain: '某个条件算出 True，程序进入它的缩进块。' },
    ],
    content: `## 一、为什么需要它

if-else 只能把世界分成两半。但现实常常要分好几档：成绩 A、B、C、D；会员普通、白银、黄金；快递待发货、运输中、已签收。

用 if-else 硬做，就得在 else 里再套一层，代码像楼梯一样往右拐。**elif 把楼梯拉直：一条链，从上往下挨个问。**

## 二、概念解释

if-elif-else 是一条判断链。程序从上往下逐个检查，**只要有一个成立，就执行它的缩进块，然后整条链结束**，后面的 elif 和 else 一律不再看。

不是每个条件都算一遍，而是排队问到谁点头，就只让谁办事。

## 三、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| if 条件1: | 第一个检查，通常最严 | if score >= 90: |
| elif 条件2: | 否则如果，可写多条 | elif score >= 80: |
| elif 条件3: | 继续往下排 | elif score >= 60: |
| else: | 全不成立时兜底，可省略 | else: |

规则：elif 后面必须带条件；所有分支关键字必须左对齐；顺序必须**先严后松**。

## 四、逐步演示

第一步，确定分档：90 以上 A，80 以上 B，60 以上 C，其余 D。第二步，从高到低写条件。第三步，每条分支只给等级变量赋值。

第四步，在链之外顶格写 print。第五步，运行 85 分看到 B。第六步，把第一个条件改成 score >= 60，95 分就输出「及格」——先命中，后面没机会看。


## 五、深入一层：顺序决定结果，边界值最会骗人

elif 是从上往下逐个检查的，**第一个成立的就进去，剩下的全部不看**。所以顺序一改，结果就变。

假设分档规则是：90 分以上优秀、75 分以上良好、60 分以上及格、其余不及格。现在拿 85 分来走一遍：

| 判断顺序 | 第 1 个条件 | 第 2 个条件 | 最终输出 |
| --- | --- | --- | --- |
| 先判 >= 90，再判 >= 75 | 85 >= 90 为假 | 85 >= 75 为真 | 良好 |
| 先判 >= 60，再判 >= 75 | 85 >= 60 为真 | 不再判断 | 及格 |

第二种顺序把 85 分判成「及格」，规则本身没错，是顺序错了。所以铁律是：**区间判断要么从严格到宽松，要么从大到小排，不能乱序。**

另外两条经验：

第一，最后一定跟一个 else 兜底。没有 else 时，如果所有条件都不成立，程序会安静地什么都不做，这种「哑口」在真实项目里极难排查。

第二，elif 和连续 if 的区别要分清。连续 if 是每个条件都独立判断，可能打印好几行；elif 保证只命中一个分支。做分档就一定要用 elif。

顺带说一句边界值：刚好等于 75 分算良好还是及格，取决于你写的是 > 还是 >=。写规则时把这几个临界值单独测一遍（74、75、76），比通读代码有用得多。

分数分档这类需求，还可以换个写法：先算出档位名字，再统一输出。这样输出格式只写一次，加档位时只改判断部分。代码写法不是只有一种，但「判断和输出分开」这条原则，在任何一个版本里都成立。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 高分被判成低档 | 宽条件写在了前面 | 调整成先严后松 |
| 同时输出两档 | 用了两个独立 if | 第二条改成 elif |
| SyntaxError | elif 后面漏条件或冒号 | 补条件和英文冒号 |
| 最后分支进不去 | else 被缩进了 | 让 else 与 if 左对齐 |`,
    examples: [
      {
        title: '成绩分四档',
        intro: '85 分同时满足三个条件，却只输出 B——因为链在第二个条件处就结束了。',
        code: `score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "D"
print("成绩", score, "等级", grade)`,
        expectedOutput: `成绩 85 等级 B`,
        lines: [
          { code: 'if score >= 90:', explain: '85 >= 90 为 False，继续往下问。' },
          { code: 'elif score >= 80:', explain: '85 >= 80 为 True，命中。' },
          { code: 'elif score >= 60:', explain: '虽然也满足，但链已结束，不执行。' },
          { code: 'print("成绩", score, "等级", grade)', explain: '在链之外，输出最终结果。' },
        ],
        trace: [
          { step: '第 1-2 行', state: 'score = 85，90 条件 False' },
          { step: '第 4 行', state: '80 条件 True，命中' },
          { step: '第 10 行', state: 'grade = "B"，输出结果' },
        ],
        tryIt: '把 85 改成 95、75、60、59 各跑一次，先写等级再核对。',
      },
    ],
    compare: [
      {
        conceptA: 'elif 链',
        conceptB: '多个独立 if',
        diff: 'elif 命中一个就收工；多个 if 每个都单独判断，可能全部命中。',
        example: '分等级用 elif；同时检查为空、超长、敏感词用多个 if。',
      },
    ],
    pitfalls: [
      '把宽条件写在前面，高分被低档截走，这是 elif 最隐蔽的错。',
      '该用 elif 的地方写了 if，同时输出两档结论。',
      'else 写在了 elif 前面，语法直接不通过。',
    ],
    keyPoints: [
      'elif 链从上往下问，命中第一个成立的分支后立即结束。',
      '顺序必须先严后松，否则宽条件会抢走本该属于严条件的情况。',
      '互斥分档用 elif，逐项检查用多个 if。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第5章 if 语句' },
      { book: 'abs3', chapter: '第2章 if-else 和流程控制' },
    ],
    prerequisites: ['s4-02'],
    task: '已签收输出「交易完成」，运输中输出「请耐心等待」，待发货输出「仓库处理中」，其他输出「请联系客服」。',
    exercises: [
      {
        id: 's4-03-q1',
        qtype: 'single',
        stem: 'if-elif-else 链中如果有两个条件同时成立，会发生什么？',
        options: ['A. 两个分支都执行', 'B. 只执行第一个成立的分支', 'C. 只执行最后一个', 'D. 程序报错'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：elif 链是排队制，谁先点头就只让谁办事。\n逐步演示：第一个 True 出现后执行它的缩进块，整条链立即结束。\n易错提醒：后面的条件即使也成立也不会执行。',
        difficulty: 1,
      },
      {
        id: 's4-03-q2',
        qtype: 'boolean',
        stem: '把宽松条件（score >= 60）写在严格条件（score >= 90）前面，程序仍能正确分出优秀档。',
        answer: '错',
        explanation:
          '答案：错。\n思路：宽条件会先命中，把高分一起收走。\n逐步演示：95 分先遇到 60 的条件，成立即结束。\n易错提醒：分档判断永远从最严的条件往最松的排。',
        difficulty: 1,
      },
      {
        id: 's4-03-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？',
        code: 'score = 75\nif score >= 90:\n    print("A")\nelif score >= 60:\n    print("C")\nelif score >= 80:\n    print("B")',
        keywords: [['C'], ['不会', '不输出', '跳过']],
        explanation:
          '答案：只输出 C。\n思路：75 先满足 60 的条件，链在此结束。\n逐步演示：90 条件 False；60 条件 True 命中；80 条件虽成立但轮不到。\n易错提醒：输出「不合常理」，正是顺序写错造成的。',
        difficulty: 2,
      },
      {
        id: 's4-03-q4',
        qtype: 'blank',
        stem: '在 if 之后继续写「否则如果」的分支，使用的关键字是 ______。',
        answer: 'elif',
        accepted: ['elif', 'else if', 'elseif'],
        explanation:
          '答案：elif。\n思路：它是 else if 的缩写，既带条件又表示前面都不成立。\n逐步演示：if 条件1: 之后接 elif 条件2:，可接多条。\n易错提醒：Python 没有 elseif 这个写法。',
        difficulty: 2,
      },
      {
        id: 's4-03-q5',
        qtype: 'program',
        stem: '已知 score = 76。输出一行「等级 X」：90 及以上 A，75 及以上 B，60 及以上 C，其余 D。\n\n（76 分应输出「等级 B」）',
        answer: '',
        testCases: [{ stdin: '', expected: '等级 B' }],
        explanation:
          '答案（参考答案）：\nscore = 76\nif score >= 90:\n    level = "A"\nelif score >= 75:\n    level = "B"\nelif score >= 60:\n    level = "C"\nelse:\n    level = "D"\nprint("等级", level)\n\n思路：四档判断用 if-elif-elif-else，条件从高到低。\n逐步演示：76 不满足 90，满足 75，命中 B。\n易错提醒：75 和 60 顺序写反，76 会被判成 C。',
        difficulty: 3,
      },
    ],
    minutes: 16,
    env: 'browser',
  },
  {
    id: 's4-04',
    stageId: 4,
    order: 4,
    title: 'for 循环',
    subtitle: '让同一件事自动重复',
    hook: '给全班 40 个人发通知，你要复制粘贴 40 次。有没有办法只写一次，让电脑替你重复？',
    objectives: [
      '说出循环解决的是哪类重复劳动',
      '用 for 遍历列表和字符串',
      '写出 range 的三种常见形式',
    ],
    analogy: 'for 循环像流水线传送带：一批零件依次经过，每经过一个机器就加工一次。',
    terms: [
      { term: '遍历', plain: '把一组数据从头到尾挨个取出来处理。' },
      { term: '循环变量', plain: '每一轮用来接住当前值的变量，比如 i。' },
      { term: '累加', plain: '用一个变量不断把新值加到自己身上，像往存钱罐投币。' },
    ],
    content: `## 一、为什么需要它

复制粘贴是编程里最该被消灭的动作。给 40 个人发通知、把 100 条记录逐条检查，共同点是：动作一样，只是对象在换。

靠复制，代码有 40 份，改一个字要改 40 处。**循环把动作写一次，把对象交给程序去换。**

## 二、概念解释

for 的意思是「对于其中的每一个」。写法是 for 变量 in 一组数据:，然后缩进写要重复的动作。

执行过程：取出第一个值放进变量，执行一遍缩进块；再取第二个，再执行一遍；直到取完。数据有几个，缩进块就执行几次。

## 三、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| for x in 列表: | 逐个取出列表元素 | for name in names: |
| for ch in 字符串: | 逐个取出字符 | for ch in "Python": |
| for i in range(n): | 0 到 n-1，共 n 次 | for i in range(3): |
| for i in range(a, b): | 从 a 到 b-1 | for i in range(1, 6): |
| for i in range(a, b, s): | 从 a 开始，每次加 s | for i in range(2, 11, 3): |

规则：for 行尾必须有英文冒号；循环体必须缩进；range 的右边界取不到。

## 四、逐步演示

第一步，把三个名字放进列表。第二步，写 for name in names:。第三步，缩进写 print，这行执行三次。

第四步，改写成累加：先设 total = 0，再在循环里写 total = total + i。第五步，循环内加 print 观察每轮变化。第六步，循环外加 print 输出最终结果。


## 五、深入一层：range 的右边界永远取不到

range 的规则叫「包头不包尾」：写出来的结束值本身不在范围里。

| 写法 | 得到的数字 | 个数 |
| --- | --- | --- |
| range(5) | 0 1 2 3 4 | 5 |
| range(1, 5) | 1 2 3 4 | 4 |
| range(1, 6) | 1 2 3 4 5 | 5 |
| range(0, 10, 2) | 0 2 4 6 8 | 5 |
| range(5, 0, -1) | 5 4 3 2 1 | 5 |

于是有个口诀很好用：要 1 到 100，就写 range(1, 101)；要打印 5 行，就写 range(5) 或 range(1, 6)。

再讲累加器最容易错的位置：

total = 0
for i in range(1, 5):
    total = total + i

total 必须写在 for 的外面。要是写进循环体里，每轮开头都清零，最后只剩最后一次加的值 4，而不是 10。跟着走一遍：第 1 轮 0+1=1，第 2 轮 1+2=3，第 3 轮 3+3=6，第 4 轮 6+4=10。四个数字加起来正好是 10。

遍历字符串是同一套机制：for ch in 'abc' 会依次拿到 'a'、'b'、'c'，每个都是长度为 1 的字符串，不是字符编码。想同时拿到位置和内容，用 for index, ch in enumerate('abc')。

把三种 range 放进同一个循环，对照着跑一遍：

for i in range(3):
    print('A', i)
for i in range(2, 5):
    print('B', i)

第一段输出 A 0、A 1、A 2，共三行；第二段输出 B 2、B 3、B 4，也是三行。两段行数一样，但起点不同，这就是「包头不包尾」的直接后果。

还有一个新手常问的点：循环变量在循环结束后还存在吗。答案是在的，它的值停在最后一个元素上。所以 for i in range(3) 跑完后打印 i 会得到 2，不是报错。知道这一点，就不会把「循环变量」当成只活在循环里的东西。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 只执行一次 | 循环体没缩进 | 要重复的行缩进 4 格 |
| 少跑一次 | range 右边界写错 | 要含 6 就写 7 |
| NameError | 循环变量名拼错 | 核对 for 后面和循环体 |
| 结果是文字拼接 | total 初始化成空字符串 | 求和初始值写 0 |

## 七、再补一个常见误用

还有个误用值得单独提一句：想在循环里改列表，一边遍历一边删。这样做会跳过元素，因为删除后后面的元素往前挪了一位，遍历器却已经往后走了一步。稳妥的写法是先挑出要删的放进新列表，或者倒着遍历。初学阶段记住一句就够：**遍历的时候别改正在遍历的那个列表。**
`,
    examples: [
      {
        title: '遍历列表与累加求和',
        intro: '前半段依次问候三个名字，后半段把 1 到 5 加起来。重点看 total 每轮怎么变。',
        code: `names = ["小林", "小周", "小陈"]
for name in names:
    print("你好，", name)

total = 0
for i in range(1, 6):
    total = total + i
    print("加上", i, "后 total =", total)
print("1 到 5 的总和是", total)`,
        expectedOutput: `你好， 小林
你好， 小周
你好， 小陈
加上 1 后 total = 1
加上 2 后 total = 3
加上 3 后 total = 6
加上 4 后 total = 10
加上 5 后 total = 15
1 到 5 的总和是 15`,
        lines: [
          { code: 'for name in names:', explain: '列表每项依次装进 name，共三轮。' },
          { code: 'total = 0', explain: '累加器必须先归零，否则会拿旧值继续加。' },
          { code: 'total = total + i', explain: '先算右边，再把结果存回 total。' },
          { code: 'print("1 到 5 的总和是", total)', explain: '顶格，循环结束后只执行一次。' },
        ],
        trace: [
          { step: '第 1-2 轮', state: 'total 依次变 1、3' },
          { step: '第 3-5 轮', state: 'total 依次变 6、10、15' },
          { step: '循环结束', state: '输出总和 15' },
        ],
        tryIt: '把 range(1, 6) 改成 range(1, 11)，先算出 1 到 10 的和，再运行。',
      },
    ],
    compare: [
      {
        conceptA: 'for 遍历列表',
        conceptB: 'for 配 range',
        diff: '前者直接拿现成数据，有几个元素转几圈；后者按数字范围转圈，适合固定次数。',
        example: '给名单里每个人发消息用前者；把一句话打印 10 遍用后者。',
      },
    ],
    visual: {
      kind: 'loop',
      title: 'for 循环每一轮在做什么',
      description: 'range(1, 6) 依次给出 1 到 5，每轮把当前值加进 total，结束后 total 停在 15。',
      steps: [
        { label: '循环前', detail: '累加器归零', state: [{ name: 'total', value: '0' }] },
        { label: '第 1 轮', detail: 'i 取 1，total 变成 0 + 1', state: [{ name: 'i', value: '1' }, { name: 'total', value: '1' }] },
        { label: '第 2 轮', detail: 'i 取 2，total 变成 1 + 2', state: [{ name: 'i', value: '2' }, { name: 'total', value: '3' }] },
        { label: '第 3 轮', detail: 'i 取 3，total 变成 3 + 3', state: [{ name: 'i', value: '3' }, { name: 'total', value: '6' }] },
        { label: '第 4-5 轮', detail: 'total 依次变 10、15', state: [{ name: 'i', value: '4-5' }, { name: 'total', value: '10-15' }] },
        { label: '循环结束', detail: '数据取完，跳出循环', state: [{ name: 'total', value: '15' }] },
      ],
    },
    pitfalls: [
      '循环体忘了缩进，只执行一次，看着像循环没生效。',
      '以为 range(1, 6) 含 6，实际最后一个是 5。',
      '累加前忘了把 total 设为 0，直接报 NameError。',
    ],
    keyPoints: [
      'for 遍历一组数据，数据有几个就执行几次。',
      'range(n) 从 0 到 n-1；range(a, b) 从 a 到 b-1；第三个参数是步长。',
      '累加模式：循环外归零，循环内累加，循环后输出。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第4章 操作列表' },
      { book: 'abs3', chapter: '第3章 循环' },
    ],
    prerequisites: ['s3-04'],
    task: '用 for 算出 1 到 100 中所有能被 3 整除的数的和，循环里每加一个就打印当前合计。',
    exercises: [
      {
        id: 's4-04-q1',
        qtype: 'single',
        stem: 'for i in range(1, 5): 这条语句会让循环体执行几次？',
        options: ['A. 3 次', 'B. 4 次', 'C. 5 次', 'D. 6 次'],
        answer: 'B',
        explanation:
          '答案：4 次。\n思路：range(1, 5) 生成 1、2、3、4，右边界取不到。\n逐步演示：i 依次取四个值，各执行一次；取到 5 时越界。\n易错提醒：步长为 1 时可用「大数减小数」算次数。',
        difficulty: 1,
      },
      {
        id: 's4-04-q2',
        qtype: 'boolean',
        stem: 'for 循环的循环体必须缩进，否则这段代码不属于循环，只会执行一次。',
        answer: '对',
        explanation:
          '答案：对。\n思路：Python 靠缩进判断归属。\n逐步演示：for 下面顶格的语句不属于循环，只在循环前后执行一次。\n易错提醒：漏缩进往往不报错，只是结果不对，更难发现。',
        difficulty: 1,
      },
      {
        id: 's4-04-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？',
        code: 'total = 0\nfor i in range(1, 4):\n    total = total + i\nprint(total)',
        keywords: [['6']],
        explanation:
          '答案：输出 6。\n思路：range(1, 4) 给 1、2、3，累加得 6。\n逐步演示：0+1=1，1+2=3，3+3=6，循环结束输出 6。\n易错提醒：print 是顶格的，只在循环结束后执行一次。 延伸一句：把 print 缩进进循环体，就会打印三个中间值 1、3、6，这也是排查累加错误最常用的手段。',
        difficulty: 2,
      },
      {
        id: 's4-04-q4',
        qtype: 'blank',
        stem: '想让循环变量依次取 1、2、3、4、5，应写成 for i in range(1, ____):',
        answer: '6',
        accepted: ['6', '六'],
        explanation:
          '答案：6。\n思路：range 右边界取不到，要含 5 就得写到 6。\n逐步演示：range(1, 6) 生成 1 到 5，正好五个数。\n易错提醒：写 5 只会得到 1 到 4，这是最常见的差一错误。',
        difficulty: 2,
      },
      {
        id: 's4-04-q5',
        qtype: 'program',
        stem: '用 for 计算 1 到 10 之间所有偶数的和，输出一行：偶数和 30\n\n（要求循环累加，不能把 30 直接写进 print）',
        answer: '',
        testCases: [{ stdin: '', expected: '偶数和 30' }],
        explanation:
          '答案（参考答案）：\ntotal = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        total = total + i\nprint("偶数和", total)\n\n思路：遍历 1 到 10，用求余筛偶数，再累加。\n逐步演示：2、4、6、8、10 依次加入，total 为 30。\n易错提醒：print 缩进进循环会输出十行。',
        difficulty: 3,
      },
    ],
    minutes: 16,
    env: 'browser',
  },
  {
    id: 's4-05',
    stageId: 4,
    order: 5,
    title: 'while 循环',
    subtitle: '只要条件成立，就一直做',
    hook: '跑步机上没有「跑 5 公里」按钮，只有开始和停止。它怎么知道你什么时候该停？',
    objectives: [
      '写出 while 循环的三要素',
      '说清死循环是怎么产生的',
      '在 for 和 while 之间做出选择',
    ],
    analogy: 'while 像洗衣机：只要桶里还有水，排水就继续；水排干了自动停下。',
    terms: [
      { term: 'while', plain: '「当……的时候」，条件为真就反复执行。' },
      { term: '死循环', plain: '条件永远成立，循环永远停不下来。' },
      { term: '循环三要素', plain: '初始值、判断条件、让条件变化的语句。' },
    ],
    content: `## 一、为什么需要它

for 适合「有多少个就做多少次」：列表有几个元素，它心里有数。但很多事事先不知道次数——存钱存到 100 块为止，可能 3 天也可能 4 天。

这类任务就是 while 的地盘。**它不看次数，只看条件。**

## 二、概念解释

while 的写法是 while 条件: 加缩进块。每一轮开始前先算一次条件，为真就执行循环体，执行完再回到条件处重新判断。

必须刻进脑子的事实：**循环体里一定要有让条件最终变成 False 的语句。** 否则条件永远为真，屏幕疯狂刷输出，只能强行关闭。

## 三、语法与使用规则

| 部分 | 写法 | 示例 |
| --- | --- | --- |
| 初始值 | 循环之前赋值 | count = 3 |
| 条件 | while 加条件加冒号 | while count > 0: |
| 循环体 | 缩进 4 格 | print(count) |
| 变化 | 循环体内修改条件变量 | count = count - 1 |

规则：条件变量必须在循环体里被修改；变化方向要和条件相反；循环体必须缩进。

## 四、逐步演示

第一步，设 count = 3。第二步，写 while count > 0:。第三步，缩进写 print(count)。

第四步，**紧接着**写 count = count - 1，漏了就是死循环。第五步，运行看到 3、2、1 后退出。第六步，故意注释掉变化语句，运行两秒立刻停，亲眼看看死循环。


## 五、深入一层：三要素少一个就出事

while 循环能正常结束，靠的是三样东西配合：

| 要素 | 写在哪里 | 少了会怎样 |
| --- | --- | --- |
| 初始状态 | while 之前 | 变量没定义，NameError |
| 判断条件 | while 后面 | 语法错误，程序根本跑不起来 |
| 状态更新 | 循环体里面 | 条件永远成立，变成死循环 |

死循环不一定是写错了，有时是忘了更新：n = 3 却没写 n = n - 1，条件 3 > 0 永远成立，屏幕上会疯狂滚动同一行。真遇到了按 Ctrl+C 中断（网页实验室里点「停止」）。

倒计时跟着走一遍：

n = 3
while n > 0:
    print(n)
    n = n - 1

第 1 轮 3 > 0 成立，打印 3，n 变 2；第 2 轮打印 2，n 变 1；第 3 轮打印 1，n 变 0；第 4 轮判断 0 > 0 不成立，退出。一共三行，不是四行。

那什么时候用 while、什么时候用 for：

| 情况 | 选哪个 | 例子 |
| --- | --- | --- |
| 次数已知 | for | 打印 1 到 100 |
| 遍历现成的一批数据 | for | 遍历名单 |
| 次数未知，靠条件停 | while | 一直问，直到输入合法 |
| 至少要执行一次 | while 加标记 | 菜单至少显示一轮 |

一个实用技巧：while True 加内部 break，比在 while 后面堆一个又长又绕的条件更好读，很多真实程序都这么写。

补充一个容易忽略的细节：while 的条件在每一轮开始前都会重新算一次，所以循环体里改的那个变量，必须真的影响到条件。如果条件用的是 n > 0，而循环体改的是 m，那条件永远不变，照样死循环。写完循环，指一下条件里的变量，再指一下循环体里改的变量，两个是同一个，循环才安全。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 屏幕疯狂刷屏 | 忘了改条件变量 | 循环体里加减它 |
| 一轮都不执行 | 初始值已不满足条件 | 检查初始值与条件方向 |
| 多执行一轮 | 边界用了大于等于 | 按边界逐个推演 |
| 程序卡住 | 变化语句写在循环外 | 缩进到循环体内 |`,
    examples: [
      {
        title: '倒计时：最小可用的 while',
        intro: '三行核心代码占齐了 while 的三要素。特别注意最后那行减法。',
        code: `count = 3
while count > 0:
    print("倒计时", count)
    count = count - 1
print("发射")`,
        expectedOutput: `倒计时 3
倒计时 2
倒计时 1
发射`,
        lines: [
          { code: 'while count > 0:', explain: '每轮开始前判断一次，为真才进循环体。' },
          { code: '    count = count - 1', explain: '关键的变化语句，让 count 最终不满足条件。' },
          { code: 'print("发射")', explain: '顶格，循环结束后执行一次。' },
        ],
        trace: [
          { step: '第 1-2 轮', state: '输出 3、2，count 减到 1' },
          { step: '第 3 轮', state: '输出 1，count 变 0' },
          { step: '再判断', state: '0 > 0 不成立，退出并输出「发射」' },
        ],
        tryIt: '删掉 count = count - 1 运行一次，看到刷屏立刻停止，体会死循环。',
      },
    ],
    compare: [
      {
        conceptA: 'for 循环',
        conceptB: 'while 循环',
        diff: 'for 面对现成数据，天然知道转几圈；while 面对条件，次数可能事先算不出来。',
        example: '遍历成绩列表用 for；反复加倍直到超过 1000 用 while。',
      },
    ],
    visual: {
      kind: 'loop',
      title: 'while 的条件怎么一步步变成假',
      description: '每轮先判断 money < 100，成立就存 30 元，直到第 4 轮后条件不再成立。',
      steps: [
        { label: '循环前', detail: '存款 0，0 < 100 成立', state: [{ name: 'money', value: '0' }, { name: 'day', value: '0' }] },
        { label: '第 1 轮', detail: '存 30，天数加 1', state: [{ name: 'money', value: '30' }, { name: 'day', value: '1' }] },
        { label: '第 2 轮', detail: '存到 60', state: [{ name: 'money', value: '60' }, { name: 'day', value: '2' }] },
        { label: '第 3 轮', detail: '存到 90，条件仍成立', state: [{ name: 'money', value: '90' }, { name: 'day', value: '3' }] },
        { label: '第 4 轮', detail: '存到 120', state: [{ name: 'money', value: '120' }, { name: 'day', value: '4' }] },
        { label: '退出循环', detail: '条件不成立，循环结束', state: [{ name: 'money', value: '120' }, { name: 'day', value: '4' }] },
      ],
    },
    pitfalls: [
      '循环体里忘了修改条件变量，程序陷入死循环。',
      '变化语句写在循环外面，条件永远不变，同样死循环。',
      '初始值一开始就不满足条件，循环体一次都不执行。',
    ],
    keyPoints: [
      'while 只看条件：成立就再来一轮，不成立就退出。',
      '三要素缺一不可，死循环的根源是条件没机会变假。',
      '数得清次数用 for，说不清次数用 while。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第7章 用户输入和 while 循环' },
      { book: 'abs3', chapter: '第3章 循环' },
    ],
    prerequisites: ['s4-01'],
    task: '每天存 25 元，存到 200 元为止，每天输出余额，最后输出一共几天。',
    exercises: [
      {
        id: 's4-05-q1',
        qtype: 'single',
        stem: 'while 循环在什么情况下会一直执行下去？',
        options: ['A. 循环体缩进不够', 'B. 条件变量在循环里从不改变', 'C. 循环体里用了 print', 'D. 初始值是 0'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：while 每轮都重新判断，条件不变假就出不来。\n逐步演示：循环体里没有语句修改条件变量，条件每轮结果都一样。\n易错提醒：初始值是否 0 不影响，关键是它有没有被改变。',
        difficulty: 1,
      },
      {
        id: 's4-05-q2',
        qtype: 'boolean',
        stem: 'while 循环的循环体有可能一次都不执行。',
        answer: '对',
        explanation:
          '答案：对。\n思路：while 是先判断后执行。\n逐步演示：count 初始为 0 时，count > 0 第一次就不成立，循环体跳过。\n易错提醒：写 while 时要检查初始值是否已让条件为假。',
        difficulty: 1,
      },
      {
        id: 's4-05-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？',
        code: 'n = 1\ntotal = 0\nwhile n <= 4:\n    total = total + n\n    n = n + 1\nprint(total)',
        keywords: [['10']],
        explanation:
          '答案：输出 10。\n思路：n 从 1 加到 4，累加得 10。\n逐步演示：1、3、6、10 逐轮累加，n 变 5 时退出。\n易错提醒：条件是小于等于，4 会被算进去；写成小于 4 结果是 6。',
        difficulty: 2,
      },
      {
        id: 's4-05-q4',
        qtype: 'blank',
        stem: '下面循环想打印 1 到 3，请补上让条件最终变假的那行（只填一行）：\n\ncount = 1\nwhile count <= 3:\n    print(count)\n    ____',
        code: 'count = 1\nwhile count <= 3:\n    print(count)',
        answer: 'count = count + 1',
        accepted: ['count = count + 1', 'count += 1', 'count=count+1'],
        explanation:
          '答案：count = count + 1（也可写 count += 1）。\n思路：没有这行，count 永远是 1。\n逐步演示：每轮加 1，count 变 4 时退出循环。\n易错提醒：这行必须缩进在循环体内，写外面等于没写。',
        difficulty: 2,
      },
      {
        id: 's4-05-q5',
        qtype: 'program',
        stem: '用 while 让 n 从 5 开始倒着输出，每行一个数字，依次是 5、4、3、2、1，最后输出一行「结束」。\n\n共 6 行。',
        answer: '',
        testCases: [{ stdin: '', expected: '5\n4\n3\n2\n1\n结束' }],
        explanation:
          '答案（参考答案）：\nn = 5\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint("结束")\n\n思路：初始值 5，条件大于 0，每轮减 1。\n逐步演示：输出 5 后变 4，直到输出 1 后变 0，退出并输出「结束」。\n易错提醒：漏掉减法会无限打印 5。',
        difficulty: 3,
      },
    ],
    minutes: 16,
    env: 'browser',
  },
  {
    id: 's4-06',
    stageId: 4,
    order: 6,
    title: 'break 与 continue',
    subtitle: '提前收工，还是跳过这一个',
    hook: '在 500 条评论里找第一条差评，找到就该停。可循环还傻乎乎地往下翻 499 条，怎么让它收手？',
    objectives: [
      '说清 break 和 continue 各自改变了什么',
      '用 break 实现「找到就停」',
      '用 continue 跳过不满足条件的那一轮',
    ],
    analogy: 'break 像排队时突然有事直接离场；continue 像发现这队不收硬币，退出来排到下一窗口。',
    terms: [
      { term: 'break', plain: '立刻终止整个循环，跳到循环后面的代码。' },
      { term: 'continue', plain: '结束当前这一轮，直接开始下一轮。' },
      { term: '跳过', plain: '只放弃这一轮剩下的代码，循环本身还在继续。' },
    ],
    content: `## 一、为什么需要它

for 和 while 都是「把该做的做完」，但真实任务常带两个额外要求：一是**找到就够了**，二是**这一个不用处理**。

找第一条差评，找到后继续翻就是浪费；统计成绩时跳过缺考的空值，也不该写一整套嵌套判断。**它们是给循环装的两个紧急出口。**

## 二、概念解释

break：一旦执行到它，**整个循环立即结束**，循环体剩下的代码不执行，后续轮次也不执行。

continue：一旦执行到它，**当前这一轮立即结束**，循环体剩下的代码不执行，但循环继续下一轮。

一句话区分：break 是「不干了」，continue 是「这个跳过，下一个」。

## 三、语法与使用规则

| 关键字 | 作用范围 | 执行后去哪 |
| --- | --- | --- |
| break | 整个循环 | 循环后面的第一行 |
| continue | 当前这一轮 | 下一轮的条件判断 |

规则：两者通常写在 if 里，靠条件触发；只能用在循环内部；触发后它们下面的同级代码本轮不会执行。

## 四、逐步演示

第一步，准备一串成绩。第二步，写 for 遍历，缩进写 if 判断是否及格。第三步，及格时先 print 再 break，观察输出停在哪。

第四步，改成 continue 版本：遇到奇数就跳过，只累加偶数。第五步，在 continue 下面加一条 print，运行后奇数那轮的 print 不会出现。


## 五、深入一层：break 只跳出它所在的那一层

这三个语句的作用范围差别很大，混用就会得到意料之外的结果：

| 语句 | 作用范围 | 之后执行什么 |
| --- | --- | --- |
| break | 最近的这一层循环 | 循环后面的语句 |
| continue | 当前这一轮 | 回到循环开头，判断下一轮 |
| return | 整个函数 | 函数剩下的代码都不执行 |

在两层嵌套里，break 只停掉内层，外层照常继续转。想一次跳出两层，常见做法是用一个标记变量，或者干脆把内层逻辑抽成一个函数，用 return 直接走人。

对着代码走两遍最清楚：

for i in range(1, 6):
    if i == 3:
        break
    print(i)

打印 1、2 就停了，3 本身也没打印，因为判断在打印之前。

把 break 换成 continue，同一个位置打印的是 1、2、4、5：3 那一轮被跳过，循环继续。

沿着这个差异记住一句话：**break 是提前收工，continue 是跳过这一个。** 还有一个细节，break 之后如果还写了代码，那些代码永远执行不到，属于死代码，编辑器通常会把它标灰。

再补一个常被忽略的用法：continue 特别适合「跳过脏数据」。遍历一批数字，遇到 None 或负数就 continue，剩下的都是干净的，主逻辑里就不用再写一堆判断。这种「先过滤再处理」的写法，比在每处判断里嵌套 if 清楚得多。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 循环没停 | break 写在 if 外面 | 把 break 放进 if 块 |
| 整段停了 | 该用 continue 却用了 break | 区分跳过和结束 |
| 输出少了一半 | continue 后面的代码被跳过 | 把必执行代码放前面 |
| while 里卡死 | continue 跳过了改条件那行 | 先更新条件变量 |

## 七、一个组合用法

最后给一个实战组合：while True 负责「一直问」，break 负责「问对了就走」，两者配合是输入校验的标准写法，比在 while 后面堆一长串条件清楚得多。
`,
    examples: [
      {
        title: 'break：找到第一个及格成绩就收手',
        intro: '列表后面还有 70 和 48，但程序在 62 处就停了。数一数输出确认。',
        code: `scores = [55, 58, 62, 70, 48]
for s in scores:
    if s >= 60:
        print("找到第一个及格成绩：", s)
        break
    print("不及格，继续看下一个：", s)
print("查找结束")`,
        expectedOutput: `不及格，继续看下一个： 55
不及格，继续看下一个： 58
找到第一个及格成绩： 62
查找结束`,
        lines: [
          { code: 'if s >= 60:', explain: '62 第一次满足条件，进入 if 块。' },
          { code: 'break', explain: '整个循环立即结束，70 和 48 不会再被取到。' },
          { code: 'print("查找结束")', explain: '顶格，跳出的落点就是这里。' },
        ],
        trace: [
          { step: '第 1-2 轮', state: 's = 55、58，输出「不及格…」' },
          { step: '第 3 轮', state: 's = 62，输出找到并 break' },
          { step: '循环结束', state: '跳过 70、48，输出「查找结束」' },
        ],
        tryIt: '删掉 break 再运行，看输出多几行；把及格线改成 70，观察停在哪。',
      },
    ],
    compare: [
      {
        conceptA: 'break',
        conceptB: 'continue',
        diff: 'break 结束整个循环，后面的数据不再处理；continue 只结束当前这一轮。',
        example: '找第一条差评用 break；统计时跳过空值用 continue。',
      },
    ],
    pitfalls: [
      '以为 if 里的 break 只跳出 if——它跳出的是整个循环。',
      '该跳过却用了 break，后面的数据全部没处理。',
      'continue 写在了累加语句后面，等于没跳过，结果照旧。',
    ],
    keyPoints: [
      'break 立即结束整个循环，continue 只结束当前这一轮。',
      '两者一般写在 if 里，触发后下面的同级代码本轮不执行。',
      '选哪个看你要「不再找了」还是「这个不要，继续下一个」。',
    ],
    sources: [
      { book: 'abs3', chapter: '第3章 循环' },
      { book: 'pcc3', chapter: '第4章 操作列表' },
    ],
    prerequisites: ['s4-04', 's4-05'],
    task: '有成绩 [45, 52, 0, 68, 0, 90]，用 continue 跳过 0 分，统计有效人数和平均分。',
    exercises: [
      {
        id: 's4-06-q1',
        qtype: 'single',
        stem: '在循环里执行到 break 时，程序会怎样？',
        options: ['A. 只跳过当前这一轮', 'B. 结束整个循环，执行循环后面的代码', 'C. 重新开始循环', 'D. 报错退出程序'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：break 打断的是整个循环。\n逐步演示：执行到 break 后，本轮剩余代码和后续轮次全部放弃。\n易错提醒：只跳一轮的是 continue，记「break 全断，continue 单跳」。',
        difficulty: 1,
      },
      {
        id: 's4-06-q2',
        qtype: 'boolean',
        stem: 'continue 执行后，循环体里位于它下面的代码在当轮不会执行，但循环还会继续下一轮。',
        answer: '对',
        explanation:
          '答案：对。\n思路：continue 只结束当前这一轮。\n逐步演示：遇到 continue 后直接回去判断下一轮条件。\n易错提醒：若 continue 后面正好是改条件变量的语句，while 会死循环。',
        difficulty: 1,
      },
      {
        id: 's4-06-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出哪些数？请按顺序写出。',
        code: 'for i in range(1, 6):\n    if i == 3:\n        break\n    print(i)',
        keywords: [['1'], ['2'], ['不输出 3', '没有 3', '停']],
        explanation:
          '答案：只输出 1 和 2。\n思路：i 到 3 时 break，整个循环结束。\n逐步演示：1、2 打印，3 命中条件跳出，4 和 5 不会再取到。\n易错提醒：break 后面的 print 已经轮不到。',
        difficulty: 2,
      },
      {
        id: 's4-06-q4',
        qtype: 'blank',
        stem: '想让循环「跳过当前这一轮，继续下一轮」，应使用的关键字是 ______。',
        answer: 'continue',
        accepted: ['continue', 'CONTINUE', '继续'],
        explanation:
          '答案：continue。\n思路：continue 是「继续」，跳过本轮剩余代码直奔下一轮。\n逐步演示：写在 if 里，条件成立时触发。\n易错提醒：拼成 contiune 会报 NameError，Python 不会猜。',
        difficulty: 2,
      },
      {
        id: 's4-06-q5',
        qtype: 'program',
        stem: '已知 nums = [3, 8, 15, 22, 7, 30]。从头遍历，找到第一个大于 20 的数就停止，输出一行：找到 22\n\n（后面的 7 和 30 不应再处理）',
        answer: '',
        testCases: [{ stdin: '', expected: '找到 22' }],
        explanation:
          '答案（参考答案）：\nnums = [3, 8, 15, 22, 7, 30]\nfor n in nums:\n    if n > 20:\n        print("找到", n)\n        break\n\n思路：「找到就停」是 break 的标准场景。\n逐步演示：3、8、15 不满足；22 满足，打印后 break。\n易错提醒：print 必须在 break 前面，写后面永远执行不到。',
        difficulty: 3,
      },
    ],
    minutes: 14,
    env: 'browser',
  },
  {
    id: 's4-07',
    stageId: 4,
    order: 7,
    title: '嵌套循环',
    subtitle: '大圈套小圈，次数是乘积',
    hook: '打印九九乘法表有 81 个算式，写 81 行 print 显然不现实。两层循环却能十几行搞定。',
    objectives: [
      '说清嵌套循环里外层的执行关系',
      '算出两层循环总共执行多少次',
      '用嵌套循环打印金字塔',
    ],
    analogy: '嵌套循环像钟表：时针走一格，分针要转一整圈。外层是时针，内层是分针。',
    terms: [
      { term: '外层循环', plain: '控制「一共几行」或「几大轮」的那个循环。' },
      { term: '内层循环', plain: '每一大轮里都要完整跑一遍的那个循环。' },
      { term: '乘积关系', plain: '总执行次数等于两层次数的乘积。' },
    ],
    content: `## 一、为什么需要它

单层循环只能处理「一排」的事。但很多数据是「一片」的：表格有行有列，乘法表有 9 行 9 列，班级有若干小组、每组有若干人。

要处理二维结构，就得让循环里再套一个循环。**外层负责行，内层负责列；外层动一次，内层跑一整轮。**

## 二、概念解释

嵌套循环的执行关系只有一句话：**外层跑一次，内层跑一整轮。** 外层 3 次、内层 4 次，总执行次数是 3 × 4 = 12 次，不是 7 次。

内层还能用到外层的变量。打印金字塔时，第几行决定这行打几个星号，内层就必须读外层变量 i。

## 三、语法与使用规则

| 层级 | 写法 | 缩进 |
| --- | --- | --- |
| 外层 | for i in range(1, 4): | 顶格 |
| 内层 | for j in range(1, i + 1): | 4 格 |
| 内层循环体 | 真正干活的语句 | 8 格 |
| 外层循环体 | 换行用的 print | 4 格 |

规则：每多一层嵌套多缩进 4 格；内层在外层每一轮都完整跑一遍；内层可用外层变量，外层不能用内层变量。

## 四、逐步演示

第一步，写外层 for i in range(1, 5):，代表四行。第二步，在外层缩进里写内层 for j in range(1, i + 1):。

第三步，再缩进一层写真正干活的 print。第四步，内层结束后在外层缩进里写一个空 print() 负责换行。

第五步，运行，看到四行逐渐变长的星号。第六步，把内层范围改成固定次数，观察图形怎么变。


## 五、深入一层：次数算清楚，循环就不会写错

嵌套循环的总次数是内层次数乘以外层次数。外层跑 4 次、内层每次跑 3 次，循环体一共执行 12 次。

拿打印金字塔来核对：

for i in range(1, 5):
    for j in range(i):
        print('*', end='')
    print()

| 外层 i | 内层 range(i) 跑几次 | 这一行输出 |
| --- | --- | --- |
| 1 | 1 | * |
| 2 | 2 | ** |
| 3 | 3 | *** |
| 4 | 4 | **** |

星号总数 1+2+3+4=10，也就是循环体执行了 10 次。内层的次数跟着外层变化，这叫「内层依赖外层」，是金字塔、乘法表这类图形的共同特征。

三个书写习惯，能省很多调试时间：

第一，内外层变量名要分开。外层用 i 表示行，内层用 j 表示列；两个都叫 i，内层会把外层的值覆盖掉，逻辑立刻乱套。

第二，内层循环结束后想做「换行」这类收尾动作，把它放在内层循环之外、外层循环之内，缩进位置就是答案。

第三，先在小数据上验证。先跑 range(1, 3) 看两行对不对，确认结构没问题再放到 range(1, 10)。

最后说个排查技巧：嵌套循环出问题，先在外层循环开头打印一行分隔，比如 print('第', i, '行')。这样输出被切成一段一段，能立刻看出是第几行开始不对，比盯着几十行星号猜要快。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 内容全挤在一行 | 忘了在内层后换行 | 外层里加空 print |
| IndentationError | 内外层缩进相同 | 内层再往里缩 4 格 |
| 每行数量一样 | 内层范围没用外层变量 | 用 i 控制内层范围 |
| 程序跑很久 | 次数乘积太大 | 估算乘积，缩小数据量 |

## 七、变量名的建议

变量名上多花十秒，能省十分钟调试：外层用 row 表示第几行，内层用 col 表示第几列，比 i、j 更不容易搞混；打印图形时，把「这一行要几个」单独算成一个变量，循环里只负责重复，逻辑会清楚一大截。
`,
    examples: [
      {
        title: '打印四行金字塔',
        intro: '外层控制行号，空格数和星号数都用字符串乘法一次造出。',
        code: `rows = 4
for i in range(1, rows + 1):
    spaces = " " * (rows - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)`,
        expectedOutput: `   *
  ***
 *****
*******`,
        lines: [
          { code: 'for i in range(1, rows + 1):', explain: 'i 依次为 1 到 4，代表第几行。' },
          { code: 'spaces = " " * (rows - i)', explain: '第 1 行空 3 格，第 4 行空 0 格。' },
          { code: 'stars = "*" * (2 * i - 1)', explain: '星号数是 1、3、5、7，正好是 2i-1。' },
          { code: 'print(spaces + stars)', explain: '空格和星号拼成一个字符串输出。' },
        ],
        trace: [
          { step: 'i = 1', state: '空格 3 个，星号 1 个' },
          { step: 'i = 3', state: '空格 1 个，星号 5 个' },
          { step: 'i = 4', state: '空格 0 个，星号 7 个' },
        ],
        tryIt: '把 rows 改成 6，先算出第 6 行几个空格、几个星号，再运行。',
      },
    ],
    compare: [
      {
        conceptA: '两个并列的循环',
        conceptB: '嵌套循环',
        diff: '并列是先后各跑一遍，次数相加；嵌套是外层每动一次内层跑一整轮，次数相乘。',
        example: '打印 3 行标题再打印 3 行数据是并列；打印 3 行、每行 3 列是嵌套。',
      },
    ],
    pitfalls: [
      '内层循环写完后忘了换行，所有内容挤成一行。',
      '内外层缩进一样，实际变成两个并列循环，行为完全不同。',
      '内层范围写成固定值，每行长度都一样。',
    ],
    keyPoints: [
      '外层跑一次，内层跑一整轮，总次数是两层次数的乘积。',
      '内层可以读外层变量，这是打印图形的关键。',
      '缩进多一层就多 4 格，层次靠缩进区分。',
    ],
    sources: [
      { book: 'abs3', chapter: '第3章 循环' },
      { book: 'pcc3', chapter: '第4章 操作列表' },
    ],
    prerequisites: ['s4-04'],
    task: '用嵌套循环打印 5 行倒金字塔（第一行 5 个星号，每行少两个），再打印数字三角形。',
    exercises: [
      {
        id: 's4-07-q1',
        qtype: 'single',
        stem: '外层循环执行 3 次，内层循环每次执行 4 次，循环体一共执行多少次？',
        options: ['A. 3 次', 'B. 4 次', 'C. 7 次', 'D. 12 次'],
        answer: 'D',
        explanation:
          '答案：12 次。\n思路：外层每动一次，内层完整跑一轮。\n逐步演示：三次外层各带 4 次内层，3 × 4 = 12。\n易错提醒：不是相加得 7，嵌套次数永远是乘积。',
        difficulty: 1,
      },
      {
        id: 's4-07-q2',
        qtype: 'boolean',
        stem: '嵌套循环里，内层循环可以使用外层循环的变量。',
        answer: '对',
        explanation:
          '答案：对。\n思路：内层在外层循环体内部，外层变量对它可见。\n逐步演示：内层写 range(1, i + 1)，i 就是外层变量。\n易错提醒：反过来不成立，外层用内层变量会报 NameError。',
        difficulty: 1,
      },
      {
        id: 's4-07-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出几行？每行几个星号？',
        code: 'for i in range(1, 4):\n    print("*" * i)',
        keywords: [['三个星号', '***', '3 个'], ['两个星号', '**', '2 个'], ['一个星号', '*', '1 个']],
        explanation:
          '答案：3 行，依次 1 个、2 个、3 个星号。\n思路：字符串乘法把星号重复 i 次。\n逐步演示：i = 1 输出一个，i = 2 两个，i = 3 三个。\n易错提醒：range(1, 4) 不含 4，没有四个星号那行。',
        difficulty: 2,
      },
      {
        id: 's4-07-q4',
        qtype: 'blank',
        stem: '想让内层循环次数随外层变量 i 变化，内层写法是 for j in range(1, ____):（填含 i 的表达式）',
        answer: 'i + 1',
        accepted: ['i + 1', 'i+1', 'i +1', 'i+ 1'],
        explanation:
          '答案：i + 1。\n思路：range 右边界取不到，要取到 i 就得写 i + 1。\n逐步演示：i = 3 时 range(1, 4) 给 1、2、3。\n易错提醒：只写 i 会少一个，图形缺一角。 延伸一句：这种「差一」的错在循环里出现频率最高，写完先拿最小的 i 试一遍再放大。',
        difficulty: 2,
      },
      {
        id: 's4-07-q5',
        qtype: 'program',
        stem: '打印 3 行金字塔：第 1 行 2 空格加 1 星，第 2 行 1 空格加 3 星，第 3 行 0 空格加 5 星。\n\n共 3 行，行首空格必须保留。',
        answer: '',
        testCases: [{ stdin: '', expected: '  *\n ***\n*****' }],
        explanation:
          '答案（参考答案）：\nrows = 3\nfor i in range(1, rows + 1):\n    print(" " * (rows - i) + "*" * (2 * i - 1))\n\n思路：空格数递减，星号数递增，都用乘法生成。\n逐步演示：i = 1 时空 2 星 1；i = 3 时空 0 星 5。\n易错提醒：空格漏了会变成左对齐三角。',
        difficulty: 3,
      },
    ],
    minutes: 16,
    env: 'browser',
  },
  {
    id: 's4-08',
    stageId: 4,
    order: 8,
    title: '循环综合案例',
    subtitle: '把判断和循环拼成能干活的程序',
    hook: '成绩统计、猜数字、菜单选择，三个看似不同的程序，骨架其实是同一套：遍历、判断、累加、停止。',
    objectives: [
      '把需求拆成准备数据、循环处理、输出结果三步',
      '用循环加字典完成分组统计',
      '用循环模拟菜单的多次选择与退出',
    ],
    analogy: '判断和循环是两种积木：一种会分岔，一种会转圈。这一课练的是把它们拼成能站住的房子。',
    terms: [
      { term: '需求拆解', plain: '把一句话的任务拆成几条能照着做的步骤。' },
      { term: '分组统计', plain: '按某个标准把数据分堆，再数每堆有几个。' },
      { term: '预设序列', plain: '提前把「用户会输入什么」写成列表，模拟交互。' },
    ],
    content: `## 一、为什么单独拿一课做案例

语法学完不等于会写程序。真实任务是「一句话的需求」，没告诉你用 for 还是 while，也没告诉你边界在哪。**从需求到代码之间那段路，只能靠案例练出来。**

三个案例分别代表批量统计、目标搜索、循环交互，骨架都是：准备数据、循环处理、输出结果。

## 二、案例一：成绩等级统计

需求：给一组成绩，数出 A、B、C、D 各有多少人。

思路：准备成绩列表和记录人数的字典（初始全 0）；for 遍历；if-elif-else 判断档位；对应档位加 1；循环后统一输出。

关键点：计数器必须**在循环外初始化**。写在循环里，每轮都被清零，最后永远只剩 1。

## 三、案例二：猜数字

需求：程序心里有答案，猜的人一次次报数，直到猜中。

思路：准备答案 target 和猜测序列（浏览器不支持输入，用列表模拟）；for 遍历并带序号；相等就输出猜中并 break，小了提示小了，大了提示大了。

关键点：break 的位置。必须先输出结果再 break，否则「猜中」这句永远打印不出来。

## 四、案例三与共同套路

菜单需求：显示菜单，反复选择功能，选到退出为止。思路：准备菜单、余额、预设选择；打印菜单；循环遍历选择；if-elif 分发；退出就 break；循环外输出最终状态。核心是**状态变量**：余额记在循环外，每轮修改。

| 步骤 | 做什么 | 案例里的样子 |
| --- | --- | --- |
| 准备 | 数据、计数器、状态变量 | 成绩列表、counts、target、balance |
| 循环 | 遍历或按条件重复 | 三次都用 for 遍历 |
| 判断 | 分类或比较 | 分档、比大小、选项分发 |
| 收尾 | 输出汇总或最终状态 | 各档人数、猜中提示、最终余额 |


## 五、深入一层：三个案例，一个骨架

把三个案例摆在一起看，会发现结构几乎一样：准备数据、循环处理、输出结果。

| 案例 | 准备什么 | 循环里做什么 | 怎么退出 |
| --- | --- | --- | --- |
| 成绩统计 | 一个分数列表、一个空字典 | 取分数、算档位、计数加一 | 列表走完自动结束 |
| 猜数字 | 答案、一串猜测、次数计数 | 取一个猜测、比较大小、次数加一 | 猜中 break，序列走完也结束 |
| 银行菜单 | 余额、一串操作 | 取一个操作，按类型分支处理 | 选到退出项，或操作走完 |

从这张表能提炼出三条经验：

第一，数据在进循环之前就准备好。循环里只做加工，不再临时找数据，这样每一轮的行为是可预测的。

第二，退出方式有三种，写之前先想清楚是哪种：数据自然走完（for 最合适）、命中目标就停（break）、用户主动选择退出（while 加标志位）。选错了退出方式，就会写出「该停不停」或「该继续却断了」的程序。

第三，汇总和统计的输出放在循环外面。放里面的话，每轮都会打一次合计，屏幕上全是中间过程，真正要看的那一行反而找不到。

最后提一句调试技巧：这类案例出问题时，先在最外层循环里加一句 print 把当前处理的数据打出来，看它是不是你以为的那条。多数 bug 不是循环写错了，是喂进去的数据和想象的不一样。

把这三个案例的代码都删掉重写一遍，是最好的复习方式。写的时候先只写骨架：准备好数据、写个 for 或 while、写一行 print 看结果。骨架跑通了再往里面填判断，一次只加一件事，出问题立刻知道是哪一步引入的。
## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 统计结果永远是 1 | 计数器写在循环里 | 移到循环外初始化 |
| 猜中却没提示 | 先 break 再 print | 先输出再 break |
| 余额总回到初始值 | 在循环内重新赋值 | 状态变量放循环外 |
| 高分被分到低档 | 分档顺序从低到高 | 改成先严后松 |`,
    examples: [
      {
        title: '案例一：成绩等级统计',
        intro: '一个字典四个计数器，一次遍历完成分档。counts 在循环外创建，循环里只改它的值。',
        code: `scores = [92, 78, 59, 88, 64, 95, 45]
counts = {"A": 0, "B": 0, "C": 0, "D": 0}
for s in scores:
    if s >= 90:
        counts["A"] = counts["A"] + 1
    elif s >= 80:
        counts["B"] = counts["B"] + 1
    elif s >= 60:
        counts["C"] = counts["C"] + 1
    else:
        counts["D"] = counts["D"] + 1
print("A 等", counts["A"], "人")
print("B 等", counts["B"], "人")
print("C 等", counts["C"], "人")
print("D 等", counts["D"], "人")
print("总人数", len(scores))`,
        expectedOutput: `A 等 2 人
B 等 1 人
C 等 2 人
D 等 2 人
总人数 7`,
        lines: [
          { code: 'counts = {"A": 0, "B": 0, "C": 0, "D": 0}', explain: '四个计数器放在循环外，全程共用。' },
          { code: 'if s >= 90:', explain: '分档从高到低，92 和 95 先被 A 档接住。' },
          { code: 'counts["A"] = counts["A"] + 1', explain: '取旧值加 1 再存回，这是计数的标准写法。' },
        ],
        trace: [
          { step: '处理 92、78、59', state: 'A=1，C=1，D=1' },
          { step: '处理 88', state: 'B=1' },
          { step: '结束', state: 'A=2，B=1，C=2，D=2，共 7 人' },
        ],
        tryIt: '把 45 改成 85，先算四个档位怎么变，再运行核对。',
      },
      {
        title: '案例二：猜数字（预设猜测序列）',
        intro: '用 for 加序号模拟三次猜测。答案藏在程序里，猜中就 break。',
        code: `target = 62
guesses = [50, 75, 62]
for i in range(len(guesses)):
    g = guesses[i]
    if g == target:
        print("第", i + 1, "次：猜中，答案是", g)
        break
    elif g < target:
        print("第", i + 1, "次：", g, "小了")
    else:
        print("第", i + 1, "次：", g, "大了")`,
        expectedOutput: `第 1 次： 50 小了
第 2 次： 75 大了
第 3 次：猜中，答案是 62`,
        lines: [
          { code: 'for i in range(len(guesses)):', explain: '用下标遍历，才能同时拿到序号和值。' },
          { code: 'if g == target:', explain: '相等就猜中，先打印再 break，顺序不能反。' },
          { code: 'elif g < target:', explain: '比答案小提示小了，否则就是大了。' },
        ],
        trace: [
          { step: '第 1 次', state: 'g = 50，小于 62，提示小了' },
          { step: '第 2 次', state: 'g = 75，大于 62，提示大了' },
          { step: '第 3 次', state: 'g = 62，相等，输出并 break' },
        ],
      },
      {
        title: '案例三：简易银行菜单',
        intro: '菜单、余额、选择序列三样准备好，循环负责分发，状态变量负责记忆。',
        code: `menu = ["1 查看余额", "2 存入 50 元", "3 退出"]
balance = 100
choices = [1, 2, 2, 1, 3]

print("=== 简易银行菜单 ===")
for item in menu:
    print(item)

for c in choices:
    print("当前选择：", c)
    if c == 1:
        print("余额为", balance, "元")
    elif c == 2:
        balance = balance + 50
        print("存入 50 元，余额变为", balance, "元")
    elif c == 3:
        print("退出菜单")
        break
    else:
        print("没有这个选项")
print("程序结束，最终余额", balance, "元")`,
        expectedOutput: `=== 简易银行菜单 ===
1 查看余额
2 存入 50 元
3 退出
当前选择： 1
余额为 100 元
当前选择： 2
存入 50 元，余额变为 150 元
当前选择： 2
存入 50 元，余额变为 200 元
当前选择： 1
余额为 200 元
当前选择： 3
退出菜单
程序结束，最终余额 200 元`,
        lines: [
          { code: 'balance = 100', explain: '状态变量放在循环外，整个程序共用一份。' },
          { code: 'for c in choices:', explain: '预设的选择序列，代替真实用户的多次输入。' },
          { code: 'break', explain: '选到退出就结束整个循环，后面的选择不再处理。' },
        ],
        trace: [
          { step: '选择 1', state: 'balance = 100，输出余额' },
          { step: '选择 2', state: 'balance 变 150，再变 200' },
          { step: '选择 3', state: '退出并 break，输出最终余额 200' },
        ],
        tryIt: '把 choices 改成 [2, 1, 3]，先写出每次输出，再运行核对。',
      },
    ],
    compare: [
      {
        conceptA: '批量统计',
        conceptB: '目标搜索',
        diff: '统计要把所有数据看完，不能提前停；搜索一旦找到就可以 break。',
        example: '数各档人数必须遍历全表；找第一个及格成绩找到就能结束。',
      },
    ],
    pitfalls: [
      '把计数器写在循环里，每轮清零，结果永远是 1。',
      '猜数字时先 break 再 print，猜中了却没有任何提示。',
      '菜单的余额写在循环内重新赋值，每次查看都回到初始值。',
    ],
    keyPoints: [
      '写程序先拆四步：准备、循环、判断、收尾。',
      '计数器与状态变量必须放在循环外，否则每轮被重置。',
      '搜索类任务找到就 break，统计类任务必须走完全程。',
    ],
    sources: [
      { book: 'both', chapter: 'pcc3 第4-5章、abs3 第2-3章' },
    ],
    prerequisites: ['s4-03', 's4-06', 's4-07'],
    task: '三个案例各改一处：成绩统计加 E 档，猜数字把答案改成 40，菜单加「取出 30 元」选项。',
    exercises: [
      {
        id: 's4-08-q1',
        qtype: 'single',
        stem: '统计各档人数时，计数器变量应该写在哪里？',
        options: ['A. 循环体内的第一行', 'B. 循环之前，循环外', 'C. 循环之后', 'D. 写在 print 里'],
        answer: 'B',
        explanation:
          '答案：B。\n思路：计数器要跨轮次保留数据。\n逐步演示：写循环外只初始化一次，循环里不断加 1；写循环内每轮被重置。\n易错提醒：需要记住前面结果的变量，都必须放在循环外。',
        difficulty: 1,
      },
      {
        id: 's4-08-q2',
        qtype: 'boolean',
        stem: '猜数字程序里，猜中时应该先 break 再输出提示，这样可以少执行一行。',
        answer: '错',
        explanation:
          '答案：错。\n思路：break 会立刻离开循环，它后面的代码本轮不再执行。\n逐步演示：先 break 的话后面的 print 永远轮不到。\n易错提醒：先输出结果再 break，省一行代码换一个 bug 不划算。',
        difficulty: 1,
      },
      {
        id: 's4-08-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？',
        code: 'count = 0\nfor s in [88, 92, 57, 73, 96]:\n    if s >= 60:\n        count = count + 1\nprint(count)',
        keywords: [['4']],
        explanation:
          '答案：输出 4。\n思路：统计大于等于 60 的个数。\n逐步演示：88、92 计数到 2，57 跳过，73 到 3，96 到 4。\n易错提醒：57 不满足不加；print 在循环外只输出一行。',
        difficulty: 2,
      },
      {
        id: 's4-08-q4',
        qtype: 'blank',
        stem: '菜单程序里，选到「退出」时希望立刻结束整个循环，应使用的关键字是 ______。',
        answer: 'break',
        accepted: ['break', 'BREAK', '跳出'],
        explanation:
          '答案：break。\n思路：退出意味着不再处理后面的选择。\n逐步演示：在退出分支里写 break，循环立即结束。\n易错提醒：用 continue 只会跳过这一轮，菜单等于没退出。',
        difficulty: 2,
      },
      {
        id: 's4-08-q5',
        qtype: 'program',
        stem: '已知 scores = [88, 92, 57, 73, 96]。统计 60 分及以上的人数，输出一行：及格 4 人\n\n（要求循环逐个判断，不能把 4 直接写进 print）',
        answer: '',
        testCases: [{ stdin: '', expected: '及格 4 人' }],
        explanation:
          '答案（参考答案）：\nscores = [88, 92, 57, 73, 96]\ncount = 0\nfor s in scores:\n    if s >= 60:\n        count = count + 1\nprint("及格", count, "人")\n\n思路：计数器循环外归零，循环内满足条件就加 1。\n逐步演示：88、92、73、96 各加 1，57 跳过，count 为 4。\n易错提醒：count 写循环里会被反复重置。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
]
