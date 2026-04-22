import type { Metadata } from "next";
import { JobtiClient } from "@/app/jobti/jobti-client";

export const metadata: Metadata = {
  title: "Jobti V16",
  description: "80 题、16 型、1020 岗位的职业向量码测绘。",
};

export default function JobtiPage() {
  return <JobtiClient />;
}
