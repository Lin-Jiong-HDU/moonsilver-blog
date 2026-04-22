import type { Metadata } from "next";
import { FootballWidgetPage } from "@/app/football/football-widget-page";

export const metadata: Metadata = {
  title: "足球数据",
  description: "在当前页面内查看五大联赛赛程、积分榜和射手榜。",
};

export default function FootballPage() {
  return <FootballWidgetPage />;
}
