import fs from "fs";
import path from "path";
import { getAllVersionsFromPath } from "@utils/mdx";

type Heading = { depth: number; text: string; id: string };

// Mirrors github-slugger's basic behavior for ASCII headings, which matches
// what `remark-slug` writes into the rendered DOM.
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9一-龥]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadings(source: string): Heading[] {
  // Drop frontmatter and fenced code blocks so '#' inside them isn't picked up.
  const body = source
    .replace(/^---[\s\S]*?\n---\n/, "")
    .replace(/```[\s\S]*?```/g, "");
  const headings: Heading[] = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, "").trim();
    headings.push({ depth: m[1].length, text, id: slugify(text) });
  }
  return headings;
}

export function QuickNav({
  slug,
  base = "sampling/docs/components",
}: {
  slug: string;
  base?: string;
}) {
  const versions = getAllVersionsFromPath(`${base}/${slug}`);
  if (versions.length === 0) return null;
  const latest = versions[0];
  const filePath = path.join(
    process.cwd(),
    "data",
    base,
    slug,
    `${latest}.mdx`
  );
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf8");
  const headings = extractHeadings(source);
  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 pl-6 pr-4 lg:block">
      <div className="mb-3 text-xs font-bold uppercase tracking-wide text-[--gray-12]">
        Quick nav
      </div>
      <ul className="flex flex-col gap-2">
        {headings.map((h, i) => (
          <li key={i} className={h.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className="text-sm text-[--gray-11] transition-colors hover:text-[--accent-11]"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default QuickNav;
