import data from './translations.json';

export type Lang = 'en' | 'he';

export interface Translations {
  nav: { gallery: string; projects: string; about: string; contact: string; brand: string };
  gallery: { title: string; subtitle: string };
  home: { title: string; subtitle: string };
  project: { notFoundTitle: string; notFoundLink: string; backToGallery: string; moreProjects: string; moreFromCategory: string; moreImages: string };
  about: { title: string; bio: string[] };
  contact: { title: string; subtitle: string; email: string; phone: string };
  footer: { rights: string };
}

export default data as Record<Lang, Translations>;
