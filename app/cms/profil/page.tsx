"use client";

// Halaman Profil — semua user login (anggota, admin, superadmin) dapat
// membuat/mengubah biodata singkat mereka sendiri.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getSession, type Session } from "@/lib/auth";
import { Field } from "@/components/cms/Editor";

type Biodata = { nama: string; instansi: string; jabatan: string; domisili: string; bio: string };
const kosong: Biodata = { nama: "", instansi: "", jabatan: "", domisili: "", bio: "" };

export default function ProfilPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [b, setB] = useState<Biodata>(kosong);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const s = await getSession();
      if (!s) { router.replace("/login"); return; }
      setSession(s);
      const { data: userData } = await supabase().auth.getUser();
      if (!userData.user) return;
      const { data } = await supabase()
        .from("profiles")
        .select("nama, instansi, jabatan, domisili, bio")
        .eq("id", userData.user.id)
        .single();
      if (data) {
        setB({
          nama: data.nama ?? "",
          instansi: data.instansi ?? "",
          jabatan: data.jabatan ?? "",
          domisili: data.domisili ?? "",
          bio: data.bio ?? "",
        });
      }
    })();
  }, [router]);

  if (!session) return null;

  const simpan = async () => {
    setStatus("saving");
    const { data: userData } = await supabase().auth.getUser();
    if (!userData.user) { setStatus("error"); setMsg("Sesi berakhir, silakan login ulang."); return; }
    const { error } = await supabase()
      .from("profiles")
      .update({ ...b })
      .eq("id", userData.user.id);
    if (error) { setStatus("error"); setMsg(error.message); }
    else { setStatus("saved"); setTimeout(() => setStatus("idle"), 2000); }
  };

  return (
    <div>
      <p className="eyebrow">Biodata Anggota</p>
      <h1 className="section-title">Profil Saya</h1>
      <div className="gold-rule my-4" />

      <p className="mt-2 text-sm text-ink/60">
        Login sebagai <strong className="text-maroon">{session.email}</strong>{" "}
        <span className="rounded-full bg-gold-pale px-2 py-0.5 text-xs text-maroon">{session.role}</span>
      </p>

      <div className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
        <Field label="Nama Lengkap" value={b.nama} onChange={(v) => setB({ ...b, nama: v })} />
        <Field label="Instansi" value={b.instansi} onChange={(v) => setB({ ...b, instansi: v })} />
        <Field label="Jabatan" value={b.jabatan} onChange={(v) => setB({ ...b, jabatan: v })} />
        <Field label="Domisili (Kab/Kota, Provinsi)" value={b.domisili} onChange={(v) => setB({ ...b, domisili: v })} />
        <div className="sm:col-span-2">
          <Field label="Bio Singkat" value={b.bio} onChange={(v) => setB({ ...b, bio: v })} textarea />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={simpan} disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Menyimpan..." : "Simpan Biodata"}
        </button>
        {status === "saved" && <span className="text-sm font-semibold text-green-700">&#10003; Tersimpan</span>}
        {status === "error" && <span className="text-sm font-semibold text-red-700">{msg}</span>}
      </div>
    </div>
  );
}
