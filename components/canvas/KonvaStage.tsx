import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import useImage from "use-image";
import { useBouquet, FlowerItem } from "@/store/bouquetContext";
import { FLOWERS, WRAPPERS, RIBBONS } from "@/lib/mockData";
import FlowerNode from "./FlowerNode";
import { BouquetBackground, BouquetForeground } from "@/components/bouquet/BouquetVisuals";

export default function KonvaStage() {
  const { state, dispatch } = useBouquet();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Ukuran kanvas
  const [dimensions, setDimensions] = useState({ width: 400, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: 400, // Fixed logical width for consistent SVG rendering
        height: 500,
      });
    }
  }, []);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.name() === "background";
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleFlowerChange = (id: string, newAttrs: any) => {
    const flowers = state.selectedFlowers.map((f) => (f.id === id ? newAttrs : f));
    dispatch({ type: "LOAD_STATE", payload: { ...state, selectedFlowers: flowers } });
  };

  const wrapperData = WRAPPERS.find((w) => w.id === state.wrapperId);
  const wrapperColor = wrapperData ? wrapperData.color : "transparent";

  const ribbonData = RIBBONS.find((r) => r.id === state.ribbonId);
  const ribbonColor = ribbonData ? ribbonData.color : "transparent";

  return (
    <div ref={containerRef} className="relative w-[400px] h-[500px] mx-auto overflow-hidden rounded-xl border border-gray-100 bg-white">
      {/* Background Wrapper */}
      {state.wrapperId && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <BouquetBackground color={wrapperColor} />
        </div>
      )}

      <Stage
        width={400}
        height={500}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        className="relative z-10"
      >
        <Layer>
          {/* Transparent Rect for capturing background clicks */}
          <Rect
            x={0}
            y={0}
            width={400}
            height={500}
            fill="transparent"
            name="background"
          />

          {/* Render Bunga */}
          {state.selectedFlowers.map((item) => {
            const flowerData = FLOWERS.find((f) => f.id === item.flowerId);
            if (!flowerData) return null;

            return (
              <FlowerNode
                key={item.id}
                item={item}
                imageSrc={flowerData.image}
                isSelected={item.id === selectedId}
                onSelect={() => setSelectedId(item.id)}
                onChange={(newAttrs) => handleFlowerChange(item.id, newAttrs)}
              />
            );
          })}
        </Layer>
      </Stage>

      {/* Foreground Wrapper & Ribbon */}
      {(state.wrapperId || state.ribbonId) && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <BouquetForeground wrapperColor={wrapperColor} ribbonColor={ribbonColor} />
        </div>
      )}

      {/* Layer Control Buttons */}
      {selectedId && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 flex items-center gap-4">
          <button
            onClick={() => {
              const items = [...state.selectedFlowers];
              const idx = items.findIndex((i) => i.id === selectedId);
              if (idx > 0) {
                const temp = items[idx];
                items[idx] = items[idx - 1];
                items[idx - 1] = temp;
                dispatch({ type: "LOAD_STATE", payload: { ...state, selectedFlowers: items } });
              }
            }}
            className="text-xs font-medium text-gray-600 hover:text-[var(--color-primary)]"
          >
            Mundur
          </button>
          <div className="w-px h-4 bg-gray-300"></div>
          <button
            onClick={() => {
              const items = [...state.selectedFlowers];
              const idx = items.findIndex((i) => i.id === selectedId);
              if (idx < items.length - 1) {
                const temp = items[idx];
                items[idx] = items[idx + 1];
                items[idx + 1] = temp;
                dispatch({ type: "LOAD_STATE", payload: { ...state, selectedFlowers: items } });
              }
            }}
            className="text-xs font-medium text-gray-600 hover:text-[var(--color-primary)]"
          >
            Maju
          </button>
        </div>
      )}
    </div>
  );
}
