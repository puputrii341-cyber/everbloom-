import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-primary)] text-white",
    "hover:bg-[var(--color-primary-hover)]",
    "active:scale-[0.97]",
    "shadow-md hover:shadow-lg",
  ].join(" "),
  outline: [
    "border-2 border-[var(--color-primary)] text-[var(--color-primary)]",
    "bg-transparent",
    "hover:bg-[var(--color-petal-blush)] hover:border-[var(--color-primary-hover)]",
    "active:scale-[0.97]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs tracking-[0.08em]",
  md: "px-7 py-3 text-sm tracking-[0.08em]",
  lg: "px-9 py-4 text-base tracking-[0.08em]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2",
          "rounded-full font-[family-name:var(--font-body)] font-semibold uppercase",
          "transition-all duration-[var(--transition-base)]",
          "cursor-pointer select-none",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
