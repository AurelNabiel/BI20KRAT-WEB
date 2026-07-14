-- ============================================================================
-- UPDATE V6: biodata anggota + manajemen member
-- Jalankan di Supabase SQL Editor SETELAH setup.sql
-- ============================================================================

-- 1. Kolom biodata pada profiles
alter table public.profiles
  add column if not exists nama text,
  add column if not exists instansi text,
  add column if not exists jabatan text,
  add column if not exists domisili text,
  add column if not exists bio text;

-- 2. User boleh MENGUBAH profilnya sendiri
drop policy if exists "ubah profil sendiri" on public.profiles;
create policy "ubah profil sendiri" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- 3. Cegah user biasa menaikkan role-nya sendiri (hanya superadmin boleh ubah role)
create or replace function public.protect_role_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and public.current_role() <> 'superadmin' then
    raise exception 'Hanya superadmin yang boleh mengubah role.';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.protect_role_change();

-- 4. Superadmin boleh melihat & mengubah SEMUA profil (untuk manajemen member)
drop policy if exists "superadmin lihat semua profil" on public.profiles;
create policy "superadmin lihat semua profil" on public.profiles
  for select using (public.current_role() = 'superadmin');

drop policy if exists "superadmin ubah semua profil" on public.profiles;
create policy "superadmin ubah semua profil" on public.profiles
  for update using (public.current_role() = 'superadmin')
  with check (public.current_role() = 'superadmin');
