"use client";

import { useEffect } from "react";

export default function SectorsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sectors page error:", error);
  }, [error]);

  return (
    <main>
      <h1>Sectors</h1>
      <p role="alert">we couldn`t load the sectors. Please try again.</p>

      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
