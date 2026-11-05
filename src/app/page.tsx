import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return <Hero />;
}