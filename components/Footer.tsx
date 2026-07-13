import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-gold bg-maroon-dark text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Image src="/logo-dark.jpg" alt="Logo BI20KRAT" width={72} height={72} className="rounded-full ring-2 ring-gold" />
          <p className="mt-4 font-display text-2xl text-gold-light">BI20KRAT</p>
          <p className="mt-1 text-sm italic text-gold-pale">
            &ldquo;Bhinneka Rosa Krastala — Satu Angkatan, Satu Pengabdian, Untuk Indonesia.&rdquo;
          </p>
        </div>

        <div>
          <p className="mb-3 font-semibold uppercase tracking-wider text-gold">Navigasi</p>
          <ul className="grid grid-cols-2 gap-2 text-sm text-white/80">
            <li><Link href="/tentang" className="hover:text-gold-light">Tentang</Link></li>
            <li><Link href="/organisasi" className="hover:text-gold-light">Organisasi</Link></li>
            <li><Link href="/alumni" className="hover:text-gold-light">Alumni</Link></li>
            <li><Link href="/berita" className="hover:text-gold-light">Berita</Link></li>
            <li><Link href="/kegiatan" className="hover:text-gold-light">Kegiatan</Link></li>
            <li><Link href="/galeri" className="hover:text-gold-light">Galeri</Link></li>
            <li><Link href="/program" className="hover:text-gold-light">Program</Link></li>
            <li><Link href="/dokumen" className="hover:text-gold-light">Dokumen</Link></li>
            <li><Link href="/donasi" className="hover:text-gold-light">Donasi</Link></li>
            <li><Link href="/kontak" className="hover:text-gold-light">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-semibold uppercase tracking-wider text-gold">Sekretariat</p>
          <p className="text-sm leading-relaxed text-white/80">
            Jakarta, Indonesia<br />
            Email: sekretariat@bi20krat.or.id<br />
            WhatsApp: +62 812-0000-0000
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a href="#" className="hover:text-gold-light">Instagram</a>
            <a href="#" className="hover:text-gold-light">Facebook</a>
            <a href="#" className="hover:text-gold-light">LinkedIn</a>
            <a href="#" className="hover:text-gold-light">YouTube</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} BI20KRAT — Perkumpulan Purna Praja IPDN Angkatan XX. Seluruh hak cipta dilindungi. &middot;{" "}
        <Link href="/kontak" className="hover:text-gold-light">Privacy Policy</Link>
      </div>
    </footer>
  );
}
