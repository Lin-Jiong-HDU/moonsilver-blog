"use client";

import { useSiteLanguage } from "@/app/components/language-provider";

const awards = [
  { icon: "🏅", title: { zh: "三次一等奖学金", en: "Three First-Class Scholarships" }, sub: { zh: "杭州电子科技大学", en: "Hangzhou Dianzi University" } },
  { icon: "🏛️", title: { zh: "省政府奖学金", en: "Provincial Government Scholarship" }, sub: { zh: "浙江省人民政府", en: "People's Government of Zhejiang Province" } },
  { icon: "⭐", title: { zh: "校三好学生", en: "Outstanding Student" }, sub: { zh: "杭州电子科技大学", en: "Hangzhou Dianzi University" } },
  { icon: "🔴", title: { zh: "优秀共青团员", en: "Excellent CYL Member" }, sub: { zh: "共青团", en: "Communist Youth League" } },
];

const contests = [
  { award: { zh: "省一", en: "Provincial 1st Prize" }, name: { zh: "全国大学生数学建模竞赛", en: "National College Students Mathematical Modeling Contest" } },
  { award: { zh: "省二", en: "Provincial 2nd Prize" }, name: { zh: "浙江省大学生服务外包创新应用大赛", en: "Zhejiang Service Outsourcing Innovation Contest" } },
  { award: { zh: "省铜", en: "Provincial Bronze" }, name: { zh: "挑战杯“人工智能+”专项赛", en: "Challenge Cup AI+ Special Track" } },
  { award: { zh: "省三", en: "Provincial 3rd Prize" }, name: { zh: "浙江省人工智能竞赛", en: "Zhejiang Artificial Intelligence Contest" } },
  { award: { zh: "国二", en: "National 2nd Prize" }, name: { zh: "APMCM亚太地区数学建模竞赛（中文赛道）", en: "APMCM Asia-Pacific Mathematical Contest in Modeling (Chinese track)" } },
  { award: { zh: "国二", en: "National 2nd Prize" }, name: { zh: "APMCM亚太地区数学建模竞赛（英文赛道）", en: "APMCM Asia-Pacific Mathematical Contest in Modeling (English track)" } },
];

const research = [
  {
    icon: "📗",
    title: { zh: "清华大学科研实习", en: "Research Internship at Tsinghua University" },
    desc: { zh: "在清华大学相关实验室参与科研项目，积累学术研究经验。", en: "Participated in research projects in a related Tsinghua University lab and gained academic research experience." },
  },
  {
    icon: "🌱",
    title: { zh: "浙江省新苗人才计划", en: "Zhejiang New Talent Program" },
    desc: { zh: "项目成功立项，获浙江省级大学生科研资助，面向创新型科研人才培养。", en: "The project was successfully approved and received provincial research funding for student innovation training." },
  },
];

const particles = [
  { left: "7%", top: "18%", delay: "0s", duration: "3.2s" },
  { left: "13%", top: "72%", delay: "0.3s", duration: "4s" },
  { left: "21%", top: "28%", delay: "0.6s", duration: "3.5s" },
  { left: "27%", top: "84%", delay: "0.9s", duration: "4.2s" },
  { left: "34%", top: "42%", delay: "1.2s", duration: "3.8s" },
  { left: "39%", top: "64%", delay: "1.5s", duration: "4.4s" },
  { left: "46%", top: "20%", delay: "1.8s", duration: "3.6s" },
  { left: "52%", top: "79%", delay: "2.1s", duration: "4.1s" },
  { left: "59%", top: "35%", delay: "2.4s", duration: "3.9s" },
  { left: "65%", top: "58%", delay: "2.7s", duration: "4.3s" },
  { left: "72%", top: "24%", delay: "3s", duration: "3.4s" },
  { left: "78%", top: "69%", delay: "3.3s", duration: "4.1s" },
  { left: "85%", top: "37%", delay: "3.6s", duration: "3.7s" },
  { left: "91%", top: "82%", delay: "3.9s", duration: "4.5s" },
];

const awardColor: Record<string, string> = {
  "省一": "bg-yellow-400/10 text-yellow-300 border-yellow-400/30",
  "省二": "bg-sky-400/10 text-sky-300 border-sky-400/30",
  "省铜": "bg-amber-600/10 text-amber-400 border-amber-600/30",
  "省三": "bg-zinc-400/10 text-zinc-300 border-zinc-400/30",
  "国二": "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
};

function SectionLabel({ children }: { children: string }) {
  return <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">{children}</span>;
}

function Divider() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="h-px bg-white/5" />
    </div>
  );
}

export default function HomePage() {
  const { language } = useSiteLanguage();
  const isEnglish = language === "en";

  const copy = {
    heroEyebrow: isEnglish ? "Hangzhou Dianzi University · Class of 2024" : "杭州电子科技大学 · 2024级本科生",
    heroLead: isEnglish ? "Hello," : "你好，",
    heroTitle: isEnglish ? "I am a student." : "我是一个学生。",
    heroDescription: isEnglish
      ? "I love competitions and research, and I keep exploring the edges of technology."
      : "热爱竞赛与科研，持续探索技术的边界。",
    aboutLabel: isEnglish ? "About" : "关于",
    aboutTitle: isEnglish ? "Class of 2024 · Hangzhou Dianzi University" : "2024级 · 杭州电子科技大学",
    aboutDescription: isEnglish
      ? "I am an undergraduate focused on mathematical modeling, artificial intelligence, and engineering practice. Outside of class, I actively join competitions and research projects, aiming to connect theory with real-world applications."
      : "本科在读，专注于数学建模、人工智能与工程实践。在学业之余积极参与各类竞赛与科研项目，致力于将理论与实际应用相结合。",
    honorsLabel: isEnglish ? "Honors" : "荣誉",
    honorsTitle: isEnglish ? "Awards" : "荣誉奖项",
    contestsLabel: isEnglish ? "Competitions" : "竞赛",
    contestsTitle: isEnglish ? "Competition Results" : "竞赛成绩",
    researchLabel: isEnglish ? "Research" : "科研",
    researchTitle: isEnglish ? "Research Experience" : "科研经历",
  };

  return (
    <div className="bg-black text-white">
      <section className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="home-orb-primary absolute left-1/2 top-1/2 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
          <div className="home-orb-secondary absolute left-1/2 top-1/2 h-[58rem] w-[58rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

          {particles.map((particle) => (
            <span
              key={`${particle.left}-${particle.top}`}
              className="home-particle absolute h-1 w-1 rounded-full bg-white/30"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}

          {[...Array(6)].map((_, index) => (
            <div
              key={`v-${index}`}
              className="absolute bottom-0 top-0 w-px origin-top bg-white/5 home-fade-up"
              style={{
                left: `${(index + 1) * (100 / 7)}%`,
                animationDelay: `${0.3 + index * 0.08}s`,
              }}
            />
          ))}

          {[...Array(4)].map((_, index) => (
            <div
              key={`h-${index}`}
              className="absolute left-0 right-0 h-px bg-white/5 home-fade-up"
              style={{
                top: `${(index + 1) * 20}%`,
                animationDelay: `${0.45 + index * 0.1}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-6 text-center">
          <div className="home-fade-up mx-auto mb-10 h-px max-w-xs bg-white/20" style={{ animationDelay: "0.2s" }} />

          <p className="home-fade-up mb-6 text-xs uppercase tracking-[0.3em] text-white/40" style={{ animationDelay: "0.45s" }}>
            {copy.heroEyebrow}
          </p>

          <div className="overflow-hidden">
            <h1 className="home-reveal text-5xl font-bold tracking-tight md:text-8xl" style={{ animationDelay: "0.65s" }}>
              {copy.heroLead}
            </h1>
          </div>

          <div className="mt-2 overflow-hidden">
            <h1 className="home-reveal text-5xl font-bold tracking-tight text-white/50 md:text-8xl" style={{ animationDelay: "0.82s" }}>
              {copy.heroTitle}
            </h1>
          </div>

          <p className="home-fade-up mx-auto mt-8 max-w-md text-sm leading-relaxed text-white/50 md:text-base" style={{ animationDelay: "1.15s" }}>
            {copy.heroDescription}
          </p>

          <div className="home-fade-up mt-14" style={{ animationDelay: "1.55s" }}>
            <div className="home-arrow text-lg text-white/20">→</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionLabel>{copy.aboutLabel}</SectionLabel>
        <h2 className="mt-4 mb-6 text-3xl font-semibold leading-tight md:text-4xl">{copy.aboutTitle}</h2>
        <p className="max-w-2xl leading-relaxed text-white/50">{copy.aboutDescription}</p>
      </section>

      <Divider />

      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionLabel>{copy.honorsLabel}</SectionLabel>
        <h2 className="mt-4 mb-12 text-3xl font-semibold md:text-4xl">{copy.honorsTitle}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {awards.map((award) => (
            <div key={award.title.zh} className="flex items-center gap-4 rounded-xl border border-white/8 p-5 transition-colors hover:border-white/20">
              <span className="text-2xl">{award.icon}</span>
              <div>
                <p className="text-sm font-medium text-white">{award.title[language]}</p>
                <p className="mt-0.5 text-xs text-white/35">{award.sub[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionLabel>{copy.contestsLabel}</SectionLabel>
        <h2 className="mt-4 mb-12 text-3xl font-semibold md:text-4xl">{copy.contestsTitle}</h2>
        <div className="space-y-3">
          {contests.map((contest, index) => (
            <div key={contest.name.zh} className="group flex items-center justify-between border-b border-white/8 pb-4">
              <div className="flex items-center gap-4">
                <span className="w-5 select-none text-xs text-white/20">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm text-white/80 transition-colors group-hover:text-white">{contest.name[language]}</span>
              </div>
              <span className={`ml-4 shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${awardColor[contest.award.zh]}`}>
                {contest.award[language]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionLabel>{copy.researchLabel}</SectionLabel>
        <h2 className="mt-4 mb-12 text-3xl font-semibold md:text-4xl">{copy.researchTitle}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {research.map((item) => (
            <div key={item.title.zh} className="h-full rounded-2xl border border-white/8 p-7 transition-all hover:border-white/20 hover:bg-white/[0.02]">
              <span className="mb-4 block text-3xl">{item.icon}</span>
              <h3 className="mb-2 font-semibold text-white">{item.title[language]}</h3>
              <p className="text-sm leading-relaxed text-white/40">{item.desc[language]}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
