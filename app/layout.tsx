import type { Metadata } from "next";
import { Marcellus, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "BI20KRAT — Bhinneka Rosa Krastala | Purna Praja IPDN Angkatan XX",
    template: "%s | BI20KRAT",
  },
  description:
    "Perkumpulan Purna Praja IPDN Angkatan XX (BIROKRAT 2013). Bhinneka Rosa Krastala — Satu Angkatan, Satu Pengabdian, Untuk Indonesia.",
  icons: { icon: "/logo-light.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
