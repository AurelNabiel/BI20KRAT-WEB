# BI20KRAT — Website Perkumpulan Purna Praja IPDN Angkatan XX

**Bhinneka Rosa Krastala — Satu Angkatan, Satu Pengabdian, Untuk Indonesia.**

Dibangun dengan Next.js 14 (App Router) + TypeScript + Tailwind CSS. Palet: maroon `#6E1423` + emas `#D9A821` (mengikuti brand logo).

## Menjalankan

```bash
npm install
npm run dev   # http://localhost:3000
```

## Halaman (Versi 1 — Company Profile)

| Route | Isi |
|---|---|
| `/` | Running text, hero logo + wordmark, highlight angka, sambutan KU, video profil, berita, agenda |
| `/tentang` | Sejarah, filosofi, makna logo/warna/motto, visi-misi, legalitas + **struktur organisasi** (digabung) |
| `/alumni` | Direktori alumni + pencarian (nama/provinsi/instansi/kab-kota/jabatan) |
| `/berita` | Berita per kategori + fitur search |
| `/kegiatan` | Upcoming event + jenis kegiatan |
| `/galeri` | Album foto, video, live streaming |
| `/program` | 5 Program Unggulan (Peduli, Mengajar, Business Network, Scholarship, Digital) |
| `/dokumen` | Download AD/ART, SOP, Proposal, Laporan Tahunan, MoU, SK |
| `/login` | Login anggota (demo: superadmin/bi20krat2013, admin/birokrat, anggota/anggota123) |
| `/cms` | Dashboard CMS anggota (terproteksi login) |
| `/cms/donasi` | Donasi — QRIS, rekening, laporan (hanya untuk user login) |
| `/kontak` | Sekretariat, Google Maps, WhatsApp, sosmed, form kontak |

## Aset Logo

- `public/logo-dark.jpg` — emblem untuk latar gelap (navbar, footer, hero)
- `public/logo-light.jpg` — emblem untuk latar terang (halaman Tentang, favicon)
- `public/wordmark.png` — wordmark "BI20KRAT — Bhinneka Rosa Krastala" (hero)

## Yang Perlu Disesuaikan (cari komentar `TODO`)

1. Link Google Form pendaftaran alumni & form kontak
2. VIDEO_ID YouTube profil, link Drive/IG/YT
3. Nomor WA, rekening & gambar QRIS (`public/qris.png`)
4. File PDF di `public/dokumen/` (ad-art.pdf, sop.pdf, dst.)
5. Nama pengurus, jumlah alumni (highlight), koordinat Google Maps
6. Data alumni contoh di `app/alumni/page.tsx`

## Roadmap

- **V1**: Company profile (situs ini)
- **V2**: Database alumni, login anggota, dashboard pengurus, KTA digital, iuran
- **V3**: Marketplace, job vacancy, forum, business matching, e-learning, mobile apps

## Deploy

Push ke GitHub → import ke [Vercel](https://vercel.com) → deploy otomatis.


## Keamanan Login

Auth saat ini adalah proteksi sisi-klien (localStorage) untuk demo Versi 1 static.
Untuk produksi (V2), WAJIB ganti dengan NextAuth.js atau backend API + database
agar kredensial dan halaman terlindungi di sisi server.

## CMS + Supabase

Konten & auth kini tersimpan di **Supabase** (PostgreSQL) — perubahan via CMS
langsung tampil untuk semua pengunjung, cocok untuk hosting di Vercel.

### Setup Supabase (sekali saja)

1. Buat project gratis di https://supabase.com
2. Buka **SQL Editor**, paste seluruh isi `supabase/setup.sql`, jalankan.
   Ini membuat tabel `profiles` & `site_sections`, kebijakan RLS, dan konten awal.
3. Buat user di **Authentication → Users → Add user** (email + password,
   centang *Auto Confirm*). Lalu set role via SQL Editor:
   ```sql
   update public.profiles set role = 'superadmin'
     where id = (select id from auth.users where email = 'superadmin@bi20krat.or.id');
   update public.profiles set role = 'admin'
     where id = (select id from auth.users where email = 'admin@bi20krat.or.id');
   ```
   User lain otomatis menjadi `anggota`.
4. Salin `.env.local.example` → `.env.local`, isi URL & anon key dari
   **Project Settings → API**.

### Hak akses (ditegakkan oleh RLS di database, bukan hanya di UI)

| Role | Hak |
|---|---|
| superadmin | Edit semua seksi (landing → kontak, donasi) |
| admin | Edit hanya `berita` & `kegiatan` |
| anggota | Hanya melihat Donasi (login) |
| publik | Baca semua konten kecuali `donasi` |

### Deploy ke Vercel

1. Push repo ke GitHub → Import di Vercel.
2. Tambahkan Environment Variables di Vercel:
   `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy — situs siap diuji orang lain. Bagikan akun `anggota` untuk
   pengujian tampilan Donasi, `admin` untuk uji edit berita/kegiatan.

Catatan keamanan: anon key memang aman diekspos di frontend; perlindungan
data sesungguhnya ada di kebijakan RLS (`supabase/setup.sql`).

## Update V6 — Berita Pop-up, Profil, Manajemen Member

1. Jalankan `supabase/update-v6.sql` di SQL Editor (setelah setup.sql).
2. Isi `SUPABASE_SERVICE_ROLE_KEY` di `.env.local` dan di Environment Variables
   Vercel (dari Project Settings → API → service_role). Key ini hanya dipakai
   server (API route) dan tidak pernah terkirim ke browser.

Fitur baru:
- **Berita pop-up**: klik kartu berita → modal berisi isi lengkap + galeri
  gambar. Gambar diisi dari CMS Berita (kolom "URL Gambar", satu URL per baris).
- **Navbar**: tombol Login otomatis berubah menjadi **Profile** saat login
  (mengikuti status auth Supabase secara realtime).
- **Profil Saya** (`/cms/profil`): semua user login dapat mengisi biodata
  singkat (nama, instansi, jabatan, domisili, bio) — tersimpan di tabel
  `profiles`, hanya bisa mengubah miliknya sendiri (RLS + trigger anti
  naik-role sendiri).
- **Member** (`/cms/member`, superadmin saja): daftar member, ubah role, dan
  tambah member baru via API `/api/admin/create-user` (service role, dengan
  verifikasi bahwa pemanggil adalah superadmin).
