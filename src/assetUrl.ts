/** Public asset path with Vite base (e.g. /website/ on GitHub Pages). */
export function assetUrl(path: string): string {
  const normalized = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
}
