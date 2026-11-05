import { buildNavTree } from "./navigation-tree";
import { NavigationItem } from "./schemas/navigation";

export type FooterLink = {
  id: string;
  label: string;
  href: string;
  external: boolean;
};

export type FooterColumn = {
  id: string;
  title: string;
  links: FooterLink[];
};

const MAX_COLUMNS = 3;

export function buildFooterColumn(items: NavigationItem[]): FooterColumn[] {
  const footerTree = buildNavTree(items, "footer");
  const source =
    footerTree.length > 0 ? footerTree : buildNavTree(items, "main");

  return source
    .filter((node) => node.children.length > 0)
    .slice(0, MAX_COLUMNS)
    .map((node) => ({
      id: node.id,
      title: node.label,
      links: node.children.flatMap((child) =>
        child.href
          ? [
              {
                id: child.id,
                label: child.label,
                href: child.href,
                external: child.external,
              },
            ]
          : [],
      ),
    }))
    .filter((column) => column.links.length > 0);
}
