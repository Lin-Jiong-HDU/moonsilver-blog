import type { Metadata } from "next";
import { FootballWidgetPage } from "@/app/football/football-widget-page";

export const metadata: Metadata = {
  title: "足球",
  description: "ScoreBat 官方 widget：比分、积分榜与集锦。",
};

export default function FootballPage() {
  return <FootballWidgetPage />;
}
