"use client";

import { useEffect, useState } from "react";
import { useEditorGuard } from "@/lib/useEditorGuard";
import { fetchContent, saveSection, type SiteContent } from "@/lib/content";
import { Field, SaveBar, ListEditor } from "@/components/cms/Editor";

export default function CmsGaleri() {
  const session = useEditorGuard("galeri");
  const [c, setC] = useState<SiteContent | null>(null);
  useEffect(() => { (async () => setC(await fetchContent()))(); }, []);
  if (!session || !c) return null;

  const g = c.galeri;
  const set = (patch: Partial<typeof g>) => setC({ ...c, galeri: { ...g, ...patch } });

  return (
    <div>
      <h1 className="section-title">Kelola Galeri</h1>
      <div className="gold-rule my-4" />
      <div className="space-y-4">
        <Field label="Link Google Drive (album foto)" value={g.driveUrl} onChange={(v) => set({ driveUrl: v })} />
        <Field label="Link Instagram" value={g.igUrl} onChange={(v) => set({ igUrl: v })} />
        <Field label="Link YouTube" value={g.ytUrl} onChange={(v) => set({ ytUrl: v })} />

        <h2 className="pt-4 font-display text-xl text-maroon">Album</h2>
        <ListEditor
          items={g.album}
          onChange={(items) => set({ album: items })}
          itemLabel="Album"
          fields={[
            { key: "judul", label: "Judul Album" },
            { key: "jumlah", label: "Keterangan (mis. 128 foto)" },
          ]}
          makeEmpty={() => ({ judul: "", jumlah: "" })}
        />
      </div>
      <SaveBar onSave={() => saveSection("galeri", c.galeri)} />
    </div>
  );
}
