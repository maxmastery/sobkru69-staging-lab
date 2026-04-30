-- SobKru69 Supabase schema
-- Run this file once in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Core users
-- ---------------------------------------------------------------------------

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  age text,
  gender text,
  major text,
  province text,
  exam_count text,
  role text not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists app_users_email_idx on public.app_users (lower(email));

alter table public.app_users enable row level security;

-- The app keeps user CRUD behind RPC functions so password_hash is not exposed
-- through normal table SELECT responses.

create or replace function public.login_app_user(
  p_email text,
  p_password_hash text
)
returns table (
  id uuid,
  name text,
  email text,
  age text,
  gender text,
  major text,
  province text,
  exam_count text,
  created_at timestamptz,
  role text
)
language sql
security definer
set search_path = public
as $$
  select
    u.id,
    u.name,
    u.email,
    u.age,
    u.gender,
    u.major,
    u.province,
    u.exam_count,
    u.created_at,
    u.role
  from public.app_users u
  where lower(u.email) = lower(trim(p_email))
    and u.password_hash = p_password_hash
  limit 1;
$$;

create or replace function public.register_app_user(
  p_name text,
  p_email text,
  p_password_hash text,
  p_age text default '',
  p_gender text default '',
  p_major text default '',
  p_province text default '',
  p_exam_count text default ''
)
returns table (
  id uuid,
  name text,
  email text,
  age text,
  gender text,
  major text,
  province text,
  exam_count text,
  created_at timestamptz,
  role text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  created_user public.app_users%rowtype;
begin
  insert into public.app_users (
    name,
    email,
    password_hash,
    age,
    gender,
    major,
    province,
    exam_count
  )
  values (
    trim(p_name),
    trim(p_email),
    p_password_hash,
    nullif(p_age, ''),
    nullif(p_gender, ''),
    nullif(p_major, ''),
    nullif(p_province, ''),
    nullif(p_exam_count, '')
  )
  returning * into created_user;

  return query
  select
    created_user.id,
    created_user.name,
    created_user.email,
    created_user.age,
    created_user.gender,
    created_user.major,
    created_user.province,
    created_user.exam_count,
    created_user.created_at,
    created_user.role;
exception
  when unique_violation then
    return;
end;
$$;

create or replace function public.list_app_users()
returns table (
  id uuid,
  name text,
  email text,
  age text,
  gender text,
  major text,
  province text,
  exam_count text,
  created_at timestamptz,
  role text
)
language sql
security definer
set search_path = public
as $$
  select
    u.id,
    u.name,
    u.email,
    u.age,
    u.gender,
    u.major,
    u.province,
    u.exam_count,
    u.created_at,
    u.role
  from public.app_users u
  order by u.created_at desc;
$$;

create or replace function public.update_app_user(
  p_user_id uuid,
  p_name text,
  p_email text,
  p_password_hash text default null,
  p_age text default null,
  p_gender text default null,
  p_major text default null,
  p_province text default null,
  p_exam_count text default null
)
returns table (
  id uuid,
  name text,
  email text,
  age text,
  gender text,
  major text,
  province text,
  exam_count text,
  created_at timestamptz,
  role text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_user public.app_users%rowtype;
begin
  update public.app_users u
  set
    name = coalesce(nullif(trim(p_name), ''), u.name),
    email = coalesce(nullif(trim(p_email), ''), u.email),
    password_hash = coalesce(nullif(p_password_hash, ''), u.password_hash),
    age = coalesce(p_age, u.age),
    gender = coalesce(p_gender, u.gender),
    major = coalesce(p_major, u.major),
    province = coalesce(p_province, u.province),
    exam_count = coalesce(p_exam_count, u.exam_count),
    updated_at = now()
  where u.id = p_user_id
  returning * into updated_user;

  if not found then
    return;
  end if;

  return query
  select
    updated_user.id,
    updated_user.name,
    updated_user.email,
    updated_user.age,
    updated_user.gender,
    updated_user.major,
    updated_user.province,
    updated_user.exam_count,
    updated_user.created_at,
    updated_user.role;
end;
$$;

create or replace function public.delete_app_user(p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.app_users where id = p_user_id;
  return found;
end;
$$;

grant execute on function public.login_app_user(text, text) to anon;
grant execute on function public.register_app_user(text, text, text, text, text, text, text, text) to anon;
grant execute on function public.list_app_users() to anon;
grant execute on function public.update_app_user(uuid, text, text, text, text, text, text, text, text) to anon;
grant execute on function public.delete_app_user(uuid) to anon;

-- ---------------------------------------------------------------------------
-- Admin settings, notifications, and support
-- ---------------------------------------------------------------------------

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.bell_notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  date timestamptz not null default now()
);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  user_name text not null,
  user_email text not null,
  subject text not null,
  content text not null,
  date timestamptz not null default now(),
  status text not null default 'unread' check (status in ('unread', 'read', 'acknowledged', 'replied')),
  replies jsonb not null default '[]'::jsonb
);

create index if not exists support_messages_user_id_idx on public.support_messages (user_id);
create index if not exists support_messages_date_idx on public.support_messages (date desc);
create index if not exists bell_notifications_date_idx on public.bell_notifications (date desc);

-- ---------------------------------------------------------------------------
-- Content and community data currently used by the app
-- ---------------------------------------------------------------------------

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author text not null,
  source text,
  image_url text,
  date date not null default current_date,
  status text not null default 'published' check (status in ('published', 'draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.discussion_threads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author text not null,
  tag text not null default 'question' check (tag in ('question', 'suggestion')),
  date timestamptz not null default now(),
  replies_count integer not null default 0,
  status text not null default 'active' check (status in ('active', 'hidden', 'deleted')),
  is_highlighted boolean not null default false
);

create table if not exists public.discussion_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.discussion_threads(id) on delete cascade,
  author text not null,
  content text not null,
  date timestamptz not null default now(),
  is_admin boolean not null default false
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id text not null,
  reporter_name text not null,
  reported_user_id text not null,
  reported_user_name text not null,
  reason text not null,
  type text not null check (type in ('post', 'comment')),
  target_id text not null,
  target_content text not null,
  date timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'resolved', 'dismissed'))
);

create table if not exists public.banned_users (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  user_name text not null,
  reason text not null,
  ban_type text not null default 'temporary' check (ban_type in ('temporary', 'permanent')),
  banned_at timestamptz not null default now(),
  ban_until timestamptz
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(10, 2) not null default 0,
  image_url text,
  features jsonb not null default '[]'::jsonb,
  status text not null default 'in_stock' check (status in ('in_stock', 'out_of_stock')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Donation/slip records and learning progress tables
-- ---------------------------------------------------------------------------

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  user_email text,
  tier_id text,
  tier_name text,
  amount numeric(10, 2),
  slip_path text,
  slip_hash text unique,
  slip_text_hash text unique,
  transaction_ref text unique,
  status text not null default 'verified' check (status in ('pending', 'verified', 'rejected')),
  verification_message text,
  gift_link text,
  created_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  topic_id text not null,
  chapter_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, topic_id, chapter_id)
);

create table if not exists public.study_time (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  topic_id text not null,
  seconds integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, topic_id)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  quiz_id text not null,
  topic_id text,
  score integer not null default 0,
  total integer not null default 0,
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now()
);

create table if not exists public.mock_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  exam_key text not null,
  score integer not null default 0,
  total integer not null default 0,
  duration_seconds integer not null default 0,
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS compatibility policies for the current frontend-only architecture.
-- If you later add Supabase Auth or Edge Functions, tighten these policies.
-- ---------------------------------------------------------------------------

alter table public.app_settings enable row level security;
alter table public.bell_notifications enable row level security;
alter table public.support_messages enable row level security;
alter table public.news_posts enable row level security;
alter table public.discussion_threads enable row level security;
alter table public.discussion_replies enable row level security;
alter table public.reports enable row level security;
alter table public.banned_users enable row level security;
alter table public.products enable row level security;
alter table public.donations enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.study_time enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.mock_exam_attempts enable row level security;

drop policy if exists app_settings_anon_all on public.app_settings;
create policy app_settings_anon_all on public.app_settings for all to anon using (true) with check (true);

drop policy if exists bell_notifications_anon_all on public.bell_notifications;
create policy bell_notifications_anon_all on public.bell_notifications for all to anon using (true) with check (true);

drop policy if exists support_messages_anon_all on public.support_messages;
create policy support_messages_anon_all on public.support_messages for all to anon using (true) with check (true);

drop policy if exists news_posts_anon_all on public.news_posts;
create policy news_posts_anon_all on public.news_posts for all to anon using (true) with check (true);

drop policy if exists discussion_threads_anon_all on public.discussion_threads;
create policy discussion_threads_anon_all on public.discussion_threads for all to anon using (true) with check (true);

drop policy if exists discussion_replies_anon_all on public.discussion_replies;
create policy discussion_replies_anon_all on public.discussion_replies for all to anon using (true) with check (true);

drop policy if exists reports_anon_all on public.reports;
create policy reports_anon_all on public.reports for all to anon using (true) with check (true);

drop policy if exists banned_users_anon_all on public.banned_users;
create policy banned_users_anon_all on public.banned_users for all to anon using (true) with check (true);

drop policy if exists products_anon_all on public.products;
create policy products_anon_all on public.products for all to anon using (true) with check (true);

drop policy if exists donations_anon_all on public.donations;
create policy donations_anon_all on public.donations for all to anon using (true) with check (true);

drop policy if exists lesson_progress_anon_all on public.lesson_progress;
create policy lesson_progress_anon_all on public.lesson_progress for all to anon, authenticated using (true) with check (true);

drop policy if exists study_time_anon_all on public.study_time;
create policy study_time_anon_all on public.study_time for all to anon, authenticated using (true) with check (true);

drop policy if exists quiz_attempts_anon_all on public.quiz_attempts;
create policy quiz_attempts_anon_all on public.quiz_attempts for all to anon, authenticated using (true) with check (true);

drop policy if exists mock_exam_attempts_anon_all on public.mock_exam_attempts;
create policy mock_exam_attempts_anon_all on public.mock_exam_attempts for all to anon, authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('sobkru-images', 'sobkru-images', true, 10485760, array['image/png', 'image/jpeg', 'image/webp', 'image/gif']),
  ('sobkru-slips', 'sobkru-slips', false, 10485760, array['image/png', 'image/jpeg', 'image/webp']),
  ('sobkru-files', 'sobkru-files', false, 52428800, array['application/pdf', 'application/zip', 'image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists sobkru_images_public_read on storage.objects;
create policy sobkru_images_public_read on storage.objects
for select to anon
using (bucket_id = 'sobkru-images');

drop policy if exists sobkru_images_anon_insert on storage.objects;
create policy sobkru_images_anon_insert on storage.objects
for insert to anon
with check (bucket_id = 'sobkru-images');

drop policy if exists sobkru_images_anon_update on storage.objects;
create policy sobkru_images_anon_update on storage.objects
for update to anon
using (bucket_id = 'sobkru-images')
with check (bucket_id = 'sobkru-images');

drop policy if exists sobkru_slips_anon_insert on storage.objects;
create policy sobkru_slips_anon_insert on storage.objects
for insert to anon
with check (bucket_id = 'sobkru-slips');

drop policy if exists sobkru_slips_anon_select on storage.objects;
create policy sobkru_slips_anon_select on storage.objects
for select to anon
using (bucket_id = 'sobkru-slips');

drop policy if exists sobkru_files_anon_insert on storage.objects;
create policy sobkru_files_anon_insert on storage.objects
for insert to anon
with check (bucket_id = 'sobkru-files');

drop policy if exists sobkru_files_anon_select on storage.objects;
create policy sobkru_files_anon_select on storage.objects
for select to anon
using (bucket_id = 'sobkru-files');

-- Default public settings.
insert into public.app_settings (key, value)
values
  ('marquee', '{"text":"ยินดีต้อนรับสู่ SOBKRU 69 ระบบติวสอบออนไลน์อัจฉริยะ","isActive":true}'::jsonb),
  ('popup_notification', '{"title":"","message":"","isActive":false,"imageUrl":"","updatedAt":""}'::jsonb),
  ('maintenance_mode', '{"isActive":false,"title":"ปิดปรับปรุงระบบชั่วคราว","message":"ระบบอยู่ระหว่างอัปเดตและปรับปรุงประสิทธิภาพ ขออภัยในความไม่สะดวก","startAt":"","endAt":""}'::jsonb),
  ('shop_button_visibility', '{"isVisible":false,"updatedAt":""}'::jsonb)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Supabase Auth standard profiles + per-user UI state
-- ---------------------------------------------------------------------------

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null unique,
  age text,
  gender text,
  major text,
  province text,
  exam_count text,
  role text not null default 'student',
  auth_provider text not null default 'email',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_ui_state (
  user_id uuid primary key references public.user_profiles(id) on delete cascade,
  read_notification_ids jsonb not null default '[]'::jsonb,
  read_support_message_ids jsonb not null default '[]'::jsonb,
  popup_seen_map jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists user_profiles_email_idx on public.user_profiles (lower(email));

alter table public.user_profiles enable row level security;
alter table public.user_ui_state enable row level security;

create or replace function public.sync_auth_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  app_meta jsonb := coalesce(new.raw_app_meta_data, '{}'::jsonb);
begin
  insert into public.user_profiles (
    id,
    name,
    email,
    age,
    gender,
    major,
    province,
    exam_count,
    role,
    auth_provider,
    is_active,
    created_at,
    updated_at
  )
  values (
    new.id,
    coalesce(nullif(trim(meta ->> 'name'), ''), nullif(trim(meta ->> 'full_name'), ''), split_part(coalesce(new.email, ''), '@', 1), 'ผู้ใช้งาน'),
    coalesce(lower(trim(new.email)), ''),
    nullif(trim(meta ->> 'age'), ''),
    nullif(trim(meta ->> 'gender'), ''),
    nullif(trim(meta ->> 'major'), ''),
    nullif(trim(meta ->> 'province'), ''),
    nullif(trim(coalesce(meta ->> 'examCount', meta ->> 'exam_count')), ''),
    coalesce(nullif(trim(app_meta ->> 'role'), ''), 'student'),
    coalesce(nullif(trim(app_meta ->> 'provider'), ''), 'email'),
    true,
    coalesce(new.created_at, now()),
    now()
  )
  on conflict (id) do update
  set
    name = excluded.name,
    email = excluded.email,
    age = excluded.age,
    gender = excluded.gender,
    major = excluded.major,
    province = excluded.province,
    exam_count = excluded.exam_count,
    role = coalesce(public.user_profiles.role, excluded.role),
    auth_provider = excluded.auth_provider,
    updated_at = now();

  insert into public.user_ui_state (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_synced_to_profile on auth.users;
create trigger on_auth_user_synced_to_profile
after insert or update on auth.users
for each row execute procedure public.sync_auth_user_profile();

insert into public.user_profiles (
  id,
  name,
  email,
  age,
  gender,
  major,
  province,
  exam_count,
  role,
  auth_provider,
  is_active,
  created_at,
  updated_at
)
select
  u.id,
  coalesce(
    nullif(trim(coalesce(u.raw_user_meta_data ->> 'name', u.raw_user_meta_data ->> 'full_name')), ''),
    split_part(coalesce(u.email, ''), '@', 1),
    'ผู้ใช้งาน'
  ),
  coalesce(lower(trim(u.email)), ''),
  nullif(trim(u.raw_user_meta_data ->> 'age'), ''),
  nullif(trim(u.raw_user_meta_data ->> 'gender'), ''),
  nullif(trim(u.raw_user_meta_data ->> 'major'), ''),
  nullif(trim(u.raw_user_meta_data ->> 'province'), ''),
  nullif(trim(coalesce(u.raw_user_meta_data ->> 'examCount', u.raw_user_meta_data ->> 'exam_count')), ''),
  'student',
  coalesce(nullif(trim(u.raw_app_meta_data ->> 'provider'), ''), 'email'),
  true,
  coalesce(u.created_at, now()),
  now()
from auth.users u
on conflict (id) do nothing;

insert into public.user_ui_state (user_id)
select p.id
from public.user_profiles p
on conflict (user_id) do nothing;

drop policy if exists user_profiles_select_own on public.user_profiles;
create policy user_profiles_select_own on public.user_profiles
for select to authenticated
using (auth.uid() = id);

drop policy if exists user_profiles_insert_own on public.user_profiles;
create policy user_profiles_insert_own on public.user_profiles
for insert to authenticated
with check (auth.uid() = id);

drop policy if exists user_profiles_update_own on public.user_profiles;
create policy user_profiles_update_own on public.user_profiles
for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists user_ui_state_select_own on public.user_ui_state;
create policy user_ui_state_select_own on public.user_ui_state
for select to authenticated
using (auth.uid() = user_id);

drop policy if exists user_ui_state_insert_own on public.user_ui_state;
create policy user_ui_state_insert_own on public.user_ui_state
for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists user_ui_state_update_own on public.user_ui_state;
create policy user_ui_state_update_own on public.user_ui_state
for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update on public.user_profiles to authenticated;
grant select, insert, update on public.user_ui_state to authenticated;

create or replace function public.list_user_profiles()
returns table (
  id uuid,
  name text,
  email text,
  age text,
  gender text,
  major text,
  province text,
  exam_count text,
  role text,
  auth_provider text,
  is_active boolean,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    p.id,
    p.name,
    p.email,
    p.age,
    p.gender,
    p.major,
    p.province,
    p.exam_count,
    p.role,
    p.auth_provider,
    p.is_active,
    p.created_at
  from public.user_profiles p
  order by p.created_at desc;
$$;

create or replace function public.admin_update_user_profile(
  p_user_id uuid,
  p_name text,
  p_email text,
  p_age text default null,
  p_gender text default null,
  p_major text default null,
  p_province text default null,
  p_exam_count text default null
)
returns table (
  id uuid,
  name text,
  email text,
  age text,
  gender text,
  major text,
  province text,
  exam_count text,
  role text,
  auth_provider text,
  is_active boolean,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_profile public.user_profiles%rowtype;
begin
  update public.user_profiles p
  set
    name = coalesce(nullif(trim(p_name), ''), p.name),
    email = coalesce(nullif(trim(p_email), ''), p.email),
    age = coalesce(p_age, p.age),
    gender = coalesce(p_gender, p.gender),
    major = coalesce(p_major, p.major),
    province = coalesce(p_province, p.province),
    exam_count = coalesce(p_exam_count, p.exam_count),
    updated_at = now()
  where p.id = p_user_id
  returning * into updated_profile;

  if not found then
    return;
  end if;

  return query
  select
    updated_profile.id,
    updated_profile.name,
    updated_profile.email,
    updated_profile.age,
    updated_profile.gender,
    updated_profile.major,
    updated_profile.province,
    updated_profile.exam_count,
    updated_profile.role,
    updated_profile.auth_provider,
    updated_profile.is_active,
    updated_profile.created_at;
end;
$$;

create or replace function public.deactivate_user_profile(p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.user_profiles
  set
    is_active = false,
    updated_at = now()
  where id = p_user_id;

  return found;
end;
$$;

grant execute on function public.list_user_profiles() to anon, authenticated;
grant execute on function public.admin_update_user_profile(uuid, text, text, text, text, text, text, text) to anon, authenticated;
grant execute on function public.deactivate_user_profile(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- User sessions (heartbeat / online tracking)
-- ---------------------------------------------------------------------------

create table if not exists public.user_sessions (
  user_id text primary key,
  user_name text not null default '',
  current_page text not null default 'dashboard',
  last_active_at timestamptz not null default now()
);

alter table public.user_sessions enable row level security;

create policy "user_sessions_anon_all" on public.user_sessions
  for all to anon, authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Daily login log
-- ---------------------------------------------------------------------------

create table if not exists public.daily_login_log (
  id text primary key,
  user_id text not null,
  login_date date not null default current_date,
  created_at timestamptz not null default now(),
  unique(user_id, login_date)
);

alter table public.daily_login_log enable row level security;

create policy "daily_login_log_anon_all" on public.daily_login_log
  for all to anon, authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Content views (unique readers / viewers)
-- ---------------------------------------------------------------------------

create table if not exists public.content_views (
  id text primary key,
  content_type text not null check (content_type in ('news', 'discussion', 'product')),
  content_id text not null,
  viewer_key text not null,
  viewed_at timestamptz not null default now(),
  unique(content_type, content_id, viewer_key)
);

alter table public.content_views enable row level security;

create policy "content_views_anon_all" on public.content_views
  for all to anon, authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Mock exam attempts (leaderboard + win rate)
-- ---------------------------------------------------------------------------

create table if not exists public.mock_exam_attempts (
  id text primary key,
  user_id text not null,
  user_name text not null default '',
  exam_key text not null default '',
  score integer not null default 0,
  total integer not null default 0,
  answered_count integer not null default 0,
  duration_seconds integer not null default 0,
  is_completed boolean not null default true,
  created_at timestamptz not null default now()
);

-- Add missing columns to mock_exam_attempts for compatibility
do $$
begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'mock_exam_attempts' and column_name = 'user_name') then
    alter table public.mock_exam_attempts add column user_name text not null default '';
  end if;
  
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'mock_exam_attempts' and column_name = 'answered_count') then
    alter table public.mock_exam_attempts add column answered_count integer not null default 0;
  end if;

  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'mock_exam_attempts' and column_name = 'is_completed') then
    alter table public.mock_exam_attempts add column is_completed boolean not null default true;
  end if;
end $$;

alter table public.mock_exam_attempts enable row level security;

create policy "mock_exam_attempts_anon_all" on public.mock_exam_attempts
  for all to anon, authenticated
  using (true) with check (true);
