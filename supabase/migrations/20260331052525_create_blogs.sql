create table public.blogs (
  id bigint generated always as identity primary key,
  title text not null check (char_length(title) between 1 and 200),
  slug text not null unique check (char_length(slug) between 1 and 200),
  content text not null,
  excerpt text check (char_length(excerpt) <= 500),
  published boolean not null default false,
  meta_title text check (char_length(meta_title) <= 120),
  meta_description text check (char_length(meta_description) <= 320),
  og_image text,
  canonical_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.blogs enable row level security;

-- Anyone can read published posts
create policy "Anyone can read published blogs"
  on public.blogs for select
  to anon, authenticated
  using (published = true);

-- Only service_role can insert/update/delete (admin via server actions)
create policy "Service role full access"
  on public.blogs for all
  to service_role
  using (true)
  with check (true);

-- Index for public listing (published, newest first)
create index blogs_published_created_at_idx
  on public.blogs (published, created_at desc);

-- Index for slug lookup
create index blogs_slug_idx on public.blogs (slug);

-- Auto-update updated_at on row change
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blogs_updated_at
  before update on public.blogs
  for each row
  execute function public.update_updated_at();
