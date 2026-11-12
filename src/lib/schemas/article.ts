import z from "zod";
import { mediaSchema } from "./media";

export const articleSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string().nullish(),
  publishedDate: z.string().nullish(),
  type: z.string().nullish(),
  isFeatured: z.boolean().nullish(),
  coverImage: mediaSchema.nullish(),
});

export const articleResponseSchema = z.object({
  data: z.array(articleSchema),
});

export type Article = z.infer<typeof articleSchema>;
