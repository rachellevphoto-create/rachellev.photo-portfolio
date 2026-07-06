import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ImageDimensions } from '../hooks/useImageDimensions';
import { useImageDimensions } from '../hooks/useImageDimensions';
import ScrollFadeIn from './ScrollFadeIn';

interface GalleryMasonryProps {
  images: string[];
}

const SM = 640;
const LG = 1024;
const XL = 1536;

function getColumnCount() {
  if (typeof window === 'undefined') return 1;
  const w = window.innerWidth;
  if (w >= XL) return 5;
  if (w >= LG) return 3;
  if (w >= SM) return 2;
  return 1;
}

function subscribeResize(cb: () => void) {
  window.addEventListener('resize', cb);
  return () => window.removeEventListener('resize', cb);
}

function distributeToColumns(
  images: string[],
  dimensions: Map<string, ImageDimensions>,
  columnCount: number,
): number[][] {
  if (columnCount <= 1) return [images.map((_, i) => i)];

  const columns: { items: number[]; height: number }[] = Array.from(
    { length: columnCount },
    () => ({ items: [], height: 0 }),
  );

  images.forEach((src, i) => {
    const dim = dimensions.get(src);
    const aspectRatio = dim ? dim.width / dim.height : 3 / 4;
    const estimatedHeight = 1 / aspectRatio;

    const shortest = columns.reduce((min, col) =>
      col.height <= min.height ? col : min,
    );
    shortest.items.push(i);
    shortest.height += estimatedHeight;
  });

  return columns.map((c) => c.items);
}

export default function GalleryMasonry({ images }: GalleryMasonryProps) {
  const columnCount = useSyncExternalStore(subscribeResize, getColumnCount);
  const { dimensions, loaded } = useImageDimensions(images);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const columnData = useMemo(
    () => distributeToColumns(images, dimensions, columnCount),
    [images, dimensions, columnCount],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight')
        setLightboxIndex((prev) =>
          prev !== null && prev < images.length - 1 ? prev + 1 : prev,
        );
      if (e.key === 'ArrowLeft')
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, images.length]);

  const renderItem = (index: number, position: number) => (
    <ScrollFadeIn
      key={images[index]}
      delay={Math.min(position, 6) * 0.06}
      className="mb-8 break-inside-avoid"
    >
      <button
        onClick={() => setLightboxIndex(index)}
        className="group block w-full cursor-pointer overflow-hidden rounded-sm border-0 bg-transparent p-0"
        aria-label="Open image"
      >
        <motion.img
          src={images[index]}
          alt=""
          loading="lazy"
          className="w-full object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </button>
    </ScrollFadeIn>
  );

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 md:px-10 2xl:max-w-[100rem]">
        {loaded ? (
          <div className="flex gap-8">
            {columnData.map((colItems, ci) => (
              <div key={ci} className="min-w-0 flex-1">
                {colItems.map((index, i) => renderItem(index, i))}
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 2xl:columns-5">
            {images.map((_, i) => renderItem(i, i))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                className="absolute left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {lightboxIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                className="absolute right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[lightboxIndex]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
