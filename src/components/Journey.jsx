import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

/**
 * Timeline data — edit safely. Notice we do NOT store icon functions here.
 * Icons are rendered directly in JSX below (to avoid "object as child" errors).
 */
const timeline = [
  {
    type: "Professional",
    title: "WordPress & React.js Developer + Tech Instructor",
    org: "Tech Education Institute",
    date: "2023 - Present",
    location: "Islamabad, Pakistan",
    description:
      "Leading WordPress and React.js projects while mentoring students in modern web technologies.",
    achievements: [
      "Successfully trained 100+ students in web development",
      "Developed custom WordPress themes and plugins",
      "Built React.js applications for educational institutions",
      "Mentored junior developers and interns",
    ],
  },
  {
    type: "Professional",
    title: "Full-Stack Developer Intern",
    org: "Web Development Agency",
    date: "2022 - 2023",
    location: "Rawalpindi, Pakistan",
    description:
      "Worked on client projects using Laravel, WordPress, and modern JavaScript frameworks.",
    achievements: [
      "Delivered 10+ client websites successfully",
      "Improved website performance by 45%",
      "Learned project management and client communication",
      "Contributed to team coding standards documentation",
    ],
  },
  {
    type: "Education",
    title: "Bachelor of Computer Engineering",
    org: "Institute of Space Technology, Rawalpindi",
    date: "2020 - 2024",
    location: "Rawalpindi, Pakistan",
    description:
      "Graduated with a strong foundation in software development, systems, and modern web technologies.",
    achievements: [
      "CGPA: 3.6 / 4.0",
      "Led multiple web development projects",
      "Active participant in tech seminars and workshops",
      "Contributed to research projects",
    ],
  },
];

const cardMotion = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="mx-auto max-w-5xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-center text-4xl font-extrabold tracking-tight"
        >
          <span className="text-white">My </span>
          <span className="text-sky-400">Journey</span>
        </motion.h2>
        <p className="muted text-center mt-2">
          A timeline of my professional experience and educational background
        </p>

        {/* Timeline container with center line */}
        <div className="relative mt-12">
          {/* Center vertical line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-slate-800/80" />

          <div className="space-y-14">
            {timeline.map((item, i) => {
              const isRight = i % 2 === 0; // first card on right (like your screenshot)
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardMotion}
                  className="relative md:grid md:grid-cols-12 md:gap-6"
                >
                  {/* Marker + connector line */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8">
                    <span className="block w-4 h-4 rounded-full bg-sky-500 ring-4 ring-slate-950/80" />
                  </div>
                  <span
                    className={`hidden md:block absolute top-10 h-[2px] w-8 bg-slate-700 ${
                      isRight ? "left-1/2" : "right-1/2"
                    }`}
                    style={{ transform: isRight ? "translateX(0)" : "translateX(-100%)" }}
                  />

                  {/* Card */}
                  <div
                    className={`md:col-span-6 ${
                      isRight ? "md:col-start-7" : "md:col-start-1"
                    }`}
                  >
                    <div className="glass p-6 shadow-lg hover:shadow-sky-500/10 transition">
                      {/* Type badge */}
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full inline-block mb-3 ${
                          item.type === "Education"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-sky-500/20 text-sky-300"
                        }`}
                      >
                        {item.type}
                      </span>

                      <h3 className="text-xl font-semibold text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sky-300">{item.org}</p>

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mt-3">
                        <span className="flex items-center gap-2">
                          <FaCalendarAlt className="inline-block" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaMapMarkerAlt className="inline-block" />
                          {item.location}
                        </span>
                        <span className="hidden md:inline-flex items-center gap-2">
                          {item.type === "Education" ? (
                            <FaGraduationCap className="inline-block" />
                          ) : (
                            <FaBriefcase className="inline-block" />
                          )}
                          {item.type}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 mt-4">{item.description}</p>

                      {/* Achievements */}
                      <ul className="mt-4 space-y-2 text-slate-300">
                        {item.achievements.map((ach, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-sky-400">🔹</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
