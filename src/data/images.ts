import manifest from './imageManifest.json';

// Each photo has a small "thumb" copy (for grids) and a "large" copy
// (for big views). Both are made by scripts/optimize-images.mjs.
export interface Photo {
  /** key used in projects.json, e.g. "images/2101.jpg" */
  key: string;
  thumb: string;
  large: string;
  /** srcset with both sizes, for <img srcSet> */
  srcSet: string;
  width?: number;
  height?: number;
}

type Entry = { w: number; h: number; name: string };
const entries = manifest as Record<string, Entry>;

const BASE = import.meta.env.BASE_URL;

export function photo(key: string): Photo {
  if (key.startsWith('http')) {
    return { key, thumb: key, large: key, srcSet: '' };
  }
  const entry = entries[key];
  if (!entry) {
    // Not optimized yet: fall back to the original file.
    const url = `${BASE}${key}`;
    return { key, thumb: url, large: url, srcSet: '' };
  }
  const name = encodeURIComponent(entry.name);
  const thumb = `${BASE}img/thumb/${name}.webp`;
  const large = `${BASE}img/large/${name}.webp`;
  const thumbW = Math.min(entry.w, 900, entry.w >= entry.h ? 900 : Math.round((900 * entry.w) / entry.h));
  const largeW = Math.min(entry.w, entry.w >= entry.h ? 2000 : Math.round((2000 * entry.w) / entry.h));
  return {
    key,
    thumb,
    large,
    srcSet: `${thumb} ${thumbW}w, ${large} ${largeW}w`,
    width: entry.w,
    height: entry.h,
  };
}

/** Absolute URL, for share previews (Open Graph). */
export function absoluteUrl(path: string): string {
  return new URL(path, window.location.origin).toString();
}
