-- SobKru69 production tracking patch
-- Run in Supabase Dashboard > SQL Editor after deploying the latest frontend.
-- Safe to run more than once. It does not delete existing user/content data.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Online users / heartbeat
-- ---------------------------------------------------------------------------

create table if not exists public.user_sessions (
  user_id text primary key,
  user_name text not null default '',
  current_page text not null default 'dashboard',
  last_active_at timestamptz not null default now(),
  device_type text not null default 'unknown',
  device_label text not null default 'ไม่ทราบอุปกรณ์'
);

alter table public.user_sessions
  add column if not exists device_type text not null default 'unknown';

alter table public.user_sessions
  add column if not exists device_label text not null default 'ไม่ทราบอุปกรณ์';

alter table public.user_sessions enable row level security;

drop policy if exists "user_sessions_anon_all" on public.user_sessions;
create policy "user_sessions_anon_all" on public.user_sessions
  for all to anon, authenticated
  using (true) with check (true);

create index if not exists user_sessions_last_active_idx
  on public.user_sessions (last_active_at desc);

-- ---------------------------------------------------------------------------
-- Unique content readers / viewers
-- news = ข่าวประชาสัมพันธ์, discussion = กระดานสนทนา, product = สินค้า
-- ---------------------------------------------------------------------------

create table if not exists public.content_views (
  id text primary key,
  content_type text not null check (content_type in ('news', 'discussion', 'product', 'daily_english')),
  content_id text not null,
  viewer_key text not null,
  viewed_at timestamptz not null default now(),
  unique(content_type, content_id, viewer_key)
);

alter table public.content_views
  drop constraint if exists content_views_content_type_check;

alter table public.content_views
  add constraint content_views_content_type_check
  check (content_type in ('news', 'discussion', 'product', 'daily_english'));

alter table public.content_views enable row level security;

drop policy if exists "content_views_anon_all" on public.content_views;
create policy "content_views_anon_all" on public.content_views
  for all to anon, authenticated
  using (true) with check (true);

create index if not exists content_views_lookup_idx
  on public.content_views (content_type, content_id);

create index if not exists content_views_viewed_at_idx
  on public.content_views (viewed_at desc);

-- ---------------------------------------------------------------------------
-- User analytics data used by admin dashboard
-- ---------------------------------------------------------------------------

create table if not exists public.daily_login_log (
  id text primary key,
  user_id text not null,
  login_date date not null default current_date,
  created_at timestamptz not null default now(),
  unique(user_id, login_date)
);

alter table public.daily_login_log enable row level security;

drop policy if exists "daily_login_log_anon_all" on public.daily_login_log;
create policy "daily_login_log_anon_all" on public.daily_login_log
  for all to anon, authenticated
  using (true) with check (true);

create index if not exists daily_login_log_login_date_idx
  on public.daily_login_log (login_date desc);

create table if not exists public.lesson_progress (
  id text primary key,
  user_id text not null,
  topic_id text not null,
  chapter_id text not null,
  completed_at timestamptz not null default now(),
  unique(user_id, topic_id, chapter_id)
);

alter table public.lesson_progress enable row level security;

drop policy if exists lesson_progress_anon_all on public.lesson_progress;
create policy lesson_progress_anon_all on public.lesson_progress
  for all to anon, authenticated
  using (true) with check (true);

create index if not exists lesson_progress_user_topic_idx
  on public.lesson_progress (user_id, topic_id);

create table if not exists public.study_time (
  id text primary key,
  user_id text not null,
  topic_id text not null,
  seconds integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, topic_id)
);

alter table public.study_time enable row level security;

drop policy if exists study_time_anon_all on public.study_time;
create policy study_time_anon_all on public.study_time
  for all to anon, authenticated
  using (true) with check (true);

create index if not exists study_time_user_topic_idx
  on public.study_time (user_id, topic_id);
