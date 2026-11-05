import { cacheLife, cacheTag } from "next/cache";

import { buildNavTree, type NavNode } from "./navigation-tree";
import {
  type NavigationItem,
  navigationResponseSchema,
} from "./schemas/navigation";
import { strapiFetch } from "./strapi";
import { buildFooterColumn, type FooterColumn } from "./footer-columns";

const NAVIGATION_PATH =
  "/api/navigation-items" +
  "?sort=order:asc" +
  "&pagination[pageSize]=100" +
  "&populate[parent]=true" +
  "&populate[children]=true" +
  "&populate[page]=true" +
  "&populate[sector]=true";

// Used only when the CMS cannot be reached, so the header is never empty.
const FALLBACK_NAV: NavNode[] = [
  { id: "home", label: "Home", href: "/", external: false, children: [] },
  {
    id: "sectors",
    label: "Sectors",
    href: "/sectors",
    external: false,
    children: [],
  },
];

export async function getNavigation(): Promise<NavigationItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("navigation");

  const response = await strapiFetch<unknown>(NAVIGATION_PATH);
  const parsed = navigationResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("Invalid Strapi navigation response:", parsed.error.issues);
    throw new Error("Strapi returned an invalid navigation response.");
  }

  return parsed.data.data;
}

export async function getMainNavigation(): Promise<NavNode[]> {
  try {
    const nodes = buildNavTree(await getNavigation());
    return nodes.length > 0 ? nodes : FALLBACK_NAV;
  } catch (error) {
    console.error("[navigation] using the fallback menu:", error);
    return FALLBACK_NAV;
  }
}

export async function getFooterColumns(): Promise<FooterColumn[]> {
  try {
    return buildFooterColumn(await getNavigation());
  } catch (error) {
    console.error("[navigation] no footer columns:", error);
    return [];
  }
}
