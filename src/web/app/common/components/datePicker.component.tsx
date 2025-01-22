interface DatePickerProps {
  type: "date" | "datetime-local";
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: "32" | "38" | "46";
}

export function DatePicker({
  type = "date",
  value,
  onChange,
  className = "",
  size = "38",
}: DatePickerProps) {
  const sizeStyle = {
    "32": "h-8 text-sm px-4",
    "38": "h-[38px] text-sm px-5",
    "46": "h-[46px] text-base px-6",
  }[size];

  const inputStyle = `
    w-full
    ${sizeStyle}
    border
    border-gray-200
    rounded-full
    bg-white
    text-gray-900
    transition-all
    duration-200
    cursor-pointer
    hover:border-gray-400
    focus:border-[#00CD3C]
    focus:outline-none
    focus:ring-1
    focus:ring-[#00CD3C]
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className="relative flex-1">
      <input
        type={type}
        className={inputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => {
          const input = e.target as HTMLInputElement;
          input.showPicker();
        }}
      />
    </div>
  );
}
