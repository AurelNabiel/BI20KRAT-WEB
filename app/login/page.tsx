"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const session = await login(email.trim(), password);
      if (session) router.push("/cms");
      else setError("Email atau password salah.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gold-pale/30 px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-gold/30 bg-white p-8 shadow-md">
        <div className="text-center">
          <Image src="/logo-light.jpg" alt="Logo BI20KRAT" width={80} height={80} className="mx-auto rounded-full ring-2 ring-gold" />
          <h1 className="mt-4 font-display text-2xl text-maroon">Login Anggota</h1>
          <p className="mt-1 text-sm text-ink/60">Masuk untuk mengakses CMS &amp; informasi khusus anggota</p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-maroon">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full rounded-md border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold text-maroon">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full rounded-md border border-gold/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">{error}</p>}

          <button onClick={handleLogin} disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <p className="text-center text-xs text-ink/50">
            Belum punya akun? Hubungi sekretariat untuk registrasi anggota.
          </p>
        </div>
      </div>
    </div>
  );
}
