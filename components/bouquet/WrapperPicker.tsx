"use client";

import { WRAPPERS } from "@/lib/mockData";
import { useBouquet } from "@/store/bouquetContext";

export default function WrapperPicker() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="w-full mb-8">
      <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--color-accent)] mb-4">
        Pilih Kertas Pembungkus
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {WRAPPERS.map((wrapper) => {
          const isSelected = state.wrapperId === wrapper.id;
          return (
            <div
              key={wrapper.id}
              onClick={() => dispatch({ type: "SET_WRAPPER", payload: wrapper.id })}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div
                className={`
                  w-16 h-16 sm:w-12 sm:h-12 rounded-lg transition-all duration-[var(--transition-base)]
                  relative border-2
                  ${isSelected ? "border-[var(--color-primary)] scale-110 shadow-md" : "border-gray-200 hover:border-gray-400"}
                `}
                style={{ background: wrapper.color }}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-black/10 rounded-md flex items-center justify-center">
                    <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-[11px] text-center font-[family-name:var(--font-body)] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-dark)] transition-colors line-clamp-2">
                {wrapper.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
