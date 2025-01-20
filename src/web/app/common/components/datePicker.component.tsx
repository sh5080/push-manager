interface DatePickerProps {
  type: "date" | "datetime-local";
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DatePicker({
  type = "date",
  value,
  onChange,
  className = "",
}: DatePickerProps) {
  return (
    <div className="relative flex-1">
      <input
        type={type}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 cursor-pointer ${className}`}
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
