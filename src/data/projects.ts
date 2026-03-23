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
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
}

export const projectsRaw: ProjectRaw[] = projectsData;

export function getLocalizedProjects(lang: Lang): Project[] {
  return projectsRaw.map((p) => ({
    slug: p.slug,
    title: lang === 'he' ? p.title_he : p.title,
    category: lang === 'he' ? p.category_he : p.category,
    description: lang === 'he' ? p.description_he : p.description,
    coverImage: p.coverImage.startsWith('http') ? p.coverImage : `${import.meta.env.BASE_URL}${p.coverImage}`,
  }));
}
