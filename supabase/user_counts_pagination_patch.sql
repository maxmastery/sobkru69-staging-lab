-- Add scalable user listing and statistics functions.
-- Run this once in Supabase SQL Editor before deploying the frontend that uses it.

create or replace function public.list_user_profiles_page(
  p_search text default null,
  p_limit integer default 100,
  p_offset integer default 0
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
  created_at timestamptz,
  total_count bigint
)
language sql
security definer
set search_path = public
as $$
  with numbered as (
    select
      p.*,
      ('SK' || lpad((row_number() over (order by p.created_at asc))::text, 5, '0')) as sk_id
    from public.user_profiles p
  ),
  filtered as (
    select p.*
    from numbered p
    where
      nullif(trim(coalesce(p_search, '')), '') is null
      or p.name ilike '%' || trim(p_search) || '%'
      or p.email ilike '%' || trim(p_search) || '%'
      or p.sk_id ilike '%' || trim(p_search) || '%'
  )
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
    p.created_at,
    count(*) over() as total_count
  from filtered p
  order by p.created_at asc
  limit greatest(1, least(coalesce(p_limit, 100), 500))
  offset greatest(0, coalesce(p_offset, 0));
$$;

create or replace function public.get_user_statistics_summary()
returns table (
  total_users bigint,
  province_count bigint,
  major_count bigint,
  first_time_count bigint,
  by_province jsonb,
  by_major jsonb,
  by_gender jsonb,
  by_exam_count jsonb
)
language sql
security definer
set search_path = public
as $$
  with base as (
    select
      nullif(trim(coalesce(province, '')), '') as province,
      nullif(trim(coalesce(major, '')), '') as major,
      nullif(trim(coalesce(gender, '')), '') as gender,
      coalesce(nullif(trim(coalesce(exam_count, '')), ''), '1') as exam_count
    from public.user_profiles
  ),
  totals as (
    select
      count(*)::bigint as total_users,
      count(distinct province)::bigint as province_count,
      count(distinct major)::bigint as major_count,
      count(*) filter (where exam_count = '1')::bigint as first_time_count
    from base
  )
  select
    totals.total_users,
    totals.province_count,
    totals.major_count,
    totals.first_time_count,
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', province,
        'count', item_count,
        'percentage', case when totals.total_users > 0 then round((item_count::numeric / totals.total_users::numeric) * 100)::int else 0 end
      ) order by item_count desc)
      from (
        select province, count(*)::bigint as item_count
        from base
        where province is not null
        group by province
        order by item_count desc
        limit 10
      ) items
    ), '[]'::jsonb) as by_province,
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', major,
        'count', item_count,
        'percentage', case when totals.total_users > 0 then round((item_count::numeric / totals.total_users::numeric) * 100)::int else 0 end
      ) order by item_count desc)
      from (
        select major, count(*)::bigint as item_count
        from base
        where major is not null
        group by major
        order by item_count desc
        limit 10
      ) items
    ), '[]'::jsonb) as by_major,
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', gender,
        'count', item_count,
        'percentage', case when totals.total_users > 0 then round((item_count::numeric / totals.total_users::numeric) * 100)::int else 0 end
      ) order by item_count desc)
      from (
        select gender, count(*)::bigint as item_count
        from base
        where gender is not null
        group by gender
        order by item_count desc
      ) items
    ), '[]'::jsonb) as by_gender,
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', case when exam_count = '1' then 'สอบครั้งที่ 1' when exam_count = '2' then 'สอบครั้งที่ 2' else 'สอบครั้งที่ ' || exam_count end,
        'count', item_count,
        'percentage', case when totals.total_users > 0 then round((item_count::numeric / totals.total_users::numeric) * 100)::int else 0 end
      ) order by exam_count)
      from (
        select exam_count, count(*)::bigint as item_count
        from base
        group by exam_count
        order by exam_count
      ) items
    ), '[]'::jsonb) as by_exam_count
  from totals;
$$;

grant execute on function public.list_user_profiles_page(text, integer, integer) to anon, authenticated;
grant execute on function public.get_user_statistics_summary() to anon, authenticated;
