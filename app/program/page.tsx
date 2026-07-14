"use client";

import { useContent } from "@/lib/content";

const ikon = ["\u2764", "\uD83C\uDF93", "\uD83E\uDD1D", "\uD83C\uDFC6", "\uD83D\uDCBB", "\u2B50"];

export default function ProgramPage() {
  const c = useContent();

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Kontribusi Nyata</p>
      <h1 className="section-title">Program Unggulan</h1>
      <div className="gold-rule my-4" />

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {c.program.map((p, i) => (
          <div key={p.nama} className="card border-t-4 border-t-gold">
            <div className="text-3xl" aria-hidden="true">{ikon[i % ikon.length]}</div>
            <h2 className="mt-3 font-display text-xl text-maroon">{p.nama}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.ket}</p>
          </div>
        ))}
        <div className="card flex flex-col items-center justify-center border-2 border-dashed border-gold/50 bg-gold-pale/40 text-center">
          <p className="font-display text-lg text-maroon">Punya ide program?</p>
          <p className="mt-1 text-sm text-ink/70">Sampaikan usulanmu ke pengurus melalui halaman kontak.</p>
          <a href="/kontak" className="btn-primary mt-4">Hubungi Kami</a>
        </div>
      </div>
    </div>
  );
}
