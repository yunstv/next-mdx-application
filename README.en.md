# yunstv.github.io

[简体中文](./README.md) | **English**

> A component documentation site built on Next.js App Router + MDX. It demonstrates how the same Radix UI primitive can be styled three different ways: **CSS / Stitches / Tailwind**.

Curious how the internals work? Read the [Architecture guide (ARCHITECTURE.en.md)](./ARCHITECTURE.en.md) — it walks the full pipeline from source MDX to compiled JS to routed page to rendered DOM.

---

## Tech stack

### Framework & language

| Category | Choice | Notes |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) | File-based routing, nested layouts, Server / Client component split |
| Language | TypeScript 6 | Path aliases `@/*` `@utils` `@comps` (see [tsconfig.json](./tsconfig.json)) |
| Runtime | React 19 | Latest features that pair with the App Router |
| Package manager | pnpm | `pnpm-lock.yaml` lives at the repo root |

### Content & docs

| Category | Choice | Notes |
|---|---|---|
| Content source | MDX (`*.mdx`) | Docs and live demos live in the same file |
| Compiler | [`mdx-bundler`](https://github.com/kentcdodds/mdx-bundler) | Server-side `bundleMDX` emits an executable JS string |
| Markdown plugins | `remark-slug`, `rehype-slug` | Auto-generate heading `id`s for the right-hand QuickNav |
| Custom rehype plugin | `rehype-hero-code-block` | Expands a single `<HeroCodeBlock folder="X" />` into multi-language source tabs at build time |
| Syntax highlighting | `refractor` + custom line/word plugins | Supports meta attributes like ` ```jsx line=2-4 ` |

### UI & styling

| Category | Choice | Notes |
|---|---|---|
| Component primitives | [Radix UI Primitives](https://www.radix-ui.com/primitives) | accordion / dialog / popover / progress / slider / switch / tabs … |
| Theme tokens | [Radix Themes](https://www.radix-ui.com/themes) | `--accent-*` / `--gray-*` CSS variables drive the palette |
| Theme switcher | [`next-themes`](https://github.com/pacocoursey/next-themes) | Writes a `class` on `<html>` to avoid SSR/CSR flicker |
| Styling option 1 | Plain CSS modules | className + sibling `styles.css` |
| Styling option 2 | [Stitches](https://stitches.dev/) | CSS-in-JS with first-class variants |
| Styling option 3 | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first, paired with `@tailwindcss/postcss` |
| className helpers | `clsx`, `classnames`, `tailwind-merge` | className composition |

### Engineering

| Category | Choice |
|---|---|
| Lint | ESLint 9 + `eslint-config-next` |
| Build | Next.js built-in (`pnpm build`) |
| Deploy | GitHub Pages (auto-triggered on push to `dev`) |

---

## Quick start

```bash
pnpm install        # pnpm recommended
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm lint
```

Main entry points:

- Home: [http://localhost:3000](http://localhost:3000)
- Component docs (defaults to accordion): [http://localhost:3000/sampling/docs/components/accordion](http://localhost:3000/sampling/docs/components/accordion)

---

## Project layout (at a glance)

```text
app/                    # Routes (Next.js App Router)
data/                   # MDX sources ([component]/[version].mdx)
components/
  ├── basic/            # Site-level UI components (@comps)
  └── demos/            # Per-component demo source for each styling option
lib/
  ├── context/          # CssLib preference (localStorage)
  └── utils/            # MDX entry point + rehype plugins
```

> The full directory tree, route table, nested-layout composition order, and the `<HeroCodeBlock>` three-flavor mechanism are documented in **[ARCHITECTURE.en.md](./ARCHITECTURE.en.md)**.

---

## Adding a new component doc

```bash
# 1. Write the demo (one to three styling flavors)
components/demos/Foo/{css,stitches,tailwind}/index.jsx

# 2. Re-export the default demo from components/demos/index.jsx
export { default as FooDemo } from './Foo/stitches';

# 3. Write the MDX page
data/sampling/docs/components/foo/0.0.1.mdx

# 4. Route / sidebar / anchors / multi-flavor code tabs — all wired up automatically
```

See [ARCHITECTURE.en.md §7 — Standard flow for adding a component doc](./ARCHITECTURE.en.md#7-standard-flow-for-adding-a-new-component-doc) for the full convention.
