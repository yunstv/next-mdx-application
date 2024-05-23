"use client";
import { CssLibPreferenceProvider } from "@/lib/context";
import { ThemeProvider } from "next-themes";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CssLibPreferenceProvider>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: "light-theme", dark: "dark-theme" }}
        defaultTheme="system"
      >
        {children}
      </ThemeProvider>
    </CssLibPreferenceProvider>
  );
}
