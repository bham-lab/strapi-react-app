import { cacheLife, cacheTag } from "next/cache";
import { Article, articleResponseSchema } from "./schemas/article";
import { strapiFetch } from "./strapi";
const ARTICLES_PATH =
  "/api/articles?sort=publishedDate:desc&pagination[pageSize]=100&populate[coverImage]=true";

export async function getArticles(): Promise<Article> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const response = await strapiFetch<unknown>(ARTICLES_PATH);
  const parsed = articleResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("Invalid Strapi articles response:", parsed.error.issues);
    throw new Error("Strapi returned an invalid articles response.");
  }

  return parsed.data.data;
}

function timeOf(article: Article): number {
  const time = article.publishedDate
    ? Date.parse(article.publishedDate)
    : Number.NaN;
  return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
}

function newestFirst(a: Article, b: Article): number {
  const timeA = timeOf(a);
  const timeB = timeOf(b);
  if (timeA === timeB) return 0;
  return timeA < timeB ? 1 : -1;
}

export function latestNews(articles: Article[], count: number): Article[] {
  return articles
    .filter((article) => article.type === "news")
    .sort(newestFirst)
    .slice(0, count);
}
