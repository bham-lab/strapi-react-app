import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { SectorSection } from "@/components/home/sectors-section";
import { NewsSection } from "@/components/home/news-section";

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectorSection />
      <NewsSection />
    </>
  );
}
