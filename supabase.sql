-- =========================================================
-- TOY SAYTI — Supabase quraşdırması
-- Supabase → SQL Editor → New query → bu faylın hamısını yapışdırın → RUN
--
-- Admin e-poçtu: kananmammadov678@gmail.com (is_admin funksiyasında)
-- =========================================================

-- Admin yoxlaması (yalnız bu e-poçt bütün məlumatı görə və silə bilər)
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = lower('kananmammadov678@gmail.com')
$$;

-- ---------- İştirak təsdiqləri ----------
create table if not exists public.rsvps (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 100),
  attending   text not null check (attending in ('yes','no','maybe')),
  guests      int  not null default 1 check (guests between 0 and 10),
  message     text check (char_length(message) <= 500),
  lang        text check (char_length(lang) <= 5)
);
alter table public.rsvps enable row level security;
create policy "rsvp: hər kəs göndərə bilər" on public.rsvps for insert to anon, authenticated with check (true);
create policy "rsvp: admin oxuyur"          on public.rsvps for select to authenticated using (public.is_admin());
create policy "rsvp: admin silir"           on public.rsvps for delete to authenticated using (public.is_admin());

-- ---------- Təbrik kitabı ----------
create table if not exists public.guestbook (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 80),
  message     text not null check (char_length(message) between 1 and 600)
);
alter table public.guestbook enable row level security;
create policy "gb: hər kəs yazır"   on public.guestbook for insert to anon, authenticated with check (true);
create policy "gb: hər kəs oxuyur"  on public.guestbook for select to anon, authenticated using (true);
create policy "gb: admin silir"     on public.guestbook for delete to authenticated using (public.is_admin());

-- ---------- Şəkillər (siyahı) ----------
create table if not exists public.photos (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  path        text not null unique check (path ~ '^[0-9-]+/[0-9]+-[a-z0-9]+\.jpg$'),
  uploader    text check (char_length(uploader) <= 60)
);
alter table public.photos enable row level security;
create policy "photos: hər kəs əlavə edir" on public.photos for insert to anon, authenticated with check (true);
create policy "photos: hər kəs görür"      on public.photos for select to anon, authenticated using (true);
create policy "photos: admin silir"        on public.photos for delete to authenticated using (public.is_admin());

-- ---------- Giriş hüquqları (layihədə "Automatically expose new tables" söndürülübsə də işləsin) ----------
grant usage on schema public to anon, authenticated;
grant insert on public.rsvps to anon, authenticated;
grant select, delete on public.rsvps to authenticated;
grant insert, select on public.guestbook to anon, authenticated;
grant delete on public.guestbook to authenticated;
grant insert, select on public.photos to anon, authenticated;
grant delete on public.photos to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------- Şəkil faylları (Storage) ----------
-- Açıq bucket, hər fayl max 10 MB, yalnız şəkil
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 10485760, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "storage: qonaq şəkil yükləyir" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'photos');
create policy "storage: admin silir" on storage.objects for delete to authenticated
  using (bucket_id = 'photos' and public.is_admin());
