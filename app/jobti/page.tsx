import type { Metadata } from "next";
import { JobtiClient } from "@/app/jobti/jobti-client";

export const metadata: Metadata = {
  title: "Jobti",
  description: "基于内置题库生成结果的职业测评页面。",
};

export default function JobtiPage() {
  return <JobtiClient />;
}
