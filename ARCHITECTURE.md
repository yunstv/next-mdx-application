# 项目架构说明

> 一份「人类能理解」的项目运行手册：源码 → 编译 → 路由 → 渲染结果，全链路如何串起来。

本项目是一个基于 **Next.js 14 (App Router)** 的组件文档站点，采用 MDX 作为内容来源、Radix UI 作为组件骨架，支持 **CSS / Stitches / Tailwind** 三套样式实现的 Demo 切换预览。

---

## 一、项目目录速查

```
yunstv.github.io/
├── app/                           # Next.js App Router 路由树（页面入口）
│   ├── layout.tsx                 # 全局 HTML 壳（字体、全局 CSS、Radix Theme 样式）
│   ├── template.tsx               # 全局 Provider（next-themes、CssLibPreference）
│   ├── page.tsx                   # 首页 /
│   ├── sampling/
│   │   ├── layout.tsx             # docs 站点骨架（Header + Sidebar + 内容区）
│   │   ├── loading.tsx
│   │   └── docs/components/[slug]/
│   │       ├── layout.tsx         # 单组件页骨架（内容 + 右侧 QuickNav）
│   │       ├── page.tsx           # 单组件页（按 slug 加载 MDX）
│   │       └── loading.tsx
│   └── preview-code/[slug]/       # 旧版预览页（保留参考）
│
├── data/                          # MDX 内容源（按 [模块/版本].mdx 组织）
│   └── sampling/docs/components/
│       ├── accordion/0.0.1.mdx
│       └── progress/0.0.1.mdx
│
├── components/
│   ├── basic/                     # 站点级 UI 组件（@comps）
│   │   ├── site-header/           # 顶栏（Logo / 导航 / 主题切换）
│   │   ├── sidebar-nav/           # 左侧组件目录（自动从 data/ 扫描）
│   │   ├── quick-nav/             # 右侧文内锚点目录（解析 MDX h2/h3）
│   │   ├── mdx-components/        # MDX 标签 → React 组件 的映射表
│   │   ├── code-block-root/       # 代码块原子组件（Root/Pre/Code/CopyButton）
│   │   ├── hero-code-block/       # 多 cssLib Tab 切换的代码预览块
│   │   ├── hero-container/        # Demo 展示容器
│   │   ├── layout/                # 旧版布局（已逐步替换）
│   │   └── skeleton/              # Loading / Empty 占位
│   └── demos/                     # 各组件 Demo 源码（HeroCodeBlock 直接读这里）
│       ├── Accordion/{css,stitches,tailwind}/
│       └── Progress/{css,stitches,tailwind}/
│
├── lib/
│   ├── context/                   # CssLibPreference（用户偏好的 cssLib，存 localStorage）
│   └── utils/                     # 工具与 MDX 编译插件
│       ├── mdx.ts                 # bundleMDX 入口、版本扫描
│       ├── rehype-hero-code-block.ts   # 把 <HeroCodeBlock folder="X" /> 注入源码
│       ├── rehype-highlight-code.mjs   # 代码块语法高亮（refractor）
│       ├── rehype-highlight-line.mjs
│       ├── rehype-highlight-word.mjs
│       └── rehype-meta-attribute.mjs   # 解析 ```jsx line=1 这类元属性
│
├── types/css.d.ts                 # *.css 模块的类型声明
├── tsconfig.json                  # 路径别名 @utils / @comps / @/
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

### 路径别名（`tsconfig.json`）

| 别名 | 指向 |
|---|---|
| `@/*` | 项目根 |
| `@utils` / `@utils/*` | [lib/utils/](lib/utils/) |
| `@comps` / `@comps/*` | [components/basic/](components/basic/) |

---

## 二、路由规则与源码对应

项目使用 Next.js App Router，路由路径**等同于** `app/` 下的目录结构。

| URL 路径 | 文件 | 作用 |
|---|---|---|
| `/` | [app/page.tsx](app/page.tsx) | 首页（默认模板） |
| `/sampling/...` | [app/sampling/layout.tsx](app/sampling/layout.tsx) | docs 二级布局：注入 `<SiteHeader />` + `<SidebarNav />` |
| `/sampling/docs/components/:slug` | [app/sampling/docs/components/[slug]/page.tsx](app/sampling/docs/components/[slug]/page.tsx) | 单组件文档页 |
| `/sampling/docs/components/:slug` | [app/sampling/docs/components/[slug]/layout.tsx](app/sampling/docs/components/[slug]/layout.tsx) | 文档页骨架：左主内容 + 右 `<QuickNav slug={slug} />` |
| `/preview-code/:slug` | [app/preview-code/[slug]/page.tsx](app/preview-code/[slug]/page.tsx) | 旧版静态预览页（保留） |

### 嵌套布局的合成顺序

访问 `/sampling/docs/components/accordion` 时，React 树由外向内组装：

```
<RootLayout>                                  app/layout.tsx
  <Template>                                  app/template.tsx        ← 注入 ThemeProvider / CssLibPreferenceProvider
    <SamplingLayout>                          app/sampling/layout.tsx ← Radix Theme + SiteHeader + SidebarNav
      <SlugLayout slug="accordion">           app/sampling/docs/components/[slug]/layout.tsx ← 主区 + QuickNav
        <Page slug="accordion" />             app/sampling/docs/components/[slug]/page.tsx
      </SlugLayout>
    </SamplingLayout>
  </Template>
</RootLayout>
```

### `[slug]` 是怎么匹配 MDX 的？

[app/sampling/docs/components/[slug]/page.tsx:5-16](app/sampling/docs/components/[slug]/page.tsx#L5-L16) 中：

```ts
const COMPONENTS_BASE = "sampling/docs/components";

const versions = getAllVersionsFromPath(`${COMPONENTS_BASE}/${slug}`);
if (versions.length === 0) notFound();
const latestVersion = versions[0];
const { code, frontmatter } = await getMdxBySlug(
  COMPONENTS_BASE,
  `${slug}/${latestVersion}`,
);
```

匹配逻辑：

1. URL 中的 `:slug`（如 `accordion`）→ 拼接到 `data/sampling/docs/components/accordion/`。
2. [getAllVersionsFromPath](lib/utils/mdx.ts#L65-L73) 列出该目录下所有 `*.mdx`（文件名即版本号），用 `compareVersions` 排序后**取最新**。
3. 没有任何版本文件 → `notFound()` 返回 404。
4. [getMdxBySlug](lib/utils/mdx.ts#L37-L63) 读取 `data/sampling/docs/components/accordion/0.0.1.mdx`，调用 `bundleMDX` 编译为可执行的 JS 字符串 `code` 和 `frontmatter`。

> **新增组件文档**：直接在 `data/sampling/docs/components/<name>/<version>.mdx` 创建文件即可，路由会自动出现，[SidebarNav](components/basic/sidebar-nav/SidebarNav.tsx) 会自动扫描到。

---

## 三、源码 → 渲染结果：完整数据流

以访问 `/sampling/docs/components/progress` 为例，从写下 MDX 到屏幕上看到 Demo 的全链路：

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. 内容来源                                                       │
│    data/sampling/docs/components/progress/0.0.1.mdx              │
│    ─ frontmatter: { metaTitle, name, aria, ... }                 │
│    ─ <HeroContainer><ProgressDemo /></HeroContainer>             │
│    ─ <HeroCodeBlock folder="Progress" />                         │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. 服务端编译  (lib/utils/mdx.ts → bundleMDX)                    │
│    remark plugins: remark-slug                                   │
│    rehype plugins:                                               │
│      ├─ rehype-hero-code-block  ← 把 <HeroCodeBlock folder="X"/> │
│      │                            扩展为多个 <pre> 节点（读      │
│      │                            components/demos/X/* 里的源码）│
│      ├─ rehype-meta-attribute   ← 解析 ```jsx line=1 等          │
│      └─ rehype-highlight-code   ← refractor 语法高亮             │
│    输出: { code: string, frontmatter: object }                   │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. 客户端运行时 (components/basic/mdx-components/mdx.tsx)        │
│    getMDXComponent(code) → React 组件                            │
│    通过 components 映射表把 MDX 标签 → 自定义组件：              │
│      h1/h2/h3   → Radix Heading（带 scrollMarginTop / id）       │
│      a          → Radix Link                                     │
│      pre        → CodeBlock.Root + CopyButton                    │
│      HeroContainer / HeroCodeBlock / *Demo → 自定义              │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. 页面壳合成（嵌套 layout）                                      │
│    SiteHeader（顶栏 + ThemeToggle）                              │
│    SidebarNav（左侧目录，server 扫 data/ 目录）                  │
│    内容区 = 上面第 3 步的 React 树                                │
│    QuickNav（右侧锚点，server 解析 MDX 中的 ## / ###）           │
└─────────────────────────────────────────────────────────────────┘
```

### 关键关联点

| 链条 | 起点 | 终点 | 中转 |
|---|---|---|---|
| MDX 标签 → React 组件 | `<HeroContainer />` 等 | [components/basic/mdx-components/mdx.tsx:23-135](components/basic/mdx-components/mdx.tsx#L23-L135) 中的 `components` 映射表 | `getMDXComponent(code)` |
| MDX `<HeroCodeBlock folder="X" />` → 多语言源码 Tab | MDX 中的 JSX 标签 | 客户端 `<HeroCodeBlock>` Tabs 里的代码 | [rehype-hero-code-block.ts](lib/utils/rehype-hero-code-block.ts) 在编译期注入 `<pre>` |
| URL `/sampling/docs/components/:slug` → MDX 文件 | 路由参数 `slug` | `data/sampling/docs/components/<slug>/<latestVersion>.mdx` | [getAllVersionsFromPath](lib/utils/mdx.ts#L65) + [getMdxBySlug](lib/utils/mdx.ts#L37) |
| MDX 标题 → 右侧 QuickNav | MDX 源码中的 `## / ###` | `<aside>` 锚点列表 | [QuickNav](components/basic/quick-nav/QuickNav.tsx) 直接 `fs.readFileSync` 解析 |
| `data/` 目录 → 左侧 SidebarNav | `data/sampling/docs/components/*` 子目录 | 左栏链接 | [SidebarNav](components/basic/sidebar-nav/SidebarNav.tsx) 用 `readdirSync` 扫描 |
| Demo `cssLib` 偏好 → 当前 Tab | Header 中的切换 / `localStorage` | `<HeroCodeBlock>` 显示哪一组 | [CssLibPreferenceContext](lib/context/CssLibPreference.tsx) |

---

## 四、`<HeroCodeBlock>` 三件套机制（重点）

这是项目里最有意思的一段：MDX 里只写一行 `<HeroCodeBlock folder="Progress" />`，最终渲染出三个 Tab 的代码预览。

### 4.1 编译期：rehype 插件「注入子节点」

[lib/utils/rehype-hero-code-block.ts](lib/utils/rehype-hero-code-block.ts) 在 MDX 编译期遍历 AST：

```ts
visit(tree, (node) => {
  if (node.name === "HeroCodeBlock") {
    const folder = getAttribute(node, "folder");      // "Progress"
    SUPPORTED_CSS_LIBS.forEach((lib) => {              // ["css", "stitches", "tailwind"]
      ["index.jsx", "styles.css", "tailwind.config.js"].forEach((file) => {
        const filePath = `components/demos/${folder}/${lib}/${file}`;
        if (fileExists(filePath)) {
          const source = fs.readFileSync(filePath, "utf8");
          node.children.push(mdxElement({
            name: "pre",
            props: { cssLib: lib, title: file, syntax, source },
            children: [mdxElement({ name: "code", ... })],
          }));
        }
      });
    });
  }
});
```

效果：MDX 原本「空心」的 `<HeroCodeBlock folder="Progress" />` 在编译后变成：

```jsx
<HeroCodeBlock folder="Progress">
  <pre cssLib="css"      title="index.jsx"          source={...}>...</pre>
  <pre cssLib="css"      title="styles.css"         source={...}>...</pre>
  <pre cssLib="stitches" title="index.jsx"          source={...}>...</pre>
  <pre cssLib="tailwind" title="index.jsx"          source={...}>...</pre>
  <pre cssLib="tailwind" title="tailwind.config.js" source={...}>...</pre>
</HeroCodeBlock>
```

> 该插件的支持文件名是写死的：`index.jsx` / `styles.css` / `tailwind.config.js`。新增 demo 时遵守这个命名约定即可被自动识别。

### 4.2 运行时：客户端按 `cssLib` 过滤 Tab

[components/basic/hero-code-block/HeroCodeBlock.tsx:25-46](components/basic/hero-code-block/HeroCodeBlock.tsx#L25-L46)：

```ts
const snippets = React.Children.toArray(children).map((pre) => ({
  id: pre.props.title,
  cssLib: pre.props.cssLib,
  children: ...,
}));
const usedCssLib = availableCssLibs.includes(cssLibCandidate)
  ? cssLibCandidate
  : DEFAULT_CSS_LIB;
const currentTabs = snippets.filter(({ cssLib }) => cssLib === usedCssLib);
```

- 用户偏好 `cssLib` 来自 [CssLibPreferenceContext](lib/context/CssLibPreference.tsx)（写在 `localStorage`，key = `@radix-ui/css-lib`）。
- 只渲染**当前 cssLib** 对应的若干 `<pre>` 作为 Tab。
- 切换 cssLib 时整组 Tab 直接换一组，无需重新编译。

### 4.3 与 Demo 实例的对照

```
MDX:        <HeroContainer><ProgressDemo /></HeroContainer>     ← 渲染交互真件
            <HeroCodeBlock folder="Progress" />                  ← 渲染源码

ProgressDemo 的实际来源：
  components/demos/index.jsx
    export { default as ProgressDemo } from './Progress/stitches';
                                                  ↑
              默认导出 stitches 版本作为「演示真件」；
              三个版本（css/stitches/tailwind）的源码同时在 HeroCodeBlock 里展示。
```

---

## 五、左/右导航的「自动发现」机制

### 左侧 `SidebarNav`（[components/basic/sidebar-nav/](components/basic/sidebar-nav/)）

| 文件 | 职责 |
|---|---|
| [SidebarNav.tsx](components/basic/sidebar-nav/SidebarNav.tsx) | **Server Component**：`fs.readdirSync('data/sampling/docs/components')` 扫描所有有 mdx 文件的子目录 |
| [SidebarNavClient.tsx](components/basic/sidebar-nav/SidebarNavClient.tsx) | **Client Component**：负责搜索框、`usePathname()` 高亮、过滤显示 |
| [types.ts](components/basic/sidebar-nav/types.ts) | 服务端 → 客户端的数据契约 |

> **设计要点**：把「文件系统读取」放在 server，把「交互状态」放在 client，通过 props 传递，避免把 `fs` 模块带到浏览器。

### 右侧 `QuickNav`（[components/basic/quick-nav/QuickNav.tsx](components/basic/quick-nav/QuickNav.tsx)）

它是 Server Component，**直接读 mdx 源码字符串**而不是渲染后的 DOM：

```ts
const source = fs.readFileSync(filePath, "utf8");
const headings = extractHeadings(source);  // 正则匹配 ^(#{2,3})\s+(.+)
```

得到 `## / ###` 标题后用 `slugify` 生成锚点 id —— 这与 [mdx.tsx](components/basic/mdx-components/mdx.tsx#L31-L57) 中给 `h2/h3` 配的 `id={id}` + [`remark-slug`](lib/utils/mdx.ts#L45) 生成的实际 DOM id 对齐，点击就能跳转。

---

## 六、技术栈与示例

### 6.1 Next.js App Router

- **路由**：文件即路由（`app/.../page.tsx` → URL）。
- **Layout 嵌套**：`layout.tsx` 包裹同级及更深层的 `page.tsx`。
- **Server / Client 边界**：默认 Server Component；带状态、事件、`useState/useEffect` 的文件加 `"use client"`。
- **`template.tsx`**：与 `layout.tsx` 类似，但每次导航都会重新挂载，适合放需要重置状态的 Provider。本项目用它包 `ThemeProvider` 与 `CssLibPreferenceProvider`（[app/template.tsx](app/template.tsx)）。

### 6.2 MDX 编译（`mdx-bundler`）

[lib/utils/mdx.ts:37-63](lib/utils/mdx.ts#L37-L63)：

```ts
const { frontmatter, code } = await bundleMDX({
  source,
  mdxOptions(options) {
    options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkSlug];
    options.rehypePlugins = [
      ...(options.rehypePlugins ?? []),
      rehypeHeroCodeBlock,    // 自定义：注入 demo 源码
      rehypeMetaAttribute,    // 解析 ```jsx line=1
      rehypeHighlightCode,    // 用 refractor 高亮
    ];
    return options;
  },
});
```

| 插件 | 作用 |
|---|---|
| `remark-slug` | 给标题加 `id`（与 QuickNav 的锚点对齐） |
| `rehype-hero-code-block` | 把 `<HeroCodeBlock folder="X" />` 扩展为多个 `<pre>` |
| `rehype-meta-attribute` | 把 ` ```jsx line=2-4 ` 中的 `line=2-4` 解析到 `code.properties.line` |
| `rehype-highlight-code` | 用 `refractor` 把代码 token 化，再交给 [highlightLine](lib/utils/rehype-highlight-line.mjs) / [highlightWord](lib/utils/rehype-highlight-word.mjs) 加高亮 |

### 6.3 主题切换（`next-themes` + Radix Themes）

- [app/template.tsx](app/template.tsx) 用 `<ThemeProvider attribute="class" value={{ light: "light-theme", dark: "dark-theme" }}>` 把主题作为 `class` 写到 `<html>`。
- [ThemeToggle](components/basic/site-header/ThemeToggle.tsx) 的 `mounted` 状态防止 SSR/CSR 不一致：未挂载前永远显示 `MoonIcon`，挂载后再读真实主题。
- [SamplingLayout](app/sampling/layout.tsx) 外层包 Radix `<Theme accentColor="blue" grayColor="slate">`，它会发出 `--accent-*` / `--gray-*` 等 CSS 变量，所有自定义组件都用这些变量配色（搜索 `--accent-` / `--gray-` 可以看到）。

### 6.4 三种 CSS 实现对比（以 `Progress` 为例）

| 实现 | 文件 | 写法 |
|---|---|---|
| 原生 CSS | [components/demos/Progress/css/index.jsx](components/demos/Progress/css/index.jsx) + [styles.css](components/demos/Progress/css/styles.css) | className + 同目录 css 文件 |
| Stitches | [components/demos/Progress/stitches/index.jsx](components/demos/Progress/stitches/index.jsx) | `styled(Progress.Root, { ... })` CSS-in-JS |
| Tailwind | [components/demos/Progress/tailwind/index.jsx](components/demos/Progress/tailwind/index.jsx) | utility class（`bg-black/70 rounded-full ...`） |

三者的 React 结构一致，都基于 `@radix-ui/react-progress` 的 `<Progress.Root>` / `<Progress.Indicator>`，只换样式层 —— 这正是本项目的核心展示意图。

### 6.5 代码块组件 `CodeBlock.*`

[components/basic/code-block-root/CodeBlock.tsx](components/basic/code-block-root/CodeBlock.tsx) 是一组**复合组件**（compound components）：

```ts
export const CodeBlock = { Root, Header, Content, Code, Pre, CopyButton };
```

- `CopyButton` 通过 `event.currentTarget.closest('[data-code-block-content]').querySelector('code').textContent` 找到当前所在代码块的文本然后 `copy()`，因此一份按钮代码可以服务任意嵌套层级的 `<CodeBlock.Content>`。
- 用法示例（[mdx-components/mdx.tsx](components/basic/mdx-components/mdx.tsx#L101-L108) 中映射给所有 ` ```...``` ` 块）：

```tsx
<CodeBlock.Root className="CodeBlockRoot">
  <CodeBlock.Content className="CodeBlockContent">
    <CodeBlock.Pre className="CodeBlockPre">{children}</CodeBlock.Pre>
    <CodeBlock.CopyButton className="CodeBlockCopyButton" />
  </CodeBlock.Content>
</CodeBlock.Root>
```

---

## 七、新增一个组件文档的标准流程

```bash
# 1. 准备三套 demo 实现（按需，至少给一个）
components/demos/Foo/
  ├── css/index.jsx + styles.css
  ├── stitches/index.jsx
  └── tailwind/index.jsx + tailwind.config.js

# 2. 在 components/demos/index.jsx 里导出默认演示
export { default as FooDemo } from './Foo/stitches';

# 3. 写 MDX 文档
data/sampling/docs/components/foo/0.0.1.mdx
  ---
  metaTitle: Foo
  name: foo
  ---
  # Foo
  <HeroContainer><FooDemo /></HeroContainer>
  <HeroCodeBlock folder="Foo" />
  ## Installation
  ...

# 4. 自动生效 —— 无需注册路由：
#    URL          /sampling/docs/components/foo
#    侧边栏        SidebarNav 自动出现 "foo"
#    页内目录       QuickNav 自动列出 ## / ### 标题
#    代码 Tab      HeroCodeBlock 自动按 cssLib 切换三种源码
```

> 后续添加新版本只需在 `data/.../foo/` 下追加 `0.0.2.mdx`，[getAllVersionsFromPath](lib/utils/mdx.ts#L65) 会用 `compareVersions` 选最新版本展示。

---

## 八、本地开发

```bash
pnpm install        # 项目已切换到 pnpm，根目录有 .npmrc 与 pnpm-lock.yaml
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

主要入口：
- 首页：[http://localhost:3000](http://localhost:3000)
- 组件文档（默认 accordion）：[http://localhost:3000/sampling/docs/components/accordion](http://localhost:3000/sampling/docs/components/accordion)
- 新增的 Progress：[http://localhost:3000/sampling/docs/components/progress](http://localhost:3000/sampling/docs/components/progress)
