import type { Lesson } from '../../types'

/**
 * 第七阶段：模块与面向对象（10 课）
 * 从「把代码拆成模块」讲到「用类组织数据和行为」，最后用类重构通讯录。
 */
export const stage7Lessons: Lesson[] = [
  {
    id: 's7-01',
    stageId: 7,
    order: 1,
    title: '模块与 import',
    subtitle: '把一个大工具箱分成一格一格',
    hook: '程序写到三百行，想找上周写的那个函数要滚半天鼠标。能不能把常用工具单独放进一个文件，用的时候直接取？',
    objectives: [
      '说清模块是什么，为什么要把代码拆成模块',
      '写出三种 import 写法并正确调用',
      '解释 import 为什么会执行被导入文件的顶层代码',
      '用 __name__ == "__main__" 保护自己的模块',
    ],
    analogy:
      '模块像五金店的零件盒：螺丝一格、钉子一格。要用螺丝就打开那一格，不用把整个仓库倒出来。import 就是伸手开格子的动作。',
    terms: [
      { term: '模块', plain: '一个 .py 文件，里面放着函数和变量，可以被别的程序取用。' },
      { term: '导入', plain: '把另一个模块加载进来，之后就能用里面现成的东西。' },
      { term: '标准库', plain: 'Python 自带的一批模块，装了就有，不用另外安装。' },
      { term: '命名空间', plain: '每个模块自己的名字表，math.sqrt 和 mytool.sqrt 互不干扰。' },
      { term: '__name__', plain: '模块内置的名字：直接运行时是 __main__，被导入时是模块名。' },
    ],
    content: `## 一、为什么要把代码拆开

一个文件写到几百行，会出现三个麻烦：想改某个函数得从头翻；上个项目写好的工具函数只能复制粘贴；两个人同时改同一个文件容易撞车。

解决办法很朴素：**把相关的函数放进单独的文件，用的时候取进来。** 这个文件就叫模块。

## 二、模块是什么

模块就是一个后缀为 .py 的普通文件。文件名叫 mytool.py，模块名就是 mytool，**不带后缀**。

| 类型 | 来源 | 例子 |
| --- | --- | --- |
| 标准库 | 装 Python 时自带 | math、random、json |
| 第三方库 | 用 pip 安装 | requests、openpyxl |
| 自己写的 | 项目里的 .py 文件 | mytool.py |

三类用法完全一样，都是 import，区别只在从哪来。

## 三、三种导入写法

| 写法 | 说明 | 之后怎么用 |
| --- | --- | --- |
| import math | 整个模块搬进来 | math.sqrt(16) |
| from math import sqrt | 只取其中一件 | sqrt(16) |
| import math as m | 搬进来并起外号 | m.sqrt(16) |

还有第四种 from math import *，把模块里所有名字全倒进来，**不推荐**：你不知道倒进了什么，容易和自己的变量重名。

必须遵守的规则：

- 模块名不带 .py，同目录时只写文件名，不写路径。
- 导入语句习惯放在文件最上方，一眼看清依赖。
- 模块名区分大小写，MyTool 和 mytool 是两个东西。
- 导入自己的模块时，两个文件要放在同一个文件夹。

## 四、import 到底做了什么

这是最容易被误解的一点：**import 不是只把函数定义读进来，而是把那个文件从头到尾执行一遍。**

所以在 mytool.py 的顶层写一句 print，任何 import 它的程序都会先看到这句输出。平时导入 math 没见它打印，是因为标准库作者早把这些打印删掉了，只留定义。

## 五、__name__ 与 __main__

每个模块都有一个内置变量 __name__：直接运行这个文件时它是字符串 __main__，被别的文件导入时它是模块名。

于是有了这条固定写法：把只有直接运行才该做的事，放进 if __name__ == "__main__": 里面。这样同一个文件既能当脚本运行，又能被别人导入而不产生副作用。这是写模块的标配，不是可选的花招。

## 六、把模块当成工具抽屉来用

落到实操上，一个模块该放什么，有个简单标准：**同一个主题的工具放一起。** 处理日期的函数放 date_tool.py，处理文本的放 text_tool.py，一个文件里塞十几个不相干的函数，用的时候反而找不到。

模块写好后还有两个习惯值得养成：

| 习惯 | 做法 | 好处 |
| --- | --- | --- |
| 加 __main__ 自测 | 直接运行时打印几个测试结果 | 改完立刻知道有没有改坏 |
| 起名不撞标准库 | 别叫 math.py、random.py | 避免 import 到自己写的文件 |

第二条特别容易踩：自己建了个叫 random.py 的文件，再 import random，导入的就是自己那个空的，报错信息会非常难懂。名字上避让标准库，是零成本的保险。

## 七、一个收尾提醒

提醒一句：模块名尽量短、全小写，别用中文和空格，导入时才不会出各种奇怪问题。
`,
    examples: [
      {
        title: '三种导入方式，效果对照',
        intro: '同一个 math 模块用三种写法各取一次，观察调用时的差别。math 是标准库，浏览器里也能跑。',
        code: `import math
from math import sqrt
import math as m

print(math.pi)
print(sqrt(16))
print(m.floor(3.7))
print(math.__name__)`,
        expectedOutput: `3.141592653589793
4.0
3
math`,
        lines: [
          { code: 'import math', explain: '整个模块搬进来，之后都要用 math. 开头。' },
          { code: 'from math import sqrt', explain: '只取 sqrt 这一件，之后可以直呼其名，不加前缀。' },
          { code: 'import math as m', explain: '同一个模块再搬一次，这次叫 m；math 和 m 指向同一个模块。' },
          { code: 'print(sqrt(16))', explain: '开平方得 4.0，结果是浮点数，带小数点。' },
          { code: 'print(math.__name__)', explain: '模块自己的名字，输出 math。' },
        ],
        trace: [
          { step: '第 1-3 行', state: '内存里多了 math、sqrt、m 三个名字，后两个指向 math 里的东西' },
          { step: '第 5-6 行', state: '输出 3.141592653589793 和 4.0' },
          { step: '第 7-8 行', state: '输出 3 和 math' },
        ],
        tryIt: '删掉第 2 行，改成 math.sqrt(16)，输出不变；再只写 sqrt(16)，读一读 NameError 的报错。',
      },
      {
        title: '一个能被导入、也能自己运行的模块',
        intro: '这段代码保存成 mytool.py，它既能单独运行，也能被别人 import 而不乱打印。',
        code: `# 保存为 mytool.py
print("mytool 被加载了")

def greet(name):
    return "你好，" + name

if __name__ == "__main__":
    print("直接运行 mytool.py")
    print(greet("小林"))`,
        expectedOutput: `mytool 被加载了
直接运行 mytool.py
你好，小林`,
        lines: [
          { code: 'print("mytool 被加载了")', explain: '顶层代码，执行或导入时都会运行。' },
          { code: 'def greet(name):', explain: '定义函数只是登记，不调用就不执行里面的代码。' },
          { code: 'if __name__ == "__main__":', explain: '直接运行时条件成立；被 import 时 __name__ 是 mytool，条件不成立。' },
        ],
        trace: [
          { step: '直接运行 mytool.py', state: '__name__ 是 __main__，条件成立，输出三行' },
          { step: '在 main.py 里 import mytool', state: '__name__ 是 mytool，只输出「mytool 被加载了」' },
          { step: '调用 mytool.greet("小林")', state: '返回「你好，小林」，此时才输出这一句' },
        ],
        tryIt: '把 if 改成 if True:，新建 main.py 写 import mytool 运行，看保护块里的打印有没有出现。',
      },
    ],
    compare: [
      {
        conceptA: 'import math',
        conceptB: 'from math import sqrt',
        diff: '前者必须带 math. 前缀，来源清楚；后者直接写 sqrt，短，但读代码时不知道它从哪来。',
        example: '模块里东西多、自己也有同名函数时用 import math 更安全。',
      },
      {
        conceptA: '直接运行文件',
        conceptB: '被别的文件 import',
        diff: '直接运行时 __name__ 是 __main__，被导入时是模块名。顶层代码两种情况都执行，保护块只在直接运行时执行。',
        example: 'python mytool.py 会打印「直接运行」；import mytool 不会。',
      },
    ],
    pitfalls: [
      '写 import mytool.py，多写后缀，报 ModuleNotFoundError，应写 import mytool。',
      '把自己的文件命名成 random.py，导入时反而导入自己，后面全乱。',
      '以为 import 只加载定义，忘了顶层代码会执行，屏幕上莫名多出几行。',
      '缺少 __main__ 保护，别人一导入你的模块就被迫看测试输出。',
      '两个文件不在同一文件夹又没处理路径，报找不到模块。',
    ],
    keyPoints: [
      '模块就是一个 .py 文件，导入时写文件名、不写后缀。',
      '三种导入：import 模块、from 模块 import 名字、import 模块 as 别名。',
      'import 会把被导入文件的顶层代码执行一遍。',
      '__name__ 直接运行时是 __main__，被导入时是模块名。',
      '测试代码放进 __main__ 保护块，模块才能既好用又干净。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第8章 函数', section: '8.8 节 导入模块' },
      { book: 'abs3', chapter: '第3章 函数', section: '3.3 节 导入模块' },
    ],
    prerequisites: ['s5-03'],
    task: '把前几阶段写过的三个工具函数搬进 tools.py，新建 main.py 导入并使用，最后给 tools.py 加上 __main__ 自测块。',
    exercises: [
      {
        id: 's7-01-q1',
        qtype: 'single',
        stem: '关于 import，下面哪种说法正确？',
        options: [
          'A. import 只复制函数名，不执行被导入文件的代码',
          'B. import 会把被导入文件的顶层代码执行一遍',
          'C. 一个 .py 文件最多只能 import 一个模块',
          'D. import 必须写在最后一行',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：import 是加载并执行模块，不是只抄定义。\n逐步演示：被导入文件的顶层 print 在 import 那一刻就打印；函数定义只是登记，不调用不执行。\n易错提醒：正因为顶层会执行，才需要 __main__ 保护。',
        difficulty: 1,
      },
      {
        id: 's7-01-q2',
        qtype: 'blank',
        stem: '想让 math 模块在本文件里改叫 m，写法是：import math ______ m。填缺少的关键字。',
        answer: 'as',
        accepted: ['as', 'AS', 'As'],
        explanation:
          '答案：as。\n思路：起别名用 as，读作「当作」。\n逐步演示：import math as m 之后，m.sqrt(16) 和 math.sqrt(16) 完全等价，两个名字指向同一个模块。\n易错提醒：写成 is 或 = 都是语法错误，别名只能用 as 连接。',
        difficulty: 2,
      },
      {
        id: 's7-01-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出三行，请依次写出。',
        code: 'import math as m\nfrom math import floor\n\nprint(m.sqrt(25))\nprint(floor(2.9))\nprint(m.__name__)',
        keywords: [['5.0'], ['2'], ['math']],
        explanation:
          '答案：5.0、2、math。\n思路：m 是 math 的别名，floor 被单独取了出来。\n逐步演示：sqrt(25) 得 5.0；floor 向下取整得 2；m.__name__ 是模块名 math。\n易错提醒：sqrt 结果一定带小数，写成 5 就错了；floor 不是四舍五入。',
        difficulty: 2,
      },
      {
        id: 's7-01-q4',
        qtype: 'blank',
        stem: '希望下面的代码只在直接运行时执行，被导入时不执行。填出 if 判断里比较的字符串：\n\nif __name__ == "____":\n    print("自测通过")',
        code: 'if __name__ == "____":\n    print("自测通过")',
        answer: '__main__',
        accepted: ['__main__', '“__main__”', 'main'],
        explanation:
          '答案：__main__，前后各两个下划线。\n思路：直接运行时 __name__ 被设成 __main__，被导入时设成模块名。\n逐步演示：python mytool.py 条件成立；import mytool 时 __name__ 是 mytool，条件不成立。\n易错提醒：下划线是前后各两个，不是各一个也不是三个。',
        difficulty: 2,
      },
      {
        id: 's7-01-q5',
        qtype: 'program',
        stem: '导入 math 模块，输出三行：\n第一行：81 的平方根，结果 9.0\n第二行：圆周率保留两位小数，结果 3.14\n第三行：2 的 10 次方，结果 1024\n\n（提示：math.sqrt、round、乘方运算符）',
        answer: '',
        testCases: [{ stdin: '', expected: '9.0\n3.14\n1024' }],
        explanation:
          '答案（参考答案）：\nimport math\nprint(math.sqrt(81))\nprint(round(math.pi, 2))\nprint(2 ** 10)\n\n思路：开方用 math.sqrt，保留小数用 round，乘方用两个星号。\n逐步演示：sqrt(81) 得 9.0；round(3.141592653589793, 2) 得 3.14；2 的 10 次方是 1024。\n易错提醒：写成 9 而不是 9.0 会判错，sqrt 返回浮点数。',
        difficulty: 3,
      },
    ],
    minutes: 16,
    env: 'browser',
  },
  {
    id: 's7-02',
    stageId: 7,
    order: 2,
    title: '包、pip 与虚拟环境',
    subtitle: '别人的工具怎么装，项目之间怎么不打架',
    hook: '同一个 Project A 要用 1.0 版的工具库，Project B 非得用 3.0 版，装来装去两个项目都跑不起来，怎么办？',
    objectives: [
      '说清包与模块的区别，看懂目录层级',
      '用 pip 安装、查看、卸载第三方库并换国内镜像',
      '独立创建并激活 Windows 虚拟环境',
      '用 requirements.txt 记录与复现项目依赖',
    ],
    analogy:
      '模块是单件工具，包是带分格的工具箱，pip 是下单送货的店员，虚拟环境则是给每个项目单独准备的一个工具间——各自的工具版本互不干扰，这一个房间里弄乱了也不会弄脏另一个房间。',
    terms: [
      { term: '包', plain: '一个装了多个模块的文件夹，文件夹里通常有个 __init__.py 做标记。' },
      { term: 'pip', plain: 'Python 自带的包管理器，负责下载、安装、卸载第三方库。' },
      { term: '虚拟环境', plain: '给单个项目隔离出来的一套 Python 运行环境，装的库只在这个环境里生效。' },
      { term: 'requirements.txt', plain: '把项目用到的库和版本一行行记下来的清单文件。' },
      { term: '镜像源', plain: '把国外官方仓库复制到国内服务器的站点，下载速度通常快很多。' },
    ],
    content: `## 一、为什么需要这一课

**这一课在 Windows + VS Code 本地环境完成。** pip、虚拟环境、装第三方库都要动你电脑上的真实文件，浏览器出于安全限制做不到，网页里的代码实验室帮不上忙。请打开电脑跟着敲。

前面几十课我们只用了 Python 自带的标准库，装好 Python 就能跑。但真实项目几乎一定会用别人写好的库：处理 Excel 要 openpyxl，发网络请求要 requests，画图要 matplotlib。这些库不在标准库里，得自己装。

装了以后新问题来了：项目 A 依赖某库的 1.0 版，项目 B 依赖 3.0 版，两个版本不能同时装在同一处。虚拟环境就是为了把这两个项目隔开。

## 二、包是什么

模块是一个 .py 文件；包是**一个装了多个模块的文件夹**。文件夹里通常放一个叫 __init__.py 的文件，用来告诉 Python「这个文件夹是一个包」。新版本里即使不写它也能当包用，但写上更稳妥。

| 层级 | 例子 | 导入写法 |
| --- | --- | --- |
| 单个模块 | mytool.py | import mytool |
| 包 | tools/ 文件夹 | import tools |
| 包里的模块 | tools/text.py | from tools import text |
| 包里的函数 | tools/text.py 里的 clean | from tools.text import clean |

用包的好处是名字分层：两个都叫 clean 的函数，一个在 tools.text 里，一个在 tools.image 里，不会撞车。

## 三、pip 的常用规则

pip 随 Python 一起装好，在命令行里用，不是在 Python 代码里用。

| 目的 | 命令 | 说明 |
| --- | --- | --- |
| 安装 | pip install openpyxl | 从官方仓库下载并安装 |
| 指定版本 | pip install openpyxl==3.1.2 | 两个等号，装指定版本 |
| 换国内镜像 | pip install openpyxl -i 镜像地址 | 解决下载慢或超时 |
| 查看已装 | pip list | 列出当前环境所有库 |
| 卸载 | pip uninstall openpyxl | 会二次确认 |
| 导出清单 | pip freeze > requirements.txt | 把版本写进文件 |
| 按清单安装 | pip install -r requirements.txt | 换电脑时一键复现 |

常用的国内镜像地址是清华源：https://pypi.tuna.tsinghua.edu.cn/simple

## 四、逐步演示：给项目建独立环境

第一步，在 VS Code 终端里进入项目文件夹，执行创建命令：python -m venv .venv。执行完会多出一个 .venv 文件夹，那就是这个项目的独立环境。

第二步，激活它。Windows 的命令是：.venv\\Scripts\\activate。激活成功后命令行最前面会出现 (.venv) 字样，这表示接下来所有 pip 操作都只影响这个环境。

第三步，装库：pip install openpyxl -i 清华源地址。装完用 pip list 确认 openpyxl 在列表里。

第四步，导出清单：pip freeze > requirements.txt。打开这个文件，会看到一行行「库名==版本号」。

第五步，换一台电脑时，只要新建虚拟环境，再执行 pip install -r requirements.txt，依赖就全部复现了。

## 五、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| pip 不是内部或外部命令 | PATH 没配好 | 用 python -m pip 代替 pip |
| 下载极慢或超时 | 官方仓库在国外 | 加 -i 换国内镜像 |
| 装完 import 仍报错 | pip 和 python 不是同一套环境 | 先激活虚拟环境，或用 python -m pip |
| 激活脚本被系统拦截 | PowerShell 执行策略限制 | 改用 .venv\\Scripts\\activate.bat，或调整执行策略 |
| 项目传给别人跑不起来 | 没记录依赖版本 | 提交 requirements.txt |

## 六、一个判断原则

不是装得越多越好。每多一个依赖，项目就多一份「以后可能升级不兼容」的风险。标准库能解决的事，先用标准库；确实需要再装，并且**一定把版本记进 requirements.txt**。

## 七、一个判断顺序的建议

遇到导入问题，按这个顺序查：先确认虚拟环境激活了没有，再看 pip list 里有没有这个库，最后才怀疑代码写错。三步里前两步解决了八成问题。
`,
    examples: [
      {
        title: '确认当前用的是哪一套 Python 环境',
        intro: '这是本地环境里的小自检脚本。不同虚拟环境下运行，sys.executable 那一行会指向不同的解释器路径；输出里的路径随你电脑而变，下面给出示意。',
        code: `import sys
print("解释器路径：", sys.executable)
print("主版本号：", sys.version_info.major)
print("模块自己的名字：", sys.__name__)`,
        expectedOutput: `解释器路径： C:\\python-study\\.venv\\Scripts\\python.exe
主版本号： 3
模块自己的名字： sys`,
        lines: [
          { code: 'import sys', explain: 'sys 是标准库模块，专门提供解释器自身的信息。' },
          { code: 'sys.executable', explain: '当前正在运行的 Python 解释器的完整路径；激活虚拟环境后这里指向 .venv 里的那个。' },
          { code: 'sys.version_info.major', explain: '主版本号，Python 3 就是 3。' },
          { code: 'sys.__name__', explain: '模块自己的名字，输出 sys。' },
        ],
        trace: [
          { step: '第 1 行', state: '加载标准库模块 sys' },
          { step: '第 2 行', state: '输出当前解释器的路径（示意值）' },
          { step: '第 3-4 行', state: '输出 3 和 sys' },
        ],
        tryIt: '在虚拟环境里和退出虚拟环境后各跑一次，对比第一行的路径有什么不同。',
      },
    ],
    compare: [
      {
        conceptA: '模块',
        conceptB: '包',
        diff: '模块是单个 .py 文件；包是装了多个模块的文件夹，导入时名字带层级。',
        example: 'import mytool 导入文件；from tools import text 导入包里的模块。',
      },
      {
        conceptA: '全局安装',
        conceptB: '虚拟环境安装',
        diff: '全局安装所有项目共用一个库版本；虚拟环境给每个项目单独一套，版本互不干扰。',
        example: 'A 项目要 1.0、B 项目要 3.0，用两个虚拟环境就都能跑。',
      },
    ],
    pitfalls: [
      '把 pip 命令写进 .py 文件当 Python 代码运行，报语法错误。',
      '忘了激活虚拟环境就 pip install，库装到了全局，项目里仍然导入不到。',
      '用中文路径或带空格的文件夹建虚拟环境，个别工具会出问题。',
      '把 .venv 文件夹一起提交到代码仓库，又大又没用，应该加进忽略清单。',
      '不记录版本，半年后重装电脑，新版库接口变了，老代码直接报错。',
    ],
    keyPoints: [
      '模块是文件，包是文件夹，导入时名字分层。',
      'pip 在命令行用，常用 install / list / uninstall / freeze。',
      '下载慢就加 -i 换国内镜像。',
      'python -m venv .venv 建环境，Windows 用 .venv\\Scripts\\activate 激活。',
      'requirements.txt 是项目依赖的存档，换机器靠它复现。',
    ],
    sources: [
      { book: 'pcc3', chapter: '附录 A 安装与包管理' },
      { book: 'abs3', chapter: '第2章 安装第三方模块', note: '第三版之后的现代工具链以 venv 与 pip 为准' },
      { book: 'update', chapter: '现代 Python 项目依赖管理', note: '补充虚拟环境与镜像源实践' },
    ],
    prerequisites: ['s7-01'],
    task: '在电脑上新建一个项目文件夹，建虚拟环境、激活、装 openpyxl（用国内镜像）、导出 requirements.txt，把 pip list 的输出截图存进笔记。',
    exercises: [
      {
        id: 's7-02-q1',
        qtype: 'single',
        stem: '关于包和模块，下面哪一句是对的？',
        options: [
          'A. 包就是一个 .py 文件',
          'B. 包是装了多个模块的文件夹，导入时名字带层级',
          'C. 一个包里只能有一个模块',
          'D. 包必须用 pip 安装才能导入',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：从「文件」与「文件夹」的层级关系入手。\n逐步演示：模块对应单个 .py 文件；多个模块放进一个文件夹，加上 __init__.py，就成了包；导入时写成 tools.text 这样的层级名。\n易错提醒：自己项目里的包不需要 pip 安装，放在同一目录就能导入；pip 是用来装第三方库的。',
        difficulty: 1,
      },
      {
        id: 's7-02-q2',
        qtype: 'blank',
        stem: '在命令行里把当前环境已安装的库和版本导出成清单文件，命令是：pip freeze > ________.txt。填文件名。',
        answer: 'requirements',
        accepted: ['requirements', 'requirements.txt', 'Requirements'],
        explanation:
          '答案：requirements。\n思路：pip freeze 列出所有「库名==版本号」，用大于号把输出重定向到文件。\n逐步演示：执行 pip freeze > requirements.txt，当前目录就生成清单；换机器时执行 pip install -r requirements.txt 一键复现。\n易错提醒：文件名只是约定，写成别的名字也能用，但大家都认 requirements.txt，改成别的会让合作者找不到。',
        difficulty: 1,
      },
      {
        id: 's7-02-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出完整两行。',
        code: 'import sys\nprint(sys.__name__)\nprint(sys.version_info.major >= 3)',
        keywords: [['sys'], ['True', 'true']],
        explanation:
          '答案：第一行 sys，第二行 True。\n思路：__name__ 是模块自己的名字；主版本大于等于 3 是个比较表达式，结果是布尔值。\n逐步演示：导入 sys 后 sys.__name__ 是字符串 sys；sys.version_info.major 是整数 3，3 >= 3 成立，print 输出 True。\n易错提醒：布尔值首字母大写，写成 true 是错的；比较表达式算出的是 True 或 False，不是字符串。',
        difficulty: 2,
      },
      {
        id: 's7-02-q4',
        qtype: 'boolean',
        stem: 'pip install 这条命令应该写在 .py 文件里，然后像普通 Python 代码一样运行。',
        answer: '错',
        explanation:
          '答案：错。\n思路：pip 是命令行工具，不是 Python 语法。\n逐步演示：在终端敲 pip install openpyxl 才是正确用法；写进 .py 文件会被当成 Python 语句，直接报 SyntaxError。\n易错提醒：确实需要在 Python 代码里调用 pip 时，要用 subprocess 之类的方式，初学阶段完全没必要。',
        difficulty: 2,
      },
      {
        id: 's7-02-q5',
        qtype: 'program',
        stem: '编写一个程序，导入 sys 模块，输出两行：\n第一行：模块自己的名字（sys）\n第二行：主版本号（3）\n\n要求通过 sys 模块的属性取值，不要把答案直接写死在 print 里。',
        answer: '',
        testCases: [{ stdin: '', expected: 'sys\n3' }],
        explanation:
          '答案（参考答案）：\nimport sys\nprint(sys.__name__)\nprint(sys.version_info.major)\n\n思路：题目考的是「导入模块后用点语法取属性」。\n逐步演示：import sys 加载标准库模块；sys.__name__ 是字符串 sys；sys.version_info.major 在主版本为 3 的解释器里是整数 3；两次 print 各占一行。\n易错提醒：写成 print("sys") 虽然输出对，但没有真正读取模块属性，考点就丢了；另外 sys.version_info 是带属性的对象，不能直接 print 它。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'local',
  },
  {
    id: 's7-03',
    stageId: 7,
    order: 3,
    title: '类与对象',
    subtitle: '设计图纸，和按图纸造出来的东西',
    hook: '要记录 30 个学生的姓名、年龄、成绩，用 30 组零散变量会写到崩溃。有没有一种办法，能把「一个学生该有哪些信息」先画成一张模板？',
    objectives: [
      '说清类与对象的关系，各举一个生活例子',
      '用 class 定义一个最小的类并创建对象',
      '解释为什么面向对象适合描述真实事物',
      '判断什么场景该用类、什么场景用字典就够',
    ],
    analogy:
      '类像一张房屋设计图：图上写着房子该有几间卧室、门朝哪开，但图纸本身住不了人。按图纸盖出来的一栋栋真房子，就是对象。同一张图纸可以盖很多栋，每栋里面住的人、摆的家具各不相同，结构却一样。',
    terms: [
      { term: '类（class）', plain: '一张模板或图纸，规定这类东西有哪些数据、能做哪些事。' },
      { term: '对象（object）', plain: '按模板造出来的具体一个，也叫实例。' },
      { term: '实例化', plain: '类名后面加括号，造出一个对象的动作。' },
      { term: '属性', plain: '对象身上记着的数据，比如姓名、年龄。' },
      { term: '方法', plain: '写在类里的函数，表示这个对象能做什么。' },
    ],
    content: `## 一、先看不用类会有多乱

假设要记 3 个学生的姓名和成绩，用零散变量是这样：name1、score1、name2、score2、name3、score3。学生增加到 30 个，变量就得写 60 个，想给所有人都加一项「班级」，得改 30 处。

用列表好一点，但列表只按位置存，score[0] 到底是谁的成绩，得靠脑子记。

根本问题在于：**这些数据和操作没有绑在一起。** 学生这个「东西」本身应该是一个整体，名字、成绩、以及「算评级」这个动作都长在它身上。

## 二、类和对象分别是什么

类，是「一类东西共同长什么样」的说明书。对象，是按这份说明书造出来的具体一个。

| 类（图纸） | 对象（实物） |
| --- | --- |
| 学生 | 小林、小周这两个具体的人 |
| 汽车 | 楼下那辆白色车 |
| 一张表 | 你今天记的这一笔账 |

一个类可以造出任意多个对象，它们结构一样，数据各自独立。改其中一个对象的成绩，不会动到另一个。

## 三、语法与使用规则

定义类用 class 关键字，名字习惯首字母大写（这是约定，不是语法强制）：

| 写法 | 说明 |
| --- | --- |
| class Student: | 定义一个叫 Student 的类 |
| class Student: 下面缩进的语句 | 属于类的内容 |
| s = Student() | 造一个对象，交给变量 s |
| s.name = "小林" | 给这个对象挂一个属性 |
| print(s.name) | 读出这个属性 |

必须遵守的规则：

- 类名后面要写冒号，类体要缩进。
- 空类什么都不写会报错，至少写一句 pass 占位。
- 造对象时类名后面必须带括号，Student 和 Student() 是两回事。
- 类名首字母大写只是习惯，但全行业都这么做，跟着做最省事。

## 四、逐步演示：从图纸到实物

第一步，先想清楚「这一类东西要记什么」。学生要记姓名和成绩，两项。

第二步，写 class Student: 加一句 pass，先把空模板立起来。

第三步，用 a = Student()、b = Student() 造两个对象。此时它们长得一模一样，身上还没有数据。

第四步，分别给 a.name、a.score、b.name、b.score 赋值。这一步叫「给对象挂属性」。

第五步，打印两个对象的值，再改掉 a.score，重新打印，确认 b.score 没被影响。这一步是理解「对象各自独立」的关键。

## 五、什么时候别用类

类不是万能的，别为了显得专业就到处写 class。

| 场景 | 更合适的做法 |
| --- | --- |
| 只是存几个配置项 | 一个字典就够 |
| 一次性的数据转换脚本 | 函数 + 列表 |
| 数据要长期存成表格 | CSV 或数据库 |
| 一组数据有固定结构，还要带操作 | 该用类 |

判断标准很简单：**当你发现同一组数据总是一起出现，而且对它们有一套固定操作，就该把它们封成类。** 下一课讲怎么把属性和方法正经地写进类里。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 定义空类报 IndentationError | 冒号后没有缩进内容 | 补一句 pass |
| 写 s = Student 后取不到属性 | 少了括号，拿到的是类本身 | 改成 Student() |
| 两个对象数据互相影响 | 用了可变对象当共享数据 | 每个对象单独赋值 |
| 类名用小写，读代码时认不出 | 违反命名习惯 | 首字母大写 |`,
    examples: [
      {
        title: '一张图纸，造出两个互不影响的对象',
        intro: '这是本课最核心的一件事：先定义模板，再造两个对象，最后用一次修改证明它们各存各的。',
        code: `class Student:
    pass

a = Student()
b = Student()

a.name = "小林"
a.score = 88
b.name = "小周"
b.score = 75

print(a.name, a.score)
print(b.name, b.score)

a.score = 95
print("改完 a 之后：")
print(a.name, a.score)
print(b.name, b.score)`,
        expectedOutput: `小林 88
小周 75
改完 a 之后：
小林 95
小周 75`,
        lines: [
          { code: 'class Student:', explain: '定义一张名叫 Student 的图纸，冒号后面缩进的内容都属于类。' },
          { code: '    pass', explain: 'pass 是「这里先空着」的占位语句，不写它冒号后面就没内容，会报错。' },
          { code: 'a = Student()', explain: '类名加括号才是造对象；a 现在是一个具体的 Student 实例。' },
          { code: 'b = Student()', explain: '同一张图纸造第二个对象，和 a 完全独立。' },
          { code: 'a.name = "小林"', explain: '给 a 挂一个属性 name。属性是长在对象身上的数据。' },
          { code: 'a.score = 95', explain: '重新赋值，只改 a 身上的 score。' },
        ],
        trace: [
          { step: '第 1-2 行', state: '登记了 Student 这个类，还没造出任何对象' },
          { step: '第 4-5 行', state: '内存里有两个独立对象 a 和 b，身上都没有属性' },
          { step: '第 7-10 行', state: 'a = {name:小林, score:88}，b = {name:小周, score:75}' },
          { step: '第 12-13 行', state: '输出「小林 88」和「小周 75」' },
          { step: '第 15 行', state: 'a.score 改成 95，b.score 仍是 75' },
          { step: '第 17-18 行', state: '输出「小林 95」和「小周 75」，证明互不影响' },
        ],
        tryIt: '再造第三个对象 c，只给它 name 不给 score，然后 print(c.score)，读一读 AttributeError 的报错内容。',
      },
      {
        title: '类和对象各自的身份',
        intro: '用 type 看看类和对象分别是什么，顺便确认两个对象确实是不同个体（浏览器里对象地址是示意值）。',
        code: `class Dog:
    pass

d1 = Dog()
d2 = Dog()
print(type(d1).__name__)
print(d1 is d2)
print(type(Dog).__name__)`,
        expectedOutput: `Dog
False
type`,
        lines: [
          { code: 'class Dog:', explain: '定义一张 Dog 图纸。' },
          { code: 'print(type(d1).__name__)', explain: 'd1 的类型名是 Dog，说明它是按这张图纸造的。' },
          { code: 'print(d1 is d2)', explain: 'is 判断是不是同一个对象；两次 Dog() 造出两个不同个体，所以是 False。' },
          { code: 'print(type(Dog).__name__)', explain: '类本身也是一个对象，它的类型是 type。初学知道即可。' },
        ],
        trace: [
          { step: '第 1-2 行', state: '登记 Dog 类' },
          { step: '第 4-5 行', state: 'd1、d2 分别是两个独立的 Dog 对象' },
          { step: '第 6-8 行', state: '依次输出 Dog、False、type' },
        ],
        tryIt: '把 d2 = Dog() 改成 d2 = d1，再运行，看看 is 的结果变成什么。',
      },
    ],
    compare: [
      {
        conceptA: '类',
        conceptB: '对象',
        diff: '类是模板，只定义结构、不装具体数据；对象是按模板造出来的实物，各自装着独立的数据。',
        example: 'Student 是类；小林这个成绩 88 的学生是对象。',
      },
      {
        conceptA: '类',
        conceptB: '字典',
        diff: '字典只装数据，键名靠约定；类除了数据还能挂方法，并且规定「这类东西一定有哪些字段」。',
        example: '只记三个配置项用字典；要记 30 个学生并且都要算评级，用类更整齐。',
      },
    ],
    visual: {
      kind: 'variable',
      title: '一张图纸造出两个独立对象',
      description: '看 a 和 b 各自的属性值，以及修改 a 之后 b 保持不变',
      variables: [
        { name: 'class Student', value: '图纸：只定义结构' },
        { name: 'a.name / a.score', value: '小林 / 88 → 改成 95' },
        { name: 'b.name / b.score', value: '小周 / 75 → 始终不变' },
      ],
      steps: [
        { label: '造对象', detail: 'a = Student()、b = Student()，两个独立个体', state: [{ name: 'a', value: '空对象' }, { name: 'b', value: '空对象' }] },
        { label: '挂属性', detail: '分别给两个对象赋 name 和 score', state: [{ name: 'a', value: '小林 88' }, { name: 'b', value: '小周 75' }] },
        { label: '改 a', detail: 'a.score = 95，只动 a 自己', state: [{ name: 'a', value: '小林 95' }, { name: 'b', value: '小周 75' }] },
      ],
    },
    pitfalls: [
      '写 class Student: 后什么都不缩进，报 IndentationError，空类要补 pass。',
      '把 s = Student 当成造对象，少了括号，之后取属性全报错。',
      '以为改一个对象的属性会同步到其它对象，实际各存各的。',
      '一上来就把所有数据都封成类，简单脚本被写得很绕。',
      '类名用小写，和变量名混在一起，读代码分不清谁是谁。',
    ],
    keyPoints: [
      '类是图纸，对象是按图纸造出来的实物。',
      'class 名字: 定义类，类名加括号造对象。',
      '同一张图纸能造很多对象，它们结构相同、数据独立。',
      '属性用点语法挂上去：对象.属性 = 值。',
      '数据成组出现且有固定操作时，才值得用类。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第9章 类', section: '9.1 创建和使用类' },
      { book: 'abs3', chapter: '第1章 Python 基础', note: '类为本阶段补充的进阶组织方式' },
    ],
    prerequisites: ['s5-09'],
    task: '定义一个 Book 类，造三本书的对象，分别挂上书名和页数，打印出来；再改其中一本的页数，确认另外两本没变。',
    exercises: [
      {
        id: 's7-03-q1',
        qtype: 'single',
        stem: '类和对象的关系，下面哪个比喻最贴切？',
        options: [
          'A. 类和对象是同一个东西的两种叫法',
          'B. 类是设计图纸，对象是按图纸造出来的实物',
          'C. 对象是类的别名',
          'D. 一个类只能造出一个对象',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：抓住「模板」与「实例」的区分。\n逐步演示：类只规定结构，不装具体数据；类名加括号才造出对象，同一个类能造任意多个对象。\n易错提醒：别把类和对象混着叫，写 s = Student（没括号）拿到的是类本身，不是对象。',
        difficulty: 1,
      },
      {
        id: 's7-03-q2',
        qtype: 'blank',
        stem: '定义一个什么都不做的空类时，冒号后面至少要写一句 ______ 占位，否则会报缩进错误。',
        answer: 'pass',
        accepted: ['pass', 'PASS', 'Pass'],
        explanation:
          '答案：pass。\n思路：Python 要求冒号后面必须有一段缩进的代码块，空着不合法。\n逐步演示：class Student: 下一行写四个空格再写 pass，解释器就知道「这里有意留空」，不会报错。\n易错提醒：写注释不算内容，光写井号注释仍然报 IndentationError；pass 必须小写。',
        difficulty: 1,
      },
      {
        id: 's7-03-q3',
        qtype: 'predict',
        stem: '下面代码运行后，最后一行输出什么？',
        code: 'class Box:\n    pass\na = Box()\nb = Box()\na.v = 10\nb.v = 20\na.v = 99\nprint(b.v)',
        keywords: [['20']],
        explanation:
          '答案：20。\n思路：a 和 b 是两次 Box() 造出的两个独立对象，属性各存各的。\n逐步演示：先给 a.v 赋 10、b.v 赋 20；再把 a.v 改成 99，动的只有 a；打印 b.v 仍然是 20。\n易错提醒：如果写成 b = a，两个变量就指向同一个对象，改 a.v 会让 b.v 一起变成 99——那是引用，不是两个对象。',
        difficulty: 2,
      },
      {
        id: 's7-03-q4',
        qtype: 'boolean',
        stem: '同一个类造出来的两个对象，结构上完全一样，所以其中一个对象的属性值改变，另一个也会跟着变。',
        answer: '错',
        explanation:
          '答案：错。\n思路：结构相同不等于数据共享。\n逐步演示：类名加括号每调用一次就新造一个独立对象，各自有自己的属性表；改 a.name 只翻 a 的那张表。\n易错提醒：只有把同一个对象赋给两个变量（b = a），或者用了共享的可变类变量，才会出现「一边改、两边变」。',
        difficulty: 2,
      },
      {
        id: 's7-03-q5',
        qtype: 'program',
        stem: '定义一个 Cat 类（空类用 pass 占位），造两只猫 c1 和 c2，分别设置属性 name 为「大橘」和「小黑」，属性 age 为 3 和 2，然后输出两行：\n大橘 3\n小黑 2',
        answer: '',
        testCases: [{ stdin: '', expected: '大橘 3\n小黑 2' }],
        explanation:
          '答案（参考答案）：\nclass Cat:\n    pass\n\nc1 = Cat()\nc2 = Cat()\nc1.name = "大橘"\nc1.age = 3\nc2.name = "小黑"\nc2.age = 2\nprint(c1.name, c1.age)\nprint(c2.name, c2.age)\n\n思路：先立模板，再造两个独立对象，分别挂属性，最后各输出一行。\n逐步演示：Cat 类用 pass 占位；两次 Cat() 得到 c1、c2；点语法分别赋 name 和 age；print 用逗号连接文字和数字，中间自动补空格。\n易错提醒：空的 class Cat: 后面不写 pass 会报 IndentationError；造对象漏了括号会拿到类本身，后面赋属性虽然不报错，但语义完全不对。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's7-04',
    stageId: 7,
    order: 4,
    title: '属性与方法',
    subtitle: '让对象自己带上数据，也带上本事',
    hook: '上一课的属性是造完对象再一个个挂上去的，既麻烦又容易漏。能不能在图纸里就写清楚：这类东西一造出来就该有什么、能做什么？',
    objectives: [
      '在类里定义方法并正确使用 self',
      '说清 self 指向谁，为什么不能省略',
      '用点语法调用方法，读懂背后的参数传递',
      '用两个对象互不干扰来证明 self 的作用',
    ],
    analogy:
      '方法像是出厂时就装进机器里的按钮。每台机器都带同一个「开始」按钮，但按下的是哪台，按钮就操作哪台的零件——这个「当前这台」的指向，就是 self。你不用另外告诉它，Python 会自动把当前对象塞进去。',
    terms: [
      { term: '属性', plain: '对象身上记着的数据，用点语法读写。' },
      { term: '方法', plain: '写在类里的函数，第一个参数固定是 self。' },
      { term: 'self', plain: '指代「当前这个对象」，调用时 Python 自动传，不用手写。' },
      { term: '点语法', plain: '对象.名字 的写法，取属性或调方法都用它。' },
      { term: '实例', plain: '对象的另一个叫法，强调它是某个类造出来的具体个体。' },
    ],
    content: `## 一、把数据搬进图纸里

上一课我们这样造对象：先 Student()，再一行行挂 a.name、a.score。学生一多，漏挂一个属性，后面用到时就报 AttributeError。

更稳的做法是：在类里写一个叫 __init__ 的初始化方法，一类东西「出生时该有什么」全写在里面。这一课先讲清属性与方法的通用规则，下一课专门拆解 __init__。

不管属性写在哪，读写方式都一样：对象点属性名。

## 二、方法就是写在类里的函数

方法长得和普通函数几乎一样，只有两点不同：

| 对比 | 普通函数 | 方法 |
| --- | --- | --- |
| 位置 | 写在类外面 | 缩进写在 class 里面 |
| 第一个参数 | 按业务需要 | 必须是 self |
| 调用方式 | greet("小林") | a.greet() |
| 能拿到谁的数据 | 只能靠参数传 | 通过 self 拿到当前对象的属性 |

调用 a.greet() 时，Python 会自动把 a 作为第一个参数传进去。所以方法里写 self，方法外一个参数都不用填。

**这是初学者最容易懵的地方：定义时写了 self，调用时却什么都不用传。** 记住一句话就够了：定义多写一个，调用少传一个，两者正好抵消。

## 三、语法与使用规则

| 写法 | 说明 |
| --- | --- |
| class Student: | 定义类 |
| def greet(self): | 定义方法，self 不能省 |
| self.name | 在类内部读写当前对象的 name |
| a.greet() | 调用 a 的方法，self 自动就是 a |
| a.name | 在类外部读属性 |

必须遵守的规则：

- 方法第一个参数必须存在，名字写成 self 是全行业约定（写成别的也能跑，但别这么做）。
- 方法体要缩进两层：一层属于 class，一层属于 def。
- 在类内部访问自己的属性，一定要写 self. 前缀；光写 name 会被当成普通局部变量。
- 调用方法要加括号，a.greet 只是拿到这个方法本身，不会执行。

## 四、逐步演示：两个对象，同一个按钮

第一步，定义 class Student，里面写一个 set_score 方法，参数有 self 和 score，方法体里写 self.score = score。

第二步，再写一个 level 方法，读 self.score，按分数返回「优秀」或「继续加油」。

第三步，造 a 和 b 两个对象，分别调用 a.set_score(88)、b.set_score(55)。

第四步，分别打印 a.level() 和 b.level()。两个对象调的是同一个方法，结果却不同，因为 self 分别指 a 和 b。

第五步，打印 a.score 和 b.score，确认数据确实各存一份。

## 五、为什么 self 值得单独想明白

self 解决的是「同一段代码，操作不同数据」的问题。没有它，方法就不知道该读谁的 score，只能靠全局变量，或者把对象当参数手动传进来——那又绕回普通函数了。

理解了 self，后面讲继承、多态、类变量时才不会乱。可以把它记成一句话：**self 是方法内部对「我正在服务的这个对象」的称呼。**

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 报 takes 0 positional arguments but 1 was given | 定义方法时漏了 self | 补上 self 作为第一个参数 |
| 报 name is not defined | 类内部访问属性忘了 self. | 改成 self.name |
| 写 a.greet 没有输出 | 少了括号，方法没被调用 | 改成 a.greet() |
| 方法里改了值，外面读不到 | 改成了局部变量而非属性 | 用 self. 前缀赋值 |`,
    examples: [
      {
        title: '同一个方法，服务两个不同的对象',
        intro: '重点看 set_score 里的 self：a 调用时它指 a，b 调用时它指 b，所以两个对象的数据不会串。',
        code: `class Student:
    def set_score(self, score):
        self.score = score

    def level(self):
        if self.score >= 60:
            return "及格"
        return "还要加油"

a = Student()
b = Student()
a.set_score(88)
b.set_score(55)

print(a.level(), a.score)
print(b.level(), b.score)`,
        expectedOutput: `及格 88
还要加油 55`,
        lines: [
          { code: 'class Student:', explain: '定义类，下面的方法都要缩进一层。' },
          { code: 'def set_score(self, score):', explain: '第一个参数 self 由 Python 自动传入；调用时只需要给 score。' },
          { code: 'self.score = score', explain: '把传进来的值存到「当前这个对象」身上；写 self. 前缀才会变成属性。' },
          { code: 'def level(self):', explain: '第二个方法，只读数据、不需要额外参数，但 self 仍然不能省。' },
          { code: 'a.set_score(88)', explain: '表面只传了一个参数，实际 Python 把 a 塞给了 self，score 收到 88。' },
          { code: 'print(a.level(), a.score)', explain: '调用方法要带括号，读属性不带括号。' },
        ],
        trace: [
          { step: '第 1-8 行', state: '登记 Student 类，含 set_score 与 level 两个方法' },
          { step: '第 10-11 行', state: 'a、b 两个空对象' },
          { step: 'a.set_score(88)', state: 'self 指向 a，a.score = 88' },
          { step: 'b.set_score(55)', state: 'self 指向 b，b.score = 55' },
          { step: 'a.level()', state: '读 a.score = 88，返回「及格」' },
          { step: 'b.level()', state: '读 b.score = 55，返回「还要加油」' },
        ],
        tryIt: '把 level 方法里的 self.score 改成 score（去掉 self.），运行看报什么错，再改回来。',
      },
      {
        title: 'self 到底是谁：打印身份对照',
        intro: '让方法自己报出「我在服务谁」，配合 is 判断，把隐含的 self 摆到明面上。',
        code: `class Counter:
    def set_value(self, v):
        self.v = v

    def who(self):
        return "我是 Counter 对象，v = " + str(self.v)

x = Counter()
y = Counter()
x.set_value(1)
y.set_value(2)
print(x.who())
print(y.who())
print(x is y)`,
        expectedOutput: `我是 Counter 对象，v = 1
我是 Counter 对象，v = 2
False`,
        lines: [
          { code: 'self.v = v', explain: '把值存进当前对象的属性 v。' },
          { code: 'str(self.v)', explain: '数字和文字要用加号拼接时，得先用 str 把数字转成字符串。' },
          { code: 'x.who()', explain: 'self 自动指向 x，所以读到 x.v = 1。' },
          { code: 'print(x is y)', explain: '证明 x 和 y 是两个不同对象，所以同一段方法读出了不同结果。' },
        ],
        trace: [
          { step: 'set_value 两次', state: 'x.v = 1，y.v = 2' },
          { step: 'x.who()', state: '输出「我是 Counter 对象，v = 1」' },
          { step: 'y.who()', state: '输出「我是 Counter 对象，v = 2」' },
          { step: 'x is y', state: '输出 False' },
        ],
        tryIt: '把 y = Counter() 改成 y = x，预测三行输出会怎么变，再运行验证。',
      },
    ],
    compare: [
      {
        conceptA: '属性',
        conceptB: '方法',
        diff: '属性是对象记着的数据，读它不加括号；方法是对象能做的动作，调用它必须加括号。',
        example: 'a.score 是数字；a.level() 会执行一段代码并返回结果。',
      },
      {
        conceptA: '普通函数',
        conceptB: '方法',
        diff: '普通函数靠参数拿到数据；方法通过 self 直接拿到当前对象的属性。',
        example: 'greet(name) 要你传名字；a.greet() 自己去读 a.name。',
      },
    ],
    pitfalls: [
      '定义方法漏写 self，报「takes 0 positional arguments but 1 was given」。',
      '方法内部访问属性忘了 self. 前缀，被当成未定义的局部变量。',
      '调用方法时写成 a.greet 不加括号，代码没执行却不报错，最难查。',
      '以为 self 是 Python 关键字，其实只是约定名字，但千万别改成别的。',
      '两个对象共用一个可变容器（比如在类体里放列表），改动会互相影响。',
    ],
    keyPoints: [
      '方法是写在类里的函数，第一个参数必须是 self。',
      '调用时 self 由 Python 自动传入，所以定义多一个、调用少一个。',
      '类内部读写属性一律加 self. 前缀。',
      '调用方法要带括号，读属性不带括号。',
      'self 让同一段代码能服务不同对象的数据。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第9章 类', section: '9.2 使用类和实例' },
      { book: 'abs3', chapter: '第1章 Python 基础', note: '方法为本阶段补充的进阶组织方式' },
    ],
    prerequisites: ['s7-03'],
    task: '给上一课的 Book 类加两个方法：set_pages 记录页数，describe 返回书名加页数的描述文字。造两本书分别调用，确认结果互不串。',
    exercises: [
      {
        id: 's7-04-q1',
        qtype: 'single',
        stem: '定义类里的方法时，第一个参数 self 的作用是什么？',
        options: [
          'A. 表示这个类本身',
          'B. 指代调用该方法的那个具体对象，由 Python 自动传入',
          'C. 是一个必须手动传入的普通参数',
          'D. 只是装饰，可以随便省略',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：self 是「当前对象」的代称。\n逐步演示：a.greet() 调用时，Python 把 a 塞给 self；b.greet() 则把 b 塞给 self，于是同一段代码读出不同数据。\n易错提醒：调用时千万不要自己传 self，写成 a.greet(a) 会报参数个数不对。',
        difficulty: 1,
      },
      {
        id: 's7-04-q2',
        qtype: 'blank',
        stem: '在类内部把传进来的值存成当前对象的属性，写法是 ______.score = score。填前缀。',
        answer: 'self',
        accepted: ['self', 'SELF', 'Self'],
        explanation:
          '答案：self。\n思路：不带前缀的赋值只是方法里的局部变量，方法一结束就没了。\n逐步演示：写 self.score = score 才会把它挂到当前对象上，之后在类外部用 a.score 能读到。\n易错提醒：写成 score = score 看着像存了，其实什么都没发生，外面访问会报 AttributeError。',
        difficulty: 1,
      },
      {
        id: 's7-04-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出完整两行。',
        code: 'class P:\n    def set(self, v):\n        self.v = v\n    def get(self):\n        return self.v * 2\na = P()\nb = P()\na.set(3)\nb.set(10)\nprint(a.get())\nprint(b.get())',
        keywords: [['6'], ['20']],
        explanation:
          '答案：第一行 6，第二行 20。\n思路：get 方法读的是「当前对象」的 v，再乘 2。\n逐步演示：a.set(3) 让 a.v = 3，a.get() 算出 6；b.set(10) 让 b.v = 10，b.get() 算出 20。\n易错提醒：两次调用的是同一个方法，但 self 不同，所以结果不同；别以为后一次 set 会覆盖前一次。',
        difficulty: 2,
      },
      {
        id: 's7-04-q4',
        qtype: 'boolean',
        stem: '写 a.greet（不带括号）也能执行 greet 方法里代码。',
        answer: '错',
        explanation:
          '答案：错。\n思路：加括号才表示「调用」，不加括号只是取出这个方法对象。\n逐步演示：a.greet 会得到一个方法对象的描述，方法体一行都不会执行；a.greet() 才会真正运行。\n易错提醒：这种错不会报错，屏幕上只是「什么都没发生」，排查时优先看方法名后面有没有括号。',
        difficulty: 2,
      },
      {
        id: 's7-04-q5',
        qtype: 'program',
        stem: '定义一个 Wallet 类，包含两个方法：\n1. add(self, n)：把 n 累加到属性 total 上（第一次调用前 total 视为 0）\n2. show(self)：返回 total 的字符串形式\n\n造一个钱包 w，依次 add(30)、add(12)，最后 print(w.show())，应输出 42。',
        answer: '',
        testCases: [{ stdin: '', expected: '42' }],
        explanation:
          '答案（参考答案）：\nclass Wallet:\n    def add(self, n):\n        if not hasattr(self, "total"):\n            self.total = 0\n        self.total = self.total + n\n\n    def show(self):\n        return str(self.total)\n\nw = Wallet()\nw.add(30)\nw.add(12)\nprint(w.show())\n\n思路：total 第一次不存在，要先判断并初始化，之后每次把 n 加进去。\n逐步演示：第一次 add(30) 时 hasattr 判断为假，设 total = 0，再加 30 得 30；第二次 add(12) 得 42；show 转成字符串返回，print 输出 42。\n易错提醒：直接写 self.total = self.total + n 会在第一次调用时报 AttributeError；也可以用下一课要学的 __init__ 把 total 初始化为 0，那样更干净。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's7-05',
    stageId: 7,
    order: 5,
    title: '构造方法 __init__',
    subtitle: '让对象一出生就带齐该有的东西',
    hook: '每次造完对象都要手动调用一次 set_score，忘了就报错。有没有办法在「造出来」的那一刻，把该填的数据一次填好？',
    objectives: [
      '写出带 __init__ 的类并在创建对象时传参',
      '说清 __init__ 何时执行、由谁调用',
      '用带默认值的参数让构造更灵活',
      '用 __str__ 让 print(对象) 显示人话',
    ],
    analogy:
      '__init__ 像新手机开机时的设置向导：你一拆封（造对象），它就自动弹出来问姓名、选语言，向导走完，手机才算能用。你不用记得「还要再点一次设置」，因为开机这件事本身就带着它。',
    terms: [
      { term: '__init__', plain: '构造方法，造对象的那一刻自动执行，前后各两个下划线。' },
      { term: '初始化', plain: '给新对象填好初始属性，让它一出生就处于可用状态。' },
      { term: '__str__', plain: '另一个特殊方法，决定 print(对象) 时显示什么文字。' },
      { term: '魔术方法', plain: '前后各两个下划线的方法，由 Python 在特定时机自动调用。' },
      { term: '默认参数', plain: '构造时没给值就自动采用的值，写在参数后面。' },
    ],
    content: `## 一、先看清痛点

上一课的写法是两步：先 a = Student()，再 a.set_score(88)。中间的 a 处于「半成品」状态：属性还没挂上，谁要是不小心先调了 a.level()，立刻 AttributeError。

对象越多，越容易漏掉初始化那一步。真正的解法是：**把初始化写进「造对象」这个动作本身，让半成品状态根本不存在。**

## 二、__init__ 是什么

__init__ 是一个名字固定的特殊方法，前后各两个下划线，读作「dunder init」。

| 规则 | 说明 |
| --- | --- |
| 何时执行 | 类名加括号造对象的那一刻，自动执行 |
| 谁调用 | Python 自动调用，不需要也不应该手动写 a.__init__() |
| 第一个参数 | 仍然是 self |
| 返回值 | 不能写 return 返回别的东西，返回 None |
| 名字 | 前后各两个下划线，写成 _init_ 或 __init 都不生效 |

关键理解：Student("小林", 88) 里括号中的参数，会原样交给 __init__ 中 self 之后的那几个参数。

## 三、语法与使用规则

| 写法 | 说明 |
| --- | --- |
| def __init__(self, name, score): | 定义构造，self 之后放要传进来的值 |
| self.name = name | 把参数存成属性 |
| a = Student("小林", 88) | 造对象时直接传两个值 |
| def __init__(self, name, score=0): | 给 score 一个默认值，不传就按 0 算 |
| def __str__(self): return ... | 定义 print(对象) 显示的文字，必须返回字符串 |

必须遵守的规则：

- 参数顺序和调用时一一对应，self 不用自己传。
- 少传了没有默认值的参数，会报 TypeError。
- __str__ 一定要 return 字符串，返回数字会报 TypeError。
- __init__ 里不要写耗时操作或打印，造对象应该是安静的。

## 四、逐步演示：从两步变一步

第一步，写 class Student，里面 def __init__(self, name, score=0):，缩进写 self.name = name 和 self.score = score。

第二步，直接 a = Student("小林", 88)。这一行同时完成三件事：分配新对象、把 a 传给 self、把两个值传给 name 和 score。

第三步，打印 a.name 和 a.score，确认属性已经在了，不需要任何额外赋值。

第四步，再写 b = Student("小周")，故意不传 score，验证默认值 0 生效。

第五步，给类加上 __str__，返回姓名加成绩的描述，然后 print(a)，看到的是人话而不是一串内存地址。

## 五、__init__ 与 __str__ 的分工

两者都是自动调用的特殊方法，但时机完全不同：

| 方法 | 触发时机 | 用途 |
| --- | --- | --- |
| __init__ | 造对象时 | 把数据填进去 |
| __str__ | print(对象) 或 str(对象) 时 | 把对象变成给人看的文字 |

一个负责「出生」，一个负责「自我介绍」。别把打印写在 __init__ 里，那样每造一个对象屏幕上就多一行，批量造 100 个时输出会淹没你真正想看的结果。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 报 missing required positional argument | 造对象时少传了参数 | 补齐参数或给参数设默认值 |
| 报 takes 2 positional arguments but 3 were given | 定义时漏了 self | 补上 self 作为第一个参数 |
| 初始化好像没生效 | 方法名拼错，比如写成了 init | 检查前后各两个下划线 |
| print(对象) 显示一串尖括号 | 没定义 __str__ | 加一个返回字符串的 __str__ |
| __str__ 报 TypeError | 返回了数字而非字符串 | 用 str() 转换或 f-string 拼接 |

## 七、构造方法里该做什么、不该做什么

一个实用边界：__init__ 里只做「把对象组装起来」的事，比如赋值属性、做简单校验；读文件、发网络请求这类耗时或有风险的动作，交给单独的方法。原因很直接——构造对象这个动作到处都是，一旦里面藏了网络请求，任何一次不小心创建对象都可能卡住整个程序。
`,
    examples: [
      {
        title: '造对象时一次把数据带齐',
        intro: '对比上一课的两步写法：这里 a = Student(...) 一行搞定，对象出生就有 name 和 score。',
        code: `class Student:
    def __init__(self, name, score=0):
        self.name = name
        self.score = score

    def level(self):
        if self.score >= 60:
            return "及格"
        return "还要加油"

a = Student("小林", 88)
b = Student("小周")
print(a.name, a.score, a.level())
print(b.name, b.score, b.level())`,
        expectedOutput: `小林 88 及格
小周 0 还要加油`,
        lines: [
          { code: 'def __init__(self, name, score=0):', explain: '造对象时自动执行；score=0 是默认值，不传第二个参数就按 0 算。' },
          { code: 'self.name = name', explain: '把传进来的字符串挂成属性，之后随处可读。' },
          { code: 'a = Student("小林", 88)', explain: 'Python 自动把新对象给 self，"小林" 给 name，88 给 score。' },
          { code: 'b = Student("小周")', explain: '少传一个参数，score 用默认值 0。' },
          { code: 'print(a.name, a.score, a.level())', explain: '属性和方法都已经就绪，不需要任何额外初始化步骤。' },
        ],
        trace: [
          { step: 'Student("小林", 88)', state: '造新对象 → 自动调 __init__ → self.name = 小林，self.score = 88' },
          { step: 'Student("小周")', state: '造新对象 → self.name = 小周，self.score = 0（默认值）' },
          { step: 'a.level()', state: '88 >= 60 成立，返回「及格」' },
          { step: 'b.level()', state: '0 >= 60 不成立，返回「还要加油」' },
        ],
        tryIt: '把 score=0 的默认值去掉，再运行，读一读 TypeError 里 missing required positional argument 的提示。',
      },
      {
        title: '加一个 __str__，让对象会自我介绍',
        intro: '没有 __str__ 时 print(对象) 会显示一串看不懂的内存地址；加上之后，输出变成你能读懂的一句话。',
        code: `class Book:
    def __init__(self, title, pages=1):
        self.title = title
        self.pages = pages

    def __str__(self):
        return self.title + "（" + str(self.pages) + " 页）"

b1 = Book("Python 入门", 320)
b2 = Book("练习册")
print(b1)
print(b2)
print(b1.pages + b2.pages)`,
        expectedOutput: `Python 入门（320 页）
练习册（1 页）
321`,
        lines: [
          { code: 'def __init__(self, title, pages=1):', explain: 'pages 默认 1，不传就按一页算。' },
          { code: 'def __str__(self):', explain: 'print(对象) 时 Python 自动调用它，用返回值当作显示内容。' },
          { code: 'str(self.pages)', explain: '数字要参与字符串拼接，必须先转成字符串，否则报 TypeError。' },
          { code: 'print(b1)', explain: '没有加括号取属性，print 直接打印整个对象，触发 __str__。' },
          { code: 'print(b1.pages + b2.pages)', explain: '320 + 1 = 321，属性仍然是普通数字，可以正常运算。' },
        ],
        trace: [
          { step: '造 b1', state: 'b1.title = Python 入门，b1.pages = 320' },
          { step: '造 b2', state: 'b2.title = 练习册，b2.pages = 1（默认）' },
          { step: 'print(b1)', state: '调用 b1.__str__()，输出「Python 入门（320 页）」' },
          { step: 'print(b2)', state: '输出「练习册（1 页）」' },
          { step: '最后一行', state: '输出 321' },
        ],
        tryIt: '把 __str__ 里的 return 改成返回 self.pages（数字），运行看报什么错，再改回来。',
      },
    ],
    compare: [
      {
        conceptA: '__init__',
        conceptB: '__str__',
        diff: '__init__ 在造对象时自动执行，负责填数据；__str__ 在 print(对象) 时自动执行，负责把对象变成文字。',
        example: 'a = Student("小林", 88) 触发前者；print(a) 触发后者。',
      },
      {
        conceptA: '手动挂属性',
        conceptB: '用 __init__',
        diff: '前者造完对象还要补几行赋值，中间存在半成品状态；后者把初始化绑进造对象动作，杜绝漏填。',
        example: '对象一多，手动写法几乎一定会漏掉某个字段。',
      },
    ],
    pitfalls: [
      '方法名写成 init 或 _init_，前后下划线数量不对，方法变成普通方法，初始化静默失效。',
      '定义 __init__ 时漏写 self，报参数个数不匹配。',
      '在 __init__ 里写 return 某个值，报 TypeError，它只能返回 None。',
      '__str__ 里返回数字，print 时报错，必须返回字符串。',
      '把打印写进 __init__，批量造对象时屏幕被无用输出淹没。',
    ],
    keyPoints: [
      '__init__ 在造对象那一刻自动执行，负责填初始属性。',
      '类名括号里的参数传给 __init__ 中 self 之后的参数。',
      '默认参数让构造更灵活，少传也不报错。',
      '__str__ 决定 print(对象) 显示什么，必须返回字符串。',
      '初始化绑进构造动作，对象就不会有「半成品」状态。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第9章 类', section: '9.2 使用类和实例' },
      { book: 'abs3', chapter: '第1章 Python 基础', note: '特殊方法为本阶段补充内容' },
    ],
    prerequisites: ['s7-04'],
    task: '把上一课的 Wallet 改成用 __init__(self, owner, total=0) 初始化，再用 __str__ 让 print(w) 显示「某某的钱包：N 元」。',
    exercises: [
      {
        id: 's7-05-q1',
        qtype: 'single',
        stem: '关于 __init__，下面哪一句正确？',
        options: [
          'A. 需要手动调用 a.__init__() 才会执行',
          'B. 造对象（类名加括号）时由 Python 自动执行',
          'C. 每次 print(对象) 时都会执行一次',
          'D. 必须返回一个字符串',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：__init__ 是造对象流程的一部分。\n逐步演示：执行 a = Student("小林", 88) 时，Python 先分配对象，再自动把 a 传给 self 并调用 __init__，全部在这行里完成。\n易错提醒：C 描述的是 __str__；D 也错，__init__ 不能返回别的值。',
        difficulty: 1,
      },
      {
        id: 's7-05-q2',
        qtype: 'blank',
        stem: '想让 print(对象) 显示自定义文字，需要在类里定义一个特殊方法，名字是 ______（前后各两个下划线）。',
        answer: '__str__',
        accepted: ['__str__', 'str', '__str'],
        explanation:
          '答案：__str__。\n思路：print 会调用对象的 __str__ 并打印它的返回值。\n逐步演示：在类里写 def __str__(self): return 描述文字，之后 print(a) 就显示那段文字；不写则显示类名加内存地址。\n易错提醒：前后各两个下划线，共四个；返回值必须是字符串。',
        difficulty: 1,
      },
      {
        id: 's7-05-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出完整两行。',
        code: 'class Item:\n    def __init__(self, name, price=10):\n        self.name = name\n        self.price = price\na = Item("笔", 5)\nb = Item("本")\nprint(a.name, a.price)\nprint(b.name, b.price)',
        keywords: [['笔 5'], ['本 10']],
        explanation:
          '答案：第一行「笔 5」，第二行「本 10」。\n思路：造对象时传的值覆盖默认值，不传则用默认值。\n逐步演示：a 传了 5，price 就是 5；b 没传第二个参数，price 用默认的 10。两个对象互不干扰。\n易错提醒：默认值只在「没传」时生效，不会把已传的值再改掉；两行里名字和价格之间有一个空格，是 print 逗号自动补的。',
        difficulty: 2,
      },
      {
        id: 's7-05-q4',
        qtype: 'boolean',
        stem: '在 __init__ 里写 return self.name 是完全合法的，Python 会把这个名字作为造对象的结果。',
        answer: '错',
        explanation:
          '答案：错。\n思路：__init__ 的职责是初始化，造对象的结果由 Python 自己生成。\n逐步演示：在里面 return 一个非 None 的值会直接抛 TypeError: __init__() should return None。\n易错提醒：想拿到对象的文字描述，应该另写 __str__ 或普通方法，不要在 __init__ 里返回东西。',
        difficulty: 2,
      },
      {
        id: 's7-05-q5',
        qtype: 'program',
        stem: '定义一个 Rect 类，用 __init__(self, w, h) 记录宽和高，再写一个 area 方法返回面积。造一个宽 6、高 4 的矩形，输出它的面积（24）。',
        answer: '',
        testCases: [{ stdin: '', expected: '24' }],
        explanation:
          '答案（参考答案）：\nclass Rect:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n\n    def area(self):\n        return self.w * self.h\n\nr = Rect(6, 4)\nprint(r.area())\n\n思路：构造时把宽高存成属性，方法里读这两个属性相乘。\n逐步演示：Rect(6, 4) 触发 __init__，self.w = 6、self.h = 4；r.area() 读属性算出 24；print 输出 24。\n易错提醒：area 方法里要写 self.w 而不是 w；调用 r.area 不加括号只会拿到方法对象，不会算出结果。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's7-06',
    stageId: 7,
    order: 6,
    title: '封装',
    subtitle: '把该藏的藏起来，只留几个靠谱的按钮',
    hook: '余额被别处一行代码直接改成 -999，程序照样跑，账却全乱了。能不能让「改余额」这件事必须过一道检查？',
    objectives: [
      '说清封装要解决什么问题',
      '用下划线约定表达「别直接动」',
      '用方法校验后再修改属性',
      '用 property 把方法伪装成属性来读',
    ],
    analogy:
      '封装像自动售货机的外壳：你能按按钮、投币、取饮料，但摸不到里面的齿轮和钱箱。不是厂家藏了什么秘密，而是把「能被随便乱动」的入口收窄，机器才不容易坏。',
    terms: [
      { term: '封装', plain: '把数据藏进对象内部，外界只能通过规定好的方法访问和修改。' },
      { term: '_x', plain: '单下划线开头，约定「这是内部用的，请不要从外面直接改」。' },
      { term: '__x', plain: '双下划线开头，Python 会把名字改写，避免子类不小心覆盖。' },
      { term: '名称改写', plain: '双下划线属性被自动改名为 _类名__属性名 的机制。' },
      { term: 'property', plain: '一个装饰器，让方法看起来像普通属性，读的时候自动执行校验或计算。' },
    ],
    content: `## 一、问题从哪里来

假设一个账户对象，余额就是 balance 属性。项目里任何一处写 acc.balance = -999 都能成功，Python 不会拦。等月底对账才发现数字不对，排查范围是整个项目。

更麻烦的是：如果以后想改成「每笔变动都记日志」，所有直接赋值的地方都得改一遍。

封装的思路是：**把数据收进对象内部，对外只开放几个方法，所有修改都必须走这些方法。** 方法里可以做校验、记日志、发通知，而调用方的代码一行都不用动。

## 二、Python 的封装是「约定」，不是「锁」

和某些语言不同，Python 没有真正的 private 关键字拦住访问。它靠命名约定表达意图：

| 写法 | 含义 | 外部能不能访问 |
| --- | --- | --- |
| balance | 公开属性，随便用 | 能 |
| _balance | 内部属性，约定别直接动 | 技术上能，但不该 |
| __balance | 名称改写，防止被子类撞名 | 用改写后的名字仍能，但明显是故意的 |

单下划线是最常用的约定。看到 obj._x，读代码的人立刻明白「这是实现细节，作者不保证它以后不变」。

双下划线触发名称改写：类里的 __balance 会被存成 _Account__balance。它不是加密，只是把名字变复杂，主要用途是避免继承时子类不小心覆盖父类的内部字段。

## 三、用方法把修改管起来

这是封装最实用的一招：把属性改成 _balance，另外提供两个方法。

| 方法 | 作用 |
| --- | --- |
| deposit(self, n) | 先检查 n 是否大于 0，再累加，否则抛 ValueError |
| withdraw(self, n) | 先检查余额够不够，再扣减 |
| get_balance(self) | 只读，返回当前余额 |

这样「余额不能为负」「每笔存款必须为正」这些规则，只在类里写一次，全项目都受保护。

## 四、逐步演示：给账户加一道门

第一步，__init__ 里写 self._balance = 0，用单下划线表明内部属性。

第二步，写 deposit，方法开头判断 n <= 0 就 raise ValueError，通过后 self._balance += n。

第三步，写 withdraw，判断 n > self._balance 就拒绝，通过后扣减。

第四步，写 get_balance 返回余额。

第五步，故意调用 acc.deposit(-50)，确认报错被拦下；再调用 acc.deposit(100)、acc.withdraw(30)，打印余额应为 70。

第六步，体会变化：以后要在每次变动时记日志，只需改这两个方法，调用方完全不用动。

## 五、property：让方法读起来像属性

如果觉得 acc.get_balance() 括号太多，可以用 @property 把一个方法变成「读起来像属性」的形式：

在 def balance(self): 上面写一行 @property，方法返回 self._balance。之后 acc.balance 就能读到值，但不能直接赋值——因为没写 setter。这样既好读，又守住了「不许乱改」的边界。

要允许赋值，再加一个 @balance.setter 装饰的方法，在里面做同样的校验。这是 Python 里相当地道的写法，初学阶段先会读、会照着写就够了。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 加了 @property 后赋值报 AttributeError | 没写 setter | 补 @名字.setter 方法 |
| 以为 __x 别人绝对访问不到 | 名称改写只是改名 | 别拿它当安全机制 |
| 校验写在调用方，某处漏了 | 规则分散 | 把校验收进类的方法 |
| 方法名和属性名一样导致递归 | property 里读了自己 | 内部读写都用 _名字 |`,
    examples: [
      {
        title: '一个不允许乱改余额的账户',
        intro: '所有变动都走 deposit 和 withdraw 两道门，非法操作在门口就被拦下。',
        code: `class Account:
    def __init__(self, owner):
        self.owner = owner
        self._balance = 0

    def deposit(self, n):
        if n <= 0:
            raise ValueError("存款必须大于 0")
        self._balance += n

    def withdraw(self, n):
        if n > self._balance:
            raise ValueError("余额不足")
        self._balance -= n

    def get_balance(self):
        return self._balance

acc = Account("小林")
acc.deposit(100)
acc.withdraw(30)
print(acc.owner, acc.get_balance())
try:
    acc.deposit(-50)
except ValueError as e:
    print("拦住了：", e)`,
        expectedOutput: `小林 70
拦住了： 存款必须大于 0`,
        lines: [
          { code: 'self._balance = 0', explain: '单下划线表示内部属性，提醒外面不要直接改。' },
          { code: 'if n <= 0: raise ValueError(...)', explain: '校验放在方法门口，非法值根本进不来。' },
          { code: 'self._balance += n', explain: '通过校验后才累加，规则只在这里写一次。' },
          { code: 'def get_balance(self):', explain: '提供只读入口，外部不需要知道内部字段叫什么。' },
          { code: 'try: ... except ValueError as e:', explain: '故意触发一次非法操作，验证它确实被拦下。' },
        ],
        trace: [
          { step: 'Account("小林")', state: 'owner = 小林，_balance = 0' },
          { step: 'deposit(100)', state: '100 > 0 通过，_balance = 100' },
          { step: 'withdraw(30)', state: '30 <= 100 通过，_balance = 70' },
          { step: '第一次 print', state: '输出「小林 70」' },
          { step: 'deposit(-50)', state: '校验失败，抛 ValueError，_balance 仍是 70' },
          { step: 'except 分支', state: '输出「拦住了： 存款必须大于 0」' },
        ],
        tryIt: '把 withdraw(30) 改成 withdraw(500)，运行看报错文字；再试着在类外直接写 acc._balance = -999，想想为什么约定挡不住它。',
      },
      {
        title: '用 property 让读取更自然',
        intro: '同样的余额，改成 acc.balance 这样读，同时因为没有 setter，外部仍不能直接赋值。',
        code: `class Account:
    def __init__(self, money):
        self._money = money

    @property
    def money(self):
        return self._money

acc = Account(50)
print(acc.money)
try:
    acc.money = 999
except AttributeError:
    print("不能直接赋值")`,
        expectedOutput: `50
不能直接赋值`,
        lines: [
          { code: '@property', explain: '装饰器，把下面这个方法变成「读起来像属性」的入口。' },
          { code: 'def money(self): return self._money', explain: '读 acc.money 时自动执行它，返回值就是读到的值。' },
          { code: 'print(acc.money)', explain: '不需要括号，看起来和普通属性一样。' },
          { code: 'acc.money = 999', explain: '没有对应的 setter，赋值会抛 AttributeError。' },
        ],
        trace: [
          { step: 'Account(50)', state: '_money = 50' },
          { step: 'acc.money', state: '触发 money 方法，返回 50' },
          { step: '尝试赋值', state: '没有 setter，抛 AttributeError，被 except 接住并打印提示' },
        ],
        tryIt: '给类加一个 @money.setter 方法，在里面只允许设为非负数，再试试赋值 999 和 -1 分别会怎样。',
      },
    ],
    compare: [
      {
        conceptA: '_x 单下划线',
        conceptB: '__x 双下划线',
        diff: '单下划线只是约定，提醒别从外面动；双下划线会触发名称改写，主要用来防止子类撞名。',
        example: '两者都不是加密，真要访问仍然访问得到；日常用单下划线就够了。',
      },
      {
        conceptA: '公开属性',
        conceptB: 'property',
        diff: '公开属性读写都没有把关；property 读起来像属性，实际执行一段方法，能顺手做校验或计算。',
        example: 'acc.balance 若是普通属性可被直接改成负数；若是 property 且无 setter，赋值直接被拒。',
      },
    ],
    pitfalls: [
      '以为双下划线是安全锁，把敏感数据藏进去就放心了，其实只是改了个名字。',
      '@property 里读了自己（return self.money），造成无限递归。',
      '校验逻辑散落在调用方，总有一处会漏。',
      '加了 property 却没写 setter，外部代码里的赋值语句突然全报错。',
      '方法里改的是局部变量而不是 self._x，规则写了却不生效。',
    ],
    keyPoints: [
      '封装是把数据收进对象、只开放受控的修改入口。',
      'Python 靠命名约定表达「内部用」，不是强制锁。',
      '_x 是常用约定；__x 触发名称改写，主要为防继承撞名。',
      '校验写进方法，全项目自动受保护，以后加日志也只改一处。',
      '@property 让方法读起来像属性，配 setter 可在赋值时校验。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第9章 类', section: '9.2 使用类和实例' },
      { book: 'update', chapter: 'Python 属性访问与 property', note: '封装与 property 为进阶补充' },
    ],
    prerequisites: ['s7-05'],
    task: '给上一课的 Rect 类加封装：把宽高改成 _w、_h，提供 set_size 方法校验宽高必须为正数，再用 @property 提供只读的 area。',
    exercises: [
      {
        id: 's7-06-q1',
        qtype: 'single',
        stem: 'Python 里单下划线开头的属性 _balance，最准确的含义是？',
        options: [
          'A. 任何代码都无法访问它',
          'B. 约定它是内部实现细节，外部不应直接修改',
          'C. 它会被 Python 自动加密',
          'D. 它只能在 __init__ 里赋值',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：Python 没有强制私有权，靠命名约定传达意图。\n逐步演示：obj._balance 技术上照样能读写，但看到下划线就该明白「作者不保证它稳定，请走公开方法」。\n易错提醒：别把它当安全机制；真正要拦住非法值，得在方法里写校验。',
        difficulty: 1,
      },
      {
        id: 's7-06-q2',
        qtype: 'blank',
        stem: '把方法变成「读起来像属性」的装饰器，写法是 @______。',
        answer: 'property',
        accepted: ['property', '@property'],
        explanation:
          '答案：property。\n思路：@property 贴在方法定义上一行，让该方法的返回值成为属性读取的结果。\n逐步演示：写 @property 加 def money(self): return self._money，之后 acc.money 不需要括号就能读到值。\n易错提醒：装饰器名字全小写；只加 property 时该属性是只读的，赋值要再配 @money.setter。',
        difficulty: 1,
      },
      {
        id: 's7-06-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行。',
        code: 'class Box:\n    def __init__(self, v):\n        self._v = v\n    def double(self):\n        return self._v * 2\nb = Box(7)\nprint(b.double())\nprint(b._v)',
        keywords: [['14'], ['7']],
        explanation:
          '答案：第一行 14，第二行 7。\n思路：double 方法读内部属性乘 2；_v 本身仍然能被直接读到（约定不拦访问）。\n逐步演示：Box(7) 让 _v = 7；b.double() 算出 14；print(b._v) 直接输出 7。\n易错提醒：单下划线不是访问权限控制，第二行能正常打印，只是写法上不推荐这么做。',
        difficulty: 2,
      },
      {
        id: 's7-06-q4',
        qtype: 'boolean',
        stem: '把「金额必须大于 0」这类校验收进类的方法里，比在每个调用它的地方各写一遍更可靠。',
        answer: '对',
        explanation:
          '答案：对。\n思路：规则集中一处，就不会有某次调用漏检。\n逐步演示：所有修改都走 deposit，方法里判一次 n <= 0；以后要加日志或限额，也只改这一处。\n易错提醒：如果还保留外部直接改 _balance 的口子，规则仍可能被绕过，所以约定和公开入口要一起用。',
        difficulty: 2,
      },
      {
        id: 's7-06-q5',
        qtype: 'program',
        stem: '定义一个 SafeCounter 类：\n1. __init__ 里设 self._n = 0\n2. add(self, n)：n 必须大于 0，否则 raise ValueError；通过则累加\n3. value(self)：返回当前值\n\n造一个对象，依次 add(3)、add(4)，然后 print(c.value())，应输出 7。',
        answer: '',
        testCases: [{ stdin: '', expected: '7' }],
        explanation:
          '答案（参考答案）：\nclass SafeCounter:\n    def __init__(self):\n        self._n = 0\n\n    def add(self, n):\n        if n <= 0:\n            raise ValueError("必须大于 0")\n        self._n += n\n\n    def value(self):\n        return self._n\n\nc = SafeCounter()\nc.add(3)\nc.add(4)\nprint(c.value())\n\n思路：内部状态用 _n 收起来，唯一修改入口 add 里做校验，读取走 value。\n逐步演示：构造时 _n = 0；add(3) 通过校验得 3；add(4) 得 7；value 返回 7，print 输出 7。\n易错提醒：校验要写在累加之前，写成先 self._n += n 再判断，非法值已经污染了数据。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's7-07',
    stageId: 7,
    order: 7,
    title: '继承',
    subtitle: '先有通用款，再改出特别款',
    hook: '学生和会员都要记姓名、都要能打招呼，只有「编号规则」不一样。难道要把同一段代码抄两遍？',
    objectives: [
      '说清父类与子类，写出继承语法',
      '用 super().__init__() 复用父类的初始化',
      '重写父类方法并解释调用时选中了谁',
      '用 isinstance 判断对象属于哪个类',
    ],
    analogy:
      '继承像「基础款手机」和「加了手写笔的升级款」：升级款直接继承基础款的屏幕、电池、系统，只需要额外加一支笔，或者把某个按钮的功能换一换。不用从零重新设计一台手机。',
    terms: [
      { term: '父类 / 基类', plain: '被继承的那个更通用的类。' },
      { term: '子类 / 派生类', plain: '继承别人、再加自己东西的类。' },
      { term: 'super()', plain: '用来调用父类方法的通道，最常见于子类的 __init__ 里。' },
      { term: '重写（override）', plain: '子类把父类同名方法重新写一遍，调用时以子类的为准。' },
      { term: 'isinstance', plain: '判断某个对象是不是某个类（或其子类）造出来的。' },
    ],
    content: `## 一、重复代码是怎么长出来的

先有了一个 Person 类，记姓名、能打招呼。后来要加 Student，也要姓名和打招呼，只多一个成绩。很多人会把 Person 整个复制一遍再改——两份代码从此要同步维护，改一处忘了另一处就出 bug。

继承解决的正是这件事：**把共同的部分留在父类，子类只写自己多出来的那部分。**

## 二、语法与使用规则

| 写法 | 说明 |
| --- | --- |
| class Student(Person): | 括号里写父类名，表示继承 |
| super().__init__(name) | 在子类构造里调用父类构造，把共同属性填好 |
| 子类里写同名方法 | 重写，调用时优先用子类的版本 |
| isinstance(a, Person) | 子类对象也算 Person，返回 True |
| 子类里加新方法 | 只有子类对象能用 |

必须遵守的规则：

- 父类必须先定义，再定义继承它的子类。
- 子类如果写了自己的 __init__，就不会自动调用父类的；共同属性要自己用 super() 补上。
- 不写 __init__ 时，子类会直接沿用父类的构造，造对象时按父类的参数传。
- 继承别超过两三层，太深了没人读得懂。

## 三、super() 为什么不能省

假设 Person 的 __init__ 里设置了 self.name，还做了校验。子类 Student 想加一个 score。

如果子类的 __init__ 只写 self.score = score，那么 self.name 根本没被设置，之后调用继承自父类的 greet 就会报 AttributeError。

写成 super().__init__(name) 就等于说：「先按老规矩把共同部分初始化好，我再补自己的」。这样父类的校验、日志以后升级了，子类自动跟着受益。

## 四、逐步演示：造一个子类

第一步，定义 Person，__init__ 接收 name，写 self.name = name；再写 greet 返回一句问候。

第二步，定义 class Student(Person):，括号里放父类名。

第三步，写 def __init__(self, name, score):，第一行 super().__init__(name)，第二行 self.score = score。

第四步，再写一个和父类同名的 greet，返回带成绩的版本，这就是重写。

第五步，造 s = Student("小林", 88)，分别调用 s.name、s.score、s.greet()，确认父类属性和子类方法都在。

第六步，用 isinstance(s, Student) 和 isinstance(s, Person) 各打印一次，两个都应为 True。

## 五、重写时到底选中了谁

Python 查方法名的顺序是：**先找子类自己，找不到再往上找父类。** 所以子类写了 greet，调用 s.greet() 一定用子类的；子类没写 show，调用 s.show() 就会用父类的。

这条规则也是下一课「多态」的基础——同一句调用，落在不同类上会执行不同版本的方法。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 子类对象读不到 name | 子类 __init__ 没调 super() | 补 super().__init__(name) |
| 报 name is not defined | 括号里父类名拼错或还没定义 | 检查拼写与定义顺序 |
| 调用的方法不是想要的版本 | 子类同名方法重写了父类 | 改名或用 super().方法名() 显式调父类版 |
| 继承层次太深，找不到逻辑 | 拆得太碎 | 优先考虑组合，把对象当属性装进来 |

## 七、继承的判断标准

什么时候该用继承，有个朴素标准：**子类确实是父类的一种。** 猫是动物，用继承；汽车有发动机，那是「有」不是「是」，该用属性组合，把发动机做成一个对象放进去。分不清「是」和「有」，就会写出越改越乱的类层级。
`,
    examples: [
      {
        title: '父类管共同部分，子类只补自己那一点',
        intro: '看 super().__init__(name) 这一行：它把姓名交给父类处理，子类只负责成绩。',
        code: `class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return "你好，我是" + self.name

class Student(Person):
    def __init__(self, name, score):
        super().__init__(name)
        self.score = score

    def greet(self):
        return "你好，我是" + self.name + "，考了" + str(self.score)

s = Student("小林", 88)
print(s.name, s.score)
print(s.greet())
print(isinstance(s, Person))
print(isinstance(s, Student))`,
        expectedOutput: `小林 88
你好，我是小林，考了88
True
True`,
        lines: [
          { code: 'class Person:', explain: '父类，放共同的属性和方法。' },
          { code: 'class Student(Person):', explain: '括号里写父类名，Student 继承 Person 的一切。' },
          { code: 'super().__init__(name)', explain: '调用父类构造，把 self.name 填好；不写这行，name 就不存在。' },
          { code: 'self.score = score', explain: '子类独有的属性，只属于学生。' },
          { code: 'def greet(self):', explain: '与父类同名，构成重写；调用 s.greet() 会选这个版本。' },
          { code: 'isinstance(s, Person)', explain: '子类对象同时也是父类的一种，所以返回 True。' },
        ],
        trace: [
          { step: 'Student("小林", 88)', state: '进入子类 __init__' },
          { step: 'super().__init__', state: '跳到父类构造，self.name = 小林' },
          { step: '回到子类', state: 'self.score = 88' },
          { step: 's.greet()', state: '先在 Student 里找 greet，命中子类版本，返回带成绩的句子' },
          { step: 'isinstance 两次', state: '都返回 True' },
        ],
        tryIt: '把子类里的 greet 整个删掉，再运行，看输出变成父类版本的问候。',
      },
      {
        title: '子类没写构造时会发生什么',
        intro: '子类不写 __init__，就原样沿用父类的，造对象时按父类参数传值。',
        code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return self.name + "叫了一声"

class Dog(Animal):
    def fetch(self):
        return self.name + "去捡球了"

d = Dog("小黑")
print(d.speak())
print(d.fetch())`,
        expectedOutput: `小黑叫了一声
小黑去捡球了`,
        lines: [
          { code: 'class Dog(Animal):', explain: '只继承，不写自己的 __init__。' },
          { code: 'd = Dog("小黑")', explain: '参数直接交给父类的 __init__，self.name 被设好。' },
          { code: 'd.speak()', explain: 'Dog 里没有 speak，Python 往上找到 Animal 的版本。' },
          { code: 'd.fetch()', explain: '子类独有的方法，父类对象用不了。' },
        ],
        trace: [
          { step: 'Dog("小黑")', state: '沿用父类构造，self.name = 小黑' },
          { step: 'd.speak()', state: '子类找不到 → 用父类方法 → 输出「小黑叫了一声」' },
          { step: 'd.fetch()', state: '子类自己的方法 → 输出「小黑去捡球了」' },
        ],
        tryIt: '给 Dog 加一个同名 speak 方法，返回带「汪汪」的句子，观察父类版本被盖掉。',
      },
    ],
    compare: [
      {
        conceptA: '继承',
        conceptB: '组合',
        diff: '继承表达「是一种」，子类自动获得父类能力；组合表达「有一个」，把别的对象当属性装进来。',
        example: '学生是一种人 → 继承；汽车有一个发动机 → 把发动机对象存成属性更合适。',
      },
      {
        conceptA: '重写',
        conceptB: '新增方法',
        diff: '重写是子类写了和父类同名的方法，会盖掉父类版本；新增方法是子类独有的名字，父类对象用不了。',
        example: 'Student 重写 greet；Student 新增 study。',
      },
    ],
    pitfalls: [
      '子类写了 __init__ 却漏掉 super()，共同属性全丢。',
      '父类名拼错或定义在子类之后，报 NameError。',
      '以为子类对象不算父类，isinstance 判断写反。',
      '继承链拉到四五层，改一个方法要翻半天。',
      '把「有一个」的关系硬写成继承，模型变得别扭。',
    ],
    keyPoints: [
      'class 子类(父类): 表示继承，子类自动拥有父类的属性和方法。',
      '子类写自己的 __init__ 时，必须 super().__init__(...) 复用父类初始化。',
      '方法查找先在子类、再往上到父类；同名即重写。',
      'isinstance(子类对象, 父类) 返回 True。',
      '继承适合「是一种」，组合适合「有一个」。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第9章 类', section: '9.3 继承' },
      { book: 'abs3', chapter: '第1章 Python 基础', note: '继承为进阶补充' },
    ],
    prerequisites: ['s7-06'],
    task: '写一个 Employee 父类（姓名、工时），再写 Manager 子类（多一个团队人数），用 super() 复用构造，并重写一个 report 方法。',
    exercises: [
      {
        id: 's7-07-q1',
        qtype: 'single',
        stem: '子类定义了自己的 __init__，却想让父类负责的 name 属性也被正确设置，应该怎么做？',
        options: [
          'A. 什么都不做，Python 会自动调用父类 __init__',
          'B. 在子类 __init__ 里写 super().__init__(name)',
          'C. 在类外面再手动调用一次父类 __init__',
          'D. 把父类删掉',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：子类一旦写了自己的 __init__，父类的构造就不会自动执行。\n逐步演示：在子类 __init__ 第一行写 super().__init__(name)，Python 跳到父类把 self.name 填好，再回来补子类独有属性。\n易错提醒：A 是最常见的误解；漏了这行，调用继承来的方法时会报 AttributeError。',
        difficulty: 1,
      },
      {
        id: 's7-07-q2',
        qtype: 'blank',
        stem: '定义一个继承自 Person 的 Student 类，类声明写作：class Student(______):。填括号里的内容。',
        answer: 'Person',
        accepted: ['Person', 'person'],
        explanation:
          '答案：Person（父类名）。\n思路：继承语法就是在类名后面加括号，括号里放被继承的类。\n逐步演示：class Student(Person): 下面缩进写子类内容；父类必须先定义，否则报 NameError。\n易错提醒：括号里是类名不带括号也不带引号；写错大小写会被当成另一个名字。',
        difficulty: 1,
      },
      {
        id: 's7-07-q3',
        qtype: 'predict',
        stem: '下面代码运行后，第二行输出什么？请写出完整两行。',
        code: 'class A:\n    def f(self):\n        return "A 版"\nclass B(A):\n    def f(self):\n        return "B 版"\nb = B()\nprint(b.f())\nprint(isinstance(b, A))',
        keywords: [['B 版'], ['True', 'true']],
        explanation:
          '答案：第一行「B 版」，第二行 True。\n思路：方法查找先子类后父类；子类对象同时属于父类。\n逐步演示：B 里定义了 f，所以 b.f() 命中子类版本；isinstance(b, A) 检查继承链，B 是 A 的子类，返回 True。\n易错提醒：别以为子类重写后就不算父类了，isinstance 看的是整条继承链。',
        difficulty: 2,
      },
      {
        id: 's7-07-q4',
        qtype: 'boolean',
        stem: '子类里写了和父类同名的方法，调用这个方法时会优先执行子类的版本。',
        answer: '对',
        explanation:
          '答案：对。\n思路：Python 按「先自己、再父类」的顺序找方法名。\n逐步演示：子类有 greet 就用子类的；子类没有 show 才往上找到父类的 show。\n易错提醒：如果确实想调父类版本，可以在子类方法里写 super().greet()，但通常重写就是为了换掉它。',
        difficulty: 2,
      },
      {
        id: 's7-07-q5',
        qtype: 'program',
        stem: '定义一个父类 Shape，__init__(self, name) 存名字，方法 label 返回 name。再定义子类 Circle(Shape)，用 super() 复用构造，并新增方法 area(self) 返回半径的平方乘 3（简化计算，半径固定为 2，返回 12）。\n\n造一个 Circle 对象，名字传「圆」，输出两行：\n圆\n12',
        answer: '',
        testCases: [{ stdin: '', expected: '圆\n12' }],
        explanation:
          '答案（参考答案）：\nclass Shape:\n    def __init__(self, name):\n        self.name = name\n\n    def label(self):\n        return self.name\n\nclass Circle(Shape):\n    def __init__(self, name):\n        super().__init__(name)\n\n    def area(self):\n        return 2 * 2 * 3\n\nc = Circle("圆")\nprint(c.label())\nprint(c.area())\n\n思路：父类负责共同的名字属性，子类用 super() 把构造交回去，再加自己的 area。\n逐步演示：Circle("圆") 进入子类 __init__，super().__init__("圆") 设好 name；c.label() 用父类方法输出「圆」；c.area() 算出 12。\n易错提醒：漏掉 super() 会导致 name 不存在，c.label() 报 AttributeError；area 要带括号调用，写成 c.area 不会执行。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's7-08',
    stageId: 7,
    order: 8,
    title: '多态',
    subtitle: '同一句话，不同对象各自接住',
    hook: '函数里写 item.price()，传书也行、传会员也行、传优惠券也行。它不是先判断类型再分支，凭什么都能跑？',
    objectives: [
      '说清多态的含义，举出一个生活例子',
      '写出接收不同对象、调用同名方法的函数',
      '解释多态为什么让代码更容易扩展',
      '区分多态与继承，说清两者的关系',
    ],
    analogy:
      '多态像办公室里的「下班」通知：行政关电脑，保安锁门，保洁收垃圾。同一句话发下去，每个岗位按自己的职责去做，发通知的人完全不用知道谁具体干什么。以后新来一个岗位，只要他听得懂「下班」，通知一个字都不用改。',
    terms: [
      { term: '多态', plain: '不同对象对同一个方法名，各自给出不同实现；调用方不用管具体类型。' },
      { term: '统一接口', plain: '一组约定好的方法名，各类都实现它们。' },
      { term: '鸭子类型', plain: '只要长得像、叫得像（有这个方法），就当它是鸭子用，不查血统。' },
      { term: '扩展', plain: '加新功能时只新增类，不改原有调用代码。' },
    ],
    content: `## 一、先看不用多态会写成什么样

要算三种商品的实付价：普通商品按原价，会员商品打八折，满减商品减 20。最直觉的写法是一长串判断：

如果是普通商品，走算法一；如果是会员商品，走算法二；如果是满减商品，走算法三……

每多一种商品，就要回到这个函数里加一个分支。分支越堆越长，改一处容易碰坏另一处，这叫「对修改开放」，维护起来很累。

## 二、换一个思路：让每种商品自己算

多态的做法是：让每个类自己实现一个同名方法 pay()，各自在方法里写自己的算法。调用方只写一句 item.pay()，不管传来的是哪种商品。

| 对象 | 同一个方法名 | 各自的结果 |
| --- | --- | --- |
| Normal(100) | pay() | 100 |
| Member(100) | pay() | 80 |
| Discount(100) | pay() | 80 |

**同一句调用，落在不同对象上执行不同代码**，这就是多态。

## 三、语法与使用规则

Python 的多态不要求这些类继承自同一个父类，这一点和某些语言不同：

| 规则 | 说明 |
| --- | --- |
| 方法名一致 | 每个类都实现 pay(self)，名字必须一样 |
| 参数一致 | 调用方按同样的参数表调用，不传类型专属参数 |
| 不查类型 | 调用方不写 isinstance 分支 |
| 新增类型 | 只要新类也实现 pay，调用方代码一行不用改 |

这被戏称为「鸭子类型」：走起来像鸭子、叫起来像鸭子，就当鸭子用。Python 关心的是「有没有这个方法」，不是「是不是某个父类的孩子」。

## 四、逐步演示：一个不关心类型的结算函数

第一步，写 Normal 类，__init__ 存 price，pay 返回 price。

第二步，写 Member 类，同样有 pay，返回 price 乘 0.8。

第三步，写 Discount 类，pay 返回 price 减 20（并用 max 保证不为负）。

第四步，写一个函数 total(items)，里面只做一件事：把每个 item.pay() 加起来返回。

第五步，造三个不同类型的对象放进列表，调用 total，得到三个实付价之和。

第六步，再加一个 Vip 类（七折），只新增这个类，total 函数一个字都不改，重新运行即可生效。

## 五、多态带来的实际好处

好处不在「代码看起来聪明」，而在**改动范围变小了**。

新增一种商品时：不用改结算函数、不用改任何 if、不用回归测试其它分支，只要保证新类实现了 pay。这就是常说的「对扩展开放、对修改封闭」。

代价是：方法名成了一种约定，团队里得说清楚「凡是要进结算列表的对象，都得有 pay 方法」。约定写进文档或父类，多态才稳。

## 六、多态与继承的关系

继承是「复用代码」的手段，多态是「统一调用」的效果，两者常一起出现但不必绑死：

- 用继承：父类定义 pay 的空壳，子类各自重写，结构更明确。
- 不用继承：几个互不相关的类各自实现 pay，照样能多态，Python 完全允许。

初学阶段建议先用继承把结构画清楚，等熟悉了再体会鸭子类型的灵活。

## 七、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 报 has no attribute pay | 某个类漏写了约定方法 | 给那个类补上 pay |
| 多态没生效，走的都是同一段 | 调用方又写了类型分支 | 删掉 if 判断，直接调方法 |
| 结果不对但没报错 | 各方法返回值类型不一致 | 统一返回数字（或统一返回字符串） |
| 新类加进来后旧代码崩了 | 新类方法参数表不一样 | 遵守同样的参数约定 |`,
    examples: [
      {
        title: '一个结算函数，服务三种商品',
        intro: '重点看 total 函数：它完全没判断类型，只管调用每个对象的 pay 方法。',
        code: `class Normal:
    def __init__(self, price):
        self.price = price
    def pay(self):
        return self.price

class Member:
    def __init__(self, price):
        self.price = price
    def pay(self):
        return self.price * 0.8

class Discount:
    def __init__(self, price):
        self.price = price
    def pay(self):
        return max(0, self.price - 20)

def total(items):
    s = 0
    for it in items:
        s += it.pay()
    return s

cart = [Normal(100), Member(100), Discount(100)]
for it in cart:
    print(it.pay())
print("合计", total(cart))`,
        expectedOutput: `100
80.0
80
合计 260.0`,
        lines: [
          { code: 'class Normal:', explain: '普通商品，pay 直接返回原价。' },
          { code: 'class Member:', explain: '会员商品，同样实现了 pay，但算法是八折。' },
          { code: 'return max(0, self.price - 20)', explain: '满减后用 max 兜底，价格不会算成负数。' },
          { code: 'def total(items):', explain: '这个函数不知道也不关心列表里是哪些类。' },
          { code: 's += it.pay()', explain: '同一句调用，落在不同对象上执行不同版本——多态的核心。' },
        ],
        trace: [
          { step: '造三个对象', state: 'cart 里依次是 Normal、Member、Discount，价格都 100' },
          { step: 'Normal.pay()', state: '返回 100' },
          { step: 'Member.pay()', state: '100 × 0.8 = 80.0' },
          { step: 'Discount.pay()', state: 'max(0, 100-20) = 80' },
          { step: 'total(cart)', state: '100 + 80.0 + 80 = 260.0' },
        ],
        tryIt: '新增一个 Vip 类（七折），把它的对象 append 进 cart，观察 total 函数不用改就能算出新结果。',
      },
      {
        title: '用父类把约定写明白',
        intro: '父类给出统一接口，子类各自重写。调用方依然只认方法名。',
        code: `class Notifier:
    def send(self):
        return "（父类占位）"

class Email(Notifier):
    def send(self):
        return "发了一封邮件"

class Sms(Notifier):
    def send(self):
        return "发了一条短信"

def broadcast(items):
    for it in items:
        print(it.send())

broadcast([Email(), Sms()])`,
        expectedOutput: `发了一封邮件
发了一条短信`,
        lines: [
          { code: 'class Notifier:', explain: '父类定义统一接口 send，说明「凡通知器都要有这个方法」。' },
          { code: 'class Email(Notifier):', explain: '继承接口并重写 send。' },
          { code: 'def broadcast(items):', explain: '调用方只遍历、只调 send，不写任何类型判断。' },
          { code: 'broadcast([Email(), Sms()])', explain: '两个不同子类混在同一个列表里，各自给出自己的实现。' },
        ],
        trace: [
          { step: 'Email().send()', state: '命中 Email 的重写版，输出「发了一封邮件」' },
          { step: 'Sms().send()', state: '命中 Sms 的重写版，输出「发了一条短信」' },
        ],
        tryIt: '再写一个 Wechat 类继承 Notifier，加进列表，确认 broadcast 一行都不用改。',
      },
    ],
    compare: [
      {
        conceptA: '类型分支写法',
        conceptB: '多态写法',
        diff: '前者在调用方堆 if 判断，每加一种类型就要改一次；后者把差异放进各自的类，调用方固定不动。',
        example: '新增七折会员：分支写法要给 total 加 elif，多态写法只新增一个类。',
      },
      {
        conceptA: '继承',
        conceptB: '多态',
        diff: '继承是复用父类代码的机制；多态是同一句调用产生不同行为的效果。',
        example: 'Python 里几个毫无继承关系的类，只要都实现 pay，照样能多态。',
      },
    ],
    pitfalls: [
      '在调用方又写了 isinstance 分支，多态白做了。',
      '某个类漏写约定方法，运行时报 AttributeError。',
      '各类方法返回值类型不一致，一个返回数字一个返回字符串，相加时报错。',
      '方法参数表不统一，新类加进来后旧调用崩掉。',
      '以为多态一定要有共同父类，其实 Python 只认「有没有这个方法」。',
    ],
    keyPoints: [
      '多态 = 同一句方法调用，不同对象各自给出不同实现。',
      '调用方只认方法名，不判断类型。',
      '新增类型只加类，不改原有调用代码。',
      'Python 靠鸭子类型实现多态，不必强制共同父类。',
      '方法名与参数表是团队约定，必须写清楚。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第9章 类', section: '9.3 继承' },
      { book: 'update', chapter: '鸭子类型与多态', note: 'Python 多态实践为进阶补充' },
    ],
    prerequisites: ['s7-07'],
    task: '把上一课的员工体系改成多态：父类 Employee 定义 report，Manager 和 Intern 各重写，写一个函数批量打印所有人的 report，再加一种新角色验证函数不用改。',
    exercises: [
      {
        id: 's7-08-q1',
        qtype: 'single',
        stem: '多态最核心的价值是什么？',
        options: [
          'A. 让代码运行得更快',
          'B. 调用方不必判断类型，新增类型时不用改调用方代码',
          'C. 让所有类必须继承同一个父类',
          'D. 自动修复代码里的错误',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：多态把差异收进各个类，调用方只认统一的方法名。\n逐步演示：结算函数只写 item.pay()；新增七折商品时只新增一个类，函数与其它分支完全不用动。\n易错提醒：C 是误解，Python 的鸭子类型不要求共同父类；A 和 D 与多态无关。',
        difficulty: 1,
      },
      {
        id: 's7-08-q2',
        qtype: 'boolean',
        stem: '在 Python 里，两个完全没有继承关系的类，只要都实现了同名方法，也能被同一个函数多态调用。',
        answer: '对',
        explanation:
          '答案：对。\n思路：Python 关心的是「对象有没有这个方法」，不是血统。\n逐步演示：函数里写 it.pay()，传进来的对象只要有 pay 就能运行，无论它继承谁。\n易错提醒：这带来灵活，也带来风险——某个类漏写方法要等运行到才报错，所以约定要写在文档或父类里。',
        difficulty: 1,
      },
      {
        id: 's7-08-q3',
        qtype: 'predict',
        stem: '下面代码运行后依次输出什么？请写出完整三行。',
        code: 'class A:\n    def v(self):\n        return 1\nclass B:\n    def v(self):\n        return 5\ndef show(items):\n    for x in items:\n        print(x.v())\nshow([A(), B(), A()])',
        keywords: [['1'], ['5'], ['1']],
        explanation:
          '答案：依次为 1、5、1。\n思路：show 不判断类型，逐个调用各自的 v 方法。\n逐步演示：第一个 A 对象返回 1；B 对象返回 5；第三个又是 A 对象返回 1，共三行。\n易错提醒：A 和 B 没有继承关系，照样能多态；别以为代码会报错。',
        difficulty: 2,
      },
      {
        id: 's7-08-q4',
        qtype: 'blank',
        stem: 'Python 里「只要对象有对应的方法就当它能用，不检查它属于哪个类」这种做法，常被戏称为 ______ 类型。',
        answer: '鸭子',
        accepted: ['鸭子', 'duck', 'Duck'],
        explanation:
          '答案：鸭子（duck typing）。\n思路：说法来自「走起来像鸭子、叫起来像鸭子，那就是鸭子」。\n逐步演示：函数只调用 it.pay()，不写 isinstance；任何实现了 pay 的对象都能进来。\n易错提醒：灵活归灵活，团队里必须把「统一方法名」这个约定写清楚，否则漏写方法只能在运行时发现。',
        difficulty: 2,
      },
      {
        id: 's7-08-q5',
        qtype: 'program',
        stem: '定义两个互不继承的类 Double 和 Triple，各自有 __init__(self, n) 存数字，各自实现方法 calc：Double 返回 n 乘 2，Triple 返回 n 乘 3。\n\n再写一个函数 total(items)，把每个对象的 calc() 结果累加后返回。\n造 Double(4) 和 Triple(5)，输出两行：\n第一行：total 的结果（23）\n第二行：Double(4).calc() 的结果（8）',
        answer: '',
        testCases: [{ stdin: '', expected: '23\n8' }],
        explanation:
          '答案（参考答案）：\nclass Double:\n    def __init__(self, n):\n        self.n = n\n    def calc(self):\n        return self.n * 2\n\nclass Triple:\n    def __init__(self, n):\n        self.n = n\n    def calc(self):\n        return self.n * 3\n\ndef total(items):\n    s = 0\n    for it in items:\n        s += it.calc()\n    return s\n\nprint(total([Double(4), Triple(5)]))\nprint(Double(4).calc())\n\n思路：两个类没有共同父类，但都实现了 calc，所以同一个 total 函数能处理它们。\n逐步演示：Double(4).calc() = 8；Triple(5).calc() = 15；累加得 23；再单独算一次 Double(4) 得 8。\n易错提醒：total 里不要写 isinstance 分支，那样就不是多态了；两个类的方法名必须一模一样。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's7-09',
    stageId: 7,
    order: 9,
    title: '类变量与实例变量',
    subtitle: '一份大家共用，一份各自保管',
    hook: '想统计「一共造了多少个对象」，把计数器放在哪里？放在每个对象身上会各数各的，放在类上才能大家一起加。',
    objectives: [
      '区分类变量与实例变量的定义位置',
      '说清类变量被所有对象共享意味着什么',
      '解释通过 self 改类变量为什么会变成实例变量',
      '用类变量实现对象计数器',
    ],
    analogy:
      '类变量像教室墙上挂的那块班级公告：全班共用一张，谁抬头看到的都是同一份。实例变量像每个学生自己的笔记本：一人一本，你在自己本子上写字，不会跑到别人的本子上。',
    terms: [
      { term: '类变量', plain: '写在 class 里面、方法外面，所有对象共享同一份。' },
      { term: '实例变量', plain: '写在方法里、带 self. 前缀，每个对象各存一份。' },
      { term: '共享', plain: '多个对象读到的是同一个值，一处改动大家都看得到。' },
      { term: '遮蔽', plain: '对象上多了同名实例属性后，读它会优先读到自己的那份。' },
      { term: '查找顺序', plain: '先找对象自己身上，找不到再去类里找。' },
    ],
    content: `## 一、两种变量，位置决定身份

区别只看写在哪：

| 类型 | 写在哪 | 归属 | 典型用途 |
| --- | --- | --- | --- |
| 类变量 | class 里面、所有方法外面 | 类本身，全体共享 | 计数器、默认配置、常量 |
| 实例变量 | 方法里，带 self. 前缀 | 单个对象 | 姓名、成绩、余额 |

写在 class 下面缩进一层、但不在 def 里的赋值，就是类变量。写在 __init__ 里 self.xxx = ... 的，是实例变量。

## 二、共享会带来什么

类变量最直观的特点是：**通过类名改一次，所有对象再读都是新值。** 因为大家读的是同一份数据。

这很适合做计数器：在类的 __init__ 里写 类名.count += 1，每造一个对象就加一，无论造多少个对象，count 始终记录总数。

但共享也是坑的来源。如果把可变对象（比如一个列表）当类变量，所有对象都会往同一个列表里加东西，看起来像「数据串了」。所以在类变量里放列表要格外小心，多数时候应该放实例变量。

## 三、最容易踩的坑：self.类变量名 = 值

假设类里有 count = 0，某个方法里写 self.count = 100。

这一句**不会**修改类变量，而是给当前这个对象新建了一个同名的实例变量 count，把类变量「遮蔽」了。此后：

- 读这个对象的 self.count，得到 100（自己那份）
- 读 类名.count，仍是 0（大家那份）
- 别的对象读 self.count，仍是 0

规则就一条：**赋值带 self. 前缀，一律创建或更新实例变量；想改类变量，用类名去改。**

## 四、逐步演示：造一个带计数器的类

第一步，class User: 下面写 count = 0，这就是类变量。

第二步，__init__ 里写 self.name = name（实例变量），再写 User.count += 1（用类名改类变量）。

第三步，造三个 User 对象，打印 User.count，得到 3。

第四步，打印每个对象的 name，确认各不一样。

第五步，故意执行 u1.count = 99，再打印 u1.count 和 User.count，看到 99 与 3 并存——前者是 u1 自己新建的实例变量。

第六步，读取 u2.count，仍是 3，证明 u1 的改动没影响别人。

## 五、查找顺序

读 obj.x 时 Python 的顺序是：

1. 先在这个对象自己的属性表里找
2. 找不到，去它所属的类里找
3. 再找不到，沿继承链往父类找
4. 都没有，抛 AttributeError

这条顺序解释了为什么实例变量会「盖住」类变量，也解释了继承时同名方法为什么优先用子类的。

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 计数器每个对象都从 1 开始 | 把计数写成了 self.count += 1 | 改用 类名.count += 1 |
| 所有对象共享一个列表，数据串了 | 列表放成了类变量 | 把列表初始化移进 __init__ |
| 改了类变量，某对象读到的还是旧值 | 该对象已有同名实例变量遮蔽 | 用 类名.变量名 读，或删掉实例变量 |
| 继承后子类改了类变量影响父类 | 子类与父类共享同名类变量 | 在子类里重新定义一份 |

## 七、一个记忆口诀

记一句口诀：**类变量看类，实例变量看自己。** 读的时候按这个顺序找，写的时候用 self.名字 才是给这个实例加属性；想改全体共享的值，得用 类名.名字 去改，用 self 改只会给自己加一个新属性。
`,
    examples: [
      {
        title: '用类变量数一数造了多少对象',
        intro: 'count 写在类里、方法外，用类名累加；name 写在 __init__ 里，每个对象各一份。',
        code: `class User:
    count = 0

    def __init__(self, name):
        self.name = name
        User.count += 1

u1 = User("小林")
u2 = User("小周")
u3 = User("小陈")
print(User.count)
print(u1.name, u2.name, u3.name)
print(u2.count)`,
        expectedOutput: `3
小林 小周 小陈
3`,
        lines: [
          { code: 'count = 0', explain: '写在类体里、方法外，是全体共享的类变量。' },
          { code: 'self.name = name', explain: '带 self. 前缀，属于当前对象自己的实例变量。' },
          { code: 'User.count += 1', explain: '用类名修改类变量，三次构造后累加成 3。' },
          { code: 'print(u2.count)', explain: 'u2 自己没有 count，查到类里那份，仍是 3。' },
        ],
        trace: [
          { step: 'User("小林")', state: 'User.count = 1，u1.name = 小林' },
          { step: 'User("小周")', state: 'User.count = 2，u2.name = 小周' },
          { step: 'User("小陈")', state: 'User.count = 3，u3.name = 小陈' },
          { step: '三次 print', state: '依次输出 3、三个人名、3' },
        ],
        tryIt: '把 User.count += 1 改成 self.count += 1，运行看结果变成什么，想想为什么每个对象都只有 1。',
      },
      {
        title: '遮蔽：self.类变量名 = 值 会发生什么',
        intro: '这一课最容易错的地方，用一次对照把它讲透。',
        code: `class Config:
    version = 1

c1 = Config()
c2 = Config()
c1.version = 99
print(c1.version)
print(c2.version)
print(Config.version)
Config.version = 2
print(c2.version)`,
        expectedOutput: `99
1
1
2`,
        lines: [
          { code: 'version = 1', explain: '类变量，两个对象一开始都读它。' },
          { code: 'c1.version = 99', explain: '带 self/对象 前缀的赋值新建了 c1 自己的实例变量，没有动类变量。' },
          { code: 'print(c1.version)', explain: '先查自己身上，命中 99。' },
          { code: 'print(Config.version)', explain: '直接读类，仍是 1。' },
          { code: 'Config.version = 2', explain: '用类名改，c2 没有自己的 version，于是读到新的 2。' },
        ],
        trace: [
          { step: '造 c1、c2', state: '两者都没有自己的 version，读到的都是类里的 1' },
          { step: 'c1.version = 99', state: 'c1 新增实例变量 version=99，Config.version 仍是 1' },
          { step: '三次 print', state: '依次输出 99、1、1' },
          { step: 'Config.version = 2', state: 'c2 查不到自己的，去类里读到 2' },
        ],
        tryIt: '把 c1.version = 99 改成 Config.version = 99，预测四行输出，再运行验证。',
      },
    ],
    compare: [
      {
        conceptA: '类变量',
        conceptB: '实例变量',
        diff: '类变量全体共享一份，用类名修改；实例变量每个对象各一份，用 self. 赋值。',
        example: 'User.count 记总人数；u1.name 记这一个人的名字。',
      },
      {
        conceptA: '类名.变量 = 值',
        conceptB: 'self.变量 = 值',
        diff: '前者改的是大家共用的那份；后者只给当前对象新建或更新一份，可能遮蔽类变量。',
        example: 'User.count += 1 让总数加一；self.count += 1 只让这个对象自己变成 1。',
      },
    ],
    pitfalls: [
      '把可变列表当类变量，所有对象往同一个列表里加数据，结果互相串。',
      '计数器写成 self.count += 1，每个对象都只数到自己。',
      '混淆 obj.x 与 类名.x，以为改一个另一个必然跟着变。',
      '子类沿用父类同名类变量，一改就影响到父类。',
      '不知道查找顺序，看到「值没变」就以为 Python 出了 bug。',
    ],
    keyPoints: [
      '类变量写在类体、方法外，全体共享；实例变量写在 self. 后，各存一份。',
      '改类变量要用类名，不能用 self.。',
      'self.类变量名 = 值 会新建实例变量并遮蔽类变量。',
      '属性查找先对象、再类、再父类。',
      '类变量适合计数器与默认配置，不适合放可变列表。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第9章 类', section: '9.2 使用类和实例' },
      { book: 'update', chapter: '类属性与实例属性', note: '属性查找顺序为进阶补充' },
    ],
    prerequisites: ['s7-04'],
    task: '写一个 Order 类，用类变量 total_orders 统计生成了多少订单，实例变量存商品名和金额；造 4 个订单后打印总数，并验证单个对象上直接赋值不会改变总数。',
    exercises: [
      {
        id: 's7-09-q1',
        qtype: 'single',
        stem: '关于类变量，下面哪一句正确？',
        options: [
          'A. 每个对象各存一份，互不影响',
          'B. 写在类里、方法外，由所有对象共享同一份',
          'C. 只能用 self. 访问',
          'D. 必须在 __init__ 里定义',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：位置决定身份——类体里、方法外的赋值就是类变量。\n逐步演示：User.count = 0 存在类上；三个对象都没有自己的 count，读到的是同一份；用 User.count += 1 改一次，大家都看到新值。\n易错提醒：A 描述的是实例变量；C、D 都把类变量和实例变量的写法搞混了。',
        difficulty: 1,
      },
      {
        id: 's7-09-q2',
        qtype: 'blank',
        stem: '想让每造一个对象计数器就加一，且总数对所有对象一致，应该写 ______.count += 1（填类名）。以 User 类为例。',
        answer: 'User',
        accepted: ['User', 'user', '类名'],
        explanation:
          '答案：User（用类名，不是 self）。\n思路：只有用类名赋值才会改到共享的那份。\n逐步演示：__init__ 里写 User.count += 1，造三个对象后 User.count 是 3；写成 self.count += 1 则每个对象各自从 0 加到 1。\n易错提醒：读取时 self.count 也能读到类变量，但一赋值就变了性质——读和写是两回事。',
        difficulty: 2,
      },
      {
        id: 's7-09-q3',
        qtype: 'predict',
        stem: '下面代码运行后依次输出什么？请写出三行。',
        code: 'class C:\n    x = 5\na = C()\nb = C()\na.x = 100\nprint(a.x)\nprint(b.x)\nprint(C.x)',
        keywords: [['100'], ['5'], ['5']],
        explanation:
          '答案：依次为 100、5、5。\n思路：a.x = 100 只给 a 新建了实例变量，类变量与其他对象都没变。\n逐步演示：a 读自己身上的 100；b 自己没有 x，去类里读到 5；直接读 C.x 也是 5。\n易错提醒：这是「遮蔽」不是「修改」，别以为 b 会跟着变成 100。',
        difficulty: 2,
      },
      {
        id: 's7-09-q4',
        qtype: 'boolean',
        stem: '把列表作为类变量，让每个对象都往里 append 自己的数据，是安全的做法，各对象数据互不干扰。',
        answer: '错',
        explanation:
          '答案：错。\n思路：类变量只有一份，列表又是可变对象，所有对象操作的是同一个列表。\n逐步演示：类里写 items = []，两个对象各 append 一次，结果这个列表里同时躺着两份数据；看起来就像数据串了。\n易错提醒：需要每个对象独立的列表，就在 __init__ 里写 self.items = []，做成实例变量。',
        difficulty: 2,
      },
      {
        id: 's7-09-q5',
        qtype: 'program',
        stem: '定义一个 Ticket 类：\n1. 类变量 made = 0\n2. __init__(self, seat) 存实例变量 seat，并用类名把 made 加一\n3. 方法 label(self) 返回 seat 的字符串形式\n\n造 Ticket("A1")、Ticket("A2")、Ticket("A3")，输出两行：\n第一行：Ticket.made 的值（3）\n第二行：最后一个对象的 label()（A3）',
        answer: '',
        testCases: [{ stdin: '', expected: '3\nA3' }],
        explanation:
          '答案（参考答案）：\nclass Ticket:\n    made = 0\n\n    def __init__(self, seat):\n        self.seat = seat\n        Ticket.made += 1\n\n    def label(self):\n        return str(self.seat)\n\nt1 = Ticket("A1")\nt2 = Ticket("A2")\nt3 = Ticket("A3")\nprint(Ticket.made)\nprint(t3.label())\n\n思路：计数用类名累加，座位用 self 存，两者分工清楚。\n逐步演示：三次构造让 Ticket.made = 3；t3.seat 是 A3，label 转成字符串返回；两行输出 3 和 A3。\n易错提醒：写成 self.made += 1 会让每个对象各自得到 1，总数永远是 0；读 Ticket.made 时不要加括号。',
        difficulty: 3,
      },
    ],
    minutes: 18,
    env: 'browser',
  },
  {
    id: 's7-10',
    stageId: 7,
    order: 10,
    title: '综合练习：用类重构通讯录',
    subtitle: '把散装函数收进两个类里',
    hook: '前面写的通讯录是一堆函数和几个全局字典，功能一多就分不清谁改了谁。这一课把它整个拆成两个类，看结构怎么变清楚。',
    objectives: [
      '对比散装写法与面向对象写法的差异',
      '设计 Contact 与 AddressBook 两个类的职责',
      '实现添加、查找、删除、列出四项功能',
      '说出重构后的可扩展性提升在哪',
    ],
    analogy:
      '散装写法像把所有票据、名片、便签全摊在一张桌上；用类重构，等于给了你一张名片盒（Contact）和一个带索引的柜子（AddressBook）。东西没变，找起来和加起来的规矩完全不一样。',
    terms: [
      { term: '重构', plain: '功能不变，只把内部组织方式改得更清楚。' },
      { term: '职责划分', plain: '决定每个类该管什么事，别把什么都塞进一个类。' },
      { term: '封装容器', plain: '把列表或字典藏进对象内部，外部只通过方法操作。' },
      { term: '可扩展性', plain: '以后加功能时，改动范围有多小。' },
    ],
    content: `## 一、先看散装写法的问题

常见的第一版通讯录长这样：一个全局列表 contacts，里面每个联系人是一个字典；再写四个函数 add、find、remove、list_all，都直接读写这个全局列表。

它能跑，但有三处别扭：

- 全局列表谁都能改，某个函数写错了键名，数据就悄悄坏了
- 联系人字典长什么样，只散落在各个函数里，没有一处说清「必须有 name 和 phone」
- 以后要加分组、加标签，四个函数都得翻一遍

## 二、职责怎么分

重构的关键是分两个类，各管各的：

| 类 | 管什么 | 关键方法 |
| --- | --- | --- |
| Contact | 一个联系人自己的数据与描述 | __init__、__str__ |
| AddressBook | 一批联系人的容器与操作 | add、find、remove、all |

Contact 只关心「一个人长什么样」，AddressBook 只关心「怎么管这一批人」。判断标准：如果一段代码既不在描述单个联系人，也不在管理集合，那它多半放错地方了。

## 三、语法与使用规则 - 设计约定

| 约定 | 说明 |
| --- | --- |
| Contact(name, phone) | 构造时两个字段必须给，杜绝缺字段 |
| _items = [] | 通讯录内部列表用单下划线，外部不要直接动 |
| add(contact) | 只接收 Contact 对象，不接收散装字典 |
| find(name) | 找到返回对象，找不到返回 None |
| remove(name) | 返回是否删除成功，用布尔值表达结果 |

约定越明确，后面加功能越不容易出错。特别是「只收 Contact 对象」这一条，它把数据形状的检查收窄到了一个入口。

## 四、逐步演示：分四步搭起来

第一步，写 Contact：__init__ 存 name 和 phone，__str__ 返回「姓名：电话」的文字。

第二步，写 AddressBook：__init__ 里设 self._items = []，注意是实例变量，每本通讯录独立。

第三步，写 add，把 Contact 对象 append 进 _items；写 all，返回 _items 的副本（用 list() 包一层，防止外部直接改内部列表）。

第四步，写 find 遍历 _items 比对 name，命中返回对象，循环结束返回 None；写 remove 先找到再 remove，返回 True 或 False。

第五步，造一本通讯录，加三个人，查找一次、删除一次、列出剩余，逐项打印验证。

第六步，回头对比第一版：功能完全一样，但数据形状、修改入口、扩展点都清楚了。

## 五、为什么这样更好扩展

要加「分组」功能时，只需给 Contact 加一个 group 属性、给 AddressBook 加一个 by_group 方法，add/find/remove 基本不用动。

要换成按电话查找，只改 find 的判断条件，或者新增 find_by_phone。所有对内部列表的访问仍然只发生在类里，不会散落到项目各处。

这就是封装 + 职责划分带来的实际收益：**改动被圈在几个方法里，而不是散在全项目。**

## 六、常见错误与解决办法

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 所有通讯录对象共享同一批联系人 | 把 _items 写成了类变量 | 移进 __init__ 用 self._items |
| all() 返回后被人改乱内部数据 | 直接返回了内部列表 | 返回 list(self._items) 副本 |
| find 找不到时后续代码崩了 | 调用方没处理 None | 调用方先判断再使用 |
| add 收进散装字典，后面缺字段 | 没统一数据形状 | 只接收 Contact 对象 |`,
    examples: [
      {
        title: '两个类搭起来的完整最小通讯录',
        intro: '这是本阶段的收尾项目，功能不多但结构完整：数据形状、容器、四个操作全都在。',
        code: `class Contact:
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone

    def __str__(self):
        return self.name + "：" + self.phone

class AddressBook:
    def __init__(self):
        self._items = []

    def add(self, contact):
        self._items.append(contact)

    def find(self, name):
        for c in self._items:
            if c.name == name:
                return c
        return None

    def remove(self, name):
        c = self.find(name)
        if c is None:
            return False
        self._items.remove(c)
        return True

    def all(self):
        return list(self._items)

book = AddressBook()
book.add(Contact("小林", "13800000001"))
book.add(Contact("小周", "13800000002"))
print(book.find("小林"))
print(book.remove("小周"))
print(len(book.all()))
for c in book.all():
    print(c)`,
        expectedOutput: `小林：13800000001
True
1
小林：13800000001`,
        lines: [
          { code: 'class Contact:', explain: '只描述一个联系人，数据形状在这里定死。' },
          { code: 'self._items = []', explain: '写在 __init__ 里，每本通讯录各自独立的列表；写成类变量会让所有本子共用一份。' },
          { code: 'def add(self, contact):', explain: '只接收 Contact 对象，保证放进来的东西一定有 name 和 phone。' },
          { code: 'def find(self, name):', explain: '遍历比对，命中即返回对象；循环走完还没找到就返回 None。' },
          { code: 'def all(self):', explain: '返回 list(...) 副本，外部改这个列表不会动到内部数据。' },
          { code: 'print(book.find("小林"))', explain: '找到的是 Contact 对象，print 触发 __str__ 显示成人话。' },
        ],
        trace: [
          { step: '造 book', state: '_items = []' },
          { step: 'add 两个联系人', state: '_items = [小林, 小周]' },
          { step: 'find("小林")', state: '命中，返回该 Contact 对象，print 输出「小林：13800000001」' },
          { step: 'remove("小周")', state: '找到并移除，返回 True' },
          { step: 'len(book.all())', state: '剩 1 人，输出 1' },
          { step: '遍历打印', state: '输出「小林：13800000001」' },
        ],
        tryIt: '给 Contact 加一个 group 参数并提供默认值「朋友」，再给 AddressBook 加一个 by_group 方法，验证原有四个方法不用改。',
      },
      {
        title: '对照：散装写法长什么样',
        intro: '同一套功能用全局列表加函数写出来，功能一样，但数据形状和入口都散着，方便你体会重构的价值。',
        code: `contacts = []

def add(name, phone):
    contacts.append({"name": name, "phone": phone})

def find(name):
    for c in contacts:
        if c["name"] == name:
            return c
    return None

add("小林", "13800000001")
add("小周", "13800000002")
r = find("小林")
print(r["name"], r["phone"])
print(len(contacts))`,
        expectedOutput: `小林 13800000001
2`,
        lines: [
          { code: 'contacts = []', explain: '全局列表，项目里任何地方都能直接改。' },
          { code: 'contacts.append({...})', explain: '字典形状只在这一行出现，别处不知道该有哪些键。' },
          { code: 'r = find("小林")', explain: '返回的是字典，取值要靠字符串键，写错键名要到运行时才发现。' },
        ],
        trace: [
          { step: '两次 add', state: 'contacts 里有两个字典' },
          { step: 'find', state: '返回小林那个字典' },
          { step: '两次 print', state: '输出「小林 13800000001」和 2' },
        ],
        tryIt: '想一想：要把「电话」改名为「手机号」，散装写法要改几处？类写法要改几处？',
      },
    ],
    compare: [
      {
        conceptA: '散装写法',
        conceptB: '类写法',
        diff: '散装写法的数据形状与修改入口分散在各函数里；类写法把形状收进 Contact、把入口收进 AddressBook。',
        example: '加一个字段时，散装写法要翻遍所有函数；类写法主要改 Contact 一处。',
      },
      {
        conceptA: '返回内部列表',
        conceptB: '返回副本',
        diff: '前者让外部能绕过方法直接改数据；后者保留封装边界。',
        example: 'return self._items 危险；return list(self._items) 更安全。',
      },
    ],
    pitfalls: [
      '把 _items 写成类变量，两本通讯录莫名其妙共用同一批联系人。',
      'all() 直接返回内部列表，外部一次 append 就绕过了 add 的约束。',
      'find 返回 None 时调用方直接取属性，报 AttributeError。',
      'add 同时允许字典和对象，容器里数据形状不一致，后续全乱。',
      '把所有方法都塞进一个类，职责划分白做了。',
    ],
    keyPoints: [
      '重构是功能不变、组织变清楚。',
      'Contact 管单个联系人，AddressBook 管一批联系人。',
      '内部容器用 self._items，别写成类变量。',
      '对外只开放方法，返回副本而不是内部列表。',
      '职责划清楚后，加功能的改动范围会明显变小。',
    ],
    sources: [
      { book: 'pcc3', chapter: '第9章 类', note: '综合练习融合类、封装、方法设计' },
      { book: 'abs3', chapter: '第12章 设计并部署命令行程序', note: '项目组织与重构思路' },
    ],
    prerequisites: ['s7-08', 's7-09'],
    task: '给通讯录加「按姓名排序后列出」和「按手机号查找」两个方法，要求不修改已有的 add / find / remove，然后写一段代码验证。',
    exercises: [
      {
        id: 's7-10-q1',
        qtype: 'single',
        stem: '把通讯录拆成 Contact 和 AddressBook 两个类，最主要的收益是？',
        options: [
          'A. 代码行数一定变少',
          'B. 数据形状与修改入口集中，加功能时改动范围变小',
          'C. 程序运行速度大幅提升',
          'D. 可以不用写函数了',
        ],
        answer: 'B',
        explanation:
          '答案：B。\n思路：重构的价值在组织，不在性能或行数。\n逐步演示：Contact 定死字段，AddressBook 收拢操作；加分组时主要改这两个类，散装写法则要翻遍所有函数。\n易错提醒：类写法的代码往往比散装写法更长，这是正常的，换来的是可维护性。',
        difficulty: 1,
      },
      {
        id: 's7-10-q2',
        qtype: 'blank',
        stem: 'AddressBook 里存联系人的列表应该写成 self._items = [] 放在 ______ 方法里，这样每本通讯录才各有自己的列表。',
        answer: '__init__',
        accepted: ['__init__', 'init', '构造方法', '构造'],
        explanation:
          '答案：__init__（构造方法）。\n思路：写在方法里带 self. 前缀才是实例变量。\n逐步演示：def __init__(self): self._items = [] 让每次造对象都新建空列表；写在类体里则是全体共享的类变量。\n易错提醒：类变量放列表尤其危险，所有对象会往同一个列表里加数据。',
        difficulty: 2,
      },
      {
        id: 's7-10-q3',
        qtype: 'predict',
        stem: '下面代码运行后输出什么？请写出两行。',
        code: 'class Book:\n    def __init__(self):\n        self._items = []\n    def add(self, x):\n        self._items.append(x)\n    def size(self):\n        return len(self._items)\nb1 = Book()\nb2 = Book()\nb1.add("A")\nb1.add("B")\nprint(b1.size())\nprint(b2.size())',
        keywords: [['2'], ['0']],
        explanation:
          '答案：第一行 2，第二行 0。\n思路：_items 是实例变量，两本通讯录各存一份。\n逐步演示：b1 加两次后自己的列表有 2 项；b2 从没 add 过，还是空列表，size 返回 0。\n易错提醒：如果把 _items = [] 写到类体里变成类变量，第二行也会输出 2——这正是本课反复强调的坑。',
        difficulty: 2,
      },
      {
        id: 's7-10-q4',
        qtype: 'boolean',
        stem: 'AddressBook 的 all 方法直接 return self._items，能让外部拿到列表，是既简单又安全的做法。',
        answer: '错',
        explanation:
          '答案：错。\n思路：直接返回内部列表，等于把修改入口又开放出去了。\n逐步演示：外部写 book.all().append(某字典)，绕过 add 的约束，容器里混进形状不对的数据。\n易错提醒：改成 return list(self._items) 返回副本，外部怎么折腾都不会动到内部；若要改数据，请专门提供方法。',
        difficulty: 2,
      },
      {
        id: 's7-10-q5',
        qtype: 'program',
        stem: '定义一个 TodoList 类：\n1. __init__ 建实例变量 self._items = []\n2. add(self, text) 把任务文本加进列表\n3. done(self, text) 若 text 在列表里就移除并返回 True，否则返回 False\n4. count(self) 返回剩余任务数\n\n造一个对象，依次 add("买菜")、add("写作业")，调用 done("买菜") 并打印结果，再打印 count()。输出两行：\nTrue\n1',
        answer: '',
        testCases: [{ stdin: '', expected: 'True\n1' }],
        explanation:
          '答案（参考答案）：\nclass TodoList:\n    def __init__(self):\n        self._items = []\n\n    def add(self, text):\n        self._items.append(text)\n\n    def done(self, text):\n        if text in self._items:\n            self._items.remove(text)\n            return True\n        return False\n\n    def count(self):\n        return len(self._items)\n\nt = TodoList()\nt.add("买菜")\nt.add("写作业")\nprint(t.done("买菜"))\nprint(t.count())\n\n思路：容器收在对象内部，外部只通过三个方法操作，和 AddressBook 是同一套结构。\n逐步演示：两次 add 后列表有 2 项；done 判断「买菜」存在，移除并返回 True；count 返回 1。\n易错提醒：_items 必须写在 __init__ 里；done 里要先判断再 remove，直接 remove 一个不存在的元素会抛 ValueError。',
        difficulty: 3,
      },
    ],
    minutes: 20,
    env: 'browser',
  },
]
