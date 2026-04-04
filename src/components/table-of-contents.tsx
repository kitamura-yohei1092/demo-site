"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export function TableOfContents({
  items,
}: Readonly<{ items: TocItem[] }>) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="mb-10">
      <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-muted">
        In this article
      </h2>
      <ul className="space-y-1.5 border-l border-border/50">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-1 text-sm transition-colors ${
                item.level === 3 ? "pl-6" : "pl-4"
              } ${
                activeId === item.id
                  ? "border-primary-light text-primary-light"
                  : "border-transparent text-muted hover:border-border hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
