"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most projects are completed within 2-4 weeks, depending on complexity. A simple 5-page site typically takes 2 weeks, while larger projects with custom features may take 4-6 weeks. We'll give you a clear timeline during our free consultation.",
  },
  {
    question: "What makes your SEO different from other agencies?",
    answer:
      "We focus on sustainable, white-hat SEO strategies that deliver long-term results. Unlike agencies that promise overnight rankings, we build a solid foundation with technical SEO, quality content, and authoritative backlinks. Our clients see measurable improvements within 60-90 days.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. Our Growth plan includes 30 days of free maintenance, and our Enterprise plan comes with ongoing support. We also offer monthly maintenance plans starting at $99/month for security updates, backups, and content changes.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes! We regularly redesign existing websites to improve their look, performance, and search rankings. We'll preserve your existing content and SEO equity while giving your site a modern, conversion-focused makeover.",
  },
  {
    question: "What if I'm not satisfied with the design?",
    answer:
      "Your satisfaction is guaranteed. We work collaboratively — you'll see and approve mockups before any development begins. All our plans include revision rounds, and we don't stop until you're 100% happy with the result.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            FAQ
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Got Questions?{" "}
            <span className="text-primary-light">We Have Answers</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className={`rounded-xl border transition-colors duration-200 ${
                openIndex === i
                  ? "border-primary/30 bg-surface-light"
                  : "border-border bg-surface"
              }`}
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="pr-4 text-sm font-semibold text-foreground">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-muted">
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
