import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export function CTA() {
  return (
    <section className="border-t border-[--gray-a4]">
      <div className="mx-auto max-w-[920px] px-6 py-20 text-center md:py-24">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-[--gray-12] md:text-4xl">
          Ready to write your first page?
        </h2>
        <p className="mx-auto mb-8 max-w-[520px] text-[--gray-11]">
          Drop an MDX file into{" "}
          <code className="rounded bg-[--gray-a3] px-1.5 py-0.5 font-mono text-sm text-[--gray-12]">
            data/sampling/docs/components/&lt;name&gt;
          </code>{" "}
          — the sidebar, route, and Quick nav update automatically.
        </p>
        <Button asChild size="3" highContrast>
          <Link href="/sampling/docs/components/accordion">
            Browse the example <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default CTA;
