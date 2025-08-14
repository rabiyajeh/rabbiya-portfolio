import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    id: 1,
    name: "Dynamic React Landing Page",
    desc: "A visually stunning React landing page with smooth animations, moving gradient background, and modern design elements.",
    img: "/images/landing-page.png",
    category: "Web Development",
    link: "https://landing-page-henna-pi-82.vercel.app/",
  },
  {
    id: 2,
    name: "Interactive CSS Layout",
    desc: "An interactive website showcasing advanced CSS techniques and JavaScript functionalities with dynamic content and engaging UX.",
    img: "/images/Web3.png",
    category: "Web Development",
    link: "https://example.com/project2",
  },
  {
    id: 3,
    name: "Be Productive App",
    desc: "A mobile app for social networking, allowing users to connect, share posts, and interact in real-time. Built for Android using Java.",
    img: "/images/beproductive.png",
    category: "Mobile Apps",
    link: "https://github.com/rabiyajeh/social-media-networking-android-app",
  },
  {
    id: 4,
    name: "Your Fun Store (E-Commerce)",
    desc: "Comprehensive Laravel-based e-commerce platform with product listings, shopping cart, and user authentication.",
    img: "/images/ecom.png",
    category: "Web Development",
    link: "https://github.com/rabiyajeh/Laravel-Ecommerce_App",
  },
  {
    id: 5,
    name: "Inventory Management System",
    desc: "Laravel-based system to track stock, manage orders, and provide real-time updates for small to medium businesses.",
    img: "/images/ims.png",
    category: "Web Development",
    link: "https://github.com/rabiyajeh/POS-Laravel-Project",
  },
  {
    id: 6,
    name: "MediQuick Doctor Assistant",
    desc: "Advanced web app assisting doctors with patient management and scheduling, including appointments and consultation tools.",
    img: "/images/doc.jpg",
    category: "Web Development",
    link: "https://github.com/rabiyajeh/MediQuick/tree/master",
  },
  {
    id: 7,
    name: "JS Motion Effects",
    desc: "HTML, CSS, and JavaScript website using GSAP and locomotive motion for smooth interactive effects.",
    img: "/images/js website.png",
    category: "Web Development",
    link: "https://js-project-drab.vercel.app/",
  },
  {
    id: 8,
    name: "React Countdown Timer",
    desc: "Customizable React-based countdown timer with dynamic features, allowing precise countdowns for events.",
    img: "/images/Countdown Timer.png",
    category: "Web Development",
    link: "https://countdown-timer-react-mu.vercel.app/",
  },
  {
    id: 9,
    name: "FoodGraana (MERN Stack)",
    desc: "Full-stack MERN online food ordering platform offering seamless browsing, ordering, and checkout experiences.",
    img: "/images/foodgraana.png",
    category: "Web Development",
    link: "https://github.com/rabiyajeh/foodgraan",
  },
 
];


const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Web Development", "Mobile Apps"];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute top-10 left-10 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
        >
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
            <span className="text-sky-400">Featured</span> Projects
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileTap={{ scale: 0.9 }}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium overflow-hidden transition-all ${
                  filter === cat
                    ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-500/30"
                    : "bg-white/5 text-sky-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((p, i) => (
              <motion.article
                key={p.name}
                custom={i}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  rotateX: 2,
                  rotateY: -2,
                  boxShadow: "0 15px 50px rgba(56,189,248,0.25)",
                }}
                className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
                </div>

                <div className="p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg text-white">{p.name}</h3>
                    <a
                      href={p.link}
                      className="text-sky-400 hover:text-sky-300 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                  <p className="text-sky-100/80 mt-3 flex-1">{p.desc}</p>
                  <span className="mt-4 inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r from-sky-500/40 to-blue-500/40 text-sky-100">
                    {p.category}
                  </span>
                  <div className="mt-5">
                    <a
                      className="inline-block px-4 py-2 border border-white/15 rounded-md text-sm hover:bg-white/10 transition"
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
