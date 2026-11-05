import { NavNode } from "@/lib/navigation-tree";
import Link from "next/link";
import { Container } from "../ui/container";
import { Suspense } from "react";
import { getMainNavigation } from "@/lib/navigation";
import { SiteNav } from "./site-nav";
const CONTACT_HREF = "/contact-us";

function StaticLinks({ nodes }: { nodes: NavNode[] }) {
  return (
    <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
      <ul className="flex items-center gap-1">
        {nodes.map((node) =>
          node.href ? (
            <li key={node.id}>
              <Link
                href={node.href}
                className="text-ink inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold"
              >
                {node.label}
              </Link>
            </li>
          ) : null,
        )}
      </ul>
    </nav>
  );
}

export async function SiteHeader() {
  const nodes = await getMainNavigation();

  return (
    <header className="border-border bg-surface relative border-b">
      <div className="flex min-h-[4.5rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-brand-dark focus-visible:outline-brand text-xl font-extrabold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          MInT
        </Link>

        <Suspense fallback={<StaticLinks nodes={nodes} />}>
          <SiteNav
            nodes={nodes}
            contactHref={CONTACT_HREF}
            contactLabel="Contact"
          />
        </Suspense>
      </div>
    </header>
  );
}
