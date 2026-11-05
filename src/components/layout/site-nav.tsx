"use client";

import { NavNode } from "@/lib/navigation-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useId, useState } from "react";

type SiteNavProps = {
  nodes: NavNode[];
  contactHref: string;
  contactLabel: string;
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function isActive(pathname: string, href: string | null): boolean {
  if (!href || href.startsWith("http")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      aria-hidden="true"
    >
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

type NavLinkProps = {
  node: NavNode;
  pathname: string;
  className: string;
  onNavigate: () => void;
};

function NavLink({ node, pathname, className, onNavigate }: NavLinkProps) {
  if (!node.href) return null;
  const active = isActive(pathname, node.href);
  return (
    <Link
      href={node.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`${className} ${active ? "text-brand" : "text-ink"} ${focusRing}`}
      {...(node.external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {node.label}
    </Link>
  );
}

export function SiteNav({ nodes, contactHref, contactLabel }: SiteNavProps) {
  const pathname = usePathname();
  const baseId = useId();
  const mobileId = `${baseId}-mobile`;
  const navRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setOpenId(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Escape") return;
    if (openId) {
      document.getElementById(`${baseId}-btn-${openId}`)?.focus();
    }
    closeAll();
  }

  const topLink = `inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold hover:bg-surface-alt`;
  const subLink = `flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-surface-alt`;

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main"
        onKeyDown={onKeyDown}
        className="hidden flex-1 justify-center lg:flex"
      >
        <ul className="flex items-center gap-1">
          {nodes.map((node) => {
            if (node.children.length === 0) {
              return node.href ? (
                <li key={node.id}>
                  <NavLink
                    node={node}
                    pathname={pathname}
                    className={topLink}
                    onNavigate={closeAll}
                  />
                </li>
              ) : null;
            }

            const open = openId === node.id;
            const panelId = `${baseId}-panel-${node.id}`;
            const childActive = node.children.some((child) =>
              isActive(pathname, child.href),
            );

            return (
              <li key={node.id} className="relative">
                <button
                  id={`${baseId}-btn-${node.id}`}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : node.id)}
                  className={`${topLink} gap-1 ${childActive ? "text-brand" : "text-ink"} ${focusRing}`}
                >
                  {node.label}
                  <Chevron className={open ? "rotate-180" : ""} />
                </button>

                <div
                  id={panelId}
                  hidden={!open}
                  className="absolute top-full left-0 z-40 pt-2"
                >
                  <ul className="border-border bg-surface w-72 rounded-2xl border p-2 shadow-lg">
                    {node.href ? (
                      <li>
                        <NavLink
                          node={node}
                          pathname={pathname}
                          className={`${subLink} font-bold`}
                          onNavigate={closeAll}
                        />
                      </li>
                    ) : null}
                    {node.children.map((child) => (
                      <li key={child.id}>
                        <NavLink
                          node={child}
                          pathname={pathname}
                          className={subLink}
                          onNavigate={closeAll}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href={contactHref}
          className={`bg-brand hover:bg-brand-dark hidden min-h-11 items-center rounded-full px-5 text-sm font-semibold text-white md:inline-flex ${focusRing}`}
        >
          {contactLabel}
        </Link>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls={mobileId}
          onClick={() => setMobileOpen((value) => !value)}
          className={`border-border text-ink inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border lg:hidden ${focusRing}`}
        >
          <span className="sr-only">
            {mobileOpen ? "Close menu" : "Open menu"}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        id={mobileId}
        hidden={!mobileOpen}
        onKeyDown={onKeyDown}
        className="border-border bg-surface absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="grid gap-1 p-4">
            {nodes.map((node) =>
              node.children.length > 0 ? (
                <li key={node.id}>
                  <details className="group">
                    <summary
                      className={`text-ink flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg px-3 font-semibold ${focusRing}`}
                    >
                      {node.label}
                      <Chevron className="transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="grid gap-1 ps-3 pb-2">
                      {node.href ? (
                        <li>
                          <NavLink
                            node={node}
                            pathname={pathname}
                            onNavigate={closeAll}
                            className={`${subLink} font-bold`}
                          />
                        </li>
                      ) : null}

                      {node.children.map((child) => (
                        <li key={child.id}>
                          <NavLink
                            node={child}
                            pathname={pathname}
                            className={subLink}
                            onNavigate={closeAll}
                          />
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : node.href ? (
                <li key={node.id}>
                  <NavLink
                    node={node}
                    pathname={pathname}
                    className={`${subLink} text-base font-semibold`}
                    onNavigate={closeAll}
                  />
                </li>
              ) : null,
            )}
            <li className="pt-2">
              <Link
                href={contactHref}
                onClick={closeAll}
                className={`bg-brand flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white ${focusRing}`}
              >
                {contactLabel}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
