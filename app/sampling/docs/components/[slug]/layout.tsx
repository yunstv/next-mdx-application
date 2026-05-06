import { QuickNav } from "@comps/quick-nav";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="flex">
      <main className="min-w-0 flex-1 px-8 py-8">{children}</main>
      <QuickNav slug={slug} />
    </div>
  );
}
