drop trigger if exists projects_updated_at on public.projects;
drop index if exists projects_featured_idx;
drop index if exists projects_slug_idx;
drop index if exists projects_published_created_at_idx;
drop policy if exists "Service role full access on projects" on public.projects;
drop policy if exists "Anyone can read published projects" on public.projects;
drop table if exists public.projects;
