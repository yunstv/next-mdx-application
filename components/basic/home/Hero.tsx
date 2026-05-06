import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(circle_at_50%_-15%,var(--accent-a5),transparent_60%)]"
      />
      <div className="mx-auto max-w-[920px] px-6 pb-24 pt-24 text-center md:pb-32 md:pt-32">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[--accent-11]">
          Open source · MDX · Radix UI
        </p>
        <h1 className="mb-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[--gray-12] md:text-6xl">
          Documentation, the way it should be.
        </h1>
        <p className="mx-auto mb-10 max-w-[640px] text-balance text-lg text-[--gray-11] md:text-xl">
          Build high-quality, accessible MDX component docs with first-class
          syntax highlighting, navigation, and live code examples — out of the
          box.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="3" highContrast>
            <Link href="/sampling/docs/components/accordion">
              Browse components <ArrowRightIcon />
            </Link>
          </Button>
          <Button asChild size="3" variant="soft" color="gray">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
