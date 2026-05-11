-- Daily English views + Stripe fulfillment compatibility patch.
-- Run this once in Supabase Dashboard > SQL Editor for existing projects.

alter table public.content_views drop constraint if exists content_views_content_type_check;
alter table public.content_views
  add constraint content_views_content_type_check
  check (content_type in ('news', 'discussion', 'product', 'daily_english'));

-- Stripe sales/delivery state is stored in public.app_settings under key
-- `stripe_sales`, so no extra table is required.
