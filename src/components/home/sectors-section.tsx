import { Sector } from "@/lib/schemas/sector";
import { getSectors, topLevelSectors } from "@/lib/sectors";
import { SectorCard } from "../sectorCard";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/sectionHeading";
import { ButtonLink } from "../ui/button-link";
import { Suspense } from "react";

const MAX_SECTORS = 6;
const gridClass = "grid gap-6  sm:grid-cols-2 lg:grid-cols-3";

async function loadSectors(): Promise<Sector[] | null> {
  try {
    return topLevelSectors(await getSectors()).slice(0, MAX_SECTORS);
  } catch (error) {
    console.error("[home] sectors could not be loaded:", error);
    return null;
  }
}

function Notice({ children }: { children: string }) {
  return (
    <p
      role="status"
      className="border-border bg-surface-alt text-muted rounded-2xl border-dashed p-8"
    >
      {children}
    </p>
  );
}

function SectorGridSkeleton() {
  return (
    <ul aria-hidden="true" className={gridClass}>
      {[0, 1, 2].map((item) => (
        <li
          key={item}
          className="border-border bg-surface-alt h-52 rounded-2xl border motion-safe:animate-pulse"
        />
      ))}
    </ul>
  );
}

async function SectorGrid() {
  const sectors = await loadSectors();

  if (sectors === null) {
    return (
      <Notice>
        Sectors cannot be loaded right now. Please try again later.
      </Notice>
    );
  }
  if (sectors.length === 0) {
    return <Notice>No sectors have been published yet.</Notice>;
  }

  return (
    <ul className={gridClass}>
      {sectors.map((sector) => (
        <li key={sector.documentId}>
          <SectorCard sector={sector} />
        </li>
      ))}
    </ul>
  );
}

export function SectorSection() {
  return (
    <section aria-labelledby="sectors-title" className="py-16 md:py-20">
      <Container>
        <SectionHeading
          id="sectors-title"
          title="Sectors"
          text="How the ministry is organized and what each sector does."
          action={
            <ButtonLink href="/sectors" variant="outline">
              View all sectors
            </ButtonLink>
          }
        />
        <Suspense fallback={<SectorGridSkeleton />}>
          <SectorGrid />
        </Suspense>
      </Container>
    </section>
  );
}
