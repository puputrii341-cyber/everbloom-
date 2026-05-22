import FlowerGrid from "@/components/bouquet/FlowerGrid";
import WrapperPicker from "@/components/bouquet/WrapperPicker";
import RibbonPicker from "@/components/bouquet/RibbonPicker";

export default function StepSelection() {
  return (
    <div className="space-y-12 pb-20">
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-[family-name:var(--font-heading)] font-semibold text-[var(--color-accent)]">
            Pilih Bunga Utama
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Pilih maksimal 10 bunga untuk buketmu.
          </p>
        </div>
        <FlowerGrid />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-[family-name:var(--font-heading)] font-semibold text-[var(--color-accent)]">
            Kertas Pembungkus
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Pilih kertas pembungkus yang sesuai dengan tema buketmu.
          </p>
        </div>
        <WrapperPicker />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-[family-name:var(--font-heading)] font-semibold text-[var(--color-accent)]">
            Pita Hiasan
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Sentuhan terakhir dengan pita yang cantik.
          </p>
        </div>
        <RibbonPicker />
      </section>
    </div>
  );
}
