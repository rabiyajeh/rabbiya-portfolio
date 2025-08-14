import React from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#articles", label: "Articles" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10 bg-slate-950/40">
      <nav className="mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-bold tracking-tight text-slate-100">Rabbiya<span className="text-brand-400">.dev</span></a>
        <ul className="hidden md:flex gap-6 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <a className="hover:text-white text-slate-300 transition-colors" href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="glass px-3 py-1.5 text-sm hover:shadow-glow transition-shadow">Hire Me</a>
      </nav>
    </header>
  );
}
