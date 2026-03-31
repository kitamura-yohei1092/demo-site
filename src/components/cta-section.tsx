export function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-surface px-6 py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Ready to{" "}
          <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
            Grow Your Business?
          </span>
        </h2>
        <p className="mt-6 text-lg text-muted">
          Let&apos;s talk about your project. Book a free 30-minute consultation
          and discover how we can help your business get found online.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:markfernando.maligmat@gmail.com"
            className="cursor-pointer rounded-lg bg-gradient-to-r from-accent to-accent-light px-10 py-4 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/40"
          >
            Book Your Free Call
          </a>
          <a
            href="mailto:markfernando.maligmat@gmail.com"
            className="cursor-pointer text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            or email us directly →
          </a>
        </div>
        <p className="mt-6 text-xs text-muted/60">
          No commitment required. No hard sell. Just a friendly chat about your goals.
        </p>
      </div>
    </section>
  );
}
