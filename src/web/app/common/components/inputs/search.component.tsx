import { Input } from "@headlessui/react";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Dropdown } from "@commonComponents/inputs/dropdown.component";

interface SearchOption {
  value: string;
  label: string;
  placeholder: string;
}

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  searchOptions?: SearchOption[];
  defaultPlaceholder?: string;
  className?: string;
  size?: "32" | "38" | "46";
  onTypeChange?: (type: string) => void;
}

export function Search({
  value,
  onChange,
  onSearch,
  searchOptions,
  defaultPlaceholder = "검색어를 입력하세요",
  className = "",
  size = "38",
  onTypeChange,
}: SearchProps) {
  const [selectedType, setSelectedType] = useState(
    searchOptions?.[0]?.value || ""
  );

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {searchOptions && (
        <Dropdown
          value={Number(selectedType)}
          onChange={(value) => {
            setSelectedType(String(value));
            onTypeChange?.(searchOptions[value].value);
          }}
          options={searchOptions.map((opt, index) => ({
            value: index,
            label: opt.label,
          }))}
          buttonLabel={(value) =>
            searchOptions[value]?.label || searchOptions[0].label
          }
          itemLabel={(value) =>
            searchOptions[value]?.label || searchOptions[0].label
          }
          size="32"
        />
      )}
      <div className="relative flex-1 ml-2">
        <Input
          className={inputStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            searchOptions
              ? searchOptions.find((opt) => opt.value === selectedType)
                  ?.placeholder ||
                searchOptions[Number(selectedType)].placeholder
              : defaultPlaceholder
          }
        />
        <HiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
}
