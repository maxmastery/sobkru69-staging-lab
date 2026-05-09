-- Stripe sales + digital file fulfillment tables
-- Run once in the Supabase SQL editor for each environment.

create table if not exists public.stripe_orders (
  id uuid primary key default gen_random_uuid(),
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  stripe_customer_id text,
  customer_email text,
  customer_name text,
  amount_total integer not null default 0,
  currency text not null default 'thb',
  payment_status text not null default '',
  status text not null default 'pending',
  delivery_status text not null default 'pending',
  raw_event jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.stripe_orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  local_product_name text not null default '',
  stripe_product_id text,
  stripe_price_id text,
  stripe_product_name text not null default '',
  quantity integer not null default 1,
  amount_total integer not null default 0,
  currency text not null default 'thb',
  delivery_file_url text not null default '',
  delivery_file_label text not null default '',
  delivery_email_note text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.digital_delivery_logs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.stripe_orders(id) on delete cascade,
  order_item_id uuid references public.stripe_order_items(id) on delete set null,
  customer_email text,
  status text not null default 'pending',
  message text not null default '',
  provider_message_id text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists stripe_orders_created_at_idx on public.stripe_orders(created_at desc);
create index if not exists stripe_orders_customer_email_idx on public.stripe_orders(customer_email);
create index if not exists stripe_orders_delivery_status_idx on public.stripe_orders(delivery_status);
create index if not exists stripe_order_items_order_id_idx on public.stripe_order_items(order_id);
create index if not exists stripe_order_items_stripe_price_id_idx on public.stripe_order_items(stripe_price_id);
create index if not exists digital_delivery_logs_order_id_idx on public.digital_delivery_logs(order_id);
create index if not exists digital_delivery_logs_created_at_idx on public.digital_delivery_logs(created_at desc);

alter table public.stripe_orders enable row level security;
alter table public.stripe_order_items enable row level security;
alter table public.digital_delivery_logs enable row level security;

drop policy if exists "Service role can manage stripe orders" on public.stripe_orders;
create policy "Service role can manage stripe orders"
  on public.stripe_orders
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "Service role can manage stripe order items" on public.stripe_order_items;
create policy "Service role can manage stripe order items"
  on public.stripe_order_items
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "Service role can manage digital delivery logs" on public.digital_delivery_logs;
create policy "Service role can manage digital delivery logs"
  on public.digital_delivery_logs
  for all
  to service_role
  using (true)
  with check (true);
