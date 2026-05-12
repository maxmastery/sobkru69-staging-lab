-- Lock down user-profile RPC functions that expose or mutate private user data.
-- Run this in Supabase Dashboard > SQL Editor for existing production projects.

revoke execute on function public.list_user_profiles() from anon, authenticated, public;
revoke execute on function public.list_user_profiles_page(text, integer, integer) from anon, authenticated, public;
revoke execute on function public.get_user_statistics_summary() from anon, authenticated, public;
revoke execute on function public.admin_update_user_profile(uuid, text, text, text, text, text, text, text) from anon, authenticated, public;
revoke execute on function public.deactivate_user_profile(uuid) from anon, authenticated, public;
revoke execute on function public.set_user_profile_active(uuid, boolean) from anon, authenticated, public;
revoke execute on function public.delete_user_profile_full(uuid) from anon, authenticated, public;

revoke execute on function public.list_app_users() from anon, authenticated, public;
revoke execute on function public.update_app_user(uuid, text, text, text, text, text, text, text, text) from anon, authenticated, public;
revoke execute on function public.delete_app_user(uuid) from anon, authenticated, public;

-- Keep only the public legacy authentication functions available to anonymous
-- users. These do not list users; they return a row only when credentials match.
grant execute on function public.login_app_user(text, text) to anon;
grant execute on function public.register_app_user(text, text, text, text, text, text, text, text) to anon;
