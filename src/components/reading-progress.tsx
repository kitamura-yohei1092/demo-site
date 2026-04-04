"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const article = document.querySelector("article");
      if (!article) return;

      const { top, height } = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrolled = Math.min(
        Math.max(-top / (height - viewportHeight), 0),
        1
      );
      setProgress(scrolled * 100);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div className="fixed top-0 left-0 z-50 h-0.5 w-full bg-border/30">
      <div
        className="h-full bg-gradient-to-r from-primary to-primary-light transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
