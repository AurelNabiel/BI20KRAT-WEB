"use client";

import { useEffect, useState } from "react";
import { getSession, canEdit, type Session } from "@/lib/auth";
import { fetchContent, saveSection, type SiteContent } from "@/lib/content";
import { Field, SaveBar, ListEditor } from "@/components/cms/Editor";

export default function CmsDonasi() {
  const [session, setSession] = useState<Session | null>(null);
  const [c, setC] = useState<SiteContent | null>(null);

  useEffect(() => {
    (async () => {
      setSession(await getSession());
      setC(await fetchContent());
    })();
  }, []);

  if (!session || !c) return null;
  const d = c.donasi;
  const bolehEdit = canEdit(session.role, "donasi"); // hanya superadmin
  const set = (patch: Partial<typeof d>) => setC({ ...c, donasi: { ...d, ...patch } });

  return (
    <div>
      <p className="eyebrow">Khusus Anggota</p>
      <h1 className="section-title">Donasi</h1>
      <div className="gold-rule my-4" />

      {/* Tampilan untuk semua user login */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card text-center">
          <h2 className="font-display text-2xl text-maroon">QRIS</h2>
          <div className="mx-auto mt-4 flex aspect-square w-56 items-center justify-center rounded-lg border-2 border-dashed border-gold/50 bg-gold-pale/40 text-sm text-ink/50">
            Gambar QRIS
          </div>
          <p className="mt-3 text-sm text-ink/70">Scan untuk berdonasi melalui semua aplikasi pembayaran.</p>
        </div>
        <div className="card">
          <h2 className="font-display text-2xl text-maroon">Transfer Rekening</h2>
          <dl className="mt-4 space-y-3 text-sm text-ink/80">
            <div><dt className="font-semibold text-maroon">Bank</dt><dd>{d.bank}</dd></div>
            <div><dt className="font-semibold text-maroon">Nomor Rekening</dt><dd>{d.rekening}</dd></div>
            <div><dt className="font-semibold text-maroon">Konfirmasi Donasi</dt><dd>WhatsApp Bendahara: {d.waBendahara}</dd></div>
          </dl>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-2xl text-maroon">Laporan Donasi</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-gold/30 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-maroon text-white">
              <tr>
                <th className="px-6 py-3 font-semibold">Periode</th>
                <th className="px-6 py-3 font-semibold">Dana Masuk</th>
                <th className="px-6 py-3 font-semibold">Tersalurkan</th>
                <th className="px-6 py-3 font-semibold">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/20">
              {d.laporan.map((l) => (
                <tr key={l.periode}>
                  <td className="px-6 py-3 font-medium text-maroon">{l.periode}</td>
                  <td className="px-6 py-3 text-ink/80">{l.masuk}</td>
                  <td className="px-6 py-3 text-ink/80">{l.tersalur}</td>
                  <td className="px-6 py-3 text-ink/80">{l.ket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panel edit — hanya superadmin */}
      {bolehEdit && (
        <div className="mt-12 rounded-lg border-2 border-dashed border-gold/50 bg-gold-pale/30 p-6">
          <h2 className="font-display text-xl text-maroon">Edit Data Donasi (superadmin)</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Bank" value={d.bank} onChange={(v) => set({ bank: v })} />
            <Field label="Nomor Rekening" value={d.rekening} onChange={(v) => set({ rekening: v })} />
            <Field label="WhatsApp Bendahara" value={d.waBendahara} onChange={(v) => set({ waBendahara: v })} />
          </div>
          <h3 className="mt-6 font-display text-lg text-maroon">Laporan per Periode</h3>
          <div className="mt-3">
            <ListEditor
              items={d.laporan}
              onChange={(items) => set({ laporan: items })}
              itemLabel="Laporan"
              fields={[
                { key: "periode", label: "Periode (mis. Q3 2026)" },
                { key: "masuk", label: "Dana Masuk" },
                { key: "tersalur", label: "Tersalurkan" },
                { key: "ket", label: "Keterangan", textarea: true },
              ]}
              makeEmpty={() => ({ periode: "", masuk: "", tersalur: "", ket: "" })}
            />
          </div>
          <SaveBar onSave={() => saveSection("donasi", c.donasi)} />
        </div>
      )}
    </div>
  );
}
