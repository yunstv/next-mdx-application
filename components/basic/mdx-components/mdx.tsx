"use client";

import * as React from "react";
import { Box, Flex } from "@radix-ui/themes";
import { getMDXComponent } from "mdx-bundler/client";
import * as themesComponents from "@radix-ui/themes";
import * as Demos from "@/components/demos";
import {
  Code,
  Em,
  Heading,
  Kbd,
  Link,
  Separator,
  Strong,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { HeroContainer, CodeBlock } from "@comps";
import { HeroCodeBlock } from "@comps/hero-code-block";
import "./mdx.css";

export const components = {
  ...themesComponents,
  ...Demos,
  h1: (props: any) => (
    <Heading asChild size="8" mb="2">
      <h1 {...props} style={{ scrollMarginTop: "var(--space-9)" }} />
    </Heading>
  ),
  h2: ({ children, id, ...props }: any) => (
    <Heading
      size="6"
      mt="8"
      mb="3"
      asChild
      {...props}
      id={id}
      style={{ scrollMarginTop: "var(--space-9)" }}
      data-heading
    >
      <h2>{children}</h2>
    </Heading>
  ),
  h3: ({ children, id, ...props }: any) => (
    <Heading
      size="4"
      mt="7"
      mb="2"
      asChild
      {...props}
      id={id}
      style={{ scrollMarginTop: "var(--space-9)" }}
      data-heading
    >
      <h3>{children}</h3>
    </Heading>
  ),
  h4: ({ children, ...props }: any) => (
    <Heading asChild size="4" mt="6" mb="3" {...props}>
      <h4 style={{ scrollMarginTop: "var(--space-9)" }}>{children}</h4>
    </Heading>
  ),
  p: (props: any) => <Text mb="4" as="p" size="3" {...props} />,
  a: ({ href = "", children, ...props }: any) => {
    if (href.startsWith("http")) {
      return (
        <Flex asChild display="inline-flex" align="center" gap="1">
          <Link {...props} href={href} target="_blank" rel="noopener">
            {children}
          </Link>
        </Flex>
      );
    }
    return <Link {...props}>{children}</Link>;
  },
  hr: (props: any) => (
    <Separator size="2" {...props} my="8" style={{ marginInline: "auto" }} />
  ),
  ul: (props: any) => <ul {...props} className={"List"} />,
  ol: ({ children, ...props }: any) => (
    <Box {...props} mb="3" pl="4" asChild>
      <ol>{children}</ol>
    </Box>
  ),
  li: (props: any) => (
    <li className={"ListItem"}>
      <Text {...props} />
    </li>
  ),
  em: Em,
  strong: Strong,
  img: ({ style, ...props }: any) => (
    <Box my="6">
      <img
        {...props}
        style={{ maxWidth: "100%", verticalAlign: "middle", ...style }}
      />
    </Box>
  ),
  pre: ({ children }: any) => (
    <CodeBlock.Root>
      <CodeBlock.Content>
        <CodeBlock.Pre>{children}</CodeBlock.Pre>
      </CodeBlock.Content>
    </CodeBlock.Root>
  ),
  Description: ({ children, ...props }: any) => {
    // takes the text even if it's wrapped in `<p>`
    // https://github.com/wooorm/xdm/issues/47
    const childText = <>{typeof children === "string" ? children : ""}</>;
    return (
      <Text as="p" size="4" mt="2" mb="7" color="gray" {...props}>
        {childText}
      </Text>
    );
  },
  code: ({ className, line, live, style, ...props }: any) => {
    // if it's a codeblock (``` block in markdown), it'll have a className from prism
    const isInlineCode = !className;
    return isInlineCode ? (
      <Code
        className={className}
        {...props}
        style={{ whiteSpace: "break-spaces" }}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
  CodeBlock,
  HeroContainer,
  HeroCodeBlock,
};

interface CodeBaseProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

interface MDXComponentProps extends CodeBaseProps {
  code: string;
  frontmatter: Frontmatter;
}

export const FrontmatterContext = React.createContext<Frontmatter>({} as any);

// Custom provider for next-mdx-remote
// https://github.com/hashicorp/next-mdx-remote#using-providers
export function MDXProvider(props: AnyObject) {
  const { frontmatter, children } = props;
  return (
    <FrontmatterContext.Provider value={frontmatter}>
      {children}
    </FrontmatterContext.Provider>
  );
}

const MDXComponent = ({ code }: MDXComponentProps) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components as any} />;
};

export { MDXComponent };
