import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollFadeIn from '../components/ScrollFadeIn';
import Testimonials from '../components/Testimonials';
import { getLocalizedProjects } from '../data/projects';
import { useLang } from '../i18n/LanguageContext';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Services() {
  const { lang, t } = useLang();
  usePageTitle(t.services.title);
  const projects = getLocalizedProjects(lang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-10 text-center md:px-10">
        <h1 className="font-serif text-4xl font-semibold text-teal-dark dark:text-offwhite md:text-5xl">
          {t.services.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-warm">
          {t.services.subtitle}
        </p>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-10 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {t.services.items.map((item, i) => {
          const project = projects.find((p) => p.slug === item.project);
          return (
            <ScrollFadeIn key={item.id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col">
                {project && (
                  <Link to={`/project/${project.slug}`} className="block overflow-hidden rounded-sm">
                    <img
                      src={project.coverImage.thumb}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </Link>
                )}
                <h2 className="mt-5 font-serif text-2xl font-medium text-teal-dark dark:text-offwhite">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-warm">{item.text}</p>
                {project && (
                  <Link
                    to={`/project/${project.slug}`}
                    className="mt-3 text-sm font-medium text-coral underline decoration-coral/40 underline-offset-2 hover:text-coral-light"
                  >
                    {t.services.seeWork}
                  </Link>
                )}
              </article>
            </ScrollFadeIn>
          );
        })}
      </section>

      <section className="mt-24 bg-offwhite py-20 dark:bg-surface-dark/40">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h2 className="text-center font-serif text-3xl font-medium text-teal-dark dark:text-offwhite">
            {t.services.stepsTitle}
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.steps.map((step, i) => (
              <ScrollFadeIn key={step.title} delay={i * 0.08}>
                <li className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-coral font-serif text-lg text-coral">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-teal-dark dark:text-offwhite">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-warm">{step.text}</p>
                </li>
              </ScrollFadeIn>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto mt-24 max-w-2xl px-6 text-center md:px-10">
        <h2 className="font-serif text-3xl font-medium text-teal-dark dark:text-offwhite">
          {t.services.pricesTitle}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-warm">{t.services.pricesText}</p>
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-full bg-coral px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-coral-light"
        >
          {t.services.cta}
        </Link>
      </section>
    </motion.div>
  );
}
