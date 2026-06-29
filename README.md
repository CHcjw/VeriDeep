# VeriDeep · AI 竞品情报工作台

VeriDeep 是一个面向竞品研究和市场情报分析的 AI 工作台。它把 48 位虚拟专家、多 Agent 编排、真实联网采集、证据可信度评分、报告撰写、质检返工和 Trace 可观测性串成一条 Deep Research 流水线。

核心原则很简单：**无证据不立论**。系统会尽量从真实网页、新闻、官方信息和社媒平台采集证据；如果搜索或抓取失败，会如实标注，而不是编造数据。

## 功能概览

| 能力                 | 说明                                                                       |
| -------------------- | -------------------------------------------------------------------------- |
| 多 Agent 编排        | 48 位虚拟专家按任务自动组队，覆盖决策、策略、行业、职能分析                |
| Deep Research 流水线 | `intake → orchestrator → collect → analyze → write → audit → done` |
| 真实联网采集         | 博查 Bocha 搜索 + 网页正文抓取 + 相关性/乱码过滤                           |
| 证据链报告           | 每条核心结论绑定 evidence id，可在报告页回溯来源                           |
| Trace 可观测         | 记录 Agent Prompt、输出、Token、耗时、决策和引用证据                       |
| 结构化输出           | 功能树、定价模型、用户画像、图表、数据表格                                 |
| 人工介入             | 报告正文支持编辑、划线批注、按批注深化章节                                 |

## 技术栈

前端：React 19、TypeScript、Vite、TailwindCSS、Zustand、React Router、ECharts、D3、Framer Motion

后端：FastAPI、SQLite、SSE、Pydantic、httpx、trafilatura、BeautifulSoup

外部服务：

- 智谱 GLM / BigModel OpenAI 兼容接口：负责规划、分析、写作、质检
- 博查 Bocha Web Search：负责联网搜索和证据发现

## 目录结构

```text
.
├── frontend/              # React + Vite 前端
│   ├── src/
│   │   ├── components/    # 通用组件
│   │   ├── layout/        # AppLayout / VSidebar
│   │   ├── pages/         # 首页、工作台、报告、Trace、专家、仪表盘等
│   │   ├── store/         # Zustand 状态
│   │   ├── lib/           # API 封装
│   │   └── hooks/         # SSE 订阅
│   └── vite.config.ts
├── backend/               # 本地开发后端
│   ├── app/
│   │   ├── core/          # 编排、LLM、搜索、抓取、DB、Trace、指标等
│   │   ├── data/          # 专家数据
│   │   └── main.py        # FastAPI 入口，可被 VSCode 直接运行
│   └── requirements.txt
├── api/                   # Vercel Serverless 后端镜像
├── docs/                  # 架构、部署、Agent 协议等文档
├── requirements.txt       # Vercel Python 运行时依赖
├── package.json           # Vercel 前端构建入口
├── vercel.json
└── LICENSE
```

`backend/` 是本地开发主目录；`api/` 是 Vercel 部署镜像。修改后端业务逻辑时，通常需要同步两边的 `app/core/*`。

## 环境要求

- Python 3.9+
- Node.js 22.x 推荐
- Windows PowerShell、macOS Terminal 或 Linux shell

## 快速开始：Windows

以下命令在项目根目录执行。

### 1. 创建并激活 Python 虚拟环境

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -U pip
python -m pip install -r backend\requirements.txt
```

如果 PowerShell 阻止激活脚本，可先执行：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

### 2. 配置后端环境变量

```powershell
Copy-Item backend\.env.example backend\.env
notepad backend\.env
```

至少填写：

```env
ZHIPU_API_KEY=你的智谱 Key
BOCHA_API_KEY=你的博查 Key
APP_PORT=8010
FRONTEND_ORIGIN=http://localhost:3400
```

注意：智谱和博查都需要有效额度。LLM 可用但证据一直为 0 时，优先检查 `BOCHA_API_KEY` 是否欠费或无额度。

### 3. 启动后端

推荐命令：

```powershell
cd backend
python -m uvicorn app.main:app --reload --port 8010
```

也可以在 VSCode 中直接打开 [backend/app/main.py](./backend/app/main.py)，选择项目虚拟环境解释器后点击运行。该文件现在会自动以 uvicorn 启动后端。

后端地址：

- 健康检查：http://127.0.0.1:8010/health
- LLM 自检：http://127.0.0.1:8010/api/llm/ping
- 搜索自检：http://127.0.0.1:8010/api/search?q=Trae&num=3

### 4. 启动前端

新开一个终端：

```powershell
cd frontend
npm install
npm run dev
```

前端地址：http://localhost:3400

Vite 已把 `/api` 代理到 `http://127.0.0.1:8010`，所以前端和后端端口需要保持一致。

## 快速开始：macOS / Linux

以下命令在项目根目录执行。

### 1. 创建并激活 Python 虚拟环境

```bash
python3 -m venv venv
source venv/bin/activate
python -m pip install -U pip
python -m pip install -r backend/requirements.txt
```

### 2. 配置后端环境变量

```bash
cp backend/.env.example backend/.env
nano backend/.env
```

至少填写：

```env
ZHIPU_API_KEY=你的智谱 Key
BOCHA_API_KEY=你的博查 Key
APP_PORT=8010
FRONTEND_ORIGIN=http://localhost:3400
```

### 3. 启动后端

```bash
cd backend
python -m uvicorn app.main:app --reload --port 8010
```

### 4. 启动前端

新开一个终端：

```bash
cd frontend
npm install
npm run dev
```

前端地址：http://localhost:3400

### 一键启停（macOS / Linux）

项目根目录提供脚本：

```bash
./restart.sh
./stop.sh
```

`restart.sh` 会清理 8010/3400 端口上的旧进程，启动后端和前端，并把日志写入 `.run-logs/`。

## VSCode 启动说明

如果点击运行 `backend/app/main.py` 报错，先检查两件事：

1. VSCode 右下角选择的 Python 解释器是否是本项目的 `venv`。
2. `backend/.env` 是否存在并配置了必要 key。

`main.py` 已兼容直接运行，会自动把 `backend/` 加入 Python 搜索路径并启动：

```text
http://127.0.0.1:8010
```

VSCode 直接运行 `main.py` 时默认使用项目配置端口 8010。若临时需要换端口，可设置 `VERIDEEP_DEV_PORT`。

你仍然可以继续使用更标准的命令：

```bash
cd backend
python -m uvicorn app.main:app --reload --port 8010
```

## 配置项

| 变量                                                     | 说明                                    | 是否必填     |
| -------------------------------------------------------- | --------------------------------------- | ------------ |
| `ZHIPU_API_KEY`                                        | 智谱 BigModel API Key，用于 LLM 调用    | 真实调研必填 |
| `ZHIPU_MODEL`                                          | 默认模型                                | 否           |
| `ZHIPU_MODEL_CORE`                                     | 核心章节模型                            | 否           |
| `ZHIPU_MODEL_AUX`                                      | 辅助章节模型                            | 否           |
| `ZHIPU_MODEL_FAST`                                     | 澄清、分类等轻任务模型                  | 否           |
| `BOCHA_API_KEY`                                        | 博查 Web Search Key，用于联网搜索       | 真实采集必填 |
| `BOCHA_BASE_URL`                                       | 博查 API 地址                           | 否           |
| `DOUYIN_COOKIE` / `BILIBILI_COOKIE` / `XHS_COOKIE` | 平台采集 cookie                         | 按需         |
| `APP_HOST`                                             | 后端监听地址，默认`0.0.0.0`           | 否           |
| `APP_PORT`                                             | 后端端口，默认`8010`                  | 否           |
| `VERIDEEP_DEV_PORT`                                    | 直接运行 `backend/app/main.py` 时的临时端口覆盖 | 否           |
| `FRONTEND_ORIGIN`                                      | 前端地址，默认`http://localhost:3400` | 否           |
| `ENABLE_DEMO_FALLBACK`                                 | 无 key 时是否启用兜底                   | 否           |

## 常见问题

### 1. VSCode 点击运行 `main.py` 报 `No module named app`

旧版本入口不支持脚本方式运行。现在 [backend/app/main.py](./backend/app/main.py) 已补充路径兼容，可以直接点击运行。

如果仍然报错，请确认 VSCode 使用的是项目虚拟环境，而不是系统 Python。

### 2. 终端能跑，VSCode 不能跑

多半是解释器不一致。Windows 下应选择：

```text
<项目目录>\venv\Scripts\python.exe
```

macOS / Linux 下应选择：

```text
<项目目录>/venv/bin/python
```

### 3. 页面一直卡在“证据采集”，证据为 0

先分别检查：

```bash
curl http://127.0.0.1:8010/api/llm/ping
curl "http://127.0.0.1:8010/api/search?q=Trae&num=3"
```

如果 LLM 可用但搜索返回“博查账户余额不足”，需要给博查账户充值或更换有额度的 `BOCHA_API_KEY`。

### 4. 前端请求失败或接口 404

确认后端在 8010 端口：

```bash
curl http://127.0.0.1:8010/health
```

确认前端在 3400 端口：

```bash
cd frontend
npm run dev
```

### 5. 修改后端后，本地和 Vercel 行为不一致

本地运行使用 `backend/`，Vercel 使用 `api/`。修改核心后端逻辑时，需要同步 `backend/app` 和 `api/app`。

## 部署

Vercel 部署已通过 [vercel.json](./vercel.json) 配置：

- 前端构建输出：`frontend/dist`
- `/api/*` 和 `/health` 转发到 `api/index.py`
- 其他路由回退到前端 `index.html`

生产环境请注意：Vercel Serverless 文件系统不适合持久化 SQLite 数据库，正式使用建议替换为托管数据库。

## 安全说明

- 不要提交 `backend/.env`。
- 不要把 API Key、Cookie、Token 写进代码或文档。
- `.gitignore` 已排除 `.env`、数据库文件、日志和本地路径配置。

## 文档

| 文档                                                | 内容                           |
| --------------------------------------------------- | ------------------------------ |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)         | 系统架构、模块划分、数据流     |
| [docs/AGENTS.md](./docs/AGENTS.md)                     | 专家体系、Agent 角色、消息协议 |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)             | 本地与 Vercel 部署说明         |
| [docs/系统升级实施方案.md](./docs/系统升级实施方案.md) | 设计与演进记录                 |
| [CONTRIBUTING.md](./CONTRIBUTING.md)                   | 贡献规范                       |

## 许可证

本项目采用 [AGPL-3.0](./LICENSE) 许可证。
