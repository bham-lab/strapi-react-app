export function newestFirstBy<T>(
  getDate: (item: T) => string | null | undefined,
): (a: T, b: T) => number {
  const tiemOf = (item: T): number => {
    const raw = getDate(item);
    const time = raw ? Date.parse(raw) : Number.NaN;
    return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
  };

  return (a, b) => {
    const timeA = tiemOf(a);
    const timeB = tiemOf(b);
    if (timeA === timeB) return 0;
    return timeA < timeB ? 1 : -1;
  };
}
