"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { decodeBouquetState } from "@/lib/encoder";
import { BouquetState } from "@/store/bouquetContext";
import { FLOWERS, WRAPPERS, RIBBONS } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { BouquetBackground, BouquetForeground } from "@/components/bouquet/BouquetVisuals";
import { useCropRect } from "@/lib/imageUtils";

function CroppedFlowerImg({ flowerData, item, index }: any) {
  const crop = useCropRect(flowerData.image);
  const cw = crop ? crop.width : 150;
  const ch = crop ? crop.height : 150;
  const defaultScale = 150 / Math.max(cw, ch, 1);
  const scale = item.scaleX || defaultScale;

  return (
    <motion.div
      initial={{ y: 200, opacity: 0, scale: 0 }}
      animate={{ 
        y: item.y || 150, 
        x: item.x || 150,
        opacity: 1, 
        scale: scale,
        rotate: item.rotation || 0
      }}
      transition={{ 
        duration: 0.8, 
        delay: 1 + index * 0.2, // Stagger delay
        type: "spring",
        bounce: 0.4
      }}
      className="absolute origin-top-left"
      style={{
        left: 0,
        top: 0,
        width: cw,
        height: ch,
        overflow: "hidden"
      }}
    >
      <img 
        src={flowerData.image} 
        alt={flowerData.name} 
        style={{ 
          position: "absolute", 
          left: crop ? -crop.x : 0, 
          top: crop ? -crop.y : 0, 
          maxWidth: "none" 
        }} 
      />
    </motion.div>
  );
}

function ViewBouquet() {
  const searchParams = useSearchParams();
  const [bouquet, setBouquet] = useState<Partial<BouquetState> | null>(null);
  const [error, setError] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const idParam = searchParams.get("id");
    const bParam = searchParams.get("b");

    if (idParam) {
      fetch(`/api/bouquet?id=${idParam}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.bouquet) {
            setBouquet(data.bouquet);
            setTimeout(() => setShowCard(true), 3000);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true));
    } else if (bParam) {
      const decoded = decodeBouquetState(bParam);
      if (decoded) {
        setBouquet(decoded);
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

  // Wrapper & Ribbon colors
  const wrapperData = WRAPPERS.find((w) => w.id === bouquet.wrapperId);
  const wrapperColor = wrapperData ? wrapperData.color : "#FDF6F0";

  const ribbonData = RIBBONS.find((r) => r.id === bouquet.ribbonId);
  const ribbonColor = ribbonData ? ribbonData.color : "transparent";

  // We do not apply offsetX because the user manually positioned the flowers

  return (
    <div className="min-h-screen bg-[var(--color-canvas-bg)] overflow-hidden relative flex flex-col items-center py-12 px-4">
      {/* Container Buket */}
      <div className="relative w-[400px] h-[500px] max-w-full flex justify-center">
        {/* Background Wrapper */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ originY: 1 }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {bouquet.wrapperId && <BouquetBackground color={wrapperColor} />}
        </motion.div>

        {/* Render Bunga dengan Stagger Animation */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {bouquet.selectedFlowers?.map((item, index) => {
            const flowerData = FLOWERS.find((f) => f.id === item.flowerId);
            if (!flowerData) return null;

            return (
              <CroppedFlowerImg
                key={item.id}
                flowerData={flowerData}
                item={item}
                index={index}
              />
            );
          })}
        </div>

        {/* Foreground Wrapper & Ribbon Render */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          style={{ originY: 1 }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          {(bouquet.wrapperId || bouquet.ribbonId) && (
            <BouquetForeground wrapperColor={wrapperColor} ribbonColor={ribbonColor} />
          )}
        </motion.div>
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
