import type { Metadata } from "next";
import { JobtiClient } from "@/app/jobti/jobti-client";

export const metadata: Metadata = {
  title: "Jobti 职业测绘",
  description:
    "24 道场景题、12 类岗位、8 个能力维度的职业探索页，帮助你更清楚地看见自己的工作偏好。",
};

export default function JobtiPage() {
  return <JobtiClient />;
}
