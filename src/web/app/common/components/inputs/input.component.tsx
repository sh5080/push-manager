import { forwardRef } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: "32" | "38" | "46";
  width?: "sm" | "md" | "lg" | "full";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className = "", size = "38", width = "md", ...props },
    ref
  ) => {
    const sizeStyle = {
      "32": "h-8 text-sm px-3",
      "38": "h-[38px] text-sm px-4",
      "46": "h-[46px] text-base px-4",
    }[size];

    const widthStyle = {
      sm: "w-32",
      md: "w-48",
      lg: "w-64",
      full: "w-full",
    }[width];

    const inputStyle = `
      ${widthStyle}
      ${sizeStyle}
      border
      border-gray-200
      rounded-lg
      transition-all
      duration-200
      placeholder:text-gray-400
      ${error ? "border-red-500" : "focus:border-[#00CD3C]"}
      focus:outline-none
      focus:ring-1
      ${error ? "focus:ring-red-500" : "focus:ring-[#00CD3C]"}
      disabled:bg-gray-50
      disabled:text-gray-500
      ${className}
    `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className={`w-${widthStyle}`}>
        {label && (
          <label className="block text-sm text-gray-500 mb-1">{label}</label>
        )}
        <input ref={ref} className={inputStyle} {...props} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
