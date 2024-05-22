import { MainLayout } from "@comps/layout";
import type { Metadata, ResolvingMetadata } from "next";
import { Theme } from "@radix-ui/themes";

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
      <div className="min-h-screen w-full bg-gray5">
        <MainLayout>{children}</MainLayout>
      </div>
    </Theme>
  );
}
