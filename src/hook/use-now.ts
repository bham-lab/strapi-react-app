"use client";

import { useEffect, useState } from "react";

// null on the server and on the first render, then the real time.
// Server and browser draw the same first HTML, so there is no hydration mismatch.
export function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setNow(Date.now()));
    return () => cancelAnimationFrame(frame);
  }, []);

  return now;
}
