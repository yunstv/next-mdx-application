import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Components", href: "/sampling/docs/components/accordion" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-[--gray-a4] bg-[--color-background]/80 px-6 backdrop-blur">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm font-bold text-[--gray-12]"
      >
        yunstv
      </Link>

      <nav className="mx-auto flex items-center gap-1 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1 font-medium text-[--gray-12] transition-colors hover:bg-[--gray-a3]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-8 w-8 items-center justify-center rounded text-[--gray-12] hover:bg-[--gray-a3]"
        >
          <GitHubLogoIcon width="16" height="16" />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
