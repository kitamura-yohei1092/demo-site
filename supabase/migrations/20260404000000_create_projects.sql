create table public.projects (
  id bigint generated always as identity primary key,
  title text not null check (char_length(title) between 1 and 200),
  slug text not null unique check (char_length(slug) between 1 and 200),
  description text not null check (char_length(description) <= 500),
  content text not null,
  client_name text check (char_length(client_name) <= 200),
  category text not null check (char_length(category) between 1 and 100),
  tags text[] not null default '{}',
  results text check (char_length(results) <= 200),
  project_url text,
  featured boolean not null default false,
  published boolean not null default false,
  meta_title text check (char_length(meta_title) <= 120),
  meta_description text check (char_length(meta_description) <= 320),
  og_image text,
  canonical_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.projects enable row level security;

-- Anyone can read published projects
create policy "Anyone can read published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true);

-- Only service_role can insert/update/delete (admin via server actions)
create policy "Service role full access on projects"
  on public.projects for all
  to service_role
  using (true)
  with check (true);

-- Index for public listing (published, newest first)
create index projects_published_created_at_idx
  on public.projects (published, created_at desc);

-- Index for slug lookup
create index projects_slug_idx on public.projects (slug);

-- Index for featured projects (homepage)
create index projects_featured_idx on public.projects (featured, published);

-- Reuse the update_updated_at function from blogs migration
create trigger projects_updated_at
  before update on public.projects
  for each row
  execute function public.update_updated_at();
