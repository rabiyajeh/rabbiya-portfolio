import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaPalette, FaRocket } from "react-icons/fa";

const items = [
  {
    title: "Frontend Development",
    desc: "React, Tailwind CSS, Framer Motion, accessibility-first design.",
    icon: <FaCode />,
    color: "from-sky-400 to-blue-500",
  },
  {
    title: "Backend APIs",
    desc: "Laravel, REST, authentication, clean architecture, and scaling.",
    icon: <FaServer />,
    color: "from-emerald-400 to-green-500",
  },
  {
    title: "UI Engineering",
    desc: "Design systems, theming, glassmorphism, and pixel-perfect UIs.",
    icon: <FaPalette />,
    color: "from-pink-400 to-rose-500",
  },
  {
    title: "Performance",
    desc: "Audits, code-splitting, caching, and load time optimization.",
    icon: <FaRocket />,
    color: "from-yellow-400 to-orange-500",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Services() {
  return (
    <section id="services" className="section relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title mb-12 text-center"
        >
          My <span className="text-sky-400">Services</span>
        </motion.h2>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-white/5 hover:from-white/30 hover:to-white/10 transition-all duration-300"
            >
              <div className="glass rounded-2xl p-6 flex flex-col items-center text-center h-full relative overflow-hidden">
                {/* Icon Circle */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${it.color} text-white text-2xl shadow-lg shadow-black/20`}
                >
                  {it.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className={`mt-4 font-bold text-lg bg-gradient-to-r ${it.color} bg-clip-text text-transparent`}
                >
                  {it.title}
                </h3>

                {/* Description */}
                <p className="muted mt-2 text-sm">{it.desc}</p>

               
                {/* Glow effect */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background floating blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      ></motion.div>
    </section>
  );
}
