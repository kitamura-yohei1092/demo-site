import Link from "next/link";

const projects = [
  {
    title: "Oceanic Resort & Spa",
    category: "Hospitality",
    description: "Complete website redesign that boosted online bookings by 180%. SEO-optimized with local search dominance.",
    results: "+180% Bookings",
    gradient: "from-blue-600/20 to-cyan-600/20",
  },
  {
    title: "FreshBite Delivery",
    category: "Food & Beverage",
    description: "Custom e-commerce platform with integrated ordering system. First page of Google within 3 months.",
    results: "#1 Google Ranking",
    gradient: "from-green-600/20 to-emerald-600/20",
  },
  {
    title: "Apex Fitness Studio",
    category: "Health & Fitness",
    description: "Modern landing page with membership signup flow. Conversion rate increased from 2% to 8.5%.",
    results: "4.2x Conversions",
    gradient: "from-orange-600/20 to-red-600/20",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-surface px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Our Work
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Results That{" "}
            <span className="text-primary-light">Speak for Themselves</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Real projects, real outcomes. Here&apos;s what we&apos;ve built for our clients.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-primary/30"
            >
              {/* Placeholder visual */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <span className="font-heading text-2xl font-bold text-white/20">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary-light">
                    {project.category}
                  </span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {project.results}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-medium text-primary-light transition-all hover:bg-primary/10 hover:border-primary/50"
          >
            View All Projects
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
