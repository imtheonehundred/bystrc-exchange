-- Create the currencies table
create table if not exists currencies (
  currency text primary key,
  flag text not null,
  name text not null,
  "buyRate" numeric not null,
  "sellRate" numeric not null,
  "lastUpdated" timestamp with time zone default timezone('utc'::text, now()) not null,
  "isDisabled" boolean default false
);

-- Create the admin_settings table
create table if not exists admin_settings (
  id int primary key default 1,
  username text not null,
  password text not null,
  "lastUpdated" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default admin credentials (if not exists)
insert into admin_settings (id, username, password)
values (1, 'admin', 'password123')
on conflict (id) do nothing;

-- Enable Row Level Security (RLS)
alter table currencies enable row level security;
alter table admin_settings enable row level security;

-- Create policies to allow public read access to currencies (for the website)
create policy "Public read access for currencies"
  on currencies for select
  using (true);

-- Create policies to allow full access for the service role (API routes)
-- Note: The service role key bypasses RLS, but we can add explicit policies if needed for authenticated users.
-- Since we are using a custom auth system (admin_session cookie) handled by the API route, 
-- and the API route uses the service role key (or we can configure it to), we rely on the server-side code security.
