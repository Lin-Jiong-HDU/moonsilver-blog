const categories = [
  {
    id: "smart-car",
    icon: "🚗",
    title: "智能车",
    subtitle: "全国大学生智能汽车竞赛",
    desc: "基于嵌入式系统的智能循迹小车设计，涵盖传感器融合、控制算法与硬件调试。",
    tags: ["嵌入式", "控制算法", "传感器"],
  },
  {
    id: "robot",
    icon: "🤖",
    title: "机器人",
    subtitle: "机器人相关赛事",
    desc: "机器人设计、运动规划与智能决策，结合机械、电气与软件多学科融合。",
    tags: ["ROS", "运动规划", "机械设计"],
  },
  {
    id: "cs-design",
    icon: "💻",
    title: "计算机设计",
    subtitle: "中国大学生计算机设计大赛",
    desc: "聚焦软件创新与交互设计，展示计算机技术在实际场景中的创意应用。",
    tags: ["软件开发", "UI/UX", "创新设计"],
  },
  {
    id: "service-outsourcing",
    icon: "🌐",
    title: "服务外包",
    subtitle: "中国国际服务外包创新创业大赛",
    desc: "面向企业真实需求的项目开发，强调团队协作、方案落地与商业价值转化。",
    tags: ["项目管理", "商业分析", "系统开发"],
  },
  {
    id: "physics",
    icon: "⚡",
    title: "物理实验创新",
    subtitle: "全国大学生物理实验竞赛",
    desc: "以物理原理为基础，进行实验设计与创新，培养科学实验与工程思维。",
    tags: ["实验设计", "数据分析", "创新思维"],
  },
];

export default function ContestPage() {
  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">
            Competition Zone
          </span>
          <h1 className="mt-4 mb-4 text-4xl font-bold md:text-5xl">竞赛专区</h1>
          <p className="max-w-lg text-sm leading-relaxed text-white/40">
            参赛记录、经验分享与资料汇总。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group relative rounded-2xl border border-white/8 bg-white/[0.01] p-6 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] ${
                category.id === "service-outsourcing" ? "md:col-span-2" : ""
              }`}
            >
              <div className="absolute left-6 right-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 transition-colors group-hover:border-white/25">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">{category.title}</h3>
                  <p className="mb-3 text-xs text-white/30">{category.subtitle}</p>
                  <p className="mb-4 text-sm leading-relaxed text-white/50">{category.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1.5 border-t border-white/5 pt-4">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/20" />
                <span className="text-xs text-white/20">内容持续更新中</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs tracking-widest text-white/15">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
