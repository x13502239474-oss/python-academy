import type { Lesson } from '../../types'

export const stage5Lessons: Lesson[] = [
  {
    id: 's5-01',
    stageId: 5,
    order: 1,
    title: '什么是类与对象',
    subtitle: '一张设计图纸，和照着它造出来的东西',
    hook: '要造一百只一模一样的小狗，你是每次从头画一遍，还是先画好一张『小狗图纸』，再照着它造一百只？后者就是面向对象。',
    objectives: ['用自己的话说出类和对象的关系', '会定义一个最简单的类', '能用类名造出对象并调用它的方法'],
    analogy: '类就是建筑图纸，对象是照图纸盖出来的房子。图纸本身不能住人，但照它盖出来的每一栋房子都能住人，而且彼此长得很像。',
    content: `# 类与对象：从图纸到实物

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

两个对象都来自同一张『图纸』，所以都会叫。但它们是两个独立的东西，后面你可以给它们起不同的名字、设定不同的年龄——这就是面向对象最妙的地方：**一次定义，反复使用，各自不同**。`,
    examples: [
      {
        title: '宠物店的小狗档案',
        code: 'class Dog:\n    def bark(self):\n        print("汪汪！我是小狗")\n\ndog1 = Dog()\ndog2 = Dog()\ndog1.bark()\ndog2.bark()\nprint("是不是同一个对象：", dog1 is dog2)',
        expectedOutput: '汪汪！我是小狗\n汪汪！我是小狗\n是不是同一个对象： False',
        lines: [
          { code: 'class Dog:', explain: '定义一个叫 Dog 的类，注意首字母大写，后面要跟英文冒号。' },
          { code: 'def bark(self):', explain: 'bark 是方法，就是写在类里的函数。self 暂时记住『必须有』，下一课细讲。' },
          { code: 'dog1 = Dog()', explain: '用类名加括号造一个对象，这叫实例化。括号里暂时不传东西。' },
          { code: 'dog1.bark()', explain: '用『对象.方法名()』调用方法，对象就会执行图纸里写好的动作。' },
          { code: 'dog1 is dog2', explain: 'is 判断是不是同一个对象。两次 Dog() 造出的是两个独立对象，所以是 False。' },
        ],
      },
    ],
    visual: {
      kind: 'variable',
      title: '一张图纸，造出两只小狗',
      description: '类 Dog 是图纸，dog1 和 dog2 是照图纸造出的两个独立对象。',
      variables: [{ name: 'Dog', value: '类（图纸）：会 bark()' }],
      steps: [
        { label: '定义图纸', detail: 'class Dog 定义了一类会叫的东西', state: [{ name: 'Dog', value: '类（图纸）' }] },
        { label: '造第一个对象', detail: 'dog1 = Dog()', state: [{ name: 'dog1', value: 'Dog 对象 #1' }, { name: 'dog2', value: '（还没有）' }] },
        { label: '造第二个对象', detail: 'dog2 = Dog()', state: [{ name: 'dog1', value: 'Dog 对象 #1' }, { name: 'dog2', value: 'Dog 对象 #2' }] },
        { label: '调用方法', detail: 'dog1.bark() → 汪汪！', state: [{ name: 'dog1', value: '执行 bark()' }, { name: 'dog2', value: '不受影响' }] },
      ],
    },
    compare: [
      { conceptA: '类', conceptB: '对象', diff: '类是图纸、模板，只有一份；对象是照图纸造出来的实物，可以有很多个，各自独立。', example: 'Dog 是类，dog1 和 dog2 是两个对象；改 dog1 不会影响 dog2。' },
    ],
    pitfalls: ['类名忘记大写开头（不是语法错误，但不符合约定，读到的人会困惑）。', '调用方法时漏写括号，写成 dog1.bark 只是取出方法本身，并不会执行。', '以为两个对象是一回事——dog1 = Dog() 和 dog2 = Dog() 造出的是两块独立空间。'],
    sources: [{ book: 'pcc3', chapter: '第9章 类' }],
    prerequisites: ['s2-07', 's4-01'],
    task: '定义一个『手机 Phone』类，给它一个 call() 方法输出『正在打电话』，然后造出两台手机，分别调用这个方法。',
    exercises: [
      {
        id: 's5-01-q1',
        qtype: 'single',
        stem: '关于类和对象的关系，下面哪种说法正确？',
        options: ['A. 对象是类的图纸', 'B. 类是对象造出来的实物', 'C. 类是图纸，对象是根据图纸造出来的实物', 'D. 类和对象是同一个东西的两种叫法'],
        answer: 'C',
        explanation: '类是抽象的模板（图纸），对象是按模板创建出来的具体实例（实物），两者是图纸与成品的关系。',
      },
      {
        id: 's5-01-q2',
        qtype: 'boolean',
        stem: '执行 two = Dog() 和 one = Dog() 后，one 和 two 是同一个对象。',
        answer: '错',
        explanation: '每次调用 类名() 都会创建一个全新的对象，one 和 two 是两个独立的对象，用 is 判断结果是 False。',
      },
      {
        id: 's5-01-q3',
        qtype: 'predict',
        stem: '执行下面代码会输出什么？\nclass Cat:\n    def meow(self):\n        print(\'喵\')\n\nc = Cat()\nc.meow()',
        keywords: [['喵']],
        explanation: 'Cat() 造出对象 c，c.meow() 调用类里定义的方法，输出『喵』。',
      },
    ],
    minutes: 11,
    env: 'browser',
  },
  {
    id: 's5-02',
    stageId: 5,
    order: 2,
    title: '属性、方法与 __init__',
    subtitle: '让每个对象都有自己的数据',
    hook: '光会叫的小狗还不够，你得告诉它叫什么名字、几岁了。这些『属于它自己的信息』，就是属性。',
    objectives: ['会给对象设置和读取属性', '理解 self 的含义', '会用 __init__ 在造对象时自动初始化属性'],
    analogy: '把 __init__ 想成『出厂设置』：工厂造出一台手机，出厂时自动装好系统、贴好序列号，不用你再一样样手动装。',
    content: `# 属性、方法与构造方法

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

把员工做成类：属性有姓名、部门、工资，方法有打卡、算年终奖。以后公司来一百个员工，只要 \`Employee(姓名, 部门, 工资)\` 就能造出一百份档案，再也不会漏填字段。`,
    examples: [
      {
        title: '员工档案小系统',
        code: 'class Employee:\n    def __init__(self, name, dept, salary):\n        self.name = name\n        self.dept = dept\n        self.salary = salary\n\n    def introduce(self):\n        print(f"我是{self.name}，在{self.dept}部门")\n\nzhang = Employee("张三", "财务", 8000)\nli = Employee("李四", "技术", 12000)\nzhang.introduce()\nli.introduce()\nprint("张三调整薪资前：", zhang.salary)\nzhang.salary = 9000\nprint("张三调整薪资后：", zhang.salary)',
        expectedOutput: '我是张三，在财务部门\n我是李四，在技术部门\n张三调整薪资前： 8000\n张三调整薪资后： 9000',
        lines: [
          { code: 'def __init__(self, name, dept, salary):', explain: '造对象时自动调用，接收传进来的三个值。self 代表正在被创建的那个对象。' },
          { code: 'self.name = name', explain: '把传进来的 name 存成对象的属性。左边是属性名，右边是参数值。' },
          { code: 'zhang = Employee("张三", "财务", 8000)', explain: '造对象时传入三个值，它们会自动传给 __init__（不用手动写 self）。' },
          { code: 'zhang.salary = 9000', explain: '属性可以随时修改，只影响 zhang 这个对象，不影响 li。' },
        ],
      },
    ],
    visual: {
      kind: 'function',
      title: '造对象时发生了什么',
      description: '调用 Employee(...) 时，Python 悄悄帮你做了两件事。',
      calls: [
        { name: 'Employee(...)', args: 'name=张三, dept=财务, salary=8000', returns: '一个新对象 zhang' },
        { name: '__init__(self, ...)', args: 'self=zhang 自己（自动传入）', returns: '设置 zhang.name / dept / salary' },
        { name: 'zhang.introduce()', args: 'self 自动传入，无需手写', returns: '输出：我是张三，在财务部门' },
      ],
    },
    compare: [
      { conceptA: '属性', conceptB: '方法', diff: '属性是对象『有什么』（数据，如 name），方法是对象『能做什么』（行为，如 introduce）。访问属性不加括号，调用方法要加括号。', example: 'zhang.name 取出名字；zhang.introduce() 执行自我介绍。' },
    ],
    pitfalls: ['方法定义时漏写 self 参数，调用时会报 TypeError。', '把 self 写成别的名字（如 this）——Python 不规定必须叫 self，但约定俗成，别标新立异。', '调用方法时手动传 self：zhang.introduce(zhang) 是错的，self 会自动传入。'],
    sources: [{ book: 'pcc3', chapter: '第9章 类' }],
    prerequisites: ['s5-01'],
    task: '写一个『图书 Book』类，属性有书名和价格，方法 show() 输出图书信息。造两本书，再修改其中一本的价格并输出。',
    exercises: [
      {
        id: 's5-02-q1',
        qtype: 'single',
        stem: '关于 self，下面说法正确的是？',
        options: ['A. 它代表类本身，跟对象无关', 'B. 它代表当前这个对象，定义方法时必须作为第一个参数', 'C. 调用方法时要手动把它传进去', 'D. 它必须写成 this 才有效'],
        answer: 'B',
        explanation: 'self 指向当前对象，是实例方法的第一个参数，调用时由 Python 自动传入，不需要也不应该手动传。',
      },
      {
        id: 's5-02-q2',
        qtype: 'blank',
        stem: '造对象时会自动调用的特殊方法名是 ______（写方法名本身，前后各两个下划线）。',
        answer: '__init__',
        accepted: ['init', '__init__()'],
        explanation: '__init__ 是构造方法，在对象创建后自动执行，通常用来初始化属性。',
      },
      {
        id: 's5-02-q3',
        qtype: 'predict',
        stem: '执行下面代码，最后一行输出什么？\nclass P:\n    def __init__(self, x):\n        self.x = x\np = P(5)\nprint(p.x)',
        keywords: [['5']],
        explanation: 'P(5) 把 5 传给 __init__，存成属性 p.x，所以输出 5。',
      },
    ],
    minutes: 13,
    env: 'browser',
  },
  {
    id: 's5-03',
    stageId: 5,
    order: 3,
    title: '继承与组合',
    subtitle: '站在别人的图纸上改，或者把多个零件拼起来',
    hook: '要造『会叫的狗』和『会喵的猫』，它们都是动物。你是把动物那部分重写两遍，还是让它们共用一份动物图纸？',
    objectives: ['理解继承的 is-a 关系并能写出子类', '理解组合的 has-a 关系', '能根据场景选择继承还是组合'],
    analogy: '继承像『儿子像爸爸』：儿子天生就有一套爸爸的特征，还能再加自己的特长。组合像『组装电脑』：一台电脑由 CPU、内存、硬盘这些零件拼起来，零件各自独立。',
    content: `# 两种复用代码的方式

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

一个实用经验：**继承表达分类，组合表达拼装**。办公系统里，Admin 和 Guest 都继承 User（都是用户）；而一个 Order 订单里包含 Customer 对象和多个 Product 对象——这些是组合关系。能用组合就别硬套继承，代码会更灵活。`,
    examples: [
      {
        title: '办公系统的用户与订单',
        code: 'class User:\n    def __init__(self, name):\n        self.name = name\n\n    def login(self):\n        print(f"{self.name} 登录成功")\n\nclass Admin(User):\n    def delete_user(self):\n        print(f"{self.name} 删除了一个用户")\n\nclass Order:\n    def __init__(self, buyer):\n        self.buyer = buyer   # 组合：订单里有一个用户对象\n\n    def show(self):\n        print(f"订单属于：{self.buyer.name}")\n\na = Admin("王管理员")\na.login()\na.delete_user()\no = Order(a)\no.show()',
        expectedOutput: '王管理员 登录成功\n王管理员 删除了一个用户\n订单属于：王管理员',
        lines: [
          { code: 'class Admin(User):', explain: 'Admin 继承 User，自动拥有 name 属性和 login 方法。' },
          { code: 'def delete_user(self):', explain: '子类可以新增自己特有的方法，不影响父类。' },
          { code: 'self.buyer = buyer', explain: '组合：Order 把传进来的用户对象存成属性，用『订单.买家』的方式访问。' },
        ],
      },
    ],
    compare: [
      { conceptA: '继承 is-a', conceptB: '组合 has-a', diff: '继承是『是一种』，子类自动获得父类能力，关系在写代码时就固定；组合是『有一个』，把别的对象当零件装进来，运行时可替换。', example: 'Admin 是一种 User（继承）；Order 有一个 Customer（组合）。' },
    ],
    pitfalls: ['为了复用几行代码就乱用继承，做出『汽车继承轮胎』这种 is-a 不成立的设计。', '子类重写 __init__ 后忘了调用 super().__init__()，导致父类的属性没有初始化。', '把组合写成复制粘贴属性，而不是保存对方的对象，改了原对象却不同步。'],
    sources: [{ book: 'pcc3', chapter: '第9章 类' }],
    prerequisites: ['s5-01', 's5-02'],
    task: '定义 Person 父类有 sleep() 方法，Student 子类继承它并新增 study() 方法；再定义 School 类，用组合的方式保存一个 Student 对象。',
    exercises: [
      {
        id: 's5-03-q1',
        qtype: 'single',
        stem: '『狗是一种动物』这种关系，最适合用哪种方式实现？',
        options: ['A. 继承', 'B. 组合', 'C. 全局变量', 'D. 列表'],
        answer: 'A',
        explanation: '『是一种』即 is-a 关系，是继承的典型场景；狗是动物的子类，自动获得动物的属性和方法。',
      },
      {
        id: 's5-03-q2',
        qtype: 'boolean',
        stem: '组合关系指的是一个类把另一个类的对象当作自己的属性来使用。',
        answer: '对',
        explanation: '组合就是 has-a 关系：把其他对象『装进来』当零件，如汽车有一个发动机。',
      },
      {
        id: 's5-03-q3',
        qtype: 'predict',
        stem: '执行下面代码最后一行输出什么？\nclass A:\n    def hi(self):\n        return \'A\'\nclass B(A):\n    pass\nb = B()\nprint(b.hi())',
        keywords: [['A']],
        explanation: 'B 继承 A 但没有改写 hi()，所以调用时执行父类的 hi()，返回字符串 A。',
      },
    ],
    minutes: 12,
    env: 'browser',
  },
  {
    id: 's5-04',
    stageId: 5,
    order: 4,
    title: '文件读取与写入',
    subtitle: '让程序记住数据，关掉电脑也不丢',
    hook: '变量里的数据一关程序就没了。想让通讯录、记账本保存下来，就得把数据写进文件里。',
    objectives: ['会用 with open 读写文本文件', '理解读、写、追加三种模式的区别', '知道为什么要指定 utf-8 编码'],
    content: `# 文件读写（需要本地环境）

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

Windows 路径里的反斜杠是转义符，容易出错。推荐用正斜杠，如 \`"D:/学习/日记.txt"\`。`,
    examples: [
      {
        title: '写一个工作日报，再读出来',
        code: 'from pathlib import Path\n\npath = "工作日报.txt"\nlines = ["周一：整理客户名单", "周二：核对报表", "周三：回复邮件"]\n\n# 用追加模式逐行写入\nwith open(path, "a", encoding="utf-8") as f:\n    for line in lines:\n        f.write(line + "\\n")\n\n# 读回来并统计行数\nwith open(path, "r", encoding="utf-8") as f:\n    content = f.read()\n\nprint(content)\nprint("一共", len(content.strip().split("\\n")), "行")',
        expectedOutput: '周一：整理客户名单\n周二：核对报表\n周三：回复邮件\n\n一共 3 行',
        lines: [
          { code: 'with open(path, "a", encoding="utf-8") as f:', explain: 'a 是追加模式，多次运行不会覆盖之前写的内容；with 会自动关闭文件。' },
          { code: 'f.write(line + "\\n")', explain: 'write 不会自动换行，要在末尾手动加换行符 \\n。' },
          { code: 'f.read()', explain: '一次性读出整个文件内容，得到一个字符串。' },
        ],
      },
    ],
    pitfalls: ['用 w 模式打开已有文件，内容被全部清空——写之前确认是不是该用 a。', '忘记写 encoding="utf-8"，中文在 Windows 上读出来是乱码。', '直接用反斜杠写路径，如 "D:\\学习\\a.txt"，反斜杠会被当成转义符，建议改用正斜杠。', '以为浏览器也能跑这些代码——它做不到，这是安全设计，不是bug。'],
    sources: [{ book: 'pcc3', chapter: '第10章 文件和异常' }, { book: 'abs3', chapter: '第10章 读写文件' }],
    prerequisites: ['s5-01', 's5-02'],
    task: '在本地新建一个『待办.txt』，用 a 模式追加三条今天要做的事，再用 r 模式读出来，统计一共有几条。',
    exercises: [
      {
        id: 's5-04-q1',
        qtype: 'single',
        stem: '想保留文件原有内容，只在末尾添加新内容，应该用哪个模式？',
        options: ['A. r', 'B. w', 'C. a', 'D. x'],
        answer: 'C',
        explanation: 'a 是追加模式，在文件末尾写入，不会覆盖原有内容；w 会把原内容全部清空。',
      },
      {
        id: 's5-04-q2',
        qtype: 'blank',
        stem: '为了正确读写中文不出现乱码，open() 里通常要加上参数 encoding=______。',
        answer: 'utf-8',
        accepted: ['"utf-8"', 'UTF-8', 'utf8'],
        explanation: 'utf-8 是通用的字符编码，明确指定后能避免 Windows 默认编码带来的中文乱码。',
      },
      {
        id: 's5-04-q3',
        qtype: 'debug',
        stem: '同学想往『笔记.txt』追加一句话，写了 with open(\'笔记.txt\', \'w\') as f: f.write(\'新内容\')，结果原来的内容全没了。问题出在哪？',
        keywords: [['w', '覆盖'], ['a', '追加']],
        explanation: 'w 模式会先清空文件再写入，应该用 a 模式追加；另外还应加上 encoding="utf-8"。',
      },
    ],
    minutes: 14,
    env: 'local',
  },
  {
    id: 's5-05',
    stageId: 5,
    order: 5,
    title: 'JSON 数据与异常处理',
    subtitle: '让程序读懂网络数据，也学会不掉链子',
    hook: '网页接口给你的数据长得像字典，却不能直接当字典用；用户输入一个字母你就想算数，程序当场崩溃。这一课一次解决这两个问题。',
    objectives: ['会用 json 模块在字符串和 Python 对象间转换', '理解 JSON 与字典的差别', '能用 try-except 捕获并处理常见异常'],
    analogy: 'JSON 像国际通用的集装箱：不管对方用什么语言，把数据装进这个箱子就能互相运输。try-except 则像安全气囊：万一撞车（出错），不至于车毁人亡（程序崩溃）。',
    content: `# JSON 与异常处理（浏览器可运行）

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

真实场景：解析接口返回的 JSON 时，用 try-except 包住，就算对方返回了坏数据，你的程序也不会崩掉，而是提示『数据格式异常』。`,
    examples: [
      {
        title: '解析接口数据 + 安全的数字输入',
        code: 'import json\n\n# 模拟接口返回的一串 JSON 文本\nraw = \'{"user": "李四", "score": 88, "vip": true}\'\n\ntry:\n    data = json.loads(raw)\n    score = int(data["score"])\n    print(f"用户：{data[\'user\']}，得分：{score}")\nexcept json.JSONDecodeError:\n    print("数据不是合法的 JSON")\nexcept KeyError as e:\n    print(f"缺少字段：{e}")\nfinally:\n    print("解析流程结束")\n\n# 安全的输入转换\ndef to_number(text):\n    try:\n        return int(text)\n    except ValueError:\n        return 0\n\nprint("结果1：", to_number("12"))\nprint("结果2：", to_number("abc"))',
        expectedOutput: '用户：李四，得分：88\n解析流程结束\n结果1： 12\n结果2： 0',
        lines: [
          { code: 'json.loads(raw)', explain: '把 JSON 格式的文本转换成 Python 字典，之后就能用 data["user"] 取值。' },
          { code: 'except json.JSONDecodeError:', explain: '专门捕获 JSON 格式错误；可以写多个 except 分别处理不同异常。' },
          { code: 'return 0', explain: '转换失败时返回一个安全的默认值，让程序继续运行而不是崩溃。' },
        ],
      },
    ],
    compare: [
      { conceptA: 'json.loads()', conceptB: 'json.dumps()', diff: 'loads 把 JSON 字符串变成 Python 对象（解码，读进来）；dumps 把 Python 对象变成 JSON 字符串（编码，发出去）。', example: '收到网络数据用 loads，发送数据时用 dumps。' },
    ],
    pitfalls: ['JSON 里用了单引号或尾随逗号——JSON 只认英文双引号，格式必须严格。', '把 json.loads() 当成 json.load()：前者处理字符串，后者处理打开文件对象。', '写一个大 try 把整段代码都包起来，出错时根本不知道是哪一句——try 范围要尽量小。', 'except 后面不写异常类型，把真正的 bug 也悄悄吞掉了，排查起来更痛苦。'],
    sources: [
      { book: 'pcc3', chapter: '第10章 文件和异常' },
      { book: 'abs3', chapter: '第10章 读写文件' },
      { book: 'abs3', chapter: '第4章 4.8节异常处理' },
      { book: 'abs3', chapter: '第5章 调试' },
    ],
    prerequisites: ['s5-04', 's2-07'],
    task: '写一个函数 read_score(text)，接收一段 JSON 文本，尝试解析出里面的 score 字段并转成整数；解析或转换失败时返回 0，并打印友好提示。',
    exercises: [
      {
        id: 's5-05-q1',
        qtype: 'single',
        stem: '想把一段 JSON 格式的文本转换成 Python 字典，应该用哪个函数？',
        options: ['A. json.dumps()', 'B. json.loads()', 'C. str()', 'D. int()'],
        answer: 'B',
        explanation: 'json.loads() 把 JSON 字符串解码成 Python 对象；dumps() 是反过来，把 Python 对象编码成 JSON 字符串。',
      },
      {
        id: 's5-05-q2',
        qtype: 'predict',
        stem: '执行下面代码输出什么？\nimport json\nd = json.loads(\'[1, 2, 3]\')\nprint(type(d).__name__)',
        keywords: [['list']],
        explanation: 'json.loads() 把 JSON 数组转换成 Python 列表，所以类型名是 list。另外 JSON 的 true/false/null 会分别变成 Python 的 True/False/None。',
      },
      {
        id: 's5-05-q3',
        qtype: 'debug',
        stem: '下面代码想处理除以零，却没有捕获到错误，问题在哪？\ntry:\n    x = 1 / 0\nexcept ValueError:\n    print(\'出错了\')',
        keywords: [['ZeroDivisionError'], ['except', '类型']],
        explanation: '1 / 0 抛出的是 ZeroDivisionError，不是 ValueError，所以没被捕获；应把 except 的类型改成 ZeroDivisionError。',
      },
    ],
    minutes: 14,
    env: 'browser',
  },
]
