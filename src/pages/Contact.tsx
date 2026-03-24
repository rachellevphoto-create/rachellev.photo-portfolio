import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import ScrollFadeIn from '../components/ScrollFadeIn';
import { useLang } from '../i18n/LanguageContext';

export default function Contact() {
  const { t } = useLang();

  const contactMethods = [
    {
      icon: Mail,
      label: t.contact.email,
      value: 'rachellev.photo@gmail.com',
      href: 'mailto:rachellev.photo@gmail.com',
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: '(+972)-55-672-0636',
      href: 'tel:+972556720636',
    },
  ];

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
            {t.contact.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-gray-warm">
            {t.contact.subtitle}
          </p>
        </ScrollFadeIn>

        <div className="mt-16 space-y-8">
          {contactMethods.map(({ icon: Icon, label, value, href }, i) => (
            <ScrollFadeIn key={label} delay={i * 0.1}>
              <a
                href={href}
                className="group flex items-center gap-6 rounded-sm border border-gray-light p-6 transition-all duration-300 hover:border-coral hover:shadow-sm dark:border-surface-dark dark:hover:border-coral"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-offwhite text-teal transition-colors group-hover:bg-coral group-hover:text-white dark:bg-surface-dark dark:text-teal-light">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-warm">
                    {label}
                  </p>
                  <p className="mt-1 text-base font-medium text-teal-dark dark:text-offwhite md:text-lg">
                    {value}
                  </p>
                </div>
              </a>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
