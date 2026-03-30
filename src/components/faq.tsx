"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Next.js?",
    answer:
      "Next.js is a React framework that enables server-side rendering, static site generation, and other powerful features for building modern web applications.",
  },
  {
    question: "Do I need to know React?",
    answer:
      "Yes, Next.js is built on top of React. Familiarity with React fundamentals like components, props, and state will help you get started quickly.",
  },
  {
    question: "Can I use Next.js for a production app?",
    answer:
      "Absolutely. Next.js is used in production by companies like Netflix, TikTok, Twitch, and many more. It's designed for production-grade applications.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Next.js is open source and free to use. You can deploy it on any hosting provider, or use Vercel for a seamless deployment experience.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="bg-zinc-50 px-6 py-24 dark:bg-zinc-900/50 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
