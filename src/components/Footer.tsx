import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '../data/site';

export default function Footer() {
  const { t } = useLang();

  const links = [
    { to: '/', label: t.nav.gallery },
    { to: '/projects', label: t.nav.projects },
    { to: '/services', label: t.nav.services },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="mt-24 border-t border-gray-light dark:border-surface-dark">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 text-center md:grid-cols-3 md:px-10 md:text-start">
        <div>
          <p className="font-serif text-xl text-teal-dark dark:text-offwhite">{t.nav.brand}</p>
          <p className="mt-2 text-sm text-gray-warm">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.explore}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">{t.footer.explore}</p>
          <ul className="mt-3 space-y-2">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-gray-warm transition-colors hover:text-coral">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">{t.footer.contact}</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-warm">
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 transition-colors hover:text-coral">
                <Mail size={14} /> {EMAIL}
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 transition-colors hover:text-coral" dir="ltr">
                <Phone size={14} /> {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-light py-6 text-center dark:border-surface-dark">
        <p className="text-xs tracking-wide text-gray-warm">
          &copy; {new Date().getFullYear()} {t.nav.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
