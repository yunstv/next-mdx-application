import { MainLayout } from "@comps/layout";
import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./syntax-highlighting.css";

export const metadata: Metadata = {
  title: "Models",
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
