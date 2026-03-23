import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';
import ScrollFadeIn from './ScrollFadeIn';

interface GalleryItemProps {
  project: Project;
  index: number;
}

export default function GalleryItem({ project, index }: GalleryItemProps) {
  return (
    <ScrollFadeIn delay={index * 0.08} className="mb-8 break-inside-avoid">
      <Link to={`/project/${project.slug}`} className="group block">
        <div className="overflow-hidden rounded-sm">
          <motion.img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            className="w-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <div className="mt-4 px-1">
          <h3 className="font-serif text-lg font-medium text-teal-dark dark:text-offwhite">
            {project.title}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-gray-warm">
            {project.category}
          </p>
        </div>
      </Link>
    </ScrollFadeIn>
  );
}
