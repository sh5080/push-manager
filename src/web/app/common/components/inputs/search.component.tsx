import { HiSearch } from "react-icons/hi";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  size?: "32" | "38" | "46";
}

export function Search({
  value,
  onChange,
  onKeyDown,
  placeholder = "검색어를 입력하세요",
  className = "",
  size = "38",
}: SearchProps) {
  const sizeStyle = {
    "32": "h-8 text-sm",
    "38": "h-[38px] text-sm",
    "46": "h-[46px] text-base",
  }[size];

  const inputStyle = `
    w-full
    pl-10
    pr-4
    border
    border-gray-200
    rounded-full
    ${sizeStyle}
    transition-all
    duration-200
    placeholder:text-gray-400
    focus:border-[#00CD3C]
    focus:outline-none
    focus:ring-1
    focus:ring-[#00CD3C]
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={inputStyle}
      />
      <HiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
}
