import { z } from "zod";

const contactSchema = z.object({
  phone: z.string().nullish(),
  email: z.string().nullish(),
  address: z.string().nullish(),
  officeHours: z.string().nullish(),
});

const socialLinkSchema = z.object({
  id: z.number(),
  platform: z.string(),
  url: z.string(),
});

export const siteSettingSchema = z.object({
  siteName: z.string(),
  tagline: z.string().nullish(),
  footerText: z.string().nullish(),
  copyright: z.string().nullish(),
  contact: contactSchema.nullish(),
  socialLinks: z
    .array(socialLinkSchema)
    .nullish()
    .transform((links) => links ?? []),
});

export const siteSettingResponseSchema = z.object({
  data: siteSettingSchema.nullable(),
});

export type SiteSetting = z.infer<typeof siteSettingSchema>;
