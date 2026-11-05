import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  text?: string;
  action?: ReactNode;
  as?: "h2" | "h3";
  id?: string;
};

export function SectionHeading({
  title,
  text,
  action,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <Tag
          id={id}
          className="text-ink text-2xl font-extrabold tracking-tight md:text-3xl"
        >
          {title}
        </Tag>
        {text ? <p className="text-muted mt-2 max-w-2xl">{text}</p> : null}
      </div>
      {action}
    </div>
  );
}
