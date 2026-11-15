import projectsData from './projects.json';
import type { Lang } from '../i18n/translations';
import { photo, type Photo } from './images';

export interface ProjectRaw {
  slug: string;
  title: string;
  title_he: string;
  category: string;
  category_he: string;
  description: string;
  description_he: string;
  coverImage: string;
  images: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImage: Photo;
  images: Photo[];
}

export const projectsRaw: ProjectRaw[] = projectsData;

const cache = new Map<Lang, Project[]>();

export function getLocalizedProjects(lang: Lang): Project[] {
  const hit = cache.get(lang);
  if (hit) return hit;
  const list = projectsRaw.map((p) => ({
    slug: p.slug,
    title: lang === 'he' ? p.title_he : p.title,
    category: lang === 'he' ? p.category_he : p.category,
    description: lang === 'he' ? p.description_he : p.description,
    coverImage: photo(p.coverImage),
    images: p.images.map(photo),
  }));
  cache.set(lang, list);
  return list;
}

/** Image description for screen readers and Google, e.g. "Winter Gaze – Portrait". */
export function photoAlt(key: string, lang: Lang): string {
  const projects = getLocalizedProjects(lang);
  const raw = projectsRaw.findIndex((p) => p.coverImage === key || p.images.includes(key));
  if (raw === -1) return '';
  const project = projects[raw];
  return `${project.title} – ${project.category}`;
}

/** English category of the first project that uses this photo, e.g. "Portrait". */
export function photoCategory(key: string): string | undefined {
  return projectsRaw.find((p) => p.coverImage === key || p.images.includes(key))?.category;
}

/** All categories, in the order they first appear, with both names. */
export const categories: { en: string; he: string }[] = (() => {
  const seen = new Map<string, string>();
  for (const p of projectsRaw) if (!seen.has(p.category)) seen.set(p.category, p.category_he);
  return [...seen].map(([en, he]) => ({ en, he }));
})();
