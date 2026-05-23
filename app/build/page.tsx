"use client";

import Link from "next/link";
import { useBouquet } from "@/store/bouquetContext";
import StepperNav from "@/components/bouquet/StepperNav";
import StepSelection from "@/components/build/StepSelection";
import StepArrangement from "@/components/build/StepArrangement";
import StepDedication from "@/components/build/StepDedication";
import StepDelivery from "@/components/build/StepDelivery";

export default function BuildPage() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="min-h-screen bg-[var(--color-canvas-bg)] flex flex-col">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <StepperNav />
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {state.step === 1 && <StepSelection />}
        {state.step === 2 && <StepArrangement />}
        {state.step === 3 && <StepDedication />}
        {state.step === 4 && <StepDelivery />}
      </main>
      
      {/* Footer Nav Controls */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {state.step === 1 ? (
            <Link href="/">
              <button className="px-6 py-2 rounded-full font-medium text-sm transition-colors text-[var(--color-text-muted)] hover:bg-gray-100">
                Kembali
              </button>
            </Link>
          ) : (
            <button
              onClick={() => dispatch({ type: "SET_STEP", payload: Math.max(1, state.step - 1) })}
              className="px-6 py-2 rounded-full font-medium text-sm transition-colors text-[var(--color-text-muted)] hover:bg-gray-100"
            >
              Kembali
            </button>
          )}
          
          <div className="text-sm text-[var(--color-text-muted)] hidden md:block">
            {state.step === 1 && `${state.selectedFlowers.length}/10 Bunga Terpilih`}
            {state.step === 2 && "Susun buketmu di kanvas"}
            {state.step === 3 && "Tulis pesan bermakna"}
          </div>

          {state.step < 4 ? (
            <button
              onClick={() => dispatch({ type: "SET_STEP", payload: Math.min(4, state.step + 1) })}
              disabled={
                (state.step === 1 && state.selectedFlowers.length === 0) ||
                (state.step === 3 && (!state.senderName || !state.receiverName))
              }
              className="px-6 py-2 rounded-full font-medium text-sm transition-colors bg-[var(--color-primary)] text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Lanjut
            </button>
          ) : (
            <div className="px-6 py-2"></div>
          )}
        </div>
      </div>
    </div>
  );
}
