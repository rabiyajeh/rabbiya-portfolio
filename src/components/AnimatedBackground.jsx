// SmoothFlowingWordParticles.jsx
import React, { useRef, useEffect } from "react";

export default function SmoothFlowingWordParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const mouse = { x: width / 2, y: height / 2 };
    window.addEventListener("mousemove", e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const gap = 6;
    let particles = [];
    const words = ["Rabbiya", "Full-stack Developer", "React & WordPress"];
    let currentWordIndex = 0;
    let holdFrames = 0;

    function createParticles(text) {
      const tempCanvas = document.createElement("canvas");
      const tCtx = tempCanvas.getContext("2d");
      tempCanvas.width = width;
      tempCanvas.height = height;

      const fontSize = Math.min(width, height) / 5;
      tCtx.font = `${fontSize}px Arial Black`;
      tCtx.fillStyle = "white";
      tCtx.textAlign = "center";
      tCtx.textBaseline = "middle";
      tCtx.fillText(text, width / 2, height / 2);

      const imageData = tCtx.getImageData(0, 0, width, height).data;
      const newParticles = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha > 128) {
            newParticles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              tx: x,
              ty: y,
              size: Math.random() * 1.5 + 0.5,
              hue: Math.random() * 360,
              alpha: Math.random() * 0.25 + 0.2
            });
          }
        }
      }
      return newParticles;
    }

    particles = createParticles(words[currentWordIndex]);

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        // Reduced wavy motion for subtlety
        const waveX = Math.sin(p.ty * 0.03 + Date.now() * 0.001) * 3;
        const waveY = Math.cos(p.tx * 0.03 + Date.now() * 0.001) * 3;

        let dx = p.tx + waveX - p.x;
        let dy = p.ty + waveY - p.y;

        // Mouse ripple effect
        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const dist = Math.sqrt(mx * mx + my * my);
        if (dist < 120) {
          p.x += mx * 0.01;
          p.y += my * 0.01;
        }

        // Smooth morph
        p.x += dx * 0.05;
        p.y += dy * 0.05;

        // Soft rainbow color cycling
        p.hue += 0.4;
        if (p.hue > 360) p.hue = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 55%, ${p.alpha})`;
        ctx.fill();
      });

      // Hold word, then morph to next
      holdFrames++;
      if (holdFrames > 300) { // ~5 seconds
        currentWordIndex = (currentWordIndex + 1) % words.length;
        particles = createParticles(words[currentWordIndex]);
        holdFrames = 0;
      }

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = createParticles(words[currentWordIndex]);
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
