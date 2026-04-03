import Link from "next/link";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Web Design", href: "/#services" },
      { label: "SEO", href: "/#services" },
      { label: "Digital Marketing", href: "/#services" },
      { label: "Content Strategy", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#process" },
      { label: "Portfolio", href: "/#portfolio" },
      { label: "FAQ", href: "/#faq" },
      { label: "Guestbook", href: "/guestbook" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575352588554" },
      { label: "Email Us", href: "mailto:markfernando.maligmat@gmail.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="font-heading text-xl font-bold tracking-tight">
              YM<span className="text-primary-light">Tech</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We make beautiful websites that rank on Google. Based in Cebu,
              serving clients worldwide.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-heading text-sm font-semibold text-foreground">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="cursor-pointer text-sm text-muted transition-colors duration-200 hover:text-foreground"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="cursor-pointer text-sm text-muted transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} YM Tech Services. All rights reserved.
          </p>
          <p className="text-xs text-muted/60">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
