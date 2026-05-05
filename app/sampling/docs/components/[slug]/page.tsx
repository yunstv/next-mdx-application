import { notFound } from "next/navigation";
import { MDXComponent, MDXProvider } from "@comps";
import { getAllVersionsFromPath, getMdxBySlug } from "@utils/mdx";

const COMPONENTS_BASE = "sampling/docs/components";

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

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="mt-8 flex flex-col gap-5">
      <ComponentsDoc slug={params.slug} />
    </div>
  );
}
