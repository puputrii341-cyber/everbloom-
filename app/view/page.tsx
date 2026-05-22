"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { decodeBouquetState } from "@/lib/encoder";
import { BouquetState } from "@/store/bouquetContext";
import { FLOWERS } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

function ViewBouquet() {
  const searchParams = useSearchParams();
  const [bouquet, setBouquet] = useState<Partial<BouquetState> | null>(null);
  const [error, setError] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const bParam = searchParams.get("b");
    if (bParam) {
      const decoded = decodeBouquetState(bParam);
      if (decoded) {
        setBouquet(decoded);
        // Tampilkan kartu setelah 3 detik
        setTimeout(() => setShowCard(true), 3000);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[var(--color-canvas-bg)]">
        <h1 className="text-2xl font-[family-name:var(--font-heading)] font-bold text-[var(--color-text-dark)]">Buket Tidak Ditemukan</h1>
        <p className="text-[var(--color-text-muted)] mt-2 mb-6">Tautan mungkin rusak atau tidak valid.</p>
        <Button variant="primary" onClick={() => window.location.href = "/"}>Buat Buket Sendiri</Button>
      </div>
    );
  }

  if (!bouquet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-canvas-bg)]">
        <div className="animate-pulse text-[var(--color-primary)] font-[family-name:var(--font-heading)] text-xl">Membuka buket...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas-bg)] overflow-hidden relative flex flex-col items-center py-12 px-4">
      {/* Container Buket */}
      <div className="relative w-[400px] h-[500px] max-w-full">
        {/* Wrapping Paper Unfold Animation */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ originY: 1 }}
          className="absolute inset-0 bg-[#FDF6F0] rounded-b-full rounded-t-3xl border border-gray-200 shadow-md z-0"
        ></motion.div>

        {/* Render Bunga dengan Stagger Animation */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {bouquet.selectedFlowers?.map((item, index) => {
            const flowerData = FLOWERS.find((f) => f.id === item.flowerId);
            if (!flowerData) return null;

            return (
              <motion.img
                key={item.id}
                src={flowerData.image}
                alt={flowerData.name}
                initial={{ y: 200, opacity: 0, scale: 0 }}
                animate={{ 
                  y: item.y, 
                  x: item.x,
                  opacity: 1, 
                  scale: item.scaleX || 1,
                  rotate: item.rotation || 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1 + index * 0.2, // Stagger delay
                  type: "spring",
                  bounce: 0.4
                }}
                className="absolute origin-center"
                style={{
                  left: 0,
                  top: 0,
                  width: 150, // default scale matching kanvas
                  height: "auto",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Kartu Ucapan Slide In */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={showCard ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mt-8 z-20 w-full max-w-md"
      >
        <div
            className={`
              w-full rounded-xl p-8 shadow-xl flex flex-col justify-between
              ${bouquet.cardStyle === "ivory-classic" ? "bg-[#FFFAF0] border border-[#C4A35A]" : ""}
              ${bouquet.cardStyle === "blush-petal" ? "bg-[#F2D7DF]" : ""}
              ${bouquet.cardStyle === "sage-minimal" ? "bg-[#E6EFE9]" : ""}
              ${bouquet.cardStyle === "kraft-vintage" ? "bg-[#D4C3B3]" : ""}
              ${!bouquet.cardStyle ? "bg-white border border-gray-200" : ""}
            `}
          >
            <div className="font-[family-name:var(--font-heading)] italic text-xl text-[var(--color-text-dark)]">
              Dear {bouquet.receiverName},
            </div>
            <div className="font-[family-name:var(--font-heading)] italic text-lg text-center text-[var(--color-text-dark)] my-6 break-words leading-relaxed">
              "{bouquet.message}"
            </div>
            <div className="font-[family-name:var(--font-heading)] italic text-lg text-right text-[var(--color-text-dark)]">
              With love,<br />{bouquet.senderName}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" onClick={() => window.location.href = "/build"}>Buat Buket Saya Sendiri</Button>
          </div>
      </motion.div>
    </div>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-canvas-bg)]"></div>}>
      <ViewBouquet />
    </Suspense>
  );
}
