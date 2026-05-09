-- Allow Daily English lessons to use the shared unique content view tracker.
-- Safe to run more than once.

alter table public.content_views
  drop constraint if exists content_views_content_type_check;

alter table public.content_views
  add constraint content_views_content_type_check
  check (content_type in ('news', 'discussion', 'product', 'daily_english'));
