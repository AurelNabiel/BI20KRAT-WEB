"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, logout, canEdit, type Session } from "@/lib/auth";

const menu = [
  { href: "/cms", label: "Dashboard", section: "" },
  { href: "/cms/landing", label: "Landing Page", section: "landing" },
  { href: "/cms/tentang", label: "Tentang", section: "tentang" },
  { href: "/cms/berita", label: "Berita", section: "berita" },
  { href: "/cms/kegiatan", label: "Kegiatan", section: "kegiatan" },
  { href: "/cms/galeri", label: "Galeri", section: "galeri" },
  { href: "/cms/program", label: "Program", section: "program" },
  { href: "/cms/kontak", label: "Kontak", section: "kontak" },
  { href: "/cms/donasi", label: "Donasi", section: "" }, // semua user login boleh LIHAT
  { href: "/cms/profil", label: "Profil Saya", section: "" }, // biodata — semua user login
  { href: "/cms/member", label: "Member", section: "member" }, // hanya superadmin
];

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const s = await getSession();
        if (!s) router.replace("/login");
        else setSession(s);
      } catch {
        router.replace("/login");
      } finally {
        setChecked(true);
      }
    })();
  }, [router]);

  if (!checked || !session) {
    return <div className="flex min-h-[60vh] items-center justify-center text-sm text-ink/60">Memeriksa sesi login...</div>;
  }

  const visibleMenu = menu.filter((m) => m.section === "" || canEdit(session.role, m.section));

  return (
    <div className="container-page grid gap-8 py-10 md:grid-cols-[230px,1fr]">
      <aside className="h-fit rounded-lg border border-gold/30 bg-white p-4 shadow-sm">
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-gold">CMS BI20KRAT</p>
        <p className="px-2 pb-3 pt-1 text-sm text-ink/70">
          Halo, <strong className="text-maroon">{session.username}</strong>{" "}
          <span className="rounded-full bg-gold-pale px-2 py-0.5 text-xs text-maroon">{session.role}</span>
        </p>
        <nav className="space-y-1" aria-label="Menu CMS">
          {visibleMenu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === m.href ? "bg-maroon text-gold-light" : "text-maroon hover:bg-gold-pale"
              }`}
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={async () => { await logout(); router.push("/login"); }}
          className="mt-4 w-full rounded-md border border-maroon px-3 py-2 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-white"
        >
          Keluar
        </button>
      </aside>
      <div>{children}</div>
    </div>
  );
}
