import type { Metadata } from "next";

export const metadata: Metadata = { title: "Kegiatan" };

const upcoming = [
  { jenis: "Rapat", tanggal: "20 Juli 2026", acara: "Rapat Koordinasi Nasional Pengurus", lokasi: "Zoom / Jakarta" },
  { jenis: "Olahraga", tanggal: "17 Agustus 2026", acara: "Upacara & Gerak Jalan Kemerdekaan", lokasi: "Serentak per wilayah" },
  { jenis: "Seminar", tanggal: "5 September 2026", acara: "Seminar Kepemimpinan Birokrasi Digital", lokasi: "Bandung" },
  { jenis: "Business Forum", tanggal: "3 Oktober 2026", acara: "BI20KRAT Business Forum", lokasi: "Jakarta" },
  { jenis: "Family Gathering", tanggal: "15 November 2026", acara: "Family Gathering Nasional", lokasi: "Bogor" },
];

const jenisKegiatan = [
  { nama: "Seminar", ket: "Peningkatan kapasitas dan wawasan kebijakan publik." },
  { nama: "Reuni", ket: "Temu kangen dan napak tilas angkatan." },
  { nama: "Bakti Sosial", ket: "Kepedulian nyata bagi masyarakat melalui BI20KRAT Peduli." },
  { nama: "Olahraga", ket: "Turnamen dan kegiatan kebugaran antarwilayah." },
  { nama: "Family Gathering", ket: "Mempererat kekeluargaan alumni beserta keluarga." },
  { nama: "Business Forum", ket: "Jejaring usaha dan business matching antaralumni." },
];

export default function KegiatanPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Agenda &amp; Aktivitas</p>
      <h1 className="section-title">Kegiatan</h1>
      <div className="gold-rule my-4" />

      <section className="mt-8">
        <h2 className="font-display text-2xl text-maroon">Upcoming Event</h2>
        <ul className="mt-4 divide-y divide-gold/30 rounded-lg border border-gold/30 bg-white">
          {upcoming.map((a) => (
            <li key={a.acara} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="mr-2 rounded-full bg-gold-pale px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-maroon">{a.jenis}</span>
                <span className="font-semibold text-maroon">{a.acara}</span>
                <p className="mt-1 text-sm text-ink/60">{a.lokasi}</p>
              </div>
              <time className="text-sm font-semibold text-gold">{a.tanggal}</time>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-maroon">Jenis Kegiatan</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jenisKegiatan.map((j) => (
            <div key={j.nama} className="card border-t-4 border-t-gold py-5">
              <p className="font-display text-lg text-maroon">{j.nama}</p>
              <p className="mt-1 text-sm text-ink/70">{j.ket}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
