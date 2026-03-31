const stats = [
  { value: "50+", label: "Websites Launched" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24/7", label: "Dedicated Support" },
  { value: "5.0", label: "Average Rating" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-surface px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-4xl font-extrabold text-transparent bg-gradient-to-r from-primary-light to-accent bg-clip-text sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
