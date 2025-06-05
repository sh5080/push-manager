import { ButtonSize, ButtonVariant } from "app/types/prop.type";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "line",
  size = "38",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  // 사이즈별 스타일
  const sizeStyle = {
    "32": "h-8 px-4 text-sm",
    "38": "h-[38px] px-5 text-sm",
    "46": "h-[46px] px-6 text-base",
  }[size];

  // variant별 스타일
  const variantStyle = {
    line: "rounded-full border border-gray-200 text-gray-900 hover:border-gray-400",
    point: "rounded-full border border-gray-900 text-gray-900 hover:bg-gray-50",
    "red-point":
      "rounded-full border border-red-500 text-red-500 hover:bg-red-50",
    "green-point":
      "rounded-full border border-[#00CD3C] text-[#00CD3C] hover:bg-[#00CD3C]/10",
    "blue-point":
      "rounded-full border border-[#0075FF] text-[#0075FF] hover:bg-[#0075FF]/10",
    solid: "rounded-full bg-[#00CD3C] text-white hover:bg-[#00B534] shadow-sm",
    "blue-solid":
      "rounded-full bg-[#0075FF] text-white hover:bg-[#0075FF]/10 shadow-sm",
    "square-line":
      "rounded-lg border border-gray-200 text-gray-900 hover:border-gray-400",
    "square-point":
      "rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-50",
    "square-red":
      "rounded-lg border border-red-500 text-red-500 hover:bg-red-50",
    "square-green":
      "rounded-lg border border-[#00CD3C] text-[#00CD3C] hover:bg-[#00CD3C]/10",
    "square-solid":
      "rounded-lg bg-[#00CD3C] text-white hover:bg-[#00B534] shadow-sm",
    "square-green-transparent":
      "rounded-lg border border-[#00CD3C] text-[#00CD3C] bg-[#00CD3C]/10 hover:bg-[#00CD3C]/20",
  }[variant];

  // disabled 스타일
  const disabledStyle = disabled
    ? "opacity-40 cursor-not-allowed hover:bg-transparent"
    : "";

  // 모든 스타일 조합
  const buttonStyle = `
    rounded-full 
    transition-all 
    duration-200 
    font-medium
    ${sizeStyle}
    ${variantStyle}
    ${disabledStyle}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button className={buttonStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
