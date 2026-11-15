import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import ScrollFadeIn from '../components/ScrollFadeIn';
import { useLang } from '../i18n/LanguageContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '../data/site';

const fieldClass =
  'mt-2 w-full rounded-sm border border-gray-light bg-white px-4 py-3 text-base text-teal-dark outline-none transition-colors focus:border-coral dark:border-surface-dark dark:bg-surface-dark dark:text-offwhite';
const labelClass = 'block text-xs font-medium uppercase tracking-[0.2em] text-gray-warm';

export default function Contact() {
  const { t } = useLang();
  usePageTitle(t.contact.title);

  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', date: '', message: '' });
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // GitHub Pages has no server, so the form opens the visitor's email app
  // with everything filled in. Nothing is sent to any other service.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      `${t.contact.name}: ${form.name}`,
      `${t.contact.replyEmail}: ${form.email}`,
      form.phone ? `${t.contact.phoneField}: ${form.phone}` : null,
      form.type ? `${t.contact.type}: ${form.type}` : null,
      form.date ? `${t.contact.date}: ${form.date}` : null,
      '',
      form.message,
    ].filter((l) => l !== null);
    const subject = `${t.contact.subject}${form.type ? ` – ${form.type}` : ''} – ${form.name}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const contactMethods = [
    { icon: Mail, label: t.contact.email, value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: t.contact.phone, value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
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

        <ScrollFadeIn delay={0.1}>
          <form onSubmit={onSubmit} className="mt-14 space-y-6">
            <h2 className="font-serif text-2xl text-teal-dark dark:text-offwhite">{t.contact.formTitle}</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>
                {t.contact.name}
                <input required value={form.name} onChange={set('name')} autoComplete="name" className={fieldClass} />
              </label>
              <label className={labelClass}>
                {t.contact.replyEmail}
                <input required type="email" value={form.email} onChange={set('email')} autoComplete="email" className={fieldClass} dir="ltr" />
              </label>
              <label className={labelClass}>
                {t.contact.phoneField}
                <input type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" className={fieldClass} dir="ltr" />
              </label>
              <label className={labelClass}>
                {t.contact.date}
                <input type="date" value={form.date} onChange={set('date')} className={fieldClass} />
              </label>
            </div>
            <label className={labelClass}>
              {t.contact.type}
              <select value={form.type} onChange={set('type')} className={fieldClass}>
                <option value="">—</option>
                {t.services.items.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value={t.contact.typeOther}>{t.contact.typeOther}</option>
              </select>
            </label>
            <label className={labelClass}>
              {t.contact.message}
              <textarea required rows={5} value={form.message} onChange={set('message')} className={fieldClass} />
            </label>
            <div className="flex flex-col items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-coral-light"
              >
                <Send size={16} className="rtl:-scale-x-100" />
                {t.contact.send}
              </button>
              <p className="text-center text-xs text-gray-warm">{t.contact.note}</p>
            </div>
          </form>
        </ScrollFadeIn>

        <h2 className="mt-16 text-center font-serif text-2xl text-teal-dark dark:text-offwhite">{t.contact.orDirect}</h2>
        <div className="mt-8 space-y-6">
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
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-warm">{label}</p>
                  <p className="mt-1 text-base font-medium text-teal-dark dark:text-offwhite md:text-lg" dir="ltr">
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
