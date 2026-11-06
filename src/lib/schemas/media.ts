import { z } from "zod";

const formatSchema = z.object({ url: z.string() });

export const mediaSchema = z.object({
  url: z.string(),
  alternativeText: z.string().nullish(),
  width: z.number().nullish(),
  height: z.number().nullish(),
  formats: z
    .object({
      small: formatSchema.nullish(),
      medium: formatSchema.nullish(),
    })
    .nullish(),
});

export type Media = z.infer<typeof mediaSchema>;
