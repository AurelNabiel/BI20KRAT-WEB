"use client";

import { useMemo, useState } from "react";
import { useContent } from "@/lib/content";

const kategoriList = ["Semua", "Organisasi", "Prestasi Alumni", "Pemerintahan", "Kegiatan Daerah", "Opini", "Artikel"];

export default function BeritaPage() {
  const c = useContent();
  const [kategori, setKategori] = useState("Semua");
  const [q, setQ] = useState("");

  const hasil = useMemo(() => {
    const term = q.toLowerCase();
    return c.berita.filter(
      (b) =>
        (kategori === "Semua" || b.kategori === kategori) &&
        (!term || b.judul.toLowerCase().includes(term) || b.isi.toLowerCase().includes(term))
    );
  }, [c.berita, kategori, q]);

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Informasi &amp; Publikasi</p>
      <h1 className="section-title">Berita</h1>
      <div className="gold-rule my-4" />

      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari berita..."
        className="mt-6 w-full max-w-md rounded-md border border-gold/40 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label="Cari berita"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {kategoriList.map((k) => (
          <button
            key={k}
            onClick={() => setKategori(k)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              kategori === k ? "bg-maroon text-gold-light" : "bg-white text-maroon border border-gold/40 hover:bg-gold-pale"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {hasil.map((b) => (
          <article key={b.judul} className="card transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-gold-pale px-3 py-1 text-xs font-semibold uppercase tracking-wider text-maroon">{b.kategori}</span>
              <time className="text-xs text-ink/50">{b.tanggal}</time>
            </div>
            <h2 className="mt-3 font-display text-xl text-maroon">{b.judul}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{b.isi}</p>
          </article>
        ))}
        {hasil.length === 0 && (
          <p className="col-span-full rounded-md border border-gold/30 bg-white px-6 py-8 text-center text-sm text-ink/60">Tidak ada berita yang cocok.</p>
        )}
      </div>
    </div>
  );
}
