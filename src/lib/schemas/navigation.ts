import { string, z } from "zod";

const navigationItemBase = z.object({
  documentId: z.string(),
  label: z.string(),
  url: z.string().nullish(),
  type: z.string().nullish(),
  order: z.number().nullish(),
  isVisible: z.boolean().nullish(),
  openInNewTab: z.boolean().nullish(),
  menuLocation: z.string().nullish(),
});

export const navigationItemSchema = navigationItemBase.extend({
  parent: navigationItemBase.nullish(),
  children: z.array(navigationItemBase).default([]),
  page: z.object({ slug: z.string() }).nullish(),
  sector: z.object({ slug: z.string() }).nullish(),
});

export const navigationResponseSchema = z.object({
  data: z.array(navigationItemSchema),
});

export type NavigationItem = z.infer<typeof navigationItemSchema>;
