import { motion } from "framer-motion";
import { useState } from "react";

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

export default function Contest() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium">
            Competition Zone
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">竞赛专区</h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-lg">
            参赛记录、经验分享与资料汇总。
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative border rounded-2xl p-6 transition-all duration-300 cursor-default ${
                hovered === cat.id
                  ? "border-white/25 bg-white/[0.04]"
                  : "border-white/8 bg-white/[0.01]"
              } ${cat.id === "service-outsourcing" ? "md:col-span-2" : ""}`}
            >
              {/* Subtle top accent on hover */}
              <div
                className={`absolute top-0 left-6 right-6 h-px transition-opacity duration-300 ${
                  hovered === cat.id ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                }}
              />

              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                    hovered === cat.id ? "border-white/25" : "border-white/10"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-semibold text-white">{cat.title}</h3>
                  </div>
                  <p className="text-white/30 text-xs mb-3">{cat.subtitle}</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coming soon indicator */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
                <span className="text-white/20 text-xs">内容持续更新中</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-white/15 text-xs tracking-widest">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
