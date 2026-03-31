"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function postMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 100) {
    return { error: "Name is required (max 100 characters)." };
  }
  if (!message || message.length > 500) {
    return { error: "Message is required (max 500 characters)." };
  }

  const { error } = await supabase
    .from("guestbook")
    .insert({ name, message });

  if (error) {
    return { error: "Failed to post message. Please try again." };
  }

  return { success: true };
}
