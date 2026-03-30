export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-6 py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <a href="/" className="text-lg font-bold tracking-tight">
          Demo<span className="text-indigo-600">Site</span>
        </a>
        <p className="text-sm text-zinc-500">
          Built with Next.js, React &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
