"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabase";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/berita", label: "Berita" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/program", label: "Program" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [masuk, setMasuk] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured()) return;
    const sb = supabase();
    sb.auth.getSession().then(({ data }) => setMasuk(Boolean(data.session)));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => setMasuk(Boolean(session)));
    return () => sub.subscription.unsubscribe();
  }, []);

  const authHref = masuk ? "/cms/profil" : "/login";
  const authLabel = masuk ? "Profile" : "Login";

  return (
    <header className="sticky top-0 z-50 border-b-2 border-gold bg-maroon text-white shadow-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo-light.jpg"
            alt="Logo BI20KRAT"
            width={40}
            height={40}
            className="rounded-full ring-2 ring-gold"
            priority
          />
          <span className="font-display text-xl tracking-wide">BI20KRAT</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-maroon-dark text-gold-light" : "hover:bg-maroon-light hover:text-gold-pale"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href={authHref}
            className="ml-2 rounded-md border border-gold px-4 py-1.5 text-sm font-semibold text-gold-light transition-colors hover:bg-gold hover:text-maroon-dark"
          >
            {authLabel}
          </Link>
        </nav>

        <button
          className="rounded-md p-2 hover:bg-maroon-light md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Buka menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-maroon-light bg-maroon-dark md:hidden" aria-label="Navigasi mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                pathname === l.href ? "text-gold-light" : "text-white hover:bg-maroon"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={authHref}
            onClick={() => setOpen(false)}
            className="block border-t border-maroon px-6 py-3 text-sm font-semibold text-gold-light hover:bg-maroon"
          >
            {authLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}
