import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { FaProjectDiagram, FaCodeBranch, FaUserTie, FaAward } from "react-icons/fa";

const stats = [
  { label: "Projects", value: 20, suffix: "+", icon: <FaProjectDiagram /> },
  { label: "Commits", value: 800, suffix: "+", icon: <FaCodeBranch /> },
  { label: "Clients", value: 12, suffix: "", icon: <FaUserTie /> },
  { label: "Awards", value: 2, suffix: "", icon: <FaAward /> },
];

// Counter component (fixed)
function Counter({ target, suffix }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    });
    return controls.stop;
  }, [target, count]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function ByNumbers() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="section py-20">
      {/* Title */}
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="section-title text-center text-4xl font-bold mb-10 text-white"
      >
        By The <span className="text-sky-400">Numbers</span>
      </motion.h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="glass p-6 rounded-2xl text-center border border-white/10 backdrop-blur-lg hover:border-sky-400/30 transition-all shadow-lg"
          >
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-3 rounded-full bg-sky-500/20 text-sky-400 text-2xl">
              {s.icon}
            </div>
            <div className="text-3xl font-bold text-white">
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <div className="muted mt-1 text-slate-400">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
