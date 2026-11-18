# Python Academy

> 从零开始，掌握编程。一个为完全没有编程基础的人设计的手机优先 Python 交互式学习平台。

## 🌐 线上访问

**https://x13502239474-oss.github.io/python-academy/**

已部署到 GitHub Pages（`gh-pages` 分支），手机浏览器直接打开即可写代码、运行 Python。iPhone 用 Safari 打开后「添加到主屏幕」可当 App 用。

## 项目简介

这不是电子书阅读器，也不是静态教程站。它把两本经典教材融合成一套循序渐进的课程体系，并配有一个**能真正运行 Python 的手机端代码实验室**。用户每学一个知识点，就能立刻写代码、运行、看结果。

- **课程体系**：8 个阶段、40+ 节课，从"什么是编程"到独立开发完整项目
- **手机代码实验室**：基于 Pyodide，浏览器里真实运行 Python，无需安装
- **互动教学**：生活化比喻 + 可运行示例 + 逐行讲解 + 编程思维可视化
- **练习与错题本**：8 种题型，自动判题，间隔复习，本地持久化
- **知识地图**：按依赖关系连接知识点，可点击跳转
- **本地优先**：全部数据存在浏览器（IndexedDB + LocalStorage），无需注册登录

## 技术栈

React 18 + TypeScript + Vite 6 + Tailwind CSS 3 + Lucide Icons + Pyodide（Web Worker）+ IndexedDB + vite-plugin-pwa。

## 本地运行

```bash
npm install
npm run dev
```

打开终端里显示的地址（默认 http://localhost:5173）。

```bash
npm run build     # 生产构建（自动本地化 Pyodide 运行时）
npm run preview   # 预览构建结果
npm test          # 运行判题引擎单元测试（19 项）
```

验证脚本（需本机有 Chrome）：

```bash
node scripts/validate-courses.mjs   # 课程/题库结构一致性校验
npm run dev                         # 另开终端启动后，再运行下面的 E2E
node scripts/e2e.mjs                # 端到端测试（含 Pyodide 真实运行、进度持久化）
# 若测试 preview 构建：E2E_BASE=http://127.0.0.1:4173/ node scripts/e2e.mjs
```

## 双模式说明（重要）

Python 的完整开发环境在手机浏览器里有限制，本项目诚实采用双模式：

| 模式 | 设备 | 能做什么 | 哪些课适用 |
|---|---|---|---|
| **学习模式** | 手机浏览器（Pyodide） | 基础语法、变量、循环、函数、类、标准库、JSON 等 | 课程卡片标 📱 的课 |
| **实战模式** | Windows + VS Code 本地环境 | 文件整理、批量重命名、Excel、PDF、图片、网页抓取、Web 应用 | 课程卡片标 🖥️ 的课 |

- 浏览器端通过 Pyodide 运行 Python 标准库，有 5 秒执行保护防止死循环，不支持 `input()` 和本地文件读写。
- 需要本地环境的课程，正文开头会给出第三方库安装命令（如 `pip install openpyxl`）和完整配置说明。
- **Pyodide 运行时（约 14MB）本地托管在 `public/pyodide/`，不依赖外部 CDN**。`npm run build` / `npm run dev` 时会自动从 npm 包复制。Service Worker 会缓存运行时，首次加载后离线也能写代码。

### 本地 Python 环境搭建（实战模式）

1. 到 `python.org/downloads` 下载并安装 Python 3.11+，**勾选 "Add Python to PATH"**
2. 命令行验证：`python --version`
3. 安装 VS Code（`code.visualstudio.com`）及微软官方 Python 扩展
4. 新建 `hello.py`，写入 `print("你好")`，右键"在终端中运行 Python 文件"

## 数据来源与版权

课程内容参考以下两本书，但全部用自己的语言重新组织，标注了来源章节方便回原书查阅，未大段复制原文：

1. 《Python编程：从入门到实践》第 3 版（Eric Matthes，人民邮电出版社）
2. 《Python编程快速上手：让繁琐工作自动化》第 3 版（Al Sweigart）

两本书的完整目录已提取到 `docs/source-*-toc.md`，作为"知识点→来源章节"标注的单一可信源。第三版出版后的新技术放在"新版更新"标注中。

## 部署到 GitHub Pages

本项目使用 HashRouter，天然兼容 GitHub Pages，无需服务器 rewrite。提供两种部署方式。

### 方式 A：gh-pages 分支静态部署（本项目已采用，最简单）

适合只有 `repo` 权限的 Personal Access Token，不依赖 GitHub Actions。

```bash
# 1. 以仓库名为 base 构建（项目站点路径）
MSYS_NO_PATHCONV=1 VITE_BASE=/python-academy/ npm run build
# 2. 把 dist/ 内容单独推到 gh-pages 分支（含自动生成的 .nojekyll）
# 3. 仓库 Settings → Pages → Source 选 gh-pages 分支 / (root)
```

源码放 `main` 分支，构建产物放 `gh-pages` 分支，互不干扰。

**本机 git 协议经代理不通时**，可用 REST API 部署脚本（纯 `api.github.com`，不需要 git push / workflow 权限）：

```bash
GITHUB_TOKEN=ghp_xxx node scripts/deploy-api.mjs
# 该脚本自动把源码推到 main、dist 推到 gh-pages
```

> ⚠️ **Windows / Git Bash 用户注意**：`VITE_BASE=/python-academy/` 在 Git Bash(MSYS) 里会被自动转成 Windows 绝对路径，导致构建出的 HTML 资源路径错误、线上白屏。务必加 `MSYS_NO_PATHCONV=1`（`vite.config.ts` 里也做了兜底纠正）。

### 方式 B：GitHub Actions 自动部署（需 workflow 权限）

Token 需带 `workflow` scope 才能推送 `.github/workflows/deploy.yml`。

1. 把本项目推送到 `main` 分支
2. 仓库 Settings → Pages → Build and deployment，Source 选 **GitHub Actions**
3. 在 Settings → Secrets and variables → Actions → Variables 新建变量 `VITE_BASE`：
   - 项目站点 `https://用户名.github.io/python-academy/` → 填 `/python-academy/`
   - 自定义域名（CNAME）→ 填 `/`
4. 推送后 workflow 自动构建并部署

> 无论哪种方式，子路径部署都必须设置 `VITE_BASE`，否则 JS/CSS/Pyodide 资源会 404。用自定义域名时，在 `public/` 下放一个无扩展名的 `CNAME` 文件，内容为域名。

## 添加到 iPhone 主屏幕

1. 用 Safari 打开部署后的网址
2. 点底部分享按钮 → 「添加到主屏幕」
3. 之后可像 App 一样全屏打开，离线也能学习已缓存的内容

## 数据与隐私

所有学习数据只存在你自己的浏览器里，不上传任何服务器。可在「我的 → 设置」导出 JSON 备份、调整每日目标或清空数据。清理浏览器数据或更换设备会丢失进度，建议定期导出备份。

## 项目结构

```
python-academy/
├── public/                  # PWA 图标、favicon
├── src/
│   ├── components/
│   │   ├── layout/          # 应用外壳（底部导航/侧栏）
│   │   ├── editor/          # 手机端代码编辑器
│   │   ├── teaching/        # 教学组件（练习卡、可视化）
│   │   └── ui/              # 通用 UI（进度环、Markdown、图标）
│   ├── data/
│   │   ├── courses/         # 8 个阶段的课程内容（s1~s8.ts）
│   │   ├── index.ts         # 课程聚合 + 题库展开
│   │   ├── stages.ts        # 阶段定义
│   │   └── knowledgeMap.ts  # 知识地图依赖图
│   ├── lib/                 # 语法高亮、判题引擎（含单测）
│   ├── pages/               # 首页/课程/详情/练习/地图/实验室/我的
│   ├── store/               # IndexedDB 持久化 + 全局状态
│   ├── types/               # 领域模型（课程/题目/进度）
│   └── workers/             # Pyodide Web Worker
├── docs/                    # 两本教材目录（来源溯源）
└── .github/workflows/       # GitHub Pages 自动部署
```
