import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Fun from "./pages/Fun";
import Contest from "./pages/Contest";

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/fun" element={<Fun />} />
          <Route path="/contest" element={<Contest />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
