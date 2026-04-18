-- ==========================================
-- 숨숨 (SoomSoom) — Row Level Security
-- ==========================================

-- Enable RLS
alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.reactions enable row level security;
alter table public.replies enable row level security;
alter table public.character_cards enable row level security;
alter table public.reports enable row level security;

-- ---- users ----
-- Anyone can read limited user info (character fields only)
create policy "users_select_public" on public.users
  for select using (true);

-- Users can only update their own row
create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

-- Allow insert on own row (for onboarding)
create policy "users_insert_own" on public.users
  for insert with check (auth.uid() = id);

-- ---- posts ----
-- Public read for non-deleted posts
create policy "posts_select_public" on public.posts
  for select using (deleted_at is null);

-- Authenticated users can insert
create policy "posts_insert_auth" on public.posts
  for insert with check (auth.uid() = user_id);

-- Only own posts can be soft-deleted (update deleted_at)
create policy "posts_update_own" on public.posts
  for update using (auth.uid() = user_id);

-- ---- reactions ----
-- Public read
create policy "reactions_select_public" on public.reactions
  for select using (true);

-- Authenticated users can insert reactions
create policy "reactions_insert_auth" on public.reactions
  for insert with check (auth.uid() = user_id);

-- Can delete own reaction
create policy "reactions_delete_own" on public.reactions
  for delete using (auth.uid() = user_id);

-- ---- replies ----
-- Public read for non-deleted
create policy "replies_select_public" on public.replies
  for select using (deleted_at is null);

-- Authenticated users can insert
create policy "replies_insert_auth" on public.replies
  for insert with check (auth.uid() = user_id);

-- Own replies can be soft-deleted
create policy "replies_update_own" on public.replies
  for update using (auth.uid() = user_id);

-- ---- character_cards ----
-- Public read
create policy "cards_select_public" on public.character_cards
  for select using (true);

-- Service role inserts/updates (via server action)
-- Use service role key on backend — no direct client insert policy needed

-- ---- reports ----
-- Authenticated users can insert reports
create policy "reports_insert_auth" on public.reports
  for insert with check (auth.uid() = reporter_user_id);
