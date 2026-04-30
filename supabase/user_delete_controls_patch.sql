-- Add admin controls for temporary account suspension and permanent user deletion.
-- Run this once in Supabase SQL Editor before using "ลบถาวร" in the admin panel.

create or replace function public.set_user_profile_active(p_user_id uuid, p_is_active boolean)
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
begin
  return query
  update public.user_profiles p
  set
    is_active = p_is_active,
    updated_at = now()
  where p.id = p_user_id
  returning
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
    p.created_at;
end;
$$;

create or replace function public.delete_user_profile_full(p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  target_id text := p_user_id::text;
  deleted_count integer := 0;
begin
  delete from public.user_sessions where user_id = target_id;
  delete from public.daily_login_log where user_id = target_id;
  delete from public.lesson_progress where user_id = target_id;
  delete from public.study_time where user_id = target_id;
  delete from public.quiz_attempts where user_id = target_id;
  delete from public.mock_exam_attempts where user_id = target_id;
  delete from public.support_messages where user_id = target_id;
  delete from public.donations where user_id = target_id;
  delete from public.reports where reporter_id = target_id or reported_user_id = target_id;
  delete from public.banned_users where user_id = target_id;

  delete from public.user_profiles where id = p_user_id;
  get diagnostics deleted_count = row_count;

  delete from auth.users where id = p_user_id;

  return deleted_count > 0;
end;
$$;

grant execute on function public.set_user_profile_active(uuid, boolean) to anon, authenticated;
grant execute on function public.delete_user_profile_full(uuid) to anon, authenticated;
