"use client";

import { RIBBONS } from "@/lib/mockData";
import { useBouquet } from "@/store/bouquetContext";

export default function RibbonPicker() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="w-full mb-8">
      <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--color-accent)] mb-4">
        Pilih Pita
      </h3>
      <div className="flex flex-wrap gap-3">
        {RIBBONS.map((ribbon) => {
          const isSelected = state.ribbonId === ribbon.id;
          return (
            <div
              key={ribbon.id}
              onClick={() => dispatch({ type: "SET_RIBBON", payload: ribbon.id })}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full border-2 cursor-pointer
                transition-all duration-[var(--transition-base)]
                ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-petal-blush)]" : "border-gray-200 hover:border-gray-300 bg-white"}
              `}
            >
              <div
                className="w-5 h-5 rounded-full shadow-sm"
                style={{ backgroundColor: ribbon.color }}
              />
              <span className={`text-xs font-medium font-[family-name:var(--font-body)] ${isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"}`}>
                {ribbon.name}
              </span>
              {isSelected && (
                <svg className="w-4 h-4 text-[var(--color-primary)] ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
