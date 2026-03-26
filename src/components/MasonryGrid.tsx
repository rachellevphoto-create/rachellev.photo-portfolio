import { useMemo, useSyncExternalStore } from 'react';
import type { Project } from '../data/projects';
import type { ImageDimensions } from '../hooks/useImageDimensions';
import { useImageDimensions } from '../hooks/useImageDimensions';
import GalleryItem from './GalleryItem';

interface MasonryGridProps {
  projects: Project[];
}

const SM = 640;
const LG = 1024;

function getColumnCount() {
  if (typeof window === 'undefined') return 1;
  const w = window.innerWidth;
  if (w >= LG) return 3;
  if (w >= SM) return 2;
  return 1;
}

function subscribeResize(cb: () => void) {
  window.addEventListener('resize', cb);
  return () => window.removeEventListener('resize', cb);
}

function distributeToColumns(
  projects: Project[],
  dimensions: Map<string, ImageDimensions>,
  columnCount: number,
): Project[][] {
  if (columnCount <= 1) return [projects];

  const columns: { items: Project[]; height: number }[] = Array.from(
    { length: columnCount },
    () => ({ items: [], height: 0 }),
  );

  for (const project of projects) {
    const dim = dimensions.get(project.coverImage);
    const aspectRatio = dim ? dim.width / dim.height : 3 / 4;
    const estimatedHeight = 1 / aspectRatio;

    const shortest = columns.reduce((min, col) =>
      col.height <= min.height ? col : min,
    );
    shortest.items.push(project);
    shortest.height += estimatedHeight;
  }

  return columns.map((c) => c.items);
}

export default function MasonryGrid({ projects }: MasonryGridProps) {
  const columnCount = useSyncExternalStore(subscribeResize, getColumnCount);

  const coverUrls = useMemo(
    () => projects.map((p) => p.coverImage),
    [projects],
  );

  const { dimensions, loaded } = useImageDimensions(coverUrls);

  const columnData = useMemo(
    () => distributeToColumns(projects, dimensions, columnCount),
    [projects, dimensions, columnCount],
  );

  if (!loaded) {
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

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <div className="flex gap-8">
        {columnData.map((colItems, ci) => (
          <div key={ci} className="flex-1 min-w-0">
            {colItems.map((project, i) => (
              <GalleryItem key={project.slug} project={project} index={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
