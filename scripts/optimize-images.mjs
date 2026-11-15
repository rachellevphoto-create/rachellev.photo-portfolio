// Makes small, fast copies of the photos in public/images.
// The original photos are never changed.
//
//   public/img/thumb/<name>.webp  – 900px wide, for grids
//   public/img/large/<name>.webp  – up to 2000px, for big views
//   src/data/imageManifest.json   – width/height of each photo
//
// Runs before every build. Only new or changed photos are processed.
import { readdir, stat, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC_DIR = join(ROOT, 'public/images');
const OUT_DIR = join(ROOT, 'public/img');
const MANIFEST = join(ROOT, 'src/data/imageManifest.json');
const SKIP = new Set(['logo.png', 'logo-darkmode.png', 'profile.ico']);

const SIZES = {
  thumb: { width: 900, quality: 74 },
  large: { width: 2000, quality: 80 },
};

async function mtime(path) {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return 0;
  }
}

async function main() {
  let manifest = {};
  try {
    manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
  } catch {
    // first run
  }

  for (const size of Object.keys(SIZES)) {
    await mkdir(join(OUT_DIR, size), { recursive: true });
  }

  const files = (await readdir(SRC_DIR)).filter(
    (f) => /\.(jpe?g|png)$/i.test(f) && !SKIP.has(f),
  );

  const next = {};
  let made = 0;

  for (const file of files) {
    const src = join(SRC_DIR, file);
    const key = `images/${file}`;
    const name = parse(file).name;
    const srcTime = await mtime(src);

    let upToDate = Boolean(manifest[key]);
    for (const size of Object.keys(SIZES)) {
      if ((await mtime(join(OUT_DIR, size, `${name}.webp`))) < srcTime) upToDate = false;
    }
    if (upToDate) {
      next[key] = manifest[key];
      continue;
    }

    // .rotate() applies the camera's EXIF rotation, so sizes match what people see.
    const meta = await sharp(src).metadata();
    const turned = (meta.orientation ?? 1) >= 5;
    const width = turned ? meta.height : meta.width;
    const height = turned ? meta.width : meta.height;

    for (const [size, { width: w, quality }] of Object.entries(SIZES)) {
      await sharp(src)
        .rotate()
        .resize({ width: w, height: w, fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toFile(join(OUT_DIR, size, `${name}.webp`));
    }

    next[key] = { w: width, h: height, name };
    made++;
  }

  const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`images: ${files.length} total, ${made} new/updated`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
