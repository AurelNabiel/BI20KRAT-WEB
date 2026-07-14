"use client";

import { useContent } from "@/lib/content";

export default function GaleriPage() {
  const c = useContent();
  const g = c.galeri;

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Dokumentasi Visual</p>
      <h1 className="section-title">Galeri</h1>
      <div className="gold-rule my-4" />

      <h2 className="mt-8 font-display text-2xl text-maroon">Album Foto</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {g.album.map((a) => (
          <a
            key={a.judul}
            href={g.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex aspect-video items-end overflow-hidden rounded-lg bg-maroon shadow-sm transition-shadow hover:shadow-lg"
          >
            <div
              className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
              style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 20px, #D9A821 20px, #D9A821 22px)" }}
              aria-hidden="true"
            />
            <div className="relative w-full bg-gradient-to-t from-maroon-dark to-transparent p-4">
              <p className="font-display text-lg text-white">{a.judul}</p>
              <p className="text-xs text-gold-pale">{a.jumlah}</p>
            </div>
          </a>
        ))}
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-2xl text-maroon">Video</h2>
          <p className="mt-2 text-sm text-ink/70">Dokumentasi video kegiatan di kanal resmi:</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={g.ytUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">YouTube</a>
            <a href={g.igUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">Instagram Reels</a>
          </div>
        </div>
        <div className="card">
          <h2 className="font-display text-2xl text-maroon">Live Streaming</h2>
          <p className="mt-2 text-sm text-ink/70">Saksikan siaran langsung acara BI20KRAT:</p>
          <a href={`${g.ytUrl}/streams`} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4">Tonton Live</a>
        </div>
      </section>
    </div>
  );
}
