import type { Project } from '../data/projects';
import GalleryItem from './GalleryItem';

interface MasonryGridProps {
  projects: Project[];
}

export default function MasonryGrid({ projects }: MasonryGridProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
        {projects.map((project, i) => (
          <GalleryItem key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
