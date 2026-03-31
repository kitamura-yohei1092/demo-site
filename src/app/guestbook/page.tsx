"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GuestbookForm } from "./guestbook-form";
import { GuestbookList } from "./guestbook-list";

export default function GuestbookPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-24">
        <div className="text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Guestbook
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Sign the Guestbook
          </h1>
          <p className="mt-4 text-lg text-muted">
            Leave a message for future visitors.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
          <GuestbookForm onSuccess={() => setRefreshKey((k) => k + 1)} />
        </div>

        <div className="mt-12">
          <h2 className="mb-6 font-heading text-lg font-semibold text-foreground">
            Messages
          </h2>
          <GuestbookList refreshKey={refreshKey} />
        </div>
      </main>
      <Footer />
    </>
  );
}
