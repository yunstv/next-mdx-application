import fs from "fs";
import path from "path";
import { getAllVersionsFromPath } from "@utils/mdx";
import { SidebarNavClient } from "./SidebarNavClient";
import type { SidebarSection } from "./types";

const COMPONENTS_BASE = "sampling/docs/components";

function readComponentItems() {
  const dir = path.join(process.cwd(), "data", COMPONENTS_BASE);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter(
      (name) => getAllVersionsFromPath(`${COMPONENTS_BASE}/${name}`).length > 0
    )
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({ name, href: `/sampling/docs/components/${name}` }));
}

export function SidebarNav() {
  const sections: SidebarSection[] = [
    { title: "Components", items: readComponentItems() },
  ];

  return <SidebarNavClient sections={sections} />;
}

export default SidebarNav;
