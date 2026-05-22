interface StepBadgeProps {
  step: number;
  active?: boolean;
  className?: string;
}

export default function StepBadge({
  step,
  active = false,
  className = "",
}: StepBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "w-8 h-8 rounded-full",
        "text-sm font-semibold font-[family-name:var(--font-body)]",
        "transition-all duration-[var(--transition-base)]",
        active
          ? "bg-[var(--color-primary)] text-white shadow-md"
          : "bg-[var(--color-petal-blush)] text-[var(--color-primary)]",
        className,
      ].join(" ")}
      aria-label={`Step ${step}`}
    >
      {step}
    </span>
  );
}
