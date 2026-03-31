const testimonials = [
  {
    quote:
      "YM Tech completely transformed our online presence. Our website went from invisible to ranking on the first page of Google in just 2 months. The ROI has been incredible.",
    name: "Carlos Rivera",
    role: "Owner, Rivera Dental Clinic",
    rating: 5,
  },
  {
    quote:
      "Professional, creative, and incredibly responsive. They didn't just build us a website — they built us a lead generation machine. Our inquiries tripled.",
    name: "Angela Santos",
    role: "CEO, Santos Real Estate",
    rating: 5,
  },
  {
    quote:
      "We tried three other agencies before finding YM Tech. The difference is night and day. They actually understand SEO and deliver on their promises.",
    name: "James Tan",
    role: "Founder, Pacific Trading Co.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Testimonials
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Our Clients{" "}
            <span className="text-accent">Love What We Do</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-primary/30"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mt-5 text-sm leading-relaxed text-zinc-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-sm font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
