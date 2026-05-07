# yunstv.github.io

**简体中文** | [English](./README.en.md)

> 基于 Next.js App Router + MDX 的组件文档站点，演示同一个 Radix UI 组件在 **CSS / Stitches / Tailwind** 三种样式方案下的实现差异。

想了解项目内部如何运转？请阅读 [架构说明 ARCHITECTURE.md](./ARCHITECTURE.md)（含「源码 → 编译 → 路由 → 渲染」的全链路图解）。

---

## 技术栈

### 框架与语言

| 类别 | 选型 | 说明 |
|---|---|---|
| 框架 | [Next.js 16](https://nextjs.org/) (App Router) | 文件即路由、嵌套 layout、Server / Client 组件分层 |
| 语言 | TypeScript 6 | 路径别名 `@/*` `@utils` `@comps`（见 [tsconfig.json](./tsconfig.json)） |
| 运行时 | React 19 | 配合 Next.js App Router 的最新特性 |
| 包管理 | pnpm | 项目根附带 `pnpm-lock.yaml` |

### 内容与文档

| 类别 | 选型 | 说明 |
|---|---|---|
| 内容来源 | MDX (`*.mdx`) | 文档与示例代码同源 |
| 编译器 | [`mdx-bundler`](https://github.com/kentcdodds/mdx-bundler) | 服务端 `bundleMDX` 输出可执行 JS |
| Markdown 插件 | `remark-slug`、`rehype-slug` | 标题自动加 `id`，对接右侧锚点 |
| 自研 rehype 插件 | `rehype-hero-code-block` | 把一行 `<HeroCodeBlock folder="X" />` 在编译期展开为多语言源码 Tab |
| 高亮 | `refractor` + 自研 line/word 插件 | 支持 ` ```jsx line=2-4 ` 这类元属性 |

### UI 与样式

| 类别 | 选型 | 说明 |
|---|---|---|
| 组件骨架 | [Radix UI Primitives](https://www.radix-ui.com/primitives) | accordion / dialog / popover / progress / slider / switch / tabs … |
| 主题与令牌 | [Radix Themes](https://www.radix-ui.com/themes) | 通过 `--accent-*` / `--gray-*` CSS 变量统一配色 |
| 主题切换 | [`next-themes`](https://github.com/pacocoursey/next-themes) | `class` 写到 `<html>`，避免 SSR/CSR 闪烁 |
| 样式方案 1 | 原生 CSS Modules | className + 同目录 `styles.css` |
| 样式方案 2 | [Stitches](https://stitches.dev/) | CSS-in-JS、Variants 友好 |
| 样式方案 3 | [Tailwind CSS 4](https://tailwindcss.com/) | utility-first，配合 `@tailwindcss/postcss` |
| className 工具 | `clsx`、`classnames`、`tailwind-merge` | className 组合 |

### 工程化

| 类别 | 选型 |
|---|---|
| Lint | ESLint 9 + `eslint-config-next` |
| 构建 | Next.js 内置（`pnpm build`） |
| 部署 | GitHub Pages（推 `dev` 分支自动触发） |

---

## 快速开始

```bash
pnpm install        # 推荐 pnpm
pnpm dev            # http://localhost:3000
pnpm build          # 生产构建
pnpm lint
```

主要入口：

- 首页：[http://localhost:3000](http://localhost:3000)
- 组件文档（默认 accordion）：[http://localhost:3000/sampling/docs/components/accordion](http://localhost:3000/sampling/docs/components/accordion)

---

## 项目结构（速览）

```text
app/                    # 路由（Next.js App Router）
data/                   # MDX 内容源（[组件]/[版本].mdx）
components/
  ├── basic/            # 站点级 UI 组件（@comps）
  └── demos/            # 各组件三种样式方案的 Demo 源码
lib/
  ├── context/          # CssLib 偏好（localStorage）
  └── utils/            # MDX 编译入口与 rehype 插件
```

> 完整的目录树、路由表、嵌套 layout 合成顺序、HeroCodeBlock 三件套机制等，请参阅 **[ARCHITECTURE.md](./ARCHITECTURE.md)**。

---

## 新增一个组件文档

```bash
# 1. 写 demo（三种样式实现，至少给一个）
components/demos/Foo/{css,stitches,tailwind}/index.jsx

# 2. 在 components/demos/index.jsx 导出默认演示
export { default as FooDemo } from './Foo/stitches';

# 3. 写 MDX
data/sampling/docs/components/foo/0.0.1.mdx

# 4. 路由 / 侧边栏 / 锚点 / 多语言代码 Tab — 全部自动生效
```

详细约定见 [ARCHITECTURE.md §七 新增一个组件文档的标准流程](./ARCHITECTURE.md#七新增一个组件文档的标准流程)。
