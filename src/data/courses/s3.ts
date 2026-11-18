import type { Lesson } from '../../types'

export const stage3Lessons: Lesson[] = [
  {
    id: 's3-01',
    stageId: 3,
    order: 1,
    title: 'if 条件判断',
    subtitle: '让程序学会看情况办事',
    hook: '出门前你会看天气：下雨就带伞，不下就不带。程序也能这样"看情况办事"吗？当然能，靠的就是 if。',
    objectives: [
      '说出 if 语句的作用：条件成立才执行',
      '能写出带冒号和缩进的 if 语句',
      '理解判断的依据是布尔值 True 或 False',
    ],
    analogy: 'if 就像路口的红绿灯：灯是绿的（条件为 True）你就走，灯是红的（False）你就停。程序走到 if 这里，也要先"看灯"再决定走不走。',
    content: `# 让程序学会判断

到目前为止，我们的代码都是"一条道走到黑"——从上往下每行都执行。可生活里充满了"如果"：如果下雨就带伞，如果考得好就奖励自己。

## if 的基本写法

\`\`\`python
age = 18
if age >= 18:
    print("你成年了")
\`\`\`

三件事要记牢：

1. \`if\` 后面写**条件**，条件末尾加**冒号** \`:\`
2. 条件成立时要执行的代码，**缩进**写在下一行
3. 条件不成立（结果是 False）时，这段缩进代码就被跳过

## 缩进是"归属证明"

那几格缩进不是摆设，它在告诉 Python："这几行归 if 管"。缩进没了，if 就管不到任何代码。

> if 的条件本质是一个布尔值：True 就执行，False 就跳过。`,
    examples: [
      {
        title: '根据体温判断是否发烧',
        code: 'temp = 38.5\nif temp >= 37.3:\n    print("体温偏高，注意休息")\nprint("程序执行完毕")',
        expectedOutput: '体温偏高，注意休息\n程序执行完毕',
        lines: [
          { code: 'if temp >= 37.3:', explain: '条件成立时结果是 True，注意末尾的冒号不能少。' },
          { code: '    print("体温偏高，注意休息")', explain: '这行缩进了，归 if 管；条件成立才会执行。' },
          { code: 'print("程序执行完毕")', explain: '没有缩进，所以不管条件如何都会执行。' },
        ],
      },
    ],
    visual: {
      kind: 'flow',
      title: 'if 的判断流程',
      description: '程序走到 if，先看条件是真还是假，再决定走哪条路。',
      steps: [
        { label: '第 1 步', detail: 'age = 18', state: [{ name: 'age', value: '18' }] },
        { label: '第 2 步', detail: '判断 age >= 18 → True', state: [{ name: '条件结果', value: 'True' }] },
        { label: '第 3 步', detail: '条件为真，执行缩进里的 print', state: [{ name: '输出', value: '你成年了' }] },
        { label: '换个值', detail: 'age = 15 时条件为 False，跳过 print', state: [{ name: '输出', value: '（什么都不打印）' }] },
      ],
    },
    compare: [
      { conceptA: '缩进的代码', conceptB: '不缩进的代码', diff: '缩进的代码归 if 管，只有条件为真才执行；不缩进的代码独立于 if，无论条件如何都会执行。', example: '把 print 缩进，它可能不出现；去掉缩进，它一定出现。' },
    ],
    pitfalls: [
      'if 那一行末尾忘了写冒号，会报 SyntaxError。',
      '该缩进的语句没缩进，结果条件成立时也什么都不执行。',
      '把赋值符号当成判断条件来写（如 if age = 18:），判断相等要用 ==。',
    ],
    sources: [{ book: 'pcc3', chapter: '第5章 if语句' }, { book: 'abs3', chapter: '第2章 if-else和流程控制' }],
    prerequisites: ['s2-04', 's2-01'],
    task: '写一个程序：定义变量 score，如果 score >= 60 就输出『及格』，然后改小分数观察输出的变化。',
    exercises: [
      { id: 's3-01-q1', qtype: 'single', stem: '关于 if 语句，下面说法正确的是？', options: ['A. if 后面不用写条件', 'B. 条件末尾要加冒号，执行的语句要缩进', 'C. 条件为 False 时程序会报错', 'D. 缩进只是好看，没有作用'], answer: 'B', explanation: 'if 语句的条件后必须有冒号，受条件控制的语句要缩进；条件为 False 只是跳过，不会报错。' },
      { id: 's3-01-q2', qtype: 'predict', stem: '下面代码会输出什么？\nx = 3\nif x > 5:\n    print(『大数』)\nprint(『结束』)', keywords: [['结束']], explanation: 'x > 5 为 False，缩进的『大数』被跳过；最后的 print 没缩进，照常输出『结束』。' },
    ],
    minutes: 9,
    env: 'browser',
  },
  {
    id: 's3-02',
    stageId: 3,
    order: 2,
    title: 'if-else 与 if-elif-else',
    subtitle: '多条路，总有一条适合你',
    hook: '只看『如果』还不够：成绩及格要夸，不及格要鼓励；三个档位怎么分？给 if 加上『否则』和『否则如果』。',
    objectives: [
      '会用 if-else 处理二选一的情况',
      '会用 if-elif-else 处理多分支情况',
      '理解多个分支互斥、只会执行其中一个',
    ],
    analogy: 'if-else 像岔路口：要么左要么右，必选一条。if-elif-else 像下楼梯：从上往下比对，符合哪级就停在哪级，后面的不再看。',
    content: `# 二选一：if-else

if 只管『条件成立怎么办』，那不成立怎么办？用 else（否则）补上：

\`\`\`python
score = 55
if score >= 60:
    print("及格啦")
else:
    print("要继续努力哦")
\`\`\`

else 后面不写条件，它自动代表『上面条件不成立』的情况。两条路必走一条。

## 多选一：if-elif-else

档位多于两个时，用 elif（else if 的缩写）一层层往下问：

\`\`\`python
score = 85
if score >= 90:
    print("优秀")
elif score >= 60:
    print("及格")
else:
    print("不及格")
\`\`\`

程序从上往下检查，遇到第一个成立的分支就执行，然后**整个结构结束**，后面的分支不再判断。所以顺序很重要：要把要求更严格（分数更高）的条件写在前面。

> elif 可以有任意多个，else 只能有一个且必须放在最后。`,
    examples: [
      {
        title: '成绩等级小助手',
        code: 'score = 76\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 60:\n    grade = "C"\nelse:\n    grade = "D"\nprint("等级：", grade)',
        expectedOutput: '等级： C',
        lines: [
          { code: 'if score >= 90:', explain: '先判断最高的档位，不成立才往下走。' },
          { code: 'elif score >= 60:', explain: '76 满足这一档，grade 被设为 C，后面的 else 直接跳过。' },
        ],
      },
    ],
    compare: [
      { conceptA: 'elif', conceptB: 'else', diff: 'elif 要带条件，不满足就继续往下问；else 不带条件，兜底所有剩余情况，且只能放在最后。', example: '分数判断里，elif score>=60 还要看分数；else 则包揽剩下全部。' },
    ],
    pitfalls: [
      'elif 和 else 后面也忘了写冒号。',
      '把严格的条件写在后面（如先判 >=60 再判 >=90），高分会被前面的分支抢走。',
      '在 else 后面又写了条件，比如 else score < 60:，这是错的。',
    ],
    sources: [{ book: 'pcc3', chapter: '第5章 if语句' }, { book: 'abs3', chapter: '第2章 if-else和流程控制' }],
    prerequisites: ['s3-01'],
    task: '改写成绩助手，加入『优秀、良好、及格、不及格』四档，为每档输出一句不同的鼓励语。',
    exercises: [
      { id: 's3-02-q1', qtype: 'single', stem: '关于 if-elif-else，下面说法正确的是？', options: ['A. 所有分支都会执行一遍', 'B. 只会执行第一个条件成立的分支', 'C. else 可以写在最前面', 'D. elif 后面不用写条件'], answer: 'B', explanation: '程序从上往下判断，遇到第一个成立的分支执行后就结束整个结构，其余分支跳过。' },
      { id: 's3-02-q2', qtype: 'predict', stem: 'x = 5，若 x > 10 输出『A』，否则若 x > 3 输出『B』，否则输出『C』，实际输出什么？', keywords: [['B']], explanation: 'x > 10 为假，x > 3 为真，输出 B 后结束，else 不执行。' },
      { id: 's3-02-q3', qtype: 'blank', stem: '在 if-elif-else 结构中，用来『兜底』所有剩余情况的关键字是 ______。', answer: 'else', accepted: ['ELSE'], explanation: 'else 不匹配条件，专门处理前面分支都没命中时的情况。' },
    ],
    minutes: 10,
    env: 'browser',
  },
  {
    id: 's3-03',
    stageId: 3,
    order: 3,
    title: '比较运算符与逻辑运算符',
    subtitle: '把多个条件组合起来判断',
    hook: '买电影票要『满 18 岁并且有票』——一个判断里藏着好几个条件。程序怎么把条件拼在一起？靠逻辑运算符。',
    objectives: [
      '熟练使用比较运算符构造判断条件',
      '掌握 and、or、not 三种逻辑运算符',
      '能用括号控制多个条件的优先顺序',
    ],
    analogy: 'and 像『并且』：两件事都办成才算成功；or 像『或者』：办成一件就行；not 像『反着说』：黑变白、白变黑。',
    content: `# 比较与逻辑运算符

if 的条件通常是一个『对或错』的判断。要构造这样的判断，得靠两类运算符。

## 比较运算符

比较两个数，结果是 True 或 False：

| 符号 | 意思 | 例子 |
|---|---|---|
| == | 等于 | 3 == 3 → True |
| != | 不等于 | 3 != 4 → True |
| > < | 大于 / 小于 | 5 > 3 → True |
| >= <= | 大于等于 / 小于等于 | 5 >= 5 → True |

注意 == 是比较，= 是赋值，千万别混。

## 逻辑运算符：组合多个条件

- **and**：两边都为 True，结果才为 True（并且）
- **or**：只要一边为 True，结果就为 True（或者）
- **not**：把 True 变 False、False 变 True（取反）

\`\`\`python
age = 20
has_ticket = True
if age >= 18 and has_ticket:
    print("可以入场")
\`\`\`

## 优先级

not 最优先，其次是 and，最后是 or。拿不准就加括号，最清楚也最不容易错。`,
    examples: [
      {
        title: '判断能否乘坐游乐设施',
        code: 'age = 16\nwith_adult = True\nif age >= 12 and (age >= 18 or with_adult):\n    print("可以乘坐")\nelse:\n    print("暂时不能乘坐")\nprint(not (age < 12))',
        expectedOutput: '可以乘坐\nTrue',
        lines: [
          { code: 'age >= 12 and (age >= 18 or with_adult)', explain: 'and 连接两个条件都要满足；括号里的 or 表示满 18 岁或有大人陪都行。' },
          { code: 'not (age < 12)', explain: 'age < 12 是 False，not 取反后变成 True。' },
        ],
      },
    ],
    compare: [
      { conceptA: 'and', conceptB: 'or', diff: 'and 要求所有条件都成立结果才为 True（全真才真）；or 只要有一个成立就为 True（有真就真）。', example: 'age>=18 and has_ticket 两个都要满足；age>=60 or age<=12 满足其一即可。' },
    ],
    pitfalls: [
      '把相等比较 == 误写成赋值符号 =。',
      '把 and / or 写成一个连字符或竖线符号。',
      'not 放错位置，导致整个判断的意思完全相反。',
    ],
    sources: [{ book: 'pcc3', chapter: '第5章 if语句' }, { book: 'abs3', chapter: '第2章 if-else和流程控制' }],
    prerequisites: ['s2-04', 's3-01'],
    task: '写程序判断一个数是否在 10 到 20 之间（含边界），用 and 连接两个比较条件，并输出结果。',
    exercises: [
      { id: 's3-03-q1', qtype: 'single', stem: '表达式 (3 > 2) and (5 < 4) 的结果是？', options: ['A. True', 'B. False', 'C. 3', 'D. 报错'], answer: 'B', explanation: '3 > 2 为 True，5 < 4 为 False，and 要求两边都为真，所以结果是 False。' },
      { id: 's3-03-q2', qtype: 'predict', stem: 'print(not (2 == 3) or 5 > 10) 输出什么？', keywords: [['True']], explanation: '2 == 3 为 False，not 取反得 True；5 > 10 为 False；True or False 为 True。' },
    ],
    minutes: 9,
    env: 'browser',
  },
  {
    id: 's3-04',
    stageId: 3,
    order: 4,
    title: 'for 循环',
    subtitle: '把同一件事重复做',
    hook: '要把水果列表里每一种水果都念一遍，一行行写 print 太笨。for 循环能帮你『自动逐个处理』。',
    objectives: [
      '理解 for 循环遍历列表的执行过程',
      '会用 range() 生成数字序列',
      '能用循环完成累加求和',
    ],
    analogy: 'for 循环像流水线的工人：东西一个接一个从传送带过来，每件他都做同样的动作，直到最后一件处理完。',
    content: `# for 循环：重复做事的法宝

想依次打印列表里的每种水果，写十行 print 太笨。for 循环帮你自动逐个处理。

## 遍历列表

\`\`\`python
fruits = ["苹果", "香蕉", "橘子"]
for fruit in fruits:
    print("我喜欢", fruit)
\`\`\`

for ... in ... 读成『对于列表里的每一个元素』。每转一圈，变量 fruit 就指向当前元素，缩进的代码执行一次。

## range()：生成一串数字

\`\`\`python
for i in range(5):
    print(i)   # 0 1 2 3 4
\`\`\`

range(5) 给出 0 到 4，共 5 个数（不含 5）；range(1, 6) 给出 1 到 5。

## 累加求和

\`\`\`python
total = 0
for n in range(1, 5):
    total = total + n
print(total)   # 10
\`\`\`

> 记住：循环体必须缩进；列表里有几个元素（或 range 生成几个数），循环体就执行几次。`,
    examples: [
      {
        title: '统计班级总分与平均分',
        code: 'scores = [88, 92, 75, 96]\ntotal = 0\nfor s in scores:\n    total += s\nprint("总分：", total)\nprint("平均分：", total / len(scores))',
        expectedOutput: '总分： 351\n平均分： 87.75',
        lines: [
          { code: 'for s in scores:', explain: '循环把 scores 里每个分数依次交给变量 s。' },
          { code: 'total += s', explain: '等价于 total = total + s，把当前分数累加进去。' },
        ],
      },
    ],
    visual: {
      kind: 'loop',
      title: 'for 循环一圈圈执行',
      description: '循环每转一圈，变量 total 就累加一次。',
      steps: [
        { label: '初始', detail: 'total = 0', state: [{ name: 'total', value: '0' }, { name: 's', value: '（无）' }] },
        { label: '第 1 圈', detail: 's = 88，total = 0 + 88', state: [{ name: 'total', value: '88' }, { name: 's', value: '88' }] },
        { label: '第 2 圈', detail: 's = 92，total = 88 + 92', state: [{ name: 'total', value: '180' }, { name: 's', value: '92' }] },
        { label: '第 3 圈', detail: 's = 75，total = 180 + 75', state: [{ name: 'total', value: '255' }, { name: 's', value: '75' }] },
        { label: '第 4 圈', detail: 's = 96，total = 255 + 96 = 351', state: [{ name: 'total', value: '351' }, { name: 's', value: '96' }] },
      ],
    },
    pitfalls: [
      'for 那一行末尾忘了写冒号。',
      '循环体忘了缩进，导致只执行一次或报错。',
      '以为 range(5) 包含 5，其实到 4 就结束了。',
    ],
    sources: [{ book: 'pcc3', chapter: '第4章 操作列表' }, { book: 'abs3', chapter: '第3章 循环' }],
    prerequisites: ['s2-06', 's2-08'],
    task: '用 for 循环遍历一个水果列表，逐个输出水果名，并统计一共有几种水果。',
    exercises: [
      { id: 's3-04-q1', qtype: 'blank', stem: '要生成 0 到 4 这 5 个数字，应写 range(______)。', answer: '5', explanation: 'range(5) 从 0 开始、不含 5，正好生成 0 到 4 共 5 个数。' },
      { id: 's3-04-q2', qtype: 'predict', stem: 'total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)', keywords: [['6']], explanation: 'range(1, 4) 给出 1、2、3，累加得 6。' },
    ],
    minutes: 10,
    env: 'browser',
  },
  {
    id: 's3-05',
    stageId: 3,
    order: 5,
    title: 'while 循环与 break/continue',
    subtitle: '条件成立就一直做，直到满意为止',
    hook: '不知道要做几次怎么办？比如一直抽签直到中奖。这时候 for 不够用，得请出 while 循环。',
    objectives: [
      '理解 while 循环按条件重复执行的特点',
      '会用 break 提前结束整个循环',
      '会用 continue 跳过本轮进入下一轮',
    ],
    analogy: 'while 像一个不知疲倦的门卫：只要你没说停（条件成立），他就一直重复检查；break 是『直接下班』，continue 是『这一轮跳过，下一轮再来』。',
    content: `# while 循环：看着条件做事

for 循环适合『知道要重复几次』，while 循环适合『次数不定，但满足条件就继续』。

## 基本写法

\`\`\`python
count = 1
while count <= 3:
    print("第", count, "次")
    count = count + 1
\`\`\`

只要 count <= 3 为真，就重复执行缩进里的代码。注意循环体里一定要有改变条件的语句（这里是 count = count + 1），否则条件永远成立，会陷入『死循环』。

## break：立刻跳出

\`\`\`python
while True:
    answer = input("输入 q 退出：")
    if answer == "q":
        break
\`\`\`

break 让循环立即结束，不再判断条件。

## continue：跳过这一轮

continue 不结束整个循环，只跳过本轮剩下的代码，直接进入下一轮判断。

> for 是『数着次数做』，while 是『看着条件做』。`,
    examples: [
      {
        title: '找出第一个能被 7 整除的数',
        code: 'n = 1\nwhile True:\n    if n % 7 != 0:\n        n = n + 1\n        continue\n    print("第一个能被 7 整除的数是", n)\n    break',
        expectedOutput: '第一个能被 7 整除的数是 7',
        lines: [
          { code: 'while True:', explain: '条件恒为真，配合 break 使用，表示一直找、找到为止。' },
          { code: 'continue', explain: '不能被 7 整除时，n 加 1 后跳过本轮，直接进入下一次判断。' },
          { code: 'break', explain: '找到了就立刻跳出循环，不再继续。' },
        ],
      },
    ],
    visual: {
      kind: 'loop',
      title: 'break 与 continue 的区别',
      description: 'continue 只跳过本轮，break 直接结束整个循环。',
      steps: [
        { label: '第 1 轮', detail: 'n = 1，不能被 7 整除 → continue', state: [{ name: 'n', value: '1' }, { name: '动作', value: '跳过本轮' }] },
        { label: '第 2 轮', detail: 'n = 2，仍不能整除 → continue', state: [{ name: 'n', value: '2' }, { name: '动作', value: '跳过本轮' }] },
        { label: '第 7 轮', detail: 'n = 7，能被 7 整除 → 打印并 break', state: [{ name: 'n', value: '7' }, { name: '动作', value: '结束循环' }] },
      ],
    },
    compare: [
      { conceptA: 'break', conceptB: 'continue', diff: 'break 直接结束整个循环，后面的轮次都不再做；continue 只跳过当前这一轮剩下的代码，循环继续下一轮。', example: '找数时，找到目标用 break；不满足条件时用 continue 跳过。' },
      { conceptA: 'for 循环', conceptB: 'while 循环', diff: 'for 适合已知重复次数（遍历序列）；while 适合次数不定、要看条件决定是否继续。', example: '遍历列表用 for；一直输入直到输入 q 用 while。' },
    ],
    pitfalls: [
      'while 循环体里忘记改变条件，导致死循环。',
      '把 break 和 continue 的作用记反。',
      'while True 没有配上 break，程序永远停不下来。',
    ],
    sources: [{ book: 'pcc3', chapter: '第7章 用户输入和while循环' }, { book: 'abs3', chapter: '第3章 循环' }],
    prerequisites: ['s3-01', 's3-04'],
    task: '用 while 循环从 1 数到 10，遇到 5 时用 continue 跳过打印，观察最终输出少了哪个数字。',
    exercises: [
      { id: 's3-05-q1', qtype: 'single', stem: '想让循环立刻整个结束，应该使用哪个关键字？', options: ['A. continue', 'B. break', 'C. pass', 'D. else'], answer: 'B', explanation: 'break 会立即跳出循环；continue 只跳过本轮，循环仍继续。' },
      { id: 's3-05-q2', qtype: 'debug', stem: '下面代码停不下来，问题出在哪？代码：count = 1；while count <= 5:；    print(count)', keywords: [['count', '没有', '增加'], ['死循环']], explanation: '循环体里没有改变 count 的语句（如 count = count + 1），条件永远成立，形成死循环。' },
    ],
    minutes: 10,
    env: 'browser',
  },
  {
    id: 's3-06',
    stageId: 3,
    order: 6,
    title: '列表与循环结合（含嵌套循环）',
    subtitle: '让数据排着队接受处理',
    hook: '打印一个 5 行的三角形，每行星星数量都不一样。一列列写 print 太累了——让循环套循环帮你画。',
    objectives: [
      '会用循环遍历并加工列表元素',
      '理解嵌套循环的执行顺序',
      '能用嵌套循环打印图形和乘法表',
    ],
    analogy: '嵌套循环像日历：外层循环翻『月份』，内层循环翻『日期』。外层翻一页，内层要把这个月的日子全翻一遍。',
    content: `# 列表遇上循环

列表负责『装一堆数据』，循环负责『逐个处理』。两者结合，才能干真正有用的活。

## 遍历并加工

\`\`\`python
prices = [12, 35, 8, 20]
for i in range(len(prices)):
    prices[i] = prices[i] * 0.9   # 全部打九折
print(prices)
\`\`\`

用 range(len(列表)) 可以拿到每个下标，从而修改对应位置的元素。

## 嵌套循环：循环里套循环

打印一个 3 行 4 列的星星矩形：

\`\`\`python
for row in range(3):
    for col in range(4):
        print("*", end="")
    print()   # 一行结束，换行
\`\`\`

外层循环管『行』，内层循环管『列』。外层走 1 圈，内层要走完 4 圈。

## 数一数执行次数

> 嵌套循环的总执行次数 = 外层次数 × 内层次数。上面的例子一共打印 3 × 4 = 12 颗星。`,
    examples: [
      {
        title: '打印直角三角形',
        code: 'for i in range(1, 5):\n    for j in range(1, i + 1):\n        print("*", end="")\n    print()',
        expectedOutput: '*\n**\n***\n****',
        lines: [
          { code: 'for i in range(1, 5):', explain: '外层控制行数，i 从 1 到 4。' },
          { code: 'for j in range(1, i + 1):', explain: '内层控制每行的星星数，第 i 行打印 i 颗。' },
          { code: 'print()', explain: '内层结束后打印一个空行，实现换行。' },
        ],
      },
    ],
    pitfalls: [
      '把外层循环和内层循环的缩进写错，导致图形不对。',
      '以为嵌套循环只执行外层次数，忘了要相乘。',
      '用下标修改列表时，range 的边界写成 len(列表) + 1 导致越界。',
    ],
    sources: [{ book: 'pcc3', chapter: '第4章' }, { book: 'abs3', chapter: '第3章' }],
    prerequisites: ['s3-04', 's2-06'],
    task: '用嵌套循环打印一个 6 行的直角三角形，第 n 行打印 n 颗星星。',
    exercises: [
      { id: 's3-06-q1', qtype: 'predict', stem: 'for i in range(2):\n    for j in range(3):\n        print(i, j)', keywords: [['0 0'], ['0 1'], ['0 2'], ['1 0'], ['1 1'], ['1 2']], explanation: '外层 i 取 0、1，每个 i 内层 j 取 0、1、2，共 6 行，print 默认用空格隔开两个数。' },
      { id: 's3-06-q2', qtype: 'program', stem: '编程题：读取输入的一行整数（用空格分隔），输出其中所有偶数的和。要求用循环遍历列表，并用测试用例验证。', code: 'nums = list(map(int, input().split()))\n# 在这里补全代码，输出偶数的和', testCases: [{ stdin: '1 2 3 4', expected: '6' }, { stdin: '10 11 12', expected: '22' }], answer: '', explanation: '遍历列表，用取余判断 n % 2 == 0 找出偶数并累加：2 + 4 = 6，10 + 12 = 22。' },
    ],
    minutes: 12,
    env: 'browser',
  },
]
