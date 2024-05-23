"use client";
import * as React from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  Tooltip,
  Tabs,
  Select,
  Theme,
  Grid,
} from "@radix-ui/themes";
import * as Collapsible from "@radix-ui/react-collapsible";
import type { CssLib } from "@utils/constants";
import "./HeroCodeBlock.css";
import { CodeBlock } from "@comps";
import { DEFAULT_CSS_LIB } from "@utils/constants";
import { isValidCssLib, useCssLibPreference } from "@/lib/context";

const onlyUnique = <T,>(value: T, index: number, self: T[]) =>
  self.indexOf(value) === index;

export const HeroCodeBlock = ({
  children,
  cssLib: cssLibProp,
}: {
  children?: React.ReactNode;
  cssLib: CssLib;
}) => {
  const [preferredCssLib, setPreferredCssLib] = useCssLibPreference();
  const cssLibCandidate = cssLibProp ?? preferredCssLib;
  const [isCodeExpanded, setIsCodeExpanded] = React.useState(false);

  const snippets = React.Children.toArray(children).map((pre) => {
    if (pre && typeof pre === "object" && "props" in pre) {
      return {
        id: pre.props.title,
        title: pre.props.title,
        cssLib: pre.props.cssLib,
        children: React.Children.only(pre.props.children).props?.children,
        source: pre.props.source,
      };
    }
  });

  // const availableCssLibs = React.useState([]);
  const availableCssLibs = snippets
    .map(({ cssLib }: any) => cssLib)
    .filter(onlyUnique);
  const usedCssLib = availableCssLibs.includes(cssLibCandidate)
    ? cssLibCandidate
    : DEFAULT_CSS_LIB;
  const currentTabs = snippets.filter(
    ({ cssLib }: any) => cssLib === usedCssLib
  );
  // const sources = currentTabs.reduce((sources, tab: any) => {
  //   return { ...sources, [tab.title]: tab.source };
  // }, {});

  const [currentTabValue, setCurrentTabValue] = React.useState(
    () => currentTabs[0]?.id
  );

  React.useEffect(() => {
    // Reset tab if the current one isn't available
    const tabExists = currentTabs.find(
      (tab: any) => tab.id === currentTabValue
    );
    if (!tabExists) setCurrentTabValue(currentTabs[0]?.id);
  }, [currentTabValue, currentTabs]);

  return (
    <Box className={"DemoContainer"} data-algolia-exclude position="relative">
      <Collapsible.Root open={isCodeExpanded} onOpenChange={setIsCodeExpanded}>
        <Collapsible.Content asChild forceMount>
          <Box
            data-code-block-content
            position="relative"
            style={{
              border: "1px solid var(--gray-a5)",
              borderBottomLeftRadius: "var(--radius-4)",
              borderBottomRightRadius: "var(--radius-4)",
              borderTop: "none",
            }}
          >
            <Tabs.Root
              value={currentTabValue}
              onValueChange={(value) => {
                setCurrentTabValue(value);
                setIsCodeExpanded(true);
              }}
              className="overflow-hidden"
            >
              <Tabs.List
                style={{
                  position: "relative",
                  backgroundColor: "var(--color-panel-solid)",
                  marginBottom: -1,
                }}
              >
                {currentTabs.map((tab: any) => (
                  <Tabs.Trigger key={tab.id} value={tab.id}>
                    {tab.title}
                  </Tabs.Trigger>
                ))}

                <Flex ml="auto" my="auto" gap="2">
                  <CodeBlock.CopyButton />
                </Flex>
              </Tabs.List>

              {currentTabs.map((tab: any) => (
                <Tabs.Content key={tab.id} value={tab.id} asChild>
                  <CodeBlock.Content>
                    <Grid
                      position="relative"
                      width="100%"
                      rows={isCodeExpanded ? "1fr" : "150px"}
                      maxHeight="70vh"
                      minHeight="150px"
                    >
                      <CodeBlock.Pre
                        overflow={isCodeExpanded ? "scroll" : "hidden"}
                      >
                        <code>{tab.children}</code>

                        <Box height="64px" />
                        <Flex
                          align="end"
                          justify="center"
                          className={"CollapsibleGradient"}
                        >
                          <Collapsible.Trigger asChild>
                            <Box
                              position="relative"
                              style={{
                                backgroundColor: "var(--color-panel-solid)",
                              }}
                            >
                              <Button
                                size="1"
                                variant="soft"
                                highContrast
                                color="gray"
                              >
                                {isCodeExpanded ? "Collapse" : "Expand"} code
                              </Button>
                            </Box>
                          </Collapsible.Trigger>
                        </Flex>
                      </CodeBlock.Pre>
                    </Grid>
                  </CodeBlock.Content>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};
