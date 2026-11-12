"use client";

import { useNow } from "@/hook/use-now";
import { deadlineState, DeadlineTone } from "@/lib/utils/deadline";

const TONES: Record<DeadlineTone, string> = {
  open: "bg-brand/20 text-brand-dark",
  soon: "bg-accent/25 text-ink",
  upcoming: "bg-surface-alt text-ink",
  closed: "bg-surface-alt text-muted",
};

type DeadlineBadgeProps = {
  deadline?: string | null;
  status?: string | null;
};

export function DeadlineBadge({ deadline, status }: DeadlineBadgeProps) {
  const now = useNow();
  const { tone, text } = deadlineState({ deadline, status, now });

  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold ${TONES[tone]}`}
    >
      {text}
    </span>
  );
}
