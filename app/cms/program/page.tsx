"use client";

import { useEffect, useState } from "react";
import { useEditorGuard } from "@/lib/useEditorGuard";
import { fetchContent, saveSection, type SiteContent } from "@/lib/content";
import { SaveBar, ListEditor } from "@/components/cms/Editor";

export default function CmsProgram() {
  const session = useEditorGuard("program");
  const [c, setC] = useState<SiteContent | null>(null);
  useEffect(() => { (async () => setC(await fetchContent()))(); }, []);
  if (!session || !c) return null;

  return (
    <div>
      <h1 className="section-title">Kelola Program Unggulan</h1>
      <div className="gold-rule my-4" />
      <ListEditor
        items={c.program}
        onChange={(items) => setC({ ...c, program: items })}
        itemLabel="Program"
        fields={[
          { key: "nama", label: "Nama Program" },
          { key: "ket", label: "Deskripsi", textarea: true },
        ]}
        makeEmpty={() => ({ nama: "", ket: "" })}
      />
      <SaveBar onSave={() => saveSection("program", c.program)} />
    </div>
  );
}
