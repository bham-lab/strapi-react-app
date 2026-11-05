import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const content = {
  eyebrow: "Federal Democratic Republic of Ethiopia",
  title: "From Facilitator to Main Actor",
  text: "The Ministry of Innovation and Technology leads Ethiopia's work in research, innovation, technology transfer and digitalization.",
  primary: { label: "Explore our sectors", href: "/sectors" },
  secondary: { label: "Read the latest news", href: "/news" },
};

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-dark text-white"
    >
      {/* Decoration only. aria-hidden keeps it away from screen readers. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-dark via-brand-dark to-brand"
      />
      <svg
        aria-hidden="true"
        focusable="false"
        className="absolute inset-y-0 right-0 -z-10 h-full w-full text-white/15 md:w-2/3 [mask-image:linear-gradient(to_left,black,transparent)]"
      >
        <defs>
          <pattern
            id="hero-dots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      <Container className="py-20 md:py-28">
        <p className="text-sm font-semibold text-white/85">{content.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-6xl"
        >
          {content.title}
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-8 text-white/85">
          {content.text}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={content.primary.href} variant="accent">
            {content.primary.label}
          </ButtonLink>
          <ButtonLink href={content.secondary.href} variant="outline-light">
            {content.secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}