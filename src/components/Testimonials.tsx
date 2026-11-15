import testimonials from '../data/testimonials.json';
import ScrollFadeIn from './ScrollFadeIn';
import { useLang } from '../i18n/LanguageContext';

// Add real quotes from clients to src/data/testimonials.json, for example:
// [{ "name": "Dana", "name_he": "דנה", "text": "...", "text_he": "..." }]
// The section stays hidden while the list is empty.
interface Testimonial {
  /** may be empty – then no name is shown */
  name: string;
  name_he?: string;
  text: string;
  text_he?: string;
}

export default function Testimonials() {
  const { lang, t } = useLang();
  const list = testimonials as Testimonial[];
  if (list.length === 0) return null;

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 md:px-10">
      <h2 className="text-center font-serif text-3xl font-medium text-teal-dark dark:text-offwhite">
        {t.testimonials.title}
      </h2>
      <div className={`mt-12 grid gap-8 md:grid-cols-2 ${list.length % 3 === 0 ? 'lg:grid-cols-3' : ''}`}>
        {list.map((item, i) => (
          <ScrollFadeIn
            key={i}
            delay={i * 0.08}
            // Odd count in two columns: center the last card.
            className={
              list.length % 3 !== 0 && list.length % 2 === 1 && i === list.length - 1
                ? 'md:col-span-2 md:mx-auto md:w-1/2'
                : ''
            }
          >
            <figure className="h-full rounded-sm border border-gray-light p-8 dark:border-surface-dark">
              <blockquote className="font-serif text-lg italic leading-relaxed text-teal-dark dark:text-offwhite">
                “{lang === 'he' && item.text_he ? item.text_he : item.text}”
              </blockquote>
              {(lang === 'he' ? item.name_he || item.name : item.name) && (
                <figcaption className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-coral">
                  {lang === 'he' ? item.name_he || item.name : item.name}
                </figcaption>
              )}
            </figure>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  );
}
