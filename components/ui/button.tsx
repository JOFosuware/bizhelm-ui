import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "danger";
type Size = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const styles: Record<Variant, string> = {
  primary: "bg-slate-900 text-white hover:bg-slate-800",
  secondary: "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200",
  tertiary: "bg-transparent text-slate-900 hover:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-500"
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, children, ...props }, ref) => {
    const baseClass = cn(
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition disabled:opacity-50 disabled:pointer-events-none",
      sizes[size],
      styles[variant],
      className
    );

    if (asChild && React.isValidElement(children)) {
      // Clone the child element (e.g., Next.js <Link>) and apply button styling.
      // Note: We can't safely forward refs to arbitrary children without extra dependencies.
      return React.cloneElement(children as any, {
        className: cn(baseClass, (children as any).props?.className),
        ...props
      });
    }

    return (
      <button ref={ref} className={baseClass} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
