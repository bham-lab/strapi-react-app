import { getArticles, latestNews } from "@/lib/articles";
import { Article } from "@/lib/schemas/article";
import { NewsCard } from "../news/news-card";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/sectionHeading";
import { ButtonLink } from "../ui/button-link";
import { Suspense } from "react";

const MAX_NEWS = 3;

async function loadNews(): Promise<Article[] | null> {
  try {
    const articles = latestNews(await getArticles(), MAX_NEWS);
    return articles;
  } catch (error) {
    console.error("[home] news could not be loaded:", error);
    return null;
  }
}

function Notice({ children }: { children: string }) {
  return (
    <p
      role="status"
      className="border-border bg-surface text-muted rounded-2xl border border-dashed p-8"
    >
      {children}
    </p>
  );
}

function NewsSkeleton() {
  return (
    <ul aria-hidden="true" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <li
          key={item}
          className="bg-surface border-border h-72 rounded-2xl border motion-safe:animate-pulse"
        />
      ))}
    </ul>
  );
}

async function NewsGrid() {
  const news = await loadNews();

  if (news === null) {
    return (
      <Notice> News cannot be loaded right now. Please try again later.</Notice>
    );
  }

  if (news.length === 0) {
    return <Notice> No news has been published yet.</Notice>;
  }

  const featuredLayout = news.length === MAX_NEWS;
  return (
    <ul
      className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${featuredLayout ? "lg:grid-rows-2" : ""}`}
    >
      {news.map((article, index) => {
        const featured = featuredLayout && index === 0;
        return (
          <li
            key={article.documentId}
            className={featured ? "md:col-span-2 lg:row-span-2" : ""}
          >
            <NewsCard article={article} featured={featured} />
          </li>
        );
      })}
    </ul>
  );
}

export function NewsSection() {
  return (
    <section
      aria-labelledby="news-title"
      className="bg-surface-alt py-16 md:py-20"
    >
      <Container>
        <SectionHeading
          id="news-title"
          title="Latest News"
          text="Updates and announcements from the ministry."
          action={
            <ButtonLink href="/news" variant="outline">
              {" "}
              View all news{" "}
            </ButtonLink>
          }
        />
        <Suspense fallback={<NewsSkeleton />}>
          <NewsGrid />
        </Suspense>
      </Container>
    </section>
  );
}
