import { cacheLife, cacheTag } from "next/cache";
import { strapiFetch } from "./strapi";
import {
  Announcement,
  announcementsResponseSchema,
} from "./schemas/announcement";
import { newestFirstBy } from "./utils/sort-by-date";

const ANNOUNCEMENTS_PATH =
  "/api/announcements?sort=publishedDate:desc&pagination[pageSize]=100";

export async function getAnnouncements() {
  "use cache";
  cacheLife("hours");
  cacheTag("announcements");

  const response = await strapiFetch<unknown>(ANNOUNCEMENTS_PATH);

  const parsed = announcementsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error(
      "Invalid Strapi announcements response:",
      parsed.error.issues,
    );
    throw new Error("Strapi returned an invalid announcements response.");
  }

  return parsed.data.data;
}

const newestFirst = newestFirstBy(
  (announcement: Announcement) => announcement.publishedDate,
);

export function openAnnouncements(
  announcements: Announcement[],
  count: number,
): Announcement[] {
  return announcements
    .filter((announcement) => announcement.announcementStatus !== "closed")
    .sort(newestFirst)
    .slice(0, count);
}
