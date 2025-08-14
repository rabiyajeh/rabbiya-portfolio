import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";

const skills = {
  Frontend: ["React", "Vite", "Tailwind", "Framer Motion", "AOS"],
  Backend: ["PHP", "Laravel(basic)", "Node (basic)"],
  Database: ["MySQL", "MongoDB"],
  Tools: ["Git", "Docker (basic)"],
};

const icons = {
  Frontend: <FaCode />,
  Backend: <FaServer />,
  Database: <FaDatabase />,
  Tools: <FaTools />,
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="section relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title mb-12 text-center"
        >
          Technical <span className="text-sky-400">Skills</span>
        </motion.h2>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([group, list], i) => (
            <motion.div
              key={group}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="glass p-6 rounded-2xl hover:shadow-lg hover:shadow-sky-500/10 transition relative"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center text-xl text-white bg-sky-500/20 rounded-full shadow-inner">
                  {icons[group]}
                </div>
                <h3 className="font-semibold text-lg text-white">{group}</h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {list.map((s, idx) => (
                  <motion.span
                    key={s}
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="px-3 py-1 rounded-full border border-white/10 text-sm bg-white/5 text-white/80 hover:bg-sky-500/20 hover:text-sky-300 transition"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-px rounded-2xl opacity-0 hover:opacity-100 transition duration-500 blur-xl bg-gradient-to-r from-sky-500/20 to-transparent"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      ></motion.div>
    </section>
  );
}
