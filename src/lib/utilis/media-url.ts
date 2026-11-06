export function buildMediaUrl(
  path: string | null | undefined,
  baseUrl: string | null,
): string | null {
  if (!path) return null;

  try {
    const url = new URL(path, `${baseUrl?.replace(/\/+$/, "")}/`);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
