"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarSection } from "./types";

export function SidebarNavClient({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => i.name.toLowerCase().includes(q)),
      }))
      .filter((s) => s.items.length > 0);
  }, [sections, query]);

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-[--gray-a4] py-6 pl-6 pr-4 md:block">
      <div className="mb-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full rounded-md border border-[--gray-a5] bg-[--color-panel-solid] px-3 py-1.5 text-sm text-[--gray-12] placeholder:text-[--gray-9] focus:border-[--accent-8] focus:outline-none"
        />
      </div>
      <nav>
        {filtered.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[--gray-12]">
              {section.title}
            </div>
            <ul className="flex flex-col">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-full px-3 py-1.5 text-sm capitalize transition-colors ${
                        isActive
                          ? "bg-[--accent-a4] font-medium text-[--accent-11]"
                          : "text-[--gray-12] hover:bg-[--gray-a3]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {filtered.length === 0 ? (
          <div className="px-2 text-sm text-[--gray-9]">No matches</div>
        ) : null}
      </nav>
    </aside>
  );
}
