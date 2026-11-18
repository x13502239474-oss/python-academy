const i=[{id:"s1-01",stageId:1,order:1,title:"什么是编程？",subtitle:'给电脑写一张"说明书"',hook:'你有没有想过：为什么你点一下手机上的按钮，它就知道该做什么？其实有人提前"告诉"了它——这就是编程。',objectives:['用自己的话说出"编程"是什么',"理解程序就是一步一步的指令","说出 2 个编程能解决的生活问题"],analogy:'把电脑想象成一个非常听话但完全不懂变通的助手。它不会"猜"你的意思，你必须把每一步都说得清清楚楚。编程，就是你给这个助手写的一张超级详细的说明书。',content:`# 编程到底是什么

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

后面你会学到，变量用来装数据，语句用来写步骤。就这么简单。`,examples:[{title:"让电脑向你问好",code:`print("你好，世界！")
print("我正在学习编程。")`,expectedOutput:`你好，世界！
我正在学习编程。`,lines:[{code:'print("你好，世界！")',explain:'print 是"打印"的意思，括号里写你想让电脑显示的内容。文字要用引号包起来。'},{code:'print("我正在学习编程。")',explain:"再来一条指令，电脑会接着显示第二行。程序就是一行一行往下执行的。"}]}],compare:[{conceptA:"人做事",conceptB:"电脑做事",diff:'人会"意会"、会跳步、会举一反三；电脑只会严格照你写的每一步来，不多也不少。',example:'你说"把门关上"，人知道要轻轻关；电脑需要你说清楚"用多大力气、移动到什么角度"。'}],pitfalls:['以为电脑"应该懂我的意思"——它真的不懂，要把每一步写清楚。',`中文引号和英文引号混用——Python 里必须用英文引号 " " 或 ' '。`],sources:[{book:"pcc3",chapter:"第1章 起步"},{book:"abs3",chapter:"第1章 Python基础"}],prerequisites:[],task:"试着修改上面的例子，让电脑输出三行关于你自己的介绍。",exercises:[{id:"s1-01-q1",qtype:"boolean",stem:'电脑会主动"猜"你想做什么，所以写代码可以写得模糊一些。',answer:"错",explanation:"电脑只会严格执行你写的指令，不会猜测意图，所以必须写得明确。",difficulty:1},{id:"s1-01-q2",qtype:"single",stem:'下面哪个最能概括"编程"？',options:["A. 修理电脑硬件","B. 写指令让电脑做事","C. 给电脑装系统","D. 上网搜索资料"],answer:"B",explanation:"编程的本质就是写一系列指令，让电脑按步骤完成任务。",difficulty:1}],minutes:8,env:"browser"},{id:"s1-02",stageId:1,order:2,title:"Python 能做什么？",subtitle:"一门语言，万千用途",hook:'有人说 Python 能"几乎做任何事"。这话有点夸张，但它确实能干的事多得惊人——从自动填表到训练人工智能。',objectives:["说出 Python 的 4 个常见用途",'理解本课程"双模式"安排的原因',"知道哪些任务手机浏览器能跑、哪些要本地环境"],analogy:"Python 就像一把瑞士军刀：里面有小刀、剪刀、螺丝刀……不同场合掏出不同工具。你不需要一开始就用上所有工具，先把手上这个用熟。",content:`# Python 的用武之地

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

我们不会假装手机上能跑所有东西——这样对你才诚实。`,examples:[{title:'一个小小的"数据处理"预览',code:`prices = [12, 35, 8, 20]
total = sum(prices)
print("总价：", total, "元")
print("平均：", round(total / len(prices), 2), "元")`,expectedOutput:`总价： 75 元
平均： 18.75 元`,lines:[{code:"prices = [12, 35, 8, 20]",explain:"把 4 个价格放进一个叫 prices 的列表里。"},{code:"total = sum(prices)",explain:"sum() 帮我们把列表里的数字全加起来。"},{code:'print("总价：", total, "元")',explain:"print 里可以用逗号隔开多个内容，输出时会用空格连接。"},{code:"round(..., 2)",explain:"round 让小数保留 2 位。"}]}],sources:[{book:"pcc3",chapter:"第1章、第15-20章"},{book:"abs3",chapter:"前言及第11-24章"}],prerequisites:["s1-01"],task:"在代码实验室里把价格改成你自己的 4 个数字，看看总价怎么变。",exercises:[{id:"s1-02-q1",qtype:"multiple",stem:"下面哪些是 Python 的常见用途？（多选）",options:["A. 自动化办公","B. 数据处理","C. 网页开发","D. 人工智能"],answer:["A","B","C","D"],explanation:"这四个都是 Python 大显身手的领域。",difficulty:1},{id:"s1-02-q2",qtype:"boolean",stem:"文件批量整理这类任务，在手机浏览器里也能直接读写手机文件，和电脑上完全一样。",answer:"错",explanation:"浏览器出于安全限制无法随意读写本地文件，这类实战任务需要 Windows + VS Code 本地环境。",difficulty:1}],minutes:7,env:"browser"},{id:"s1-03",stageId:1,order:3,title:"Python 与其他语言的区别",subtitle:"为什么新手适合先学 Python",hook:'编程语言有几百种，为什么全世界的新手课大多推荐 Python？因为它"说人话"。',objectives:["说出 Python 相对 C/Java 的 2 个特点",'理解"解释型语言"的大致含义',"知道 Python 的短板在哪"],analogy:"如果编程是说话，C 语言像严谨的法律条文（每个标点都要较真），Python 像日常聊天（更接近人的表达习惯）。新手当然先从聊天学起。",content:`# 为什么先学 Python

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

> 结论：作为第一门语言，Python 让你最快获得"我能写出程序"的成就感。`,examples:[{title:"感受 Python 的简洁",code:`# 同样是交换两个变量的值
a = 1
b = 2
a, b = b, a   # Python 一行搞定
print(a, b)   # 输出：2 1`,expectedOutput:"2 1",lines:[{code:"a, b = b, a",explain:'Python 支持"同时赋值"，交换两个变量不用临时变量，这在很多语言里要写三行。'},{code:"# 开头是注释",explain:"# 后面的内容电脑不执行，是写给人看的说明。"}]}],sources:[{book:"pcc3",chapter:"第1章、第2章"}],prerequisites:["s1-01","s1-02"],exercises:[{id:"s1-03-q1",qtype:"single",stem:'Python 被称为"解释型"语言，主要意思是：',options:["A. 只能用来解释文字","B. 代码写完后逐行执行，改完能立刻重跑","C. 必须先编译成其他语言","D. 只能在手机上跑"],answer:"B",explanation:"解释型语言由解释器逐行读取执行，修改后立即生效，非常适合学习时反复尝试。",difficulty:2}],minutes:6,env:"browser"},{id:"s1-04",stageId:1,order:4,title:"安装与环境（双模式说明）",subtitle:"手机上怎么学，电脑上怎么练",hook:"工欲善其事，必先利其器。我们把两条路都给你铺好，你按需要选。",objectives:["知道手机端学习无需任何安装","了解 Windows 本地环境需要装什么","明白什么时候该切换到实战模式"],content:`# 两种学习模式

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

> 详细图文教程会在第 6 阶段开头再完整走一遍。现在你只要知道：需要实战时，路是通的。`,examples:[{title:"本地环境的第一个验证",code:`# 在本地命令行运行这段，确认环境正常
import sys
print("Python 版本：", sys.version)
print("环境正常！")`,lines:[{code:"import sys",explain:'import 是"导入"，sys 是 Python 自带的一个模块，里面装着系统信息。'},{code:"sys.version",explain:"这里能读出当前 Python 的版本号。"}]}],sources:[{book:"pcc3",chapter:"第1章 1.1-1.6节"},{book:"abs3",chapter:"第1章"}],prerequisites:["s1-01"],exercises:[{id:"s1-04-q1",qtype:"boolean",stem:'安装 Python 时，"Add Python to PATH"这个选项装不装都一样。',answer:"错",explanation:"一定要勾选，否则命令行里无法识别 python 命令，是新手最常见的坑。",difficulty:1}],minutes:10,env:"local"},{id:"s1-05",stageId:1,order:5,title:"第一个 Python 程序",subtitle:"HELLO, WORLD!",hook:'每个程序员的第一段代码，几乎都是让电脑说出"Hello, world!"。今天轮到你了。',objectives:["独立写出并运行第一个程序","理解 .py 文件是什么","知道程序的执行顺序是从上到下"],analogy:'写第一个程序就像学骑车第一次踩踏板——动作本身很简单，但踩下去的那一刻，你就"会了"。',content:`# 写下你的第一行代码

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

在本地环境里，Python 代码保存在以 \`.py\` 结尾的文件里。文件名可以随便起，比如 \`hello.py\`、\`我的第一个程序.py\`。点运行时，Python 会从这个文件的第一行开始，一路执行到最后一行。`,examples:[{title:"一个有仪式感的自我介绍",code:`print("=" * 20)
print("你好，我是 Mike")
print("我正在学习 Python")
print("=" * 20)`,expectedOutput:`====================
你好，我是 Mike
我正在学习 Python
====================`,lines:[{code:'print("=" * 20)',explain:'字符串乘以数字，表示重复。这里把 "=" 重复 20 次，做出一条分隔线。'},{code:'print("你好，我是 Mike")',explain:"把 Mike 换成你自己的名字，运行看看。"}]}],sources:[{book:"pcc3",chapter:"第1章 1.3节"},{book:"abs3",chapter:"第1章 1.5节"}],prerequisites:["s1-01"],task:"写一个程序，输出一条分隔线、你的名字、你学 Python 的原因，再加一条分隔线。",exercises:[{id:"s1-05-q1",qtype:"predict",stem:`下面代码的输出是什么？
print("A")
print("B")
print("C")`,keywords:[["A"],["B"],["C"]],explanation:"程序从上往下依次执行，三行分别输出 A、B、C。",difficulty:1},{id:"s1-05-q2",qtype:"blank",stem:"要把文字显示出来，使用的函数是 ______（）（填函数名）。",answer:"print",accepted:["print()","输出"],explanation:"print() 函数用于把内容打印输出到屏幕。",difficulty:1}],minutes:6,env:"browser"},{id:"s1-06",stageId:1,order:6,title:"print() 函数的玩法",subtitle:"让输出随心所欲",hook:'print 不只是"打印文字"，它还能算数、拼内容、换行、做分隔——玩熟了特别顺手。',objectives:["会用 print 输出多种类型","理解逗号的拼接作用","掌握 end 参数改变结尾"],analogy:"把 print 想成一个传话员：你给它什么它就喊什么。给它数字就喊数字，给它算式就先算好再喊。",content:`# print() 的更多用法

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
\`\`\``,examples:[{title:"打印一个小票据",code:`print("---- 收银小票 ----")
print("苹果", 3, "个", 5 * 3, "元")
print("香蕉", 2, "把", 2 * 2, "元")
print("------------------")`,expectedOutput:`---- 收银小票 ----
苹果 3 个 15 元
香蕉 2 把 4 元
------------------`,lines:[{code:'print("苹果", 3, "个", 5 * 3, "元")',explain:"print 里可以混合文字和数字，算式 5*3 会先算出 15 再输出。"}]}],sources:[{book:"pcc3",chapter:"第2章 2.3节"},{book:"abs3",chapter:"第1章 1.6节"}],prerequisites:["s1-05"],exercises:[{id:"s1-06-q1",qtype:"predict",stem:'print("2 + 3") 的输出是？',keywords:[["2","+","3"]],explanation:"因为有引号，所以原样输出文字 2 + 3，不会算成 5。",difficulty:2}],minutes:7,env:"browser"},{id:"s1-07",stageId:1,order:7,title:"注释与代码规范",subtitle:"写给未来的自己看",hook:" code 是写给电脑看的，注释是写给人看的——包括一个月后完全忘了自己在干啥的你自己。",objectives:["会用 # 写单行注释","知道为什么要写注释","了解命名和缩进的基本规范"],content:`# 注释：给代码做批注

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

> 一个小约定：缩进统一用 4 个空格。`,examples:[{title:"带注释的清楚代码",code:`# 个人介绍小程序
name = "Mike"       # 姓名
age = 15            # 年龄

# 输出介绍
print("我叫", name)
print("今年", age, "岁")`,lines:[{code:"# 个人介绍小程序",explain:"整行注释，说明这段代码的目的。"},{code:'name = "Mike"       # 姓名',explain:"行尾注释，解释这一个变量的含义。"},{code:"（空行）",explain:"适当空行能把代码分组，读起来更清楚。"}]}],sources:[{book:"pcc3",chapter:"第2章 2.5节、第4章 4.6节"}],prerequisites:["s1-05"],exercises:[{id:"s1-07-q1",qtype:"single",stem:"Python 中单行注释用什么符号开头？",options:["A. //","B. #","C. /*","D. --"],answer:"B",explanation:"Python 用 # 表示单行注释，# 后的内容不会被程序执行。",difficulty:1}],minutes:6,env:"browser"},{id:"s1-08",stageId:1,order:8,title:"常见运行错误与读报错",subtitle:"别怕，报错是朋友",hook:'新手最怕的就是红色报错。其实报错是 Python 在认真告诉你"哪儿错了"，学会读它，调试速度翻倍。',objectives:["不害怕报错","会定位报错的行号和类型","认识最常见的 3 类错误"],analogy:'报错就像导航说"前方道路不通，请掉头"——它不是在骂你，是在帮你找到对的路。',content:`# 读懂错误提示

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

> 记住：每个程序员每天都在看报错。看得多就熟练了，这不丢人。`,examples:[{title:"一个故意写错的例子（观察报错）",code:`# 下面这行会报错，因为 msg 没有先定义
print(msg)`,lines:[{code:"print(msg)",explain:`msg 从未赋值，运行时会抛出 NameError: name 'msg' is not defined。试着先写 msg = "你好" 再运行。`}]}],pitfalls:['用了中文引号 "" 或中文括号——Python 只认英文半角符号。',"变量名拼写不一致，比如定义时 name 用时 nmae。"],sources:[{book:"pcc3",chapter:"第1章 1.4节、第2章 2.2.2节"},{book:"abs3",chapter:"第5章 调试"}],prerequisites:["s1-05","s1-06"],exercises:[{id:"s1-08-q1",qtype:"single",stem:'报错信息里的 "line 3" 告诉我们什么？',options:["A. 程序有 3 处错误","B. 错误大约在第 3 行","C. 要运行 3 遍","D. 等待 3 秒"],answer:"B",explanation:"line 3 指明出错的代码行号，是定位问题最重要的线索。",difficulty:1},{id:"s1-08-q2",qtype:"debug",stem:'代码 print("你好"）用了中文右括号，会报什么错？',keywords:[["SyntaxError","语法"]],explanation:"中英文标点混用会导致语法错误 SyntaxError，Python 只认英文半角标点。",difficulty:2}],minutes:8,env:"browser"}],s=[{id:"s2-01",stageId:2,order:1,title:"变量：贴标签的储物盒",subtitle:"给数据起个名字",hook:"想象你有一堆储物盒，每个盒子上贴着标签。你想放东西进去、想找东西出来，只要看标签就行——变量就是这样的盒子。",objectives:["用自己的话说出变量是什么","会定义变量并赋值","理解变量的值可以被覆盖"],analogy:'变量 = 一个贴了标签的盒子。标签是变量名（比如 name），盒子里装的东西是值（比如 "Mike"）。你随时可以把盒子里的东西换成别的。',content:'# 变量是什么\n\n**变量 = 装数据的盒子 + 盒子上的标签。**\n\n定义变量非常简单，用 `=` 号：\n\n```python\nname = "Mike"\nage = 15\n```\n\n这里发生了两件事：\n1. 创建一个叫 `name` 的盒子，把文字 `"Mike"` 放进去\n2. 创建一个叫 `age` 的盒子，把数字 `15` 放进去\n\n注意 `=` 在这里**不是"等于"**，而是"把右边的值装进左边的盒子"，叫**赋值**。\n\n## 变量的值可以改\n\n```python\nscore = 80\nprint(score)   # 80\nscore = 90     # 换成新值\nprint(score)   # 90\n```\n\n后面的赋值会覆盖前面的，盒子里的东西被换掉了。\n\n## 变量命名的规矩\n\n- 只能用字母、数字、下划线，且不能以数字开头\n- 区分大小写：`Name` 和 `name` 是两个不同的盒子\n- 起有意义的名字：`age` 比 `a` 好，`total_price` 比 `tp` 好',examples:[{title:"个人信息小卡片",code:`name = "Mike"
city = "深圳"
hobby = "编程"

print("姓名：", name)
print("城市：", city)
print("爱好：", hobby)`,expectedOutput:`姓名： Mike
城市： 深圳
爱好： 编程`,lines:[{code:'name = "Mike"',explain:'创建变量 name，把字符串 "Mike" 装进去。文字要加英文引号。'},{code:'print("姓名：", name)',explain:"输出文字和变量的值。注意变量 name 没有引号——有引号就变成纯文字了。"}]}],visual:{kind:"variable",title:"变量盒子的变化过程",description:'看每一步执行后，各个"盒子"里装了什么。',variables:[{name:"name",value:'"Mike"'},{name:"age",value:"15"}],steps:[{label:"第 1 步",detail:'name = "Mike"',state:[{name:"name",value:'"Mike"'},{name:"age",value:"（空）"}]},{label:"第 2 步",detail:"age = 15",state:[{name:"name",value:'"Mike"'},{name:"age",value:"15"}]},{label:"第 3 步",detail:"age = 16（过了一年）",state:[{name:"name",value:'"Mike"'},{name:"age",value:"16"}]}]},compare:[{conceptA:"变量 name",conceptB:'字符串 "name"',diff:"变量不加引号，代表盒子里的值；加引号就是一段普通文字。",example:'print(name) 输出盒子里的内容；print("name") 只输出 name 这四个字母。'}],pitfalls:['把 = 理解成数学的"等于"——它是"赋值"，把右边装进左边。',"用数字开头命名变量，如 2name，会报错。"],sources:[{book:"pcc3",chapter:"第2章 2.2节"},{book:"abs3",chapter:"第1章 1.4节"}],prerequisites:["s1-05","s1-06"],task:"创建 3 个变量记录你的一件物品（名称、颜色、数量），然后用 print 输出一句话介绍它。",exercises:[{id:"s2-01-q1",qtype:"blank",stem:"在 Python 中，把值 10 装进变量 x 的写法是：x ______ 10",answer:"=",explanation:'赋值用等号 =，含义是"把右边的值装进左边的变量"。',difficulty:1},{id:"s2-01-q2",qtype:"predict",stem:"执行 x = 1；x = 2；print(x) 后输出什么？",keywords:[["2"]],explanation:"后一次赋值覆盖前一次，所以输出 2。",difficulty:1},{id:"s2-01-q3",qtype:"single",stem:"下面哪个变量名是合法的？",options:["A. 2name","B. my-name","C. my_name","D. my name"],answer:"C",explanation:"变量名只能用字母数字下划线，且不能以数字开头，不能含空格或连字符。",difficulty:2}],minutes:9,env:"browser"},{id:"s2-02",stageId:2,order:2,title:"字符串：文字的魔法",subtitle:"处理文本的基本功",hook:'"你好"、一句话、一整篇文章——在 Python 里这些都叫字符串。玩转它，你就能自动处理大量文字。',objectives:["会创建和拼接字符串","掌握常用字符串方法","理解转义字符和 f-string"],analogy:"字符串就像一串珍珠项链，每个字符是一颗珠子。你可以数有几颗、截取一段、把两段接起来。",content:`# 字符串常用操作

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
\`\`\``,examples:[{title:"生成一张个性化名片",code:`name = "Mike"
title = "Python 学习者"
city = "深圳"

card = f"姓名：{name}\\n职位：{title}\\n城市：{city}"
print(card)`,expectedOutput:`姓名：Mike
职位：Python 学习者
城市：深圳`,lines:[{code:'card = f"...{name}..."',explain:"f-string 里 {name} 会被替换成变量的值，\\n 会变成换行。"}]}],sources:[{book:"pcc3",chapter:"第2章 2.3节"},{book:"abs3",chapter:"第8章 字符串与文本编辑"}],prerequisites:["s2-01"],exercises:[{id:"s2-02-q1",qtype:"predict",stem:'print("ab" * 3) 的输出是？',keywords:[["ababab"]],explanation:"字符串乘以整数表示重复，ab 重复 3 次得到 ababab。",difficulty:1},{id:"s2-02-q2",qtype:"single",stem:'想输出"我叫Mike"（Mike 是变量 name 的值），最推荐哪种写法？',options:['A. "我叫" + name','B. f"我叫{name}"',"C. print(name)",'D. "我叫 name"'],answer:"B",explanation:"f-string 清晰易读，是格式化字符串最推荐的方式。",difficulty:2}],minutes:10,env:"browser"},{id:"s2-03",stageId:2,order:3,title:"整数、浮点数与数字运算",subtitle:"让电脑帮你算账",hook:"Python 是个超级计算器，加减乘除样样行，而且永远不会算错。",objectives:["区分整数和浮点数","掌握基本运算符","理解整除、取余、幂运算"],content:`# 数字与运算

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

**取余 % 特别有用**：判断一个数是不是偶数，看它除以 2 的余数是不是 0。

## 运算顺序

和数学一样：先乘除后加减，括号优先。

\`\`\`python
print((1 + 2) * 3)   # 9
\`\`\``,examples:[{title:"购物结账小程序",code:`apple = 3   # 单价 3 元
banana = 2  # 单价 2 元
count_apple = 5
count_banana = 4

total = apple * count_apple + banana * count_banana
print(f"总价：{total} 元")
print(f"平均每样：{total / 2:.2f} 元")`,expectedOutput:`总价：23 元
平均每样：11.50 元`,lines:[{code:"total = apple * count_apple + ...",explain:"先算乘法再算加法，和数学运算顺序一致。"},{code:"{total / 2:.2f}",explain:":.2f 表示保留两位小数，这是 f-string 的格式控制。"}]}],visual:{kind:"variable",title:"算式一步步算",description:"观察运算过程中每个变量的值。",steps:[{label:"第 1 步",detail:"apple = 3, count_apple = 5",state:[{name:"apple",value:"3"},{name:"count_apple",value:"5"}]},{label:"第 2 步",detail:"apple * count_apple = 15",state:[{name:"小计",value:"15"}]},{label:"第 3 步",detail:"banana * count_banana = 8",state:[{name:"小计2",value:"8"}]},{label:"第 4 步",detail:"15 + 8 = 23",state:[{name:"total",value:"23"}]}]},sources:[{book:"pcc3",chapter:"第2章 2.4节"},{book:"abs3",chapter:"第1章 1.2节"}],prerequisites:["s2-01"],exercises:[{id:"s2-03-q1",qtype:"blank",stem:"7 除以 2 的余数用表达式写作 7 ______ 2，结果是 1。",answer:"%",accepted:["取余","mod"],explanation:"% 是取余运算符，7 % 2 = 1。",difficulty:1},{id:"s2-03-q2",qtype:"predict",stem:"print(7 // 2) 输出什么？",keywords:[["3"]],explanation:"// 是整除，只保留整数部分，7 // 2 = 3。",difficulty:2}],minutes:8,env:"browser"},{id:"s2-04",stageId:2,order:4,title:"布尔值与比较",subtitle:'程序的"是"与"否"',hook:'程序做决定靠的是"对还是错"。Python 里，对错是一种专门的值——布尔值。',objectives:["理解布尔值 True/False","掌握比较运算符","会用布尔值表达判断"],analogy:'布尔值就像电灯开关，只有"开"和"关"两种状态，对应 True（真）和 False（假）。没有中间态。',content:`# 布尔值 True / False

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

布尔值是下一阶段 if 判断的基础，一定要理解透。`,examples:[{title:"检查成绩是否及格",code:`score = 72
print(f"成绩：{score}")
print("是否及格：", score >= 60)
print("是否优秀：", score >= 90)
print("满分吗：", score == 100)`,expectedOutput:`成绩：72
是否及格： True
是否优秀： False
满分吗： False`,lines:[{code:"score >= 60",explain:"这是一个比较，结果是 True 或 False，而不是一个数字。"}]}],compare:[{conceptA:"= ",conceptB:"==",diff:"= 是赋值（把右边装进左边）；== 是比较（判断两边是否相等，返回 True/False）。",example:'x = 5 让 x 变成 5；x == 5 问"x 是 5 吗"。'}],sources:[{book:"pcc3",chapter:"第5章 5.2节"},{book:"abs3",chapter:"第2章 2.1-2.2节"}],prerequisites:["s2-01","s2-03"],exercises:[{id:"s2-04-q1",qtype:"single",stem:"表达式 5 == 5 的结果是？",options:["A. 5","B. True","C. False","D. 报错"],answer:"B",explanation:"== 比较两个值是否相等，5 等于 5，所以结果是布尔值 True。",difficulty:1},{id:"s2-04-q2",qtype:"predict",stem:"print(10 != 10) 输出什么？",keywords:[["False"]],explanation:"!= 表示不等于，10 并不不等于 10，所以是 False。",difficulty:2}],minutes:7,env:"browser"},{id:"s2-05",stageId:2,order:5,title:"数据类型转换",subtitle:"让不同类型互相变身",hook:'用户输入的年龄是文字 "15"，可你要拿它算数——这时候就得让数据"变个身"。',objectives:["掌握 int()/float()/str() 转换","知道什么时候必须转换","避免类型转换的常见错误"],content:`# 类型转换

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

\`int("abc")\` 会报错，因为 "abc" 转不成数字。转换前要确保内容合法。`,examples:[{title:"一个简易加法器",code:`a = "10"
b = "20"
print("字符串相加：", a + b)       # 拼接成 1020
print("转为数字相加：", int(a) + int(b))  # 30`,expectedOutput:`字符串相加： 1020
转为数字相加： 30`,lines:[{code:"a + b",explain:'两个字符串相加是拼接，得到 "1020"。'},{code:"int(a) + int(b)",explain:"先转成整数再相加，得到数字 30。"}]}],sources:[{book:"pcc3",chapter:"第2章 2.4节"},{book:"abs3",chapter:"第1章 1.6.6节"}],prerequisites:["s2-01","s2-02","s2-03"],exercises:[{id:"s2-05-q1",qtype:"predict",stem:'int("3") + int("4") 的结果是？',keywords:[["7"]],explanation:"两个字符串先转成整数 3 和 4，相加得到 7。",difficulty:1},{id:"s2-05-q2",qtype:"single",stem:"input() 函数接收到的用户输入，默认是什么类型？",options:["A. 整数","B. 浮点数","C. 字符串","D. 布尔值"],answer:"C",explanation:"input() 永远返回字符串，需要数字时必须用 int() 或 float() 转换。",difficulty:2}],minutes:8,env:"browser"},{id:"s2-06",stageId:2,order:6,title:"列表：装一串数据的盒子",subtitle:"一次管理很多东西",hook:'如果变量是单个盒子，列表就是一个"多格储物柜"——一个名字下面能装一大串东西。',objectives:["会创建列表","掌握索引访问元素","会增删改列表元素"],analogy:"列表像一排带编号的储物柜。编号从 0 开始（程序员习惯从 0 数），你说几号，我就给你几号柜子里的东西。",content:`# 列表 list

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

**关键：索引从 0 数起**。第 1 个元素是 \`[0]\`，不是 \`[1])。这是新手最常踩的坑。
负数索引从后往前数，\`-1\` 是最后一个。

## 增删改

\`\`\`python
fruits[0] = "西瓜"        # 改：把第 1 个换成西瓜
fruits.append("葡萄")     # 增：末尾追加
del fruits[1]             # 删：删掉第 2 个
\`\`\`

## 长度

\`len(fruits)\` 返回列表元素个数。`,examples:[{title:"购物清单",code:`shopping = ["牛奶", "面包", "鸡蛋"]
print(f"要买 {len(shopping)} 样东西")
print("第一样：", shopping[0])
shopping.append("水果")
print("追加后：", shopping)`,expectedOutput:`要买 3 样东西
第一样： 牛奶
追加后： ['牛奶', '面包', '鸡蛋', '水果']`,lines:[{code:"shopping[0]",explain:'索引 0 是第一个元素"牛奶"。'},{code:'shopping.append("水果")',explain:"append 方法在列表末尾添加一个新元素。"}]}],visual:{kind:"variable",title:"列表索引对照",description:'列表 fruits = ["苹果", "香蕉", "橘子"] 的索引位置。',steps:[{label:"索引 0",detail:"fruits[0] → 苹果",state:[{name:"0",value:"苹果"},{name:"1",value:"香蕉"},{name:"2",value:"橘子"}]},{label:"索引 1",detail:"fruits[1] → 香蕉（不是苹果！）",state:[{name:"0",value:"苹果"},{name:"1",value:"香蕉"},{name:"2",value:"橘子"}]},{label:"负数索引",detail:"fruits[-1] → 橘子",state:[{name:"-3",value:"苹果"},{name:"-2",value:"香蕉"},{name:"-1",value:"橘子"}]}]},pitfalls:["以为第一个元素索引是 1——Python 从 0 开始。","访问不存在的索引（越界）会报 IndexError。"],sources:[{book:"pcc3",chapter:"第3章 列表简介"},{book:"abs3",chapter:"第6章 列表"}],prerequisites:["s2-01"],task:'创建一个"待办事项"列表，添加 3 件事，然后追加第 4 件并输出全部。',exercises:[{id:"s2-06-q1",qtype:"blank",stem:"列表 nums = [10, 20, 30]，要取出 20，应该写 nums[______]。",answer:"1",explanation:"索引从 0 开始，20 是第二个元素，所以索引是 1。",difficulty:1},{id:"s2-06-q2",qtype:"predict",stem:"nums = [1, 2]；nums.append(3)；print(len(nums)) 输出什么？",keywords:[["3"]],explanation:"append 追加后列表变成 [1,2,3]，长度是 3。",difficulty:2}],minutes:9,env:"browser"},{id:"s2-07",stageId:2,order:7,title:'字典：用"名字"找东西',subtitle:"键值对的力量",hook:'如果列表靠"编号"找东西，字典就靠"名字"找。想知道张三的电话，你不会翻遍通讯录数第几个，而是直接搜"张三"。',objectives:["理解键值对结构","会创建和访问字典","掌握增删改遍历"],analogy:'字典像一本真正的词典：你查"苹果"这个"键"，就能找到它的解释这个"值"。键是唯一的名字，值是对应的内容。',content:`# 字典 dict

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

字典非常适合表示"一个人的多项信息""一个物品的属性"这类结构化数据。`,examples:[{title:"个人通讯录",code:`contacts = {
    "张三": "138-0000",
    "李四": "139-1111",
}
print("张三的电话：", contacts["张三"])
contacts["王五"] = "137-2222"
for name, phone in contacts.items():
    print(f"{name} → {phone}")`,expectedOutput:`张三的电话： 138-0000
张三 → 138-0000
李四 → 139-1111
王五 → 137-2222`,lines:[{code:'contacts["张三"]',explain:"用名字（键）找到对应的电话号码（值）。"},{code:"for name, phone in contacts.items()",explain:"items() 把每个键值对拆成两个变量，方便遍历。for 循环下一阶段会详细讲。"}]}],compare:[{conceptA:"列表",conceptB:"字典",diff:'列表用数字索引（位置），适合"一串有序数据"；字典用键（名字），适合"有关联的多项信息"。',example:"购物清单用列表；一个人的姓名年龄电话用字典。"}],sources:[{book:"pcc3",chapter:"第6章 字典"},{book:"abs3",chapter:"第7章 字典与数据结构化"}],prerequisites:["s2-06"],task:"用字典记录一本图书的信息（书名、作者、价格、年份），输出其中两项。",exercises:[{id:"s2-07-q1",qtype:"single",stem:"字典中用来定位值的是？",options:["A. 索引数字","B. 键 key","C. 行号","D. 长度"],answer:"B",explanation:"字典通过键来存取值，而不是像列表那样用数字索引。",difficulty:1},{id:"s2-07-q2",qtype:"predict",stem:'d = {"a": 1}；print(d.get("b", 0)) 输出什么？',keywords:[["0"]],explanation:"get() 找不到键 b 时返回默认值 0，不会报错。",difficulty:2}],minutes:9,env:"browser"},{id:"s2-08",stageId:2,order:8,title:"元组、集合与列表操作进阶",subtitle:"更多容器与批量技巧",hook:'除了列表和字典，Python 还有两个"亲戚"：元组（不能改的列表）和集合（自动去重）。认识它们，工具箱更全。',objectives:["区分列表/元组/集合","掌握切片操作","会用列表推导式"],content:`# 另外两种容器

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

这是 Python 的"语法糖"，用一行代码替代一个循环，写熟了非常高效。`,examples:[{title:"去重与统计",code:`tags = ["Python", "编程", "Python", "自动化"]
unique = list(set(tags))
print("去重后：", unique)

nums = [x for x in range(1, 6)]
print("奇数：", [x for x in nums if x % 2 == 1])`,lines:[{code:"list(set(tags))",explain:"set 去掉重复，再用 list 转回列表。"},{code:"[x for x in nums if x % 2 == 1]",explain:"列表推导式加 if 条件，筛出奇数。"}]}],compare:[{conceptA:"列表 []",conceptB:"元组 () / 集合 {}",diff:"列表可改、有序、可重复；元组不可改、有序；集合无序、自动去重。",example:"购物车用列表；坐标用元组；标签去重用集合。"}],sources:[{book:"pcc3",chapter:"第4章 4.3-4.5节"},{book:"abs3",chapter:"第6章 6.7节"}],prerequisites:["s2-06","s2-07"],exercises:[{id:"s2-08-q1",qtype:"single",stem:"元组和列表最主要的区别是？",options:["A. 元组能存数字","B. 元组创建后不能修改","C. 元组用花括号","D. 元组不能遍历"],answer:"B",explanation:"元组是不可变序列，创建后元素不能被修改。",difficulty:2},{id:"s2-08-q2",qtype:"predict",stem:"print({1, 2, 2, 3}) 输出几个元素？",keywords:[["3","三"]],explanation:"集合自动去重，重复的 2 只保留一个，所以是 3 个元素。",difficulty:2}],minutes:10,env:"browser"}],a=[{id:"s3-01",stageId:3,order:1,title:"if 条件判断",subtitle:"让程序学会看情况办事",hook:'出门前你会看天气：下雨就带伞，不下就不带。程序也能这样"看情况办事"吗？当然能，靠的就是 if。',objectives:["说出 if 语句的作用：条件成立才执行","能写出带冒号和缩进的 if 语句","理解判断的依据是布尔值 True 或 False"],analogy:'if 就像路口的红绿灯：灯是绿的（条件为 True）你就走，灯是红的（False）你就停。程序走到 if 这里，也要先"看灯"再决定走不走。',content:`# 让程序学会判断

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

> if 的条件本质是一个布尔值：True 就执行，False 就跳过。`,examples:[{title:"根据体温判断是否发烧",code:`temp = 38.5
if temp >= 37.3:
    print("体温偏高，注意休息")
print("程序执行完毕")`,expectedOutput:`体温偏高，注意休息
程序执行完毕`,lines:[{code:"if temp >= 37.3:",explain:"条件成立时结果是 True，注意末尾的冒号不能少。"},{code:'    print("体温偏高，注意休息")',explain:"这行缩进了，归 if 管；条件成立才会执行。"},{code:'print("程序执行完毕")',explain:"没有缩进，所以不管条件如何都会执行。"}]}],visual:{kind:"flow",title:"if 的判断流程",description:"程序走到 if，先看条件是真还是假，再决定走哪条路。",steps:[{label:"第 1 步",detail:"age = 18",state:[{name:"age",value:"18"}]},{label:"第 2 步",detail:"判断 age >= 18 → True",state:[{name:"条件结果",value:"True"}]},{label:"第 3 步",detail:"条件为真，执行缩进里的 print",state:[{name:"输出",value:"你成年了"}]},{label:"换个值",detail:"age = 15 时条件为 False，跳过 print",state:[{name:"输出",value:"（什么都不打印）"}]}]},compare:[{conceptA:"缩进的代码",conceptB:"不缩进的代码",diff:"缩进的代码归 if 管，只有条件为真才执行；不缩进的代码独立于 if，无论条件如何都会执行。",example:"把 print 缩进，它可能不出现；去掉缩进，它一定出现。"}],pitfalls:["if 那一行末尾忘了写冒号，会报 SyntaxError。","该缩进的语句没缩进，结果条件成立时也什么都不执行。","把赋值符号当成判断条件来写（如 if age = 18:），判断相等要用 ==。"],sources:[{book:"pcc3",chapter:"第5章 if语句"},{book:"abs3",chapter:"第2章 if-else和流程控制"}],prerequisites:["s2-04","s2-01"],task:"写一个程序：定义变量 score，如果 score >= 60 就输出『及格』，然后改小分数观察输出的变化。",exercises:[{id:"s3-01-q1",qtype:"single",stem:"关于 if 语句，下面说法正确的是？",options:["A. if 后面不用写条件","B. 条件末尾要加冒号，执行的语句要缩进","C. 条件为 False 时程序会报错","D. 缩进只是好看，没有作用"],answer:"B",explanation:"if 语句的条件后必须有冒号，受条件控制的语句要缩进；条件为 False 只是跳过，不会报错。"},{id:"s3-01-q2",qtype:"predict",stem:`下面代码会输出什么？
x = 3
if x > 5:
    print(『大数』)
print(『结束』)`,keywords:[["结束"]],explanation:"x > 5 为 False，缩进的『大数』被跳过；最后的 print 没缩进，照常输出『结束』。"}],minutes:9,env:"browser"},{id:"s3-02",stageId:3,order:2,title:"if-else 与 if-elif-else",subtitle:"多条路，总有一条适合你",hook:"只看『如果』还不够：成绩及格要夸，不及格要鼓励；三个档位怎么分？给 if 加上『否则』和『否则如果』。",objectives:["会用 if-else 处理二选一的情况","会用 if-elif-else 处理多分支情况","理解多个分支互斥、只会执行其中一个"],analogy:"if-else 像岔路口：要么左要么右，必选一条。if-elif-else 像下楼梯：从上往下比对，符合哪级就停在哪级，后面的不再看。",content:`# 二选一：if-else

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

> elif 可以有任意多个，else 只能有一个且必须放在最后。`,examples:[{title:"成绩等级小助手",code:`score = 76
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "D"
print("等级：", grade)`,expectedOutput:"等级： C",lines:[{code:"if score >= 90:",explain:"先判断最高的档位，不成立才往下走。"},{code:"elif score >= 60:",explain:"76 满足这一档，grade 被设为 C，后面的 else 直接跳过。"}]}],compare:[{conceptA:"elif",conceptB:"else",diff:"elif 要带条件，不满足就继续往下问；else 不带条件，兜底所有剩余情况，且只能放在最后。",example:"分数判断里，elif score>=60 还要看分数；else 则包揽剩下全部。"}],pitfalls:["elif 和 else 后面也忘了写冒号。","把严格的条件写在后面（如先判 >=60 再判 >=90），高分会被前面的分支抢走。","在 else 后面又写了条件，比如 else score < 60:，这是错的。"],sources:[{book:"pcc3",chapter:"第5章 if语句"},{book:"abs3",chapter:"第2章 if-else和流程控制"}],prerequisites:["s3-01"],task:"改写成绩助手，加入『优秀、良好、及格、不及格』四档，为每档输出一句不同的鼓励语。",exercises:[{id:"s3-02-q1",qtype:"single",stem:"关于 if-elif-else，下面说法正确的是？",options:["A. 所有分支都会执行一遍","B. 只会执行第一个条件成立的分支","C. else 可以写在最前面","D. elif 后面不用写条件"],answer:"B",explanation:"程序从上往下判断，遇到第一个成立的分支执行后就结束整个结构，其余分支跳过。"},{id:"s3-02-q2",qtype:"predict",stem:"x = 5，若 x > 10 输出『A』，否则若 x > 3 输出『B』，否则输出『C』，实际输出什么？",keywords:[["B"]],explanation:"x > 10 为假，x > 3 为真，输出 B 后结束，else 不执行。"},{id:"s3-02-q3",qtype:"blank",stem:"在 if-elif-else 结构中，用来『兜底』所有剩余情况的关键字是 ______。",answer:"else",accepted:["ELSE"],explanation:"else 不匹配条件，专门处理前面分支都没命中时的情况。"}],minutes:10,env:"browser"},{id:"s3-03",stageId:3,order:3,title:"比较运算符与逻辑运算符",subtitle:"把多个条件组合起来判断",hook:"买电影票要『满 18 岁并且有票』——一个判断里藏着好几个条件。程序怎么把条件拼在一起？靠逻辑运算符。",objectives:["熟练使用比较运算符构造判断条件","掌握 and、or、not 三种逻辑运算符","能用括号控制多个条件的优先顺序"],analogy:"and 像『并且』：两件事都办成才算成功；or 像『或者』：办成一件就行；not 像『反着说』：黑变白、白变黑。",content:`# 比较与逻辑运算符

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

not 最优先，其次是 and，最后是 or。拿不准就加括号，最清楚也最不容易错。`,examples:[{title:"判断能否乘坐游乐设施",code:`age = 16
with_adult = True
if age >= 12 and (age >= 18 or with_adult):
    print("可以乘坐")
else:
    print("暂时不能乘坐")
print(not (age < 12))`,expectedOutput:`可以乘坐
True`,lines:[{code:"age >= 12 and (age >= 18 or with_adult)",explain:"and 连接两个条件都要满足；括号里的 or 表示满 18 岁或有大人陪都行。"},{code:"not (age < 12)",explain:"age < 12 是 False，not 取反后变成 True。"}]}],compare:[{conceptA:"and",conceptB:"or",diff:"and 要求所有条件都成立结果才为 True（全真才真）；or 只要有一个成立就为 True（有真就真）。",example:"age>=18 and has_ticket 两个都要满足；age>=60 or age<=12 满足其一即可。"}],pitfalls:["把相等比较 == 误写成赋值符号 =。","把 and / or 写成一个连字符或竖线符号。","not 放错位置，导致整个判断的意思完全相反。"],sources:[{book:"pcc3",chapter:"第5章 if语句"},{book:"abs3",chapter:"第2章 if-else和流程控制"}],prerequisites:["s2-04","s3-01"],task:"写程序判断一个数是否在 10 到 20 之间（含边界），用 and 连接两个比较条件，并输出结果。",exercises:[{id:"s3-03-q1",qtype:"single",stem:"表达式 (3 > 2) and (5 < 4) 的结果是？",options:["A. True","B. False","C. 3","D. 报错"],answer:"B",explanation:"3 > 2 为 True，5 < 4 为 False，and 要求两边都为真，所以结果是 False。"},{id:"s3-03-q2",qtype:"predict",stem:"print(not (2 == 3) or 5 > 10) 输出什么？",keywords:[["True"]],explanation:"2 == 3 为 False，not 取反得 True；5 > 10 为 False；True or False 为 True。"}],minutes:9,env:"browser"},{id:"s3-04",stageId:3,order:4,title:"for 循环",subtitle:"把同一件事重复做",hook:"要把水果列表里每一种水果都念一遍，一行行写 print 太笨。for 循环能帮你『自动逐个处理』。",objectives:["理解 for 循环遍历列表的执行过程","会用 range() 生成数字序列","能用循环完成累加求和"],analogy:"for 循环像流水线的工人：东西一个接一个从传送带过来，每件他都做同样的动作，直到最后一件处理完。",content:`# for 循环：重复做事的法宝

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

> 记住：循环体必须缩进；列表里有几个元素（或 range 生成几个数），循环体就执行几次。`,examples:[{title:"统计班级总分与平均分",code:`scores = [88, 92, 75, 96]
total = 0
for s in scores:
    total += s
print("总分：", total)
print("平均分：", total / len(scores))`,expectedOutput:`总分： 351
平均分： 87.75`,lines:[{code:"for s in scores:",explain:"循环把 scores 里每个分数依次交给变量 s。"},{code:"total += s",explain:"等价于 total = total + s，把当前分数累加进去。"}]}],visual:{kind:"loop",title:"for 循环一圈圈执行",description:"循环每转一圈，变量 total 就累加一次。",steps:[{label:"初始",detail:"total = 0",state:[{name:"total",value:"0"},{name:"s",value:"（无）"}]},{label:"第 1 圈",detail:"s = 88，total = 0 + 88",state:[{name:"total",value:"88"},{name:"s",value:"88"}]},{label:"第 2 圈",detail:"s = 92，total = 88 + 92",state:[{name:"total",value:"180"},{name:"s",value:"92"}]},{label:"第 3 圈",detail:"s = 75，total = 180 + 75",state:[{name:"total",value:"255"},{name:"s",value:"75"}]},{label:"第 4 圈",detail:"s = 96，total = 255 + 96 = 351",state:[{name:"total",value:"351"},{name:"s",value:"96"}]}]},pitfalls:["for 那一行末尾忘了写冒号。","循环体忘了缩进，导致只执行一次或报错。","以为 range(5) 包含 5，其实到 4 就结束了。"],sources:[{book:"pcc3",chapter:"第4章 操作列表"},{book:"abs3",chapter:"第3章 循环"}],prerequisites:["s2-06","s2-08"],task:"用 for 循环遍历一个水果列表，逐个输出水果名，并统计一共有几种水果。",exercises:[{id:"s3-04-q1",qtype:"blank",stem:"要生成 0 到 4 这 5 个数字，应写 range(______)。",answer:"5",explanation:"range(5) 从 0 开始、不含 5，正好生成 0 到 4 共 5 个数。"},{id:"s3-04-q2",qtype:"predict",stem:`total = 0
for i in range(1, 4):
    total += i
print(total)`,keywords:[["6"]],explanation:"range(1, 4) 给出 1、2、3，累加得 6。"}],minutes:10,env:"browser"},{id:"s3-05",stageId:3,order:5,title:"while 循环与 break/continue",subtitle:"条件成立就一直做，直到满意为止",hook:"不知道要做几次怎么办？比如一直抽签直到中奖。这时候 for 不够用，得请出 while 循环。",objectives:["理解 while 循环按条件重复执行的特点","会用 break 提前结束整个循环","会用 continue 跳过本轮进入下一轮"],analogy:"while 像一个不知疲倦的门卫：只要你没说停（条件成立），他就一直重复检查；break 是『直接下班』，continue 是『这一轮跳过，下一轮再来』。",content:`# while 循环：看着条件做事

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

> for 是『数着次数做』，while 是『看着条件做』。`,examples:[{title:"找出第一个能被 7 整除的数",code:`n = 1
while True:
    if n % 7 != 0:
        n = n + 1
        continue
    print("第一个能被 7 整除的数是", n)
    break`,expectedOutput:"第一个能被 7 整除的数是 7",lines:[{code:"while True:",explain:"条件恒为真，配合 break 使用，表示一直找、找到为止。"},{code:"continue",explain:"不能被 7 整除时，n 加 1 后跳过本轮，直接进入下一次判断。"},{code:"break",explain:"找到了就立刻跳出循环，不再继续。"}]}],visual:{kind:"loop",title:"break 与 continue 的区别",description:"continue 只跳过本轮，break 直接结束整个循环。",steps:[{label:"第 1 轮",detail:"n = 1，不能被 7 整除 → continue",state:[{name:"n",value:"1"},{name:"动作",value:"跳过本轮"}]},{label:"第 2 轮",detail:"n = 2，仍不能整除 → continue",state:[{name:"n",value:"2"},{name:"动作",value:"跳过本轮"}]},{label:"第 7 轮",detail:"n = 7，能被 7 整除 → 打印并 break",state:[{name:"n",value:"7"},{name:"动作",value:"结束循环"}]}]},compare:[{conceptA:"break",conceptB:"continue",diff:"break 直接结束整个循环，后面的轮次都不再做；continue 只跳过当前这一轮剩下的代码，循环继续下一轮。",example:"找数时，找到目标用 break；不满足条件时用 continue 跳过。"},{conceptA:"for 循环",conceptB:"while 循环",diff:"for 适合已知重复次数（遍历序列）；while 适合次数不定、要看条件决定是否继续。",example:"遍历列表用 for；一直输入直到输入 q 用 while。"}],pitfalls:["while 循环体里忘记改变条件，导致死循环。","把 break 和 continue 的作用记反。","while True 没有配上 break，程序永远停不下来。"],sources:[{book:"pcc3",chapter:"第7章 用户输入和while循环"},{book:"abs3",chapter:"第3章 循环"}],prerequisites:["s3-01","s3-04"],task:"用 while 循环从 1 数到 10，遇到 5 时用 continue 跳过打印，观察最终输出少了哪个数字。",exercises:[{id:"s3-05-q1",qtype:"single",stem:"想让循环立刻整个结束，应该使用哪个关键字？",options:["A. continue","B. break","C. pass","D. else"],answer:"B",explanation:"break 会立即跳出循环；continue 只跳过本轮，循环仍继续。"},{id:"s3-05-q2",qtype:"debug",stem:"下面代码停不下来，问题出在哪？代码：count = 1；while count <= 5:；    print(count)",keywords:[["count","没有","增加"],["死循环"]],explanation:"循环体里没有改变 count 的语句（如 count = count + 1），条件永远成立，形成死循环。"}],minutes:10,env:"browser"},{id:"s3-06",stageId:3,order:6,title:"列表与循环结合（含嵌套循环）",subtitle:"让数据排着队接受处理",hook:"打印一个 5 行的三角形，每行星星数量都不一样。一列列写 print 太累了——让循环套循环帮你画。",objectives:["会用循环遍历并加工列表元素","理解嵌套循环的执行顺序","能用嵌套循环打印图形和乘法表"],analogy:"嵌套循环像日历：外层循环翻『月份』，内层循环翻『日期』。外层翻一页，内层要把这个月的日子全翻一遍。",content:`# 列表遇上循环

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

> 嵌套循环的总执行次数 = 外层次数 × 内层次数。上面的例子一共打印 3 × 4 = 12 颗星。`,examples:[{title:"打印直角三角形",code:`for i in range(1, 5):
    for j in range(1, i + 1):
        print("*", end="")
    print()`,expectedOutput:`*
**
***
****`,lines:[{code:"for i in range(1, 5):",explain:"外层控制行数，i 从 1 到 4。"},{code:"for j in range(1, i + 1):",explain:"内层控制每行的星星数，第 i 行打印 i 颗。"},{code:"print()",explain:"内层结束后打印一个空行，实现换行。"}]}],pitfalls:["把外层循环和内层循环的缩进写错，导致图形不对。","以为嵌套循环只执行外层次数，忘了要相乘。","用下标修改列表时，range 的边界写成 len(列表) + 1 导致越界。"],sources:[{book:"pcc3",chapter:"第4章"},{book:"abs3",chapter:"第3章"}],prerequisites:["s3-04","s2-06"],task:"用嵌套循环打印一个 6 行的直角三角形，第 n 行打印 n 颗星星。",exercises:[{id:"s3-06-q1",qtype:"predict",stem:`for i in range(2):
    for j in range(3):
        print(i, j)`,keywords:[["0 0"],["0 1"],["0 2"],["1 0"],["1 1"],["1 2"]],explanation:"外层 i 取 0、1，每个 i 内层 j 取 0、1、2，共 6 行，print 默认用空格隔开两个数。"},{id:"s3-06-q2",qtype:"program",stem:"编程题：读取输入的一行整数（用空格分隔），输出其中所有偶数的和。要求用循环遍历列表，并用测试用例验证。",code:`nums = list(map(int, input().split()))
# 在这里补全代码，输出偶数的和`,testCases:[{stdin:"1 2 3 4",expected:"6"},{stdin:"10 11 12",expected:"22"}],answer:"",explanation:"遍历列表，用取余判断 n % 2 == 0 找出偶数并累加：2 + 4 = 6，10 + 12 = 22。"}],minutes:12,env:"browser"}],r=[{id:"s4-01",stageId:4,order:1,title:"什么是函数（用自动售货机比喻）",subtitle:"给一段代码起个名字，随时拿来用",hook:"你投币、按一下按钮，自动售货机内部忙活一阵，掉出一瓶饮料。你不需要懂它内部构造——函数就是这样一台『代码售货机』。",objectives:["用自己的话说出函数是什么","理解函数能避免重复、方便修改","会定义并调用一个最简单的函数"],analogy:"函数像自动售货机：参数是『你投的币和按的按钮』，函数体是『机器内部动作』，返回值是『掉出来的饮料』。你不关心内部，按对按钮就行。",content:`# 函数：给一段代码起个名字

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

> 函数把『做什么』封装起来，让主程序变得清爽好读。`,examples:[{title:"用函数改造重复代码",code:`def say_hello():
    print("你好！")
    print("欢迎学习 Python！")

say_hello()
say_hello()`,expectedOutput:`你好！
欢迎学习 Python！
你好！
欢迎学习 Python！`,lines:[{code:"def say_hello():",explain:"def 表示定义函数，后面跟函数名和冒号。注意这里只是定义，代码不会执行。"},{code:"say_hello()",explain:"调用函数，缩进里的两行才会真正执行。调用几次就执行几次。"}]}],visual:{kind:"function",title:"函数像自动售货机",description:"调用就是投币按按钮，函数内部干活后交出结果。",calls:[{name:"say_hello",args:"（无）",returns:"打印两行问候，没有返回值"},{name:"len",args:"[1, 2, 3]",returns:"3"},{name:"print",args:"你好",returns:"在屏幕上显示，没有返回值"}]},compare:[{conceptA:"定义函数 def",conceptB:"调用函数",diff:"定义只是写好说明书，代码不会执行；调用才是按按钮，让函数真正干活。",example:"def say_hello(): 写好后没有任何输出；say_hello() 调用后才打印。"}],pitfalls:["定义函数时忘了写冒号或缩进。","只定义不调用，以为代码会自动运行。","函数名和变量名起成一样，造成混淆。"],sources:[{book:"pcc3",chapter:"第8章 函数"},{book:"abs3",chapter:"第4章 函数"}],prerequisites:["s3-02"],task:"定义一个函数 introduce()，里面打印你的名字和爱好，然后调用它两次，观察输出。",exercises:[{id:"s4-01-q1",qtype:"single",stem:"关于函数，下面说法正确的是？",options:["A. 定义函数时里面的代码会立即执行","B. 函数必须被调用才会执行其中的代码","C. 函数不能有名字","D. 一个函数只能调用一次"],answer:"B",explanation:"定义函数只是把它存起来，只有调用时才会执行内部代码，而且可以调用任意多次。"},{id:"s4-01-q2",qtype:"boolean",stem:"函数名和变量名可以完全一样，Python 会自动区分它们，所以不用担心混淆。",answer:"错",explanation:"同名会互相覆盖、造成混淆，应当避免使用相同的名字。"}],minutes:9,env:"browser"},{id:"s4-02",stageId:4,order:2,title:"定义函数与参数",subtitle:"给函数喂不同的原料",hook:"同样一句『你好』，想对小明说、又想对小红说，总不能写两个函数。把名字做成参数，一个函数就够用了。",objectives:["会定义带参数的函数","理解形参和实参的区别","能按正确的顺序和个数传递多个参数"],analogy:"参数像函数的『进料口』：定义时留好几个空位（形参），调用时把具体材料（实参）塞进去，函数就能加工出不同的结果。",content:`# 给函数传参数

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

没有参数的函数每次都做一样的事；有了参数，同一段代码能处理无数种情况——这正是函数值得抽象的原因。`,examples:[{title:"计算长方形面积",code:`def area(width, height):
    result = width * height
    print("面积是", result)

area(3, 4)
area(5, 6)`,expectedOutput:`面积是 12
面积是 30`,lines:[{code:"def area(width, height):",explain:"定义两个形参 width 和 height，调用时按顺序传入实际数值。"},{code:"area(3, 4)",explain:"width 得到 3，height 得到 4，算出面积 12。"}]}],compare:[{conceptA:"形参",conceptB:"实参",diff:"形参是定义函数时写在括号里的占位变量；实参是调用函数时真正传进去的具体值。",example:"def greet(name) 里的 name 是形参；greet(『小明』) 里的『小明』是实参。"}],pitfalls:["调用时参数的个数和顺序与定义不一致。","把参数名写错，导致 NameError。","以为形参的值会永久保留，其实每次调用都是全新的。"],sources:[{book:"pcc3",chapter:"第8章"},{book:"abs3",chapter:"第4章"}],prerequisites:["s4-01"],task:"定义函数 power(a, b)，输出 a 的 b 次方，然后调用它计算 2 的 3 次方。",exercises:[{id:"s4-02-q1",qtype:"blank",stem:"定义函数时写在括号里、用来接收数据的变量叫 ______ 数（填『形』或『实』）。",answer:"形",explanation:"定义时的变量叫形参，调用时传入的具体值叫实参。"},{id:"s4-02-q2",qtype:"predict",stem:`def add(a, b):
    print(a + b)
add(2, 7)`,keywords:[["9"]],explanation:"a 得到 2，b 得到 7，相加输出 9。"}],minutes:10,env:"browser"},{id:"s4-03",stageId:4,order:3,title:"返回值",subtitle:"让函数把一个结果交还给你",hook:"有些函数只负责『说给你听』（打印），有些函数会算出一个结果递给你——后者才真正能在程序里接着用。",objectives:["理解 return 的作用与执行时机","会使用返回值参与后续运算","能区分打印 print 与返回 return"],analogy:"return 像售货机的出货口：你按按钮（调用函数），机器内部处理后把饮料（结果）递出来。递出来你才能拿着它继续做事。",content:`# 让函数交出结果

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

> 打印是『说给你听』，返回是『递给你一个结果』。两者千万别混。`,examples:[{title:"判断奇偶数（返回结果）",code:`def parity(n):
    if n % 2 == 0:
        return "偶数"
    else:
        return "奇数"

print(parity(4))
print(parity(7))`,expectedOutput:`偶数
奇数`,lines:[{code:'return "偶数"',explain:"把结果『偶数』交还给调用处，函数随即结束。"},{code:"print(parity(4))",explain:"parity(4) 的值就是『偶数』，print 把它显示出来。"}]}],visual:{kind:"function",title:"返回值的传递过程",description:"参数送进去，函数算完把结果递回来。",calls:[{name:"add",args:"3, 5",returns:"8（return a + b）"},{name:"parity",args:"4",returns:"偶数"},{name:"parity",args:"7",returns:"奇数"}]},compare:[{conceptA:"print",conceptB:"return",diff:"print 只是把内容显示在屏幕上，函数本身没有结果；return 把结果交还给调用者，可以被存进变量继续使用。",example:"print(add(3, 5)) 能显示 8，是因为 add 用 return 把 8 交了出来。"}],pitfalls:["以为函数会自动打印返回值，其实要自己写 print。","在 return 后面还写代码，误以为会执行（其实不会）。","把 print 当成 return 用，导致调用处拿不到任何结果。"],sources:[{book:"pcc3",chapter:"第8章"},{book:"abs3",chapter:"第4章"}],prerequisites:["s4-02"],task:"定义函数 max2(a, b)，用 return 返回两个数中较大的那个，并调用它验证结果。",exercises:[{id:"s4-03-q1",qtype:"predict",stem:`def f(x):
    return x * 2
print(f(5) + 1)`,keywords:[["11"]],explanation:"f(5) 返回 10，加 1 得 11。返回值可以像普通数字一样参与运算。"},{id:"s4-03-q2",qtype:"blank",stem:"函数里用来把结果交还给调用者的关键字是 ______。",answer:"return",accepted:["Return","RETURN"],explanation:"return 用来返回结果并结束函数。"},{id:"s4-03-q3",qtype:"program",stem:"编程题：编写函数 is_even(n)，接收一个整数，是偶数就返回 True，否则返回 False。主程序读取一个整数输入，调用函数并打印结果（True 或 False）。",code:`def is_even(n):
    # 在这里补全代码
    pass
n = int(input())
print(is_even(n))`,testCases:[{stdin:"4",expected:"True"},{stdin:"7",expected:"False"}],answer:"",explanation:"用 return n % 2 == 0 即可返回布尔结果。4 是偶数返回 True，7 是奇数返回 False。"}],minutes:11,env:"browser"},{id:"s4-04",stageId:4,order:4,title:"默认参数与关键字参数",subtitle:"让函数的调用更省心",hook:"点奶茶时你常说『要中杯、少糖』，但大多数时候懒得说——店家有默认配置。函数的默认参数也是这个意思。",objectives:["会定义带默认值的参数","理解默认参数必须放在普通参数之后","会用关键字参数按名字传值"],analogy:"默认参数像套餐的标配：你不特别说明，就按标配来；你特别说了，就按你的要求换。关键字参数则是『点名下单』，报名字不报顺序。",content:`# 让参数更灵活

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

> 默认参数减少重复输入，关键字参数让调用更清晰、更不容易出错。`,examples:[{title:"个性化问候",code:`def greet(name, greeting="你好"):
    print(greeting + "，" + name)

greet("小明")
greet("老师", greeting="下午好")`,expectedOutput:`你好，小明
下午好，老师`,lines:[{code:'def greet(name, greeting="你好"):',explain:"greeting 有默认值，调用时可以不传。"},{code:'greet("老师", greeting="下午好")',explain:"用关键字参数指定 greeting，跳过默认值。"}]}],compare:[{conceptA:"位置参数",conceptB:"关键字参数",diff:"位置参数按定义时的顺序一一对应；关键字参数用『参数名=值』指定，顺序随意、更清晰。",example:"introduce(15, 『小明』) 容易看错；introduce(age=15, name=『小明』) 一目了然。"}],pitfalls:["把带默认值的参数写在普通参数前面，导致 SyntaxError。","关键字参数的名字写错，会报 TypeError。","同一个参数既按位置传、又按关键字传，重复赋值。"],sources:[{book:"pcc3",chapter:"第8章"},{book:"abs3",chapter:"第4章"}],prerequisites:["s4-02","s4-03"],task:'定义函数 make_coffee(size="中杯", sugar="少糖")，打印出配置，然后分别用默认参数和关键字参数各调用一次。',exercises:[{id:"s4-04-q1",qtype:"single",stem:"关于默认参数，下面说法正确的是？",options:["A. 默认参数必须写在最前面","B. 有默认值的参数要放在没有默认值的参数后面","C. 默认参数调用时一定要传值","D. 默认参数不允许有默认值"],answer:"B",explanation:"为了避免歧义，带默认值的参数必须放在普通参数之后。"},{id:"s4-04-q2",qtype:"predict",stem:`def f(a, b=2):
    print(a + b)
f(3)`,keywords:[["5"]],explanation:"调用只传了 a=3，b 用默认值 2，输出 5。"}],minutes:10,env:"browser"},{id:"s4-05",stageId:4,order:5,title:"模块、导入与标准库（含项目文件组织）",subtitle:"站在别人的肩膀上写代码",hook:"你想算平方根，难道要自己从零写算法？Python 早就有人写好了——import 一下就能用，这叫『不要重复造轮子』。",objectives:["理解模块与导入的作用","掌握 import、from、as 三种导入写法","知道常见标准库的用途与多文件项目的基本组织"],analogy:"模块像工具箱：math 是『数学工具箱』，random 是『抽签工具箱』。import 就是把工具箱搬到面前，之后从里面拿工具用。",content:`# 站在别人的肩膀上

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

> 在浏览器实验室里，math、random 这类标准库也能直接用。`,examples:[{title:"用 math 解决数学问题",code:`import math
from math import floor

print("16 的平方根：", math.sqrt(16))
print("π 保留两位：", round(math.pi, 2))
print("3.9 向下取整：", floor(3.9))`,expectedOutput:`16 的平方根： 4.0
π 保留两位： 3.14
3.9 向下取整： 3`,lines:[{code:"import math",explain:"导入 math 模块，之后用 math.功能名 调用。"},{code:"from math import floor",explain:"只导入 floor 这一个功能，可以直接写 floor(3.9)。"}]}],compare:[{conceptA:"import math",conceptB:"from math import sqrt",diff:"前者导入整个模块，用功能时要加 math. 前缀；后者只导入指定功能，可以直接用 sqrt()，但不能再调用模块里其他功能。",example:"import math 后用 math.sqrt；from math import sqrt 后直接写 sqrt。"}],pitfalls:["只写了 import math，调用时却直接写 sqrt(16)，忘了加模块名前缀。","模块名拼写错误，导致 ModuleNotFoundError。","在浏览器环境里尝试导入需要本地文件的第三方库。"],sources:[{book:"pcc3",chapter:"第8章 8.8节"},{book:"abs3",chapter:"第3章 3.3节导入模块"}],prerequisites:["s4-01"],task:"导入 math 模块，计算半径为 5 的圆的面积（π 乘以半径的平方），保留两位小数后输出。",exercises:[{id:"s4-05-q1",qtype:"single",stem:"执行 import math 后，要计算 16 的平方根，正确的写法是？",options:["A. sqrt(16)","B. math.sqrt(16)","C. math(16)","D. root(16)"],answer:"B",explanation:"用 import math 导入整个模块后，要通过『模块名.功能名』调用，即 math.sqrt(16)。"},{id:"s4-05-q2",qtype:"predict",stem:"import math；print(math.floor(3.9)) 输出什么？",keywords:[["3"]],explanation:"floor 是向下取整，3.9 向下取整为 3。"}],minutes:10,env:"browser"}],p=[{id:"s5-01",stageId:5,order:1,title:"什么是类与对象",subtitle:"一张设计图纸，和照着它造出来的东西",hook:"要造一百只一模一样的小狗，你是每次从头画一遍，还是先画好一张『小狗图纸』，再照着它造一百只？后者就是面向对象。",objectives:["用自己的话说出类和对象的关系","会定义一个最简单的类","能用类名造出对象并调用它的方法"],analogy:"类就是建筑图纸，对象是照图纸盖出来的房子。图纸本身不能住人，但照它盖出来的每一栋房子都能住人，而且彼此长得很像。",content:`# 类与对象：从图纸到实物

前面我们写的程序，数据（变量）和动作（函数）是分开的。**面向对象**把这些打包在一起：把『一类东西』的数据和本领装进一个模板里，这个模板就是**类（class）**。

## 三个关键词

- **类 class**：一张图纸，描述这类东西『有什么』『会什么』
- **对象 object**：照图纸造出来的一个具体东西，也叫**实例 instance**
- **实例化**：用『类名()』造对象的动作

比如『狗』是一个类，你家那只叫旺财的狗就是一个对象；『蛋糕模具』是类，用它烤出来的每个蛋糕都是对象。

## 类里装什么

类里面主要放两样东西：

1. **属性**：这个东西有什么特征（名字、颜色、年龄）
2. **方法**：这个东西能做什么（跑、叫、摇尾巴），本质就是写在类里的函数

## 定义一个类

用 \`class\` 关键字，类名习惯**首字母大写**：

\`\`\`python
class Dog:
    def bark(self):
        print("汪汪！")
\`\`\`

造对象、调用方法：

\`\`\`python
dog1 = Dog()
dog2 = Dog()
dog1.bark()   # 汪汪！
dog2.bark()   # 汪汪！
\`\`\`

两个对象都来自同一张『图纸』，所以都会叫。但它们是两个独立的东西，后面你可以给它们起不同的名字、设定不同的年龄——这就是面向对象最妙的地方：**一次定义，反复使用，各自不同**。`,examples:[{title:"宠物店的小狗档案",code:`class Dog:
    def bark(self):
        print("汪汪！我是小狗")

dog1 = Dog()
dog2 = Dog()
dog1.bark()
dog2.bark()
print("是不是同一个对象：", dog1 is dog2)`,expectedOutput:`汪汪！我是小狗
汪汪！我是小狗
是不是同一个对象： False`,lines:[{code:"class Dog:",explain:"定义一个叫 Dog 的类，注意首字母大写，后面要跟英文冒号。"},{code:"def bark(self):",explain:"bark 是方法，就是写在类里的函数。self 暂时记住『必须有』，下一课细讲。"},{code:"dog1 = Dog()",explain:"用类名加括号造一个对象，这叫实例化。括号里暂时不传东西。"},{code:"dog1.bark()",explain:"用『对象.方法名()』调用方法，对象就会执行图纸里写好的动作。"},{code:"dog1 is dog2",explain:"is 判断是不是同一个对象。两次 Dog() 造出的是两个独立对象，所以是 False。"}]}],visual:{kind:"variable",title:"一张图纸，造出两只小狗",description:"类 Dog 是图纸，dog1 和 dog2 是照图纸造出的两个独立对象。",variables:[{name:"Dog",value:"类（图纸）：会 bark()"}],steps:[{label:"定义图纸",detail:"class Dog 定义了一类会叫的东西",state:[{name:"Dog",value:"类（图纸）"}]},{label:"造第一个对象",detail:"dog1 = Dog()",state:[{name:"dog1",value:"Dog 对象 #1"},{name:"dog2",value:"（还没有）"}]},{label:"造第二个对象",detail:"dog2 = Dog()",state:[{name:"dog1",value:"Dog 对象 #1"},{name:"dog2",value:"Dog 对象 #2"}]},{label:"调用方法",detail:"dog1.bark() → 汪汪！",state:[{name:"dog1",value:"执行 bark()"},{name:"dog2",value:"不受影响"}]}]},compare:[{conceptA:"类",conceptB:"对象",diff:"类是图纸、模板，只有一份；对象是照图纸造出来的实物，可以有很多个，各自独立。",example:"Dog 是类，dog1 和 dog2 是两个对象；改 dog1 不会影响 dog2。"}],pitfalls:["类名忘记大写开头（不是语法错误，但不符合约定，读到的人会困惑）。","调用方法时漏写括号，写成 dog1.bark 只是取出方法本身，并不会执行。","以为两个对象是一回事——dog1 = Dog() 和 dog2 = Dog() 造出的是两块独立空间。"],sources:[{book:"pcc3",chapter:"第9章 类"}],prerequisites:["s2-07","s4-01"],task:"定义一个『手机 Phone』类，给它一个 call() 方法输出『正在打电话』，然后造出两台手机，分别调用这个方法。",exercises:[{id:"s5-01-q1",qtype:"single",stem:"关于类和对象的关系，下面哪种说法正确？",options:["A. 对象是类的图纸","B. 类是对象造出来的实物","C. 类是图纸，对象是根据图纸造出来的实物","D. 类和对象是同一个东西的两种叫法"],answer:"C",explanation:"类是抽象的模板（图纸），对象是按模板创建出来的具体实例（实物），两者是图纸与成品的关系。"},{id:"s5-01-q2",qtype:"boolean",stem:"执行 two = Dog() 和 one = Dog() 后，one 和 two 是同一个对象。",answer:"错",explanation:"每次调用 类名() 都会创建一个全新的对象，one 和 two 是两个独立的对象，用 is 判断结果是 False。"},{id:"s5-01-q3",qtype:"predict",stem:`执行下面代码会输出什么？
class Cat:
    def meow(self):
        print('喵')

c = Cat()
c.meow()`,keywords:[["喵"]],explanation:"Cat() 造出对象 c，c.meow() 调用类里定义的方法，输出『喵』。"}],minutes:11,env:"browser"},{id:"s5-02",stageId:5,order:2,title:"属性、方法与 __init__",subtitle:"让每个对象都有自己的数据",hook:"光会叫的小狗还不够，你得告诉它叫什么名字、几岁了。这些『属于它自己的信息』，就是属性。",objectives:["会给对象设置和读取属性","理解 self 的含义","会用 __init__ 在造对象时自动初始化属性"],analogy:"把 __init__ 想成『出厂设置』：工厂造出一台手机，出厂时自动装好系统、贴好序列号，不用你再一样样手动装。",content:`# 属性、方法与构造方法

## 属性：对象的『随身背包』

属性就是挂在对象身上的变量，用『对象.属性名』访问：

\`\`\`python
dog.name = "旺财"
dog.age = 3
print(dog.name)   # 旺财
\`\`\`

但每造一个都手动贴标签太麻烦，我们想要『一出生就带好属性』。

## __init__：造对象时自动执行

\`__init__\` 是一个特殊方法，造对象时**自动调用**，专门用来给属性赋初值：

\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
\`\`\`

\`dog = Dog("旺财", 3)\` 时，括号里的值会传给 __init__，属性就自动设好了。

## self 到底是什么

**self 代表『这个对象自己』**。写 \`self.name\` 意思是『我这个对象的 name 属性』。它是方法的第一个参数，调用方法时**不用手动传**，Python 会自动帮你传进去。忘记写 self 是新手最常踩的坑。

## 方法：对象能做的事

方法就是写在类里的函数，第一个参数同样要写 self：

\`\`\`python
def introduce(self):
    print(f"我是{self.name}，今年{self.age}岁")
\`\`\`

## 真实办公场景

把员工做成类：属性有姓名、部门、工资，方法有打卡、算年终奖。以后公司来一百个员工，只要 \`Employee(姓名, 部门, 工资)\` 就能造出一百份档案，再也不会漏填字段。`,examples:[{title:"员工档案小系统",code:`class Employee:
    def __init__(self, name, dept, salary):
        self.name = name
        self.dept = dept
        self.salary = salary

    def introduce(self):
        print(f"我是{self.name}，在{self.dept}部门")

zhang = Employee("张三", "财务", 8000)
li = Employee("李四", "技术", 12000)
zhang.introduce()
li.introduce()
print("张三调整薪资前：", zhang.salary)
zhang.salary = 9000
print("张三调整薪资后：", zhang.salary)`,expectedOutput:`我是张三，在财务部门
我是李四，在技术部门
张三调整薪资前： 8000
张三调整薪资后： 9000`,lines:[{code:"def __init__(self, name, dept, salary):",explain:"造对象时自动调用，接收传进来的三个值。self 代表正在被创建的那个对象。"},{code:"self.name = name",explain:"把传进来的 name 存成对象的属性。左边是属性名，右边是参数值。"},{code:'zhang = Employee("张三", "财务", 8000)',explain:"造对象时传入三个值，它们会自动传给 __init__（不用手动写 self）。"},{code:"zhang.salary = 9000",explain:"属性可以随时修改，只影响 zhang 这个对象，不影响 li。"}]}],visual:{kind:"function",title:"造对象时发生了什么",description:"调用 Employee(...) 时，Python 悄悄帮你做了两件事。",calls:[{name:"Employee(...)",args:"name=张三, dept=财务, salary=8000",returns:"一个新对象 zhang"},{name:"__init__(self, ...)",args:"self=zhang 自己（自动传入）",returns:"设置 zhang.name / dept / salary"},{name:"zhang.introduce()",args:"self 自动传入，无需手写",returns:"输出：我是张三，在财务部门"}]},compare:[{conceptA:"属性",conceptB:"方法",diff:"属性是对象『有什么』（数据，如 name），方法是对象『能做什么』（行为，如 introduce）。访问属性不加括号，调用方法要加括号。",example:"zhang.name 取出名字；zhang.introduce() 执行自我介绍。"}],pitfalls:["方法定义时漏写 self 参数，调用时会报 TypeError。","把 self 写成别的名字（如 this）——Python 不规定必须叫 self，但约定俗成，别标新立异。","调用方法时手动传 self：zhang.introduce(zhang) 是错的，self 会自动传入。"],sources:[{book:"pcc3",chapter:"第9章 类"}],prerequisites:["s5-01"],task:"写一个『图书 Book』类，属性有书名和价格，方法 show() 输出图书信息。造两本书，再修改其中一本的价格并输出。",exercises:[{id:"s5-02-q1",qtype:"single",stem:"关于 self，下面说法正确的是？",options:["A. 它代表类本身，跟对象无关","B. 它代表当前这个对象，定义方法时必须作为第一个参数","C. 调用方法时要手动把它传进去","D. 它必须写成 this 才有效"],answer:"B",explanation:"self 指向当前对象，是实例方法的第一个参数，调用时由 Python 自动传入，不需要也不应该手动传。"},{id:"s5-02-q2",qtype:"blank",stem:"造对象时会自动调用的特殊方法名是 ______（写方法名本身，前后各两个下划线）。",answer:"__init__",accepted:["init","__init__()"],explanation:"__init__ 是构造方法，在对象创建后自动执行，通常用来初始化属性。"},{id:"s5-02-q3",qtype:"predict",stem:`执行下面代码，最后一行输出什么？
class P:
    def __init__(self, x):
        self.x = x
p = P(5)
print(p.x)`,keywords:[["5"]],explanation:"P(5) 把 5 传给 __init__，存成属性 p.x，所以输出 5。"}],minutes:13,env:"browser"},{id:"s5-03",stageId:5,order:3,title:"继承与组合",subtitle:"站在别人的图纸上改，或者把多个零件拼起来",hook:"要造『会叫的狗』和『会喵的猫』，它们都是动物。你是把动物那部分重写两遍，还是让它们共用一份动物图纸？",objectives:["理解继承的 is-a 关系并能写出子类","理解组合的 has-a 关系","能根据场景选择继承还是组合"],analogy:"继承像『儿子像爸爸』：儿子天生就有一套爸爸的特征，还能再加自己的特长。组合像『组装电脑』：一台电脑由 CPU、内存、硬盘这些零件拼起来，零件各自独立。",content:`# 两种复用代码的方式

## 继承：是一种（is-a）

子类写在父类名的括号里，就自动拥有父类的属性和方法：

\`\`\`python
class Animal:
    def eat(self):
        print("正在吃东西")

class Dog(Animal):        # Dog 继承 Animal
    def bark(self):
        print("汪汪")

d = Dog()
d.eat()      # 父类的方法，直接用
d.bark()     # 子类自己的方法
\`\`\`

子类还能改写父类方法（叫**重写**），或在 \`__init__\` 里用 \`super().__init__()\` 先调用父类的初始化。

## 组合：有一个（has-a）

一个类把另一个类的对象当属性用：

\`\`\`python
class Engine:
    def start(self):
        print("发动机启动")

class Car:
    def __init__(self):
        self.engine = Engine()   # Car 有一个 Engine

c = Car()
c.engine.start()
\`\`\`

## 到底选哪个

- **『A 是一种 B』→ 用继承**：狗是一种动物、管理员是一种用户
- **『A 有一个 B』→ 用组合**：汽车有一个发动机、订单有一个客户

一个实用经验：**继承表达分类，组合表达拼装**。办公系统里，Admin 和 Guest 都继承 User（都是用户）；而一个 Order 订单里包含 Customer 对象和多个 Product 对象——这些是组合关系。能用组合就别硬套继承，代码会更灵活。`,examples:[{title:"办公系统的用户与订单",code:`class User:
    def __init__(self, name):
        self.name = name

    def login(self):
        print(f"{self.name} 登录成功")

class Admin(User):
    def delete_user(self):
        print(f"{self.name} 删除了一个用户")

class Order:
    def __init__(self, buyer):
        self.buyer = buyer   # 组合：订单里有一个用户对象

    def show(self):
        print(f"订单属于：{self.buyer.name}")

a = Admin("王管理员")
a.login()
a.delete_user()
o = Order(a)
o.show()`,expectedOutput:`王管理员 登录成功
王管理员 删除了一个用户
订单属于：王管理员`,lines:[{code:"class Admin(User):",explain:"Admin 继承 User，自动拥有 name 属性和 login 方法。"},{code:"def delete_user(self):",explain:"子类可以新增自己特有的方法，不影响父类。"},{code:"self.buyer = buyer",explain:"组合：Order 把传进来的用户对象存成属性，用『订单.买家』的方式访问。"}]}],compare:[{conceptA:"继承 is-a",conceptB:"组合 has-a",diff:"继承是『是一种』，子类自动获得父类能力，关系在写代码时就固定；组合是『有一个』，把别的对象当零件装进来，运行时可替换。",example:"Admin 是一种 User（继承）；Order 有一个 Customer（组合）。"}],pitfalls:["为了复用几行代码就乱用继承，做出『汽车继承轮胎』这种 is-a 不成立的设计。","子类重写 __init__ 后忘了调用 super().__init__()，导致父类的属性没有初始化。","把组合写成复制粘贴属性，而不是保存对方的对象，改了原对象却不同步。"],sources:[{book:"pcc3",chapter:"第9章 类"}],prerequisites:["s5-01","s5-02"],task:"定义 Person 父类有 sleep() 方法，Student 子类继承它并新增 study() 方法；再定义 School 类，用组合的方式保存一个 Student 对象。",exercises:[{id:"s5-03-q1",qtype:"single",stem:"『狗是一种动物』这种关系，最适合用哪种方式实现？",options:["A. 继承","B. 组合","C. 全局变量","D. 列表"],answer:"A",explanation:"『是一种』即 is-a 关系，是继承的典型场景；狗是动物的子类，自动获得动物的属性和方法。"},{id:"s5-03-q2",qtype:"boolean",stem:"组合关系指的是一个类把另一个类的对象当作自己的属性来使用。",answer:"对",explanation:"组合就是 has-a 关系：把其他对象『装进来』当零件，如汽车有一个发动机。"},{id:"s5-03-q3",qtype:"predict",stem:`执行下面代码最后一行输出什么？
class A:
    def hi(self):
        return 'A'
class B(A):
    pass
b = B()
print(b.hi())`,keywords:[["A"]],explanation:"B 继承 A 但没有改写 hi()，所以调用时执行父类的 hi()，返回字符串 A。"}],minutes:12,env:"browser"},{id:"s5-04",stageId:5,order:4,title:"文件读取与写入",subtitle:"让程序记住数据，关掉电脑也不丢",hook:"变量里的数据一关程序就没了。想让通讯录、记账本保存下来，就得把数据写进文件里。",objectives:["会用 with open 读写文本文件","理解读、写、追加三种模式的区别","知道为什么要指定 utf-8 编码"],content:`# 文件读写（需要本地环境）

**这一课需要 Windows + VS Code 本地环境。**浏览器出于安全限制，运行在一个隔离的『沙箱』里，不能随便读写你电脑上的文件——否则任何网页都能偷看或修改你的私密文件。所以这一课的代码请在本地命令行或 VS Code 里运行。

本课只用 Python 内置的 \`open()\`，不需要装第三方库；先把 pip 升级一下，后面装 openpyxl 等库会更顺利：

\`\`\`
pip install --upgrade pip
\`\`\`

## open() 三个要点

\`open(路径, 模式, encoding="utf-8")\` 打开一个文件，返回一个文件对象。务必用 \`with\` 包住，它会在用完后**自动关闭文件**：

\`\`\`python
with open("日记.txt", "w", encoding="utf-8") as f:
    f.write("今天学了文件读写\\n")
\`\`\`

## 三种模式

- \`r\`：读（默认）。文件不存在会报错
- \`w\`：**写，会覆盖原内容**！文件不存在则新建
- \`a\`：追加，写在末尾，不覆盖原内容

## 读文件

\`\`\`python
with open("日记.txt", "r", encoding="utf-8") as f:
    text = f.read()          # 一次读完，得到一个字符串
\`\`\`

还有 \`readline()\`（读一行）和 \`readlines()\`（读成列表）。

## 为什么写 utf-8

中文在 Windows 默认编码下容易变成乱码。\`encoding="utf-8"\` 是万能通行证，读写中文文件时**每次都写上**，能省掉九成乱码问题。

## 路径怎么写

Windows 路径里的反斜杠是转义符，容易出错。推荐用正斜杠，如 \`"D:/学习/日记.txt"\`。`,examples:[{title:"写一个工作日报，再读出来",code:`from pathlib import Path

path = "工作日报.txt"
lines = ["周一：整理客户名单", "周二：核对报表", "周三：回复邮件"]

# 用追加模式逐行写入
with open(path, "a", encoding="utf-8") as f:
    for line in lines:
        f.write(line + "\\n")

# 读回来并统计行数
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

print(content)
print("一共", len(content.strip().split("\\n")), "行")`,expectedOutput:`周一：整理客户名单
周二：核对报表
周三：回复邮件

一共 3 行`,lines:[{code:'with open(path, "a", encoding="utf-8") as f:',explain:"a 是追加模式，多次运行不会覆盖之前写的内容；with 会自动关闭文件。"},{code:'f.write(line + "\\n")',explain:"write 不会自动换行，要在末尾手动加换行符 \\n。"},{code:"f.read()",explain:"一次性读出整个文件内容，得到一个字符串。"}]}],pitfalls:["用 w 模式打开已有文件，内容被全部清空——写之前确认是不是该用 a。",'忘记写 encoding="utf-8"，中文在 Windows 上读出来是乱码。','直接用反斜杠写路径，如 "D:\\学习\\a.txt"，反斜杠会被当成转义符，建议改用正斜杠。',"以为浏览器也能跑这些代码——它做不到，这是安全设计，不是bug。"],sources:[{book:"pcc3",chapter:"第10章 文件和异常"},{book:"abs3",chapter:"第10章 读写文件"}],prerequisites:["s5-01","s5-02"],task:"在本地新建一个『待办.txt』，用 a 模式追加三条今天要做的事，再用 r 模式读出来，统计一共有几条。",exercises:[{id:"s5-04-q1",qtype:"single",stem:"想保留文件原有内容，只在末尾添加新内容，应该用哪个模式？",options:["A. r","B. w","C. a","D. x"],answer:"C",explanation:"a 是追加模式，在文件末尾写入，不会覆盖原有内容；w 会把原内容全部清空。"},{id:"s5-04-q2",qtype:"blank",stem:"为了正确读写中文不出现乱码，open() 里通常要加上参数 encoding=______。",answer:"utf-8",accepted:['"utf-8"',"UTF-8","utf8"],explanation:"utf-8 是通用的字符编码，明确指定后能避免 Windows 默认编码带来的中文乱码。"},{id:"s5-04-q3",qtype:"debug",stem:"同学想往『笔记.txt』追加一句话，写了 with open('笔记.txt', 'w') as f: f.write('新内容')，结果原来的内容全没了。问题出在哪？",keywords:[["w","覆盖"],["a","追加"]],explanation:'w 模式会先清空文件再写入，应该用 a 模式追加；另外还应加上 encoding="utf-8"。'}],minutes:14,env:"local"},{id:"s5-05",stageId:5,order:5,title:"JSON 数据与异常处理",subtitle:"让程序读懂网络数据，也学会不掉链子",hook:"网页接口给你的数据长得像字典，却不能直接当字典用；用户输入一个字母你就想算数，程序当场崩溃。这一课一次解决这两个问题。",objectives:["会用 json 模块在字符串和 Python 对象间转换","理解 JSON 与字典的差别","能用 try-except 捕获并处理常见异常"],analogy:"JSON 像国际通用的集装箱：不管对方用什么语言，把数据装进这个箱子就能互相运输。try-except 则像安全气囊：万一撞车（出错），不至于车毁人亡（程序崩溃）。",content:`# JSON 与异常处理（浏览器可运行）

好消息：json 模块和 try-except 都是基础能力，**在浏览器实验室里就能直接跑**。

## JSON 是什么

JSON 是一种文本格式的数据，长得像 Python 字典，但规则更严：**键和值都必须用英文双引号**，不支持单引号。它里面的 \`true / false / null\` 对应 Python 的 \`True / False / None\`。

\`\`\`python
import json

s = '{"name": "张三", "age": 18}'
data = json.loads(s)        # JSON 字符串 → Python 字典
print(data["name"])         # 张三

back = json.dumps(data, ensure_ascii=False)  # 字典 → JSON 字符串
print(back)
\`\`\`

\`ensure_ascii=False\` 让中文正常显示，不会被转成一串 \\uXXXX。

## 异常：程序出的『状况』

代码出错时 Python 会抛出一个**异常**。不处理，程序就中断；处理了，就能优雅地继续。

\`\`\`python
try:
    age = int("abc")        # 这里会出错
    print(age)
except ValueError:
    print("输入的不是数字，请重新输入")
else:
    print("转换成功")
finally:
    print("无论成功失败，我都会执行")
\`\`\`

- **try**：放可能出错的代码
- **except**：出错时怎么办（可写多个，分别处理不同异常）
- **else**：没出错时执行
- **finally**：无论如何都执行，常用来做清理工作

## 常见异常

\`ValueError\`（值不对）、\`KeyError\`（字典没这个键）、\`TypeError\`（类型不对）、\`ZeroDivisionError\`（除以零）。

真实场景：解析接口返回的 JSON 时，用 try-except 包住，就算对方返回了坏数据，你的程序也不会崩掉，而是提示『数据格式异常』。`,examples:[{title:"解析接口数据 + 安全的数字输入",code:`import json

# 模拟接口返回的一串 JSON 文本
raw = '{"user": "李四", "score": 88, "vip": true}'

try:
    data = json.loads(raw)
    score = int(data["score"])
    print(f"用户：{data['user']}，得分：{score}")
except json.JSONDecodeError:
    print("数据不是合法的 JSON")
except KeyError as e:
    print(f"缺少字段：{e}")
finally:
    print("解析流程结束")

# 安全的输入转换
def to_number(text):
    try:
        return int(text)
    except ValueError:
        return 0

print("结果1：", to_number("12"))
print("结果2：", to_number("abc"))`,expectedOutput:`用户：李四，得分：88
解析流程结束
结果1： 12
结果2： 0`,lines:[{code:"json.loads(raw)",explain:'把 JSON 格式的文本转换成 Python 字典，之后就能用 data["user"] 取值。'},{code:"except json.JSONDecodeError:",explain:"专门捕获 JSON 格式错误；可以写多个 except 分别处理不同异常。"},{code:"return 0",explain:"转换失败时返回一个安全的默认值，让程序继续运行而不是崩溃。"}]}],compare:[{conceptA:"json.loads()",conceptB:"json.dumps()",diff:"loads 把 JSON 字符串变成 Python 对象（解码，读进来）；dumps 把 Python 对象变成 JSON 字符串（编码，发出去）。",example:"收到网络数据用 loads，发送数据时用 dumps。"}],pitfalls:["JSON 里用了单引号或尾随逗号——JSON 只认英文双引号，格式必须严格。","把 json.loads() 当成 json.load()：前者处理字符串，后者处理打开文件对象。","写一个大 try 把整段代码都包起来，出错时根本不知道是哪一句——try 范围要尽量小。","except 后面不写异常类型，把真正的 bug 也悄悄吞掉了，排查起来更痛苦。"],sources:[{book:"pcc3",chapter:"第10章 文件和异常"},{book:"abs3",chapter:"第10章 读写文件"},{book:"abs3",chapter:"第4章 4.8节异常处理"},{book:"abs3",chapter:"第5章 调试"}],prerequisites:["s5-04","s2-07"],task:"写一个函数 read_score(text)，接收一段 JSON 文本，尝试解析出里面的 score 字段并转成整数；解析或转换失败时返回 0，并打印友好提示。",exercises:[{id:"s5-05-q1",qtype:"single",stem:"想把一段 JSON 格式的文本转换成 Python 字典，应该用哪个函数？",options:["A. json.dumps()","B. json.loads()","C. str()","D. int()"],answer:"B",explanation:"json.loads() 把 JSON 字符串解码成 Python 对象；dumps() 是反过来，把 Python 对象编码成 JSON 字符串。"},{id:"s5-05-q2",qtype:"predict",stem:`执行下面代码输出什么？
import json
d = json.loads('[1, 2, 3]')
print(type(d).__name__)`,keywords:[["list"]],explanation:"json.loads() 把 JSON 数组转换成 Python 列表，所以类型名是 list。另外 JSON 的 true/false/null 会分别变成 Python 的 True/False/None。"},{id:"s5-05-q3",qtype:"debug",stem:`下面代码想处理除以零，却没有捕获到错误，问题在哪？
try:
    x = 1 / 0
except ValueError:
    print('出错了')`,keywords:[["ZeroDivisionError"],["except","类型"]],explanation:"1 / 0 抛出的是 ZeroDivisionError，不是 ValueError，所以没被捕获；应把 except 的类型改成 ZeroDivisionError。"}],minutes:14,env:"browser"}],l=[{id:"s6-01",stageId:6,order:1,title:"文件与文件夹管理",subtitle:"让 Python 替你整理乱糟糟的下载目录",hook:"下载文件夹里堆了几百个文件？与其一个个手动拖，不如写十行代码，让 Python 一眼看清都有什么，再按需归档。",objectives:["会用 pathlib 表示路径并遍历文件夹","会判断文件是否存在、批量筛选文件","知道如何安全地删除文件"],content:`# 文件与文件夹管理（需要本地环境）

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

每月把『下载』里的 \`.xlsx\` 全部挑出来，移进『财务报表/2026』文件夹——这段脚本十秒钟搞定，还不会漏。`,examples:[{title:"扫描下载文件夹并分类统计",code:`from pathlib import Path

folder = Path("D:/下载")
if not folder.exists():
    print("文件夹不存在，请检查路径")
else:
    summary = {}
    for f in folder.iterdir():
        if f.is_file():
            ext = f.suffix.lower() or "无扩展名"
            summary[ext] = summary.get(ext, 0) + 1
    print("下载目录里共有", sum(summary.values()), "个文件")
    for ext, count in sorted(summary.items(), key=lambda x: -x[1]):
        print(f"{ext}: {count} 个")`,lines:[{code:"folder.iterdir()",explain:"遍历文件夹里直接包含的内容，返回的是 Path 对象，不是纯字符串。"},{code:"f.suffix.lower()",explain:"取出扩展名并转小写，这样 .XLSX 和 .xlsx 会被算成一类。"},{code:"summary.get(ext, 0) + 1",explain:"字典计数常用套路：取不到就用默认值 0，再加一。"}]}],pitfalls:['在路径里用反斜杠又没转义，如 "D:\\下载"——推荐直接写正斜杠 "D:/下载"。',"用 unlink() 删除后才发现删错了——它不进回收站，练习时先只打印不删。","遍历时又建文件夹又删文件，导致遍历结果变化——先收集列表，再统一处理。"],sources:[{book:"abs3",chapter:"第11章 组织文件"}],prerequisites:["s5-04"],task:"写一个脚本，扫描你桌面上的一个文件夹，统计各类文件（按扩展名）的数量，并输出结果。",exercises:[{id:"s6-01-q1",qtype:"single",stem:"想递归找出一个文件夹及其所有子文件夹里的 Excel 文件，最合适的方法是？",options:["A. p.iterdir()","B. p.rglob('*.xlsx')","C. p.name","D. p.exists()"],answer:"B",explanation:"rglob() 会递归遍历所有子目录，配合通配符 *.xlsx 就能找出全部 Excel 文件；iterdir() 只看当前一层。"},{id:"s6-01-q2",qtype:"blank",stem:"Path('报告.xlsx') 的 ______ 属性可以得到字符串 '.xlsx'（只写属性名）。",answer:"suffix",accepted:["suffix 属性"],explanation:"suffix 返回文件扩展名（含点号）；stem 返回去掉扩展名后的主文件名。"},{id:"s6-01-q3",qtype:"boolean",stem:"调用 Path.unlink() 删除的文件会被放进回收站，随时可以还原。",answer:"错",explanation:"unlink() 是彻底删除，不经过回收站；想安全删除可以用 send2trash 库。"}],minutes:13,env:"local"},{id:"s6-02",stageId:6,order:2,title:"批量重命名文件",subtitle:"几百个文件，一次改好名字",hook:"从相机拷出来的照片叫 IMG_0001、IMG_0002……想改成『旅行_001』这样的名字，手动改要点到手酸。",objectives:["会用 rename 批量改名","掌握 stem 与 suffix 拆分文件名","养成先预览再执行的安全习惯"],content:`# 批量重命名（需要本地环境）

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
- **改名又排序**：先 \`sorted()\` 固定顺序，再编号，否则每次运行结果可能不一样。`,examples:[{title:"给月度报表统一加前缀",code:`from pathlib import Path

folder = Path("D:/报表")
files = sorted(f for f in folder.glob("*.xlsx") if not f.name.startswith("2026"))
plan = []
for f in files:
    new = f.with_name(f"2026_{f.stem}{f.suffix}")
    plan.append((f, new))

print("预览改名方案：")
for old, new in plan:
    print(f"  {old.name} → {new.name}")

# 确认无误后，把下面这段的注释打开
# for old, new in plan:
#     if not new.exists():
#         old.rename(new)
#     else:
#         print("跳过（已存在）：", new.name)`,lines:[{code:'if not f.name.startswith("2026")',explain:"过滤掉已经改过名的文件，避免重复运行时名字越加越长。"},{code:'f"2026_{f.stem}{f.suffix}"',explain:"用 stem 和 suffix 拼回完整文件名，前缀加上年份。"},{code:"if not new.exists()",explain:"执行前检查目标是否已存在，防止覆盖已有文件。"}]}],pitfalls:["直接拼字符串改扩展名，把 报告.xlsx 改成 报告_新.txt 导致文件打不开。","跳过预览直接批量执行，改完才发现顺序或格式不对。","目标文件已存在还强行 rename，在 Windows 上会静默覆盖原文件。"],sources:[{book:"abs3",chapter:"第11章 组织文件"}],prerequisites:["s6-01"],task:"写一个批量改名脚本：把某个文件夹里所有的 .txt 文件加上『备份_』前缀，先打印预览方案，确认逻辑正确后再加执行代码。",exercises:[{id:"s6-02-q1",qtype:"blank",stem:"Path('照片.jpg') 的 ______ 属性可以得到主文件名 '照片'（不含扩展名，只写属性名）。",answer:"stem",explanation:"stem 是不含扩展名的主文件名；suffix 才是含点号的扩展名。"},{id:"s6-02-q2",qtype:"boolean",stem:"批量改名时，直接执行 rename 而不先预览，是很安全的做法。",answer:"错",explanation:"应该先打印改名方案预览，确认无误再执行；否则一旦规则写错，可能覆盖或改乱大量文件。"},{id:"s6-02-q3",qtype:"debug",stem:"想把 a.txt 改名为 b.txt，写了 Path('b.txt').rename('a.txt')，结果反了。正确的写法应该是什么？",keywords:[["a.txt","b.txt"],["rename","with_name"]],explanation:"rename 的调用对象是原文件，参数是新路径，应写成 Path('a.txt').rename('b.txt')，或用 with_name 生成新路径。"}],minutes:12,env:"local"},{id:"s6-03",stageId:6,order:3,title:"文本文件批量处理与正则表达式",subtitle:"从一堆文字里精准捞出你要的内容",hook:"一千个文本文件里找出所有手机号？靠肉眼找会疯，靠正则只要一行模式。",objectives:["会用 re 模块做查找与替换","理解常见正则符号的含义","能批量读取文本并处理内容"],content:'# 正则与批量文本处理\n\n**说明**：这一课的『正则演示』部分在浏览器实验室就能跑（re 是内置模块）；『批量读写文件』部分**需要 Windows + VS Code 本地环境**，因为浏览器安全限制不允许访问本地文件。先备好环境：\n\n```\npython -m pip install --upgrade pip\n```\n\n## re 模块三件套\n\n```python\nimport re\n\ntext = "联系我：138-0000-1234 或 139-1111-5678"\npattern = r"1\\d{2}-\\d{4}-\\d{4}"\n\nprint(re.findall(pattern, text))     # 找出全部匹配，返回列表\nprint(re.search(pattern, text))      # 找第一个，返回匹配对象\nprint(re.sub(pattern, "***", text))  # 把匹配内容替换掉\n```\n\n## 常见符号速查\n\n- `\\d` 数字，`\\w` 字母数字下划线，`\\s` 空白\n- `.` 任意字符，`*` 重复零次或多次，`+` 至少一次\n- `{n}` 重复 n 次，`{n,m}` 重复 n 到 m 次\n- `[]` 字符集合，如 `[0-9]`；`^` 开头，`$` 结尾\n\n前面的 `r` 表示**原始字符串**，写正则时一定要加，否则反斜杠会被 Python 先转义一次。\n\n## 批量处理文本文件（本地）\n\n```python\nfrom pathlib import Path\n\nfor f in Path("D:/日志").glob("*.txt"):\n    content = f.read_text(encoding="utf-8")\n    hits = re.findall(r"ERROR.*", content)\n    if hits:\n        print(f.name, "发现", len(hits), "条错误")\n```\n\n## 真实办公场景\n\n从几百份客服聊天记录里，正则提取所有订单号和手机号；或把日志里的乱码统一替换掉。学会正则，这类『大海捞针』的活儿就从小时级变成秒级。',examples:[{title:"提取文本里的手机号（浏览器可跑）",code:`import re

text = "张三 138-0000-1234，李四 139-1111-5678，王五 137-2222-9999"
phones = re.findall(r"1\\d{2}-\\d{4}-\\d{4}", text)
print("找到", len(phones), "个号码：")
for p in phones:
    print("  ", p)

masked = re.sub(r"(\\d{3})-(\\d{4})-(\\d{4})", r"\\1****\\3", text)
print("脱敏后：", masked)`,expectedOutput:`找到 3 个号码：
   138-0000-1234
   139-1111-5678
   137-2222-9999
脱敏后： 张三 138****1234，李四 139****5678，王五 137****9999`,lines:[{code:'r"1\\d{2}-\\d{4}-\\d{4}"',explain:"1 开头，两位数字，短杠，四位数字，短杠，四位数字。前面的 r 表示原始字符串。"},{code:"re.sub(...)",explain:"把匹配到的号码按分组重写，中间四位用星号代替，实现脱敏。"},{code:'r"\\1****\\3"',explain:"\\1 和 \\3 代表第 1、3 个括号捕获的内容，这就是『分组引用』。"}]},{title:"批量扫描日志里的错误（本地运行）",code:`from pathlib import Path
import re

folder = Path("D:/日志")
total = 0
for f in folder.glob("*.txt"):
    text = f.read_text(encoding="utf-8")
    errors = re.findall(r"ERROR:\\s*(.+)", text)
    if errors:
        total += len(errors)
        print(f"{f.name}：{len(errors)} 条错误")
print("合计错误：", total)`,lines:[{code:'f.read_text(encoding="utf-8")',explain:"一次性读出文本文件；中文内容务必指定 utf-8。"},{code:'r"ERROR:\\s*(.+)"',explain:"匹配 ERROR: 后面空白之外的所有内容，括号把它捕获成一个分组。"}]}],compare:[{conceptA:"re.search()",conceptB:"re.findall()",diff:"search 只找第一个匹配，返回匹配对象（找不到是 None）；findall 找出所有匹配，返回字符串列表（找不到是空列表）。",example:"判断有没有手机号用 search；要把所有手机号都取出来用 findall。"}],pitfalls:["忘记加原始字符串前缀 r，反斜杠被 Python 提前转义，正则失效。","把 \\d 写成 d，少了反斜杠就变成普通字母，匹配不到数字。",'读中文文本没写 encoding="utf-8"，读出乱码后再做匹配全是徒劳。'],sources:[{book:"abs3",chapter:"第9章 使用正则表达式匹配文本模式"},{book:"abs3",chapter:"第11章 组织文件"}],prerequisites:["s5-04","s6-01"],task:"先用 re.findall 从一段文字里提取所有 Electronic 邮箱地址（正则可用浏览器跑），再写一个本地脚本，统计某个文件夹里所有 .txt 文件中某个关键词出现的次数。",exercises:[{id:"s6-03-q1",qtype:"single",stem:"正则里 \\d 表示什么？",options:["A. 字母 d","B. 一个数字","C. 小数点","D. 一个空格"],answer:"B",explanation:"\\d 是数字字符的简写，等价于 [0-9]。"},{id:"s6-03-q2",qtype:"predict",stem:`执行下面代码输出什么？
import re
print(re.findall(r'\\d+', 'a12b345'))`,keywords:[["12","345"]],explanation:"\\d+ 匹配连续的数字，文本里有两段连续数字 12 和 345，findall 返回列表 ['12', '345']。"},{id:"s6-03-q3",qtype:"blank",stem:"在 Python 写正则时，通常在模式字符串前加字母 ______ 表示原始字符串，避免反斜杠被转义。",answer:"r",accepted:["R"],explanation:"r 前缀表示原始字符串，字符串里的反斜杠不会被 Python 转义，正则模式才能正确传给 re 模块。"}],minutes:15,env:"local"},{id:"s6-04",stageId:6,order:4,title:"Excel 数据读取与写入",subtitle:"让 Python 帮你填表、汇总、做报表",hook:"每月把几十张 Excel 里的数据复制到总表？这种『人肉复制粘贴』，Python 几秒钟就能干完，还不出错。",objectives:["会用 openpyxl 读取现有表格","会写入数据并保存新文件","能批量处理多行数据"],content:`# Excel 自动化（需要本地环境）

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

\`ws['A1']\` 取单元格，\`.value\` 才是里面的内容：

\`\`\`python
ws["A1"] = "新标题"              # 写入
print(ws["A1"].value)            # 读取
\`\`\`

## 真实办公场景

把 12 个月的销售表逐个读进来，用 Python 汇总出每个月的总额，再写进一张新表保存——从『复制一下午』变成『运行一次』。记得：**先另存为新文件，别直接覆盖原始报表**。`,examples:[{title:"汇总员工工资并生成新表",code:`from openpyxl import Workbook, load_workbook

source = load_workbook("D:/报表/工资明细.xlsx")
ws = source.active

total = 0
count = 0
for row in ws.iter_rows(min_row=2, values_only=True):
    if row[2] is not None:
        total += row[2]
        count += 1

result = Workbook()
out = result.active
out.append(["统计项", "数值"])
out.append(["人数", count])
out.append(["工资总额", total])
out.append(["平均工资", round(total / count, 2) if count else 0])
result.save("D:/报表/工资汇总.xlsx")
print("汇总完成，共", count, "人")`,lines:[{code:"iter_rows(min_row=2, values_only=True)",explain:"从第 2 行开始读（跳过表头），直接拿到每行的值组成的元组。"},{code:"if row[2] is not None:",explain:"跳过空单元格，避免把空值当数字相加导致报错。"},{code:"result.save(...)",explain:"保存为新文件，不改动原始明细表，数据安全。"}]}],pitfalls:["把 .xls 老格式交给 openpyxl，会打不开——先用 Excel 另存为 .xlsx。","直接 save 到原文件路径，一旦逻辑写错原始数据就丢了——务必另存新文件。","忘记给写入的数据调用 wb.save()，以为改了内存里的对象就存盘了。"],sources:[{book:"abs3",chapter:"第14章 Excel电子表格"}],prerequisites:["s5-04","s2-07"],task:"写一个脚本：读取一张 Excel（含姓名和分数两列），把分数大于等于 60 的人筛选出来，写入一张新表并保存。",exercises:[{id:"s6-04-q1",qtype:"single",stem:"openpyxl 主要用来处理哪种文件格式？",options:["A. .xls","B. .xlsx","C. .csv","D. .pdf"],answer:"B",explanation:"openpyxl 用于读写新版 .xlsx 文件，不支持老式 .xls 格式。"},{id:"s6-04-q2",qtype:"blank",stem:"把内存中的工作簿真正保存到磁盘，需要调用工作簿对象的 ______ () 方法（只写方法名）。",answer:"save",explanation:"wb.save(文件名) 才会把修改写入磁盘；不调用它，所有改动只停留在内存里。"},{id:"s6-04-q3",qtype:"boolean",stem:"用 openpyxl 处理报表时，为了安全，最好把结果保存成一个新文件，而不是直接覆盖原始文件。",answer:"对",explanation:"另存新文件能保留原始数据，一旦处理逻辑有误也不会破坏源报表。"}],minutes:15,env:"local"},{id:"s6-05",stageId:6,order:5,title:"PDF 与图片处理",subtitle:"合并合同、压缩照片，批量搞定",hook:"十份 PDF 合同要合并成一份，几十张照片要统一缩小尺寸——这种纯体力的活，正是 Python 最擅长的。",objectives:["会读取、合并 PDF 并提取文字","会用 Pillow 调整图片尺寸与格式","能批量处理一个文件夹里的图片"],content:`# PDF 与图片处理（需要本地环境）

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

把员工上传的证件照统一压到 800 像素以内再归档，既省空间又统一规格；把季度报告的几个 PDF 合成一个发给领导。这些原本要开软件一张张点的活，写段脚本一次跑完。`,examples:[{title:"批量压缩照片尺寸",code:`from pathlib import Path
from PIL import Image

src = Path("D:/照片/原始")
dst = Path("D:/照片/压缩")
dst.mkdir(exist_ok=True)

count = 0
for f in src.glob("*.jpg"):
    with Image.open(f) as img:
        img.thumbnail((800, 800))
        img.save(dst / f.name)
        count += 1
        print(f.name, "→", img.size)

print("共处理", count, "张照片")`,lines:[{code:"dst.mkdir(exist_ok=True)",explain:"确保输出文件夹存在；exist_ok=True 表示已存在也不报错。"},{code:"img.thumbnail((800, 800))",explain:"等比缩放，最长边不超过 800 像素，不会变形。"},{code:"with Image.open(f) as img:",explain:"用 with 管理图片对象，用完自动关闭，避免占用文件。"}]}],pitfalls:["扫描版 PDF 用 extract_text() 却取不到文字——它是图片，要先做 OCR。","用 resize() 直接指定宽高导致图片被拉伸变形——用 thumbnail() 保持比例。",'保存 JPEG 时图片模式是 RGBA，报错——先 convert("RGB") 再保存。'],sources:[{book:"abs3",chapter:"第17章 PDF文档和Word文档"},{book:"abs3",chapter:"第21章 绘制图形和操作图像"}],prerequisites:["s6-01"],task:"写一个脚本：把某个文件夹里的所有 PNG 图片等比缩小到 600 像素，另存到新文件夹，并统计处理了多少张。",exercises:[{id:"s6-05-q1",qtype:"single",stem:"想保持比例把一张大图缩小到指定大小，Pillow 里推荐用哪个方法？",options:["A. resize()","B. thumbnail()","C. crop()","D. rotate()"],answer:"B",explanation:"thumbnail() 会等比缩放并保持宽高比，不会拉伸变形；resize() 按指定尺寸强行缩放可能变形。"},{id:"s6-05-q2",qtype:"blank",stem:"在 pypdf 中，PdfReader 对象的 ______ 属性可以告诉你这份 PDF 一共有多少页（只写属性名）。",answer:"pages",explanation:"len(reader.pages) 返回 PDF 的页数，pages 是一个包含所有页的列表。"},{id:"s6-05-q3",qtype:"boolean",stem:"对扫描版（图片型）PDF 使用 extract_text()，通常能直接拿到里面的文字内容。",answer:"错",explanation:"扫描版 PDF 的正文是图片，没有文本层，extract_text() 取不到内容，需要先做 OCR 识别。"}],minutes:14,env:"local"},{id:"s6-06",stageId:6,order:6,title:"网页数据获取基础",subtitle:"让 Python 帮你把网上的信息抓回来",hook:"想把某个公示页面上的名单整理成表格？手动复制粘贴容易漏，写段脚本一次抓回来才靠谱。",objectives:["会用 requests 获取网页内容","能检查响应状态并做基本解析","了解网页抓取的边界与礼貌原则"],content:`# 网页数据获取（需要本地环境）

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

在网页实验室里，你的代码运行在沙箱中。浏览器不允许它随意向别的域名发请求（CORS），也不允许把抓到的数据写进你的本地文件——这是保护用户的安全设计，不是 Python 的问题。`,examples:[{title:"用 BeautifulSoup 解析一段 HTML",code:`from bs4 import BeautifulSoup

html = """<html><head><title>示例页面</title></head>
<body><h1>通知公告</h1>
<ul>
<li><a href="/a.html">第一条</a></li>
<li><a href="/b.html">第二条</a></li>
</ul></body></html>"""

soup = BeautifulSoup(html, "html.parser")
print("网页标题：", soup.title.text)
print("大标题：", soup.h1.text)
for a in soup.find_all("a"):
    print(a.get_text(), "→", a.get("href"))`,expectedOutput:`网页标题： 示例页面
大标题： 通知公告
第一条 → /a.html
第二条 → /b.html`,lines:[{code:"soup.title.text",explain:"取 <title> 标签里的文字内容。"},{code:'soup.find_all("a")',explain:"找出所有 <a> 链接标签，返回一个列表，可以逐个遍历。"},{code:'a.get("href")',explain:"取链接的 href 属性；用 get 即使属性不存在也不会报错。"}]}],compare:[{conceptA:"requests",conceptB:"urllib.request",diff:"requests 是第三方库，API 简洁好用，需要安装；urllib.request 是 Python 自带的，不用装但写法更繁琐。",example:"日常抓取推荐 requests；不方便装库的纯净环境可用 urllib。"}],pitfalls:["requests.get() 不写 timeout，网络异常时程序卡住不动。","不看 status_code 就直接用 r.text，把 404 错误页当成正常数据解析。","在浏览器实验室里尝试 requests.get 别的网站，因跨域限制失败——这是浏览器安全策略，要换本地环境。"],sources:[{book:"abs3",chapter:"第13章 Web内容爬取"}],prerequisites:["s5-05","s6-01"],task:"在本地用 requests 打开 https://www.example.com，打印状态码和网页标题；再写一段 BeautifulSoup 代码，从给定的 HTML 里提取所有链接文字。",exercises:[{id:"s6-06-q1",qtype:"single",stem:"requests.get() 返回结果中，哪个属性表示 HTTP 状态码（200 代表成功）？",options:["A. r.text","B. r.status_code","C. r.url","D. r.content"],answer:"B",explanation:"status_code 是响应状态码，200 表示请求成功；text 是网页文本内容。"},{id:"s6-06-q2",qtype:"boolean",stem:"在浏览器实验室里，可以像在本地一样直接用 requests 抓取任意网站并保存到本地文件。",answer:"错",explanation:"浏览器有跨域（CORS）与沙箱安全限制，不能随意请求其他域名，也不能写本地文件；这类任务必须在本地环境完成。"},{id:"s6-06-q3",qtype:"blank",stem:"用 requests 发请求时，加上 ______ 参数可以设定超时时间（如 10 秒），避免程序一直等待（只写参数名）。",answer:"timeout",explanation:"timeout=10 表示最多等待 10 秒，超时就抛出异常，避免程序无限期卡住。"}],minutes:15,env:"local"}],d=[{id:"s7-01",stageId:7,order:1,title:"CSV 文件处理",subtitle:"把一张表格压平成一行文字",hook:"你用 Excel 存过通讯录吗？如果把表格里的格子线全擦掉，只留逗号隔开每一格，它就成了 CSV——最容易和别人交换的表格格式。",objectives:["用自己的话说出 CSV 是什么","会用 csv.reader 与 DictReader 读取表格数据","会用 csv.writer 写出一行数据","知道浏览器里如何用 io.StringIO 模拟文件"],analogy:"CSV 像一张被压平的表格：格子线没有了，逗号就是格子线，换行就是新的一行。表头是每列的名字，下面的每行是一条记录。",content:`# CSV：最朴素的表格文件

**CSV = 逗号分隔值**（Comma-Separated Values）。它本质是一个纯文本文件：用逗号隔开同一行的各列，用换行表示新的一行。记事本、Excel、WPS 都能打开它。

## 它长什么样

\`\`\`
姓名,年龄,城市
小明,18,深圳
小红,20,北京
\`\`\`

第一行叫**表头**，说明每列是什么；下面每行是一条记录。可以把它想成一张被"压平"的表格——格子线没了，逗号就是格子线。

## 读取：reader 与 DictReader

Python 自带的 \`csv\` 模块专干这件事：

- \`csv.reader\`：把每行读成列表，如 \`['小明', '18', '深圳']\`
- \`csv.DictReader\`：把每行读成字典，用表头当键，如 \`{'姓名': '小明'}\`

DictReader 更省心：你不记第几列，只记列名。列名一变，代码也不用改下标。

## 写入：writer

用 \`writer.writerow([...])\` 写一行。本地真实文件要写 \`open("data.csv", newline="", encoding="utf-8")\`，其中 \`newline=""\` 能避免 Windows 下多出空行。

## 浏览器里怎么演示

真文件要靠 \`open()\`，但手机浏览器出于安全**碰不到你的真实文件**。我们用 \`io.StringIO\` 在内存里造一个"假文件"，\`csv\` 模块照读不误。把 \`io.StringIO(data)\` 换成 \`open("data.csv", encoding="utf-8")\`，其余代码一模一样。

> 这招叫"用内存模拟文件"，是浏览器里演示文件处理的标准做法。从课堂里的字符串，到工作中真实的报表，中间只差一个打开方式。`,examples:[{title:"用 DictReader 读一张内存表格",code:`import csv
import io

data = """姓名,年龄,城市
小明,18,深圳
小红,20,北京"""
f = io.StringIO(data)          # 浏览器里用内存模拟文件
reader = csv.DictReader(f)     # 表头自动变成字典的键
for row in reader:
    print(row["姓名"], "今年", row["年龄"], "岁，住在", row["城市"])`,expectedOutput:`小明 今年 18 岁，住在 深圳
小红 今年 20 岁，住在 北京`,lines:[{code:'data = """姓名,年龄,城市..."""',explain:"用三引号写一段多行文字，模拟一个 CSV 文件的全部内容。"},{code:"io.StringIO(data)",explain:'把字符串包装成"类文件"对象，这样 csv 模块就能像读真文件一样读它。'},{code:"csv.DictReader(f)",explain:"第一行表头被当作字典的键，之后每行都变成一个字典。"},{code:'row["姓名"]',explain:"按列名取值，比记下标 row[0] 清楚得多。"}]},{title:"把数据写成 CSV",code:`import csv
import io

buf = io.StringIO()
writer = csv.writer(buf, lineterminator="\\n")
writer.writerow(["姓名", "年龄"])   # 先写表头
writer.writerow(["小刚", 22])
print(buf.getvalue())`,expectedOutput:`姓名,年龄
小刚,22`,lines:[{code:'csv.writer(buf, lineterminator="\\n")',explain:"writer 负责把一行数据转成逗号分隔的文字；这里指定换行符，让结果更干净。"},{code:"writer.writerow([...])",explain:"每调用一次写一行，列表里的每一项占一格。"},{code:"buf.getvalue()",explain:'取出内存"文件"里累积的全部文字。'}]}],compare:[{conceptA:"CSV 文件",conceptB:"Excel 表格",diff:"CSV 只存纯文字和逗号，没有格式、公式、多个工作表，但任何软件都能打开；Excel 功能强却依赖专门软件。",example:"程序之间交换数据、做数据清洗，用 CSV；给人看带样式的报表，用 Excel。"}],pitfalls:['用中文逗号"，"当分隔符——CSV 默认只认英文半角逗号。',"以为浏览器能直接 open 本地文件——做不到，要用 io.StringIO 模拟。",'本地写文件时忘了 newline="" ，Windows 下每行之间会多出空行。'],sources:[{book:"pcc3",chapter:"第14章 附近（使用 CSV 数据）"},{book:"abs3",chapter:"第18章 CSV、JSON和XML文件"}],prerequisites:["s5-04","s6-01"],task:"把示例数据改成你自己的 3 行记录（比如一周的三笔开销），用 DictReader 读出来并逐行打印。",exercises:[{id:"s7-01-q1",qtype:"single",stem:"CSV 文件中，分隔同一行各列数据最常用的符号是？",options:["A. 空格","B. 英文半角逗号","C. 中文逗号","D. 换行符"],answer:"B",explanation:"CSV 全称逗号分隔值，默认用英文半角逗号隔开各列；换行符用来分隔不同的行。"},{id:"s7-01-q2",qtype:"predict",stem:`下面代码的输出是什么？
import csv, io
r = csv.reader(io.StringIO("苹果,3\\n香蕉,5"))
for row in r:
    print(row[0])`,answer:"",keywords:[["苹果"],["香蕉"]],explanation:"csv.reader 把每行读成列表，row[0] 是第一列，依次输出苹果、香蕉。"},{id:"s7-01-q3",qtype:"blank",stem:"用 csv.DictReader 读取时，字典的键来自 CSV 的第一行，这一行叫作 ______。",answer:"表头",accepted:["header","表头行","标题行"],explanation:"DictReader 会把第一行当作表头，用其中的列名作为每行字典的键。"}],minutes:10,env:"browser"},{id:"s7-02",stageId:7,order:2,title:"JSON 数据深入",subtitle:"互联网世界通用的数据格式",hook:'你用的每一个手机应用，几乎都在和服务器交换 JSON。它长得像 Python 字典，却又不是字典——今天把这对"双胞胎"分清。',objectives:["说出 JSON 是什么以及在哪些地方见到它","会用 json.loads 把 JSON 字符串转成 Python 数据","会用 json.dumps 把 Python 数据转成 JSON 字符串","知道 ensure_ascii=False 的作用"],analogy:'JSON 像一种"通用普通话"：不同语言写的程序都听得懂。Python 字典是它的母语版本，长得几乎一样，但 JSON 的键必须加英文双引号。',content:'# JSON：程序之间说话的普通话\n\n**JSON** 是一种用文字表示结构化数据的格式。它源自 JavaScript，但现在几乎所有编程语言都能读写，是网络传数据的事实标准。\n\n## 它长什么样\n\n```json\n{\n  "name": "小明",\n  "age": 18,\n  "skills": ["Python", "SQL"],\n  "active": true\n}\n```\n\n它和 Python 字典很像，但有几个硬规矩：**键必须加英文双引号**、文字用双引号、布尔值是 `true` / `false`、空值是 `null`（Python 里对应 `True` / `False` / `None`）。\n\n## 两个核心函数\n\n- `json.loads(字符串)`：把 JSON 文字"读出"成 Python 数据（load string）\n- `json.dumps(数据)`：把 Python 数据"写成" JSON 文字（dump string）\n\n记住一句口诀：**带 s 的处理字符串**。还有两个不带 s 的 `json.load` / `json.dump`，它们是直接读写文件的，留给本地环境用。\n\n## 嵌套与取值\n\nJSON 可以一层套一层：字典里装列表，列表里再装字典。取值就一层层往里走，如 `data["skills"][0]`。\n\n## 让中文正常显示\n\n默认 `json.dumps` 会把中文转成 `\\u5c0f\\u660e` 这样的编码。加上 `ensure_ascii=False` 就能原样显示中文；再加 `indent=2` 还能自动缩进，方便人读。\n\n> 浏览器里的 `json` 是标准库，直接 `import json` 就能用，不需要安装。',examples:[{title:"解析一段 JSON 文字",code:`import json

text = '{"name": "小明", "age": 18, "skills": ["Python", "SQL"]}'
data = json.loads(text)        # 字符串 → Python 字典
print("姓名：", data["name"])
print("年龄：", data["age"])
print("第一个技能：", data["skills"][0])`,expectedOutput:`姓名： 小明
年龄： 18
第一个技能： Python`,lines:[{code:"json.loads(text)",explain:"把 JSON 格式的字符串解析成 Python 字典。"},{code:'data["skills"][0]',explain:"先按键 skills 取出列表，再用下标 0 取第一个元素。"}]},{title:"把 Python 数据写成 JSON",code:`import json

info = {"name": "小红", "city": "深圳", "done": True}
print(json.dumps(info, ensure_ascii=False))
print(json.dumps(info, ensure_ascii=False, indent=2))`,expectedOutput:`{"name": "小红", "city": "深圳", "done": true}
{
  "name": "小红",
  "city": "深圳",
  "done": true
}`,lines:[{code:"ensure_ascii=False",explain:"让中文按原样输出，而不是变成 \\u 编码。"},{code:"indent=2",explain:"按 2 个空格缩进排版，人看起来更清楚。"},{code:"True → true",explain:"Python 的 True 在 JSON 里写成小写的 true。"}]}],compare:[{conceptA:"JSON 字符串",conceptB:"Python 字典",diff:"JSON 是文字（字符串），用来传输和保存；字典是内存里的对象，用来操作。两者要靠 loads / dumps 互相转换。",example:'从网络收到的是 JSON 字符串，json.loads 之后才能用 data["name"] 取值。'}],pitfalls:["手写 JSON 时用单引号或键不加引号——标准 JSON 必须用英文双引号。","把 json.loads 用在文件对象上——它只接收字符串，文件要先 read()。","中文显示成 \\u5c0f\\u660e——加 ensure_ascii=False 即可。"],sources:[{book:"pcc3",chapter:"第14章 附近（JSON 数据）"},{book:"abs3",chapter:"第18章 CSV、JSON和XML文件"}],prerequisites:["s2-07","s5-04"],task:"把两位朋友的姓名和年龄组成列表，先 json.dumps 成字符串，再 json.loads 回来，确认内容一致。",exercises:[{id:"s7-02-q1",qtype:"single",stem:"把 JSON 格式的字符串变成 Python 字典，应该用哪个函数？",options:["A. json.dumps","B. json.loads","C. print","D. str"],answer:"B",explanation:"json.loads 负责把 JSON 字符串解析成 Python 数据；json.dumps 是反方向。"},{id:"s7-02-q2",qtype:"predict",stem:'执行 import json; print(json.dumps({"ok": True, "n": None})) 的输出是？',answer:"",keywords:[["true"],["null"]],explanation:"Python 的 True 和 None 转成 JSON 后变成小写的 true 和 null。"},{id:"s7-02-q3",qtype:"blank",stem:"json.dumps 时加上参数 ______ 可以让中文不转义成编码。",answer:"ensure_ascii=False",accepted:["ensure_ascii","ensure_ascii=False"],explanation:"ensure_ascii=False 让中文字符原样输出，否则会被转成 \\u 开头的编码。"}],minutes:11,env:"browser"},{id:"s7-03",stageId:7,order:3,title:"数据清洗基础",subtitle:"分析之前，先把数据洗干净",hook:'真实世界的数据几乎都是"脏"的：多打了一个空格、空着不填、大小写乱七八糟。直接拿去算，结果一定让你怀疑人生。',objectives:["识别常见的几类脏数据","会用 strip 去掉多余空白","会跳过空值并做安全的数据类型转换","会对数据去重"],analogy:"数据清洗就像洗菜下锅：泥沙要冲掉，烂叶子要摘掉，大小不一的要切整齐。菜洗干净了，后面怎么炒都不会出错。",content:'# 数据清洗：把脏数据洗干净\n\n行业里有句话：**数据分析八成时间花在清洗上**。清洗没做好，后面的统计全是错的。\n\n## 常见的"脏"长什么样\n\n- 多余空白：`" 苹果 "` 和 `"苹果"` 看起来像，程序却当成两个东西\n- 空值：空字符串 `""`，或者 JSON 里的 `null`、Python 里的 `None`\n- 格式不统一：`"88"` 是文字，`88` 才是数字，文字直接相加会变成拼接\n- 重复记录：同一条数据出现两次\n- 命名混乱：`"北京"`、`" 北京"`、`"beijing"` 指同一个地方\n\n## 清洗三板斧\n\n1. **统一格式**：`s.strip()` 去两端空白，`s.lower()` 统一大小写\n2. **处理空值**：先判断 `if s:` 再转换，空的跳过或记为 `None`\n3. **去重**：用 `if item not in cleaned` 或 `set()`\n\n## 顺序很重要\n\n一定要**先 strip 再去重**。否则 `" 苹果 "` 和 `"苹果"` 会被当成两条不同数据，清洗完还是重复。\n\n## 浏览器里怎么练\n\n这些操作只用列表、字典和字符串方法，不需要读写文件，浏览器里直接跑。示例用内存里的列表当"原始数据"，本地项目里把它换成从 CSV / JSON 读进来的数据即可——清洗逻辑完全通用。\n\n> 记住：清洗的目标不是"让数据好看"，而是"让数据可信"。',examples:[{title:"去掉空白、空值和重复",code:`raw = [" 苹果 ", "香蕉", "", "苹果", "  橘子  "]
cleaned = []
for item in raw:
    name = item.strip()          # 先去掉两端空白
    if name and name not in cleaned:   # 跳过空字符串，并且去重
        cleaned.append(name)
print(cleaned)`,expectedOutput:"['苹果', '香蕉', '橘子']",lines:[{code:"item.strip()",explain:'去掉字符串两端的空格，" 苹果 " 变成 "苹果"。'},{code:"if name and ...",explain:"空字符串是假值，if name 为假时跳过；not in 保证不重复添加。"}]},{title:"安全地处理缺失值和类型转换",code:`rows = [
    {"name": "小明", "score": "88"},
    {"name": "小红", "score": ""},
    {"name": "小刚", "score": "92"},
]
for r in rows:
    s = r["score"].strip()
    r["score"] = int(s) if s else None   # 空的记为 None，不硬转
print(rows)`,expectedOutput:"[{'name': '小明', 'score': 88}, {'name': '小红', 'score': None}, {'name': '小刚', 'score': 92}]",lines:[{code:"int(s) if s else None",explain:'条件表达式：s 非空才转整数，否则记为 None，避免 int("") 报错。'}]}],compare:[{conceptA:"脏数据",conceptB:"干净数据",diff:"脏数据含空白、空值、重复和不一致格式，直接统计会出错；干净数据格式统一、无重复、类型正确，可以放心分析。",example:'" 88 " 和 "" 是脏的；88 和 None（明确表示缺失）是干净的。'}],pitfalls:['把空字符串 "" 和 None 混为一谈——前者是"填了但没内容"，后者是"压根没填"，处理策略不同。','去重前忘了 strip，" 苹果 " 和 "苹果" 会被当成两条。','直接对空字符串 int("")，会抛出 ValueError。'],sources:[{book:"pcc3",chapter:"第14章 附近（数据整理）"},{book:"abs3",chapter:"第18章 附近",note:"数据清洗为融合两书数据处理思想的归纳拓展主题"}],prerequisites:["s7-01","s7-02"],task:"找 5 个含多余空格和空值的字符串，写一段代码把它们洗成干净的列表，并数一数洗掉了几条。",exercises:[{id:"s7-03-q1",qtype:"boolean",stem:"数据清洗应该在数据分析之前做，否则统计结果可能不可信。",answer:"对",explanation:"脏数据会直接污染统计结果，所以清洗是分析的前置步骤。"},{id:"s7-03-q2",qtype:"predict",stem:'执行 print("  hi  ".strip()) 输出什么？',answer:"",keywords:[["hi"]],explanation:"strip() 去掉字符串首尾的空白，结果是 hi。"},{id:"s7-03-q3",qtype:"multiple",stem:"下面哪些属于常见的脏数据？（多选）",options:["A. 多余的空格","B. 缺失的空值","C. 重复的记录","D. 已经统一成小写的字母"],answer:["A","B","C"],explanation:"多余空格、空值、重复记录都会干扰统计；统一格式反而是清洗要达到的目标。"}],minutes:11,env:"browser"},{id:"s7-04",stageId:7,order:4,title:"基础数据分析与 Matplotlib 可视化",subtitle:"让数字说话，让图表讲故事",hook:"给你 30 个数字，你盯半天也看不出规律；画成一张图，三秒钟就看出谁高谁低。这就是可视化的力量。",objectives:["会计算总数、平均值、最大值、最小值","知道 Matplotlib 需要本地 Python 环境","能用文本方式做基础统计","理解柱状图、折线图适合表达什么"],analogy:'统计像给数据"算总账"，画图像给数据"拍证件照"：账算清了才心里有数，照片一摆出来别人一眼就懂。',content:`# 从数字到图表

## 先学会"算总账"

基础分析就是几个问题：一共多少？平均多少？最高最低是多少？Python 自带 \`sum()\`、\`len()\`、\`max()\`、\`min()\`，几行就够。这部分在浏览器里也能跑，是我们推荐的**文本统计**方案。

## 再学会"拍照片"

图表能让趋势一目了然：

- **柱状图**：比较不同类别的多少，比如各月销售额
- **折线图**：看随时间变化的趋势，比如每日步数
- **饼图**：看各部分占比

## 关于环境的实话：Matplotlib 在浏览器里受限

Matplotlib 是最流行的绘图库，但它依赖本地图形环境，在当前手机浏览器的在线实验室里**无法稳定安装和运行**。所以这一课标注为 \`local\`：请按前面的教程准备好 Windows + VS Code，执行 \`pip install matplotlib\` 后再画图。

不想装库也没关系——示例一用纯 Python 做文本统计，浏览器里照样能跑通，学到的分析思路一模一样。**工具会变，思路不变。**

## 画图四步曲

导入 \`matplotlib.pyplot\`（约定缩写为 \`plt\`）→ 准备 x / y 数据 → 选一种图（如 \`plt.bar\`）→ 加标题坐标后 \`plt.show()\`。

> 中文字体若显示成方块，是字体设置问题，不影响代码逻辑；本地查阅相关字体配置即可解决。`,examples:[{title:"文本统计：不装任何库也能分析（浏览器可跑）",code:`scores = [88, 92, 75, 96, 80]
print("人数：", len(scores))
print("总分：", sum(scores))
print("平均分：", round(sum(scores) / len(scores), 1))
print("最高分：", max(scores), "最低分：", min(scores))`,expectedOutput:`人数： 5
总分： 431
平均分： 86.2
最高分： 96 最低分： 75`,lines:[{code:"sum(scores) / len(scores)",explain:"总分除以人数就是平均分。"},{code:"round(..., 1)",explain:"保留 1 位小数，让结果更好读。"},{code:"max / min",explain:"内置函数直接给出最大最小值。"}]},{title:"Matplotlib 画柱状图（需本地环境）",code:`# 先执行：pip install matplotlib
import matplotlib.pyplot as plt

months = ["1月", "2月", "3月", "4月"]
sales = [120, 150, 98, 200]
plt.bar(months, sales)          # 柱状图
plt.title("季度销售额")
plt.xlabel("月份")
plt.ylabel("销售额（元）")
plt.show()`,expectedOutput:"（本地弹出图片窗口：1月120、2月150、3月98、4月200 四根柱子）",lines:[{code:"plt.bar(months, sales)",explain:"bar 画柱状图，适合比较不同月份的数值大小。"},{code:"plt.title / xlabel / ylabel",explain:"给图加标题和坐标轴说明，别人才能看懂。"},{code:"plt.show()",explain:"显示图片；忘了它，图就不会弹出来。"}]}],compare:[{conceptA:"文本统计",conceptB:"可视化图表",diff:"文本统计给出精确数字、任何环境都能跑；图表直观展示趋势和对比，但需要绘图库，浏览器里受限。",example:'先算"平均 86.2 分"确认结果，再画柱状图看清每个人高低。'}],pitfalls:["在手机浏览器里 import matplotlib 失败——这是环境限制，不是代码错了，请切到本地环境。","忘了调用 plt.show()，图不会显示。",'把列表长度当成平均值（len 是"个数"，不是"平均"）。'],sources:[{book:"pcc3",chapter:"第15章 生成数据、第16章 下载数据",note:"可视化部分需本地 Python 环境"},{book:"abs3",chapter:"第18章 附近（数据与可视化拓展）"}],prerequisites:["s7-03","s6-01"],task:"用文本统计方法算出你一周开销的总数和平均值；如果已配好本地环境，再把它画成一张柱状图。",exercises:[{id:"s7-04-q1",qtype:"boolean",stem:"Matplotlib 绘图能在当前手机浏览器的在线实验室里稳定、直接地运行。",answer:"错",explanation:"Matplotlib 依赖本地图形环境，浏览器里受限，本课标注 local，需要在本地 Python 中运行。"},{id:"s7-04-q2",qtype:"blank",stem:"求列表 list1 中的最大值，使用内置函数 ______()。",answer:"max",accepted:["max","max()"],explanation:"max(list1) 返回列表中的最大值；最小值用 min()。"},{id:"s7-04-q3",qtype:"predict",stem:"执行 print(round(431 / 5, 1)) 输出什么？",answer:"",keywords:[["86.2"]],explanation:"431 / 5 = 86.2，round(..., 1) 保留一位小数，结果仍是 86.2。"}],minutes:14,env:"local"},{id:"s7-05",stageId:7,order:5,title:"HTTP 基础与 API 是什么",subtitle:"让程序学会上网要数据",hook:'你刷手机时，应用一直在悄悄向服务器"要数据"：要今天的天气、要新的消息。它们之间说话的规矩叫 HTTP，开的那个窗口叫 API。',objectives:["说出客户端、服务器、请求、响应的关系","知道 GET 与 POST 的大致区别","理解 API 是什么","认识两个真实可用的公开接口"],analogy:"API 像餐厅的菜单：你（客户端）按菜单点单（发请求），厨房（服务器）做好端出来（返回响应）。菜单上没写的菜，你点不到——接口规定了你能要什么。",content:`# HTTP 与 API：程序之间怎么聊天

## 一次对话的四要素

- **客户端**：发请求的一方，比如你的浏览器或手机应用
- **服务器**：接收请求、返回数据的一方
- **请求 request**：客户端说"我想要什么"
- **响应 response**：服务器说"给你，或者出错了"

你输入一个网址、按下回车，就是发了一次 HTTP 请求。

## 常见的动作与状态码

- **GET**：取数据，参数常写在网址后面，如 \`?q=python&page=1\`
- **POST**：提交数据，比如发一条评论，数据放在请求体里
- **200**：成功；**404**：没找到；**500**：服务器内部出错

## API 是什么

API（应用程序接口）就是别人开放给你的"数据窗口"。你按约定好的网址和参数去要，对方按约定好的格式（通常是 JSON）给你。这样你不用知道对方数据库长什么样。

## 真实可用的公开接口（不是编的）

本课只举两个真实存在的公开接口，你可以立刻在浏览器打开验证：

- \`https://httpbin.org/get\` —— 专门用来测试 HTTP 请求，会把你发的参数原样返回
- \`https://api.github.com\` —— GitHub 的公开接口，例如访问 \`https://api.github.com/users/octocat\` 能看到一个真实用户的信息

示例里也会出现"模拟数据示例"字样：那是**模仿真实接口返回结构**写的字符串，方便你在不联网时练习解析。我们绝不会编造一个根本不存在的接口地址——那只会把你带偏。

## 浏览器里的限制

在线实验室为了安全，通常不允许随意访问外部网络。所以这一课以**概念 + 本地网络请求**为主：示例用字符串演示解析，本地环境可以用 \`urllib.request\` 或第三方库真正发请求。`,examples:[{title:"解析一份模拟数据示例（结构仿照真实接口 https://api.github.com）",code:`import json

# 模拟数据示例：真实接口 https://api.github.com 返回的数据结构类似下面
fake_response = '{"login": "octocat", "public_repos": 8, "followers": 1000}'
user = json.loads(fake_response)
print("用户名：", user["login"])
print("公开仓库数：", user["public_repos"])
print("粉丝数：", user["followers"])`,expectedOutput:`用户名： octocat
公开仓库数： 8
粉丝数： 1000`,lines:[{code:"fake_response",explain:"这是一段模拟数据示例，用来练习解析；真实数据请用 urllib 从接口获取。"},{code:"json.loads(...)",explain:"接口返回的通常是 JSON 字符串，解析成字典后才能按键取值。"}]},{title:"拼一个真实接口的网址（不发请求，也能看懂参数）",code:`# https://httpbin.org/get 是真实公开的测试接口
base = "https://httpbin.org/get"
params = [("q", "python"), ("page", "1")]
query = "&".join(k + "=" + v for k, v in params)
print(base + "?" + query)`,expectedOutput:"https://httpbin.org/get?q=python&page=1",lines:[{code:"params",explain:"网址里问号后面的部分叫查询参数，用 & 连接，形式是 键=值。"},{code:'"&".join(...)',explain:"把每组参数拼成 键=值，再用 & 串起来，正是 GET 参数的写法。"}]}],compare:[{conceptA:"GET",conceptB:"POST",diff:'GET 把参数放网址里，用来"取数据"，能被收藏和缓存；POST 把数据放请求体，用来"提交数据"，更适合发评论、登录。',example:"看文章用 GET；发一条评论用 POST。"}],pitfalls:["把模拟数据当成真实接口返回的结果——模拟数据只是练习解析用的字符串。","凭空编造一个接口地址——本课只用 httpbin.org 和 api.github.com 这类可验证的公开接口。",'把 404 当成"成功"——404 表示资源没找到，200 才是成功。'],sources:[{book:"pcc3",chapter:"第17章 使用API",note:"示例接口 httpbin.org 与 api.github.com 均为公开可用接口"},{book:"abs3",chapter:"第18章 附近（网络与数据拓展）"}],prerequisites:["s4-05","s5-05"],task:"在浏览器打开 https://httpbin.org/get 看看返回的 JSON 长什么样，再用上面的模拟数据练习一次解析。",exercises:[{id:"s7-05-q1",qtype:"single",stem:'HTTP 请求中，最常用来"获取资源"的方法是？',options:["A. GET","B. POST","C. UPDATE","D. DELETE"],answer:"A",explanation:"GET 用于获取资源，参数通常写在网址里；POST 多用于提交数据。"},{id:"s7-05-q2",qtype:"boolean",stem:"本课示例里用到的 httpbin.org 和 api.github.com 是编造出来、实际并不能访问的接口。",answer:"错",explanation:"这两个都是真实、公开、可直接访问的接口；模拟数据只是模仿其返回结构，绝不能编造虚构接口。"},{id:"s7-05-q3",qtype:"blank",stem:"服务器返回状态码 ______ 通常表示请求成功。",answer:"200",accepted:["200","200 OK"],explanation:"200 表示请求成功；常见的还有 404（未找到）和 500（服务器错误）。"}],minutes:10,env:"browser"},{id:"s7-06",stageId:7,order:6,title:"Web 应用与 Flask 入门",subtitle:"用 Python 写出自己的第一个网页",hook:"你每次打开网页，背后往往有个程序在认真接请求、回内容。Flask 让这件听起来很高级的事，几行代码就能做到。",objectives:['理解 Web 应用"接收请求、返回内容"的基本流程',"会写出一个最小的 Flask 应用","理解路由的作用","知道 Flask 必须在本地环境运行"],analogy:"Web 应用像一家小餐馆：网址是门牌号，路由是服务员，负责把客人带到对应的桌子（函数）；厨房做好菜（返回值）再端给客人（浏览器）。",content:`# 用 Flask 做自己的网页

## Web 应用到底在干什么

它就是一个**一直运行的程序**：浏览器发来请求，它根据网址决定调用哪个函数，把函数返回的内容送回浏览器。内容和逻辑都在服务器上，所以叫"服务端"。

## Flask 是什么

Flask 是一个轻量的 Python Web 框架，"轻"在核心简单、上手快，几行就能跑起来。更大的项目常用 Django——教材里讲的是 Django，思想相通，这里用 Flask 入门更省力。

## 先装再跑

这一课标注 \`local\`：在命令行执行 \`pip install flask\`，新建一个 \`app.py\`，写入最小应用，然后运行 \`python app.py\`。看到提示后，在浏览器打开 \`http://127.0.0.1:5000\` 就能看到你的网页。

> \`127.0.0.1\` 是"本机"的意思：这个网站只跑在你自己电脑上，别人访问不到，正好用来练习。

## 路由：网址和函数的对应关系

装饰器 \`@app.route("/")\` 把"根网址"和下面的函数绑在一起。你还可以写 \`@app.route("/user/<name>")\`，尖括号里的 \`name\` 会作为参数传给函数——网址不同，看到的内容就不同。

## 为什么浏览器实验室做不到

在线实验室运行的是临时代码，不能在你手机上启动一个长期运行的服务器。所以这一课必须切到本地 Windows + VS Code 环境，这也是"从学习走向实际应用"必经的一步。`,examples:[{title:"最小的 Flask 应用（需本地环境）",code:`# 先执行：pip install flask
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "你好，这是我的第一个网页！"

if __name__ == "__main__":
    app.run(debug=True)`,expectedOutput:"本地运行 python app.py 后，浏览器访问 http://127.0.0.1:5000 显示：你好，这是我的第一个网页！",lines:[{code:"app = Flask(__name__)",explain:"创建一个 Flask 应用实例，__name__ 让框架知道去哪里找资源。"},{code:'@app.route("/")',explain:"路由装饰器：把根网址 / 交给 home 函数处理。"},{code:"app.run(debug=True)",explain:"启动本地服务器；debug 模式下改代码会自动重载，方便调试。"}]},{title:"带动态参数的多页面",code:`from flask import Flask

app = Flask(__name__)

@app.route("/user/<name>")
def user(name):
    return f"你好，{name}！欢迎光临。"

if __name__ == "__main__":
    app.run(debug=True)`,expectedOutput:"访问 http://127.0.0.1:5000/user/小明 显示：你好，小明！欢迎光临。",lines:[{code:'@app.route("/user/<name>")',explain:"尖括号声明一段动态路径，这部分内容会作为参数传给函数。"},{code:"def user(name)",explain:"参数名要和路由里的 <name> 一致，Flask 会自动把网址里的值传进来。"}]}],compare:[{conceptA:"静态网页",conceptB:"Flask Web 应用",diff:"静态网页内容写死在文件里，谁看都一样；Flask 应用每次请求都能动态生成内容，比如显示不同用户的名字。",example:"公司简介适合静态页；个人中心、留言板适合 Web 应用。"}],pitfalls:["在手机浏览器里 import flask 失败——必须在本地环境安装并运行。","改了代码却没看到变化——debug 模式会自动重载，否则要手动重启服务器。","端口 5000 被别的程序占用——关掉占用程序，或换一个端口。"],sources:[{book:"pcc3",chapter:"第18-20章 Django入门及部署",note:"教材讲 Django，此处用更轻量的 Flask 演示同类 Web 应用思想"},{book:"abs3",chapter:"第12章 附近（程序部署思路）"}],prerequisites:["s7-05","s5-05"],task:"本地新建 app.py，写出首页和 /user/<name> 两个路由，启动后分别访问两个网址，确认显示不同内容。",exercises:[{id:"s7-06-q1",qtype:"blank",stem:'Flask 中声明"网址路径对应哪个函数"的装饰器是 @app.______。',answer:"route",accepted:["route","route()","@app.route"],explanation:"@app.route(路径) 把某个网址和函数绑定起来，这就是路由。"},{id:"s7-06-q2",qtype:"boolean",stem:"Flask 应用可以直接在手机浏览器的在线实验室里启动服务器并长期运行。",answer:"错",explanation:"在线实验室无法启动本地服务器，Web 应用必须在本地 Python 环境中运行。"},{id:"s7-06-q3",qtype:"predict",stem:'定义了 @app.route("/about") 后，访问哪个网址路径会触发对应函数？',answer:"",keywords:[["/about"]],explanation:"路由里的路径就是触发条件，访问 /about 时 Flask 才会调用那个函数。"}],minutes:14,env:"local"}],c=[{id:"s8-01",stageId:8,order:1,title:"项目一：个人记账系统",subtitle:"从今天起，把每一笔花销都管起来",hook:'钱花到哪儿了？很多人月底都说不清。今天你亲手写一个记账本，让每一笔开销都留下痕迹——这是从"学着写"到"写来用"的第一步。',objectives:["把一个真实需求拆成可执行的功能","用字典表示一笔账、用列表管理多笔账",'写出"菜单循环 + 函数分派"的程序结构',"完成一个能记账、查看、汇总的小程序"],analogy:"记账系统像一本带目录的账本：一笔账是一行字（字典），整本账是很多行（列表），菜单就是目录，翻到哪页由你说了算。",content:`# 项目一：个人记账系统

## 一、项目需求

做一个能记录日常开销的小程序：每笔账包含日期、项目、金额三项信息。程序提供菜单，能记一笔、看全部、按项目汇总、退出。浏览器环境用内存列表保存数据；本地版本只需把列表换成文件读写，逻辑不用改。

## 二、功能拆解

1. 数据结构：用字典表示一笔账，用列表装下所有账目。
2. 记一笔：接收三项输入，追加到列表。
3. 看全部：逐行打印每一笔。
4. 做汇总：按项目累计金额，并算出总支出。
5. 主循环：用 while 显示菜单，根据选择调用不同函数，输入 0 退出。

## 三、开发思路

先把"一笔账"长什么样定清楚，再让列表管很多笔；每个功能写成独立函数，主菜单只负责调度。这种"分而治之"的思路，是后面所有项目的通用套路。

## 四、逐步实现

先写 \`add_record\` 完成添加；再写 \`show_all\` 逐行打印；然后写 \`summary\` 做分组累计；最后用 while 循环把菜单串起来。记住：每写完一个函数就单独测一次，别攒到最后一起调试。

## 五、常见错误

金额忘了用 \`int\` 或 \`float\` 转换，字符串相加会变成拼接；字典键名写错（如把"金额"写成"钱"），取值就找不到；退出条件是 \`choice == "0"\`，别写成赋值 \`=\`；列表为空时求平均会除以零。

## 六、最终成果

运行后出现菜单：输入 1 记账、2 查看、3 汇总、0 退出。选择汇总时，能清楚看到每个项目各花了多少、总共花了多少——一个真正能拿去用的记账本。

## 七、拓展挑战

给账目增加"分类"字段并按分类统计；本地版用 \`json.dumps\` 把数据存成文件，下次打开还能接着记；再加一个"撤销上一笔"的功能。`,examples:[{title:"核心数据结构与汇总函数",code:`def add_record(records, date, item, amount):
    records.append({"date": date, "item": item, "amount": amount})

def summary(records):
    total = 0
    by_item = {}
    for r in records:
        total += r["amount"]
        by_item[r["item"]] = by_item.get(r["item"], 0) + r["amount"]
    return total, by_item

records = []
add_record(records, "2026-11-19", "午餐", 25)
add_record(records, "2026-11-19", "公交", 4)
total, by_item = summary(records)
print("总支出：", total)
print("分项：", by_item)`,expectedOutput:`总支出： 29
分项： {'午餐': 25, '公交': 4}`,lines:[{code:'{"date": date, ...}',explain:"一笔账用一个字典表示，字段名固定，后面取值才不会乱。"},{code:'by_item.get(r["item"], 0)',explain:"get 的第二个参数是默认值：这个项目第一次出现时从 0 开始累加。"}]},{title:"菜单主循环：把功能串起来",code:`records = []
while True:
    print("1 记一笔  2 看全部  3 汇总  0 退出")
    choice = input("请选择：")
    if choice == "0":
        print("再见！")
        break
    elif choice == "1":
        item = input("项目：")
        amount = int(input("金额："))
        add_record(records, "今天", item, amount)
    elif choice == "3":
        total, _ = summary(records)
        print("总支出：", total)`,expectedOutput:"（菜单循环运行：输入 0 时输出：再见！）",lines:[{code:"while True",explain:"无限循环让菜单一直显示，直到遇到 break 才结束。"},{code:'choice == "0"',explain:"用 == 比较字符串；记得把输入转成整数的地方也要一致。"}]}],visual:{kind:"flow",title:"记账程序的一次菜单循环",description:'看一次"显示菜单 → 读入选择 → 分派功能 → 回到菜单"的完整流程。',steps:[{label:"第 1 步：显示菜单",detail:"打印 1 记一笔 / 2 看全部 / 3 汇总 / 0 退出"},{label:"第 2 步：读入选择",detail:'choice = input("请选择：")',state:[{name:"choice",value:'"1"'}]},{label:"第 3 步：判断分派",detail:'if choice == "0" 退出；elif 是 "1" 调用 add_record',state:[{name:"records",value:"[一笔新账]"}]},{label:"第 4 步：回到菜单",detail:"循环继续，等待下一次操作；输入 0 时 break 结束"}]},compare:[{conceptA:"字典表示一笔账",conceptB:"列表表示所有账",diff:'字典用一个名字（键）定位一项信息，适合描述"一笔账"；列表按下标存放很多笔，适合管理"一本账"。',example:'records[0]["amount"] 表示第一笔账的金额。'}],pitfalls:['金额没转成数字，导致 25 + 4 变成 "25" + "4" 拼成 "254"。','把退出判断 choice == "0" 写成 choice = "0"，赋值和比较搞混。',"列表为空时直接算平均值，出现除以零错误。"],sources:[{book:"abs3",chapter:"第12章 设计并部署命令行程序（及末尾各章项目）",note:"本项目的命令行菜单结构来自 abs3，数据组织与汇总借鉴 pcc3 数据处理章节，是融合两书重构的项目"},{book:"pcc3",chapter:"第6章 字典、第14章 附近（数据处理）"}],prerequisites:["s4-01","s6-01","s7-01","s7-02"],task:'给记账系统加上"删除最后一笔"的功能：输入 4 时弹出 records 的最后一项，并提示删除成功。',exercises:[{id:"s8-01-q1",qtype:"program",stem:"编程题：先从标准输入读入一个整数 n（支出笔数），接着读入 n 个整数金额（每个占一行）。输出两行：第一行「总计：X」，第二行「平均：Y」，其中 X 是金额总和，Y 是平均值并保留 1 位小数。例如输入 3、10、20、30，应输出「总计：60」和「平均：20.0」。",code:`n = int(input())
amounts = []
for _ in range(n):
    amounts.append(int(input()))
# 在这里计算总计和平均，并按格式输出`,answer:"",testCases:[{stdin:`3
10
20
30
`,expected:`总计：60
平均：20.0`}],explanation:"用循环读入 n 个金额，sum 求总计，sum/len 求平均，再用 f-string 的 :.1f 保留一位小数。注意输出文字要和题目一致。"},{id:"s8-01-q2",qtype:"single",stem:'在记账系统里，用哪种数据结构表示"一笔账"（含日期、项目、金额）最合适？',options:["A. 一个整数","B. 一个字典","C. 一个字符串","D. 一个布尔值"],answer:"B",explanation:"字典能用键存多项相关信息，如 date、item、amount，正好描述一笔账。"},{id:"s8-01-q3",qtype:"debug",stem:'有同学写 total = total + amount，其中 amount = input() 得到的是 "25"，结果 total 变成了字符串拼接。该怎么改？',answer:"",keywords:[["int","float","转换"]],explanation:"input() 返回的永远是字符串，计算前要先用 int(amount) 或 float(amount) 转成数字。"}],minutes:18,env:"browser"},{id:"s8-02",stageId:8,order:2,title:"项目二：自动文件整理工具",subtitle:"让乱糟糟的下载文件夹自己归位",hook:'下载文件夹里图片、文档、压缩包全堆在一起？写个小程序，按文件类型自动分门别类——这正是 Python 最擅长的"体力活"。',objectives:["用 pathlib 遍历文件夹并判断文件类型","按扩展名把文件分到不同文件夹","安全地移动文件并处理重名","养成先预览再执行的好习惯"],analogy:"文件整理工具像一位勤劳的图书管理员：先看书名（扩展名）判断类别，再按类别放到对应书架（文件夹），而且动手前先列一张清单核对。",content:`# 项目二：自动文件整理工具

## 一、项目需求

写一个程序，把"下载"文件夹里的文件按扩展名归类：图片放"图片"，PDF 和 Word 放"文档"，其余放"其他"。要求不误删、不覆盖，整理完打印一份清单。

## 二、功能拆解

1. 遍历源文件夹里的每一项，跳过文件夹只处理文件。
2. 用 \`suffix\` 取扩展名并转成小写。
3. 按映射表找到目标类别，没有就归"其他"。
4. 创建目标文件夹（已存在就复用）。
5. 移动文件，遇到同名先改名，避免覆盖。

## 三、开发思路

路径别用字符串硬拼，交给 \`pathlib.Path\`——它用 \`/\` 运算符拼路径，跨平台不会出错。移动文件用 \`shutil.move\`。最关键的一步：先写"预览模式"，只打印将要做什么，确认无误再真正执行。

## 四、逐步实现

先写遍历并打印每个文件的扩展名；再加分类映射表 \`rules\`；然后创建目标文件夹；最后调用 \`shutil.move\`。每一步都在小文件夹里试跑，别一上来就拿真实资料开刀。

## 五、常见错误

源路径写错导致"找不到文件"；把文件夹也当文件移动；目标文件夹忘了 \`exist_ok=True\` 会报"已存在"错误；两个同名文件直接移动会互相覆盖；文件正被其他程序占用时移动会失败。

## 六、最终成果

运行后，杂乱的下载文件夹被整理得井井有条，屏幕上列出"照片.jpg → 图片"这样的清单，一目了然。

## 七、拓展挑战

按修改日期归档到"2026-11"这样的月份文件夹；递归处理子文件夹；把操作写成日志记录到文本文件；加一个"撤销上次整理"的功能。`,examples:[{title:"按扩展名分类并移动",code:`from pathlib import Path
import shutil

source = Path("下载")
target = Path("整理后")
rules = {".jpg": "图片", ".png": "图片", ".pdf": "文档", ".docx": "文档"}

for f in source.iterdir():
    if not f.is_file():
        continue
    folder = rules.get(f.suffix.lower(), "其他")
    dest_dir = target / folder
    dest_dir.mkdir(parents=True, exist_ok=True)
    shutil.move(str(f), str(dest_dir / f.name))
    print(f"移动：{f.name} → {folder}")`,expectedOutput:`移动：照片.jpg → 图片
移动：说明.pdf → 文档
移动：misc.txt → 其他`,lines:[{code:"f.suffix.lower()",explain:"suffix 取扩展名（含点号），lower 统一成小写，避免 .JPG 漏判。"},{code:"target / folder",explain:"Path 重载了 / 运算符用来拼路径，比字符串拼接安全。"},{code:"mkdir(parents=True, exist_ok=True)",explain:"一次创建多级目录；目录已存在也不报错。"}]},{title:"先预览：只看看，不动手",code:`from pathlib import Path

for f in Path("下载").iterdir():
    if f.is_file():
        print(f.name, "的扩展名是", f.suffix or "（无）")`,expectedOutput:`照片.jpg 的扩展名是 .jpg
说明.pdf 的扩展名是 .pdf
README 的扩展名是 （无）`,lines:[{code:'f.suffix or "（无）"',explain:"没有扩展名时 suffix 是空字符串，用 or 给出提示文字。"},{code:"只 print 不 move",explain:"预览模式能帮你发现规则写错、路径写错等问题，是安全整理的护身符。"}]}],compare:[{conceptA:"预览模式",conceptB:"执行模式",diff:"预览模式只打印计划、不改动文件，用来检查规则；执行模式才真正移动文件。先预览后执行，能避免不可逆的错误。",example:"开发时固定用预览，确认清单正确后，再把 move 那行代码放开。"}],pitfalls:["路径用字符串硬拼，反斜杠和斜杠混用，换个系统就出错——用 pathlib。","忘了跳过文件夹，把整个子目录当文件移动。","同名文件直接移动会覆盖，移动前要检查目标是否存在并改名。"],sources:[{book:"abs3",chapter:"第12章 设计并部署命令行程序（及末尾各章项目）",note:"本项目融合两书重构：文件遍历与自动化思路来自 abs3，pathlib 写法为现代 Python 推荐方式"},{book:"pcc3",chapter:"第10章 附近（文件与异常处理）"}],prerequisites:["s5-04","s6-01"],task:"先写一个只打印不移动的预览版，确认规则正确后，再加入真正移动的代码，并给同名文件自动加序号。",exercises:[{id:"s8-02-q1",qtype:"single",stem:'在 pathlib 中，表达式 Path("a") / "b" 表示什么？',options:["A. 做除法运算","B. 拼接路径得到 a/b","C. 比较两个路径","D. 删除文件"],answer:"B",explanation:"Path 重载了 / 运算符，用来把两段路径拼成 a/b，跨平台都正确。"},{id:"s8-02-q2",qtype:"boolean",stem:'真正移动文件之前，先写"预览模式"打印将要做的操作，是个好习惯。',answer:"对",explanation:"预览能在不改动文件的前提下检查规则和路径，避免不可逆的误操作。"},{id:"s8-02-q3",qtype:"predict",stem:'执行 Path("note.TXT").suffix.lower() 得到什么？',answer:"",keywords:[[".txt"]],explanation:'suffix 得到 ".TXT"，lower() 转成小写 ".txt"，正好用于统一扩展名。'}],minutes:16,env:"local"},{id:"s8-03",stageId:8,order:3,title:"项目三：Excel 数据分析工具",subtitle:"让表格自己算出答案",hook:"面对几百行销售记录，手工加一遍又慢又容易错。写个程序读进去、算一算、写回来——这才是 Python 帮你省时间的正确姿势。",objectives:["用 openpyxl 读取 Excel 数据","跳过表头并逐行累计","把统计结果写入新文件","识别并处理单元格类型问题"],analogy:"这个工具像一位会计助手：按行翻账本（读每一行），把同名科目的金额累加（分组统计），最后在账本末尾写一张汇总表（写回文件）。",content:`# 项目三：Excel 数据分析工具

## 一、项目需求

有一份"销售.xlsx"，每行是"产品、金额"。请统计每个产品的销售额，把结果打印出来，并另存为一份新表格，不破坏原始文件。

## 二、功能拆解

1. 用 \`load_workbook\` 打开工作簿，取活动工作表。
2. 从第 2 行开始遍历，跳过表头。
3. 逐行取产品名和金额，空的跳过。
4. 用字典按产品累计金额。
5. 打印汇总，并在新工作簿中写入结果、保存。

## 三、开发思路

表头只是说明，不是数据，所以 \`min_row=2\` 很关键。金额在 Excel 里可能是数字，也可能是文字，统一用 \`float()\` 转成数字再累加。永远写新文件（如"销售_统计后.xlsx"），别覆盖原件。

## 四、逐步实现

先只读前 3 行看看数据结构；再写累计字典；然后打印结果；最后用 \`openpyxl.Workbook()\` 新建表格写入并保存。每步都拿一小段数据验证。

## 五、常见错误

\`min_row\` 设成 1，把表头"产品、金额"当成数据累计；单元格是字符串没转数字，导致拼接；把 \`None\` 直接转 float 报错；直接 \`wb.save("销售.xlsx")\` 覆盖了原始文件，数据找不回来。

## 六、最终成果

屏幕输出"苹果：1200.00 元"这样的汇总，同时生成新文件"销售_统计后.xlsx"，里面是一张干净的统计表——原件完好无损。

## 七、拓展挑战

把统计结果做成柱状图插入表格；一次处理一个文件夹里的多份表格；只统计金额大于 100 的记录；按月份分组做对比。`,examples:[{title:"读取并分组统计",code:`# 先执行：pip install openpyxl
from openpyxl import load_workbook

wb = load_workbook("销售.xlsx", data_only=True)
ws = wb.active

total_by_product = {}
for row in ws.iter_rows(min_row=2, values_only=True):
    product, amount = row[0], row[1]
    if product is None or amount is None:
        continue
    total_by_product[product] = total_by_product.get(product, 0) + float(amount)

for name, money in total_by_product.items():
    print(f"{name}：{money:.2f} 元")`,expectedOutput:`苹果：1200.00 元
香蕉：800.00 元`,lines:[{code:"min_row=2",explain:"从第 2 行开始读，跳过第 1 行的表头。"},{code:"values_only=True",explain:"直接拿到单元格的值，而不是 Cell 对象，处理更方便。"},{code:"float(amount)",explain:"统一转成数字，避免字符串拼接；:.2f 让输出保留两位小数。"}]},{title:"把结果写入新文件",code:`from openpyxl import Workbook

out = Workbook()
sheet = out.active
sheet["A1"] = "产品"
sheet["B1"] = "销售额"
for i, (name, money) in enumerate(total_by_product.items(), start=2):
    sheet.cell(row=i, column=1, value=name)
    sheet.cell(row=i, column=2, value=round(money, 2))
out.save("销售_统计后.xlsx")
print("已保存到新文件，原文件未改动")`,expectedOutput:"已保存到新文件，原文件未改动",lines:[{code:"enumerate(..., start=2)",explain:"从 2 开始编号，正好跳过新表的表头行。"},{code:'out.save("销售_统计后.xlsx")',explain:"写到新文件名，保护原始数据，这是数据处理的好习惯。"}]}],compare:[{conceptA:"原文件",conceptB:"统计结果新文件",diff:"原文件保留原始数据，随时可复查；结果文件只放加工后的内容，方便交付。两者分开，出错也能重来。",example:'"销售.xlsx" 只读不改，"销售_统计后.xlsx" 用来写汇总。'}],pitfalls:["min_row 写成 1，把表头也当数据参与统计。","单元格是字符串却直接相加，变成文字拼接而不是数值累加。","直接保存回原文件名，覆盖了原始数据，无法恢复。"],sources:[{book:"abs3",chapter:"第12章 设计并部署命令行程序（及末尾各章项目）",note:"本项目融合两书重构：命令行与数据处理流程参考 abs3，openpyxl 为现代 Excel 处理工具"},{book:"pcc3",chapter:"第14章 附近（数据处理）"}],prerequisites:["s6-03","s7-03"],task:"给统计脚本加一个筛选：只统计金额大于 100 的记录，并把结果写入新文件。",exercises:[{id:"s8-03-q1",qtype:"blank",stem:"openpyxl 中打开一个已存在工作簿，使用的函数是 ______()。",answer:"load_workbook",accepted:["load_workbook","load_workbook()"],explanation:"load_workbook(文件名) 用来读取已有的 Excel 文件；新建工作簿用 Workbook()。"},{id:"s8-03-q2",qtype:"multiple",stem:"处理 Excel 数据时，哪些做法容易导致错误？（多选）",options:["A. 忘记跳过表头行","B. 数字单元格是字符串却直接相加","C. min_row 设成 1 把表头当数据","D. 把金额转成 float 再累加"],answer:["A","B","C"],explanation:"A、B、C 都会让统计结果出错；转成 float 再算是正确做法。"},{id:"s8-03-q3",qtype:"boolean",stem:"为了省事，处理完 Excel 后直接覆盖保存原文件是最安全的做法。",answer:"错",explanation:"覆盖原文件会丢失原始数据，一旦逻辑出错无法恢复；应另存为新文件。"}],minutes:18,env:"local"},{id:"s8-04",stageId:8,order:4,title:"项目四：个人任务管理程序",subtitle:"把待办事项交给程序替你记",hook:"待办事项越积越多，脑子记不住？写一个任务管理程序，添加、完成、删除、统计都交给它，你只需要决定先做哪一件。",objectives:["设计合理的任务数据结构","实现任务的增删改查","用布尔值表示完成状态","写出清晰的主菜单循环"],analogy:"任务管理程序像一张便利贴墙：每张便利贴是一项任务（字典），墙上贴了很多张（列表），写完了就打个勾（done=True），不需要的就撕掉。",content:`# 项目四：个人任务管理程序

## 一、项目需求

做一个命令行小工具：能添加任务、查看所有任务、把某任务标记为完成、删除任务、统计还有几件没做。数据在浏览器里用内存列表保存，本地版可换成 JSON 文件持久化。

## 二、功能拆解

1. 任务结构：\`id\`、\`title\`、\`done\` 三个字段。
2. 添加：分配一个不重复的 id，状态设为未完成。
3. 查看：每行显示"序号、标题、是否完成"。
4. 完成/删除：按 id 找到任务再操作。
5. 统计：数一数 \`done\` 为 \`False\` 的任务有几个。

## 三、开发思路

状态用布尔值 \`True\` / \`False\`，别用『完成』和『未完成』这种字符串——字符串容易写法不一致。id 用一个独立变量递增分配，删除后也不会重复。每个操作写成函数，主循环只做"读选择、调函数、打印结果"。

## 四、逐步实现

先写 \`add_task\` 和 \`list_tasks\` 跑通"添加→查看"；再写 \`finish\` 用循环按 id 查找；然后写 \`remove\`；最后加统计和菜单。查找时一旦找到就 \`return\`，别继续往后找。

## 五、常见错误

id 写死导致重复；把状态写成字符串，判断时拼错字母就永远匹配不上；修改任务时循环里没 \`return\`，结果找到了还继续跑；空列表时直接取 \`tasks[0]\` 报错。

## 六、最终成果

菜单里有添加、查看、完成、删除、统计五项。运行后你能清楚地看到哪些任务已完成、还剩几件要做——一个真正帮你减负的小工具。

## 七、拓展挑战

给任务加优先级和截止日期；按状态过滤只看未完成；本地版把任务存成 JSON 文件，关掉程序再打开还在；加一个"清空已完成"的批量操作。`,examples:[{title:"任务数据结构与添加、查看",code:`tasks = []
next_id = 1

def add_task(title):
    global next_id
    tasks.append({"id": next_id, "title": title, "done": False})
    next_id += 1

def list_tasks():
    for t in tasks:
        mark = "√" if t["done"] else " "
        print(f"[{mark}] {t['id']}. {t['title']}")

add_task("写周报")
add_task("复习 Python")
list_tasks()`,expectedOutput:`[ ] 1. 写周报
[ ] 2. 复习 Python`,lines:[{code:"global next_id",explain:"函数里要修改全局变量 next_id，必须用 global 声明。"},{code:'"√" if t["done"] else " "',explain:"done 为 True 就打勾，否则留空，用布尔值控制显示最清楚。"}]},{title:"按 id 完成任务",code:`def finish(task_id):
    for t in tasks:
        if t["id"] == task_id:
            t["done"] = True
            return True
    return False

print("完成第 1 项：", finish(1))
list_tasks()`,expectedOutput:`完成第 1 项： True
[√] 1. 写周报
[ ] 2. 复习 Python`,lines:[{code:'if t["id"] == task_id',explain:"按 id 精确查找，id 不重复才能保证找到的正是那一项。"},{code:"return True",explain:"找到并处理完就立刻返回，避免循环继续做多余的事。"}]}],compare:[{conceptA:"布尔状态 True / False",conceptB:'字符串状态 "完成" / "未完成"',diff:"布尔值只有两种取值，判断简单不会写错；字符串可能有空格、错别字、大小写差异，判断时极易漏掉。",example:'if t["done"] 一眼就懂；if t["state"] == "已完成 " 多一个空格就永远不成立。'}],pitfalls:["用字符串表示完成状态，写法不一致导致判断永远不成立。","id 写死或重复，完成第 1 项时可能误改另一项。","循环找到任务后忘了 return，继续遍历做了多余操作。"],sources:[{book:"abs3",chapter:"第12章 设计并部署命令行程序（及末尾各章项目）",note:"本项目融合两书重构：命令行程序骨架来自 abs3，任务建模思路借鉴 pcc3 字典与列表章节"},{book:"pcc3",chapter:"第6章 字典、第8章 附近（函数）"}],prerequisites:["s4-01","s2-07"],task:'给任务管理程序加上"统计未完成数量"菜单项：遍历列表，数出 done 为 False 的任务并打印。',exercises:[{id:"s8-04-q1",qtype:"program",stem:"编程题：先读入一个整数 n，接着读入 n 行，每行是 0 或 1（0 表示未完成，1 表示已完成）。输出一行「未完成：X」，X 为 0 出现的次数。例如输入 5、0、1、0、0、1，应输出「未完成：3」。",code:`n = int(input())
states = []
for _ in range(n):
    states.append(int(input()))
# 在这里统计 0 的个数并按格式输出`,answer:"",testCases:[{stdin:`5
0
1
0
0
1
`,expected:"未完成：3"}],explanation:"用循环读入 n 个状态，再用 states.count(0) 数出未完成任务数，最后按格式输出。"},{id:"s8-04-q2",qtype:"single",stem:'表示任务的"完成 / 未完成"状态，最合适的数据类型是？',options:["A. 整数","B. 布尔值","C. 列表","D. 字典"],answer:"B",explanation:"布尔值 True / False 只有两种状态，语义清晰，判断时不会因写法不一致出错。"},{id:"s8-04-q3",qtype:"predict",stem:"执行 print([0, 1, 0, 1, 0].count(0)) 输出什么？",answer:"",keywords:[["3"]],explanation:"count(0) 统计列表中 0 出现的次数，共 3 次，输出 3。"}],minutes:16,env:"browser"},{id:"s8-05",stageId:8,order:5,title:"项目五：简单 Web 应用",subtitle:"把你写的东西放到网页上",hook:'前面写的程序都只能在命令行里跑。最后一个项目，我们把它变成一个网页——打开浏览器就能用，这才是"从学习走向实际应用"的完整闭环。',objectives:["用 Flask 写出可添加待办的小网站","区分 GET 请求与 POST 提交","用 request.form 读取表单数据","理解项目从命令行到网页的迁移过程"],analogy:"这个网站像一张在线便利贴墙：浏览器是访客，Flask 是墙的管理员；访客填表提交（POST）就贴一张，刷新页面（GET）就看到全部。",content:`# 项目五：简单 Web 应用

## 一、项目需求

把项目四的任务清单搬到网页上：打开首页能看到所有待办，页面上有输入框，提交后新增一项。数据先用内存列表保存，本地运行即可体验。

## 二、功能拆解

1. 一个首页路由 \`/\`，同时接受 GET（显示）和 POST（提交）。
2. GET 时生成任务列表的 HTML 页面。
3. POST 时用 \`request.form\` 读取输入框内容，加入列表。
4. 提交后用 \`redirect\` 回到首页，避免刷新重复提交。
5. 再加一个 \`/api/todos\` 返回 JSON，让程序也能读数据。

## 三、开发思路

同一个网址要处理两种请求：第一次打开是 GET，用来显示；填表提交是 POST，用来写入。所以 \`@app.route\` 要写 \`methods=["GET", "POST"]\`。HTML 可以直接用字符串拼接（入门够用），进阶再用模板文件。

## 四、逐步实现

先写只返回"你好"的最小应用跑通；再加任务列表的 HTML 拼接；然后处理 POST 提交；最后加 JSON 接口。每改一次都在浏览器刷新看效果。

## 五、常见错误

路由忘了写 \`methods=["POST"]\`，提交时报 405；表单 input 的 \`name\` 和 \`request.form.get\` 里的名字对不上，永远读到空值；忘写 \`debug=True\`，改代码要手动重启；端口 5000 被占用。

## 六、最终成果

本地启动后打开 \`http://127.0.0.1:5000\`，能看到待办清单，输入内容点添加，列表立刻变长；访问 \`/api/todos\` 还能拿到 JSON 数据——一个真正的 Web 应用诞生了。

## 七、拓展挑战

用模板文件（Jinja2）代替字符串拼接；把数据存进 SQLite 数据库，关闭程序也不丢；加上删除按钮和完成勾选；把应用部署到云平台让别人也能访问。`,examples:[{title:"能添加待办的首页（需本地环境）",code:`# 先执行：pip install flask
from flask import Flask, request, redirect, url_for

app = Flask(__name__)
todos = []

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        todos.append(request.form.get("title", "").strip())
        return redirect(url_for("index"))
    items = "".join(f"<li>{t}</li>" for t in todos)
    return f"<h1>待办清单</h1><ul>{items}</ul>" \\
           f"<form method='post'><input name='title'>" \\
           f"<button>添加</button></form>"

if __name__ == "__main__":
    app.run(debug=True)`,expectedOutput:"本地运行 python app.py 后，访问 http://127.0.0.1:5000 显示待办清单；提交后列表新增一项",lines:[{code:'methods=["GET", "POST"]',explain:"同一个网址既要显示又要接收提交，两种方法一并声明。"},{code:'request.form.get("title", "")',explain:'读取表单里 name 为 title 的输入框；给默认值""，没填也不会报错。'},{code:'redirect(url_for("index"))',explain:"提交后跳回首页，避免刷新页面导致重复提交。"}]},{title:"再提供一个 JSON 接口",code:`from flask import jsonify

@app.route("/api/todos")
def api_todos():
    return jsonify({"count": len(todos), "items": todos})`,expectedOutput:'访问 http://127.0.0.1:5000/api/todos 得到类似：{"count": 1, "items": ["写周报"]}',lines:[{code:"jsonify(...)",explain:"把 Python 字典转成 JSON 响应，并设置正确的响应类型。"},{code:"/api/todos",explain:"这种给程序读的接口就是 API，和网页共用同一份数据。"}]}],compare:[{conceptA:"GET 请求",conceptB:"POST 请求",diff:'GET 用来"看"，参数出现在网址里，适合打开页面；POST 用来"交"，数据放在请求体里，适合提交表单。',example:'打开待办清单是 GET；点"添加"按钮提交内容是 POST。'}],pitfalls:['路由忘了写 methods=["POST"]，提交表单时报 405 方法不允许。',"input 的 name 与 request.form.get 的参数名不一致，读到空字符串。","没开 debug 模式，改代码后必须手动重启服务器才生效。"],sources:[{book:"pcc3",chapter:"第18-20章 Django入门及部署",note:"教材讲 Django，本项目用更轻量的 Flask 实现同类 Web 应用，是融合两书重构的实战项目"},{book:"abs3",chapter:"第12章 附近（程序部署与项目组织）"}],prerequisites:["s7-06","s5-05"],task:'给网页版待办加上"删除"功能：每项旁边放一个按钮，提交 id 后从列表中移除，再跳回首页。',exercises:[{id:"s8-05-q1",qtype:"single",stem:"Flask 路由要接收表单的 POST 提交，@app.route 里必须写哪个参数？",options:['A. method="post"','B. methods=["POST"]',"C. post=True","D. 什么都不用写"],answer:"B",explanation:'methods 参数接收一个方法列表，写 methods=["GET", "POST"] 才能处理提交。'},{id:"s8-05-q2",qtype:"boolean",stem:"request.form 用来读取 GET 请求带过来的网址参数。",answer:"错",explanation:"request.form 读取 POST 表单数据；GET 的网址参数用 request.args 读取。"},{id:"s8-05-q3",qtype:"blank",stem:"Flask 中把 Python 字典变成 JSON 响应，使用 ______() 函数。",answer:"jsonify",accepted:["jsonify","jsonify()"],explanation:"jsonify 会把字典转成 JSON 格式并设置正确的响应类型，适合写 API 接口。"}],minutes:18,env:"local"}],o=[...i,...s,...a,...r,...p,...l,...d,...c],u=new Map(o.map(e=>[e.id,e]));function f(e){return u.get(e)}const m=o.flatMap(e=>e.exercises.map((t,n)=>({id:t.id,lessonId:e.id,stageId:e.stageId,order:n+1,qtype:t.qtype,stem:t.stem,options:t.options,answer:t.answer,accepted:t.accepted,keywords:t.keywords,explanation:t.explanation,knowledgePoint:e.title,code:t.code,testCases:t.testCases,difficulty:n===0?1:n===1?2:3}))),x=new Map(m.map(e=>[e.id,e]));export{u as a,m as b,f as g,o as l,x as q};
