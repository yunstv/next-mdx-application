import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { SiteHeader } from "@comps/site-header";
import { SidebarNav } from "@comps/sidebar-nav";

export const metadata: Metadata = {
  title: "docs",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Theme
      accentColor="blue"
      grayColor="slate"
      className="radix-themes-custom-fonts"
    >
      <div className="min-h-screen bg-[--color-background]">
        <SiteHeader />
        <div className="mx-auto flex w-full max-w-[1400px]">
          <SidebarNav />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </Theme>
  );
}
