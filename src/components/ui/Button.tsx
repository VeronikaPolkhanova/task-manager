import * as React from "react";
import { cn } from "@/components/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isLink?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, isLink, ...props }, ref) => {
    return (
      <button
        className={cn(
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 me-2 focus:outline-none cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          isLink &&
            "bg-transparent font-bold text-gray-400 hover:bg-transparent hover:text-gray-500",
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);

export default Button;
