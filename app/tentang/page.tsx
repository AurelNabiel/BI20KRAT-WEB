import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tentang BI20KRAT" };

const filosofi = [
  { kata: "Bhinneka", makna: "Keberagaman — alumni Angkatan XX berasal dari berbagai daerah, suku, dan latar belakang, namun tetap satu dalam persaudaraan." },
  { kata: "Rosa", makna: "Semangat dan cinta — energi pengabdian yang tulus kepada masyarakat, bangsa, dan negara." },
  { kata: "Krastala", makna: "Keteguhan — kokoh dalam integritas dan profesionalisme sebagai pamong praja di mana pun bertugas." },
];

const misi = [
  "Mempererat silaturahmi alumni",
  "Mengembangkan kapasitas anggota",
  "Mendorong kolaborasi lintas sektor",
  "Melaksanakan kegiatan sosial",
  "Mendukung pembangunan nasional",
];

const legalitas = [
  "Akta Pendirian Perkumpulan",
  "SK AHU Kementerian Hukum (Kemenkum)",
  "NPWP Perkumpulan",
  "AD/ART",
  "SK Kepengurusan",
];

export default function TentangPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Profil Perkumpulan</p>
      <h1 className="section-title">Tentang BI20KRAT</h1>
      <div className="gold-rule my-4" />

      <section className="mt-8 grid items-start gap-10 md:grid-cols-[1fr,auto]">
        <div className="max-w-3xl space-y-4 leading-relaxed text-ink/80">
          <h2 className="font-display text-2xl text-maroon">Sejarah</h2>
          <p>
            Perjalanan Angkatan XX dimulai sejak menjadi Praja di kampus IPDN
            Jatinangor pada tahun 2013 &mdash; angkatan yang dikenal dengan sebutan
            <strong> BIROKRAT 2013</strong>. Ditempa disiplin, kebersamaan, dan
            semangat pengabdian, para Purna Praja kemudian tersebar bertugas di
            pemerintahan pusat dan daerah di seluruh Indonesia. Dari kerinduan
            menjaga ikatan itulah lahir Perkumpulan <strong>BI20KRAT</strong>.
          </p>
          <h2 className="pt-4 font-display text-2xl text-maroon">Makna Logo</h2>
          <p>
            Bintang delapan penjuru berwarna kuning emas melambangkan alumni yang
            tersebar mengabdi ke seluruh penjuru Nusantara. Angka <strong>XX</strong> di
            tengah menegaskan identitas Angkatan XX. Untaian padi keemasan
            melambangkan kesejahteraan yang diperjuangkan bagi masyarakat, dan
            tulisan <strong>BIROKRAT 2013</strong> menjadi pengingat tahun awal
            perjalanan angkatan.
          </p>
          <h2 className="pt-4 font-display text-2xl text-maroon">Makna Warna</h2>
          <p>
            <strong>Merah maroon</strong> melambangkan keberanian, semangat juang, dan
            jiwa korsa pamong praja — warna khas IPDN. <strong>Kuning emas</strong> melambangkan kejayaan,
            prestasi, dan pengabdian yang bernilai. <strong>Putih</strong> melambangkan
            ketulusan dan integritas.
          </p>
        </div>
        <figure className="mx-auto">
          <Image
            src="/logo-light.jpg"
            alt="Logo BI20KRAT versi terang"
            width={280}
            height={280}
            className="rounded-lg border border-gold/30 shadow-sm"
          />
          <figcaption className="mt-2 text-center text-xs text-ink/50">
            Lambang BI20KRAT &mdash; BIROKRAT 2013
          </figcaption>
        </figure>
      </section>

      {/* Filosofi nama */}
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

      {/* Visi Misi */}
      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-2xl text-maroon">Visi</h2>
          <p className="mt-3 leading-relaxed text-ink/80">
            Menjadi wadah pemersatu Purna Praja Angkatan XX yang profesional,
            berintegritas, serta memberikan kontribusi nyata bagi bangsa dan
            negara.
          </p>
        </div>
        <div className="card">
          <h2 className="font-display text-2xl text-maroon">Misi</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-ink/80">
            {misi.map((m) => <li key={m}>{m}</li>)}
          </ol>
        </div>
      </section>

      {/* Legalitas */}
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
        <p className="mt-3 text-xs text-ink/50">
          * Dokumen legalitas dapat diunduh pada halaman <a href="/dokumen" className="text-maroon underline">Dokumen</a>.
        </p>
      </section>
    </div>
  );
}
