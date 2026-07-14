// ==========================================================================
// CONTENT STORE — sumber data seluruh situs.
// Konten default tersimpan di sini; perubahan via CMS disimpan di localStorage.
// CATATAN V2: ganti dengan database + API agar perubahan berlaku untuk semua
// pengunjung (localStorage hanya berlaku di browser masing-masing).
// ==========================================================================
"use client";

import { useEffect, useState } from "react";

export type Berita = { kategori: string; tanggal: string; judul: string; isi: string; gambar?: string };
// `gambar`: daftar URL gambar dipisah baris baru (opsional)
export type AgendaItem = { jenis: string; tanggal: string; acara: string; lokasi: string };
export type Highlight = { angka: string; label: string };
export type ProgramItem = { nama: string; ket: string };
export type AlbumItem = { judul: string; jumlah: string };
export type Pengurus = { jabatan: string; nama: string };

export type SiteContent = {
  landing: {
    runningNews: string;
    tagline: string;
    sambutanJudul: string;
    sambutanIsi: string;
    videoId: string;
    highlight: Highlight[];
  };
  tentang: {
    sejarah: string;
    maknaLogo: string;
    maknaWarna: string;
    visi: string;
    misi: string[];
    pengurus: Pengurus[];
  };
  berita: Berita[];
  kegiatan: AgendaItem[];
  program: ProgramItem[];
  galeri: {
    album: AlbumItem[];
    driveUrl: string;
    igUrl: string;
    ytUrl: string;
  };
  kontak: {
    alamat: string;
    email: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    mapsEmbed: string;
    formKontak: string;
  };
  donasi: {
    bank: string;
    rekening: string;
    waBendahara: string;
    laporan: { periode: string; masuk: string; tersalur: string; ket: string }[];
  };
};

export const defaultContent: SiteContent = {
  landing: {
    runningNews:
      "Reuni Akbar BI20KRAT 2026 sukses digelar \u2022 Pendaftaran BI20KRAT Scholarship dibuka hingga 31 Agustus 2026 \u2022 BI20KRAT Peduli salurkan bantuan sosial \u2022 Rakornas Pengurus 20 Juli 2026 via Zoom \u2022 ",
    tagline: "Bhinneka Rosa Krastala \u2014 Satu Angkatan, Satu Pengabdian, Untuk Indonesia.",
    sambutanJudul: "Salam Bhinneka Rosa Krastala",
    sambutanIsi:
      "Rekan-rekan Purna Praja Angkatan XX yang saya banggakan \u2014 website ini adalah rumah digital kita bersama. Dari Jatinangor kita ditempa, dan kini di seluruh penjuru negeri kita mengabdi. Mari jadikan BI20KRAT wadah untuk saling menguatkan, berkolaborasi lintas sektor, dan berkontribusi nyata bagi bangsa dan negara.",
    videoId: "VIDEO_ID",
    highlight: [
      { angka: "800+", label: "Alumni" },
      { angka: "34", label: "Provinsi" },
      { angka: "300+", label: "Kabupaten/Kota" },
      { angka: "60+", label: "Pengurus" },
      { angka: "5", label: "Program Kerja Berjalan" },
    ],
  },
  tentang: {
    sejarah:
      "Perjalanan Angkatan XX dimulai sejak menjadi Praja di kampus IPDN Jatinangor pada tahun 2013 \u2014 angkatan yang dikenal dengan sebutan BIROKRAT 2013. Ditempa disiplin, kebersamaan, dan semangat pengabdian, para Purna Praja kemudian tersebar bertugas di pemerintahan pusat dan daerah di seluruh Indonesia. Dari kerinduan menjaga ikatan itulah lahir Perkumpulan BI20KRAT.",
    maknaLogo:
      "Bintang delapan penjuru berwarna kuning emas melambangkan alumni yang tersebar mengabdi ke seluruh penjuru Nusantara. Angka XX di tengah menegaskan identitas Angkatan XX. Untaian padi keemasan melambangkan kesejahteraan yang diperjuangkan bagi masyarakat, dan tulisan BIROKRAT 2013 menjadi pengingat tahun awal perjalanan angkatan.",
    maknaWarna:
      "Merah maroon melambangkan keberanian, semangat juang, dan jiwa korsa pamong praja \u2014 warna khas IPDN. Kuning emas melambangkan kejayaan, prestasi, dan pengabdian yang bernilai. Putih melambangkan ketulusan dan integritas.",
    visi:
      "Menjadi wadah pemersatu Purna Praja Angkatan XX yang profesional, berintegritas, serta memberikan kontribusi nyata bagi bangsa dan negara.",
    misi: [
      "Mempererat silaturahmi alumni",
      "Mengembangkan kapasitas anggota",
      "Mendorong kolaborasi lintas sektor",
      "Melaksanakan kegiatan sosial",
      "Mendukung pembangunan nasional",
    ],
    pengurus: [
      { jabatan: "Ketua Umum", nama: "Nama Ketua Umum" },
      { jabatan: "Wakil Ketua Umum", nama: "Nama Wakil Ketua" },
      { jabatan: "Sekretaris Jenderal", nama: "Nama Sekjen" },
      { jabatan: "Wakil Sekretaris Jenderal", nama: "Nama Wasekjen" },
      { jabatan: "Bendahara Umum", nama: "Nama Bendahara" },
      { jabatan: "Wakil Bendahara Umum", nama: "Nama Wakil Bendahara" },
    ],
  },
  berita: [
    { kategori: "Organisasi", tanggal: "28 Juni 2026", judul: "Temu Nasional BI20KRAT 2026 Sukses Digelar", isi: "Lebih dari 400 alumni dari 34 provinsi hadir di Jatinangor: napak tilas kampus, malam keakraban, dan penggalangan dana beasiswa." },
    { kategori: "Prestasi Alumni", tanggal: "2 Juni 2026", judul: "Tiga Alumni Dilantik sebagai Kepala Dinas", isi: "Rekan Angkatan XX dipercaya memimpin perangkat daerah strategis di tiga provinsi. Selamat mengemban amanah!" },
    { kategori: "Kegiatan Daerah", tanggal: "15 Juni 2026", judul: "BI20KRAT Peduli: Baksos Panti Asuhan Kasih Bunda", isi: "Pengurus wilayah DKI Jakarta menyalurkan bantuan pendidikan dan sembako bagi 120 anak asuh." },
    { kategori: "Pemerintahan", tanggal: "10 Mei 2026", judul: "Webinar Transformasi Digital Pelayanan Publik", isi: "Narasumber alumni berbagi pengalaman implementasi SPBE di daerah, diikuti 250 peserta daring." },
    { kategori: "Opini", tanggal: "1 Mei 2026", judul: "Birokrasi yang Melayani: Refleksi Purna Praja", isi: "Kolom opini alumni tentang reformasi birokrasi dan pelayanan publik yang berpihak pada rakyat." },
  ],
  kegiatan: [
    { jenis: "Rapat", tanggal: "20 Juli 2026", acara: "Rapat Koordinasi Nasional Pengurus", lokasi: "Zoom / Jakarta" },
    { jenis: "Olahraga", tanggal: "17 Agustus 2026", acara: "Upacara & Gerak Jalan Kemerdekaan", lokasi: "Serentak per wilayah" },
    { jenis: "Seminar", tanggal: "5 September 2026", acara: "Seminar Kepemimpinan Birokrasi Digital", lokasi: "Bandung" },
    { jenis: "Business Forum", tanggal: "3 Oktober 2026", acara: "BI20KRAT Business Forum", lokasi: "Jakarta" },
    { jenis: "Family Gathering", tanggal: "15 November 2026", acara: "Family Gathering Nasional", lokasi: "Bogor" },
  ],
  program: [
    { nama: "BI20KRAT Peduli", ket: "Program bantuan sosial bagi masyarakat terdampak bencana dan kelompok rentan." },
    { nama: "BI20KRAT Mengajar", ket: "Berbagi pengalaman dan ilmu pemerintahan kepada Praja IPDN dan generasi muda." },
    { nama: "BI20KRAT Business Network", ket: "Jejaring usaha alumni: kolaborasi bisnis, business matching, dan pemberdayaan ekonomi." },
    { nama: "BI20KRAT Scholarship", ket: "Beasiswa pendidikan bagi putra-putri alumni dan masyarakat berprestasi." },
    { nama: "BI20KRAT Digital", ket: "Transformasi digital alumni: literasi teknologi, portal alumni, dan layanan digital." },
  ],
  galeri: {
    album: [
      { judul: "Temu Nasional 2026", jumlah: "128 foto" },
      { judul: "BI20KRAT Peduli \u2014 Baksos", jumlah: "64 foto" },
      { judul: "Webinar SPBE", jumlah: "32 foto" },
      { judul: "Turnamen Olahraga 2025", jumlah: "96 foto" },
      { judul: "Pelantikan Pengurus", jumlah: "48 foto" },
      { judul: "Napak Tilas Jatinangor", jumlah: "80 foto" },
    ],
    driveUrl: "https://drive.google.com/drive/folders/GANTI-LINK-DRIVE",
    igUrl: "https://instagram.com/bi20krat",
    ytUrl: "https://youtube.com/@bi20krat",
  },
  kontak: {
    alamat: "Jakarta, Indonesia (alamat lengkap menyusul)",
    email: "sekretariat@bi20krat.or.id",
    whatsapp: "+62 812-0000-0000",
    instagram: "https://instagram.com/bi20krat",
    facebook: "https://facebook.com/bi20krat",
    linkedin: "https://linkedin.com/company/bi20krat",
    youtube: "https://youtube.com/@bi20krat",
    mapsEmbed: "https://www.google.com/maps?q=Jakarta&output=embed",
    formKontak: "https://forms.gle/GANTI-LINK-FORM-KONTAK",
  },
  donasi: {
    bank: "Bank XYZ (sesuaikan)",
    rekening: "000-000-0000 a.n. Perkumpulan BI20KRAT",
    waBendahara: "+62 812-0000-0000",
    laporan: [
      { periode: "Q2 2026", masuk: "Rp 45.000.000", tersalur: "Rp 38.500.000", ket: "Baksos DKI & beasiswa 12 penerima" },
      { periode: "Q1 2026", masuk: "Rp 32.000.000", tersalur: "Rp 30.000.000", ket: "Bantuan banjir & kas rutin" },
    ],
  },
};

/* ====================== PENYIMPANAN via SUPABASE ====================== */

import { supabase, supabaseConfigured } from "@/lib/supabase";

function deepMerge<T>(base: T, override: any): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || typeof base !== "object" || base === null) return override as T;
  const out: any = { ...base };
  for (const k of Object.keys(override)) out[k] = deepMerge((base as any)[k], override[k]);
  return out;
}

const SECTION_KEYS = ["landing", "tentang", "berita", "kegiatan", "program", "galeri", "kontak", "donasi"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

/**
 * Ambil seluruh konten dari tabel site_sections.
 * Seksi yang tidak terbaca (mis. donasi saat belum login, karena RLS)
 * memakai nilai default.
 */
export async function fetchContent(): Promise<SiteContent> {
  if (!supabaseConfigured()) return defaultContent;
  try {
    const { data, error } = await supabase().from("site_sections").select("key, data");
    if (error || !data) return defaultContent;
    const merged: any = { ...defaultContent };
    for (const row of data) {
      if ((SECTION_KEYS as readonly string[]).includes(row.key)) {
        merged[row.key] = deepMerge((defaultContent as any)[row.key], row.data);
      }
    }
    return merged as SiteContent;
  } catch {
    return defaultContent;
  }
}

/** Simpan SATU seksi (RLS di database yang menegakkan hak akses per role). */
export async function saveSection(key: SectionKey, data: unknown): Promise<{ ok: boolean; message?: string }> {
  const { error } = await supabase()
    .from("site_sections")
    .upsert({ key, data }, { onConflict: "key" });
  if (error) return { ok: false, message: error.message };
  window.dispatchEvent(new Event("bi20krat-content-updated"));
  return { ok: true };
}

/** Hook: baca konten dari Supabase (fallback ke default saat loading/gagal). */
export function useContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => {
    let aktif = true;
    const sync = async () => {
      const c = await fetchContent();
      if (aktif) setContent(c);
    };
    sync();
    window.addEventListener("bi20krat-content-updated", sync);
    return () => {
      aktif = false;
      window.removeEventListener("bi20krat-content-updated", sync);
    };
  }, []);
  return content;
}
