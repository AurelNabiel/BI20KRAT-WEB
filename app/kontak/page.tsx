import type { Metadata } from "next";

export const metadata: Metadata = { title: "Kontak" };

// TODO: ganti dengan link resmi
const FORM_KONTAK = "https://forms.gle/GANTI-LINK-FORM-KONTAK";
const MAPS_EMBED = "https://www.google.com/maps?q=Jakarta&output=embed";

const sosmed = [
  { nama: "WhatsApp", url: "https://wa.me/6281200000000", ket: "+62 812-0000-0000" },
  { nama: "Email", url: "mailto:sekretariat@bi20krat.or.id", ket: "sekretariat@bi20krat.or.id" },
  { nama: "Instagram", url: "https://instagram.com/bi20krat", ket: "@bi20krat" },
  { nama: "Facebook", url: "https://facebook.com/bi20krat", ket: "BI20KRAT Official" },
  { nama: "LinkedIn", url: "https://linkedin.com/company/bi20krat", ket: "BI20KRAT" },
  { nama: "YouTube", url: "https://youtube.com/@bi20krat", ket: "BI20KRAT Official" },
];

export default function KontakPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Hubungi Kami</p>
      <h1 className="section-title">Kontak</h1>
      <div className="gold-rule my-4" />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section className="card">
          <h2 className="font-display text-2xl text-maroon">Sekretariat BI20KRAT</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            Jakarta, Indonesia (alamat lengkap menyusul)
          </p>
          <ul className="mt-4 space-y-3">
            {sosmed.map((s) => (
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
          <a href={FORM_KONTAK} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full text-center">
            Kirim Pesan via Form Kontak
          </a>
        </section>

        <section className="overflow-hidden rounded-lg border border-gold/30 bg-white shadow-sm">
          <iframe
            src={MAPS_EMBED}
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
