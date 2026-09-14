const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * next/image does not automatically prefix a manually-provided `src` string
 * with `basePath` (only statically-imported images get that). GitHub Pages
 * serves this site from a `/my-portfolio` subpath, so public assets referenced
 * by string need the prefix added explicitly.
 */
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
