import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dokumen" };

// Simpan file PDF di folder /public/dokumen lalu sesuaikan path di bawah
const dokumen = [
  { nama: "AD/ART BI20KRAT", file: "/dokumen/ad-art.pdf", ket: "Anggaran Dasar dan Anggaran Rumah Tangga" },
  { nama: "SOP Organisasi", file: "/dokumen/sop.pdf", ket: "Standar operasional prosedur kegiatan" },
  { nama: "Proposal Kegiatan", file: "/dokumen/proposal.pdf", ket: "Template proposal kegiatan resmi" },
  { nama: "Laporan Tahunan", file: "/dokumen/laporan-tahunan.pdf", ket: "Laporan kegiatan dan keuangan tahunan" },
  { nama: "MoU Kemitraan", file: "/dokumen/mou.pdf", ket: "Naskah kerjasama dengan mitra" },
  { nama: "Surat Keputusan", file: "/dokumen/sk.pdf", ket: "SK kepengurusan dan kebijakan organisasi" },
];

export default function DokumenPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Pusat Unduhan</p>
      <h1 className="section-title">Dokumen</h1>
      <div className="gold-rule my-4" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dokumen.map((d) => (
          <div key={d.nama} className="card flex flex-col">
            <p className="font-display text-lg text-maroon">{d.nama}</p>
            <p className="mt-1 flex-1 text-sm text-ink/70">{d.ket}</p>
            <a href={d.file} download className="btn-outline mt-4 text-center text-sm">
              Unduh PDF
            </a>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink/50">
        * Letakkan file PDF asli di folder <code>public/dokumen/</code> dengan nama sesuai daftar di{" "}
        <code>app/dokumen/page.tsx</code>.
      </p>
    </div>
  );
}
