"use client";

import { useState } from "react";
import { useSiteLanguage } from "@/app/components/language-provider";
import { ProductJsonSitePanel } from "@/app/contest/product-json-site-panel";

const categories = [
  {
    id: "robot",
    icon: "🤖",
    title: { zh: "机器人", en: "Robotics" },
    subtitle: { zh: "机器人相关赛事", en: "Robot-related competitions" },
    desc: {
      zh: "机器人设计、运动规划与智能决策，结合机械、电气与软件多学科融合。",
      en: "Robot design, motion planning, and intelligent decision-making with multidisciplinary integration across mechanics, electronics, and software.",
    },
    tags: [
      { zh: "ROS", en: "ROS" },
      { zh: "运动规划", en: "Motion Planning" },
      { zh: "机械设计", en: "Mechanical Design" },
    ],
  },
  {
    id: "cs-design",
    icon: "💻",
    title: { zh: "计算机设计", en: "Computer Design" },
    subtitle: { zh: "中国大学生计算机设计大赛", en: "China College Students' Computer Design Contest" },
    desc: {
      zh: "聚焦软件创新与交互设计，展示计算机技术在实际场景中的创意应用。",
      en: "Focused on software innovation and interaction design, showcasing creative computer applications in real-world scenarios.",
    },
    tags: [
      { zh: "软件开发", en: "Software Development" },
      { zh: "UI/UX", en: "UI/UX" },
      { zh: "创新设计", en: "Creative Design" },
    ],
  },
  {
    id: "service-outsourcing",
    icon: "🧩",
    title: { zh: "服务外包", en: "Service Outsourcing" },
    subtitle: { zh: "中国国际服务外包创新创业大赛", en: "China International Service Outsourcing Innovation & Entrepreneurship Contest" },
    desc: {
      zh: "面向企业真实需求的项目开发，强调团队协作、方案落地与商业价值转化。",
      en: "Project development for real business needs, emphasizing teamwork, implementation, and business value delivery.",
    },
    tags: [
      { zh: "项目管理", en: "Project Management" },
      { zh: "商业分析", en: "Business Analysis" },
      { zh: "系统开发", en: "System Development" },
    ],
  },
  {
    id: "physics",
    icon: "⚗️",
    title: { zh: "物理实验创新", en: "Physics Lab Innovation" },
    subtitle: { zh: "全国大学生物理实验竞赛", en: "National College Students Physics Experiment Contest" },
    desc: {
      zh: "以物理原理为基础，进行实验设计与创新，培养科学实验与工程思维。",
      en: "Built on physics principles, with experimental design and innovation to cultivate scientific and engineering thinking.",
    },
    tags: [
      { zh: "实验设计", en: "Experiment Design" },
      { zh: "数据分析", en: "Data Analysis" },
      { zh: "创新思维", en: "Creative Thinking" },
    ],
  },
] as const;

function SectionLabel({ children }: { children: string }) {
  return <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">{children}</span>;
}

export default function ContestPage() {
  const { language } = useSiteLanguage();
  const [isSmartCarOpen, setIsSmartCarOpen] = useState(false);

  const copy = {
    zh: {
      eyebrow: "Contest",
      title: "竞赛专区",
      description: "参赛记录、经验分享与资料汇总。",
      smartCarTitle: "智能车",
      smartCarSubtitle: "全国大学生智能汽车竞赛",
      smartCarDesc:
        "基于嵌入式系统的智能循迹小车设计，涵盖传感器融合、控制算法与硬件调试。",
      smartCarTags: ["嵌入式", "控制算法", "传感器"],
      smartCarAction: "查看 JSON 小站",
      smartCarClose: "收起 JSON 小站",
    },
    en: {
      eyebrow: "Contest",
      title: "Competition Zone",
      description: "Competition records, reflections, and resource collections.",
      smartCarTitle: "Smart Car",
      smartCarSubtitle: "National College Students Intelligent Car Contest",
      smartCarDesc:
        "An embedded-system smart car project covering sensor fusion, control algorithms, and hardware debugging.",
      smartCarTags: ["Embedded", "Control Algorithms", "Sensors"],
      smartCarAction: "View JSON Site",
      smartCarClose: "Hide JSON Site",
    },
  }[language];

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16">
          <SectionLabel>{copy.eyebrow}</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/40">{copy.description}</p>
        </div>

        <section className="rounded-[28px] border border-white/8 bg-white/[0.01] p-6 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.03]">
          <button
            type="button"
            onClick={() => setIsSmartCarOpen((current) => !current)}
            aria-expanded={isSmartCarOpen}
            className="flex w-full items-start gap-4 text-left"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10">
              <span className="text-xl">🚗</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold text-white">{copy.smartCarTitle}</h2>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45 transition-colors hover:border-white/25 hover:text-white">
                  {isSmartCarOpen ? copy.smartCarClose : copy.smartCarAction}
                </span>
              </div>
              <p className="mb-3 text-xs text-white/30">{copy.smartCarSubtitle}</p>
              <p className="mb-4 text-sm leading-relaxed text-white/50">{copy.smartCarDesc}</p>
              <div className="flex flex-wrap gap-1.5">
                {copy.smartCarTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>

          {isSmartCarOpen ? (
            <div className="mt-6 border-t border-white/8 pt-6">
              <ProductJsonSitePanel embedded />
            </div>
          ) : null}
        </section>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.01] p-6 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]"
            >
              <div className="absolute left-6 right-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 transition-colors group-hover:border-white/25">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">{category.title[language]}</h3>
                  <p className="mb-3 text-xs text-white/30">{category.subtitle[language]}</p>
                  <p className="mb-4 text-sm leading-relaxed text-white/50">{category.desc[language]}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.tags.map((tag) => (
                      <span key={tag.zh} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/30">
                        {tag[language]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
