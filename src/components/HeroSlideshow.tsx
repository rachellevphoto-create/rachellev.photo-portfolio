import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getLocalizedProjects } from '../data/projects';
import { useLang } from '../i18n/LanguageContext';

export default function HeroSlideshow() {
  const { lang } = useLang();
  const projects = getLocalizedProjects(lang);
  const [currentIndex, setCurrentIndex] = useState(0);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [advance]);

  const current = projects[currentIndex];

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-10">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm sm:aspect-[2/1] lg:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Link to={`/project/${current.slug}`} className="block h-full w-full">
              <img
                src={current.coverImage}
                alt={current.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-coral-light">
                  {current.category}
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
                  {current.title}
                </h2>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
