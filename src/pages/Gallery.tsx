import { motion } from 'framer-motion';
import GalleryMasonry from '../components/GalleryMasonry';
import { galleryImages } from '../data/galleryImages';
import { useLang } from '../i18n/LanguageContext';

export default function Gallery() {
  const { t } = useLang();

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
      </section>

      <section className="pb-16 pt-8">
        <GalleryMasonry images={galleryImages} />
      </section>
    </motion.div>
  );
}
