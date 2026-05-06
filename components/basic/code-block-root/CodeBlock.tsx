import React from "react";
import copy from "copy-to-clipboard";
import { refractor } from "refractor";
import js from "refractor/javascript";
import jsx from "refractor/jsx";
import bash from "refractor/bash";
import css from "refractor/css";
import diff from "refractor/diff";
import { toHtml as hastToHtml } from "hast-util-to-html";
import rangeParser from "parse-numeric-range";
import highlightLine from "@utils/rehype-highlight-line.mjs";
import highlightWord from "@utils/rehype-highlight-word.mjs";
import { Box, IconButton, ScrollArea } from "@radix-ui/themes";
import { CopyIcon } from "@radix-ui/react-icons";
import "./CodeBlock.css";
import "@radix-ui/themes/styles.css";

refractor.register(js);
refractor.register(jsx);
refractor.register(bash);
refractor.register(css);
refractor.register(diff);

interface CodeBaseProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

interface RootProps extends CodeBaseProps {}
const Root = React.forwardRef<HTMLDivElement, RootProps>(function Root(
  { className, ...props },
  forwardedRef
) {
  return <Box ref={forwardedRef} className={className} {...props} />;
});
Root.displayName = "CodeBlock.Root";

interface HeaderProps extends CodeBaseProps {}
const Header = React.forwardRef<HTMLDivElement, HeaderProps>(function Header(
  { className, ...props },
  forwardedRef
) {
  return <Box ref={forwardedRef} className={className} {...props} />;
});
Header.displayName = "CodeBlock.Header";

interface ContentProps extends CodeBaseProps {}
const Content = React.forwardRef<HTMLDivElement, ContentProps>(function Content(
  { className, ...props },
  forwardedRef
) {
  return (
    <Box
      ref={forwardedRef}
      data-code-block-content
      className={className}
      {...props}
    />
  );
});
Content.displayName = "CodeBlock.Content";

interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {
  overflow?: "scroll" | "hidden";
}
const Pre = React.forwardRef<HTMLPreElement, PreProps>(function Pre(
  { className, children, overflow = "scroll", ...props },
  forwardedRef
) {
  const pre = (
    <pre ref={forwardedRef} className={className} {...props}>
      {children}
    </pre>
  );

  if (overflow === "hidden") {
    return pre;
  }

  return <ScrollArea>{pre}</ScrollArea>;
});
Pre.displayName = "CodeBlock.Pre";

interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  className?: string;
  language: "js" | "jsx" | "bash" | "css" | "diff";
  children: string;
  lines?: string;
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, children, language, lines = "0" }, ref) => {
    const { result } = React.useMemo(() => {
      const root = refractor.highlight(children, language);
      const _root = highlightLine(root, rangeParser(lines));
      const content = highlightWord(_root);
      const result = hastToHtml(content);
      return {
        root,
        result,
      };
    }, [children, language, lines]);
    return (
      <code
        ref={ref}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: result }}
        className={className}
      />
    );
  }
);
Code.displayName = "CodeBlock.Code";

interface CopyButtonProps extends CodeBaseProps {}
const CopyButton: React.FunctionComponent<CopyButtonProps> = ({
  className,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget
      .closest("[data-code-block-content]")
      ?.querySelector("code")?.textContent;
    copy(value as string);
  };
  return (
    <IconButton
      size="1"
      variant="ghost"
      color="gray"
      aria-label="Copy"
      onClick={handleClick}
      className={className}
    >
      <CopyIcon />
    </IconButton>
  );
};

const CodeBlock = {
  Root,
  Header,
  Content,
  Code,
  Pre,
  CopyButton,
};

export { CodeBlock };
