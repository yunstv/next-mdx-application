"use client";
import { CssLibPreferenceProvider } from "@/lib/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CssLibPreferenceProvider>{children}</CssLibPreferenceProvider>;
}
