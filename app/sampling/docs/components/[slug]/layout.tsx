import { QuickNav } from "@comps/quick-nav";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className="flex">
      <main className="min-w-0 flex-1 px-8 py-8">{children}</main>
      <QuickNav slug={params.slug} />
    </div>
  );
}
