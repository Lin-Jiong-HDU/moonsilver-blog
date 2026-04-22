import type { Metadata } from "next";
import { JobtiClient } from "@/app/jobti/jobti-client";

export const metadata: Metadata = {
  title: "Jobti",
  description: "放在娱乐区里的职业测绘小游戏。",
};

export default function JobtiPage() {
  return <JobtiClient />;
}
