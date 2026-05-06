import { Theme } from "@radix-ui/themes";
import { SiteHeader } from "@comps/site-header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Theme
      accentColor="blue"
      grayColor="slate"
      className="radix-themes-custom-fonts"
    >
      <div className="min-h-screen bg-[--color-background]">
        <SiteHeader />
        {children}
      </div>
    </Theme>
  );
}
