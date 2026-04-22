import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "主页" },
  { to: "/fun", label: "娱乐" },
  { to: "/contest", label: "竞赛专区" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="text-white font-semibold tracking-widest text-sm uppercase select-none">
        Portfolio
      </Link>

      {/* Desktop */}
      <ul className="hidden md:flex gap-8">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative text-sm tracking-wide transition-colors ${
                  active ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white/60 hover:text-white"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="toggle menu"
      >
        <span className="block w-5 h-px bg-current mb-1 transition-all" />
        <span className="block w-5 h-px bg-current mb-1" />
        <span className="block w-5 h-px bg-current" />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/10 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-4 text-sm tracking-wide border-b border-white/5 transition-colors ${
                  location.pathname === link.to
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
