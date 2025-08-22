"use client"; // Error boundaries must be Client Components

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{error.name}</h2>
      <p className="mb-2 text-sm">{error.message}</p>
      <button onClick={() => redirect("/")}>Return to Home</button>
    </div>
  );
}
