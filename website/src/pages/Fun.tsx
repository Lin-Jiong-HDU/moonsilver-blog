import { motion } from "framer-motion";

export default function Fun() {
  return (
    <div className="bg-black text-white min-h-screen pt-20 flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-24 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium">
            Entertainment
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">娱乐</h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-lg">
            放松一下，玩玩小游戏。
          </p>
        </motion.div>

        {/* Jobti card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex items-start"
        >
          <motion.a
            href="/jobti"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative block w-full max-w-sm"
          >
            <div className="border border-white/10 rounded-2xl p-8 hover:border-white/25 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.03)" }}
              />

              <div className="relative">
                {/* Icon area */}
                <div className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/25 transition-colors">
                  <span className="text-2xl">🎮</span>
                </div>

                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                  Jobti
                </h2>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  一个有趣的小游戏，点击进入开始体验。
                </p>

                <div className="flex items-center gap-2 text-white/30 text-xs group-hover:text-white/60 transition-colors">
                  <span>进入游戏</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-white/15 text-xs tracking-widest">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
