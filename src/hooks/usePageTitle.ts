import { useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';

/** Sets the browser tab title, e.g. "About · Racheli Lev Photography". */
export function usePageTitle(title?: string) {
  const { t } = useLang();
  useEffect(() => {
    document.title = title ? `${title} · ${t.nav.brand}` : t.nav.brand;
  }, [title, t.nav.brand]);
}
