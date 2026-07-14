"use client";

// ==========================================================================
// Komponen editor reusable untuk CMS.
// ==========================================================================

import { useState } from "react";

export function Field({
  label, value, onChange, textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-md border border-gold/40 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold";
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-maroon">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={cls} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}

type SaveResult = { ok: boolean; message?: string } | void;

export function SaveBar({ onSave, onReset }: { onSave: () => SaveResult | Promise<SaveResult>; onReset?: () => void }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [msg, setMsg] = useState("");
  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={async () => {
          setStatus("saving");
          try {
            const r = await onSave();
            if (r && r.ok === false) {
              setStatus("error");
              setMsg(r.message || "Gagal menyimpan. Periksa hak akses.");
            } else {
              setStatus("saved");
              setTimeout(() => setStatus("idle"), 2000);
            }
          } catch (e) {
            setStatus("error");
            setMsg(e instanceof Error ? e.message : "Gagal menyimpan.");
          }
        }}
        disabled={status === "saving"}
        className="btn-primary disabled:opacity-60"
      >
        {status === "saving" ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
      {onReset && (
        <button
          onClick={() => {
            if (confirm("Kembalikan seluruh konten ke bawaan? Semua perubahan hilang.")) onReset();
          }}
          className="text-sm text-ink/50 underline hover:text-maroon"
        >
          Reset ke default
        </button>
      )}
      {status === "saved" && <span className="text-sm font-semibold text-green-700">✓ Tersimpan</span>}
      {status === "error" && <span className="text-sm font-semibold text-red-700">{msg}</span>}
    </div>
  );
}

/** Editor daftar generik: render form per item + tambah/hapus. */
export function ListEditor<T extends Record<string, string>>({
  items, onChange, fields, itemLabel, makeEmpty,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  fields: { key: keyof T & string; label: string; textarea?: boolean }[];
  itemLabel: string;
  makeEmpty: () => T;
}) {
  const update = (i: number, key: string, v: string) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, [key]: v } : it));
    onChange(next);
  };
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg border border-gold/30 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-maroon">{itemLabel} #{i + 1}</p>
            <div className="flex gap-2">
              <button
                onClick={() => i > 0 && onChange([...items.slice(0, i - 1), items[i], items[i - 1], ...items.slice(i + 1)])}
                className="rounded border border-gold/40 px-2 py-1 text-xs text-maroon hover:bg-gold-pale"
                title="Naikkan urutan"
              >
                ↑
              </button>
              <button
                onClick={() => confirm(`Hapus ${itemLabel.toLowerCase()} ini?`) && onChange(items.filter((_, idx) => idx !== i))}
                className="rounded border border-red-300 px-2 py-1 text-xs text-red-700 hover:bg-red-50"
              >
                Hapus
              </button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.textarea ? "sm:col-span-2" : ""}>
                <Field label={f.label} value={it[f.key] ?? ""} onChange={(v) => update(i, f.key, v)} textarea={f.textarea} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...items, makeEmpty()])} className="btn-outline w-full text-sm">
        + Tambah {itemLabel}
      </button>
    </div>
  );
}
