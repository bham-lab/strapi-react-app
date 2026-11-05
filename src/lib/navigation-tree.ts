import type { NavigationItem } from "@/lib/schemas/navigation";

export type NavNode = {
  id: string;
  label: string;
  href: string | null;
  external: boolean;
  children: NavNode[];
};

function isVisible(item: NavigationItem, location: string): boolean {
  const itemLocation = item.menuLocation ?? "main";
  return itemLocation === "main" && item.isVisible !== false;
}

function byOrder(a: NavigationItem, b: NavigationItem): number {
  return (a.order ?? 0) - (b.order ?? 0);
}

function resolveHref(item: NavigationItem): string | null {
  if (item.type === "page" && item.page?.slug) return `/${item.page.slug}`;
  if (item.type === "sector" && item.sector?.slug) {
    return `/sectors/${item.sector.slug}`;
  }
  const url = item.url?.trim();
  if (!url) return null;

  return url === "/home" ? "/" : url;
}

function toNode(item: NavigationItem, children: NavNode[]): NavNode | null {
  const href = resolveHref(item);

  // No link and nothing inside: there is nothing to show.
  if (!href && children.length === 0) return null;

  return {
    id: item.documentId,
    label: item.label,
    href,
    external: href?.startsWith("http") ?? false,
    children,
  };
}

function isNode(node: NavNode | null): node is NavNode {
  return node !== null;
}

export function buildNavTree(
  items: NavigationItem[],
  location: string = "main",
): NavNode[] {
  const visible = items.filter((item) => isVisible(item, location));

  const childrenOf = (parent: NavigationItem): NavNode[] =>
    visible
      .filter((item) => item.parent?.documentId === parent.documentId)
      .sort(byOrder)
      .map((item) => toNode(item, []))
      .filter(isNode);

  return visible
    .filter((item) => !item.parent)
    .sort(byOrder)
    .map((top) => toNode(top, childrenOf(top)))
    .filter(isNode);
}
