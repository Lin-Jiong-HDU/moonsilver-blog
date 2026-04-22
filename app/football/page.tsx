import type { Metadata } from "next";
import { FootballWidgetPage } from "@/app/football/football-widget-page";

export const metadata: Metadata = {
  title: "足球数据",
  description: "国内更稳的五大联赛数据入口，提供赛程、积分榜和射手榜。",
};

export default function FootballPage() {
  return <FootballWidgetPage />;
}
