import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaLanguage } from "react-icons/fa";

// Floating particle effect for inputs
function InputParticles({ parentRef }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = parentRef.current.offsetWidth;
      canvas.height = parentRef.current.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 15; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1 + Math.random() * 2,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#3b82f6";

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();

    return () => window.removeEventListener("resize", resize);
  }, [parentRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function Contact() {
  const [activeInput, setActiveInput] = useState(false);
  const formRef = useRef(null);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  const floatIcon = {
    initial: { y: 0 },
    animate: { y: [0, -5, 0] },
    transition: { duration: 2, repeat: Infinity, repeatType: "loop" },
  };

  return (
    <section id="contact" className="section relative overflow-hidden z-10">
      <motion.h2 {...fadeUp(0)} className="section-title mb-10 text-4xl font-bold text-white">
        Let's Work Together
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 relative z-10">
        {/* Contact Info */}
        <motion.div {...fadeUp(0.2)} className="glass p-8 space-y-6">
          <h3 className="text-2xl font-semibold text-white">Get in Touch</h3>
          <ul className="space-y-4 text-slate-300 text-sm">
            <motion.li {...floatIcon} className="flex items-center gap-3">
              <FaEnvelope className="text-blue-400 text-lg" /> rabbiyajehangir1@gmail.com
            </motion.li>
            <motion.li {...floatIcon} className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-400 text-lg" /> Rawalpindi, Pakistan
            </motion.li>
            <motion.li {...floatIcon} className="flex items-center gap-3">
              <FaLanguage className="text-blue-400 text-lg" /> English, Urdu, French
            </motion.li>
          </ul>
        </motion.div>

        {/* Contact Form */}
        <motion.div {...fadeUp(0.4)} className="relative glass p-8 space-y-5" ref={formRef}>
          {activeInput && <InputParticles parentRef={formRef} />}
          {["Name", "Email", "Message"].map((field, i) => (
            <div key={i} className="relative">
              {field !== "Message" ? (
                <input
                  type={field === "Email" ? "email" : "text"}
                  required
                  onFocus={() => setActiveInput(true)}
                  onBlur={() => setActiveInput(false)}
                  className="peer w-full bg-transparent border border-white/20 rounded-md px-4 py-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition text-white"
                />
              ) : (
                <textarea
                  rows={4}
                  required
                  onFocus={() => setActiveInput(true)}
                  onBlur={() => setActiveInput(false)}
                  className="peer w-full bg-transparent border border-white/20 rounded-md px-4 py-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition resize-none text-white"
                />
              )}
              <label className="absolute left-4 top-3 text-sm text-slate-400 peer-focus:top-[-0.5rem] peer-focus:text-xs peer-focus:text-blue-400 transition-all pointer-events-none">
                {field}
              </label>
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246,0.5)" }}
            className="w-full px-5 py-3 font-medium border border-blue-400 rounded-md text-white hover:bg-blue-500/10 transition"
          >
            Send Message
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
