const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn about your business, goals, audience, and competition to create a winning strategy.",
  },
  {
    number: "02",
    title: "Design",
    description: "Custom mockups and wireframes tailored to your brand. You approve every detail before we build.",
  },
  {
    number: "03",
    title: "Develop",
    description: "We bring your design to life with clean, fast, mobile-responsive code built for performance.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Rigorous testing across all devices, then we deploy your site and set up analytics tracking.",
  },
  {
    number: "05",
    title: "Grow",
    description: "Ongoing SEO, content updates, and performance monitoring to keep your traffic climbing.",
  },
];

export function Process() {
  return (
    <section id="process" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Our Process
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            From Idea to{" "}
            <span className="text-accent">First Page Rankings</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            A proven 5-step approach that delivers results every time.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-6 translate-x-full bg-gradient-to-r from-border to-transparent lg:block" />
              )}
              <div className="group cursor-default rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:bg-surface-light">
                <span className="font-heading text-3xl font-extrabold text-primary/30 transition-colors duration-300 group-hover:text-primary/60">
                  {step.number}
                </span>
                <h3 className="mt-3 font-heading text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
