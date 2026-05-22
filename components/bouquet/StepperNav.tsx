import { useBouquet } from "@/store/bouquetContext";

const steps = [
  { num: 1, label: "Pick" },
  { num: 2, label: "Arrange" },
  { num: 3, label: "Dedicate" },
  { num: 4, label: "Share" },
];

export default function StepperNav() {
  const { state } = useBouquet();
  const currentStep = state.step;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;

          return (
            <div key={step.num} className="flex items-center w-full relative">
              {/* Step indicator */}
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-colors duration-[var(--transition-base)]
                    ${
                      isActive
                        ? "bg-[var(--color-primary)] text-white shadow-md"
                        : isCompleted
                        ? "bg-[var(--color-petal-blush)] text-[var(--color-primary)]"
                        : "bg-gray-100 text-gray-400"
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.num
                  )}
                </div>
                <span
                  className={`
                    text-xs font-[family-name:var(--font-body)] absolute top-10 whitespace-nowrap
                    ${
                      isActive
                        ? "font-bold text-[var(--color-text-dark)]"
                        : isCompleted
                        ? "text-[var(--color-text-muted)]"
                        : "text-gray-400"
                    }
                  `}
                >
                  Step {step.num}: {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 transition-colors duration-[var(--transition-base)] ${
                    isCompleted ? "bg-[var(--color-petal-blush)]" : "bg-gray-100"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
