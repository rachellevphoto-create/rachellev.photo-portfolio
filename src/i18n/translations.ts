import data from './translations.json';

export type Lang = 'en' | 'he';

export interface ServiceItem {
  id: string;
  title: string;
  text: string;
  /** slug of a project that shows this kind of work */
  project: string;
}

export interface Translations {
  nav: { gallery: string; projects: string; services: string; about: string; contact: string; brand: string; menu: string };
  gallery: { title: string; subtitle: string; all: string };
  home: { title: string; subtitle: string };
  project: { notFoundTitle: string; notFoundLink: string; backToGallery: string; moreProjects: string; moreFromCategory: string; moreImages: string };
  about: { title: string; bio: string[]; approachTitle: string; approach: string[]; whatTitle: string; cta: string };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
    seeWork: string;
    stepsTitle: string;
    steps: { title: string; text: string }[];
    pricesTitle: string;
    pricesText: string;
    cta: string;
  };
  testimonials: { title: string };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    formTitle: string;
    name: string;
    replyEmail: string;
    phoneField: string;
    type: string;
    typeOther: string;
    date: string;
    message: string;
    send: string;
    note: string;
    subject: string;
    orDirect: string;
  };
  footer: { rights: string; tagline: string; explore: string; contact: string };
  notFound: { title: string; text: string; back: string };
}

export default data as Record<Lang, Translations>;
