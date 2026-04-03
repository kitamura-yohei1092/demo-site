import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-muted">
            Now Accepting New Clients
          </span>
        </div>

        <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          We Build Websites
          <br />
          <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
            That Dominate Google
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Beautiful, fast, SEO-optimized websites designed to attract
          customers and grow your business. From design to first-page
          rankings — we handle everything.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#contact"
            className="cursor-pointer rounded-lg bg-gradient-to-r from-accent to-accent-light px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/40"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/#portfolio"
            className="group cursor-pointer flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-surface"
          >
            View Our Work
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No Contracts
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            100% Satisfaction Guarantee
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free Consultation
          </div>
        </div>
      </div>
    </section>
  );
}
