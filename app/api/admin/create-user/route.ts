// ============================================================================
// POST /api/admin/create-user
// Membuat user baru (member) — hanya boleh dipanggil oleh superadmin.
// Berjalan di server (Vercel), memakai SUPABASE_SERVICE_ROLE_KEY yang tidak
// pernah terekspos ke browser.
// ============================================================================
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceKey) {
    return NextResponse.json(
      { error: "Server belum dikonfigurasi (SUPABASE_SERVICE_ROLE_KEY)." },
      { status: 500 }
    );
  }

  // 1. Verifikasi pemanggil: harus login dan ber-role superadmin
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) {
    return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 });
  }

  const anon = createClient(url, anonKey);
  const { data: userData, error: userErr } = await anon.auth.getUser(token);
  if (userErr || !userData.user) {
    return NextResponse.json({ error: "Sesi tidak valid." }, { status: 401 });
  }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data: profil } = await admin
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  if (profil?.role !== "superadmin") {
    return NextResponse.json({ error: "Hanya superadmin yang boleh menambah member." }, { status: 403 });
  }

  // 2. Validasi input
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");
  const role = ["superadmin", "admin", "anggota"].includes(body?.role) ? body.role : "anggota";
  const nama = String(body?.nama ?? "").trim();

  if (!email.includes("@") || password.length < 8) {
    return NextResponse.json(
      { error: "Email harus valid dan password minimal 8 karakter." },
      { status: 400 }
    );
  }

  // 3. Buat user (auto-confirm) lalu set role & nama pada profilnya
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createErr || !created.user) {
    return NextResponse.json({ error: createErr?.message ?? "Gagal membuat user." }, { status: 400 });
  }

  // trigger handle_new_user sudah membuat baris profiles; perbarui role & nama
  const { error: updErr } = await admin
    .from("profiles")
    .update({ role, nama: nama || null })
    .eq("id", created.user.id);
  if (updErr) {
    return NextResponse.json(
      { error: `User dibuat, tapi gagal set role: ${updErr.message}` },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true, id: created.user.id, email, role });
}
