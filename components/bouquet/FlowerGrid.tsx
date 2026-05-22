"use client";

import { useState } from "react";
import { FLOWERS, MOODS, COLORS } from "@/lib/mockData";
import FlowerCard from "./FlowerCard";
import { useBouquet } from "@/store/bouquetContext";

export default function FlowerGrid() {
  const [activeMood, setActiveMood] = useState("Semua");
  const [activeColor, setActiveColor] = useState("Semua");
  const { state, dispatch } = useBouquet();

  const filteredFlowers = FLOWERS.filter((flower) => {
    const matchMood = activeMood === "Semua" || flower.mood === activeMood;
    const matchColor = activeColor === "Semua" || flower.color === activeColor;
    return matchMood && matchColor;
  });

  const selectedCount = state.selectedFlowers.length;

  const handleAddFlower = (flowerId: string) => {
    if (selectedCount < 10) {
      dispatch({
        type: "ADD_FLOWER",
        payload: {
          id: `flw-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          flowerId: flowerId,
          x: 150 + Math.random() * 50, // Slight random offset for stacking
          y: 150 + Math.random() * 50,
        },
      });
    }
  };

  const handleRemoveFlower = (flowerId: string) => {
    dispatch({ type: "REMOVE_FLOWER", payload: flowerId });
  };

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="sticky top-0 z-20 bg-[var(--color-canvas-bg)]/90 backdrop-blur-sm py-4 border-b border-gray-200 mb-6 space-y-4">
        {/* Color Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2 shrink-0">Warna</span>
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className={`
                shrink-0 px-3 py-1 rounded-full text-xs font-[family-name:var(--font-body)] transition-colors
                ${
                  activeColor === color
                    ? "bg-[var(--color-petal-blush)] text-[var(--color-primary)] border border-[var(--color-primary)]"
                    : "bg-white text-[var(--color-text-muted)] border border-gray-200 hover:border-gray-300"
                }
              `}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Mood Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2 shrink-0">Mood</span>
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => setActiveMood(mood)}
              className={`
                shrink-0 px-3 py-1 rounded-full text-xs font-[family-name:var(--font-body)] transition-colors
                ${
                  activeMood === mood
                    ? "bg-[var(--color-petal-blush)] text-[var(--color-primary)] border border-[var(--color-primary)]"
                    : "bg-white text-[var(--color-text-muted)] border border-gray-200 hover:border-gray-300"
                }
              `}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2 pb-24">
        {filteredFlowers.map((flower) => {
          const count = state.selectedFlowers.filter((f) => f.flowerId === flower.id).length;
          const disabled = selectedCount >= 10;
          return (
            <FlowerCard
              key={flower.id}
              flower={flower}
              count={count}
              onAdd={() => handleAddFlower(flower.id)}
              onRemove={() => handleRemoveFlower(flower.id)}
              disabled={disabled}
            />
          );
        })}
        {filteredFlowers.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--color-text-muted)]">
            Tidak ada bunga yang sesuai dengan filter.
          </div>
        )}
      </div>
    </div>
  );
}
