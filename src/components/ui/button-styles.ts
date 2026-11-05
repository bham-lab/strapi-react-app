export type ButtonVariant =
  "primary" | "secondary" | "outline" | "accent" | "outline-light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

// "accent" and "outline-light" are for dark backgrounds, so their focus ring is white.
const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand",
  secondary:
    "bg-surface-alt text-ink hover:bg-border focus-visible:outline-brand",
  outline:
    "border border-brand text-brand hover:bg-brand hover:text-white focus-visible:outline-brand",
  accent:
    "bg-accent text-brand-dark hover:brightness-110 focus-visible:outline-white",
  "outline-light":
    "border border-white text-white hover:bg-white/10 focus-visible:outline-white",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  className = "",
): string {
  return `${base} ${variants[variant]} ${className}`.trim();
}
