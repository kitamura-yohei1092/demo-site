const testimonials = [
  {
    quote:
      "Next.js has transformed how we build web applications. The developer experience is unmatched.",
    name: "Sarah Chen",
    role: "CTO at TechCorp",
  },
  {
    quote:
      "We migrated from a custom setup to Next.js and saw a 40% improvement in page load times.",
    name: "Marcus Johnson",
    role: "Lead Engineer at StartupXYZ",
  },
  {
    quote:
      "The combination of server components and the app router makes complex apps feel simple.",
    name: "Emily Park",
    role: "Senior Developer at DesignCo",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-zinc-50 px-6 py-24 dark:bg-zinc-900/50 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Testimonials
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Loved by developers everywhere
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <blockquote className="text-zinc-700 dark:text-zinc-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {t.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
