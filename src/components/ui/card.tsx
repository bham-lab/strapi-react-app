import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & { isInteractive?: boolean };

export function Card({
  className = "",
  isInteractive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`border-border bg-surface relative rounded-2xl border p-6 shadow-sm ${isInteractive ? "hover:border-brand focus-within:ring-brand transition-colors focus-within:ring-2" : ""} ${className}`}
      {...props}
    />
  );
}
