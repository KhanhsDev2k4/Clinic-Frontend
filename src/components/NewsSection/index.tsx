import News from "@/components/News";
import { ArticlesResponse, NewsResponse } from "@/interface/response";
import { LanguageCode } from "@/i18n/config";
import { getLocale } from "next-intl/server";

export async function fetchNews(lang: string): Promise<NewsResponse> {
  const res = await fetch(
    `https://gnews.io/api/v4/top-headlines?category=health&lang=${lang}&max=10&apikey=${process.env.GNEWS_API_KEY}`,
    { next: { revalidate: 1800 } }
  );

  if (!res.ok) {
    console.error("[fetchNews] failed:", res.status, res.statusText);
    throw new Error(`Failed to fetch news: ${res.status}`);
  }

  return res.json();
}

async function NewsSection() {
  const locale = (await getLocale()) as LanguageCode;

  let articles: ArticlesResponse[] = [];
  try {
    const data = await fetchNews(locale);
    console.log("[NewsSection]", "fetched", data?.articles?.length);
    articles = data.articles ?? [];
  } catch (err) {
    console.error("[NewsSection] fetch failed:", err);
    // Render empty state instead of crashing
  }

  return <News articles={articles} />;
}

export default NewsSection;
