import { useState, useEffect, useRef } from 'react';

export interface ImageDimensions {
  width: number;
  height: number;
}

export function useImageDimensions(urls: string[]) {
  const [dimensions, setDimensions] = useState<Map<string, ImageDimensions>>(
    () => new Map(),
  );
  const [loaded, setLoaded] = useState(false);
  const prevKey = useRef('');

  useEffect(() => {
    const key = urls.join('\n');
    if (key === prevKey.current) return;
    prevKey.current = key;

    if (urls.length === 0) {
      setDimensions(new Map());
      setLoaded(true);
      return;
    }

    setLoaded(false);
    let cancelled = false;
    const results = new Map<string, ImageDimensions>();
    let pending = urls.length;

    const onSettled = () => {
      if (cancelled) return;
      pending--;
      if (pending <= 0) {
        setDimensions(new Map(results));
        setLoaded(true);
      }
    };

    for (const url of urls) {
      const img = new Image();
      img.onload = () => {
        results.set(url, {
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        onSettled();
      };
      img.onerror = () => {
        onSettled();
      };
      img.src = url;
    }

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return { dimensions, loaded };
}
