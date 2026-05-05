"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <IconButton
      variant="ghost"
      color="gray"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {mounted ? (isDark ? <SunIcon /> : <MoonIcon />) : <MoonIcon />}
    </IconButton>
  );
}
