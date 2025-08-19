import React, { useEffect } from "react";
import AnimatedBackground from "./components/AnimatedBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ByNumbers from "./components/ByNumbers.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Skills from "./components/Skills.jsx";
import Journey from "./components/Journey.jsx";
import Projects from "./components/Projects.jsx";
import Articles from "./components/Articles.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Certifications from "./components/Certifications.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80, easing: "ease-out" });
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <Hero />
        <ByNumbers />
        <About />
        <Services />
        <Skills />
        <Journey />
        <Projects />
         <Certifications />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
