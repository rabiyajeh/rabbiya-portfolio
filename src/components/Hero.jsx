import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { VscFiles, VscSearch, VscSourceControl, VscRunAll, VscExtensions } from "react-icons/vsc";

/*************************
 *  PARTICLE NETWORK BG  *
 *************************/
function ParticleNetwork() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null });
  const rafRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const handleResize = () => {
      setSize();
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // init particles
    particles.current = [];
    for (let i = 0; i < 60; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 1.2 + Math.random() * 1.8,
      });
    }

    const animate = () => {
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
          if (dist < 110) {
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

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/************************************
 *  MINI VS CODE-LIKE IDE COMPONENT *
 ************************************/
const codeLines = [
  "<span class='tkw'>const</span> <span class='tvar'>aboutMe</span> <span class='tkw'>=</span> {",
  "  <span class='tprop'>name</span>: <span class='tstr'>'Rabbiya Jehangir'</span>,",
  "  <span class='tprop'>role</span>: <span class='tstr'>'Full-Stack Web Developer'</span>,",
  "  <span class='tprop'>skills</span>: [<span class='tstr'>'React.js'</span>, <span class='tstr'>'Laravel'</span>, <span class='tstr'>'WordPress'</span>],",
  "  <span class='tprop'>location</span>: <span class='tstr'>'Rawalpindi, PK'</span>,",
  "  <span class='tprop'>passion</span>: <span class='tstr'>'Building clean UIs & scalable apps'</span>,",
  "};",
  "",
  "<span class='tident'>console</span>.log(<span class='tstr'>'🚀 Portfolio Loaded...'</span>);",
];

function CodeIDE() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  // compute displayed HTML up to lineIndex/charIndex
  const displayed = useMemo(() => {
    const lines = [];
    for (let i = 0; i < lineIndex; i++) lines.push(codeLines[i]);
    const current = codeLines[lineIndex] ?? "";
    const slice = current.slice(0, charIndex);
    lines.push(slice);
    return lines.join("\n");
  }, [lineIndex, charIndex]);

  useEffect(() => {
    if (pause) return; // paused between phases

    const typeSpeed = 22; // ms per char (forward)
    const deleteSpeed = 12; // ms per char (backspace)

    if (!deleting) {
      // typing forward
      const fullLine = codeLines[lineIndex] ?? "";
      if (charIndex < fullLine.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), typeSpeed);
        return () => clearTimeout(t);
      } else {
        // end of line
        if (lineIndex < codeLines.length - 1) {
          // next line
          const t = setTimeout(() => {
            setLineIndex((l) => l + 1);
            setCharIndex(0);
          }, 80);
          return () => clearTimeout(t);
        } else {
          // finished all lines → pause → start deleting
          setPause(true);
          const t = setTimeout(() => {
            setPause(false);
            setDeleting(true);
          }, 1600);
          return () => clearTimeout(t);
        }
      }
    } else {
      // deleting backward
      if (charIndex > 0) {
        const t = setTimeout(() => setCharIndex((c) => c - 1), deleteSpeed);
        return () => clearTimeout(t);
      } else if (lineIndex > 0) {
        const prevLen = codeLines[lineIndex - 1].length;
        const t = setTimeout(() => {
          setLineIndex((l) => l - 1);
          setCharIndex(prevLen);
        }, 40);
        return () => clearTimeout(t);
      } else {
        // fully cleared
        setDeleting(false);
        setPause(true);
        const t = setTimeout(() => {
          setPause(false);
          setLineIndex(0);
          setCharIndex(0);
        }, 500);
        return () => clearTimeout(t);
      }
    }
  }, [lineIndex, charIndex, deleting, pause]);

  return (
    <div className="bg-[#0d1117] text-blue-300 font-mono rounded-2xl shadow-2xl border border-cyan-400/20 overflow-hidden">
      {/* Window Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0b0f14] border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="ml-3 text-sm text-gray-400">aboutMe.js</span>
      </div>

      <div className="flex">
        {/* Sidebar (VS Code-ish) */}
        <div className="hidden sm:flex flex-col items-center gap-6 py-4 px-3 bg-[#0a0f12] border-r border-white/5 text-gray-400">
          <VscFiles className="hover:text-cyan-400 transition" size={20} />
          <VscSearch className="hover:text-cyan-400 transition" size={20} />
          <VscSourceControl className="hover:text-cyan-400 transition" size={20} />
          <VscRunAll className="hover:text-cyan-400 transition" size={20} />
          <VscExtensions className="hover:text-cyan-400 transition" size={20} />
        </div>

        {/* Editor Area */}
        <div className="flex-1 grid grid-cols-[auto,1fr] gap-4 p-4">
          {/* Line numbers */}
          <div className="select-none text-right pr-2 text-xs md:text-sm text-gray-500 leading-6">
            {Array.from({ length: codeLines.length || 1 }).map((_, i) => (
              <div key={i}>{String(i + 1).padStart(2, "0")}</div>
            ))}
          </div>

          {/* Code */}
          <div className="relative text-[12px] md:text-[13px] leading-6">
            <pre
              className="whitespace-pre-wrap text-glow"
              dangerouslySetInnerHTML={{ __html: displayed }}
            />
            <span className="cursor-bar" />
          </div>
        </div>
      </div>

      {/* Styling for syntax, cursor & glow */}
      <style>{`
        .tkw{ color:#c792ea } /* purple */
        .tvar{ color:#f7768e } /* pink */
        .tprop{ color:#89ddff } /* cyan-lite */
        .tstr{ color:#ffd580 } /* warm yellow */
        .tident{ color:#82aaff } /* steel blue */
        .text-glow span{ text-shadow:0 0 6px rgba(0,238,255,.45),0 0 12px rgba(0,238,255,.25) }
        .cursor-bar{ display:inline-block; width:2px; height:1.2em; background:linear-gradient(180deg,#00eaff,#66f6ff); box-shadow:0 0 10px #66f6ff; animation:blink .75s infinite, floatY 2.4s ease-in-out infinite; margin-left:2px }
        @keyframes blink{ 50%{ opacity:.1 } }
        @keyframes floatY{ 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-1px) } }
      `}</style>
    </div>
  );
}

/****************
 * HERO SECTION *
 ****************/
export default function Hero() {
  const words = [
    "Full‑stack Developer",
    "React & WordPress",
    "UI/UX Enthusiast",
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // typewriter for subtitle
  useEffect(() => {
    if (index === words.length) return;

    if (!reverse && subIndex === words[index].length) {
      const t = setTimeout(() => setReverse(true), 900);
      return () => clearTimeout(t);
    }
    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const speed = reverse ? 35 : 90;
    const t = setTimeout(() => setSubIndex((s) => s + (reverse ? -1 : 1)), speed);
    return () => clearTimeout(t);
  }, [subIndex, index, reverse]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.6, delay },
  });

  return (
    <section className="relative overflow-hidden">
      <ParticleNetwork />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-0 pointer-events-none" />

      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center px-6 md:px-16 py-16">
        {/* LEFT */}
        <div className="space-y-5">
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 animate-gradient"
          >
            Rabbiya Jehangir
          </motion.h1>

          <motion.p {...fadeUp(.1)} className="text-xl md:text-2xl font-mono gradient-text">
            {words[index].substring(0, subIndex)}
            <span className="ml-1 align-middle inline-block w-[2px] h-[1em] bg-white/80 animate-pulse"></span>
          </motion.p>

          <motion.p {...fadeUp(.2)} className="text-base md:text-lg text-slate-200/90 max-w-prose">
            I love turning ideas into elegant, functional software solutions 🚀
          </motion.p>

          <motion.div {...fadeUp(.3)} className="mt-6 flex flex-wrap gap-3">
            <a className="px-5 py-2 font-medium rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 shadow hover:shadow-cyan-500/20 transition">
              View Projects
            </a>
            <a className="px-5 py-2 font-medium border border-cyan-400/40 rounded-xl hover:bg-cyan-400/10 transition">
              Contact
            </a>
            <a
              href="/images/cv.pdf"
              download
              className="flex items-center gap-2 px-5 py-2 bg-cyan-500/80 rounded-xl hover:bg-cyan-500 text-white transition"
            >
              <FaDownload /> CV
            </a>
          </motion.div>

          <motion.div {...fadeUp(.4)} className="flex gap-5 mt-4 text-2xl text-slate-300">
            <a href="https://github.com/rabiyajeh" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/rabbiya-jehangir-8b0a831ab/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition"><FaLinkedin /></a>
          </motion.div>
        </div>

        {/* RIGHT - IDE */}
        <motion.div {...fadeUp(.5)} className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/5">
          <CodeIDE />
        </motion.div>
      </div>

      {/* local styles for gradients */}
      <style>{`
        .gradient-text{ background:linear-gradient(90deg,#a5f3fc,#93c5fd,#c4b5fd); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; background-size:200% auto; animation:gradmove 6s linear infinite }
        .animate-gradient{ background-size:200% auto; animation:gradmove 8s linear infinite }
        @keyframes gradmove{ 0%{ background-position:0% 50% } 100%{ background-position:100% 50% } }
      `}</style>
    </section>
  );
}
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { VscFiles, VscSearch, VscSourceControl, VscRunAll, VscExtensions } from "react-icons/vsc";

/*************************
 *  PARTICLE NETWORK BG  *
 *************************/
function ParticleNetwork() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null });
  const rafRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const handleResize = () => {
      setSize();
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // init particles
    particles.current = [];
    for (let i = 0; i < 60; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 1.2 + Math.random() * 1.8,
      });
    }

    const animate = () => {
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
          if (dist < 110) {
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

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/************************************
 *  MINI VS CODE-LIKE IDE COMPONENT *
 ************************************/
const codeLines = [
  "<span class='tkw'>const</span> <span class='tvar'>aboutMe</span> <span class='tkw'>=</span> {",
  "  <span class='tprop'>name</span>: <span class='tstr'>'Rabbiya Jehangir'</span>,",
  "  <span class='tprop'>role</span>: <span class='tstr'>'Full-Stack Web Developer'</span>,",
  "  <span class='tprop'>skills</span>: [<span class='tstr'>'React.js'</span>, <span class='tstr'>'Laravel'</span>, <span class='tstr'>'WordPress'</span>],",
  "  <span class='tprop'>location</span>: <span class='tstr'>'Rawalpindi, PK'</span>,",
  "  <span class='tprop'>passion</span>: <span class='tstr'>'Building clean UIs & scalable apps'</span>,",
  "};",
  "",
  "<span class='tident'>console</span>.log(<span class='tstr'>'🚀 Portfolio Loaded...'</span>);",
];

function CodeIDE() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  // compute displayed HTML up to lineIndex/charIndex
  const displayed = useMemo(() => {
    const lines = [];
    for (let i = 0; i < lineIndex; i++) lines.push(codeLines[i]);
    const current = codeLines[lineIndex] ?? "";
    const slice = current.slice(0, charIndex);
    lines.push(slice);
    return lines.join("\n");
  }, [lineIndex, charIndex]);

  useEffect(() => {
    if (pause) return; // paused between phases

    const typeSpeed = 22; // ms per char (forward)
    const deleteSpeed = 12; // ms per char (backspace)

    if (!deleting) {
      // typing forward
      const fullLine = codeLines[lineIndex] ?? "";
      if (charIndex < fullLine.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), typeSpeed);
        return () => clearTimeout(t);
      } else {
        // end of line
        if (lineIndex < codeLines.length - 1) {
          // next line
          const t = setTimeout(() => {
            setLineIndex((l) => l + 1);
            setCharIndex(0);
          }, 80);
          return () => clearTimeout(t);
        } else {
          // finished all lines → pause → start deleting
          setPause(true);
          const t = setTimeout(() => {
            setPause(false);
            setDeleting(true);
          }, 1600);
          return () => clearTimeout(t);
        }
      }
    } else {
      // deleting backward
      if (charIndex > 0) {
        const t = setTimeout(() => setCharIndex((c) => c - 1), deleteSpeed);
        return () => clearTimeout(t);
      } else if (lineIndex > 0) {
        const prevLen = codeLines[lineIndex - 1].length;
        const t = setTimeout(() => {
          setLineIndex((l) => l - 1);
          setCharIndex(prevLen);
        }, 40);
        return () => clearTimeout(t);
      } else {
        // fully cleared
        setDeleting(false);
        setPause(true);
        const t = setTimeout(() => {
          setPause(false);
          setLineIndex(0);
          setCharIndex(0);
        }, 500);
        return () => clearTimeout(t);
      }
    }
  }, [lineIndex, charIndex, deleting, pause]);

  return (
    <div className="bg-[#0d1117] text-blue-300 font-mono rounded-2xl shadow-2xl border border-cyan-400/20 overflow-hidden">
      {/* Window Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0b0f14] border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="ml-3 text-sm text-gray-400">aboutMe.js</span>
      </div>

      <div className="flex">
        {/* Sidebar (VS Code-ish) */}
        <div className="hidden sm:flex flex-col items-center gap-6 py-4 px-3 bg-[#0a0f12] border-r border-white/5 text-gray-400">
          <VscFiles className="hover:text-cyan-400 transition" size={20} />
          <VscSearch className="hover:text-cyan-400 transition" size={20} />
          <VscSourceControl className="hover:text-cyan-400 transition" size={20} />
          <VscRunAll className="hover:text-cyan-400 transition" size={20} />
          <VscExtensions className="hover:text-cyan-400 transition" size={20} />
        </div>

        {/* Editor Area */}
        <div className="flex-1 grid grid-cols-[auto,1fr] gap-4 p-4">
          {/* Line numbers */}
          <div className="select-none text-right pr-2 text-xs md:text-sm text-gray-500 leading-6">
            {Array.from({ length: codeLines.length || 1 }).map((_, i) => (
              <div key={i}>{String(i + 1).padStart(2, "0")}</div>
            ))}
          </div>

          {/* Code */}
          <div className="relative text-[12px] md:text-[13px] leading-6">
            <pre
              className="whitespace-pre-wrap text-glow"
              dangerouslySetInnerHTML={{ __html: displayed }}
            />
            <span className="cursor-bar" />
          </div>
        </div>
      </div>

      {/* Styling for syntax, cursor & glow */}
      <style>{`
        .tkw{ color:#c792ea } /* purple */
        .tvar{ color:#f7768e } /* pink */
        .tprop{ color:#89ddff } /* cyan-lite */
        .tstr{ color:#ffd580 } /* warm yellow */
        .tident{ color:#82aaff } /* steel blue */
        .text-glow span{ text-shadow:0 0 6px rgba(0,238,255,.45),0 0 12px rgba(0,238,255,.25) }
        .cursor-bar{ display:inline-block; width:2px; height:1.2em; background:linear-gradient(180deg,#00eaff,#66f6ff); box-shadow:0 0 10px #66f6ff; animation:blink .75s infinite, floatY 2.4s ease-in-out infinite; margin-left:2px }
        @keyframes blink{ 50%{ opacity:.1 } }
        @keyframes floatY{ 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-1px) } }
      `}</style>
    </div>
  );
}

/****************
 * HERO SECTION *
 ****************/
export default function Hero() {
  const words = [
    "Full‑stack Developer",
    "React & WordPress",
    "UI/UX Enthusiast",
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // typewriter for subtitle
  useEffect(() => {
    if (index === words.length) return;

    if (!reverse && subIndex === words[index].length) {
      const t = setTimeout(() => setReverse(true), 900);
      return () => clearTimeout(t);
    }
    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const speed = reverse ? 35 : 90;
    const t = setTimeout(() => setSubIndex((s) => s + (reverse ? -1 : 1)), speed);
    return () => clearTimeout(t);
  }, [subIndex, index, reverse]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.6, delay },
  });

  return (
    <section className="relative overflow-hidden">
      <ParticleNetwork />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-0 pointer-events-none" />

      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center px-6 md:px-16 py-16">
        {/* LEFT */}
        <div className="space-y-5">
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 animate-gradient"
          >
            Rabbiya Jehangir
          </motion.h1>

          <motion.p {...fadeUp(.1)} className="text-xl md:text-2xl font-mono gradient-text">
            {words[index].substring(0, subIndex)}
            <span className="ml-1 align-middle inline-block w-[2px] h-[1em] bg-white/80 animate-pulse"></span>
          </motion.p>

          <motion.p {...fadeUp(.2)} className="text-base md:text-lg text-slate-200/90 max-w-prose">
            I love turning ideas into elegant, functional software solutions 🚀
          </motion.p>

          <motion.div {...fadeUp(.3)} className="mt-6 flex flex-wrap gap-3">
            <a className="px-5 py-2 font-medium rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 shadow hover:shadow-cyan-500/20 transition">
              View Projects
            </a>
            <a className="px-5 py-2 font-medium border border-cyan-400/40 rounded-xl hover:bg-cyan-400/10 transition">
              Contact
            </a>
            <a
              href="/images/cv.pdf"
              download
              className="flex items-center gap-2 px-5 py-2 bg-cyan-500/80 rounded-xl hover:bg-cyan-500 text-white transition"
            >
              <FaDownload /> CV
            </a>
          </motion.div>

          <motion.div {...fadeUp(.4)} className="flex gap-5 mt-4 text-2xl text-slate-300">
            <a href="https://github.com/rabiyajeh" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/rabbiya-jehangir-8b0a831ab/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition"><FaLinkedin /></a>
          </motion.div>
        </div>

        {/* RIGHT - IDE */}
        <motion.div {...fadeUp(.5)} className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/5">
          <CodeIDE />
        </motion.div>
      </div>

      {/* local styles for gradients */}
      <style>{`
        .gradient-text{ background:linear-gradient(90deg,#a5f3fc,#93c5fd,#c4b5fd); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; background-size:200% auto; animation:gradmove 6s linear infinite }
        .animate-gradient{ background-size:200% auto; animation:gradmove 8s linear infinite }
        @keyframes gradmove{ 0%{ background-position:0% 50% } 100%{ background-position:100% 50% } }
      `}</style>
    </section>
  );
}
