import type { Metadata } from "next";

export const metadata: Metadata = { title: "Donasi" };

const programDonasi = [
  { nama: "BI20KRAT Peduli", ket: "Bantuan sosial untuk masyarakat terdampak bencana." },
  { nama: "BI20KRAT Scholarship", ket: "Beasiswa pendidikan bagi putra-putri alumni berprestasi." },
  { nama: "Kas Organisasi", ket: "Dukungan operasional kegiatan perkumpulan." },
];

export default function DonasiPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Berbagi &amp; Berkontribusi</p>
      <h1 className="section-title">Donasi</h1>
      <div className="gold-rule my-4" />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {programDonasi.map((p) => (
          <div key={p.nama} className="card border-t-4 border-t-gold">
            <p className="font-display text-lg text-maroon">{p.nama}</p>
            <p className="mt-1 text-sm text-ink/70">{p.ket}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="card text-center">
          <h2 className="font-display text-2xl text-maroon">QRIS</h2>
          <div className="mx-auto mt-4 flex aspect-square w-56 items-center justify-center rounded-lg border-2 border-dashed border-gold/50 bg-gold-pale/40 text-sm text-ink/50">
            {/* TODO: ganti dengan gambar QRIS resmi di /public/qris.png */}
            Gambar QRIS
          </div>
          <p className="mt-3 text-sm text-ink/70">Scan untuk berdonasi melalui semua aplikasi pembayaran.</p>
        </div>
        <div className="card">
          <h2 className="font-display text-2xl text-maroon">Transfer Rekening</h2>
          <dl className="mt-4 space-y-3 text-sm text-ink/80">
            <div>
              <dt className="font-semibold text-maroon">Bank</dt>
              <dd>Bank XYZ (sesuaikan)</dd>
            </div>
            <div>
              <dt className="font-semibold text-maroon">Nomor Rekening</dt>
              <dd>000-000-0000 a.n. Perkumpulan BI20KRAT</dd>
            </div>
            <div>
              <dt className="font-semibold text-maroon">Konfirmasi Donasi</dt>
              <dd>
                WhatsApp Bendahara:{" "}
                <a href="https://wa.me/6281200000000" className="text-maroon underline hover:text-gold">
                  +62 812-0000-0000
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-6 rounded-md bg-gold-pale/60 p-4 text-sm text-ink/80">
            <p className="font-semibold text-maroon">Laporan Donasi</p>
            <p className="mt-1">
              Setiap donasi dilaporkan secara transparan dalam Laporan Tahunan yang
              dapat diunduh di halaman <a href="/dokumen" className="underline">Dokumen</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
