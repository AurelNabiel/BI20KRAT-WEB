"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useContent, type Berita } from "@/lib/content";

const kategoriList = ["Semua", "Organisasi", "Prestasi Alumni", "Pemerintahan", "Kegiatan Daerah", "Opini", "Artikel"];

function daftarGambar(b: Berita): string[] {
  return (b.gambar ?? "")
    .split(/\r?\n|,/)
    .map((u) => u.trim())
    .filter((u) => u.startsWith("http"));
}

export default function BeritaPage() {
  const c = useContent();
  const [kategori, setKategori] = useState("Semua");
  const [q, setQ] = useState("");
  const [terpilih, setTerpilih] = useState<Berita | null>(null);

  // tutup modal dengan tombol Esc + kunci scroll halaman
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setTerpilih(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = terpilih ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [terpilih]);

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
        {hasil.map((b) => {
          const gambar = daftarGambar(b);
          return (
            <article
              key={b.judul}
              onClick={() => setTerpilih(b)}
              className="card cursor-pointer transition-shadow hover:shadow-md"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setTerpilih(b)}
            >
              {gambar[0] && (
                <div className="relative -mx-6 -mt-6 mb-4 aspect-video overflow-hidden rounded-t-lg bg-gold-pale/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={gambar[0]} alt={b.judul} className="h-full w-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-gold-pale px-3 py-1 text-xs font-semibold uppercase tracking-wider text-maroon">{b.kategori}</span>
                <time className="text-xs text-ink/50">{b.tanggal}</time>
              </div>
              <h2 className="mt-3 font-display text-xl text-maroon">{b.judul}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">{b.isi}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-maroon">Baca selengkapnya &rarr;</span>
            </article>
          );
        })}
        {hasil.length === 0 && (
          <p className="col-span-full rounded-md border border-gold/30 bg-white px-6 py-8 text-center text-sm text-ink/60">Tidak ada berita yang cocok.</p>
        )}
      </div>

      {/* ===================== POP-UP DETAIL BERITA ===================== */}
      {terpilih && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setTerpilih(null)}
          role="dialog"
          aria-modal="true"
          aria-label={terpilih.judul}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border-2 border-gold bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-gold/30 bg-maroon px-6 py-4">
              <div>
                <span className="rounded-full bg-gold px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-maroon-dark">
                  {terpilih.kategori}
                </span>
                <h2 className="mt-2 font-display text-xl text-white">{terpilih.judul}</h2>
                <time className="text-xs text-gold-pale">{terpilih.tanggal}</time>
              </div>
              <button
                onClick={() => setTerpilih(null)}
                className="shrink-0 rounded-md p-1.5 text-gold-pale hover:bg-maroon-light"
                aria-label="Tutup"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6">
              {/* Galeri gambar berita */}
              {daftarGambar(terpilih).length > 0 && (
                <div className={`mb-6 grid gap-3 ${daftarGambar(terpilih).length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {daftarGambar(terpilih).map((url, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={url + i}
                      src={url}
                      alt={`${terpilih.judul} — gambar ${i + 1}`}
                      className="w-full rounded-md border border-gold/30 object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              <p className="whitespace-pre-line leading-relaxed text-ink/80">{terpilih.isi}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
