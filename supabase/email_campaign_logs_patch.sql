-- Additive patch for admin email campaign send history.
-- Safe to run on an existing Supabase project.

create table if not exists public.email_campaign_logs (
  id uuid primary key default gen_random_uuid(),
  mode text not null default 'selected',
  subject text not null default '',
  title text not null default '',
  message text not null default '',
  cta_label text not null default '',
  cta_url text not null default '',
  image_url text not null default '',
  recipient_count integer not null default 0,
  success_count integer not null default 0,
  failed_count integer not null default 0,
  batches integer not null default 0,
  errors jsonb not null default '[]'::jsonb,
  sent_by text not null default 'admin',
  created_at timestamptz not null default now()
);

create index if not exists email_campaign_logs_created_at_idx
  on public.email_campaign_logs (created_at desc);

alter table public.email_campaign_logs enable row level security;
