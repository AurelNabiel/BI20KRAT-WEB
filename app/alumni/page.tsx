"use client";

import { useMemo, useState } from "react";

// TODO: ganti dengan link resmi
const FORM_URL = "https://forms.gle/GANTI-LINK-FORM";

type Alumni = {
  nama: string;
  provinsi: string;
  kabKota: string;
  instansi: string;
  jabatan: string;
};

// Data contoh — nantinya diganti data asli (Google Sheet / API)
const dataAlumni: Alumni[] = [
  { nama: "Contoh Alumni 1", provinsi: "DKI Jakarta", kabKota: "Jakarta Selatan", instansi: "Kemendagri", jabatan: "Analis Kebijakan" },
  { nama: "Contoh Alumni 2", provinsi: "Jawa Barat", kabKota: "Kab. Bandung", instansi: "Pemkab Bandung", jabatan: "Camat" },
  { nama: "Contoh Alumni 3", provinsi: "Sumatera Utara", kabKota: "Kota Medan", instansi: "Pemkot Medan", jabatan: "Kabid" },
  { nama: "Contoh Alumni 4", provinsi: "Sulawesi Selatan", kabKota: "Kota Makassar", instansi: "Pemprov Sulsel", jabatan: "Kasubag" },
  { nama: "Contoh Alumni 5", provinsi: "Papua", kabKota: "Kota Jayapura", instansi: "Pemprov Papua", jabatan: "Lurah" },
  { nama: "Contoh Alumni 6", provinsi: "Kalimantan Timur", kabKota: "Kota Samarinda", instansi: "Pemprov Kaltim", jabatan: "Sekcam" },
];

export default function AlumniPage() {
  const [q, setQ] = useState("");
  const [provinsi, setProvinsi] = useState("Semua");

  const daftarProvinsi = useMemo(
    () => ["Semua", ...Array.from(new Set(dataAlumni.map((a) => a.provinsi))).sort()],
    []
  );

  const hasil = useMemo(() => {
    const term = q.toLowerCase();
    return dataAlumni.filter((a) => {
      const cocokProvinsi = provinsi === "Semua" || a.provinsi === provinsi;
      const cocokTeks =
        !term ||
        [a.nama, a.instansi, a.kabKota, a.jabatan].some((v) => v.toLowerCase().includes(term));
      return cocokProvinsi && cocokTeks;
    });
  }, [q, provinsi]);

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Jaringan Angkatan XX</p>
      <h1 className="section-title">Direktori Alumni</h1>
      <div className="gold-rule my-4" />

      <p className="mt-6 max-w-3xl leading-relaxed text-ink/80">
        Cari alumni berdasarkan nama, provinsi, instansi, kabupaten/kota, atau
        jabatan. Data dikelola sekretariat dan hanya menampilkan informasi yang
        disetujui oleh yang bersangkutan.
      </p>

      {/* Pencarian */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari nama, instansi, kab/kota, jabatan..."
          className="w-full rounded-md border border-gold/40 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Cari alumni"
        />
        <select
          value={provinsi}
          onChange={(e) => setProvinsi(e.target.value)}
          className="rounded-md border border-gold/40 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Filter provinsi"
        >
          {daftarProvinsi.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Hasil */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hasil.map((a) => (
          <div key={a.nama} className="card">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-maroon font-display text-xl text-gold">
                {a.nama.split(" ").slice(-1)[0][0]}
              </div>
              <div>
                <p className="font-semibold text-maroon">{a.nama}</p>
                <p className="text-xs text-gold">Angkatan XX &middot; BIROKRAT 2013</p>
              </div>
            </div>
            <dl className="mt-4 space-y-1 text-sm text-ink/80">
              <div className="flex justify-between"><dt className="text-ink/50">Instansi</dt><dd>{a.instansi}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/50">Jabatan</dt><dd>{a.jabatan}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/50">Domisili</dt><dd>{a.kabKota}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/50">Provinsi</dt><dd>{a.provinsi}</dd></div>
            </dl>
          </div>
        ))}
        {hasil.length === 0 && (
          <p className="col-span-full rounded-md border border-gold/30 bg-white px-6 py-8 text-center text-sm text-ink/60">
            Tidak ada alumni yang cocok dengan pencarian. Coba kata kunci lain.
          </p>
        )}
      </div>

      <div className="mt-10 rounded-lg border border-gold/30 bg-gold-pale/50 p-6 text-center">
        <p className="font-display text-xl text-maroon">Belum terdaftar di direktori?</p>
        <p className="mt-1 text-sm text-ink/70">Isi formulir pendaftaran alumni agar datamu tercatat resmi.</p>
        <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">
          Isi Formulir Data Alumni
        </a>
      </div>
    </div>
  );
}
