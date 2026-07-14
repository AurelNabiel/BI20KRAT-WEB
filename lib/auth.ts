// ==========================================================================
// AUTH via SUPABASE (email + password) dengan role dari tabel `profiles`.
// ==========================================================================
"use client";

import { supabase } from "@/lib/supabase";

export type Role = "superadmin" | "admin" | "anggota";
export type Session = { username: string; email: string; role: Role };

/** Login email+password; mengembalikan session dengan role, atau null. */
export async function login(email: string, password: string): Promise<Session | null> {
  const { data, error } = await supabase().auth.signInWithPassword({ email, password });
  if (error || !data.user) return null;
  return buildSession(data.user.id, data.user.email ?? email);
}

export async function logout(): Promise<void> {
  await supabase().auth.signOut();
}

/** Ambil session aktif (null jika belum login). */
export async function getSession(): Promise<Session | null> {
  const { data } = await supabase().auth.getSession();
  const user = data.session?.user;
  if (!user) return null;
  return buildSession(user.id, user.email ?? "");
}

async function buildSession(userId: string, email: string): Promise<Session> {
  const { data: profile } = await supabase()
    .from("profiles")
    .select("username, role")
    .eq("id", userId)
    .single();
  return {
    username: profile?.username ?? email.split("@")[0],
    email,
    role: (profile?.role as Role) ?? "anggota",
  };
}

/** Hak edit menu CMS per role (mirror dari RLS di database). */
export function canEdit(role: Role, section: string): boolean {
  if (role === "superadmin") return true;
  if (role === "admin") return section === "berita" || section === "kegiatan";
  return false;
}
