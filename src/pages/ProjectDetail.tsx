import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { getLocalizedProjects } from '../data/projects';
import MasonryGrid from '../components/MasonryGrid';
import CategoryScroll from '../components/CategoryScroll';
import { useLang } from '../i18n/LanguageContext';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const projects = getLocalizedProjects(lang);
  const project = projects.find((p) => p.slug === slug);
  const otherProjects = projects.filter((p) => p.slug !== slug);
  const [showCoverLightbox, setShowCoverLightbox] = useState(false);

  useEffect(() => {
    if (!showCoverLightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowCoverLightbox(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [showCoverLightbox]);

  const BackArrow = lang === 'he' ? ArrowRight : ArrowLeft;

  if (!project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-teal-dark dark:text-offwhite">{t.project.notFoundTitle}</h1>
          <Link to="/" className="mt-4 inline-block text-coral transition-colors hover:text-coral-light">
            {t.project.notFoundLink}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gray-warm transition-colors hover:text-teal dark:hover:text-coral"
        >
          <BackArrow size={16} />
          {t.project.backToGallery}
        </Link>

        <div className="overflow-hidden rounded-sm">
          <img
            src={project.coverImage}
            alt={project.title}
            className="mx-auto w-full max-w-4xl cursor-pointer object-cover transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => setShowCoverLightbox(true)}
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-coral">
            {project.category}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-teal-dark dark:text-offwhite md:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-warm md:text-lg">
            {project.description}
          </p>
        </div>

        {project.images.length > 0 && (
          <CategoryScroll images={project.images} projectTitle={project.title} />
        )}

        {otherProjects.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-10 text-center font-serif text-2xl font-medium text-teal-dark dark:text-offwhite">
              {t.project.moreProjects}
            </h2>
            <MasonryGrid projects={otherProjects} />
          </section>
        )}
      </div>

      <AnimatePresence>
        {showCoverLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setShowCoverLightbox(false)}
          >
            <button
              onClick={() => setShowCoverLightbox(false)}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={project.coverImage}
              alt={project.title}
              className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
