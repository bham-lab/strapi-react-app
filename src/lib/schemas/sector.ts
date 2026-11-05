import { string, z } from "zod";

export const sectorBase = z.object({
  documentId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  order: z.number(),
});

export const sectorSchema = sectorBase.extend({
  parent: sectorBase.nullish(),
  children: z.array(sectorBase).default([]),
});
export const sectorsResponseSchema = z.object({
  data: z.array(sectorSchema),
});

export type Sector = z.infer<typeof sectorSchema>;
export type SectorsResponse = z.infer<typeof sectorsResponseSchema>;
