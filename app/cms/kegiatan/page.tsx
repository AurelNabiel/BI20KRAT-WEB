"use client";

import { useEffect, useState } from "react";
import { useEditorGuard } from "@/lib/useEditorGuard";
import { fetchContent, saveSection, type SiteContent } from "@/lib/content";
import { SaveBar, ListEditor } from "@/components/cms/Editor";

export default function CmsKegiatan() {
  const session = useEditorGuard("kegiatan");
  const [c, setC] = useState<SiteContent | null>(null);
  useEffect(() => { (async () => setC(await fetchContent()))(); }, []);
  if (!session || !c) return null;

  return (
    <div>
      <h1 className="section-title">Kelola Kegiatan</h1>
      <div className="gold-rule my-4" />
      <p className="mb-4 text-sm text-ink/60">
        Agenda teratas otomatis tampil di beranda (3 pertama). Jenis: Rapat, Seminar, Reuni, Bakti Sosial, Olahraga, Family Gathering, Business Forum.
      </p>
      <ListEditor
        items={c.kegiatan}
        onChange={(items) => setC({ ...c, kegiatan: items })}
        itemLabel="Agenda"
        fields={[
          { key: "acara", label: "Nama Acara" },
          { key: "jenis", label: "Jenis" },
          { key: "tanggal", label: "Tanggal (mis. 20 Juli 2026)" },
          { key: "lokasi", label: "Lokasi" },
        ]}
        makeEmpty={() => ({ jenis: "Seminar", tanggal: "", acara: "", lokasi: "" })}
      />
      <SaveBar onSave={() => saveSection("kegiatan", c.kegiatan)} />
    </div>
  );
}
