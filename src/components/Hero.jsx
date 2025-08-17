import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

// ======== PARTICLE NETWORK ========
function ParticleNetwork() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });

    // Create particles
    for (let i = 0; i < 50; i++) { // reduced density
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1.5 + Math.random() * 1.5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse repel
        if (mouse.current.x && mouse.current.y) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * 0.02;
            p.vy += Math.sin(angle) * 0.02;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#66f6ffaa"; // soft cyan
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(102,246,255,${1 - dist / 120})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }
    animate();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ======== HERO ========
export default function Hero() {
  const words = ["Full-stack Developer", "React & WordPress", "UI/UX Enthusiast"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, commits: 0, experience: 0 });
  const counterRef = useRef(null);
  const [countStarted, setCountStarted] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (index === words.length) return;
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => setSubIndex((prev) => prev + (reverse ? -1 : 1)), reverse ? 40 : 120);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Counter animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countStarted) {
          setCountStarted(true);
          const interval = setInterval(() => {
            setCounters((prev) => ({
              projects: prev.projects < 20 ? prev.projects + 1 : 20,
              commits: prev.commits < 800 ? prev.commits + 20 : 800,
              experience: prev.experience < 2 ? prev.experience + 1 : 2,
            }));
          }, 50);
          setTimeout(() => clearInterval(interval), 2000);
        }
      },
      { threshold: 0.5 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [countStarted]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  const statCard = (label, value, suffix = "") => (
    <motion.div
      whileHover={{ scale: 1.05, borderColor: "rgba(102,246,255,0.8)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass p-4 rounded-xl border border-cyan-400/30 backdrop-blur-md hover:shadow-[0_0_20px_rgba(102,246,255,0.5)] transition"
    >
      <div className="flex justify-between items-center">
        <span className="text-blue-100">{label}</span>
        <span className="text-2xl font-bold text-cyan-300">
          {value}
          {suffix}
        </span>
      </div>
    </motion.div>
  );

  return (
    <section className="section relative overflow-hidden bg-black/20">
      <ParticleNetwork />
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>
      <div className="grid md:grid-cols-2 gap-8 items-center relative z-10 px-6 md:px-16 py-12">
        {/* LEFT */}
        <div className="space-y-4">
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-600 animate-[shine_3s_linear_infinite]"
          >
            Rabbiya Jehangir
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-xl font-mono text-cyan-300">
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
          </motion.p>

          <motion.p {...fadeUp(0.4)} className="text-lg text-slate-200/90">
            Building clean, animated interfaces and scalable backend solutions.
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="mt-6 flex flex-wrap gap-3">
            <a className="glass px-5 py-2 font-medium rounded-xl hover:shadow-cyan-400/50 hover:shadow-lg transition">
              View Projects
            </a>
            <a className="px-5 py-2 font-medium border border-cyan-400/30 rounded-xl hover:bg-cyan-400/10 transition">
              Contact
            </a>
            <a
              href="/images/cv.pdf"
              download
              className="flex items-center gap-2 px-5 py-2 bg-cyan-500/70 rounded-xl hover:bg-cyan-500 text-white transition"
            >
              <FaDownload /> CV
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.8)} className="flex gap-4 mt-6 text-2xl text-slate-300">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
              <FaLinkedin />
            </a>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div {...fadeUp(1)} ref={counterRef} className="space-y-4">
          {statCard("⚡ Projects", counters.projects, "+")}
          {statCard("📈 Commits", counters.commits, "+")}
          {statCard("💼 Experience", counters.experience, " yrs")}
          {statCard("📍 Location", "Rawalpindi, PK")}
        </motion.div>
      </div>
    </section>
  );
}
