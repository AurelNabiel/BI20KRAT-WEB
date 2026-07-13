import type { Metadata } from "next";

export const metadata: Metadata = { title: "Organisasi" };

const dewanPembina = ["Nama Pembina 1", "Nama Pembina 2", "Nama Pembina 3"];
const dewanPenasehat = ["Nama Penasehat 1", "Nama Penasehat 2", "Nama Penasehat 3"];

const pengurusHarian = [
  { jabatan: "Ketua Umum", nama: "Nama Ketua Umum" },
  { jabatan: "Wakil Ketua Umum", nama: "Nama Wakil Ketua" },
  { jabatan: "Sekretaris Jenderal", nama: "Nama Sekjen" },
  { jabatan: "Wakil Sekretaris Jenderal", nama: "Nama Wasekjen" },
  { jabatan: "Bendahara Umum", nama: "Nama Bendahara" },
  { jabatan: "Wakil Bendahara Umum", nama: "Nama Wakil Bendahara" },
];

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

export default function OrganisasiPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Struktur &amp; Kepengurusan</p>
      <h1 className="section-title">Organisasi</h1>
      <div className="gold-rule my-4" />

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-xl text-maroon">Dewan Pembina</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {dewanPembina.map((n) => <li key={n}>&bull; {n}</li>)}
          </ul>
        </div>
        <div className="card">
          <h2 className="font-display text-xl text-maroon">Dewan Penasehat</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {dewanPenasehat.map((n) => <li key={n}>&bull; {n}</li>)}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-maroon">Pengurus Harian</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-gold/30 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-maroon text-white">
              <tr>
                <th className="px-6 py-3 font-semibold">Jabatan</th>
                <th className="px-6 py-3 font-semibold">Nama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/20">
              {pengurusHarian.map((p) => (
                <tr key={p.jabatan}>
                  <td className="px-6 py-3 font-medium text-maroon">{p.jabatan}</td>
                  <td className="px-6 py-3 text-ink/80">{p.nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-maroon">Bidang-Bidang</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bidang.map((b) => (
            <div key={b} className="card py-4">
              <p className="font-semibold text-maroon">{b}</p>
              <p className="mt-1 text-sm text-ink/60">Ketua Bidang: &mdash;</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-maroon">Kepengurusan Wilayah</h2>
        <p className="mt-2 max-w-3xl text-ink/80">
          Kepengurusan wilayah dibentuk berjenjang di tingkat <strong>Provinsi</strong> serta{" "}
          <strong>Kabupaten/Kota</strong> untuk mendekatkan organisasi dengan anggota di daerah.
          Daftar koordinator wilayah akan dipublikasikan secara bertahap.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-maroon">Masa Bakti &amp; Timeline Kepengurusan</h2>
        <ol className="relative mt-6 space-y-6 border-l-2 border-gold pl-6">
          {timeline.map((t) => (
            <li key={t.periode} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gold ring-4 ring-gold-pale" aria-hidden="true" />
              <p className="font-display text-lg text-maroon">{t.periode}</p>
              <p className="text-sm text-ink/70">{t.keterangan}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
