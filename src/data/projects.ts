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
