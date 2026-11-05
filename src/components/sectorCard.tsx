import Link from "next/link";
import { Card } from "./ui/card";
import type { Sector } from "@/lib/schemas/sector";

type SectorCardProps = { sector: Sector };

const MAX_CHILDREN = 3;

export function SectorCard({ sector }: SectorCardProps) {
  const visible = sector.children.slice(0, MAX_CHILDREN);
  const hidden = sector.children.length - visible.length;
  return (
    <Card isInteractive className="flex h-full flex-col gap-3">
      <h2 className="text-ink text-xl leading-snug font-bold">
        <Link href={`/sectors/${sector.slug}`}>{sector.name}</Link>
      </h2>
      {sector.description ? (
        <p className="text-muted line-clamp-3 text-sm leading-6">
          {sector.description}
        </p>
      ) : null}

      {visible.length > 0 ? (
        <ul className="border-border text-muted mt-auto grid gap-1.5 border-t pt-4 text-sm">
          {visible.map((child) => (
            <li key={child.documentId}>{child.name}</li>
          ))}
          {hidden > 0 ? <li>and {hidden} more</li> : null}
        </ul>
      ) : null}
    </Card>
  );
}
