import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getFooterColumns } from "@/lib/navigation";
import { getSiteSetting } from "@/lib/site-setting";
import { safeExternalUrl } from "@/lib/utils/url";

const DEFAULT_NAME = "Ministry of Innovation and Technology";
// Do not call new Date() here. With Cache Components it fails during the build.
const DEFAULT_COPYRIGHT = "© MInT. All Rights Reserved.";

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  x: "X",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  telegram: "Telegram",
  tiktok: "TikTok",
  flickr: "Flickr",
  website: "Website",
};

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export async function SiteFooter() {
  const [setting, columns] = await Promise.all([
    getSiteSetting(),
    getFooterColumns(),
  ]);

  const contact = setting?.contact;
  const phone = contact?.phone?.trim();
  const email = contact?.email?.trim();
  const address = contact?.address?.trim();
  const officeHours = contact?.officeHours?.trim();
  const hasContact = Boolean(phone || email || address || officeHours);

  const socials = (setting?.socialLinks ?? []).flatMap((link) => {
    const href = safeExternalUrl(link.url);
    return href
      ? [
          {
            id: link.id,
            href,
            label: PLATFORM_LABELS[link.platform] ?? link.platform,
          },
        ]
      : [];
  });

  const layout =
    columns.length > 0 ? "lg:grid-cols-[1.2fr_2fr_1.2fr]" : "lg:grid-cols-2";

  return (
    <footer className="bg-brand-dark text-white">
      <div className="flex h-1" aria-hidden="true">
        <span className="bg-flag-green flex-1" />
        <span className="bg-flag-yellow flex-1" />
        <span className="bg-flag-red flex-1" />
      </div>

      <Container className={`grid gap-10 py-14 ${layout}`}>
        <div>
          <p className="text-lg font-extrabold">
            {setting?.siteName ?? DEFAULT_NAME}
          </p>
          {setting?.tagline ? (
            <p className="mt-2 text-sm text-white/80">{setting.tagline}</p>
          ) : null}
          {setting?.footerText ? (
            <p className="mt-4 max-w-sm text-sm text-white/80">
              {setting.footerText}
            </p>
          ) : null}

          {socials.length > 0 ? (
            <ul aria-label="Social media" className="mt-4 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-visible:outline-accent inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {columns.length > 0 ? (
          <nav
            aria-label="Footer"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {columns.map((column) => (
              <div key={column.id}>
                <h2 className="text-sm font-bold text-white">{column.title}</h2>
                <ul className="mt-3">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        ) : null}

        {hasContact ? (
          <div>
            <h2 className="text-sm font-bold text-white">Contact</h2>
            <address className="mt-3 grid gap-1 text-sm text-white/80 not-italic">
              {address ? <p>{address}</p> : null}
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className={linkClass}
                >
                  {phone}
                </a>
              ) : null}
              {email ? (
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              ) : null}
              {officeHours ? <p>{officeHours}</p> : null}
            </address>
          </div>
        ) : null}
      </Container>

      <div className="border-t border-white/15">
        <Container className="py-5 text-sm text-white/80">
          {setting?.copyright ?? DEFAULT_COPYRIGHT}
        </Container>
      </div>
    </footer>
  );
}
