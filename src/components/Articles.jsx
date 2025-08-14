import React from "react";
import { motion } from "framer-motion";

const articles = [
  {
    id: 1,
    title: "HTML basic syntax and Elements",
    excerpt:
      "This is a short excerpt for Blog Post 1. Discover more about the latest trends in web development and programming.",
    img: "/images/html.png",
    url: "https://learn-frontenddev.blogspot.com/2022/08/html-basic-syntax-and-elements.html",
    tags: ["React", "JavaScript", "Web Development"],
  },
  {
    id: 2,
    title: "Getting Started with Android Development",
    excerpt:
      "This is a short excerpt for Blog Post 2. Learn about the best practices for writing clean and maintainable code in Python.",
    img: "/images/android.png",
    url: "https://learn-frontenddev.blogspot.com/2024/07/getting-started-with-android-development.html",
    tags: ["Python", "Coding", "Best Practices"],
  },
  {
    id: 3,
    title: "Mastering Firebase for Android Apps",
    excerpt:
      "This is a short excerpt for Blog Post 3. Explore the latest innovations in AI and machine learning technology.",
    img: "/images/firebase.jpg",
    url: "https://learn-frontenddev.blogspot.com/2024/07/mastering-firebase-for-android-apps.html",
    tags: ["AI", "Machine Learning", "Technology"],
  },
   {
    id: 4,
    title: "Mastering Firebase for Android Apps",
    excerpt:
      "This is a short excerpt for Blog Post 3. Explore the latest innovations in AI and machine learning technology.",
    img: "/images/firebase.jpg",
    url: "https://learn-frontenddev.blogspot.com/2024/07/mastering-firebase-for-android-apps.html",
    tags: ["AI", "Machine Learning", "Technology"],
  },
];

export default function Articles() {
  return (
    <section id="articles" className="section py-20 relative">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl font-extrabold text-white">
            Latest <span className="text-sky-400">Articles</span>
          </h2>
          <a
            href="https://learn-frontenddev.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-sky-300 hover:text-sky-200 transition"
          >
            View all
          </a>
        </div>

        {/* Featured Article: Half Image, Half Content */}
        <motion.a
          href={articles[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative md:flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20 hover:shadow-sky-500/50 transition-all duration-500 mb-8"
          whileHover={{ scale: 1.02 }}
        >
          {/* Left: Image */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img
              src={articles[0].img}
              alt={articles[0].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-center bg-white/5 backdrop-blur-md">
            <h3 className="text-2xl font-semibold text-white">{articles[0].title}</h3>
            <p className="text-sky-100/80 mt-3">{articles[0].excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {articles[0].tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-200 hover:from-sky-400/40 hover:to-blue-400/40 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <span className="inline-block px-4 py-2 border border-white/15 rounded-md text-sm text-sky-200 hover:bg-white/10 transition">
                Read More
              </span>
            </div>
          </div>
        </motion.a>

        {/* Side Articles */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(1).map((a) => (
            <motion.a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20 hover:shadow-sky-500/50 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-40 overflow-hidden rounded-t-2xl">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-4 flex flex-col justify-between">
                <h4 className="text-lg font-semibold text-white group-hover:text-sky-400 transition">
                  {a.title}
                </h4>
                <p className="text-sky-100/80 mt-2 text-sm line-clamp-3">{a.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {a.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-1 rounded-full bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-200 hover:from-sky-400/40 hover:to-blue-400/40 transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
