import React from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaTools,
  FaBolt,
  FaPuzzlePiece,
  FaRocket,
  FaShieldAlt,
  FaLinkedin,
  FaGithub,
  FaFileDownload
} from "react-icons/fa";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section id="about" className="section relative overflow-hidden py-20">
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10" />

      {/* Title */}
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="section-title text-center text-4xl font-bold mb-6 text-white"
      >
        About <span className="text-sky-400">Me</span>
      </motion.h2>

      {/* Intro Text */}
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
        className="muted mt-3 max-w-3xl mx-auto text-center text-slate-300"
      >
        Hi, I'm <span className="text-sky-300 font-semibold">Rabbiya Jehangir</span> — a passionate developer who creates modern, interactive, and highly responsive web experiences.  
        I specialize in <span className="text-sky-300 font-semibold">React</span> for front-end, <span className="text-sky-300 font-semibold">WordPress</span> for dynamic CMS solutions, and <span className="text-sky-300 font-semibold">PHP/Laravel</span> for robust back-end systems.  
        I focus on <span className="text-sky-300 font-semibold">performance, accessibility, and clean code</span> to deliver pixel-perfect web applications.
      </motion.p>

      {/* Social & CV */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={2}
        className="flex items-center justify-center gap-5 mt-8"
      >
        <a
          href="https://www.linkedin.com/in/rabbiya-jehangir-8b0a831ab"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400 transition-all"
        >
          <FaLinkedin className="text-sky-400 text-xl" />
        </a>

        <a
          href="https://github.com/rabiyajeh"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400 transition-all"
        >
          <FaGithub className="text-sky-400 text-xl" />
        </a>

        <a
          href="/images/cv.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-all shadow-md hover:shadow-sky-500/20"
        >
          <FaFileDownload /> Download CV
        </a>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
        {/* Expertise */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
          className="relative glass p-6 rounded-2xl border border-white/10 backdrop-blur-lg hover:border-sky-400/30 transition-all"
        >
          <h3 className="font-semibold mb-4 text-lg text-white flex items-center gap-2">
            <FaCode className="text-sky-400" /> My Expertise
          </h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-center gap-2"><FaCode className="text-sky-400" /> Frontend: React, Tailwind, Framer Motion, AOS</li>
            <li className="flex items-center gap-2"><FaCode className="text-sky-400" /> CMS: WordPress, WooCommerce</li>
            <li className="flex items-center gap-2"><FaDatabase className="text-sky-400" /> Backend: PHP, Laravel, REST APIs</li>
            <li className="flex items-center gap-2"><FaTools className="text-sky-400" /> Tools: Git, Vite, CI/CD, SEO Optimization</li>
          </ul>
        </motion.div>

        {/* Achievements & Highlights */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={4}
          whileHover={{ scale: 1.02, rotateX: -2, rotateY: 2 }}
          className="relative glass p-6 rounded-2xl border border-white/10 backdrop-blur-lg hover:border-sky-400/30 transition-all"
        >
          <h3 className="font-semibold mb-4 text-lg text-white flex items-center gap-2">
            <FaBolt className="text-sky-400" /> Highlights
          </h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-center gap-2"><FaRocket className="text-sky-400" /> Built interactive, modern UI/UX projects</li>
            <li className="flex items-center gap-2"><FaPuzzlePiece className="text-sky-400" /> Developed reusable React components & WordPress templates</li>
            <li className="flex items-center gap-2"><FaShieldAlt className="text-sky-400" /> Optimized performance & accessibility across platforms</li>
            <li className="flex items-center gap-2"><FaBolt className="text-sky-400" /> Delivered clean, maintainable, and type-safe code</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
