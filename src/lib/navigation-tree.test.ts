import { describe, expect, it } from "vitest";

import type { NavigationItem } from "@/lib/schemas/navigation";

import { buildNavTree } from "./navigation-tree";

const item = (overrides: Partial<NavigationItem>): NavigationItem => ({
  documentId: "id",
  label: "Label",
  url: "/x",
  type: "internal",
  order: 0,
  isVisible: true,
  openInNewTab: false,
  menuLocation: "main",
  parent: null,
  children: [],
  page: null,
  sector: null,
  ...overrides,
});

describe("buildNavTree", () => {
  it("hides items with isVisible false", () => {
    const tree = buildNavTree([
      item({ documentId: "a", label: "A" }),
      item({ documentId: "b", label: "B", isVisible: false }),
    ]);
    expect(tree.map((node) => node.label)).toEqual(["A"]);
  });

  it("hides items that are not in the main menu", () => {
    const tree = buildNavTree([
      item({ documentId: "a", label: "A" }),
      item({ documentId: "f", label: "Footer", menuLocation: "footer" }),
    ]);
    expect(tree.map((node) => node.label)).toEqual(["A"]);
  });

  it("sorts by order and treats null as 0", () => {
    const tree = buildNavTree([
      item({ documentId: "c", label: "C", order: 3 }),
      item({ documentId: "a", label: "A", order: null }),
      item({ documentId: "b", label: "B", order: 1 }),
    ]);
    expect(tree.map((node) => node.label)).toEqual(["A", "B", "C"]);
  });

  it("attaches children to their parent and sorts them", () => {
    const tree = buildNavTree([
      item({ documentId: "p", label: "Parent", url: "/p" }),
      item({
        documentId: "c2",
        label: "Second",
        order: 2,
        parent: { documentId: "p", label: "Parent" },
      }),
      item({
        documentId: "c1",
        label: "First",
        order: 1,
        parent: { documentId: "p", label: "Parent" },
      }),
    ]);
    expect(tree).toHaveLength(1);
    expect(tree[0].children.map((node) => node.label)).toEqual([
      "First",
      "Second",
    ]);
  });

  it("builds the href from the sector slug", () => {
    const tree = buildNavTree([
      item({ type: "sector", url: null, sector: { slug: "ict" } }),
    ]);
    expect(tree[0].href).toBe("/sectors/ict");
  });

  it("builds the href from the page slug", () => {
    const tree = buildNavTree([
      item({ type: "page", url: null, page: { slug: "about" } }),
    ]);
    expect(tree[0].href).toBe("/about");
  });

  it("maps /home to /", () => {
    const tree = buildNavTree([item({ url: "/home" })]);
    expect(tree[0].href).toBe("/");
  });

  it("marks http links as external", () => {
    const tree = buildNavTree([item({ url: "https://example.com" })]);
    expect(tree[0].external).toBe(true);
  });

  it("drops an item with no link and no children", () => {
    const tree = buildNavTree([item({ url: null })]);
    expect(tree).toEqual([]);
  });

  it("keeps a link-less parent that has visible children", () => {
    const tree = buildNavTree([
      item({ documentId: "p", label: "About", url: null }),
      item({
        documentId: "c",
        label: "Contact",
        url: "/contact-us",
        parent: { documentId: "p", label: "About" },
      }),
    ]);
    expect(tree[0].href).toBeNull();
    expect(tree[0].children).toHaveLength(1);
  });
});
