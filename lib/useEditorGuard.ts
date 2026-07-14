"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, canEdit, type Session } from "@/lib/auth";

/** Pastikan user login DAN punya hak edit section ini; jika tidak, redirect. */
export function useEditorGuard(section: string): Session | null {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const s = await getSession();
      if (!s) { router.replace("/login"); return; }
      if (!canEdit(s.role, section)) { router.replace("/cms"); return; }
      setSession(s);
    })();
  }, [router, section]);

  return session;
}
