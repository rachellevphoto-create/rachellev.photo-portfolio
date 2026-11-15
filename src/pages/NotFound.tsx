import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  const { t } = useLang();
  usePageTitle(t.notFound.title);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="font-serif text-7xl text-coral">404</p>
        <h1 className="mt-4 font-serif text-3xl text-teal-dark dark:text-offwhite">{t.notFound.title}</h1>
        <p className="mt-3 text-gray-warm">{t.notFound.text}</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-coral px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-coral-light"
        >
          {t.notFound.back}
        </Link>
      </div>
    </div>
  );
}
