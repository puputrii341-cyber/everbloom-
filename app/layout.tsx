import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Everbloom — Beautiful flowers, delivered digitally.",
  description:
    "Rangkai buket bunga digital yang indah dan personal, lalu bagikan kepada orang tersayang melalui tautan unik. Tanpa akun, tanpa login — langsung merangkai.",
  keywords: [
    "digital bouquet",
    "buket digital",
    "bunga digital",
    "Everbloom",
    "hadiah digital",
    "e-bouquet",
  ],
  openGraph: {
    title: "Everbloom — Beautiful flowers, delivered digitally.",
    description:
      "Rangkai buket bunga digital interaktif dan bagikan kepada orang tersayang.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-canvas-bg)] text-[var(--color-text-dark)]">
        {children}
      </body>
    </html>
  );
}
