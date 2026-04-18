-- follows
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.users(id) on delete cascade,
  following_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(follower_id, following_id)
);
create index if not exists follows_follower_idx on public.follows(follower_id);
create index if not exists follows_following_idx on public.follows(following_id);

-- bookmarks
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, post_id)
);
create index if not exists bookmarks_user_idx on public.bookmarks(user_id);

-- categories column on users
alter table public.users add column if not exists categories jsonb not null default '[]';

-- RLS
alter table public.follows enable row level security;
alter table public.bookmarks enable row level security;

create policy "follows_select_public" on public.follows for select using (true);
create policy "follows_insert_own" on public.follows for insert with check (auth.uid() = follower_id);
create policy "follows_delete_own" on public.follows for delete using (auth.uid() = follower_id);

create policy "bookmarks_select_own" on public.bookmarks for select using (auth.uid() = user_id);
create policy "bookmarks_insert_own" on public.bookmarks for insert with check (auth.uid() = user_id);
create policy "bookmarks_delete_own" on public.bookmarks for delete using (auth.uid() = user_id);
