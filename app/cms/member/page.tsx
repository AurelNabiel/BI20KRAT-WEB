"use client";

// Manajemen Member — hanya superadmin: melihat daftar member,
// menambah member baru, dan mengubah role.

import { useEffect, useState } from "react";
import { useEditorGuard } from "@/lib/useEditorGuard";
import { supabase } from "@/lib/supabase";
import { Field } from "@/components/cms/Editor";

type Member = { id: string; username: string | null; nama: string | null; role: string };

export default function MemberPage() {
  const session = useEditorGuard("member"); // hanya superadmin (canEdit)
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState({ email: "", password: "", nama: "", role: "anggota" });
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "ok">("idle");
  const [msg, setMsg] = useState("");

  const muat = async () => {
    const { data } = await supabase()
      .from("profiles")
      .select("id, username, nama, role")
      .order("role", { ascending: true });
    setMembers(data ?? []);
  };

  useEffect(() => { if (session) muat(); }, [session]);
  if (!session) return null;

  const tambah = async () => {
    setStatus("saving"); setMsg("");
    try {
      const { data: sess } = await supabase().auth.getSession();
      const token = sess.session?.access_token;
      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setStatus("error"); setMsg(json.error ?? "Gagal menambah member.");
      } else {
        setStatus("ok"); setMsg(`Member ${json.email} berhasil dibuat.`);
        setForm({ email: "", password: "", nama: "", role: "anggota" });
        muat();
      }
    } catch {
      setStatus("error"); setMsg("Gagal terhubung ke server.");
    }
  };

  const ubahRole = async (id: string, role: string) => {
    const { error } = await supabase().from("profiles").update({ role }).eq("id", id);
    if (error) { setStatus("error"); setMsg(error.message); }
    else muat();
  };

  return (
    <div>
      <p className="eyebrow">Superadmin</p>
      <h1 className="section-title">Manajemen Member</h1>
      <div className="gold-rule my-4" />

      {/* Form tambah member */}
      <div className="mt-6 rounded-lg border-2 border-dashed border-gold/50 bg-gold-pale/30 p-6">
        <h2 className="font-display text-xl text-maroon">Tambah Member Baru</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Password (min. 8 karakter)" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
          <Field label="Nama Lengkap" value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} />
          <div>
            <label className="mb-1 block text-sm font-semibold text-maroon">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-md border border-gold/40 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="anggota">anggota</option>
              <option value="admin">admin</option>
              <option value="superadmin">superadmin</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button onClick={tambah} disabled={status === "saving"} className="btn-primary disabled:opacity-60">
            {status === "saving" ? "Membuat..." : "Tambah Member"}
          </button>
          {status === "ok" && <span className="text-sm font-semibold text-green-700">{msg}</span>}
          {status === "error" && <span className="text-sm font-semibold text-red-700">{msg}</span>}
        </div>
      </div>

      {/* Daftar member */}
      <div className="mt-8">
        <h2 className="font-display text-xl text-maroon">Daftar Member ({members.length})</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-gold/30 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-maroon text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Username</th>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/20">
              {members.map((m) => (
                <tr key={m.id}>
                  <td className="px-4 py-3 font-medium text-maroon">{m.username ?? "\u2014"}</td>
                  <td className="px-4 py-3 text-ink/80">{m.nama ?? "\u2014"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={m.role}
                      onChange={(e) => ubahRole(m.id, e.target.value)}
                      className="rounded-md border border-gold/40 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-gold"
                      aria-label={`Role untuk ${m.username}`}
                    >
                      <option value="anggota">anggota</option>
                      <option value="admin">admin</option>
                      <option value="superadmin">superadmin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink/50">
          * Penambahan member memakai API server dengan service role key — pastikan
          <code> SUPABASE_SERVICE_ROLE_KEY</code> sudah diisi di environment (Vercel/.env.local).
        </p>
      </div>
    </div>
  );
}
