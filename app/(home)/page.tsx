import type { Metadata } from "next";
import { Hero, Features, CTA } from "@comps/home";

export const metadata: Metadata = {
  title: "yunstv — accessible MDX docs",
  description:
    "Build high-quality MDX-driven component docs with first-class syntax highlighting, navigation, and live examples.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
