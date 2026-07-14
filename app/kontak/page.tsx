"use client";

import { useContent } from "@/lib/content";

export default function KontakPage() {
  const c = useContent();
  const k = c.kontak;

  const saluran = [
    { nama: "WhatsApp", url: `https://wa.me/${k.whatsapp.replace(/[^0-9]/g, "")}`, ket: k.whatsapp },
    { nama: "Email", url: `mailto:${k.email}`, ket: k.email },
    { nama: "Instagram", url: k.instagram, ket: k.instagram.replace("https://instagram.com/", "@") },
    { nama: "Facebook", url: k.facebook, ket: "BI20KRAT Official" },
    { nama: "LinkedIn", url: k.linkedin, ket: "BI20KRAT" },
    { nama: "YouTube", url: k.youtube, ket: "BI20KRAT Official" },
  ];

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Hubungi Kami</p>
      <h1 className="section-title">Kontak</h1>
      <div className="gold-rule my-4" />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section className="card">
          <h2 className="font-display text-2xl text-maroon">Sekretariat BI20KRAT</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{k.alamat}</p>
          <ul className="mt-4 space-y-3">
            {saluran.map((s) => (
              <li key={s.nama}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-md border border-gold/30 px-4 py-3 transition-colors hover:bg-gold-pale"
                >
                  <span className="font-semibold text-maroon">{s.nama}</span>
                  <span className="text-sm text-ink/60">{s.ket}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={k.formKontak} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 block w-full text-center">
            Kirim Pesan via Form Kontak
          </a>
        </section>

        <section className="overflow-hidden rounded-lg border border-gold/30 bg-white shadow-sm">
          <iframe
            src={k.mapsEmbed}
            title="Lokasi Sekretariat BI20KRAT"
            className="h-full min-h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>
    </div>
  );
}
