import type { Lesson } from '../../types'

/**
 * 第六阶段：文件操作与异常处理（8 课）
 * 写作约定：content 内不使用反引号；所有可运行代码放在 examples 里；
 * 本地课（s6-01、s6-02）的示例需在 Windows + VS Code 运行，浏览器课用 io.StringIO 在内存中模拟文件。
 */
export const stage6Lessons: Lesson[] = [
  {
    id: 's6-01',
    stageId: 6,
    order: 1,
    title: '文件读写基础',
    subtitle: '让数据活过程序结束之后',
    hook: '你写了个记单词的小程序，关掉窗口再打开，昨天背的三十个单词一个都不剩。数据跑哪去了？',
    objectives: [
      '说清变量里的数据为什么关掉程序就没了',
      '用 open 的三个参数打开一个文本文件',
      '用 with 语句安全地写入和读取内容',
      '判断该用 w 还是 a，并解释乱码的原因',
    ],
    analogy:
      '内存像一块白板：写字快、擦掉也快，一下课就被擦干净。文件像一个笔记本：写起来慢一点，但合上本子明天翻开还在。变量都写在白板上，想让东西留到明天，必须抄进笔记本。',
    terms: [
      { term: '文件路径', plain: '文件在硬盘上的地址，比如 C:/python-study/note.txt。' },
      { term: '打开模式', plain: '告诉 open 这次是读（r）、重写（w）还是追加（a）。' },
      { term: '文件对象', plain: 'open 返回的东西，后面的 write、read 都通过它进行。' },
      { term: 'with 语句', plain: '代码块结束时自动帮你关闭文件，出错也照关。' },
      { term: '编码', plain: '文字存成字节的规则，中文必须用 utf-8。' },
    ],
    content: `## 一、这一课在 Windows + VS Code 本地环境完成

先说清楚：本课所有代码都必须在电脑上跑，手机浏览器里跑不出效果。原因是浏览器的安全沙箱——网页里的 Python 被关在一个虚拟盒子里，它看不到你电脑上的真实磁盘，也写不了真实文件。这是浏览器的保护机制，不是课程偷懒。请打开电脑，在 VS Code 里建一个 python-study 文件夹，新建 s6_01.py，跟着往下做。

## 二、为什么数据必须存进文件

程序里的变量住在内存里。内存是系统在程序运行时临时划给它的工作台，程序一结束，工作台立刻被收回，所有变量连同数据一起消失。这不是 Python 的毛病，而是所有程序的共同规律。你昨天算出的总价、输入的十行笔记、整理好的五十条数据，只要没写进文件，关掉窗口就等于没发生过。

想让数据活到下一次运行，唯一的办法是把它写到硬盘上的文件里。文件是硬盘上一段有名字的数据，程序关闭后它还在原地等你。内存快、易失；文件慢、持久，这就是两者最本质的分工。

## 三、open 到底做了什么

open 一次做三件事：按路径找到文件（写模式下不存在就新建）、按模式决定这次是读还是写、返回一个文件对象让你操作。打个比方，文件是仓库，open 是去仓库开门，模式决定你这次是提货还是送货。门开错了，后面所有动作都白费。

## 四、语法与使用规则

| 写法 | 说明 | 示例 |
| --- | --- | --- |
| open(路径, 模式, encoding) | 打开文件，返回文件对象 | open("note.txt", "w", encoding="utf-8") |
| 模式 r | 只读，文件不存在会报错 | 读取已有文件 |
| 模式 w | 写入，会先清空原文件 | 从头写一份新内容 |
| 模式 a | 追加，写在文件末尾 | 往日志里添一行 |
| f.write(文字) / f.read() | 写入字符串 / 一次读出全部 | 写入或读取 |
| with open(...) as f | 离开代码块自动关闭文件 | 推荐的标准写法 |

必须记住的四条规则：

1. 一定要关闭文件。不关，内容可能还留在缓冲区没真正落盘，程序崩溃时数据就丢了。
2. 优先用 with。它保证离开代码块时关闭文件，即使中间出错也照样关。
3. 写中文必须指定 encoding 为 utf-8。Windows 默认编码是 GBK，不指定就乱码或直接报错。
4. w 会清空原文件。想保留旧内容就往末尾追加，用 a。

## 五、不关闭文件到底会怎样

很多人以为「程序结束了系统会帮我存好」。真相是：write 写进的是内存里的缓冲区，只有关闭文件、缓冲区写满或程序正常退出时，才真正刷到磁盘。如果你写了十行却没有关闭，程序在第八行崩溃，那十行几乎没有一行留下。

更麻烦的是，文件被占用的状态下，别的程序打不开它，你自己也可能读到一份残缺内容。所以关闭文件不是「讲究」，而是必须完成的一步。

## 六、逐步演示

第一步，用 w 模式打开 note.txt，写两行字，每行结尾自己补换行符。第二步，离开 with 块后文件已自动关闭，再用 r 模式重新打开，read() 读出全部内容。第三步，打印内容并用 len() 数一数字符数，确认读到的就是写进去的。第四步，把模式改成 a 再跑一次，观察文件变长而不是被清空，这就是 w 和 a 的区别。

## 七、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| UnicodeDecodeError | 用 utf-8 读了 GBK 编码的文件 | 读写统一写 encoding="utf-8" |
| 写入成功但打开是空文件 | 没关闭，内容还在缓冲区 | 用 with，或手动 f.close() |
| 中文变成乱码方块 | 写入时没指定 utf-8 | 三个参数写全 |
| FileNotFoundError | 用 r 模式但文件不存在 | 先确认路径，或用 w 创建 |
| 多行内容挤成一行 | write 不自动换行 | 字符串末尾自己加换行符 |`,
    examples: [
      {
        title: '用 with 写入再读回一个文件',
        intro: '把两行字写进 note.txt 再读出来。重点看 with 的两处用法和 encoding 参数。',
        code: `path = "note.txt"

with open(path, "w", encoding="utf-8") as f:
    f.write("第一行：今天开始学文件读写\\n")
    f.write("第二行：with 会在离开时自动关闭文件\\n")

with open(path, "r", encoding="utf-8") as f:
    text = f.read()

print(text)
print("一共读了", len(text), "个字符")`,
        expectedOutput: `第一行：今天开始学文件读写
第二行：with 会在离开时自动关闭文件

一共读了 35 个字符`,
        lines: [
          { code: 'path = "note.txt"', explain: '相对路径，文件建在脚本所在文件夹；存成变量，后面两处复用。' },
          { code: 'with open(path, "w", encoding="utf-8") as f:', explain: 'w 是写入：不存在就新建，已存在先清空。as f 给文件对象起名。' },
          { code: 'f.write("...\\n")', explain: 'write 只写字符串且不自动换行，结尾自己补换行符。' },
          { code: 'text = f.read()', explain: '换 r 模式重新打开才能读，因为上一个 with 块结束时文件已关闭。' },
          { code: 'print(text)', explain: 'text 结尾自带换行，print 又补一个，所以输出里多一个空行。' },
        ],
        trace: [
          { step: '第 3-4 行', state: '文件被创建，缓冲区里有两行文字' },
          { step: '离开 with', state: '文件自动关闭，内容真正落盘' },
          { step: '第 6-7 行', state: '重新打开读取，text 含两个换行，长度 35' },
          { step: '第 9-10 行', state: '输出两行文字、一个空行、字符数' },
        ],
        tryIt: '把第二行文字改短一点，先猜字符数会变成多少，再运行核对。',
      },
      {
        title: '追加模式 a：往同一个文件里接着写',
        intro: '日志要不断往后加内容，用 w 会把旧记录全清掉。这段代码对比了 w 和 a 的效果。',
        code: `path = "log.txt"

with open(path, "w", encoding="utf-8") as f:
    f.write("程序启动\\n")

with open(path, "a", encoding="utf-8") as f:
    f.write("第一条记录\\n")
    f.write("第二条记录\\n")

with open(path, "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())`,
        expectedOutput: `程序启动
第一条记录
第二条记录`,
        lines: [
          { code: 'open(path, "w", ...)', explain: '第一次用 w 创建文件写一行；如果文件已存在，这一步会清空它。' },
          { code: 'open(path, "a", ...)', explain: 'a 把写入位置移到末尾，新内容接在后面，旧内容完整保留。' },
          { code: 'for line in f:', explain: '文件对象可以直接遍历，一次给一行，末尾带着换行符。' },
          { code: 'print(line.strip())', explain: 'strip() 去掉换行，否则每行之间会多一个空行。' },
        ],
        trace: [
          { step: '第 3-4 行', state: '文件内容为「程序启动」一行' },
          { step: '第 6-8 行', state: '追加两行，共三行，顺序为启动、第一条、第二条' },
          { step: '第 10-12 行', state: '逐行读取、去换行后打印出三行' },
        ],
        tryIt: '把第二个 with 的 a 改成 w 再跑，亲眼看看 w 清空文件的效果。',
      },
    ],
    compare: [
      {
        conceptA: '模式 w（写入）',
        conceptB: '模式 a（追加）',
        diff: 'w 打开时立刻清空原文件，从第一个字符重写；a 把写入位置移到末尾，原有内容完整保留。',
        example: '文件里已有「程序启动」，用 w 写一条只剩一行；用 a 写则变成两行。',
      },
      {
        conceptA: '变量（内存）',
        conceptB: '文件（硬盘）',
        diff: '变量随程序结束消失，读写极快；文件永久保存，要走磁盘，慢一些，但能跨程序、跨天存在。',
        example: '总价放变量里，关窗口就没了；写进 total.txt，明天打开还在。',
      },
    ],
    pitfalls: [
      '忘了 encoding="utf-8"，中文写进去变乱码，读出来报 UnicodeDecodeError。',
      '想「接着写」却用了 w，把原有内容全清空了——续写要用 a。',
      'write 的字符串结尾没加换行符，多行内容挤成一行。',
      '手动 open 后忘了 close()，程序异常退出时数据丢失，文件还可能被占用。',
      '用 r 模式打开一个还不存在的文件，直接 FileNotFoundError。',
    ],
    keyPoints: [
      '变量只在运行期间存在，要长期保存数据必须写文件。',
      'open 三个参数：路径、模式、encoding，中文一律 utf-8。',
      'w 清空原文件，a 在末尾追加，r 只读且要求文件已存在。',
      'with 自动关闭文件，是必须养成的标准写法。',
      'write 不自动换行，换行符要自己补。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第10章 文件和异常' },
      { book: 'abs3', chapter: '第10章 读写文件' },
    ],
    prerequisites: ['s5-03'],
    task: '在电脑上建一个 note.txt，用 w 写入今天的三条收获（每行一条），再用 a 追加一行日期，最后用 r 读出来打印，确认四行都在。',
    exercises: [
      {
        id: 's6-01-q1',
        qtype: 'boolean',
        stem: '用 open 打开文件后不关闭也没关系，程序结束时系统会自动把缓冲区内容全部保存好。',
        answer: '错',
        explanation:
          '答案：错。\n思路：写入的内容先进缓冲区，只有关闭文件时才真正落盘。\n逐步演示：写十行却不关闭，程序中途崩溃，缓冲区里没来得及落盘的内容全部丢失，文件还可能被占用。\n易错提醒：正确做法是用 with，离开代码块自动关闭，出错也照关。',
        difficulty: 1,
      },
      {
        id: 's6-01-q2',
        qtype: 'single',
        stem: '文件 log.txt 里已经有三行记录，你想在末尾再加一行，该用哪个模式打开？',
        options: ['A. "r"', 'B. "w"', 'C. "a"', 'D. "x"'],
        answer: 'C',
        explanation:
          '答案：C，追加模式 a。\n思路：关键词是「在末尾再加」，原有内容必须保留。\n逐步演示：a 把写入位置移到末尾；w 会先清空，三行记录立刻消失；r 只能读，写会报错。\n易错提醒：日志、流水账、累计记录一律用 a，不要用 w。',
        difficulty: 1,
      },
      {
        id: 's6-01-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出几行？分别是什么？请写出完整输出。',
        code: `import io

buf = io.StringIO()
buf.write("A\\n")
buf.write("B\\n")
print(len(buf.getvalue()))
print(buf.getvalue().strip())`,
        keywords: [['4'], ['A'], ['B']],
        explanation:
          '答案：第一行 4，之后依次是 A、B 两行。\n思路：StringIO 在内存里模拟文件，getvalue() 取出全部内容。\n逐步演示：A 加换行 2 个字符、B 加换行 2 个字符，共 4；strip 去掉首尾空白后剩两行。\n易错提醒：换行符也算字符，漏掉它就会数成 2。',
        difficulty: 2,
      },
      {
        id: 's6-01-q4',
        qtype: 'blank',
        stem: '打开文件时推荐写成 with open(...) as f，其中能让文件自动关闭的关键字是 ______。',
        answer: 'with',
        accepted: ['with', 'WITH', 'With'],
        explanation:
          '答案：with。\n思路：它是上下文管理器语法，负责离开代码块时自动清理资源。\n逐步演示：写 with open(path, "w", encoding="utf-8") as f: 再缩进写操作，离开缩进块即关闭文件。\n易错提醒：with 下面那行必须缩进，忘了缩进等于「打开后立刻关闭」，接着 write 会报文件已关闭。',
        difficulty: 2,
      },
      {
        id: 's6-01-q5',
        qtype: 'program',
        stem: '用 io.StringIO 模拟文件：依次写入「牛奶」「面包」「鸡蛋」（各占一行），回到开头逐行读出并打印，最后打印「共 3 件」。\n输出四行：三个商品名加「共 3 件」。',
        answer: '',
        testCases: [{ stdin: '', expected: '牛奶\n面包\n鸡蛋\n共 3 件' }],
        explanation:
          '答案（参考答案）：\nimport io\n\nbuf = io.StringIO()\nbuf.write("牛奶\\n")\nbuf.write("面包\\n")\nbuf.write("鸡蛋\\n")\nbuf.seek(0)\n\ncount = 0\nfor line in buf:\n    print(line.strip())\n    count += 1\nprint("共", count, "件")\n\n思路：先写满缓冲区，seek(0) 把读取位置拨回开头，再逐行遍历。\n逐步演示：三次 write 各写商品名加换行；seek(0) 回到起点；每轮 strip 后打印，count 累加到 3。\n易错提醒：忘了 seek(0) 一行都读不到；忘了 strip() 每行之间会多空行。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'local',
  },
  {
    id: 's6-02',
    stageId: 6,
    order: 2,
    title: '文本文件、路径与目录',
    subtitle: '文件到底放在哪、怎么找得到',
    hook: '同样的代码，你这儿跑得好好的，发给同学却报「找不到文件」。问题几乎总在路径上。',
    objectives: [
      '区分绝对路径与相对路径，说出各自风险',
      '用 os.path 和 pathlib 正确拼接路径',
      '用 for 逐行读取大文件而不是一次全读进来',
      '用 strip() 清理每行结尾的换行符',
    ],
    analogy:
      '绝对路径像身份证上的完整地址：省市区路门牌号，全国唯一。相对路径像「我楼下那家便利店」：只有站在某个位置说才成立，换个地方问，指的不是同一家店。',
    terms: [
      { term: '绝对路径', plain: '从盘符开始的完整地址，比如 C:/python-study/data/a.txt。' },
      { term: '相对路径', plain: '相对于当前工作目录的地址，比如 data/a.txt。' },
      { term: '工作目录', plain: '程序运行时所在的文件夹，相对路径以它为起点。' },
      { term: 'pathlib', plain: 'Python 自带的路径工具，用斜杠拼接、直接取文件名。' },
      { term: 'strip()', plain: '去掉字符串首尾空白，主要用来去掉行尾换行符。' },
    ],
    content: `## 一、这一课同样在 Windows + VS Code 本地环境完成

路径只有在真实磁盘上才有意义。浏览器沙箱里没有你电脑的文件系统，所以本课必须在本地跑。请在 VS Code 里用「打开文件夹」的方式打开 python-study 目录，这样相对路径才有明确的起点。

## 二、为什么路径会成为新手第一大坑

程序打开文件时必须知道文件在哪。这件事听着简单，坑却极多：双击运行和在终端里运行，工作目录可能不同，同一个相对路径就指向了不同地方；手打反斜杠时，反斜杠在字符串里是转义符，很容易把路径拼坏；文件夹不存在时，写文件会直接失败。

所以路径的核心只有两条：搞清楚起点在哪，用工具拼接而不是手打。

## 三、绝对路径与相对路径

| 类型 | 写法 | 特点 |
| --- | --- | --- |
| 绝对路径 | C:/python-study/data/scores.txt | 从盘符开始，任何位置都能定位，换电脑就失效 |
| 相对路径 | data/scores.txt | 以工作目录为起点，短、可移植，但依赖你在哪运行 |

经验法则是：自己调试用相对路径，方便整个项目搬家；需要精确定位或写给别人用时，让用户自己指定路径。

## 四、拼路径要用工具，不要手打

| 写法 | 说明 | 结果 |
| --- | --- | --- |
| os.path.join(a, b) | 按系统规则拼接，自动处理分隔符 | a 与 b 连成一个路径 |
| os.path.exists(p) | 判断文件或文件夹是否存在 | True 或 False |
| os.path.basename(p) | 取出文件名部分 | scores.txt |
| os.path.dirname(p) | 取出所在目录部分 | C:/python-study/data |
| os.path.splitext(p)[1] | 取出后缀名 | .txt |
| Path(a) / b | pathlib 的拼接写法 | 用斜杠连接两段 |
| Path.name 与 Path.suffix | 直接取文件名、后缀 | 比切字符串省事 |

为什么不能手打反斜杠：在字符串里反斜杠是转义符，写成 C:\\data\\new.txt 时，其中的 n 会被当成换行，路径当场就坏了。要么用正斜杠，要么用 r 前缀的原始字符串，要么干脆交给 os.path.join。

## 五、逐行读，而不是一次全读进来

两种读法差别巨大。read() 把整个文件一次读成一个大字符串，十行时很方便，一百万行时会把内存吃满。for line in f 一次只给你一行，读完就丢，内存占用恒定。

所以处理日志、名单、导出数据这类可能很大的文件，一律用 for 遍历文件对象。每行末尾都带换行符，直接打印会出现空行，所以要 strip 一下再处理。

## 六、逐步演示

第一步，用 os.path.join 拼一个路径，分别打印文件名、目录、后缀，确认拆分结果。第二步，用 exists 判断文件是否存在，先看 False。第三步，创建 students.txt 写入三行名字和分数，再看 True。第四步，用 for line in f 逐行读，每行先 strip 再 split，拆出名字和分数分别打印。

## 七、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| FileNotFoundError | 相对路径的起点不是你以为的目录 | 打印当前目录，或改绝对路径 |
| 路径里出现奇怪换行 | 手打反斜杠被当成转义符 | 用正斜杠或 os.path.join |
| 每行之间多一个空行 | 行尾换行符没去掉 | 打印前先 strip() |
| 目录已存在却报错 | 创建目录没加 exist_ok | 加 exist_ok=True |
| 内存被吃满 | 用 read() 读了超大文件 | 改成 for line in f |

一句总结：路径用工具拼，文件逐行读，行尾要 strip。这三条能挡掉新手八成以上的文件问题。`,
    examples: [
      {
        title: '用 os.path 拆解一个路径',
        intro: '这段代码不读写文件，只演示拼接、取文件名、取目录、取后缀、判断存在这几个动作。',
        code: `import os

base = "C:/python-study/data"
path = os.path.join(base, "scores.txt")

print("文件名：", os.path.basename(path))
print("所在目录：", os.path.dirname(path))
print("后缀名：", os.path.splitext(path)[1])
print("scores.txt 存在吗：", os.path.exists(path))
print("上一级目录名：", os.path.basename(base))`,
        expectedOutput: `文件名： scores.txt
所在目录： C:/python-study/data
后缀名： .txt
scores.txt 存在吗： False
上一级目录名： data`,
        lines: [
          { code: 'base = "C:/python-study/data"', explain: '用正斜杠写路径，Windows 也认，而且不用考虑转义。' },
          { code: 'os.path.join(base, "scores.txt")', explain: '按系统规则拼接，自动补分隔符，比自己加斜杠安全。' },
          { code: 'os.path.basename(path)', explain: '取路径最后一段，也就是文件名。' },
          { code: 'os.path.splitext(path)[1]', explain: 'split 加 ext，拆出扩展名；返回元组，[1] 取后半段。' },
          { code: 'os.path.exists(path)', explain: '检查路径是否存在。这里文件还没建，所以是 False。' },
        ],
        trace: [
          { step: '第 3 行', state: 'base = "C:/python-study/data"' },
          { step: '第 4 行', state: 'path 拼成 .../data/scores.txt' },
          { step: '第 6-8 行', state: '依次拆出 scores.txt、目录、.txt' },
          { step: '第 9 行', state: '磁盘上没有这个文件，exist 返回 False' },
        ],
        tryIt: '把 base 改成你自己电脑上真实存在的目录，再看「存在吗」这一行。',
      },
      {
        title: 'pathlib 拼路径 + 逐行读取真实文件',
        intro: '这段代码会创建 students.txt 再逐行读出来，按「名字 分数」拆开。注意 for 遍历文件对象这一行。',
        code: `from pathlib import Path

path = Path("students.txt")
with open(path, "w", encoding="utf-8") as f:
    f.write("小林 80\\n")
    f.write("小红 95\\n")
    f.write("小明 67\\n")

print("文件存在吗：", path.exists())
print("文件名：", path.name)

with open(path, "r", encoding="utf-8") as f:
    for line in f:
        name, score = line.strip().split()
        print(name, "的成绩是", score)`,
        expectedOutput: `文件存在吗： True
文件名： students.txt
小林 的成绩是 80
小红 的成绩是 95
小明 的成绩是 67`,
        lines: [
          { code: 'path = Path("students.txt")', explain: 'pathlib 用 Path 包装路径，之后可 .name、.exists()。' },
          { code: 'with open(path, "w", ...) as f:', explain: 'open 既能收字符串也能收 Path 对象，两者等价。' },
          { code: 'print("文件存在吗：", path.exists())', explain: '刚写完立刻检查是 True，这种自检能确认路径没写错。' },
          { code: 'for line in f:', explain: '逐行读取，内存里同时只有一行，大文件也不撑爆。' },
          { code: 'line.strip().split()', explain: '先去掉换行，再按空白切开，得到名字和分数两个字符串。' },
        ],
        trace: [
          { step: '第 3-7 行', state: '文件写入三行，关闭后落盘' },
          { step: '第 9-10 行', state: '输出 True 和 students.txt' },
          { step: '第 12-15 行', state: '每轮取一行，拆成 name 与 score 各打印一句' },
        ],
        tryIt: '把第 5 行改成「小红 95 优秀」，运行看报什么错——这是拆分数量不匹配的典型 ValueError。',
      },
    ],
    compare: [
      {
        conceptA: '绝对路径',
        conceptB: '相对路径',
        diff: '绝对路径从盘符开始，任何地方都能定位；相对路径以工作目录为起点，换个目录运行就指向别处。',
        example: 'C:/a/b.txt 永远指同一个文件；b.txt 只在运行时所在的目录里才对。',
      },
      {
        conceptA: 'read() 一次读全部',
        conceptB: 'for line in f 逐行读',
        diff: '前者把整个文件装进内存，代码短但占内存；后者一次处理一行，几百万行也不崩。',
        example: '读 10 行配置用 read() 方便；读 50 万行日志必须用 for。',
      },
    ],
    pitfalls: [
      '手打反斜杠写路径，被当成转义符，路径变成一串乱码。',
      '以为相对路径以脚本文件位置为起点，实际是运行时的当前目录。',
      '用 read() 读超大文件，程序卡死或内存不足。',
      '逐行读时忘了 strip()，输出里每行之间多一个空行。',
      '创建已存在的目录时没加 exist_ok=True，抛 FileExistsError。',
    ],
    keyPoints: [
      '绝对路径看盘符，相对路径看工作目录，排查「找不到文件」先确认起点。',
      '拼路径用 os.path.join 或 pathlib 的斜杠，不要手打反斜杠。',
      '先 exists 再操作，能避免一半的文件异常。',
      '大文件必须逐行读取，for line in f 是标准写法。',
      '每行末尾都有换行符，处理前记得 strip()。',
    ],
    sources: [{ book: 'abs3', chapter: '第11章 组织文件' }],
    prerequisites: ['s6-01'],
    task: '在 python-study 里建 data 子文件夹，用 os.path.join 拼出 data/todo.txt 的路径，写入三条待办，再逐行读出来给每条加序号打印。',
    exercises: [
      {
        id: 's6-02-q1',
        qtype: 'single',
        stem: '关于相对路径的说法，哪一句是正确的？',
        options: [
          'A. 一定从 C 盘根目录开始算',
          'B. 以程序运行时的当前工作目录为起点',
          'C. 和绝对路径完全等价',
          'D. 只能用于读文件，不能用于写文件',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：「相对」指的就是相对于工作目录。\n逐步演示：在 python-study 里运行，data/a.txt 指向该目录下的文件；换到桌面运行，同一个写法就指向桌面。\n易错提醒：很多人以为起点是 .py 文件所在文件夹，其实取决于你从哪个目录启动解释器。',
        difficulty: 1,
      },
      {
        id: 's6-02-q2',
        qtype: 'boolean',
        stem: '读一个几十万行的日志文件时，用 f.read() 一次读进内存是最省内存的做法。',
        answer: '错',
        explanation:
          '答案：错。\n思路：read() 把整个文件变成一个巨大的字符串，行数越多占内存越大。\n逐步演示：50 万行日志可达几十 MB，全部驻留内存；而 for line in f 一次只放一行，占用恒定。\n易错提醒：省内存的做法是逐行遍历，文件小时看不出差别，变大才暴露。',
        difficulty: 1,
      },
      {
        id: 's6-02-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？（只有一行）',
        code: `import io

buf = io.StringIO("小林 80\\n小红 95\\n")
total = 0
for line in buf:
    name, score = line.split()
    total += int(score)
print(total)`,
        keywords: [['175']],
        explanation:
          '答案：175。\n思路：逐行拆出名字和分数，把分数转整数后累加。\n逐步演示：第一行取到 80，total 变 80；第二行取到 95，total 变 175，循环结束打印。\n易错提醒：忘了 int() 会变成字符串拼接 8095；score 里若带换行，int() 直接报 ValueError。',
        difficulty: 2,
      },
      {
        id: 's6-02-q4',
        qtype: 'blank',
        stem: '逐行读取时每行末尾都带一个换行符，想先去掉它再处理，最常用的字符串方法是 ______。',
        answer: 'strip',
        accepted: ['strip', 'strip()', '.strip', '.strip()', 'strip()方法'],
        explanation:
          '答案：strip()。\n思路：它去掉首尾空白字符，换行符正好属于空白。\n逐步演示：读到 "小林 80\\n"，strip 后变成 "小林 80"，再 split 只得到两部分。\n易错提醒：rstrip 只去右边、lstrip 只去左边，功能更窄；不 strip 直接打印会出现两倍行距。',
        difficulty: 2,
      },
      {
        id: 's6-02-q5',
        qtype: 'program',
        stem: '用 io.StringIO 模拟成绩文件，内容为三行：80、90、70。逐行读取并转换后输出两行：\n第一行：人数 3\n第二行：平均 80.0',
        answer: '',
        testCases: [{ stdin: '', expected: '人数 3\n平均 80.0' }],
        explanation:
          '答案（参考答案）：\nimport io\n\nbuf = io.StringIO("80\\n90\\n70\\n")\ntotal = 0\ncount = 0\nfor line in buf:\n    total += int(line.strip())\n    count += 1\nprint("人数", count)\nprint("平均", total / count)\n\n思路：逐行读、逐行转换、边读边累加，最后总和除以条数。\n逐步演示：三行转成 80、90、70，total 为 240，count 为 3，240 / 3 = 80.0。\n易错提醒：count 用 len(buf) 会得到 0，因为文件指针已在末尾；用 // 得到整数 80，与 80.0 不符。',
        difficulty: 3,
      },
    ],
    minutes: 17,
    env: 'local',
  },
  {
    id: 's6-03',
    stageId: 6,
    order: 3,
    title: 'CSV 文件处理',
    subtitle: '用代码读表格，而不是一行行复制粘贴',
    hook: '同事发来一个 3000 行的销售表，让你算每个业务员的总业绩。手动拖动求和，还是写十行代码？',
    objectives: [
      '说清 CSV 的结构，以及它和 Excel 表的关系',
      '用 csv.reader 逐行读取数据',
      '用 csv.DictReader 按表头取值，不必记列号',
      '写出 CSV 时处理中文乱码与内容含逗号的问题',
    ],
    analogy:
      'CSV 像一张用逗号排版的便签纸：每行一条记录，逗号是分隔符。它没有任何格式和公式，所以什么软件都能打开；也正因为简单，才成了数据交换的通用格式。',
    terms: [
      { term: 'CSV', plain: '逗号分隔值文件，纯文本存的表格，每行一条记录。' },
      { term: '表头', plain: '第一行，写着每一列叫什么名字。' },
      { term: 'csv.reader', plain: '把每行拆成列表，按位置取值。' },
      { term: 'csv.DictReader', plain: '把每行变成字典，按表头名字取值。' },
      { term: 'StringIO', plain: '在内存里假造一个文件，不用真读写磁盘。' },
    ],
    content: `## 一、为什么表格要用 CSV 传

Excel 文件里藏着格式、公式、图表，程序读它要装专门的第三方库，还得处理版本差异。而 CSV 只是纯文本：一行一条记录，字段之间用逗号隔开。

对比一下就很清楚：CSV 是纯文本，用 Python 自带的 csv 模块就能读，但存不了颜色和公式；Excel 是压缩的二进制包，能存格式，读它却要额外装库。所以导出数据、系统对接、批量导入，行业里默认都用 CSV：它虽然朴素，但谁都能读。

## 二、本课在浏览器里就能跑：StringIO 是什么

读文件需要磁盘，浏览器沙箱没有磁盘。解决办法是 io.StringIO：它在内存里假造一个文件对象，你可以往里写字符串，也可以像读文件一样逐行读它。这样 csv 模块的所有用法都能原样练习，一行代码都不用改。等你回到电脑上，把 StringIO 换成 open 就变成真实读写。

真实文件的写法是这样的（需本地环境）：读 CSV 用 with open 加 newline 为空字符串再加 csv.reader；写 CSV 用 w 模式打开，编码写成 utf-8-sig。两个细节值得记住：newline 是官方推荐写法，避免 Windows 上多出空行；utf-8-sig 是给 Excel 看的编码。

## 三、两种读取方式，选哪个

| 写法 | 得到什么 | 适合场景 |
| --- | --- | --- |
| csv.reader | 每行一个列表，如 ["小林", "数学", "88"] | 列数固定、结构简单 |
| csv.DictReader | 每行一个字典，如 {"姓名": "小林", "分数": "88"} | 列多、想按名字取值 |

优先用 DictReader。原因很现实：一旦表格多了一列，用列号取值的代码全部错位，而按表头取值的代码完全不受影响。这个差别在真实项目里非常致命，因为别人的表格说变就变。

## 四、逐步演示

第一步，准备一段 CSV 文本存进变量，注意每行结尾有换行。第二步，用 io.StringIO 包起来，得到可读的文件对象。第三步，交给 csv.reader 遍历，每行打印成列表，先看清结构。第四步，换成 DictReader 打印一整行字典，确认键就是表头。第五步，把分数转成整数按人汇总，再用 csv.writer 写回一个 StringIO，用 getvalue 取出结果。

## 五、两个必须知道的坑

坑一，内容里本身有逗号。比如「上海, 浦东」这种地址，直接拼进 CSV 会被当成两列，整行错位。标准做法是用英文双引号把整个字段包起来，csv 模块在写的时候会自动加。

坑二，Excel 打开中文乱码。用 utf-8 写的中文 CSV，双击用 Excel 打开常常是乱码，因为 Excel 默认按本地编码解析。解决办法是写文件时用 utf-8-sig，开头那段 BOM 会告诉 Excel 这是 UTF-8。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 每行多出一个空行 | 写 CSV 时没加 newline 空字符串 | 打开时加上 newline |
| 数字算成了字符串拼接 | CSV 读出来全是字符串 | 计算前用 int 或 float 转换 |
| Excel 打开中文乱码 | 文件是 utf-8 无 BOM | 改用 utf-8-sig |
| 列错位、数据串行 | 字段含逗号却没加引号 | 用 csv.writer 自动加引号 |
| KeyError: 姓名 | 表头有空格或名字写错 | 先打印第一行确认表头原文 |

## 七、一个提醒

最后提醒一句：别用记事本手工编辑 CSV 里的逗号，一不小心就多出一列，读的时候列数对不上，报错信息还指不到真正的原因。
`,
    examples: [
      {
        title: '用 csv.reader 读一份内存里的 CSV',
        intro: '不需要任何文件，浏览器里就能跑通。它把每行拆成列表，让你先看清 CSV 的原始结构。',
        code: `import csv
import io

raw = "姓名,科目,分数\\n小林,数学,88\\n小林,英语,92\\n小红,数学,95\\n"
f = io.StringIO(raw)

reader = csv.reader(f)
for row in reader:
    print(row)`,
        expectedOutput: `['姓名', '科目', '分数']
['小林', '数学', '88']
['小林', '英语', '92']
['小红', '数学', '95']`,
        lines: [
          { code: 'raw = "姓名,科目,分数\\n..."', explain: '这就是 CSV 文件里的全部内容：表头一行，三条数据。' },
          { code: 'f = io.StringIO(raw)', explain: '把字符串包装成「像文件一样能读」的对象。' },
          { code: 'reader = csv.reader(f)', explain: '按逗号拆字段并自动处理引号，不用自己 split 逗号。' },
          { code: 'for row in reader:', explain: '每次给出一行，类型是列表，元素全是字符串。' },
          { code: 'print(row)', explain: '列表打印会带方括号和引号，那是显示方式，不是文件里有这些符号。' },
        ],
        trace: [
          { step: '第 6 行', state: 'f 里存着 4 行文本，读取位置在开头' },
          { step: '第 1 轮', state: 'row 是三个字符串组成的列表' },
          { step: '第 2 轮', state: 'row = [小林, 数学, 88]，88 是字符串' },
          { step: '第 3-4 轮', state: '读完剩下两行，迭代结束' },
        ],
        tryIt: '把某个字段改成带逗号的样子，例如用双引号包住「数学,进阶」，体会引号如何保护内容。',
      },
      {
        title: 'DictReader 按表头汇总，再生成一份新 CSV',
        intro: '真实工作最常见的流程：读进来、按业务规则汇总、写出结果。按表头取值让代码不怕列顺序变化。',
        code: `import csv
import io

raw = "姓名,科目,分数\\n小林,数学,88\\n小林,英语,92\\n小红,数学,95\\n"

total = {}
reader = csv.DictReader(io.StringIO(raw))
for row in reader:
    name = row["姓名"]
    total[name] = total.get(name, 0) + int(row["分数"])

print("按人汇总：", total)

out = io.StringIO()
writer = csv.writer(out)
writer.writerow(["姓名", "总分"])
for name, score in total.items():
    writer.writerow([name, score])

print("--- 生成的 CSV ---")
print(out.getvalue().strip())`,
        expectedOutput: `按人汇总： {'小林': 180, '小红': 95}
--- 生成的 CSV ---
姓名,总分
小林,180
小红,95`,
        lines: [
          { code: 'csv.DictReader(io.StringIO(raw))', explain: '第一行当表头，之后每行变成字典，键就是表头文字。' },
          { code: 'name = row["姓名"]', explain: '按名字取值，不用记「姓名是第 0 列」，表头顺序变了也不怕。' },
          { code: 'total.get(name, 0) + int(row["分数"])', explain: 'get 表示没有就按 0 算，避免第一次遇到某人时 KeyError；分数要 int 转换。' },
          { code: 'writer = csv.writer(out)', explain: '写 CSV 也别手动拼逗号，writer 会自动给含逗号的内容加引号。' },
          { code: 'writer.writerow([...])', explain: '一次写一行，列表里每一项就是该行的一个字段。' },
          { code: 'out.getvalue().strip()', explain: '取出全部内容并去掉末尾多余换行，避免多一个空行。' },
        ],
        trace: [
          { step: '第 1 轮', state: 'total = {小林: 88}' },
          { step: '第 2 轮', state: '小林再加 92，total = {小林: 180}' },
          { step: '第 3 轮', state: '小红 95，total = {小林: 180, 小红: 95}' },
          { step: '写回阶段', state: 'out 里依次写入表头行和两条数据行' },
        ],
        tryIt: '把表头顺序换成「分数,姓名,科目」，代码不改再跑，看结果是否仍正确。',
      },
    ],
    compare: [
      {
        conceptA: 'csv.reader（列表）',
        conceptB: 'csv.DictReader（字典）',
        diff: '前者按列号取值，列顺序一变就错位；后者按表头名字取值，顺序随意调都不受影响。',
        example: 'row[2] 遇到新增一列就取错；row["分数"] 永远取到分数那一列。',
      },
      {
        conceptA: 'utf-8',
        conceptB: 'utf-8-sig',
        diff: '前者是标准 UTF-8；后者在文件开头多写三个字节的 BOM，专门告诉 Excel「我是 UTF-8」。',
        example: '给程序读的 CSV 用 utf-8；给同事双击用 Excel 打开的 CSV 用 utf-8-sig。',
      },
    ],
    pitfalls: [
      'CSV 读出来的数字其实是字符串，直接相加会变成 8892 这种拼接结果。',
      '手工用逗号拼接字段，内容里一旦有逗号整行错位。',
      '写 CSV 时没加 newline 空字符串，Windows 上每行之间多出空行。',
      '用 utf-8 写的中文 CSV，Excel 双击打开是乱码。',
      '表头里有空格或全角字符，按名字取值时报 KeyError。',
    ],
    keyPoints: [
      'CSV 是纯文本表格，一行一条记录，逗号分隔字段。',
      'csv.reader 给列表，csv.DictReader 给字典，按表头取值更稳。',
      'CSV 读出来全是字符串，参与计算前必须转换类型。',
      'StringIO 在内存里模拟文件，让文件代码在浏览器里也能练。',
      '给 Excel 看的中文 CSV 用 utf-8-sig，程序自己读的用 utf-8。',
    ],
    sources: [{ book: 'abs3', chapter: '第18章 CSV、JSON 和 XML 文件' }],
    prerequisites: ['s6-02', 's3-04'],
    task: '用 StringIO 造一份四行的成绩 CSV，用 DictReader 算出每人总分，再用 csv.writer 输出两列的新 CSV 并打印。',
    exercises: [
      {
        id: 's6-03-q1',
        qtype: 'single',
        stem: '关于 CSV 文件，哪一句描述正确？',
        options: [
          'A. 是二进制格式，必须用专门软件打开',
          'B. 是纯文本表格，每行一条记录，字段用逗号分隔',
          'C. 能保存单元格颜色和公式',
          'D. 读 CSV 必须安装第三方库',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：CSV 的全称就是「逗号分隔值」，本质是纯文本。\n逐步演示：用记事本打开就能看到原始逗号和换行；Python 自带 csv 模块不需要安装；颜色公式属于 Excel 格式。\n易错提醒：正因为是纯文本、谁都能读，它才成为数据交换的事实标准。',
        difficulty: 1,
      },
      {
        id: 's6-03-q2',
        qtype: 'boolean',
        stem: '用 csv.reader 读出来的分数「88」，可以直接和整数相加得到 88，不需要类型转换。',
        answer: '错',
        explanation:
          '答案：错。\n思路：CSV 里所有内容都是文字，读出来一律是字符串。\n逐步演示：「88」加 5 会报 TypeError；必须 int("88") 变成数字才能计算。\n易错提醒：两个字符串相加不报错但结果怪（如 8892），正是忘了转换类型的典型症状。',
        difficulty: 1,
      },
      {
        id: 's6-03-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行输出。',
        code: `import csv
import io

r = csv.reader(io.StringIO("a,1\\nb,2\\n"))
rows = list(r)
print(len(rows))
print(rows[1][0])`,
        keywords: [['2'], ['b']],
        explanation:
          '答案：第一行 2，第二行 b。\n思路：list(r) 把所有行一次性取出，变成二维列表。\n逐步演示：CSV 有两行数据，rows 长度为 2；rows[1] 是第二行，再取 [0] 得到 b。\n易错提醒：下标从 0 开始，rows[1] 是第二行；写成 rows[2] 会报 IndexError。',
        difficulty: 2,
      },
      {
        id: 's6-03-q4',
        qtype: 'blank',
        stem: '读 CSV 时想按表头名字取值，应该使用 csv 模块里的 ______ 类。',
        answer: 'DictReader',
        accepted: ['DictReader', 'dictreader', 'csv.DictReader', '字典读取器'],
        explanation:
          '答案：DictReader。\n思路：Dict 说明它把每行读成字典，键来自表头。\n逐步演示：用 DictReader 读第一行当表头，之后每行返回字典，可直接按列名取值。\n易错提醒：表头行不会被当成数据返回；表头若有空格，键名也会带空格，用之前先打印确认。',
        difficulty: 2,
      },
      {
        id: 's6-03-q5',
        qtype: 'program',
        stem: '用 io.StringIO 构造 CSV，表头「姓名,分数」，数据两行「小林,80」「小红,90」。用 DictReader 读出分数求和，输出一行：总分 170',
        answer: '',
        testCases: [{ stdin: '', expected: '总分 170' }],
        explanation:
          '答案（参考答案）：\nimport csv\nimport io\n\nraw = "姓名,分数\\n小林,80\\n小红,90\\n"\ntotal = 0\nfor row in csv.DictReader(io.StringIO(raw)):\n    total += int(row["分数"])\nprint("总分", total)\n\n思路：DictReader 按表头取值，分数转整数后累加。\n逐步演示：表头不参与循环；两行分别取到 80 和 90，total 变 170。\n易错提醒：忘了 int() 变成拼接 8090；用 csv.reader 却写 row["分数"] 会报 TypeError。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's6-04',
    stageId: 6,
    order: 4,
    title: 'JSON 文件处理',
    subtitle: '程序之间最通用的一种数据格式',
    hook: '手机 App 收到的那条订单、网页加载出来的商品列表，在你看到之前都是同一串 JSON 文字。',
    objectives: [
      '看懂 JSON 与 Python 字典、列表的对应关系',
      '用 json.dumps 把字典转成 JSON 字符串',
      '用 json.loads 把 JSON 字符串还原成字典',
      '用 ensure_ascii=False 与 indent 输出可读的中文',
    ],
    analogy:
      'JSON 像一种「通用表格语言」：不管对方是手机、服务器还是浏览器，都认这套写法。字典是它在本地的样子，JSON 是它出门旅行时的样子，两者随时可以互换。',
    terms: [
      { term: 'JSON', plain: '用文字表示数据的通用格式，长得几乎和 Python 字典一样。' },
      { term: '序列化', plain: '把字典、列表变成一串文字，方便存文件或发网络。' },
      { term: '反序列化', plain: '把那串文字还原成字典、列表。' },
      { term: 'json.dumps', plain: 'd 是 dump，s 是 string：转成字符串。' },
      { term: 'ensure_ascii', plain: '设成 False 才不会把中文转成一堆编码。' },
    ],
    content: `## 一、为什么要有 JSON

程序之间传数据，必须约定一种双方都认识的写法。CSV 只能表达规整的表格，遇到嵌套结构就没辙了——一个订单里有多个商品，每个商品又有多个属性，这种层次用逗号根本表达不出来。

JSON 就是为这件事发明的：它能表达数字、文字、真假、列表和嵌套对象，而且是纯文本，任何语言都能解析。你在网页接口、配置文件、App 缓存里看到的数据，基本都是 JSON。

## 二、JSON 和 Python 长得几乎一样

| Python 里的 | JSON 里的 | 说明 |
| --- | --- | --- |
| 字典 dict | 对象 {} | 键必须是字符串，且用双引号 |
| 列表 list | 数组 [] | 有序的一串值 |
| 字符串 str | 字符串 "" | JSON 只认双引号 |
| 整数、小数 | 数字 | 不加引号 |
| True / False | true / false | 小写 |
| None | null | 完全不同的写法 |

两个易错点：JSON 的字符串只能用双引号，单引号是非法的；真假和空值要写成小写的 true、false、null。这三处差异几乎每个人都会踩一次。

## 三、四个函数，两个方向

| 函数 | 方向 | 用途 |
| --- | --- | --- |
| json.dumps(对象) | 字典转字符串 | 存文件前、发请求前 |
| json.loads(字符串) | 字符串转字典 | 读到数据后解析 |
| json.dump(对象, 文件) | 字典直接写进文件 | 真实文件读写，需本地环境 |
| json.load(文件) | 文件转字典 | 真实文件读写，需本地环境 |

记法很简单：带 s 的 dumps、loads 处理字符串，不带 s 的处理文件对象，这个 s 就是 string。用错组合时报错信息往往很含糊，所以先记住这条。

三个常用参数：ensure_ascii 设成 False 才能保留中文，默认值 True 会把中文转成编码字符；indent 设成 2 会按两层缩进美化，给人看时用，给程序读时不必；sort_keys 设成 True 会按键名排序，方便对比两份文件的差异。

## 四、本课在浏览器里怎么跑

真实读写文件需要磁盘，所以本课示例统一用字符串演示：先用 dumps 生成一段 JSON 文字，再用 loads 把它读回字典。这套流程和真实文件完全一致，只是最后一步换成写文件而已。

回到电脑上，写入用 with open 加 w 模式，再调 json.dump 并传 ensure_ascii 和 indent；读取用 with open 加 r 模式，再调 json.load 直接得到字典。整个结构和你已经熟悉的文件读写一模一样。

## 五、逐步演示

第一步，准备一个字典，包含字符串、数字、列表、布尔值四类内容。第二步，用 dumps 加上 ensure_ascii 为 False 和 indent 为 2，打印出来看清层次。第三步，去掉 indent 再打印一次，对比紧凑版和美化版。第四步，用 loads 把那段文字读回字典，验证类型是 dict。第五步，改一个值、加一个新键，再 dumps 一次，确认修改生效。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 中文全变成编码字符 | 用了默认的 ensure_ascii | 加 ensure_ascii=False |
| JSONDecodeError | 字符串不是合法 JSON，比如用了单引号 | 检查引号、逗号和末尾多余逗号 |
| KeyError | 键名拼错，或数据里没这个键 | 先打印 keys()，或用 get 取值 |
| 写入的 JSON 挤成一行 | 没加 indent | 加 indent=2 |
| 读文件时 TypeError | 把文件对象传给了 loads | 带 s 的收字符串，不带的收文件 |`,
    examples: [
      {
        title: '把字典转成 JSON 文字',
        intro: '同一个字典，带缩进和不带缩进各输出一次，能直观看到 indent 的作用，也能确认中文有没有被保留。',
        code: `import json

student = {
    "name": "小林",
    "age": 20,
    "skills": ["Python", "Excel"],
    "active": True,
}

text = json.dumps(student, ensure_ascii=False, indent=2)
print(text)
print("--- 一行版本 ---")
print(json.dumps(student, ensure_ascii=False))`,
        expectedOutput: `{
  "name": "小林",
  "age": 20,
  "skills": [
    "Python",
    "Excel"
  ],
  "active": true
}
--- 一行版本 ---
{"name": "小林", "age": 20, "skills": ["Python", "Excel"], "active": true}`,
        lines: [
          { code: 'student = {...}', explain: '字典的键用双引号包着，这是习惯写法，JSON 也只接受双引号。' },
          { code: 'json.dumps(student, ensure_ascii=False, indent=2)', explain: 'ensure_ascii 保住中文，indent 按两层缩进排版。' },
          { code: 'print(text)', explain: '输出多行结构，每层缩进两个空格，嵌套关系一眼可见。' },
          { code: 'json.dumps(student, ensure_ascii=False)', explain: '不加 indent 输出紧凑一行，体积小，适合发给程序。' },
          { code: '"active": true', explain: 'Python 的 True 到 JSON 里变成小写 true，这是格式规定。' },
        ],
        trace: [
          { step: '第 3-8 行', state: 'student 是含 4 个键的字典' },
          { step: '第 10 行', state: 'text 是带缩进的多行 JSON 文字' },
          { step: '第 11 行', state: '输出 7 行结构化 JSON' },
          { step: '第 13 行', state: '输出单行紧凑 JSON，中文保持不变' },
        ],
        tryIt: '删掉 ensure_ascii=False 再运行，看看中文那一行变成了什么。',
      },
      {
        title: '把 JSON 文字读回字典并修改',
        intro: '最典型的处理流程：收到一串 JSON，解析成字典，改值、加字段，再转回 JSON。',
        code: `import json

line = '{"name": "小林", "age": 20, "skills": ["Python", "Excel"]}'
data = json.loads(line)

print(type(data))
print(data["name"])
print(data["skills"][0])
print("键的数量：", len(data))

data["age"] = data["age"] + 1
data["city"] = "杭州"
print(json.dumps(data, ensure_ascii=False))`,
        expectedOutput: `<class 'dict'>
小林
Python
键的数量： 3
{"name": "小林", "age": 21, "skills": ["Python", "Excel"], "city": "杭州"}`,
        lines: [
          { code: 'line = \'{"name": "小林", ...}\'', explain: '外层单引号是 Python 字符串的定界符，里面双引号才是 JSON 语法。' },
          { code: 'data = json.loads(line)', explain: 'loads 把文字解析成 Python 对象：对象变字典，数组变列表。' },
          { code: 'print(type(data))', explain: '确认类型是 dict，说明解析成功，可以当普通字典用。' },
          { code: 'data["skills"][0]', explain: '字典取出列表，再取第一个元素，得到 Python。' },
          { code: 'json.dumps(data, ensure_ascii=False)', explain: '改完再转回字符串，新增的 city 也一起写入。' },
        ],
        trace: [
          { step: '第 3 行', state: 'line 是一段 JSON 文本' },
          { step: '第 4 行', state: 'data 变成含三个键的字典' },
          { step: '第 6-9 行', state: '依次输出 dict、小林、Python、3' },
          { step: '第 11-13 行', state: 'age 变 21，新增 city，输出新 JSON' },
        ],
        tryIt: '把 line 里某个双引号改成单引号再运行，读一下 JSONDecodeError 说了什么。',
      },
    ],
    compare: [
      {
        conceptA: 'json.dumps / json.loads',
        conceptB: 'json.dump / json.load',
        diff: '带 s 的处理字符串，不带的直接处理文件对象，省去自己 write 和 read 的步骤。',
        example: 'dumps 得到一段文字；dump(data, f) 直接写进已打开的文件。',
      },
      {
        conceptA: '字典（Python 对象）',
        conceptB: 'JSON（文本）',
        diff: '字典在内存里，能存任意 Python 对象；JSON 是纯文本，只支持有限几种类型，但能跨语言传输。',
        example: '字典里的 True 转成 JSON 是 true；JSON 里没有元组，也没有日期类型。',
      },
    ],
    pitfalls: [
      '忘了 ensure_ascii=False，中文全部变成编码字符，完全不可读。',
      'JSON 里用单引号包字符串，loads 直接抛 JSONDecodeError。',
      '把文件对象传给 loads，或把字符串传给 load，报 TypeError。',
      '写完发现全挤一行——没加 indent，人根本没法检查内容。',
      'JSON 末尾多了一个逗号，这在 Python 里合法，在 JSON 里非法。',
    ],
    keyPoints: [
      'JSON 是通用的文本数据格式，结构对应字典和列表。',
      'dumps 转成字符串，loads 还原成对象。',
      '写中文必须 ensure_ascii=False。',
      'indent 只影响可读性，给程序读的数据不必美化。',
      '真实文件用 dump/load，字符串用 dumps/loads。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第10章 文件和异常' },
      { book: 'abs3', chapter: '第18章 CSV、JSON 和 XML 文件' },
    ],
    prerequisites: ['s3-07'],
    task: '把一个自己的信息字典（姓名、年龄、爱好列表、是否在学编程）用 dumps 输出美化版和紧凑版各一份，再 loads 读回，改掉一个字段后重新输出。',
    exercises: [
      {
        id: 's6-04-q1',
        qtype: 'single',
        stem: '想把 Python 字典变成一段 JSON 文字（字符串），应该用哪个函数？',
        options: ['A. json.load', 'B. json.loads', 'C. json.dump', 'D. json.dumps'],
        answer: 'D',
        explanation:
          '答案：D，json.dumps。\n思路：dump 是「写出」，s 代表 string。\n逐步演示：dumps 返回字符串，可直接打印或发送；dump 需要传已打开的文件；load 和 loads 方向相反。\n易错提醒：记成「有 s 的玩字符串，没 s 的玩文件」，四个函数一次分清。',
        difficulty: 1,
      },
      {
        id: 's6-04-q2',
        qtype: 'boolean',
        stem: 'JSON 里表示真假的写法是 True 和 False，和 Python 完全一样。',
        answer: '错',
        explanation:
          '答案：错。\n思路：JSON 规定布尔值必须小写。\n逐步演示：Python 的 True 转出去变成 true，None 变成 null，loads 时又会自动转回来。\n易错提醒：手写 JSON 配置文件最容易在这里出错，写成 True 会导致 JSONDecodeError。',
        difficulty: 1,
      },
      {
        id: 's6-04-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？（只有一行）',
        code: `import json

data = {"a": 1, "b": [2, 3]}
print(json.dumps(data))`,
        keywords: [['{"a": 1, "b": [2, 3]}']],
        explanation:
          '答案：{"a": 1, "b": [2, 3]}。\n思路：dumps 默认不加缩进，输出紧凑一行，冒号后和逗号后各有一个空格。\n逐步演示：a 的值是 1，b 是列表 [2, 3]；转成 JSON 后键名带双引号，列表用方括号。\n易错提醒：键名一定带双引号，这是它和 Python 字典打印结果最直观的差别。',
        difficulty: 2,
      },
      {
        id: 's6-04-q4',
        qtype: 'blank',
        stem: '希望 json.dumps 输出时保留中文而不是变成编码字符，需要加参数 ensure_ascii=______。',
        answer: 'False',
        accepted: ['False', 'false', 'FALSE', '0'],
        explanation:
          '答案：False。\n思路：这个参数问的是「要不要强制用 ASCII 表示」，回答 False 就是不强制。\n逐步演示：默认 True 时中文变编码；改成 False 后原样输出「小林」。\n易错提醒：写成字符串 "False" 是非空字符串，会被当成真值，等于没改。',
        difficulty: 2,
      },
      {
        id: 's6-04-q5',
        qtype: 'program',
        stem: '已知 JSON 文字：{"name": "小林", "score": 80}\n请用 loads 解析成字典，把 score 加 12，然后输出两行：\n第一行：小林 92\n第二行：修改后的 JSON 文字（ensure_ascii=False）',
        answer: '',
        testCases: [{ stdin: '', expected: '小林 92\n{"name": "小林", "score": 92}' }],
        explanation:
          '答案（参考答案）：\nimport json\n\ndata = json.loads(\'{"name": "小林", "score": 80}\')\ndata["score"] = data["score"] + 12\nprint(data["name"], data["score"])\nprint(json.dumps(data, ensure_ascii=False))\n\n思路：先解析成字典才能改值，改完再转回字符串。\n逐步演示：score 从 80 变 92；print 用逗号连接，中间自动一个空格；dumps 保持键的顺序。\n易错提醒：直接在 JSON 字符串上做替换行不通；别忘 ensure_ascii=False。',
        difficulty: 3,
      },
    ],
    minutes: 17,
    env: 'browser',
  },
  {
    id: 's6-05',
    stageId: 6,
    order: 5,
    title: '异常的概念与常见异常类型',
    subtitle: '程序跑着跑着突然红了，到底发生了什么',
    hook: '程序前九十九次都跑得好好的，第一百次输入了一个空值，屏幕上刷出一整段红色英文。',
    objectives: [
      '区分语法错误与运行时异常',
      '说出五种常见异常各自在什么情况下触发',
      '看懂异常发生时程序为什么会停在那里',
      '看到报错时先判断属于哪一类异常',
    ],
    analogy:
      '异常像开车时的仪表盘警报：不是车坏了，而是某个条件不满足了。警报响了还硬开才危险。程序也一样，异常本身是提醒，不理它才会出事故。',
    terms: [
      { term: '异常', plain: '程序运行中遇到的「这件事我做不到」，比如把文字转成数字。' },
      { term: '抛出', plain: '程序发现做不到，主动报告一个异常，这个动作叫抛出。' },
      { term: 'Traceback', plain: '异常没被处理时打印出的那段调用过程记录。' },
      { term: '语法错误', plain: '代码还没开始跑就被拒绝，括号引号写错一类。' },
      { term: '异常类型', plain: '异常的名字，比如 ValueError，用来区分不同毛病。' },
    ],
    content: `## 一、错误和异常不是一回事

新手常把两者混着说，其实差别很大。语法错误在代码还没开始执行时就暴露，写完保存，编辑器立刻画红线，用 try 也抓不住；运行时异常要执行到那一行才发生，取决于运行时拿到什么数据，可以用 try 捕获后继续跑。

一句话概括：语法错误是话说不通，运行时异常是话说通了但事情办不到。分清这一点，你才知道该改代码，还是该加保护。

## 二、异常到底是什么

异常是 Python 的一种报告机制。当它遇到做不到的事，比如要把文字转换成整数，它不会硬编一个结果，而是抛出一个异常对象，然后立刻中断当前这条执行路径，把控制权交给上一层。

如果一路上没人处理它，程序就打印 Traceback 然后停止。所以异常并不可怕，它其实是在明确告诉你：哪个文件、哪一行、什么毛病。真正吓人的是不报错却算错的情况。

## 三、五种最常见的异常

| 异常类型 | 什么时候出现 | 例子 |
| --- | --- | --- |
| ValueError | 类型对但值不对，转换失败 | int("abc") |
| TypeError | 类型不匹配，操作无法进行 | "总分" + 90 |
| KeyError | 字典里没有这个键 | {"a": 1}["b"] |
| IndexError | 下标超出范围 | [1, 2, 3][5] |
| FileNotFoundError | 要打开的文件不存在 | open("没有这个文件") |

再补一个极常见的 ZeroDivisionError：除数为 0 时触发。区分它们有个简单办法：看问题出在值、类型、键、位置，还是文件。

## 四、异常发生时程序会怎样

这一点必须理解透：异常一旦抛出，当前这一行之后的代码不会执行，函数立刻结束并把异常向上传递，直到有人处理或者程序整体崩溃。

所以我们常看到「前面几行都正常输出了，后面全没了」。那不是代码写错，而是中间某一行抛了异常，后面的路被截断了。理解这一点，你就不会在「为什么后面的 print 没执行」上浪费时间。

## 五、逐步演示

第一步，写一行 int("abc")，观察 ValueError 的内容是 invalid literal for int。第二步，写字符串加 90，观察 TypeError 说的是 can only concatenate str。第三步，用一个只有两个键的字典取第三个键，读 KeyError 里那个键名。第四步，用越界下标取列表元素，读 list index out of range。第五步，打开一个不存在的文件，读 FileNotFoundError 里的 Errno 2。

每一步都要注意：报错最后一行同时给了异常类型和具体描述，这两样就是你排查的入口。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 以为 int("3.5") 能成功 | 小数点不是整数字符 | 小数用 float() 转 |
| 把 "12" 当数字相加 | 字符串加字符串是拼接 | 先 int 或 float 转换 |
| 用 row[3] 取字典的值 | 字典只能用键，不能用位置 | 改成按键名取值 |
| 下标差一位越界 | 忘了下标从 0 开始 | 最后一项是长度减一 |
| 打开文件报 FileNotFoundError | 路径不对或文件不存在 | 先用 exists 查一下 |

## 七、一句话记住

一句话记住这一课：异常是「运行时才暴露的问题」，读 Traceback 时先看最后一行的类型，再往上找自己写的那一行，中间那些库的调用栈可以先跳过。
`,
    examples: [
      {
        title: '五种异常，一次看全',
        intro: '每段都用 try 包住，程序不会中断，可以一次看完五种异常的真实报错。逐条对照报错里的关键字。',
        code: `try:
    int("abc")
except ValueError as e:
    print("ValueError:", e)

try:
    "总分" + 90
except TypeError as e:
    print("TypeError:", e)

try:
    {"name": "小林"}["age"]
except KeyError as e:
    print("KeyError:", e)

try:
    [10, 20, 30][5]
except IndexError as e:
    print("IndexError:", e)

try:
    open("no-such-file.txt", "r", encoding="utf-8")
except FileNotFoundError as e:
    print("FileNotFoundError:", e)`,
        expectedOutput: `ValueError: invalid literal for int() with base 10: 'abc'
TypeError: can only concatenate str (not "int") to str
KeyError: 'age'
IndexError: list index out of range
FileNotFoundError: [Errno 2] No such file or directory: 'no-such-file.txt'`,
        lines: [
          { code: 'int("abc")', explain: '类型是字符串没错，但内容不是数字，属于值不合法，所以是 ValueError。' },
          { code: '"总分" + 90', explain: '字符串和整数不能相加，属于类型不匹配，报 TypeError。' },
          { code: '{"name": "小林"}["age"]', explain: '字典里只有 name 键，取 age 报 KeyError，信息里带着这个键名。' },
          { code: '[10, 20, 30][5]', explain: '三项列表合法下标是 0、1、2，取 5 越界，报 IndexError。' },
          { code: 'open("no-such-file.txt", ...)', explain: '文件不存在报 FileNotFoundError，方括号里的 Errno 2 是系统原因编号。' },
        ],
        trace: [
          { step: '第 1-3 行', state: 'int 转换失败，被 except 抓住，打印 ValueError' },
          { step: '第 5-7 行', state: '字符串加整数失败，打印 TypeError' },
          { step: '第 9-19 行', state: '依次触发 KeyError、IndexError、FileNotFoundError' },
          { step: '结束', state: '五段都处理过，程序正常走完，没有崩溃' },
        ],
        tryIt: '把 int("abc") 改成 int("3.5")，看报错变了吗；再改成 float("3.5")，看还会不会报错。',
      },
      {
        title: '异常会让当前这条路径立刻中断',
        intro: '演示「抛异常那一行之后的代码不会执行」。注意「这一行不会执行」从未出现在输出里。',
        code: `def divide(a, b):
    print("准备计算", a, "/", b)
    result = a / b
    print("这一行不会执行")
    return result

try:
    print(divide(10, 0))
except ZeroDivisionError as e:
    print("捕获到：", e)

print("程序继续往下走")`,
        expectedOutput: `准备计算 10 / 0
捕获到： division by zero
程序继续往下走`,
        lines: [
          { code: 'print("准备计算", a, "/", b)', explain: '这一行在异常之前，所以正常输出。' },
          { code: 'result = a / b', explain: 'b 是 0，除零非法，这里直接抛 ZeroDivisionError。' },
          { code: 'print("这一行不会执行")', explain: '异常一出，函数立刻中断，这一行永远轮不到。' },
          { code: 'except ZeroDivisionError as e:', explain: '捕获后异常对象起名 e，打印出来是 division by zero。' },
          { code: 'print("程序继续往下走")', explain: '异常被处理掉，程序恢复执行，这一行照常输出。' },
        ],
        trace: [
          { step: '进入函数', state: '输出「准备计算 10 / 0」' },
          { step: '执行 a / b', state: 'b 为 0，抛 ZeroDivisionError，函数立即中断' },
          { step: '回到 except', state: 'e 里是 division by zero' },
          { step: '最后一行', state: '程序继续执行，输出「程序继续往下走」' },
        ],
        tryIt: '把 divide(10, 0) 改成 divide(10, 2)，看看那句「这一行不会执行」是不是真的出现了。',
      },
    ],
    compare: [
      {
        conceptA: 'ValueError',
        conceptB: 'TypeError',
        diff: '前者类型对但值不合法；后者类型本身就不该出现在这里。',
        example: 'int("abc") 报 ValueError；"abc" + 1 报 TypeError。',
      },
      {
        conceptA: '语法错误',
        conceptB: '运行时异常',
        diff: '语法错误在运行前被拦下，try 抓不住；运行时异常在执行中发生，可捕获后继续跑。',
        example: '少写右括号是 SyntaxError；除以 0 是 ZeroDivisionError，可捕获。',
      },
    ],
    pitfalls: [
      '以为异常就是「电脑出问题了」，其实是数据或写法不满足要求。',
      '把 int("3.5") 当合法转换，实际报 ValueError，小数要用 float。',
      '用数字下标去取字典的值，字典只能按键取。',
      '看到报错只盯着第一行，忽略最后一行才是结论。',
      '以为异常处理后从出错那行继续，实际是从 except 之后继续。',
    ],
    keyPoints: [
      '语法错误在运行前发现，运行时异常在执行中抛出。',
      '五种高频异常：ValueError、TypeError、KeyError、IndexError、FileNotFoundError。',
      '异常抛出后当前路径立刻中断，后面那一行不会执行。',
      '报错最后一行给类型和描述，最值得先看。',
      '异常不是故障，而是程序在明确告诉你哪里做不到。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第10章 文件和异常' },
      { book: 'abs3', chapter: '第4章 4.8 节 异常处理' },
    ],
    prerequisites: ['s5-03'],
    task: '写出五种常见异常各一句触发代码并逐个运行，把每种报错的最后一行抄下来。以后看到熟悉的报错，就能立刻判断类型。',
    exercises: [
      {
        id: 's6-05-q1',
        qtype: 'single',
        stem: '执行 int("abc") 会抛出哪种异常？',
        options: ['A. TypeError', 'B. ValueError', 'C. KeyError', 'D. SyntaxError'],
        answer: 'B',
        explanation:
          '答案：B，ValueError。\n思路：参数类型是字符串，类型没错，错的是内容不是数字。\n逐步演示：int 拿到 abc，按十进制解析失败，抛 ValueError 并提示 invalid literal。\n易错提醒：TypeError 是「类型都不对」，比如把列表传给 int；这里是同一类型下值不合法。',
        difficulty: 1,
      },
      {
        id: 's6-05-q2',
        qtype: 'boolean',
        stem: '异常抛出后，如果没有任何地方处理它，程序会跳过出错的那一行继续执行后面的代码。',
        answer: '错',
        explanation:
          '答案：错。\n思路：异常抛出会中断当前执行路径，不是跳过一行。\n逐步演示：函数里发生异常，函数立刻结束并向上传递；一路无人处理，程序打印 Traceback 后整体停止。\n易错提醒：「跳过继续」是 try 捕获后才有的效果，未处理的异常直接终止程序。',
        difficulty: 1,
      },
      {
        id: 's6-05-q3',
        qtype: 'predict',
        stem: '下面代码运行时会抛出哪种异常？只写异常类型名。',
        code: `nums = [1, 2, 3]
print(nums[3])`,
        keywords: [['IndexError', '下标', '越界']],
        explanation:
          '答案：IndexError（列表下标越界）。\n思路：三项列表的合法下标只有 0、1、2。\n逐步演示：访问 nums[3] 时解释器检查范围，发现超出最大下标，抛出 list index out of range。\n易错提醒：最后一项的下标是长度减一，不是长度本身，这是差一错误高发区。',
        difficulty: 2,
      },
      {
        id: 's6-05-q4',
        qtype: 'blank',
        stem: '用字典取值时，如果键不存在，会抛出 ______ 异常。',
        answer: 'KeyError',
        accepted: ['KeyError', 'keyerror', 'Key Error', '键错误'],
        explanation:
          '答案：KeyError。\n思路：字典靠键定位，键找不到就没有对应的值可取。\n逐步演示：取一个不存在的键，抛 KeyError，报错信息直接告诉你缺哪个键。\n易错提醒：不确定键是否存在时用 data.get 给默认值，不会抛异常也不会中断程序。',
        difficulty: 2,
      },
      {
        id: 's6-05-q5',
        qtype: 'program',
        stem: '写一个函数 to_int(text)：转换成功返回该整数，转换失败（捕获 ValueError）返回 0。\n再依次调用 to_int("42") 和 to_int("四十二") 并各打印一行。\n输出两行：42 和 0',
        answer: '',
        testCases: [{ stdin: '', expected: '42\n0' }],
        explanation:
          '答案（参考答案）：\ndef to_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        return 0\n\nprint(to_int("42"))\nprint(to_int("四十二"))\n\n思路：把可能出错的那一句放进 try，出错就走 except 兜底。\n逐步演示：第一次转换成功返回 42；第二次抛 ValueError 被抓住，返回 0。\n易错提醒：except 必须写具体类型；裸 except 会连同变量名拼错一起吞掉，反而掩盖真问题。',
        difficulty: 3,
      },
    ],
    minutes: 16,
    env: 'browser',
  },
  {
    id: 's6-06',
    stageId: 6,
    order: 6,
    title: 'try-except 与 else/finally',
    subtitle: '让程序遇到问题不崩，还能说清为什么',
    hook: '同一个程序，用户输入空值就整个崩溃，还甩给用户一屏英文报错。能不能让它出错时也稳稳继续？',
    objectives: [
      '写出完整的 try/except 结构并选中正确的异常类型',
      '说明为什么不要写裸 except',
      '说清多个 except 的匹配顺序规则',
      '用 else 和 finally 分别处理成功与收尾逻辑',
    ],
    analogy:
      'try 像出门前系好安全带：正常情况什么都不会发生。except 是安全气囊，只在撞车时弹出。finally 是下车必须熄火锁门，不管这趟顺不顺利都得做。',
    terms: [
      { term: 'try', plain: '把可能出错的代码放进去，试试看。' },
      { term: 'except', plain: '出错时接管，写善后逻辑。可以写多个，按顺序匹配。' },
      { term: '裸 except', plain: '不写异常类型的 except，会吞掉所有错误，包括你的笔误。' },
      { term: 'else', plain: 'try 里一行都没出错才执行，放成功后的后续动作。' },
      { term: 'finally', plain: '不管成功失败都执行，用来收尾，比如关文件。' },
    ],
    content: `## 一、为什么需要 try

真实程序要面对大量不可控的输入：用户填的表单、别人发来的文件、网络返回的数据。这些数据里出现一个空值、一个错字，程序就整个崩掉，用户体验极差。

try 的作用是给程序装一层安全网：出错的地方被隔离，错误被识别，剩下的流程继续跑。但有个前提必须记住：try 不是用来掩盖 bug 的。语法写错、变量名拼错，这些应该改代码，而不是拿 try 包起来当没发生。

## 二、四个关键字各管什么

| 关键字 | 什么时候执行 | 放什么 |
| --- | --- | --- |
| try | 一定执行 | 可能出错的代码，尽量只放一两句 |
| except | 对应异常发生时 | 善后处理：提示、给默认值、记日志 |
| else | try 里没有异常时 | 只有成功才做的事 |
| finally | 无论如何都执行 | 关闭文件、释放资源这类收尾 |

执行顺序是固定的：先跑 try，出错就跳到对应的 except，没出错就跑 else，最后无论哪种情况都跑 finally。记住这个顺序，你就能预测任何一段代码的输出。

## 三、为什么不能写裸 except

裸 except 指 except 后面不写类型。它的危害很实在：连拼写错误、变量名写错都被吞掉，程序不报错但结果全错，你会在完全错误的方向上查一整天。

原则很简单：你预期会出现哪种错误，就只捕获那一种。写 except ValueError 时，其他问题照常暴露，你一眼就能看见。意外的错误本来就该暴露出来，而不是被悄悄吃掉。

## 四、多个 except 的顺序

一段代码可能抛出多种异常时，可以写多个 except。规则是从上往下逐个匹配，命中第一个就执行，后面的不再看。

因此有个关键注意事项：范围大的要写在后面，范围小的写前面。如果把父类异常写在最前面，后面那些具体异常就永远轮不到。这个规则和后面单元要学的继承有关，现在先记住顺序即可。

## 五、常见的实战写法：输入校验

最典型的用法是把数据转换包起来，失败时给一个安全的默认值。在 try 里做转换，失败就进 except 给默认值并提示，成功就用 else 做后续处理，不管成败都用 finally 记录日志或关闭资源。

这套结构就是「不让一条脏数据毁掉整批处理」的标准做法。真实的数据导入脚本里，几乎每一个字段的解析都长这个样子。

## 六、逐步演示

第一步，写一个只做 int 转换的函数，先用 try 和 except 兜住 ValueError。第二步，加入 else，观察成功时多输出了一句什么。第三步，加入 finally，观察成功和失败两种情况下都输出了什么。第四步，用一个正常值和一个异常值分别调用，对比两条完整输出。

## 七、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 报错完全没被捕获 | 异常类型写错 | 看清报错最后一行的类型 |
| 程序还是崩了 | try 只包住无关代码 | 把出错那句放进 try |
| 出了 bug 却毫无提示 | 用了裸 except，把错误吞掉 | 指定具体异常类型 |
| finally 里的变量报未定义 | try 里赋值失败，finally 却用了它 | finally 只做与变量无关的收尾 |
| else 里的代码没执行 | try 抛了异常，走了 except | 正常行为，else 只管成功路径 |`,
    examples: [
      {
        title: 'try / except / else / finally 四件套完整演示',
        intro: '同一个函数用正常值和异常值各调一次，能看清 else 和 finally 分别在什么时候出现。',
        code: `def parse_score(text):
    print("开始处理：", text)
    try:
        score = int(text)
    except ValueError:
        print("不是合法数字，按 0 分算")
        score = 0
    else:
        print("转换成功，没有出错")
    finally:
        print("这条记录处理完毕")
    return score

print("结果：", parse_score("88"))
print("----")
print("结果：", parse_score("缺考"))`,
        expectedOutput: `开始处理： 88
转换成功，没有出错
这条记录处理完毕
结果： 88
----
开始处理： 缺考
不是合法数字，按 0 分算
这条记录处理完毕
结果： 0`,
        lines: [
          { code: 'try:', explain: '只把可能失败的那一句 int(text) 放进来，范围越小越好定位。' },
          { code: 'except ValueError:', explain: '指定具体类型。转换失败就进这里，给 score 一个安全值 0。' },
          { code: 'else:', explain: '只有 try 里没出错才执行。成功时输出「转换成功」，失败时被跳过。' },
          { code: 'finally:', explain: '无论成败都执行，适合记日志、关资源。这里两种情况都打印了。' },
          { code: 'print("结果：", parse_score("88"))', explain: '函数返回后才轮到外层 print，所以「结果」总在最后。' },
        ],
        trace: [
          { step: '第一次调用', state: 'int("88") 成功，走 else 再走 finally' },
          { step: '返回', state: '返回 88 并输出「结果： 88」' },
          { step: '第二次调用', state: 'int("缺考") 抛错，走 except，score = 0' },
          { step: '收尾', state: '跳过 else，执行 finally，输出「结果： 0」' },
        ],
        tryIt: '把 else 里那句 print 挪到 finally 里再跑，观察失败情况下多出了什么。',
      },
      {
        title: '多个 except：按异常类型分别处理',
        intro: '一个函数可能因为不同原因失败，分开处理才能给出准确提示。注意 except 的书写顺序。',
        code: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("除数不能为 0")
    except TypeError:
        print("参数必须是数字")
    return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, "2"))`,
        expectedOutput: `5.0
除数不能为 0
None
参数必须是数字
None`,
        lines: [
          { code: 'try: return a / b', explain: '除法可能因两个原因失败：除数为 0，或参数类型不对。' },
          { code: 'except ZeroDivisionError:', explain: '第一个分支处理除零。里面没有 return，所以后面会走到函数末尾。' },
          { code: 'except TypeError:', explain: '第二个分支处理类型问题。匹配命中一个就不再往下看。' },
          { code: 'return None', explain: '两个 except 都没返回值，函数最终返回 None，打印出来就是 None。' },
        ],
        trace: [
          { step: '第 1 次', state: '10 / 2 = 5.0，无异常，直接返回' },
          { step: '第 2 次', state: '除零抛错，打印提示后返回 None' },
          { step: '第 3 次', state: '字符串参与除法抛 TypeError，打印提示后返回 None' },
        ],
        tryIt: '把两个 except 顺序颠倒，再调用 safe_divide(10, 0)，看输出有没有变化。',
      },
    ],
    compare: [
      {
        conceptA: 'else',
        conceptB: 'finally',
        diff: 'else 只在 try 完全没出错时执行；finally 无论成功失败都执行。前者是成功奖励，后者是必须收尾。',
        example: '成功时两者都跑；失败时 else 被跳过，finally 照跑。',
      },
      {
        conceptA: 'except ValueError:',
        conceptB: 'except:（裸 except）',
        diff: '前者只接住值不合法的错误；后者连变量名拼错都吞掉，让真正的 bug 彻底隐身。',
        example: '把 text 写成 txt 触发 NameError，裸 except 悄悄吞掉，你只会看到结果为 0。',
      },
    ],
    pitfalls: [
      'try 包了十几行，出错时根本不知道是哪一句，排查变成猜谜。',
      '写了裸 except，把 NameError、AttributeError 一起吞掉，bug 永不见天日。',
      '异常类型写错，该捕获 ValueError 却写 TypeError，结果完全没接住。',
      '把真正要保护的代码写在 try 外面，异常照样让程序崩。',
      '在 finally 里 return，把 try 里的返回值覆盖掉，结果莫名其妙。',
    ],
    keyPoints: [
      'try 里只放可能出错的那一两句，越小越好排查。',
      'except 必须指定具体类型，裸 except 会吞掉真正的 bug。',
      '多个 except 从上往下匹配，具体类型写前面。',
      'else 只管成功路径，finally 无论成败都执行。',
      'try 是应对不可控输入的，不是用来掩盖代码错误的。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第10章 文件和异常' },
      { book: 'abs3', chapter: '第4章 4.8 节 异常处理' },
    ],
    prerequisites: ['s6-05'],
    task: '写一个 read_number 函数：转换成功返回数字并在 else 里打印「录入成功」，失败返回 0 并打印提示，最后在 finally 里打印「记录已处理」。用三个不同输入各调一次。',
    exercises: [
      {
        id: 's6-06-q1',
        qtype: 'single',
        stem: '下面哪个关键字包住的代码，不论是否发生异常都一定会执行？',
        options: ['A. try', 'B. except', 'C. else', 'D. finally'],
        answer: 'D',
        explanation:
          '答案：D，finally。\n思路：finally 的语义就是「无论如何」。\n逐步演示：正常结束执行它；抛异常走完 except 也执行它；甚至 try 里 return 了，它仍先执行再返回。\n易错提醒：else 只在没出错时执行，条件严格得多，别把两者搞混。',
        difficulty: 1,
      },
      {
        id: 's6-06-q2',
        qtype: 'boolean',
        stem: '写 except: 而不指定异常类型，是最省事也最推荐的做法，因为它能捕获所有错误。',
        answer: '错',
        explanation:
          '答案：错。\n思路：捕获所有错误恰恰是问题所在，它会把你的笔误一起吞掉。\n逐步演示：把 text 误写成 txt 触发 NameError，裸 except 接住后返回 0，程序不报错，你只看到结果永远是 0。\n易错提醒：只捕获预期的异常，比如 except ValueError，让意外错误暴露。',
        difficulty: 1,
      },
      {
        id: 's6-06-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请按顺序写出两行。',
        code: `def f(x):
    try:
        return 10 // x
    except ZeroDivisionError:
        return -1
    finally:
        print("done")

print(f(0))`,
        keywords: [['done'], ['-1']],
        explanation:
          '答案：第一行 done，第二行 -1。\n思路：finally 会在函数真正返回之前执行。\n逐步演示：x 为 0，除零抛错进 except 准备返回 -1；返回动作被 finally 拦下，先打印 done，再把 -1 交给外层 print。\n易错提醒：很多人以为 finally 在 return 之后执行，实际它在返回值交出前跑完。',
        difficulty: 2,
      },
      {
        id: 's6-06-q4',
        qtype: 'blank',
        stem: '在 try 结构里，只有在没有发生任何异常时才执行的代码块，用的关键字是 ______。',
        answer: 'else',
        accepted: ['else', 'ELSE', 'Else'],
        explanation:
          '答案：else。\n思路：它表示「那就好，接着做成功的后续」。\n逐步演示：try 里转换成功没有异常，就执行 else；一旦抛异常转入 except，else 整段被跳过。\n易错提醒：else 必须写在所有 except 之后、finally 之前，顺序错会直接语法错误。',
        difficulty: 2,
      },
      {
        id: 's6-06-q5',
        qtype: 'program',
        stem: '写一个函数 check(value)：try 里执行 int(value) 赋给 n；失败打印「转换失败」并返回 0；成功打印「转换成功」；无论成败最后打印「检查结束」；成功时返回 n。\n依次调用 check("7") 和 check("x") 各打印返回值。\n输出六行：转换成功、检查结束、7、转换失败、检查结束、0',
        answer: '',
        testCases: [{ stdin: '', expected: '转换成功\n检查结束\n7\n转换失败\n检查结束\n0' }],
        explanation:
          '答案（参考答案）：\ndef check(value):\n    try:\n        n = int(value)\n    except ValueError:\n        print("转换失败")\n        return 0\n    else:\n        print("转换成功")\n    finally:\n        print("检查结束")\n    return n\n\nprint(check("7"))\nprint(check("x"))\n\n思路：成功路径交给 else，收尾交给 finally，失败直接在 except 返回。\n逐步演示：第一次成功，走 else 再走 finally，返回 7；第二次抛错，打印失败后 finally 仍先执行。\n易错提醒：别以为 except 里 return 了 finally 就不执行，它会拦住返回动作先跑完。',
        difficulty: 3,
      },
    ],
    minutes: 19,
    env: 'browser',
  },
  {
    id: 's6-07',
    stageId: 6,
    order: 7,
    title: 'raise 与自定义异常',
    subtitle: '与其让错误悄悄传下去，不如当场说清楚',
    hook: '你写的函数收到一个负数年龄，是默默算出荒唐结果，还是立刻喊停并说明「年龄不能是负数」？',
    objectives: [
      '用 raise 主动抛出异常，中断不合法的流程',
      '在函数入口做参数校验，把问题挡在最前面',
      '定义继承 Exception 的自定义异常类',
      '判断什么时候该抛异常、什么时候该返回 False',
    ],
    analogy:
      'raise 像门口的安检员：发现行李里有违禁品，当场拦下并说明原因，而不是让它一路带进机舱。越早拦，损失越小，排查也越简单。',
    terms: [
      { term: 'raise', plain: '主动抛出异常的关键字，用来喊停并说明问题。' },
      { term: '参数校验', plain: '函数一开始就检查传入的值合不合法。' },
      { term: '自定义异常', plain: '自己定义的一个异常类，名字能直接说明业务问题。' },
      { term: '继承 Exception', plain: '自定义异常必须继承 Exception，才能被正常捕获。' },
      { term: '异常信息', plain: '异常对象里带的文字，说明到底哪里不合法。' },
    ],
    content: `## 一、为什么要主动抛异常

很多错误如果不在源头拦下，会一路传下去，最后在一个完全不相干的地方爆掉。比如年龄传了负五，程序继续算出「负五岁可以退休」，结果荒唐却没有任何报错。这种静默错误是最难查的一类，因为它连线索都不给你。

raise 的价值就是在问题发生的第一现场喊停，并且用一句话说清是哪条规则被违反。相比之下，不校验的做法会让错误潜伏很久，等你发现时，中间已经写入了大量脏数据。

## 二、raise 的写法

| 写法 | 说明 |
| --- | --- |
| raise ValueError("年龄不能为负") | 抛出内置异常并附带说明，最常用 |
| raise | 只能在 except 里用，把当前异常原样再抛出去 |
| raise ValueError | 抛类型但不带说明，信息量少，不推荐 |

写 raise 有三条经验：说明文字要写「违反了哪条规则」，而不是笼统的「出错了」；校验放在函数最前面，先挡掉非法输入，后面的逻辑就不用反复判断；不要用 raise 处理正常业务分支，比如「没找到」更适合返回 None。

## 三、自定义异常：让错误名字会说话

内置异常的名字比较笼统，ValueError 只能说明值不对，但对方不知道是哪个业务的值。自定义异常解决这个问题：定义一个类，继承 Exception，名字直接写成业务语言，比如分数异常、余额不足异常。

| 步骤 | 写法 |
| --- | --- |
| 定义 | class ScoreError(Exception): pass |
| 带信息 | 在 __init__ 里保存科目、分数等字段，再调用 super().__init__ 设置提示 |
| 抛出 | raise ScoreError("英语", 120) |
| 捕获 | except ScoreError as e 之后可用 e.subject 取细节 |

注意自定义异常必须继承 Exception，否则 except 接不住它，也不算一个合法的异常类。这个继承不是形式，而是它能在异常体系里被识别的唯一条件。

## 四、raise 还是 return False

这是设计上的判断题，判断标准是「这算意外，还是算正常结果」。

| 情况 | 建议做法 | 理由 |
| --- | --- | --- |
| 参数不合法 | raise | 调用方写错了，必须让它知道 |
| 查询没找到记录 | 返回 None | 没找到是正常业务结果 |
| 登录密码错误 | 返回 False 或错误码 | 属于预期内的分支 |
| 文件格式损坏 | raise | 属于异常状况，继续跑只会错更远 |

一句话：能预料到的分支用返回值，不该发生的情况用 raise。想清楚这条界线，你写出来的函数才好用。

## 五、逐步演示

第一步，写一个 set_age 函数，开头判断类型，不是整数就 raise TypeError。第二步，再判断范围，超出 0 到 130 就 raise ValueError 并写明范围。第三步，调用一次合法值，确认正常返回。第四步，用三个非法值分别调用，用 try 接住并打印异常类型名和说明。第五步，定义 ScoreError，在 __init__ 里存下科目和分数，捕获后分别取出这两个字段。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| except 接不住自定义异常 | 类没继承 Exception | 改成继承 Exception |
| 报错只有类型没有原因 | raise 时没写说明 | 补上括号里的文字 |
| 异常信息看不到具体值 | 提示是固定字符串 | 把变量值拼进提示 |
| 程序在某处莫名崩溃 | 校验没做在入口，问题被带到深处 | 参数一进来就校验 |
| 用异常控制正常流程 | 把「没找到」也 raise | 改成返回 None 或 False |`,
    examples: [
      {
        title: '在函数入口做校验并 raise',
        intro: '把类型和范围两道检查放在函数最前面，非法输入当场中断，合法输入照常返回。',
        code: `def set_age(age):
    if not isinstance(age, int):
        raise TypeError("年龄必须是整数")
    if age < 0 or age > 130:
        raise ValueError("年龄必须在 0 到 130 之间")
    return age

print("正常：", set_age(20))

for bad in [-5, 200, "20"]:
    try:
        set_age(bad)
    except (ValueError, TypeError) as e:
        print("被拦下：", type(e).__name__, e)`,
        expectedOutput: `正常： 20
被拦下： ValueError 年龄必须在 0 到 130 之间
被拦下： ValueError 年龄必须在 0 到 130 之间
被拦下： TypeError 年龄必须是整数`,
        lines: [
          { code: 'if not isinstance(age, int):', explain: '先查类型。isinstance 判断某个值是否属于指定类型。' },
          { code: 'raise TypeError("年龄必须是整数")', explain: '类型不对抛 TypeError，括号里的文字就是给调用方看的原因。' },
          { code: 'if age < 0 or age > 130:', explain: '类型通过再查范围。两道检查顺序不能颠倒，否则字符串比较大小会先炸。' },
          { code: 'except (ValueError, TypeError) as e:', explain: '一个 except 可捕获多种异常，写成元组；e 是异常对象。' },
          { code: 'type(e).__name__', explain: '取出异常类名，用来区分这次是哪种错误，比只打印说明更有信息量。' },
        ],
        trace: [
          { step: 'set_age(20)', state: '类型和范围都通过，返回 20' },
          { step: 'set_age(-5)', state: '类型通过，范围不通过，抛 ValueError' },
          { step: 'set_age(200)', state: '同样超出范围，抛 ValueError' },
          { step: 'set_age("20")', state: '类型就不对，在第一道检查处抛 TypeError' },
        ],
        tryIt: '把范围改成 0 到 150 再跑，看 200 那一行是否还被拦下；再把 "20" 改成 20 试试。',
      },
      {
        title: '自定义异常带着业务信息一起抛',
        intro: '内置异常只说「值不合法」，自定义异常能说清「哪个科目、多少分不合法」。',
        code: `class ScoreError(Exception):
    def __init__(self, subject, score):
        self.subject = subject
        self.score = score
        super().__init__(subject + " 的分数 " + str(score) + " 不合法")


def check_score(subject, score):
    if score < 0 or score > 100:
        raise ScoreError(subject, score)
    return score


print("数学：", check_score("数学", 95))

try:
    check_score("英语", 120)
except ScoreError as e:
    print("出错科目：", e.subject)
    print("出错分数：", e.score)
    print("错误说明：", e)`,
        expectedOutput: `数学： 95
出错科目： 英语
出错分数： 120
错误说明： 英语 的分数 120 不合法`,
        lines: [
          { code: 'class ScoreError(Exception):', explain: '自定义异常必须继承 Exception，否则不能被正常捕获。' },
          { code: 'def __init__(self, subject, score):', explain: '多收两个参数存成属性，等于把现场证据封装进异常。' },
          { code: 'super().__init__(...)', explain: '调用父类构造函数设置提示文字，这样 print(e) 才有内容。' },
          { code: 'raise ScoreError(subject, score)', explain: '抛出时把科目和分数一起带上，方便捕获后取用。' },
          { code: 'e.subject / e.score', explain: '存成属性后捕获时可直接访问，做日志、做提示都方便。' },
        ],
        trace: [
          { step: 'check_score("数学", 95)', state: '95 在范围内，直接返回 95' },
          { step: 'check_score("英语", 120)', state: '120 超范围，创建并抛出 ScoreError' },
          { step: '进入 except', state: 'e.subject 是英语，e.score 是 120' },
          { step: 'print(e)', state: '输出父类里设置的提示文字' },
        ],
        tryIt: '给 ScoreError 再加一个属性 grade，并在抛出时传进去，捕获后打印出来。',
      },
    ],
    compare: [
      {
        conceptA: 'raise（抛异常）',
        conceptB: 'return False（返回假值）',
        diff: 'raise 表示「这不该发生，流程必须中断」；return False 表示「这是预期内的分支结果」，调用方可以不管。',
        example: '年龄传负数用 raise；查询用户不存在返回 None。',
      },
      {
        conceptA: 'ValueError',
        conceptB: '自定义的 ScoreError',
        diff: '前者只能表达「值不合法」；后者名字直接说明业务，还能携带科目、分数等字段。',
        example: '抛出 ScoreError 后，日志里一看就知道是成绩校验失败，不用再猜。',
      },
    ],
    pitfalls: [
      '自定义异常类忘记继承 Exception，except 完全接不住，抛出来就是 TypeError。',
      'raise ValueError 不写说明，报错只有类型没有原因，排查还得翻源码。',
      '校验写在函数中间，前面已经算了一半才报错，副作用收不回来。',
      '用 raise 处理「没找到」这种正常分支，导致调用方到处写 try。',
      'except 捕获 Exception，把自定义异常和其他所有错误混在一起处理。',
    ],
    keyPoints: [
      'raise 在问题发生的第一现场喊停，并说明违反了哪条规则。',
      '参数校验放在函数入口，类型和范围都查，顺序不能颠倒。',
      '自定义异常必须继承 Exception，名字用业务语言。',
      '在 __init__ 里存下关键字段，捕获后就能取到现场信息。',
      '预期内的分支用返回值，不该发生的情况用 raise。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第10章 文件和异常' },
      { book: 'abs3', chapter: '第4章 4.8 节 异常处理' },
    ],
    prerequisites: ['s6-06'],
    task: '写一个 withdraw(balance, amount) 函数：金额为负或超过余额时 raise ValueError 并说明原因，合法时返回剩余余额。再用三个不同参数调用并处理异常。',
    exercises: [
      {
        id: 's6-07-q1',
        qtype: 'single',
        stem: '定义一个自定义异常类，必须让它继承哪个类？',
        options: ['A. object', 'B. Exception', 'C. ValueError', 'D. 随便哪个都行'],
        answer: 'B',
        explanation:
          '答案：B，Exception。\n思路：只有继承 Exception 的类才是合法异常类型，才能被 raise 和 except 使用。\n逐步演示：写 class MyError(Exception): pass 之后，raise MyError 才能正常抛出并被捕获。\n易错提醒：继承 object 的普通类被 raise 会报 TypeError: exceptions must derive from BaseException。',
        difficulty: 1,
      },
      {
        id: 's6-07-q2',
        qtype: 'boolean',
        stem: '函数收到不合法参数时，既可以 return False 也可以 raise 异常，两种做法效果完全一样。',
        answer: '错',
        explanation:
          '答案：错。\n思路：两者对调用方的约束力完全不同。\n逐步演示：return False 时调用方忘了检查，就会拿 False 继续算，错误静默传播；raise 会强制中断，不处理程序就停。\n易错提醒：参数非法属于意外用 raise；查询没结果属于正常分支，用返回值。',
        difficulty: 1,
      },
      {
        id: 's6-07-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？（只有一行）',
        code: `def check(n):
    if n < 0:
        raise ValueError("不能为负")
    return n * 2

try:
    print(check(-1))
except ValueError as e:
    print("错误：", e)`,
        keywords: [['错误'], ['不能为负']],
        explanation:
          '答案：错误： 不能为负（一行）。\n思路：check(-1) 在 raise 处中断，外层 print 永远等不到返回值。\n逐步演示：条件成立抛出 ValueError；except 接住后打印「错误：」和说明，逗号处自动补一个空格。\n易错提醒：不要以为会先打印 -2，raise 会直接终止这条调用路径。',
        difficulty: 2,
      },
      {
        id: 's6-07-q4',
        qtype: 'blank',
        stem: '在函数里主动抛出一个异常，使用的关键字是 ______。',
        answer: 'raise',
        accepted: ['raise', 'RAISE', 'Raise'],
        explanation:
          '答案：raise。\n思路：raise 的英文含义就是「举起、抛出」。\n逐步演示：写 raise ValueError 加说明文字，执行到这一行立刻中断，把异常交给上层。\n易错提醒：raise 后面要跟异常对象或异常类，不能跟一句普通文字，否则报 TypeError。',
        difficulty: 2,
      },
      {
        id: 's6-07-q5',
        qtype: 'program',
        stem: '写一个 withdraw(balance, amount) 函数：amount 大于 balance 时 raise ValueError("余额不足")，否则返回 balance - amount。\n然后用 try 包住两次调用并打印：先取 30，再取 150（余额 100）。捕获 ValueError 后打印「失败：」加说明。\n输出两行：70 和 失败： 余额不足',
        answer: '',
        testCases: [{ stdin: '', expected: '70\n失败： 余额不足' }],
        explanation:
          '答案（参考答案）：\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError("余额不足")\n    return balance - amount\n\ntry:\n    print(withdraw(100, 30))\n    print(withdraw(100, 150))\nexcept ValueError as e:\n    print("失败：", e)\n\n思路：合法取款直接返回余额，超额时抛异常，由外层统一处理。\n逐步演示：第一次 100 减 30 得 70 并打印；第二次抛错跳到 except；后面的代码不再执行。\n易错提醒：两次调用分别放在两个 try 里，输出顺序会不同。',
        difficulty: 3,
      },
    ],
    minutes: 17,
    env: 'browser',
  },
  {
    id: 's6-08',
    stageId: 6,
    order: 8,
    title: '错误排查与调试方法',
    subtitle: '把「不知道为什么错」变成「知道该看哪一行」',
    hook: '代码跑出了错误的结果，但一行报错都没有。这时候该从哪儿下手？',
    objectives: [
      '按从下往上的顺序读懂一段 Traceback',
      '用 print 打印中间值做二分排查',
      '用 assert 给关键假设加自检',
      '把复杂表达式拆成多步，定位出错的那一步',
    ],
    analogy:
      '调试像找水管漏水：不会把整面墙砸开，而是先看哪一段湿了，把范围缩到一半，再看更小的范围。二分排查就是这套思路。',
    terms: [
      { term: 'Traceback', plain: '异常没被处理时打印的调用过程，告诉你错误从哪一路传上来。' },
      { term: '二分排查', plain: '在中间加打印，一次砍掉一半的可能性。' },
      { term: 'assert', plain: '断言某个条件必须成立，不成立就立刻报错。' },
      { term: '最小复现代码', plain: '把问题剥到只剩几行，仍然能复现错误的那段代码。' },
      { term: '静默错误', plain: '不报错但结果错，最难查的一类问题。' },
    ],
    content: `## 一、先分清两种故障

故障分两类，排查方式完全不同。崩溃型会在屏幕上甩出一段红色 Traceback，Python 已经把答案写在里面了；静默型则老老实实跑完，输出一个错得离谱的数字，一句提示都没有。

崩溃型反而好办，按行号看就能定位。真正磨人的是静默型：程序没有抱怨，你却得自己找出它哪里想错了。下面这套方法对两种都适用，但对静默型尤其重要。

## 二、Traceback 要从下往上读

一段 Traceback 里信息量最大的是最后一行。

| 位置 | 内容 | 你该做什么 |
| --- | --- | --- |
| 第一行 | Traceback (most recent call last) | 忽略，只是标题 |
| 中间若干行 | File 加行号加代码 | 找到离你最近的那个 File，跳到对应行 |
| 最后一行 | 异常类型和具体描述 | 先看懂这句，它说清了毛病是什么 |

为什么要从下往上看：最下面是结论，中间是经过。初学阶段先看结论，效率最高。

还有个高频现象：报错行号指向的那一行看起来完全没问题。这时要往上一行看，因为漏写右括号、漏写逗号，问题往往出在上一行末尾。

## 三、print 二分排查法

适用于静默错误。步骤固定：在怀疑区间的正中间插一条 print，打印关键变量的值；运行后判断错误在中间之前还是之后；丢掉没问题的那一半，在剩下的一半重复；找到出错的具体行后，删掉调试用的 print。

十行代码最多打印三四次就能定位，一百行也就七八次。比从头一行行读快得多，而且不会因为「看着像没问题」而漏掉真正的错误。

## 四、assert：给假设加一道自检

assert 的写法是断言一个条件必须为真，不为真就抛 AssertionError 并显示你写的说明。它适合放在函数入口检查参数合理，或放在循环内部检查累计值没有跑偏。

好处是出错时立刻停在现场，而不是等到几十行之后才发现数字不对。要注意，assert 是开发阶段的自检，不是给用户看的错误处理，正式代码里不该用它代替异常处理。

## 五、把复杂表达式拆成多步

一行里套了三个函数调用、两个切片，一旦结果不对，你根本不知道是哪一步出的问题。

| 原来的一行 | 拆开之后 |
| --- | --- |
| total = sum(int(x) for x in raw.split(",") if x.isdigit()) | 先 split，再逐项判断，再累加 |
| value = data["list"][0]["score"] | 先取列表，再取第一项，再取字段 |

多写三行，换来的是「一眼看出第几步错了」，绝对值得。

## 六、五步排查清单

遇到任何问题按顺序走：第一步读报错，看最后一行是什么类型、指向第几行；第二步看数据，在出错前打印相关变量的值和类型；第三步拆步骤，把复杂表达式拆成多步各打印一次；第四步做最小复现，新建文件只留出问题的那几行，确认还能复现；第五步写清假设，把「应该成立」的条件写成 assert。

## 七、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 报错行看起来没问题 | 错误常在上一行末尾 | 往上多看一行 |
| 改了半天越改越乱 | 一次改了很多处 | 每次只改一处，改完立刻运行 |
| 静默错误找不到源头 | 没打印中间值 | 用二分法插 print |
| 类型和想象不符 | CSV 和输入读出来都是字符串 | 打印 type 确认 |
| 调试 print 忘了删 | 没养成收尾习惯 | 定位后立刻删除 |`,
    examples: [
      {
        title: 'print 二分法 + assert 自检',
        intro: '这个函数只有三步，但中间插了两条调试打印。真实项目里就是靠这种笨办法把范围一点点缩小的。',
        code: `def final_price(price, count, discount):
    subtotal = price * count
    print("调试：subtotal =", subtotal)
    total = subtotal * discount
    print("调试：total =", total)
    return total

result = final_price(80, 3, 0.85)
print("结果：", result)

assert 3 > 2, "这句不会触发"
print("断言通过")`,
        expectedOutput: `调试：subtotal = 240
调试：total = 204.0
结果： 204.0
断言通过`,
        lines: [
          { code: 'subtotal = price * count', explain: '第一步乘法，80 乘 3 应该得 240，插 print 验证这个假设。' },
          { code: 'print("调试：subtotal =", subtotal)', explain: '调试打印带前缀，方便之后全局搜索并删除。' },
          { code: 'total = subtotal * discount', explain: '第二步，240 乘 0.85 应为 204.0，注意结果是浮点数。' },
          { code: 'assert 3 > 2, "这句不会触发"', explain: '条件成立什么都不发生；不成立就抛 AssertionError 并显示说明。' },
          { code: 'print("断言通过")', explain: '能走到这里，说明前面所有断言都成立。' },
        ],
        trace: [
          { step: '第 2-3 行', state: 'subtotal = 240 并输出调试信息' },
          { step: '第 4-5 行', state: 'total = 204.0 并输出调试信息' },
          { step: '第 6 行', state: '返回 204.0，输出「结果： 204.0」' },
          { step: '断言', state: '条件为真，不报错，输出「断言通过」' },
        ],
        tryIt: '把 assert 3 > 2 改成 assert 2 > 3，运行看 AssertionError 长什么样，注意说明文字出现在哪。',
      },
      {
        title: '把一行复杂表达式拆成可观察的几步',
        intro: '同一件事，一行写完出错难查；拆成多步并打印每步结果，问题位置立刻暴露。',
        code: `raw = "12,8,x,20"

parts = raw.split(",")
print("第一步，拆开：", parts)

total = 0
for p in parts:
    print("第二步，处理：", p)
    if not p.isdigit():
        print("  这一项不是数字，跳过")
        continue
    total = total + int(p)
    print("  累计：", total)

print("最终总分：", total)`,
        expectedOutput: `第一步，拆开： ['12', '8', 'x', '20']
第二步，处理： 12
  累计： 12
第二步，处理： 8
  累计： 20
第二步，处理： x
  这一项不是数字，跳过
第二步，处理： 20
  累计： 40
最终总分： 40`,
        lines: [
          { code: 'parts = raw.split(",")', explain: '第一步单独成行，先确认拆分结果是不是你想要的四个元素。' },
          { code: 'print("第一步，拆开：", parts)', explain: '打印列表本身，一次看清全部元素和它们的类型。' },
          { code: 'if not p.isdigit():', explain: 'isdigit 判断字符串是否全由数字组成，用来提前挡掉无法转换的项。' },
          { code: 'continue', explain: '跳过本轮剩余代码，直接进入下一项，避免 int 抛异常。' },
          { code: 'print("  累计：", total)', explain: '每轮打印累计值，数字一旦不对，立刻知道是这一项算错。' },
        ],
        trace: [
          { step: '第 3 行', state: 'parts = ["12", "8", "x", "20"]' },
          { step: '第 1 轮', state: 'p = "12"，total = 12' },
          { step: '第 2 轮', state: 'p = "8"，total = 20' },
          { step: '第 3 轮', state: 'p = "x"，isdigit 为假，跳过，total 仍是 20' },
          { step: '第 4 轮', state: 'p = "20"，total = 40，最后输出 40' },
        ],
        tryIt: '把 raw 改成 "5,,7"（中间一个空字符串），运行看空串会被判成什么，总分是否合理。',
      },
    ],
    compare: [
      {
        conceptA: 'print 调试',
        conceptB: 'assert 断言',
        diff: 'print 只是把值显示出来，需要你自己判断对不对；assert 由程序替你判断条件是否成立，不成立立刻停。',
        example: 'print(total) 要你盯着数字；assert total > 0 会直接告诉你它不该是 0。',
      },
      {
        conceptA: '崩溃型错误',
        conceptB: '静默型错误',
        diff: '前者有 Traceback，按行号看就能定位；后者不报错，只能靠打印中间值二分缩小范围。',
        example: '除以 0 会直接崩；把折扣率写成 85 而不是 0.85，不报错但总价大了一百倍。',
      },
    ],
    pitfalls: [
      '只盯着报错指向的那一行，忽略了上一行漏写的括号或逗号。',
      '一次改好几处代码再运行，改对了也不知道是哪一处起的作用。',
      '静默错误不上打印，凭感觉猜，越猜越远。',
      '调试用的 print 忘记删，交付时输出一堆无关内容。',
      'assert 用在正式的错误处理里，以优化模式运行时断言会被整体跳过。',
    ],
    keyPoints: [
      'Traceback 从下往上读：最后一行是结论，中间的 File 行给位置。',
      '静默错误用 print 二分排查，一次砍掉一半范围。',
      'assert 适合放在函数入口和关键节点，把假设变成检查。',
      '复杂表达式拆成多步，每步一个变量，出错位置立刻可见。',
      '五步清单：读报错、看数据、拆步骤、最小复现、写清假设。',
    ],
    sources: [{ book: 'abs3', chapter: '第5章 调试' }],
    prerequisites: ['s6-06'],
    task: '找一个你之前写错的程序，按五步清单走一遍：读报错、打印中间值、把出问题的几行单独复制成最小复现，最后写下结论。',
    exercises: [
      {
        id: 's6-08-q1',
        qtype: 'single',
        stem: '看到一段 Traceback，最该先看哪一部分？',
        options: [
          'A. 第一行的 Traceback (most recent call last)',
          'B. 最后一行，里面有异常类型和具体描述',
          'C. 中间每一行都逐字读完',
          'D. 直接关掉重跑一次',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：最后一行是结论，直接告诉你什么毛病。\n逐步演示：看到 ValueError 就知道是转换失败；再往上找最近的 File 行拿到行号，跳过去看代码。\n易错提醒：第一行只是固定标题，没有诊断价值；逐字读中间十几行纯属浪费时间。',
        difficulty: 1,
      },
      {
        id: 's6-08-q2',
        qtype: 'boolean',
        stem: '程序没有报错但结果明显不对，这种情况比直接崩溃更难查，需要用打印中间值的方式定位。',
        answer: '对',
        explanation:
          '答案：对。\n思路：崩溃型有 Traceback 指路，静默型什么都没有。\n逐步演示：折扣率误写成 85 而不是 0.85，程序照常跑完，输出总价 20400，没有任何提示，只能打印中间值核对。\n易错提醒：这类问题最忌凭感觉改，一定要打印数据看清实际值。',
        difficulty: 1,
      },
      {
        id: 's6-08-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？（只有一行）',
        code: `scores = ["80", "90", "x"]
total = 0
for s in scores:
    if s.isdigit():
        total += int(s)
print(total)`,
        keywords: [['170']],
        explanation:
          '答案：170。\n思路：isdigit 把不是纯数字的 "x" 挡在转换之前，所以不会报错。\n逐步演示：80 累加到 80；90 累加到 170；"x" 的 isdigit 为假，整个 if 被跳过，最后打印 170。\n易错提醒：去掉 if 直接 int(s)，第三项会抛 ValueError，程序直接崩，一行都输出不了。',
        difficulty: 2,
      },
      {
        id: 's6-08-q4',
        qtype: 'blank',
        stem: '在代码里写一个必须成立的条件作为自检，条件不成立就抛 AssertionError，使用的关键字是 ______。',
        answer: 'assert',
        accepted: ['assert', 'ASSERT', 'Assert'],
        explanation:
          '答案：assert。\n思路：它的语义就是「我断言这里必须成立」。\n逐步演示：写 assert len(data) > 0 加说明，成立时什么都不发生，不成立时立刻报错并显示说明。\n易错提醒：assert 只适合开发阶段自检，不能当用户输入校验；以优化模式运行时会整体跳过。',
        difficulty: 2,
      },
      {
        id: 's6-08-q5',
        qtype: 'program',
        stem: '下面的代码有 bug：遇到不是数字的 "x" 时会崩溃。请修正它，让程序跳过无法转换的项，最后只输出一行「总分 170」。\n\nscores = ["80", "90", "x"]\ntotal = 0\nfor s in scores:\n    total = total + int(s)\nprint("总分", total)',
        code: `scores = ["80", "90", "x"]
total = 0
for s in scores:
    total = total + int(s)
print("总分", total)`,
        answer: '',
        testCases: [{ stdin: '', expected: '总分 170' }],
        explanation:
          '答案（参考答案）：\nscores = ["80", "90", "x"]\ntotal = 0\nfor s in scores:\n    try:\n        total = total + int(s)\n    except ValueError:\n        pass\nprint("总分", total)\n\n另一种写法是用 if s.isdigit() 先判断再累加，效果相同。\n\n思路：崩溃点在 int(s)，要么先用 isdigit 预判，要么用 try 捕获后跳过。\n逐步演示：80 累加到 80，90 累加到 170；x 转换失败被 except 接住，循环继续，最后输出 170。\n易错提醒：不能在 except 里写 break，否则会跳出循环，后面的项全被丢掉。',
        difficulty: 3,
      },
    ],
    minutes: 20,
    env: 'browser',
  },
]
