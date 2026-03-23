import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocalizedProjects } from '../data/projects';
import GalleryItem from '../components/GalleryItem';
import { useLang } from '../i18n/LanguageContext';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const projects = getLocalizedProjects(lang);
  const project = projects.find((p) => p.slug === slug);
  const otherProjects = projects.filter((p) => p.slug !== slug);

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
            className="mx-auto w-full max-w-4xl object-cover"
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

        {otherProjects.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-10 text-center font-serif text-2xl font-medium text-teal-dark dark:text-offwhite">
              {t.project.moreProjects}
            </h2>
            <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
              {otherProjects.map((p, i) => (
                <GalleryItem key={p.slug} project={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}
