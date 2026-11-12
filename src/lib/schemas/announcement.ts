import { z } from "zod";

export const announcementSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  announcementType: z.string().nullish(),
  announcementStatus: z.string().nullish(),
  publishedDate: z.string().nullish(),
  deadline: z.string().nullish(),
});

export const announcementsResponseSchema = z.object({
  data: z.array(announcementSchema),
});

export type Announcement = z.infer<typeof announcementSchema>;
