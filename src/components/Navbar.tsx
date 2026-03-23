import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Languages, Moon, Sun } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, t, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t.nav.gallery },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm dark:bg-bg-dark/90 dark:shadow-none dark:border-b dark:border-surface-dark'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="block overflow-hidden" style={{ width: 140, height: 48 }}>
          <img
            src={theme === 'dark' ? '/images/logo-darkmode.png' : '/images/logo.png'}
            alt={t.nav.brand}
            style={{ width: 140, height: 48, objectFit: 'contain' }}
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <ul className="flex items-center gap-4 md:gap-8">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                    location.pathname === to
                      ? 'text-coral'
                      : 'text-teal dark:text-gray-light hover:text-coral'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full text-teal transition-colors hover:text-coral dark:text-gray-light dark:hover:text-coral"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-full border border-gray-light px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-teal transition-colors hover:border-coral hover:text-coral dark:border-surface-dark dark:text-gray-light dark:hover:border-coral dark:hover:text-coral"
            aria-label="Toggle language"
          >
            <Languages size={14} />
            {lang === 'en' ? 'עב' : 'EN'}
          </button>
        </div>
      </nav>
    </header>
  );
}
