# Project architecture

[简体中文](./ARCHITECTURE.md) | **English**

> A human-readable runbook for the project: how source MDX gets compiled, routed, and rendered — the whole pipeline, end to end.

This project is a component documentation site built on **Next.js 16 (App Router)**. It uses MDX as the content source, Radix UI as the component scaffold, and ships side-by-side **CSS / Stitches / Tailwind** demos for every component.

---

## 1. Directory cheat sheet

```text
yunstv.github.io/
├── app/                           # Next.js App Router tree (page entry points)
│   ├── layout.tsx                 # Global HTML shell (fonts, global CSS, Radix Theme styles)
│   ├── template.tsx               # Global Providers (next-themes, CssLibPreference)
│   ├── page.tsx                   # Home page /
│   ├── sampling/
│   │   ├── layout.tsx             # Docs site shell (Header + Sidebar + content area)
│   │   ├── loading.tsx
│   │   └── docs/components/[slug]/
│   │       ├── layout.tsx         # Single-component shell (content + right-side QuickNav)
│   │       ├── page.tsx           # Single-component page (loads MDX by slug)
│   │       └── loading.tsx
│   └── preview-code/[slug]/       # Legacy preview page (kept for reference)
│
├── data/                          # MDX content sources (organized as [module]/[version].mdx)
│   └── sampling/docs/components/
│       ├── accordion/0.0.1.mdx
│       └── progress/0.0.1.mdx
│
├── components/
│   ├── basic/                     # Site-level UI (@comps)
│   │   ├── site-header/           # Top bar (Logo / Nav / ThemeToggle)
│   │   ├── sidebar-nav/           # Left-side component index (auto-scanned from data/)
│   │   ├── quick-nav/             # Right-side anchor index (parses MDX h2/h3)
│   │   ├── mdx-components/        # MDX tag → React component mapping table
│   │   ├── code-block-root/       # Code-block atomic components (Root/Pre/Code/CopyButton)
│   │   ├── hero-code-block/       # Multi-cssLib tabbed code preview
│   │   ├── hero-container/        # Demo display container
│   │   ├── layout/                # Older layout (being phased out)
│   │   └── skeleton/              # Loading / Empty placeholders
│   └── demos/                     # Per-component demo source (HeroCodeBlock reads from here)
│       ├── Accordion/{css,stitches,tailwind}/
│       └── Progress/{css,stitches,tailwind}/
│
├── lib/
│   ├── context/                   # CssLibPreference (user-preferred cssLib, persisted to localStorage)
│   └── utils/                     # Utilities and MDX compilation plugins
│       ├── mdx.ts                 # bundleMDX entry point, version scanning
│       ├── rehype-hero-code-block.ts   # Inject demo source into <HeroCodeBlock folder="X" />
│       ├── rehype-highlight-code.mjs   # Code-block syntax highlighting (refractor)
│       ├── rehype-highlight-line.mjs
│       ├── rehype-highlight-word.mjs
│       └── rehype-meta-attribute.mjs   # Parse meta attributes like ```jsx line=1
│
├── types/css.d.ts                 # *.css module type declarations
├── tsconfig.json                  # Path aliases @utils / @comps / @/
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

### Path aliases (`tsconfig.json`)

| Alias | Resolves to |
|---|---|
| `@/*` | project root |
| `@utils` / `@utils/*` | [lib/utils/](lib/utils/) |
| `@comps` / `@comps/*` | [components/basic/](components/basic/) |

---

## 2. Routes mapped to source files

The project uses the Next.js App Router, so URL paths **mirror** the directory structure under `app/`.

| URL | File | Purpose |
|---|---|---|
| `/` | [app/page.tsx](app/page.tsx) | Home (default template) |
| `/sampling/...` | [app/sampling/layout.tsx](app/sampling/layout.tsx) | Docs second-level layout: injects `<SiteHeader />` + `<SidebarNav />` |
| `/sampling/docs/components/:slug` | [app/sampling/docs/components/[slug]/page.tsx](app/sampling/docs/components/[slug]/page.tsx) | Single-component doc page |
| `/sampling/docs/components/:slug` | [app/sampling/docs/components/[slug]/layout.tsx](app/sampling/docs/components/[slug]/layout.tsx) | Doc-page shell: main content + `<QuickNav slug={slug} />` |
| `/preview-code/:slug` | [app/preview-code/[slug]/page.tsx](app/preview-code/[slug]/page.tsx) | Legacy static preview page (kept) |

### Nested-layout composition order

When you visit `/sampling/docs/components/accordion`, React assembles the tree from the outside in:

```text
<RootLayout>                                  app/layout.tsx
  <Template>                                  app/template.tsx        ← injects ThemeProvider / CssLibPreferenceProvider
    <SamplingLayout>                          app/sampling/layout.tsx ← Radix Theme + SiteHeader + SidebarNav
      <SlugLayout slug="accordion">           app/sampling/docs/components/[slug]/layout.tsx ← main + QuickNav
        <Page slug="accordion" />             app/sampling/docs/components/[slug]/page.tsx
      </SlugLayout>
    </SamplingLayout>
  </Template>
</RootLayout>
```

### How does `[slug]` match an MDX file?

In [app/sampling/docs/components/[slug]/page.tsx:5-16](app/sampling/docs/components/[slug]/page.tsx#L5-L16):

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

Matching logic:

1. The URL `:slug` (e.g. `accordion`) is appended to `data/sampling/docs/components/accordion/`.
2. [getAllVersionsFromPath](lib/utils/mdx.ts#L65-L73) lists every `*.mdx` in that directory (filename **is** the version), sorted with `compareVersions` to **pick the latest**.
3. No version files? Return 404 via `notFound()`.
4. [getMdxBySlug](lib/utils/mdx.ts#L37-L63) reads `data/sampling/docs/components/accordion/0.0.1.mdx` and runs `bundleMDX` to produce executable JS (`code`) plus `frontmatter`.

> **Adding a new component doc**: drop a file at `data/sampling/docs/components/<name>/<version>.mdx` — the route appears automatically and [SidebarNav](components/basic/sidebar-nav/SidebarNav.tsx) picks it up.

---

## 3. Source → render: the full data flow

Walking `/sampling/docs/components/progress` end-to-end, from the MDX you wrote to pixels on screen:

```text
┌─────────────────────────────────────────────────────────────────┐
│ 1. Content source                                                │
│    data/sampling/docs/components/progress/0.0.1.mdx              │
│    ─ frontmatter: { metaTitle, name, aria, ... }                 │
│    ─ <HeroContainer><ProgressDemo /></HeroContainer>             │
│    ─ <HeroCodeBlock folder="Progress" />                         │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Server-side compile  (lib/utils/mdx.ts → bundleMDX)           │
│    remark plugins: remark-slug                                   │
│    rehype plugins:                                               │
│      ├─ rehype-hero-code-block  ← expands <HeroCodeBlock         │
│      │                            folder="X" /> into <pre>       │
│      │                            nodes that read from           │
│      │                            components/demos/X/*           │
│      ├─ rehype-meta-attribute   ← parses ```jsx line=1 etc.      │
│      └─ rehype-highlight-code   ← refractor syntax highlighting  │
│    output: { code: string, frontmatter: object }                 │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Client runtime (components/basic/mdx-components/mdx.tsx)      │
│    getMDXComponent(code) → React component                       │
│    `components` mapping rewrites MDX tags → custom components:   │
│      h1/h2/h3   → Radix Heading (with scrollMarginTop / id)      │
│      a          → Radix Link                                     │
│      pre        → CodeBlock.Root + CopyButton                    │
│      HeroContainer / HeroCodeBlock / *Demo → custom              │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Page-shell composition (nested layouts)                       │
│    SiteHeader (top bar + ThemeToggle)                            │
│    SidebarNav (left index, scans data/ on the server)            │
│    Content area = the React tree from step 3                     │
│    QuickNav (right anchors, server-parses ## / ### in MDX)       │
└─────────────────────────────────────────────────────────────────┘
```

### Key wiring points

| Chain | From | To | Through |
|---|---|---|---|
| MDX tag → React component | `<HeroContainer />` etc. | `components` map at [components/basic/mdx-components/mdx.tsx:23-135](components/basic/mdx-components/mdx.tsx#L23-L135) | `getMDXComponent(code)` |
| `<HeroCodeBlock folder="X" />` → multi-flavor source tabs | JSX tag in MDX | Tabs of code in client `<HeroCodeBlock>` | [rehype-hero-code-block.ts](lib/utils/rehype-hero-code-block.ts) injects `<pre>` at compile time |
| URL `/sampling/docs/components/:slug` → MDX file | route param `slug` | `data/sampling/docs/components/<slug>/<latestVersion>.mdx` | [getAllVersionsFromPath](lib/utils/mdx.ts#L65) + [getMdxBySlug](lib/utils/mdx.ts#L37) |
| MDX heading → right-side QuickNav | `## / ###` in MDX source | `<aside>` anchor list | [QuickNav](components/basic/quick-nav/QuickNav.tsx) does `fs.readFileSync` and parses |
| `data/` directory → left-side SidebarNav | Subdirectories of `data/sampling/docs/components/*` | Sidebar links | [SidebarNav](components/basic/sidebar-nav/SidebarNav.tsx) uses `readdirSync` |
| Demo `cssLib` preference → active tab | Header switcher / `localStorage` | Which group `<HeroCodeBlock>` shows | [CssLibPreferenceContext](lib/context/CssLibPreference.tsx) |

---

## 4. The `<HeroCodeBlock>` three-flavor mechanism (key feature)

The most interesting trick in the project: a single line `<HeroCodeBlock folder="Progress" />` in MDX renders three tabs of source code.

### 4.1 Compile time: rehype plugin "injects child nodes"

[lib/utils/rehype-hero-code-block.ts](lib/utils/rehype-hero-code-block.ts) walks the MDX AST during compile:

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

Result: a "hollow" `<HeroCodeBlock folder="Progress" />` becomes:

```jsx
<HeroCodeBlock folder="Progress">
  <pre cssLib="css"      title="index.jsx"          source={...}>...</pre>
  <pre cssLib="css"      title="styles.css"         source={...}>...</pre>
  <pre cssLib="stitches" title="index.jsx"          source={...}>...</pre>
  <pre cssLib="tailwind" title="index.jsx"          source={...}>...</pre>
  <pre cssLib="tailwind" title="tailwind.config.js" source={...}>...</pre>
</HeroCodeBlock>
```

> The plugin's recognized filenames are hardcoded: `index.jsx` / `styles.css` / `tailwind.config.js`. New demos auto-register as long as they follow the naming convention.

### 4.2 Runtime: client filters tabs by `cssLib`

[components/basic/hero-code-block/HeroCodeBlock.tsx:25-46](components/basic/hero-code-block/HeroCodeBlock.tsx#L25-L46):

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

- The user's preferred `cssLib` lives in [CssLibPreferenceContext](lib/context/CssLibPreference.tsx) (persisted under `localStorage` key `@radix-ui/css-lib`).
- Only the `<pre>` tags whose `cssLib` matches the active preference are shown as tabs.
- Switching cssLib swaps the entire tab group — no recompile needed.

### 4.3 Side-by-side with the live demo

```text
MDX:        <HeroContainer><ProgressDemo /></HeroContainer>     ← interactive demo
            <HeroCodeBlock folder="Progress" />                  ← source code

ProgressDemo's actual source:
  components/demos/index.jsx
    export { default as ProgressDemo } from './Progress/stitches';
                                                  ↑
              The default-exported "live demo" uses the stitches version;
              all three flavors (css/stitches/tailwind) are shown in HeroCodeBlock.
```

---

## 5. Auto-discovery for the left/right navigation

### Left-side `SidebarNav` ([components/basic/sidebar-nav/](components/basic/sidebar-nav/))

| File | Responsibility |
|---|---|
| [SidebarNav.tsx](components/basic/sidebar-nav/SidebarNav.tsx) | **Server Component**: `fs.readdirSync('data/sampling/docs/components')` to find every subdirectory containing an mdx file |
| [SidebarNavClient.tsx](components/basic/sidebar-nav/SidebarNavClient.tsx) | **Client Component**: search box, `usePathname()` highlight, filter |
| [types.ts](components/basic/sidebar-nav/types.ts) | Server → Client data contract |

> **Design point**: filesystem reads stay on the server, interaction state stays on the client, the contract is plain props — `fs` never leaks into the browser bundle.

### Right-side `QuickNav` ([components/basic/quick-nav/QuickNav.tsx](components/basic/quick-nav/QuickNav.tsx))

It's a Server Component that **reads the raw mdx string** rather than the rendered DOM:

```ts
const source = fs.readFileSync(filePath, "utf8");
const headings = extractHeadings(source);  // regex match ^(#{2,3})\s+(.+)
```

The `## / ###` headings are turned into anchor `id`s with `slugify` — these match the actual DOM `id`s emitted by the [`h2/h3` config in mdx.tsx](components/basic/mdx-components/mdx.tsx#L31-L57) plus [`remark-slug`](lib/utils/mdx.ts#L45), so clicks scroll to the right place.

---

## 6. Tech stack notes & examples

### 6.1 Next.js App Router

- **Routing**: file is the route (`app/.../page.tsx` → URL).
- **Nested layouts**: `layout.tsx` wraps every `page.tsx` at its level and below.
- **Server / Client boundary**: Server Component by default; add `"use client"` to files that use state, events, or `useState/useEffect`.
- **`template.tsx`**: similar to `layout.tsx`, but remounts on every navigation — perfect for Providers that should reset state. The project uses it to wrap `ThemeProvider` and `CssLibPreferenceProvider` ([app/template.tsx](app/template.tsx)).

### 6.2 MDX compilation (`mdx-bundler`)

[lib/utils/mdx.ts:37-63](lib/utils/mdx.ts#L37-L63):

```ts
const { frontmatter, code } = await bundleMDX({
  source,
  mdxOptions(options) {
    options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkSlug];
    options.rehypePlugins = [
      ...(options.rehypePlugins ?? []),
      rehypeHeroCodeBlock,    // custom: inject demo source
      rehypeMetaAttribute,    // parse ```jsx line=1
      rehypeHighlightCode,    // highlight via refractor
    ];
    return options;
  },
});
```

| Plugin | Job |
|---|---|
| `remark-slug` | Adds `id` to headings (matches QuickNav's anchors) |
| `rehype-hero-code-block` | Expands `<HeroCodeBlock folder="X" />` into multiple `<pre>` |
| `rehype-meta-attribute` | Maps the `line=2-4` part of ` ```jsx line=2-4 ` onto `code.properties.line` |
| `rehype-highlight-code` | Tokenizes via `refractor`, then hands off to [highlightLine](lib/utils/rehype-highlight-line.mjs) / [highlightWord](lib/utils/rehype-highlight-word.mjs) |

### 6.3 Theme switching (`next-themes` + Radix Themes)

- [app/template.tsx](app/template.tsx) uses `<ThemeProvider attribute="class" value={{ light: "light-theme", dark: "dark-theme" }}>` to write the theme as a `class` on `<html>`.
- The `mounted` flag in [ThemeToggle](components/basic/site-header/ThemeToggle.tsx) prevents SSR/CSR mismatch: it always renders `MoonIcon` until mounted, then switches to the real theme.
- [SamplingLayout](app/sampling/layout.tsx) wraps everything in a Radix `<Theme accentColor="blue" grayColor="slate">`, which exposes `--accent-*` / `--gray-*` CSS variables — every custom component pulls colors from these (grep for `--accent-` / `--gray-`).

### 6.4 Three CSS implementations side by side (using `Progress`)

| Implementation | Files | Style |
|---|---|---|
| Plain CSS | [components/demos/Progress/css/index.jsx](components/demos/Progress/css/index.jsx) + [styles.css](components/demos/Progress/css/styles.css) | className + sibling css file |
| Stitches | [components/demos/Progress/stitches/index.jsx](components/demos/Progress/stitches/index.jsx) | `styled(Progress.Root, { ... })` CSS-in-JS |
| Tailwind | [components/demos/Progress/tailwind/index.jsx](components/demos/Progress/tailwind/index.jsx) | utility classes (`bg-black/70 rounded-full ...`) |

The React structure is identical across all three — they all use `<Progress.Root>` / `<Progress.Indicator>` from `@radix-ui/react-progress`. Only the styling layer changes. That contrast is the entire point of this project.

### 6.5 The `CodeBlock.*` code-block component

[components/basic/code-block-root/CodeBlock.tsx](components/basic/code-block-root/CodeBlock.tsx) is a set of **compound components**:

```ts
export const CodeBlock = { Root, Header, Content, Code, Pre, CopyButton };
```

- `CopyButton` finds its own code by climbing the DOM with `event.currentTarget.closest('[data-code-block-content]').querySelector('code').textContent`, then `copy()`s it. One button works for any `<CodeBlock.Content>` regardless of nesting.
- Usage example (mapped onto every ` ```...``` ` block in [mdx-components/mdx.tsx:101-108](components/basic/mdx-components/mdx.tsx#L101-L108)):

```tsx
<CodeBlock.Root className="CodeBlockRoot">
  <CodeBlock.Content className="CodeBlockContent">
    <CodeBlock.Pre className="CodeBlockPre">{children}</CodeBlock.Pre>
    <CodeBlock.CopyButton className="CodeBlockCopyButton" />
  </CodeBlock.Content>
</CodeBlock.Root>
```

---

## 7. Standard flow for adding a new component doc

```bash
# 1. Prepare the three demo flavors (at least one is required)
components/demos/Foo/
  ├── css/index.jsx + styles.css
  ├── stitches/index.jsx
  └── tailwind/index.jsx + tailwind.config.js

# 2. Re-export the default demo from components/demos/index.jsx
export { default as FooDemo } from './Foo/stitches';

# 3. Write the MDX
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

# 4. That's it — no route registration:
#    URL          /sampling/docs/components/foo
#    Sidebar       SidebarNav auto-shows "foo"
#    In-page TOC   QuickNav auto-lists ## / ### headings
#    Code tabs     HeroCodeBlock auto-switches between three flavors
```

> Adding a new version later? Just drop `0.0.2.mdx` next to it — [getAllVersionsFromPath](lib/utils/mdx.ts#L65) uses `compareVersions` to pick the latest.

---

## 8. Local development

```bash
pnpm install        # repo uses pnpm — see .npmrc and pnpm-lock.yaml
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

Main entry points:

- Home: [http://localhost:3000](http://localhost:3000)
- Component docs (default accordion): [http://localhost:3000/sampling/docs/components/accordion](http://localhost:3000/sampling/docs/components/accordion)
- Newly added Progress: [http://localhost:3000/sampling/docs/components/progress](http://localhost:3000/sampling/docs/components/progress)
