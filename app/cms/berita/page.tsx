"use client";

import { useEffect, useState } from "react";
import { useEditorGuard } from "@/lib/useEditorGuard";
import { fetchContent, saveSection, type SiteContent } from "@/lib/content";
import { SaveBar, ListEditor } from "@/components/cms/Editor";

export default function CmsBerita() {
  const session = useEditorGuard("berita");
  const [c, setC] = useState<SiteContent | null>(null);
  useEffect(() => { (async () => setC(await fetchContent()))(); }, []);
  if (!session || !c) return null;

  return (
    <div>
      <h1 className="section-title">Kelola Berita</h1>
      <div className="gold-rule my-4" />
      <p className="mb-4 text-sm text-ink/60">
        Berita teratas otomatis tampil di beranda (3 pertama). Kategori: Organisasi, Prestasi Alumni, Pemerintahan, Kegiatan Daerah, Opini, Artikel.
      </p>
      <ListEditor
        items={c.berita}
        onChange={(items) => setC({ ...c, berita: items })}
        itemLabel="Berita"
        fields={[
          { key: "judul", label: "Judul" },
          { key: "kategori", label: "Kategori" },
          { key: "tanggal", label: "Tanggal (mis. 28 Juni 2026)" },
          { key: "isi", label: "Isi Ringkas", textarea: true },
        ]}
        makeEmpty={() => ({ kategori: "Organisasi", tanggal: "", judul: "", isi: "" })}
      />
      <SaveBar onSave={() => saveSection("berita", c.berita)} />
    </div>
  );
}
