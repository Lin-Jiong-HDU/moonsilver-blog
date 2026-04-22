import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const awards = [
  { icon: "🏅", title: "三次一等奖学金", sub: "杭州电子科技大学" },
  { icon: "🏛️", title: "省政府奖学金", sub: "浙江省人民政府" },
  { icon: "⭐", title: "校三好学生", sub: "杭州电子科技大学" },
  { icon: "🔴", title: "优秀共青团员", sub: "共青团" },
];

const contests = [
  { award: "省一", name: "全国大学生数学建模竞赛" },
  { award: "省二", name: "中国国际服务贸易交易会服务外包创新创业大赛" },
  { award: "省铜", name: "挑战杯全国大学生课外学术科技作品竞赛" },
  { award: "省三", name: "中国人工智能大赛" },
  { award: "国二", name: "APMCM亚太地区数学建模竞赛（中文赛道）" },
  { award: "国二", name: "APMCM亚太地区数学建模竞赛（英文赛道）" },
];

const research = [
  {
    icon: "🎓",
    title: "清华大学科研实习",
    desc: "在清华大学相关实验室参与科研项目，积累学术研究经验。",
  },
  {
    icon: "🌱",
    title: "浙江省新苗人才计划",
    desc: "项目成功立项，获浙江省级大学生科研资助，面向创新型科研人才培养。",
  },
];

const awardColor: Record<string, string> = {
  省一: "bg-yellow-400/10 text-yellow-300 border-yellow-400/30",
  省二: "bg-sky-400/10 text-sky-300 border-sky-400/30",
  省铜: "bg-amber-600/10 text-amber-400 border-amber-600/30",
  省三: "bg-zinc-400/10 text-zinc-300 border-zinc-400/30",
  国二: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
};

function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-white/30"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.5, 1] }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

const particles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
}));

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-px bg-white/5"
          style={{ left: `${(i + 1) * (100 / 7)}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px bg-white/5"
          style={{ top: `${(i + 1) * 20}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium">
      {children}
    </span>
  );
}

function Divider() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="h-px bg-white/5" />
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Breathing orbs */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 900,
            height: 900,
            background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <GridLines />

        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
        ))}

        {/* Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-px bg-white/20 mb-10 mx-auto max-w-xs"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6"
          >
            杭州电子科技大学 · 2024级本科生
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-8xl font-bold tracking-tight"
            >
              你好，
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-8xl font-bold tracking-tight text-white/50"
            >
              我是一个学生。
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-sm md:text-base text-white/50 max-w-md mx-auto leading-relaxed"
          >
            热爱竞赛与科研，持续探索技术的边界。
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            className="mt-14"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-white/20 text-lg"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── About ─── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <FadeUp>
          <SectionLabel>About</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6 leading-tight">
            2024级 · 杭州电子科技大学
          </h2>
          <p className="text-white/50 leading-relaxed max-w-2xl">
            本科在读，专注于数学建模、人工智能与工程实践。在学业之余积极参与各类竞赛与科研项目，
            致力于将理论与实际应用相结合。
          </p>
        </FadeUp>
      </section>

      <Divider />

      {/* ─── Honors ─── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <FadeUp>
          <SectionLabel>Honors</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-12">荣誉奖项</h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {awards.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.08}>
              <div className="flex items-center gap-4 border border-white/8 rounded-xl p-5 hover:border-white/20 transition-colors">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="text-white font-medium text-sm">{a.title}</p>
                  <p className="text-white/35 text-xs mt-0.5">{a.sub}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <Divider />

      {/* ─── Contests ─── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <FadeUp>
          <SectionLabel>Competitions</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-12">竞赛成绩</h2>
        </FadeUp>
        <div className="space-y-3">
          {contests.map((c, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="flex items-center justify-between border-b border-white/8 pb-4 group">
                <div className="flex items-center gap-4">
                  <span className="text-white/20 text-xs w-5 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                    {c.name}
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ml-4 ${
                    awardColor[c.award] ?? "bg-white/5 text-white/40 border-white/10"
                  }`}
                >
                  {c.award}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <Divider />

      {/* ─── Research ─── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <FadeUp>
          <SectionLabel>Research</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-12">科研经历</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {research.map((r, i) => (
            <FadeUp key={r.title} delay={i * 0.1}>
              <div className="border border-white/8 rounded-2xl p-7 hover:border-white/20 transition-all hover:bg-white/[0.02] h-full">
                <span className="text-3xl block mb-4">{r.icon}</span>
                <h3 className="font-semibold text-white mb-2">{r.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-8 py-10 text-center">
        <p className="text-white/20 text-xs tracking-widest">
          © {new Date().getFullYear()} · 杭州电子科技大学
        </p>
      </footer>
    </div>
  );
}
