import { CodeBlock } from "@comps/code-block-root";

const codeExample = `
import '@radix-ui/themes/styles.css';
import { Theme, Button } from '@radix-ui/themes'

export default () => (
  <Theme>
    <Button>Hey 👋</Button>
  </Theme>
)
`.trim();

const Code = () => {
  return (
    <CodeBlock.Root className="CodeBlockRoot">
      <CodeBlock.Content>
        <CodeBlock.Pre>
          <CodeBlock.Code language="jsx">{codeExample}</CodeBlock.Code>
        </CodeBlock.Pre>
        {/* <CodeBlock.CopyButton /> */}
      </CodeBlock.Content>
    </CodeBlock.Root>
  );
};

export default function Page() {
  return (
    <div className="mt-8">
      <Code />
    </div>
  );
}
