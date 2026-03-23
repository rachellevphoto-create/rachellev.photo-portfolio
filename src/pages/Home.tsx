import { motion } from 'framer-motion';
import { getLocalizedProjects } from '../data/projects';
import MasonryGrid from '../components/MasonryGrid';
import HeroSlideshow from '../components/HeroSlideshow';
import { useLang } from '../i18n/LanguageContext';

export default function Home() {
  const { lang, t } = useLang();
  const projects = getLocalizedProjects(lang);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSlideshow />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-10 text-center md:px-10">
        <h1 className="font-serif text-4xl font-semibold text-teal-dark dark:text-offwhite md:text-5xl">
          {t.home.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-warm">
          {t.home.subtitle}
        </p>
      </section>

      <section className="pb-16 pt-8">
        <MasonryGrid projects={projects} />
      </section>
    </motion.div>
  );
}
