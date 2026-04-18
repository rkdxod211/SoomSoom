-- ==========================================
-- 숨숨 (SoomSoom) — Supabase Schema
-- ==========================================

-- Users (extends Supabase auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  character_type text not null,
  character_color text not null,
  character_seed text not null,
  character_name text not null,
  onboarded boolean not null default false
);

-- Posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null check (char_length(content) <= 120),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists posts_user_id_idx on public.posts(user_id);
create index if not exists posts_created_at_idx on public.posts(created_at desc);

-- Reactions
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  reaction_type text not null check (reaction_type in ('laugh', 'empathy', 'what', 'omg', 'cute')),
  created_at timestamptz not null default now(),
  unique(post_id, user_id)
);

create index if not exists reactions_post_id_idx on public.reactions(post_id);

-- Replies
create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null check (char_length(content) <= 80),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists replies_post_id_idx on public.replies(post_id);

-- Character Cards
create table if not exists public.character_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  one_line_summary text not null,
  keywords jsonb not null default '[]',
  tone text not null,
  active_style text not null,
  fun_tag text not null,
  generated_from_count int not null default 0,
  updated_at timestamptz not null default now()
);

-- Reports (optional)
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid not null references public.users(id) on delete cascade,
  target_type text not null check (target_type in ('post', 'reply')),
  target_id uuid not null,
  reason text,
  created_at timestamptz not null default now()
);
