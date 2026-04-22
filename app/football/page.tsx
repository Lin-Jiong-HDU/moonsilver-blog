import type { Metadata } from "next";
import { FootballWidgetPage } from "@/app/football/football-widget-page";

export const metadata: Metadata = {
  title: "足球",
  description: "五大联赛积分榜与射手榜 widget。",
};

export default function FootballPage() {
  return <FootballWidgetPage />;
}
