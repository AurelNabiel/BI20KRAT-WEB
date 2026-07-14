"use client";

import { useEffect, useState } from "react";
import { useEditorGuard } from "@/lib/useEditorGuard";
import { fetchContent, saveSection, type SiteContent } from "@/lib/content";
import { Field, SaveBar, ListEditor } from "@/components/cms/Editor";

export default function CmsLanding() {
  const session = useEditorGuard("landing");
  const [c, setC] = useState<SiteContent | null>(null);
  useEffect(() => { (async () => setC(await fetchContent()))(); }, []);
  if (!session || !c) return null;

  const l = c.landing;
  const set = (patch: Partial<typeof l>) => setC({ ...c, landing: { ...l, ...patch } });

  return (
    <div>
      <h1 className="section-title">Edit Landing Page</h1>
      <div className="gold-rule my-4" />
      <div className="space-y-4">
        <Field label="Running Text (berita berjalan)" value={l.runningNews} onChange={(v) => set({ runningNews: v })} textarea />
        <Field label="Tagline / Motto" value={l.tagline} onChange={(v) => set({ tagline: v })} />
        <Field label="Judul Sambutan" value={l.sambutanJudul} onChange={(v) => set({ sambutanJudul: v })} />
        <Field label="Isi Sambutan Ketua Umum" value={l.sambutanIsi} onChange={(v) => set({ sambutanIsi: v })} textarea />
        <Field label="YouTube Video ID (video profil)" value={l.videoId} onChange={(v) => set({ videoId: v })} />

        <h2 className="pt-4 font-display text-xl text-maroon">Highlight Angka</h2>
        <ListEditor
          items={l.highlight}
          onChange={(items) => set({ highlight: items })}
          itemLabel="Highlight"
          fields={[
            { key: "angka", label: "Angka (mis. 800+)" },
            { key: "label", label: "Label (mis. Alumni)" },
          ]}
          makeEmpty={() => ({ angka: "", label: "" })}
        />
      </div>
      <SaveBar onSave={() => saveSection("landing", c.landing)} />
    </div>
  );
}
