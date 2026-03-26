import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

interface CategoryScrollProps {
  images: string[];
  projectTitle: string;
}

export default function CategoryScroll({ images, projectTitle }: CategoryScrollProps) {
  const { lang, t } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [fitsInView, setFitsInView] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const tolerance = 2;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
    setFitsInView(el.scrollWidth <= el.clientWidth + tolerance);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    for (const child of el.children) ro.observe(child);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, images.length]);

  if (images.length === 0) return null;

  const isRTL = lang === 'he';
  const scrollAmount = 240;

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: isRTL ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: isRTL ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const showLeftArrow = isRTL ? canScrollRight : canScrollLeft;
  const showRightArrow = isRTL ? canScrollLeft : canScrollRight;

  return (
    <>
      <section className="mt-20">
        <h2 className="mb-8 text-center font-serif text-2xl font-medium text-teal-dark dark:text-offwhite">
          {t.project.moreFromCategory}
        </h2>

        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-teal shadow-md transition-colors hover:bg-coral hover:text-white dark:bg-surface-dark/90 dark:text-gray-light dark:hover:bg-coral"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-teal shadow-md transition-colors hover:bg-coral hover:text-white dark:bg-surface-dark/90 dark:text-gray-light dark:hover:bg-coral"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div
            ref={scrollRef}
            className={`scrollbar-hide flex gap-4 overflow-x-auto overflow-y-hidden px-8${fitsInView ? ' justify-center' : ''}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', height: 240 }}
          >
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="shrink-0 cursor-pointer border-0 bg-transparent p-0 overflow-hidden rounded-sm"
                style={{ height: 240, maxHeight: 240 }}
              >
                <img
                  src={src}
                  alt={`${projectTitle} ${i + 1}`}
                  loading="lazy"
                  style={{ height: 240, width: 'auto', objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

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
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                className="absolute left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {lightboxIndex < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
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
              alt={`${projectTitle} ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
