import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | YM Tech",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <a
              href="/admin"
              className="font-heading text-lg font-bold tracking-tight"
            >
              YM<span className="text-primary-light">Tech</span>
              <span className="ml-2 rounded bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-light">
                Admin
              </span>
            </a>
            <nav className="flex gap-4">
              <a
                href="/admin"
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                Posts
              </a>
              <a
                href="/admin/projects"
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                Projects
              </a>
              <a
                href="/blog"
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Blog &rarr;
              </a>
              <a
                href="/portfolio"
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Portfolio &rarr;
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
