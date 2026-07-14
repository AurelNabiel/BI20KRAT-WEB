"use client";

export function Field({
  label, value, onChange, textarea = false, placeholder = "",
}: {
  label: string; value: string; onChange: (v: string) => void;
  textarea?: boolean; placeholder?: string;
}) {
  const cls =
    "w-full rounded-md border border-gold/40 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold";
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-maroon">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={cls} placeholder={placeholder} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      )}
    </label>
  );
}

export function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="sticky bottom-4 mt-6 flex items-center gap-4">
      <button onClick={onSave} className="btn-primary shadow-lg">Simpan Perubahan</button>
      {saved && <span className="rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-700">Tersimpan ✓</span>}
    </div>
  );
}

export function ItemCard({ children, onDelete }: { children: React.ReactNode; onDelete: () => void }) {
  return (
    <div className="relative rounded-lg border border-gold/30 bg-white p-4">
      <button
        onClick={onDelete}
        className="absolute right-3 top-3 rounded-md border border-red-200 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
        aria-label="Hapus item"
      >
        Hapus
      </button>
      <div className="space-y-3 pr-16">{children}</div>
    </div>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="btn-outline w-full border-dashed text-sm">
      + {label}
    </button>
  );
}
