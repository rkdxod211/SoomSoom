-- ==========================================
-- 숨숨 (SoomSoom) — Seed / Mock Data
-- Run AFTER schema.sql and rls.sql
-- Requires real auth user IDs — replace placeholders
-- ==========================================

-- Example: insert mock users (replace UUIDs with real auth.users IDs)
/*
insert into public.users (id, character_type, character_color, character_seed, character_name, onboarded) values
  ('00000000-0000-0000-0000-000000000001', 'ghost', 'lavender', 'ghost-lavender-1', '보라 유령', true),
  ('00000000-0000-0000-0000-000000000002', 'rabbit', 'mint', 'rabbit-mint-1', '민트 토끼', true),
  ('00000000-0000-0000-0000-000000000003', 'cat', 'peach', 'cat-peach-1', '피치 고양이', true),
  ('00000000-0000-0000-0000-000000000004', 'bear', 'butter', 'bear-butter-1', '버터 곰', true),
  ('00000000-0000-0000-0000-000000000005', 'slime', 'sky', 'slime-sky-1', '하늘 슬라임', true);

insert into public.posts (user_id, content) values
  ('00000000-0000-0000-0000-000000000001', '오늘 진짜 아무것도 하기 싫은데 뭔가 하고 싶음 이게 뭔 심리'),
  ('00000000-0000-0000-0000-000000000001', '근데 진짜 왜 이렇게 피곤하지 아무것도 안 했는데'),
  ('00000000-0000-0000-0000-000000000002', '오늘 커피 두 잔 먹었는데 잠이 오네... 신체 이상인가'),
  ('00000000-0000-0000-0000-000000000002', '뭔가 맛있는 거 먹고 싶은데 뭘 먹고 싶은지 모르겠음 ㅠ'),
  ('00000000-0000-0000-0000-000000000003', '오늘 하루 정말 잘 버텼다고 생각해'),
  ('00000000-0000-0000-0000-000000000004', '갑자기 어릴 때 생각남 왜인지 모름'),
  ('00000000-0000-0000-0000-000000000005', '이 앱 귀여워서 들어왔는데 글 쓰기가 생각보다 어렵넹');

insert into public.reactions (post_id, user_id, reaction_type)
select p.id, '00000000-0000-0000-0000-000000000002', 'empathy'
from public.posts p where p.user_id = '00000000-0000-0000-0000-000000000001' limit 1;
*/
