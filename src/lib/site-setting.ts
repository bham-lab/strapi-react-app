import { cacheLife, cacheTag } from "next/cache";
import {
  type SiteSetting,
  siteSettingResponseSchema,
} from "./schemas/site-setting";
import { strapiFetch } from "./strapi";

const SITE_SETTING_PATH =
  "/api/site-setting?populate[contact]=true&populate[socialLinks]=true";

async function fetchSiteSetting(): Promise<SiteSetting | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("site-setting");

  const response = await strapiFetch<unknown>(SITE_SETTING_PATH);
  const parsed = siteSettingResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("Invalid Strapi site-setting response:", parsed.error.issues);
    throw new Error("Strapi returned an invalid site-setting response.");
  }

  return parsed.data.data;
}

export async function getSiteSetting(): Promise<SiteSetting | null> {
  try {
    return await fetchSiteSetting();
  } catch (error) {
    console.error("[site-setting] footer will use defaults:", error);
    return null;
  }
}
