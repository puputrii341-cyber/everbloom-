import dynamic from "next/dynamic";
import { useBouquet } from "@/store/bouquetContext";
import { AlertCircle } from "lucide-react";

// Import Konva secara dinamis (client-side only)
const KonvaStage = dynamic(() => import("@/components/canvas/KonvaStage"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square md:h-[600px] flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
      <div className="text-[var(--color-text-muted)] animate-pulse">Memuat Kanvas...</div>
    </div>
  ),
});

export default function StepArrangement() {
  const { state } = useBouquet();

  if (state.selectedFlowers.length === 0) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-4" />
        <h2 className="text-xl font-[family-name:var(--font-heading)] font-semibold">Belum Ada Bunga</h2>
        <p className="text-[var(--color-text-muted)] mt-2">Kembali ke tahap sebelumnya dan pilih beberapa bunga terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Tools Panel */}
      <div className="w-full md:w-64 shrink-0 space-y-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--color-text-dark)] mb-4">
            Cara Merangkai
          </h3>
          <ul className="text-sm text-[var(--color-text-muted)] space-y-3">
            <li className="flex gap-2">
              <span className="text-[var(--color-primary)]">•</span>
              Tarik bunga ke kanvas untuk memindahkan
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-primary)]">•</span>
              Gunakan rotasi (ujung atas) untuk memutar
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-primary)]">•</span>
              Pilih bunga dan gunakan tombol di bawah untuk mengatur posisi (depan/belakang)
            </li>
          </ul>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1">
        <div className="bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm overflow-hidden flex justify-center">
          <KonvaStage />
        </div>
      </div>
    </div>
  );
}
