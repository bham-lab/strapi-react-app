export type DeadlineTone = "open" | "soon" | "closed" | "upcoming";
export type DeadlineState = { tone: DeadlineTone; text: string };

const DAY = 86_400_000;
const SOON_DAYS = 3;

const addisDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Addis_Ababa",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// A date with no time (2026-12-15) stays open until the end of that day in Addis Ababa.
export function parseDeadline(value: string): number {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  return Date.parse(dateOnly ? `${value}T23:59:59+03:00` : value);
}

function dayNumber(time: number): number {
  return Date.parse(`${addisDay.format(time)}T00:00:00Z`) / DAY;
}

type DeadlineInput = {
  deadline?: string | null;
  status?: string | null;
  now: number | null; // null until the page has loaded in the browser
};

export function deadlineState({
  deadline,
  status,
  now,
}: DeadlineInput): DeadlineState {
  if (status === "closed") return { tone: "closed", text: "Closed" };
  if (status === "upcoming") return { tone: "upcoming", text: "Upcoming" };
  if (!deadline || now === null) return { tone: "open", text: "Open" };

  const end = parseDeadline(deadline);
  if (Number.isNaN(end)) return { tone: "open", text: "Open" };
  if (end < now) return { tone: "closed", text: "Closed" };

  const days = dayNumber(end) - dayNumber(now);
  if (days <= 0) return { tone: "soon", text: "Closes today" };
  if (days === 1) return { tone: "soon", text: "Closes tomorrow" };
  return {
    tone: days <= SOON_DAYS ? "soon" : "open",
    text: `Closes in ${days} days`,
  };
}
