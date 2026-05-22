import { type HTMLAttributes } from "react";

type BadgeColor = "rose" | "mauve" | "gold" | "blush";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
}

const colorStyles: Record<BadgeColor, string> = {
  rose: "bg-[var(--color-petal-blush)] text-[var(--color-primary)]",
  mauve: "bg-[#E8DDE9] text-[var(--color-accent)]",
  gold: "bg-[#F5EDDA] text-[var(--color-gold)]",
  blush: "bg-[#FDF0F3] text-[var(--color-text-muted)]",
};

export default function Badge({
  color = "rose",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "rounded-full px-3 py-1",
        "text-xs font-medium font-[family-name:var(--font-body)]",
        "transition-colors duration-[var(--transition-fast)]",
        colorStyles[color],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
