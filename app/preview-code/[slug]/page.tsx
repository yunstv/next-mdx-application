import { CodeBlock } from "@comps/code-block-root";
import { SUPPORTED_CSS_LIBS } from "@/lib/utils/constants";
import { fileExists } from "@/lib/utils/rehype-hero-code-block";
import fs from "fs";
import path from "path";
import React from "react";

type PayloadType = {
  params: {
    slug: [];
  };
};
export const dynamicParams = false;

const codeExample = `
import '@radix-ui/themes/styles.css';
import { Theme, Button } from '@radix-ui/themes'

export default () => (
  <Theme>
    <Button>Hey 👋</Button>
  </Theme>
)
`.trim();

const Code = ({ code }: { code: string }) => {
  return (
    <CodeBlock.Root className="CodeBlockRoot">
      <CodeBlock.Content>
        <CodeBlock.Pre>
          <CodeBlock.Code language="jsx">{code}</CodeBlock.Code>
        </CodeBlock.Pre>
        {/* <CodeBlock.CopyButton /> */}
      </CodeBlock.Content>
    </CodeBlock.Root>
  );
};

export default function Page({
  params,
}: {
  params: { code: string; slug: string };
}) {
  const code = "";
  const node: any[] = [];
  SUPPORTED_CSS_LIBS.forEach((lib) => {
    ["index.jsx", "styles.css", "tailwind.config.js"].forEach((file) => {
      const filePath = `${process.cwd()}/components/demos/Accordion/${lib}/${file}`;
      if (!fileExists(filePath)) {
        return false;
      }
      const source = fs.readFileSync(path.join(filePath), "utf8");
      node.push(source);
    });
  });
  return (
    <div className="mt-8 flex flex-col gap-5">
      {node.map((code, key) => (
        <Code key={key} code={code} />
      ))}
    </div>
  );
}
