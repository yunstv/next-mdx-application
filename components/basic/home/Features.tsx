import {
  ComponentInstanceIcon,
  LightningBoltIcon,
  ReaderIcon,
  RocketIcon,
  MagicWandIcon,
  StackIcon,
} from "@radix-ui/react-icons";

type IconComponent = typeof ComponentInstanceIcon;

type Feature = {
  icon: IconComponent;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: ComponentInstanceIcon,
    title: "Component-driven MDX",
    description:
      "Author docs in MDX with live React components, hero demos, and switchable css/stitches/tailwind code variants.",
  },
  {
    icon: LightningBoltIcon,
    title: "Server-side syntax highlighting",
    description:
      "Refractor + line/word highlight plugins. Zero client runtime, no flash, perfect SSR fidelity.",
  },
  {
    icon: ReaderIcon,
    title: "Auto-generated navigation",
    description:
      "Sidebar populates from your data folder; right-side Quick nav extracts from MDX headings on the fly.",
  },
  {
    icon: StackIcon,
    title: "Versioned content",
    description:
      "Drop multiple `x.y.z.mdx` files per component — the latest version is always picked, history is preserved.",
  },
  {
    icon: MagicWandIcon,
    title: "Radix Themes built-in",
    description:
      "Polished primitives, dark mode toggle, accent system, and CSS variables ready to compose with Tailwind v4.",
  },
  {
    icon: RocketIcon,
    title: "Next 16 + React 19",
    description:
      "App Router, Turbopack, async dynamic APIs, and a strict TypeScript build pipeline.",
  },
];

export function Features() {
  return (
    <section className="border-t border-[--gray-a4]">
      <div className="mx-auto max-w-[1100px] px-6 py-20 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-[--gray-12] md:text-4xl">
            Why this template?
          </h2>
          <p className="mx-auto max-w-[560px] text-[--gray-11]">
            Everything wired up so you can ship a docs site in minutes — not
            weeks.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-[--gray-a4] bg-[--color-panel-solid] p-6 transition-colors hover:border-[--gray-a6]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[--accent-a3] text-[--accent-11]">
                <Icon width="20" height="20" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-[--gray-12]">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[--gray-11]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
