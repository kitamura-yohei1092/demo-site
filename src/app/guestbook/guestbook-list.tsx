"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export function GuestbookList({ refreshKey }: { refreshKey: number }) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    setEntries(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries, refreshKey]);

  if (loading) {
    return (
      <p className="text-sm text-muted">Loading messages...</p>
    );
  }

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted">
        No messages yet. Be the first to sign the guestbook!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="rounded-xl border border-border bg-surface p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              {entry.name}
            </p>
            <time className="text-xs text-muted">
              {new Date(entry.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {entry.message}
          </p>
        </div>
      ))}
    </div>
  );
}
