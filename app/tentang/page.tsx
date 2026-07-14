"use client";

import Image from "next/image";
import { useContent } from "@/lib/content";

const filosofi = [
  { kata: "Bhinneka", makna: "Keberagaman — alumni Angkatan XX berasal dari berbagai daerah, suku, dan latar belakang, namun tetap satu dalam persaudaraan." },
  { kata: "Rosa", makna: "Semangat dan cinta — energi pengabdian yang tulus kepada masyarakat, bangsa, dan negara." },
  { kata: "Krastala", makna: "Keteguhan — kokoh dalam integritas dan profesionalisme sebagai pamong praja di mana pun bertugas." },
];

const legalitas = [
  "Akta Pendirian Perkumpulan",
  "SK AHU Kementerian Hukum (Kemenkum)",
  "NPWP Perkumpulan",
  "AD/ART",
  "SK Kepengurusan",
];

const dewanPembina = ["Nama Pembina 1", "Nama Pembina 2", "Nama Pembina 3"];
const dewanPenasehat = ["Nama Penasehat 1", "Nama Penasehat 2", "Nama Penasehat 3"];

const bidang = [
  "Bidang Organisasi & Keanggotaan",
  "Bidang Sosial & Kemasyarakatan",
  "Bidang Pengembangan SDM & Pendidikan",
  "Bidang Humas, Media & Publikasi",
  "Bidang Kerjasama & Kemitraan",
  "Bidang Ekonomi & Kewirausahaan",
];

const timeline = [
  { periode: "2013–2017", keterangan: "Masa pendidikan Praja Angkatan XX di IPDN (BIROKRAT 2013)." },
  { periode: "2017–2024", keterangan: "Alumni tersebar bertugas; silaturahmi terjaga melalui komunitas wilayah." },
  { periode: "2024–sekarang", keterangan: "Pembentukan Perkumpulan BI20KRAT dan kepengurusan nasional masa bakti pertama." },
];

export default function TentangPage() {
  const c = useContent();
  const t = c.tentang;

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Profil Perkumpulan</p>
      <h1 className="section-title">Tentang BI20KRAT</h1>
      <div className="gold-rule my-4" />

      <section className="mt-8 grid items-start gap-10 md:grid-cols-[1fr,auto]">
        <div className="max-w-3xl space-y-4 leading-relaxed text-ink/80">
          <h2 className="font-display text-2xl text-maroon">Sejarah</h2>
          <p>{t.sejarah}</p>
          <h2 className="pt-4 font-display text-2xl text-maroon">Makna Logo</h2>
          <p>{t.maknaLogo}</p>
          <h2 className="pt-4 font-display text-2xl text-maroon">Makna Warna</h2>
          <p>{t.maknaWarna}</p>
        </div>
        <figure className="mx-auto">
          <Image src="/logo-light.jpg" alt="Logo BI20KRAT versi terang" width={280} height={280} className="rounded-lg border border-gold/30 shadow-sm" />
          <figcaption className="mt-2 text-center text-xs text-ink/50">Lambang BI20KRAT &mdash; BIROKRAT 2013</figcaption>
        </figure>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-maroon">Filosofi &ldquo;Bhinneka Rosa Krastala&rdquo;</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {filosofi.map((f) => (
            <div key={f.kata} className="card border-t-4 border-t-gold">
              <h3 className="font-display text-xl text-maroon">{f.kata}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{f.makna}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm italic text-ink/60">
          Makna Motto: &ldquo;Satu Angkatan, Satu Pengabdian, Untuk Indonesia.&rdquo;
        </p>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-2xl text-maroon">Visi</h2>
          <p className="mt-3 leading-relaxed text-ink/80">{t.visi}</p>
        </div>
        <div className="card">
          <h2 className="font-display text-2xl text-maroon">Misi</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-ink/80">
            {t.misi.map((m) => <li key={m}>{m}</li>)}
          </ol>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-maroon">Legalitas</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {legalitas.map((l) => (
            <li key={l} className="flex items-center gap-3 rounded-md border border-gold/30 bg-white px-4 py-3 text-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-ink/80">{l}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== ORGANISASI ===== */}
      <section className="mt-16 border-t-2 border-gold/40 pt-10" id="organisasi">
        <p className="eyebrow">Struktur &amp; Kepengurusan</p>
        <h2 className="section-title">Organisasi</h2>
        <div className="gold-rule my-4" />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="card">
            <h3 className="font-display text-xl text-maroon">Dewan Pembina</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              {dewanPembina.map((n) => <li key={n}>&bull; {n}</li>)}
            </ul>
          </div>
          <div className="card">
            <h3 className="font-display text-xl text-maroon">Dewan Penasehat</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              {dewanPenasehat.map((n) => <li key={n}>&bull; {n}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-2xl text-maroon">Pengurus Harian</h3>
          <div className="mt-4 overflow-hidden rounded-lg border border-gold/30 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-maroon text-white">
                <tr>
                  <th className="px-6 py-3 font-semibold">Jabatan</th>
                  <th className="px-6 py-3 font-semibold">Nama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/20">
                {t.pengurus.map((p) => (
                  <tr key={p.jabatan}>
                    <td className="px-6 py-3 font-medium text-maroon">{p.jabatan}</td>
                    <td className="px-6 py-3 text-ink/80">{p.nama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-2xl text-maroon">Bidang-Bidang</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bidang.map((b) => (
              <div key={b} className="card py-4">
                <p className="font-semibold text-maroon">{b}</p>
                <p className="mt-1 text-sm text-ink/60">Ketua Bidang: &mdash;</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-2xl text-maroon">Masa Bakti &amp; Timeline Kepengurusan</h3>
          <ol className="relative mt-6 space-y-6 border-l-2 border-gold pl-6">
            {timeline.map((tl) => (
              <li key={tl.periode} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gold ring-4 ring-gold-pale" aria-hidden="true" />
                <p className="font-display text-lg text-maroon">{tl.periode}</p>
                <p className="text-sm text-ink/70">{tl.keterangan}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
