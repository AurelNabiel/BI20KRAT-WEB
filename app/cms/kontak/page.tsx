"use client";

import { useEffect, useState } from "react";
import { useEditorGuard } from "@/lib/useEditorGuard";
import { fetchContent, saveSection, type SiteContent } from "@/lib/content";
import { Field, SaveBar } from "@/components/cms/Editor";

export default function CmsKontak() {
  const session = useEditorGuard("kontak");
  const [c, setC] = useState<SiteContent | null>(null);
  useEffect(() => { (async () => setC(await fetchContent()))(); }, []);
  if (!session || !c) return null;

  const k = c.kontak;
  const set = (patch: Partial<typeof k>) => setC({ ...c, kontak: { ...k, ...patch } });

  return (
    <div>
      <h1 className="section-title">Kelola Kontak</h1>
      <div className="gold-rule my-4" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Alamat Sekretariat" value={k.alamat} onChange={(v) => set({ alamat: v })} textarea />
        </div>
        <Field label="Email" value={k.email} onChange={(v) => set({ email: v })} />
        <Field label="WhatsApp" value={k.whatsapp} onChange={(v) => set({ whatsapp: v })} />
        <Field label="Instagram (URL)" value={k.instagram} onChange={(v) => set({ instagram: v })} />
        <Field label="Facebook (URL)" value={k.facebook} onChange={(v) => set({ facebook: v })} />
        <Field label="LinkedIn (URL)" value={k.linkedin} onChange={(v) => set({ linkedin: v })} />
        <Field label="YouTube (URL)" value={k.youtube} onChange={(v) => set({ youtube: v })} />
        <div className="sm:col-span-2">
          <Field label="Google Maps Embed URL" value={k.mapsEmbed} onChange={(v) => set({ mapsEmbed: v })} />
        </div>
        <div className="sm:col-span-2">
          <Field label="Link Google Form Kontak" value={k.formKontak} onChange={(v) => set({ formKontak: v })} />
        </div>
      </div>
      <SaveBar onSave={() => saveSection("kontak", c.kontak)} />
    </div>
  );
}
