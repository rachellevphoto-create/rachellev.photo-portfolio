import { useLang } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-24 border-t border-gray-light dark:border-surface-dark">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center md:px-10">
        <p className="text-sm tracking-wide text-gray-warm">
          &copy; {new Date().getFullYear()} Portfolio. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
