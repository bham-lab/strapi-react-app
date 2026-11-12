import { getAnnouncements, openAnnouncements } from "@/lib/announcements";
import { Announcement } from "@/lib/schemas/announcement";

import { announcementTypeLabel } from "@/lib/utils/announcement-labels";
import { formatDate } from "@/lib/utils/format-date";
import Link from "next/link";
import { DeadlineBadge } from "../announcements/deadline-badge";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/sectionHeading";
import { ButtonLink } from "../ui/button-link";
import { Suspense } from "react";

const MAX_ANNOUNCEMENTS = 5;

async function loadAnnouncements(): Promise<Announcement[] | null> {
  try {
    return openAnnouncements(await getAnnouncements(), MAX_ANNOUNCEMENTS);
  } catch (error) {
    console.error("[home] announcements could not be loaded:", error);
    return null;
  }
}

function Notice({ children }: { children: string }) {
  return <p role="status">{children}</p>;
}

function AnnouncementSkeleton() {
  return (
    <ul>
      {[1, 2, 3].map((item) => (
        <li
          key={item}
          className="bg-surface-alt border-border h-16 rounded-2xl border motion-safe:animate-pulse"
        />
      ))}
    </ul>
  );
}

async function AnnouncementList() {
  const announcements = await loadAnnouncements();

  if (announcements === null) {
    return (
      <Notice>
        Announcements cannot be loaded right now. Please try again later.
      </Notice>
    );
  }

  if (announcements.length === 0) {
    return <Notice>There are no open announcements right now.</Notice>;
  }

  return (
    <ul className="divide-border border-border bg-surface-alt divide-y overflow-hidden rounded-2xl border">
      {announcements.map((item) => {
        const type = announcementTypeLabel(item.announcementType);
        const deadline = formatDate(item.deadline);
        return (
          <li
            key={item.documentId}
            className="focus-within:bg-surface-alt hover:bg-surface-alt relative flex flex-wrap items-baseline-last gap-x-4 gap-y-2 px-5 py-4 transition-colors"
          >
            {type ? (
              <span className="bg-surface-alt text-brand-dark rounded-full px-3 py-1 text-xs font-semibold">
                {type}
              </span>
            ) : null}

            <h3 className="text-ink min-w-0 flex-1 basis-64 font-semibold">
              <Link
                href={`/announcements/${item.slug}`}
                className="focus-visible:outline-brand after:absolute after:inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2"
              >
                {item.title}
              </Link>
            </h3>
            {deadline ? (
              <span className="text-muted text-sm">Deadline: {deadline}</span>
            ) : null}
            <DeadlineBadge
              deadline={item.deadline}
              status={item.announcementStatus}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function AnnouncementSection() {
  return (
    <section aria-labelledby="announcement-title" className="py-16 md:py-20">
      <Container>
        <SectionHeading
          title="Announcements"
          id="announcement-title"
          text="Vacancies, notices and calls that are open now."
          action={
            <ButtonLink href="/announcements" variant="outline">
              View all announcements
            </ButtonLink>
          }
        />
        <Suspense fallback={<AnnouncementSkeleton />}>
          <AnnouncementList />
        </Suspense>
      </Container>
    </section>
  );
}
