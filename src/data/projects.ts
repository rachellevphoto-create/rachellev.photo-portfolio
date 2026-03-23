import projectsData from './projects.json';
import type { Lang } from '../i18n/translations';

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
  coverImage: string;
  images: string[];
}

export const projectsRaw: ProjectRaw[] = projectsData;

function resolveImageUrl(src: string): string {
  return src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src}`;
}

export function getLocalizedProjects(lang: Lang): Project[] {
  return projectsRaw.map((p) => ({
    slug: p.slug,
    title: lang === 'he' ? p.title_he : p.title,
    category: lang === 'he' ? p.category_he : p.category,
    description: lang === 'he' ? p.description_he : p.description,
    coverImage: resolveImageUrl(p.coverImage),
    images: p.images.map(resolveImageUrl),
  }));
}
