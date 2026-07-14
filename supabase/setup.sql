
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text,
  role text not null default 'anggota' check (role in ('superadmin', 'admin', 'anggota'))
);

alter table public.profiles enable row level security;

-- user boleh membaca profilnya sendiri
create policy "baca profil sendiri" on public.profiles
  for select using (auth.uid() = id);

-- otomatis buat profil saat user baru mendaftar
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, role)
  values (new.id, split_part(new.email, '@', 1), 'anggota')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- helper: ambil role user yang sedang login
create or replace function public.current_role()
returns text language sql stable security definer set search_path = public as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'anon');
$$;

-- 2. SITE_SECTIONS: konten situs per seksi (jsonb) ---------------------------
create table if not exists public.site_sections (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_sections enable row level security;

-- BACA: semua seksi publik boleh dibaca siapa saja, KECUALI 'donasi'
-- (donasi hanya untuk user yang login)
create policy "baca konten publik" on public.site_sections
  for select using (
    key <> 'donasi' or auth.uid() is not null
  );

-- TULIS (insert/update):
--   superadmin -> semua seksi
--   admin      -> hanya 'berita' dan 'kegiatan'
create policy "tulis superadmin" on public.site_sections
  for all using (public.current_role() = 'superadmin')
  with check (public.current_role() = 'superadmin');

create policy "tulis admin berita kegiatan" on public.site_sections
  for update using (
    public.current_role() = 'admin' and key in ('berita', 'kegiatan')
  )
  with check (
    public.current_role() = 'admin' and key in ('berita', 'kegiatan')
  );

-- perbarui updated_at otomatis
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_sections_touch on public.site_sections;
create trigger site_sections_touch
  before update on public.site_sections
  for each row execute function public.touch_updated_at();

-- 3. SEED KONTEN DEFAULT ------------------------------------------------------
insert into public.site_sections (key, data) values
('landing', '{
  "runningNews": "Reuni Akbar BI20KRAT 2026 sukses digelar • Pendaftaran BI20KRAT Scholarship dibuka hingga 31 Agustus 2026 • BI20KRAT Peduli salurkan bantuan sosial • Rakornas Pengurus 20 Juli 2026 via Zoom • ",
  "tagline": "Bhinneka Rosa Krastala — Satu Angkatan, Satu Pengabdian, Untuk Indonesia.",
  "sambutanJudul": "Salam Bhinneka Rosa Krastala",
  "sambutanIsi": "Rekan-rekan Purna Praja Angkatan XX yang saya banggakan — website ini adalah rumah digital kita bersama. Dari Jatinangor kita ditempa, dan kini di seluruh penjuru negeri kita mengabdi. Mari jadikan BI20KRAT wadah untuk saling menguatkan, berkolaborasi lintas sektor, dan berkontribusi nyata bagi bangsa dan negara.",
  "videoId": "VIDEO_ID",
  "highlight": [
    {"angka": "800+", "label": "Alumni"},
    {"angka": "34", "label": "Provinsi"},
    {"angka": "300+", "label": "Kabupaten/Kota"},
    {"angka": "60+", "label": "Pengurus"},
    {"angka": "5", "label": "Program Kerja Berjalan"}
  ]
}'::jsonb),
('tentang', '{
  "sejarah": "Perjalanan Angkatan XX dimulai sejak menjadi Praja di kampus IPDN Jatinangor pada tahun 2013 — angkatan yang dikenal dengan sebutan BIROKRAT 2013. Ditempa disiplin, kebersamaan, dan semangat pengabdian, para Purna Praja kemudian tersebar bertugas di pemerintahan pusat dan daerah di seluruh Indonesia. Dari kerinduan menjaga ikatan itulah lahir Perkumpulan BI20KRAT.",
  "maknaLogo": "Bintang delapan penjuru berwarna kuning emas melambangkan alumni yang tersebar mengabdi ke seluruh penjuru Nusantara. Angka XX di tengah menegaskan identitas Angkatan XX. Untaian padi keemasan melambangkan kesejahteraan yang diperjuangkan bagi masyarakat, dan tulisan BIROKRAT 2013 menjadi pengingat tahun awal perjalanan angkatan.",
  "maknaWarna": "Merah maroon melambangkan keberanian, semangat juang, dan jiwa korsa pamong praja — warna khas IPDN. Kuning emas melambangkan kejayaan, prestasi, dan pengabdian yang bernilai. Putih melambangkan ketulusan dan integritas.",
  "visi": "Menjadi wadah pemersatu Purna Praja Angkatan XX yang profesional, berintegritas, serta memberikan kontribusi nyata bagi bangsa dan negara.",
  "misi": [
    "Mempererat silaturahmi alumni",
    "Mengembangkan kapasitas anggota",
    "Mendorong kolaborasi lintas sektor",
    "Melaksanakan kegiatan sosial",
    "Mendukung pembangunan nasional"
  ],
  "pengurus": [
    {"jabatan": "Ketua Umum", "nama": "Nama Ketua Umum"},
    {"jabatan": "Wakil Ketua Umum", "nama": "Nama Wakil Ketua"},
    {"jabatan": "Sekretaris Jenderal", "nama": "Nama Sekjen"},
    {"jabatan": "Wakil Sekretaris Jenderal", "nama": "Nama Wasekjen"},
    {"jabatan": "Bendahara Umum", "nama": "Nama Bendahara"},
    {"jabatan": "Wakil Bendahara Umum", "nama": "Nama Wakil Bendahara"}
  ]
}'::jsonb),
('berita', '[
  {"kategori": "Organisasi", "tanggal": "28 Juni 2026", "judul": "Temu Nasional BI20KRAT 2026 Sukses Digelar", "isi": "Lebih dari 400 alumni dari 34 provinsi hadir di Jatinangor: napak tilas kampus, malam keakraban, dan penggalangan dana beasiswa."},
  {"kategori": "Prestasi Alumni", "tanggal": "2 Juni 2026", "judul": "Tiga Alumni Dilantik sebagai Kepala Dinas", "isi": "Rekan Angkatan XX dipercaya memimpin perangkat daerah strategis di tiga provinsi. Selamat mengemban amanah!"},
  {"kategori": "Kegiatan Daerah", "tanggal": "15 Juni 2026", "judul": "BI20KRAT Peduli: Baksos Panti Asuhan Kasih Bunda", "isi": "Pengurus wilayah DKI Jakarta menyalurkan bantuan pendidikan dan sembako bagi 120 anak asuh."},
  {"kategori": "Pemerintahan", "tanggal": "10 Mei 2026", "judul": "Webinar Transformasi Digital Pelayanan Publik", "isi": "Narasumber alumni berbagi pengalaman implementasi SPBE di daerah, diikuti 250 peserta daring."},
  {"kategori": "Opini", "tanggal": "1 Mei 2026", "judul": "Birokrasi yang Melayani: Refleksi Purna Praja", "isi": "Kolom opini alumni tentang reformasi birokrasi dan pelayanan publik yang berpihak pada rakyat."}
]'::jsonb),
('kegiatan', '[
  {"jenis": "Rapat", "tanggal": "20 Juli 2026", "acara": "Rapat Koordinasi Nasional Pengurus", "lokasi": "Zoom / Jakarta"},
  {"jenis": "Olahraga", "tanggal": "17 Agustus 2026", "acara": "Upacara & Gerak Jalan Kemerdekaan", "lokasi": "Serentak per wilayah"},
  {"jenis": "Seminar", "tanggal": "5 September 2026", "acara": "Seminar Kepemimpinan Birokrasi Digital", "lokasi": "Bandung"},
  {"jenis": "Business Forum", "tanggal": "3 Oktober 2026", "acara": "BI20KRAT Business Forum", "lokasi": "Jakarta"},
  {"jenis": "Family Gathering", "tanggal": "15 November 2026", "acara": "Family Gathering Nasional", "lokasi": "Bogor"}
]'::jsonb),
('program', '[
  {"nama": "BI20KRAT Peduli", "ket": "Program bantuan sosial bagi masyarakat terdampak bencana dan kelompok rentan."},
  {"nama": "BI20KRAT Mengajar", "ket": "Berbagi pengalaman dan ilmu pemerintahan kepada Praja IPDN dan generasi muda."},
  {"nama": "BI20KRAT Business Network", "ket": "Jejaring usaha alumni: kolaborasi bisnis, business matching, dan pemberdayaan ekonomi."},
  {"nama": "BI20KRAT Scholarship", "ket": "Beasiswa pendidikan bagi putra-putri alumni dan masyarakat berprestasi."},
  {"nama": "BI20KRAT Digital", "ket": "Transformasi digital alumni: literasi teknologi, portal alumni, dan layanan digital."}
]'::jsonb),
('galeri', '{
  "driveUrl": "https://drive.google.com/drive/folders/GANTI-LINK-DRIVE",
  "igUrl": "https://instagram.com/bi20krat",
  "ytUrl": "https://youtube.com/@bi20krat",
  "album": [
    {"judul": "Temu Nasional 2026", "jumlah": "128 foto"},
    {"judul": "BI20KRAT Peduli — Baksos", "jumlah": "64 foto"},
    {"judul": "Webinar SPBE", "jumlah": "32 foto"},
    {"judul": "Turnamen Olahraga 2025", "jumlah": "96 foto"},
    {"judul": "Pelantikan Pengurus", "jumlah": "48 foto"},
    {"judul": "Napak Tilas Jatinangor", "jumlah": "80 foto"}
  ]
}'::jsonb),
('kontak', '{
  "alamat": "Jakarta, Indonesia (alamat lengkap menyusul)",
  "email": "sekretariat@bi20krat.or.id",
  "whatsapp": "+62 812-0000-0000",
  "instagram": "https://instagram.com/bi20krat",
  "facebook": "https://facebook.com/bi20krat",
  "linkedin": "https://linkedin.com/company/bi20krat",
  "youtube": "https://youtube.com/@bi20krat",
  "mapsEmbed": "https://www.google.com/maps?q=Jakarta&output=embed",
  "formKontak": "https://forms.gle/GANTI-LINK-FORM-KONTAK"
}'::jsonb),
('donasi', '{
  "bank": "Bank XYZ (sesuaikan)",
  "rekening": "000-000-0000 a.n. Perkumpulan BI20KRAT",
  "waBendahara": "+62 812-0000-0000",
  "laporan": [
    {"periode": "Q2 2026", "masuk": "Rp 45.000.000", "tersalur": "Rp 38.500.000", "ket": "Baksos DKI & beasiswa 12 penerima"},
    {"periode": "Q1 2026", "masuk": "Rp 32.000.000", "tersalur": "Rp 30.000.000", "ket": "Bantuan banjir & kas rutin"}
  ]
}'::jsonb)
on conflict (key) do nothing;

-- ============================================================================
-- 4. MEMBUAT USER (lakukan manual):
--    a. Supabase Dashboard -> Authentication -> Users -> "Add user"
--       (email + password, centang auto-confirm)
--    b. Lalu set role-nya di SQL Editor, contoh:
--
--    update public.profiles set role = 'superadmin'
--      where id = (select id from auth.users where email = 'superadmin@bi20krat.or.id');
--    update public.profiles set role = 'admin'
--      where id = (select id from auth.users where email = 'admin@bi20krat.or.id');
--    -- user lain otomatis menjadi 'anggota'
-- ============================================================================
