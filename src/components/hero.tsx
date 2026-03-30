export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white px-6 py-24 dark:from-zinc-900 dark:to-zinc-950 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Built with Next.js
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          Ship faster with a{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            modern stack
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A beautifully crafted demo site showcasing the power of Next.js,
          React, and Tailwind CSS. Start building your next project today.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl"
          >
            Get Started Free
          </a>
          <a
            href="#features"
            className="rounded-full border border-zinc-300 px-8 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2">
        <div className="h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>
    </section>
  );
}
