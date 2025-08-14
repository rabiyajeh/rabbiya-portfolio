import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/10 bg-slate-950/50">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 text-sm text-slate-400">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} Rabbiya Jehangir</div>
          <div className="space-x-4">
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#articles" className="hover:text-white">Articles</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
