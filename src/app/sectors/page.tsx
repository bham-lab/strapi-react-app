import type { Metadata } from "next";

import { getSectors } from "@/lib/sectors";
import { Container } from "@/components/ui/container";
import { SectorCard } from "@/components/sectorCard";

export const metadata: Metadata = { title: "Sectors" };

export default async function SectorsPage() {
  const all = await getSectors();
  const sectors = all.filter((sector) => !sector.parent);

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-ink text-3xl font-extrabold tracking-tight md:text-4xl">
          Sectors
        </h1>
        <p className="text-muted mt-2 mb-8 max-w-2xl">
          How the ministry is organized and what each sector does.
        </p>

        {sectors.length === 0 ? (
          <p className="border-border bg-surface-alt text-muted rounded-2xl border border-dashed p-8">
            No sectors have been published yet.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <li key={sector.documentId}>
                <SectorCard sector={sector} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
