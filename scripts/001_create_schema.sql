-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "profiles_select_public" on public.profiles for select using (true);
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Create credentials table
create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  credential_type text not null,
  issuer text not null,
  issue_date timestamp with time zone not null,
  expiration_date timestamp with time zone,
  credential_data jsonb not null,
  file_url text,
  blockchain_hash text,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.credentials enable row level security;

create policy "credentials_select_own" on public.credentials for select using (auth.uid() = user_id or is_public = true);
create policy "credentials_insert_own" on public.credentials for insert with check (auth.uid() = user_id);
create policy "credentials_update_own" on public.credentials for update using (auth.uid() = user_id);
create policy "credentials_delete_own" on public.credentials for delete using (auth.uid() = user_id);

-- Create credential_shares table for sharing with others
create table if not exists public.credential_shares (
  id uuid primary key default gen_random_uuid(),
  credential_id uuid not null references public.credentials(id) on delete cascade,
  shared_by_user_id uuid not null references auth.users(id) on delete cascade,
  shared_with_user_id uuid not null references auth.users(id) on delete cascade,
  share_token text unique,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.credential_shares enable row level security;

create policy "shares_select_own" on public.credential_shares for select using (auth.uid() = shared_by_user_id or auth.uid() = shared_with_user_id);
create policy "shares_insert_own" on public.credential_shares for insert with check (auth.uid() = shared_by_user_id);
create policy "shares_delete_own" on public.credential_shares for delete using (auth.uid() = shared_by_user_id);

-- Create verification records table
create table if not exists public.verification_records (
  id uuid primary key default gen_random_uuid(),
  credential_id uuid not null references public.credentials(id) on delete cascade,
  verifier_user_id uuid not null references auth.users(id) on delete cascade,
  verification_status text not null default 'pending',
  verification_notes text,
  verified_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.verification_records enable row level security;

create policy "verifications_select_credential_owner" on public.verification_records for select using (
  auth.uid() = (select user_id from public.credentials where id = credential_id)
);
create policy "verifications_insert_verifier" on public.verification_records for insert with check (auth.uid() = verifier_user_id);
create policy "verifications_update_verifier" on public.verification_records for update using (auth.uid() = verifier_user_id);
