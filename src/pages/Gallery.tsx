import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import GalleryMasonry from '../components/GalleryMasonry';
import { galleryImages } from '../data/galleryImages';
import { categories, photoCategory } from '../data/projects';
import { useLang } from '../i18n/LanguageContext';
import { usePageTitle } from '../hooks/usePageTitle';

const slug = (category: string) => category.toLowerCase().replace(/\s+/g, '-');

export default function Gallery() {
  const { lang, t } = useLang();
  usePageTitle();

  // The chosen type is kept in the address (?type=fashion), so it can be shared.
  const [params, setParams] = useSearchParams();
  const active = categories.find((c) => slug(c.en) === params.get('type'))?.en ?? null;

  const images = useMemo(
    () => (active ? galleryImages.filter((img) => photoCategory(img.key) === active) : galleryImages),
    [active],
  );

  const choose = (category: string | null) =>
    setParams(category ? { type: slug(category) } : {}, { replace: true });

  const buttons = [{ value: null, label: t.gallery.all }, ...categories.map((c) => ({ value: c.en, label: lang === 'he' ? c.he : c.en }))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-10 text-center md:px-10">
        <h1 className="font-serif text-4xl font-semibold text-teal-dark dark:text-offwhite md:text-5xl">
          {t.gallery.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-warm">
          {t.gallery.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label={t.gallery.title}>
          {buttons.map(({ value, label }) => {
            const on = value === active;
            return (
              <button
                key={label}
                onClick={() => choose(value)}
                aria-pressed={on}
                className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
                  on
                    ? 'border-coral bg-coral text-white'
                    : 'border-gray-light text-teal hover:border-coral hover:text-coral dark:border-surface-dark dark:text-gray-light'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="pb-16 pt-4">
        {/* key: start fresh (columns, open photo) when the type changes */}
        <GalleryMasonry key={active ?? 'all'} images={images} />
      </section>
    </motion.div>
  );
}
