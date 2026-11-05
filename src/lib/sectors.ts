import { cacheLife } from "next/cache";

import { strapiFetch } from "./strapi";

import {
  SectorsResponse,
  sectorsResponseSchema,
  type Sector,
} from "./schemas/sector";

export async function getSectors(): Promise<Sector[]> {
  "use cache";

  cacheLife("hours");

  const response = await strapiFetch<unknown>(
    "/api/sectors?sort=order:asc&populate[children]=true&populate[parent]=true",
  );

  const parsed = sectorsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("Invalid Strapi sectors response:", parsed.error.issues);
    throw new Error("Strapi returned and invalid sectors response.");
  }

  return parsed.data.data;
}

export function topLevelSectors(sectors: Sector[]): Sector[] {
  return sectors
    .filter((sector) => !sector.parent)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
