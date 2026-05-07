import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXComponent, MDXProvider } from "@comps";
import { getAllVersionsFromPath, getMdxBySlug } from "@utils/mdx";

const COMPONENTS_BASE = "sampling/docs/components";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "data", COMPONENTS_BASE);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter(
      (d) => getAllVersionsFromPath(`${COMPONENTS_BASE}/${d.name}`).length > 0
    )
    .map((d) => ({ slug: d.name }));
}

const ComponentsDoc = async ({ slug }: { slug: string }) => {
  const versions = getAllVersionsFromPath(`${COMPONENTS_BASE}/${slug}`);
  if (versions.length === 0) {
    notFound();
  }
  const latestVersion = versions[0];
  const { code, frontmatter } = await getMdxBySlug(
    COMPONENTS_BASE,
    `${slug}/${latestVersion}`
  );

  return (
    <MDXProvider frontmatter={frontmatter}>
      <MDXComponent code={code} frontmatter={frontmatter} />
    </MDXProvider>
  );
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="mt-8 flex flex-col gap-5">
      <ComponentsDoc slug={slug} />
    </div>
  );
}
