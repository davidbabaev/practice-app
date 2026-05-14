-- 0001_init.sql — initial schema for Onyx

-- Enums for fixed-value fields
create type car_category as enum ('exotic', 'executive', 'convertible');
create type car_transmission as enum ('automatic', 'manual');

-- Cars table
create table cars (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  category car_category not null,
  daily_price integer not null check (daily_price > 0),
  photo_url text not null,
  location text not null default 'Miami',
  seats integer not null check (seats > 0),
  transmission car_transmission not null,
  short_description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for the filter queries we already built on /cars
create index cars_category_idx on cars (category);
create index cars_brand_idx on cars (brand);

-- Auto-update updated_at on every row update
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger cars_set_updated_at
  before update on cars
  for each row
  execute function set_updated_at();

-- Enable Row Level Security on cars
alter table cars enable row level security;

-- Public read policy: anyone (including unauthenticated visitors) can read cars.
-- Writes are NOT allowed via RLS — we'll do writes through the service-role key only.
create policy "Public can read cars"
  on cars
  for select
  to anon, authenticated
  using (true);
