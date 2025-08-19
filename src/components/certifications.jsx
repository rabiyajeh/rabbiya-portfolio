import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, Star, Trophy } from "lucide-react";

export default function Certifications() {
  const certifications = [
    {
      title: "Prompt Engineering for Web Developers",
      duration: "07/2024 - Present",
      provider: "Coursera",
      icon: <Trophy className="w-10 h-10 text-yellow-400" />,
      year: "2024",
    },
    {
      title: "Mastering Laravel Framework",
      duration: "04/2024 - 06/2024",
      provider: "Coursera",
      icon: <Award className="w-10 h-10 text-blue-400" />,
      year: "2024",
    },
    {
      title: "WordPress Mastery Course",
      duration: "09/2023 - 01/2024",
      provider: "Hadi E-learning Academy",
      icon: <Star className="w-10 h-10 text-green-400" />,
      year: "2023",
    },
    {
      title: "Foundational C# with Microsoft",
      duration: "07/2023 - 09/2023",
      provider: "Microsoft",
      icon: <Award className="w-10 h-10 text-purple-400" />,
      year: "2023",
    },
    {
      title: "Responsive Web Design",
      duration: "05/2023 - 08/2023",
      provider: "FreeCodeCamp.org",
      icon: <Star className="w-10 h-10 text-pink-400" />,
      year: "2023",
    },
    {
      title: "Web Design and Development",
      duration: "01/2022 - 06/2022",
      provider: "Hazza Institute of Technology",
      icon: <Trophy className="w-10 h-10 text-orange-400" />,
      year: "2022",
    },
  ];

  const iconRefs = useRef([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const newLines = [];
    for (let i = 0; i < iconRefs.current.length - 1; i++) {
      const start = iconRefs.current[i].getBoundingClientRect();
      const end = iconRefs.current[i + 1].getBoundingClientRect();
      const container = iconRefs.current[0]
        .closest(".cert-container")
        .getBoundingClientRect();

      const x1 = start.left + start.width / 2 - container.left;
      const y1 = start.top + start.height / 2 - container.top;
      const x2 = end.left + end.width / 2 - container.left;
      const y2 = end.top + end.height / 2 - container.top;

      const midY = (y1 + y2) / 2;
      newLines.push({
        path: `M${x1},${y1} L${x1},${midY} L${x2},${midY} L${x2},${y2}`,
        id: `line-${i}`,
        year: certifications[i + 1].year,
      });
    }
    setLines(newLines);
  }, [certifications]);

  return (
    <div className="relative w-full py-20 px-10 bg-[#0a0f1c] text-white cert-container">
      <h2 className="text-3xl font-bold mb-16 text-center">
        🎯 Certifications Journey
      </h2>

      {/* SVG Zigzag Path with Animated Gradient & Walking Year Labels */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {lines.map((line, idx) => (
          <g key={idx}>
            {/* Animated Gradient Line */}
            <motion.path
              id={line.id}
              d={line.path}
              fill="none"
              stroke="url(#grad)"
              strokeWidth="3"
              strokeDasharray="12 12"
              animate={{ strokeDashoffset: [50, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Walking Year Label */}
            <text fill="#38bdf8" fontSize="16">
              <textPath href={`#${line.id}`} startOffset="0%">
                <animate
                  attributeName="startOffset"
                  from="0%"
                  to="100%"
                  dur="5s"
                  repeatCount="indefinite"
                />
                {line.year}
              </textPath>
            </text>
          </g>
        ))}
      </svg>

      {/* Certifications */}
      <div className="relative flex flex-col gap-24 items-center">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            ref={(el) => (iconRefs.current[index] = el)}
            className={`relative flex ${
              index % 2 === 0 ? "self-start" : "self-end"
            } group`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Icon Node */}
            <div className="relative z-10 p-4 rounded-full bg-[#111a2b] border border-cyan-400 shadow-lg cursor-pointer">
              {cert.icon}

              {/* Hover Info Card */}
              <div
                className={`absolute ${
                  index % 2 === 0 ? "left-full ml-6" : "right-full mr-6"
                } top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20`}
              >
                <div className="w-64 p-4 bg-[#1b2436] border border-cyan-500 rounded-xl shadow-xl">
                  <h3 className="text-lg font-bold">{cert.title}</h3>
                  <p className="text-sm text-gray-300">{cert.duration}</p>
                  <p className="text-sm text-cyan-400">{cert.provider}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
