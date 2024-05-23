import path from "path";
import React from "react";
import { MDXComponent, MDXProvider, CodeBlock } from "@comps";
import { getMdxBySlug } from "@utils/mdx";
import { CssLibPreferenceProvider } from "@/lib/context";

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, "data");

const ComponentsDoc = async () => {
  // const code = "";
  // const node: any[] = [];
  // SUPPORTED_CSS_LIBS.forEach((lib) => {
  //   ["index.jsx", "styles.css", "tailwind.config.js"].forEach((file) => {
  //     const filePath = `${process.cwd()}/components/demos/Accordion/${lib}/${file}`;
  //     if (!fileExists(filePath)) {
  //       return false;
  //     }
  //     const source = fs.readFileSync(path.join(filePath), "utf8");
  //     node.push(source);
  //   });
  // });
  const { code, frontmatter } = await getMdxBySlug(
    "sampling/docs/components",
    "accordion/0.0.1"
  );
  // console.log("code, frontmatter:");
  // console.log(frontmatter);

  return (
    <MDXProvider frontmatter={frontmatter}>
      <MDXComponent code={code} frontmatter={frontmatter} />
    </MDXProvider>
  );
};

// const codeExample = `
// import '@radix-ui/themes/styles.css';
// import { Theme, Button } from '@radix-ui/themes'

// export default () => (
//   <Theme>
//     <Button>Hey 👋</Button>
//   </Theme>
// )
// `.trim();

// const Code = ({ code }: { code: string }) => {
//   return (
//     <CodeBlock.Root className="CodeBlockRoot">
//       <CodeBlock.Content>
//         <CodeBlock.Pre>
//           <CodeBlock.Code language="jsx">{code}</CodeBlock.Code>
//         </CodeBlock.Pre>
//         {/* <CodeBlock.CopyButton /> */}
//       </CodeBlock.Content>
//     </CodeBlock.Root>
//   );
// };

export default function Page({
  params,
}: {
  params: { code: string; slug: string };
}) {
  return (
    <div className="mt-8 flex flex-col gap-5">
      <ComponentsDoc />
    </div>
  );
}
