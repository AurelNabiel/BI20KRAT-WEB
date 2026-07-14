"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, canEdit, type Session } from "@/lib/auth";

const semua = [
  { href: "/cms/landing", label: "Landing Page", section: "landing", ket: "Running text, tagline, highlight, sambutan, video profil" },
  { href: "/cms/tentang", label: "Tentang", section: "tentang", ket: "Sejarah, makna logo & warna, visi-misi, pengurus" },
  { href: "/cms/berita", label: "Berita", section: "berita", ket: "Tambah, ubah, hapus berita" },
  { href: "/cms/kegiatan", label: "Kegiatan", section: "kegiatan", ket: "Kelola agenda / upcoming event" },
  { href: "/cms/galeri", label: "Galeri", section: "galeri", ket: "Album foto & link kanal" },
  { href: "/cms/program", label: "Program", section: "program", ket: "Program unggulan" },
  { href: "/cms/kontak", label: "Kontak", section: "kontak", ket: "Alamat, WA, email, sosmed, maps" },
];

export default function CmsDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => { (async () => setSession(await getSession()))(); }, []);
  if (!session) return null;

  const bisa = semua.filter((s) => canEdit(session.role, s.section));

  return (
    <div>
      <p className="eyebrow">Area Pengelolaan</p>
      <h1 className="section-title">Dashboard CMS</h1>
      <div className="gold-rule my-4" />

      <p className="mt-4 max-w-2xl text-sm text-ink/70">
        {session.role === "superadmin"
          ? "Sebagai superadmin, kamu dapat mengubah seluruh isi website — dari landing page hingga kontak."
          : session.role === "admin"
          ? "Sebagai admin, kamu dapat mengelola Berita dan Kegiatan."
          : "Sebagai anggota, kamu dapat melihat informasi khusus anggota seperti Donasi."}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {bisa.map((s) => (
          <Link key={s.href} href={s.href} className="card block transition-shadow hover:shadow-md">
            <h2 className="font-display text-xl text-maroon">{s.label} &rarr;</h2>
            <p className="mt-2 text-sm text-ink/70">{s.ket}</p>
          </Link>
        ))}
        <Link href="/cms/donasi" className="card block border-t-4 border-t-gold transition-shadow hover:shadow-md">
          <h2 className="font-display text-xl text-maroon">Donasi &rarr;</h2>
          <p className="mt-2 text-sm text-ink/70">
            Rekening, QRIS, dan laporan donasi — hanya terlihat oleh user yang login.
            {canEdit(session.role, "donasi") && " Kamu juga dapat mengubahnya."}
          </p>
        </Link>
      </div>

      <p className="mt-8 rounded-md bg-gold-pale/60 p-4 text-xs text-ink/60">
        Konten tersimpan di database Supabase — perubahan langsung tampil untuk semua pengunjung situs.
      </p>
    </div>
  );
}
