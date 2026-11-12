import { Article } from "@/lib/schemas/article";
import { buildMediaUrl } from "@/lib/utils/media-url";
import { env } from "@/lib/env";
import { formatDate } from "@/lib/utils/format-date";
import Image from "next/image";
import Link from "next/link";
type NewsCardProps = {
  article: Article;
  featured?: boolean;
};

const TYPE_LABELS: Record<string, string> = {
  news: "News",
  press_release: "Press release",
};

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const image = article.coverImage;
  const src = image
    ? buildMediaUrl(image.formats?.medium?.url ?? image.url, env.STRAPI_URL)
    : null;

  const date = formatDate(article.publishedDate);
  const label = TYPE_LABELS[article.type ?? ""];

  return (
    <article className="border-border bg-surface-alt focus-within:ring-brand hover:border-brand relative flex h-full flex-col overflow-hidden rounded-2xl border transition-colors focus-within:ring-2">
      <div
        className={`bg-brand-dark relative w-full ${
          featured ? "aspect-video" : "aspect-16/10"
        }`}
      >
        "
        {src ? (
          <Image
            src={src}
            alt={image?.alternativeText ?? ""}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            unoptimized
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="bg-gradient-to-bt from-brand-dark to-brand flex h-full items-center justify-center text-2xl font-extrabold text-white/40"
          >
            MInT
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {label ? (
            <span className="bg-surface-alt text-brand-dark rounded-full px-3 py-1 text-xs font-semibold">
              {label}
            </span>
          ) : null}
          {date ? (
            <time dateTime={article.publishedDate ?? undefined}>{date}</time>
          ) : null}
        </div>

        <h3
          className={`text-ink line-clamp-3 leading-snug font-bold ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          <Link
            href={`news/${article.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </h3>

        {article.summary ? (
          <p className="text-muted line-clamp-3 text-sm leading-6">
            {article.summary}
          </p>
        ) : null}
      </div>
    </article>
  );
}
