import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollFadeIn from '../components/ScrollFadeIn';
import Testimonials from '../components/Testimonials';
import { useLang } from '../i18n/LanguageContext';
import { usePageTitle } from '../hooks/usePageTitle';

export default function About() {
  const { t } = useLang();
  usePageTitle(t.about.title);

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

        <ScrollFadeIn delay={0.2}>
          <div className="mt-12 space-y-6 text-center font-serif text-lg italic leading-relaxed text-teal-dark dark:text-offwhite md:text-xl">
            {t.about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <h2 className="mt-20 text-center font-serif text-3xl font-medium text-teal-dark dark:text-offwhite">
            {t.about.approachTitle}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-gray-warm md:text-lg">
            {t.about.approach.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <h2 className="mt-20 text-center font-serif text-3xl font-medium text-teal-dark dark:text-offwhite">
            {t.about.whatTitle}
          </h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {t.services.items.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/project/${item.project}`}
                  className="inline-block rounded-full border border-gray-light px-5 py-2 text-sm text-teal transition-colors hover:border-coral hover:text-coral dark:border-surface-dark dark:text-gray-light"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </ScrollFadeIn>
      </div>

      <Testimonials />

      <div className="mt-20 text-center">
        <Link
          to="/contact"
          className="inline-block rounded-full bg-coral px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-coral-light"
        >
          {t.about.cta}
        </Link>
      </div>
    </motion.div>
  );
}
