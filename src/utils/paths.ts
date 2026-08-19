const base = import.meta.env.BASE_URL || '/';

export function withBase(path: string = ''): string {
  if (!path) return base;
  if (/^(?:[a-z][a-z0-9+.-]*:|#|mailto:|tel:)/i.test(path)) return path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.replace(/^\/+/, '');
  return `${cleanBase}${cleanPath}`;
}

export function absoluteWithBase(path: string = ''): string {
  const relative = withBase(path);
  const origin = import.meta.env.SITE || '';
  if (!origin) return relative;
  return new URL(relative, origin).toString();
}
