create table public.guestbook (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 100),
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.guestbook enable row level security;

-- Anyone can read messages
create policy "Anyone can read guestbook"
  on public.guestbook for select
  to anon, authenticated
  using (true);

-- Anyone can insert messages
create policy "Anyone can insert guestbook"
  on public.guestbook for insert
  to anon, authenticated
  with check (true);

-- Index for ordering by newest first
create index guestbook_created_at_idx on public.guestbook (created_at desc);
