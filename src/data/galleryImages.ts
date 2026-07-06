import { projectsRaw } from './projects';

// Gather every image referenced by the projects (cover + gallery images),
// de-duplicated while preserving first-seen order.
const files: string[] = (() => {
  const seen = new Set<string>();
  const collected: string[] = [];
  for (const project of projectsRaw) {
    for (const src of [project.coverImage, ...project.images]) {
      if (!seen.has(src)) {
        seen.add(src);
        collected.push(src);
      }
    }
  }
  return collected;
})();

// Small deterministic PRNG (mulberry32) so the "mix" is a single fixed order
// that stays identical across reloads and visitors, yet is non-alphabetical.
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SHUFFLE_SEED = 20260706;

function constantShuffle<T>(input: T[]): T[] {
  const arr = [...input];
  const rand = mulberry32(SHUFFLE_SEED);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function resolveImageUrl(src: string): string {
  return src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src}`;
}

export const galleryImages: string[] = constantShuffle(files).map(resolveImageUrl);
