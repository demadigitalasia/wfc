"use client";
import { useEffect } from "react";
import Link from "next/link";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="empty-state error-page">
      <p className="eyebrow">A small interruption</p>
      <h1>Let’s take another look.</h1>
      <p>This page did not load as expected.</p>
      <button className="button dark" onClick={reset}>
        Try again
      </button>
      <Link href="/" className="text-link">
        Return home
      </Link>
    </div>
  );
}
