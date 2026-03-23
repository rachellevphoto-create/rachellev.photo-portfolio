import { motion } from 'framer-motion';
import ScrollFadeIn from '../components/ScrollFadeIn';
import { useLang } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-2xl px-6 py-8 md:px-10">
        <ScrollFadeIn>
          <h1 className="text-center font-serif text-4xl font-semibold text-teal-dark dark:text-offwhite md:text-5xl">
            {t.about.title}
          </h1>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.1}>
          <div className="mx-auto mt-12 flex justify-center">
            <img
              src="https://picsum.photos/seed/photographer/400/500"
              alt="Photographer portrait"
              className="w-full max-w-sm rounded-sm object-cover"
            />
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.2}>
          <div className="mt-12 space-y-6 text-center text-base leading-relaxed text-gray-warm md:text-lg">
            {t.about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </motion.div>
  );
}
