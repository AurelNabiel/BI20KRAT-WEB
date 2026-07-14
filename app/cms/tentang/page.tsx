"use client";

import { useEffect, useState } from "react";
import { useEditorGuard } from "@/lib/useEditorGuard";
import { fetchContent, saveSection, type SiteContent } from "@/lib/content";
import { Field, SaveBar, ListEditor } from "@/components/cms/Editor";

export default function CmsTentang() {
  const session = useEditorGuard("tentang");
  const [c, setC] = useState<SiteContent | null>(null);
  useEffect(() => { (async () => setC(await fetchContent()))(); }, []);
  if (!session || !c) return null;

  const t = c.tentang;
  const set = (patch: Partial<typeof t>) => setC({ ...c, tentang: { ...t, ...patch } });

  return (
    <div>
      <h1 className="section-title">Edit Halaman Tentang</h1>
      <div className="gold-rule my-4" />
      <div className="space-y-4">
        <Field label="Sejarah" value={t.sejarah} onChange={(v) => set({ sejarah: v })} textarea />
        <Field label="Makna Logo" value={t.maknaLogo} onChange={(v) => set({ maknaLogo: v })} textarea />
        <Field label="Makna Warna" value={t.maknaWarna} onChange={(v) => set({ maknaWarna: v })} textarea />
        <Field label="Visi" value={t.visi} onChange={(v) => set({ visi: v })} textarea />

        <h2 className="pt-4 font-display text-xl text-maroon">Misi (satu per baris)</h2>
        <textarea
          value={t.misi.join("\n")}
          onChange={(e) => set({ misi: e.target.value.split("\n") })}
          rows={6}
          className="w-full rounded-md border border-gold/40 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />

        <h2 className="pt-4 font-display text-xl text-maroon">Pengurus Harian</h2>
        <ListEditor
          items={t.pengurus}
          onChange={(items) => set({ pengurus: items })}
          itemLabel="Pengurus"
          fields={[
            { key: "jabatan", label: "Jabatan" },
            { key: "nama", label: "Nama" },
          ]}
          makeEmpty={() => ({ jabatan: "", nama: "" })}
        />
      </div>
      <SaveBar onSave={() => saveSection("tentang", c.tentang)} />
    </div>
  );
}
