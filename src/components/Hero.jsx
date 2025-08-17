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

    for (let i = 0; i < 50; i++) {
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
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#66f6ffaa";
        ctx.fill();

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

// ======== FAKE REACT IDE WITH LETTER-BY-LETTER TYPING ========
const codeLines = [
  "<span class='text-purple-400'>const</span> <span class='text-pink-400'>aboutMe</span> <span class='text-purple-400'>=</span> {",
  "  <span class='text-green-400'>name</span>: <span class='text-yellow-300'>'Rabbiya Jehangir'</span>,",
  "  <span class='text-green-400'>role</span>: <span class='text-yellow-300'>'Full-Stack Web Developer'</span>,",
  "  <span class='text-green-400'>skills</span>: [<span class='text-yellow-300'>'React.js'</span>, <span class='text-yellow-300'>'Python'</span>, <span class='text-yellow-300'>'WordPress'</span>],",
  "  <span class='text-green-400'>location</span>: <span class='text-yellow-300'>'Rawalpindi, PK'</span>,",
  "  <span class='text-green-400'>passion</span>: <span class='text-yellow-300'>'Building clean UIs & scalable apps'</span>,",
  "};",
  "",
  "<span class='text-purple-400'>console</span>.log(<span class='text-yellow-300'>'🚀 Portfolio Loaded...'</span>);",
];

function CodeIDE() {
  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < codeLines.length) {
      if (charIndex < codeLines[lineIndex].length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            // add character by character
            const lines = prev.split("\n");
            lines[lineIndex] =
              (lines[lineIndex] || "") + codeLines[lineIndex][charIndex];
            return lines.join("\n");
          });
          setCharIndex((prev) => prev + 1);
        }, 40); // typing speed per character
        return () => clearTimeout(timeout);
      } else {
        // move to next line
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
        setDisplayedText((prev) => prev + "\n");
      }
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="bg-[#0d1117] text-blue-300 font-mono p-5 rounded-xl shadow-2xl border border-blue-500/30 min-h-[380px]">
      {/* IDE Top Bar */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="ml-3 text-sm text-gray-400">aboutMe.js</span>
      </div>

      {/* Code Typing with Colors */}
      <div className="pl-2">
        <pre
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: displayedText }}
        />
        <span className="inline-block w-2 bg-cyan-400 animate-pulse"></span> {/* blinking cursor */}
      </div>
    </div>
  );
}


// ======== HERO ========
export default function Hero() {
  const words = ["Full-stack Developer", "React & WordPress", "UI/UX Enthusiast"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // Typewriter
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
    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
      reverse ? 40 : 120
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <section className="section relative overflow-hidden bg-black/20">
      <ParticleNetwork />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
      <div className="grid md:grid-cols-2 gap-8 items-center relative z-10 px-6 md:px-16 py-12">
        
        {/* LEFT */}
        <div className="space-y-4">
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 animate-[shine_3s_linear_infinite]"
          >
            Rabbiya Jehangir
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-xl font-mono text-cyan-300">
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
          </motion.p>

          <motion.p {...fadeUp(0.4)} className="text-lg text-slate-200/90">
            I love turning ideas into elegant, functional software solutions 🚀
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="mt-6 flex flex-wrap gap-3">
            <a className="glass px-5 py-2 font-medium rounded-xl hover:shadow-blue-400/50 hover:shadow-lg transition">
              View Projects
            </a>
            <a className="px-5 py-2 font-medium border border-blue-400/30 rounded-xl hover:bg-blue-400/10 transition">
              Contact
            </a>
            <a
              href="/images/cv.pdf"
              download
              className="flex items-center gap-2 px-5 py-2 bg-blue-500/70 rounded-xl hover:bg-blue-500 text-white transition"
            >
              <FaDownload /> CV
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.8)} className="flex gap-4 mt-6 text-2xl text-slate-300">
            <a href="https://github.com/rabiyajeh" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/rabbiya-jehangir-8b0a831ab" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
          </motion.div>
        </div>

        {/* RIGHT - BLUE IDE */}
        <motion.div {...fadeUp(1)} className="rounded-xl overflow-hidden shadow-xl">
          <CodeIDE />
        </motion.div>
      </div>
    </section>
  );
}
