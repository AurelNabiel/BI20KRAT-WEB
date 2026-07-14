"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/content";

export default function HomePage() {
  const c = useContent();
  const berita = c.berita.slice(0, 3);
  const agenda = c.kegiatan.slice(0, 3);

  return (
    <>
      <div className="overflow-hidden border-b border-gold/40 bg-maroon-dark py-2 text-sm text-gold-pale">
        <div className="animate-marquee whitespace-nowrap">{c.landing.runningNews.repeat(2)}</div>
      </div>

      <section className="relative overflow-hidden bg-maroon text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 34px, #D9A821 34px, #D9A821 36px)" }}
          aria-hidden="true"
        />
        <div className="container-page relative py-16 text-center sm:py-24">
          <Image src="/logo-light.jpg" alt="Logo BI20KRAT" width={160} height={160} className="mx-auto rounded-full ring-4 ring-gold" priority />
          <p className="mx-auto mt-6 max-w-2xl text-lg italic text-gold-pale">&ldquo;{c.landing.tagline}&rdquo;</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/alumni" className="btn-gold">Direktori Alumni</Link>
            <Link href="/tentang" className="btn-outline border-gold-light text-gold-light hover:bg-maroon-light">Tentang BI20KRAT</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-gold/30 bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-10 text-center sm:grid-cols-4">
          {c.landing.highlight.map((h) => (
            <div key={h.label}>
              <p className="font-display text-3xl text-maroon sm:text-4xl">{h.angka}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">{h.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid items-center gap-10 md:grid-cols-[auto,1fr]">
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-4 border-gold bg-maroon font-display text-5xl text-gold">KU</div>
          <div>
            <p className="eyebrow">Sambutan Ketua Umum</p>
            <h2 className="section-title">{c.landing.sambutanJudul}</h2>
            <p className="mt-4 leading-relaxed text-ink/80">{c.landing.sambutanIsi}</p>
            <p className="mt-4 font-semibold text-maroon">Ketua Umum BI20KRAT</p>
          </div>
        </div>
        <div className="mt-10 overflow-hidden rounded-lg border border-gold/30 bg-maroon-dark">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${c.landing.videoId}`}
              title="Video Profil BI20KRAT"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-gold-pale/40 py-16">
        <div className="container-page">
          <p className="eyebrow">Kabar Angkatan</p>
          <h2 className="section-title">Berita Terbaru</h2>
          <div className="gold-rule my-4" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {berita.map((b) => (
              <article key={b.judul} className="card transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gold-pale px-3 py-1 text-xs font-semibold uppercase tracking-wider text-maroon">{b.kategori}</span>
                  <time className="text-xs text-ink/50">{b.tanggal}</time>
                </div>
                <h3 className="mt-3 font-display text-lg text-maroon">{b.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{b.isi}</p>
                <Link href="/berita" className="mt-4 inline-block text-sm font-semibold text-maroon hover:text-gold">Baca selengkapnya &rarr;</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow">Jangan Terlewat</p>
        <h2 className="section-title">Agenda Terdekat</h2>
        <div className="gold-rule my-4" />
        <ul className="mt-6 divide-y divide-gold/30 rounded-lg border border-gold/30 bg-white">
          {agenda.map((a) => (
            <li key={a.acara} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-maroon">{a.acara}</p>
                <p className="text-sm text-ink/60">{a.lokasi}</p>
              </div>
              <time className="text-sm font-semibold text-gold">{a.tanggal}</time>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center"><Link href="/kegiatan" className="btn-primary">Lihat Semua Kegiatan</Link></div>
      </section>
    </>
  );
}
