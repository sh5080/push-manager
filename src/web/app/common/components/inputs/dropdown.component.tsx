import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface DropdownOption {
  value: number;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: number;
  onChange: (value: number) => void;
  buttonLabel: (value: number) => string;
  itemLabel: (value: number) => string;
  direction?: "up" | "down";
  size?: "32" | "38" | "46";
}

export function Dropdown({
  options,
  value,
  onChange,
  buttonLabel,
  itemLabel,
  direction = "down",
  size = "38",
}: DropdownProps) {
  const sizeStyle = {
    "32": "h-8 text-sm px-4",
    "38": "h-[38px] text-sm px-5",
    "46": "h-[46px] text-base px-6",
  }[size];

  const buttonStyle = `
    inline-flex
    items-center
    justify-between
    gap-2
    ${sizeStyle}
    border
    border-gray-200
    rounded-full
    text-gray-900
    bg-white
    transition-all
    duration-200
    hover:border-gray-400
    focus:outline-none
    focus:border-[#00CD3C]
    focus:ring-1
    focus:ring-[#00CD3C]
  `
    .trim()
    .replace(/\s+/g, " ");

  const menuItemsStyle = `
    absolute
    z-10
    w-full
    min-w-[160px]
    py-1
    mt-1
    bg-white
    border
    border-gray-200
    rounded-xl
    shadow-lg
    focus:outline-none
    ${direction === "up" ? "bottom-full mb-1" : "top-full"}
  `
    .trim()
    .replace(/\s+/g, " ");

  const menuItemStyle = (active: boolean, selected: boolean) =>
    `
    block
    w-full
    px-4
    py-2.5
    text-sm
    text-left
    transition-colors
    ${active || selected ? "text-[#00CD3C] bg-[#00CD3C]/5" : "text-gray-700"}
    hover:text-[#00CD3C]
    hover:bg-[#00CD3C]/5
  `
      .trim()
      .replace(/\s+/g, " ");

  return (
    <Menu as="div" className="relative">
      <MenuButton className={buttonStyle}>
        {buttonLabel(value)}
        {direction === "up" ? (
          <HiChevronUp className="w-5 h-5" />
        ) : (
          <HiChevronDown className="w-5 h-5" />
        )}
      </MenuButton>
      <MenuItems className={menuItemsStyle}>
        {options.map((option) => (
          <MenuItem key={option.value}>
            {({ active }) => (
              <button
                onClick={() => onChange(option.value)}
                className={menuItemStyle(active, value === option.value)}
              >
                {itemLabel(option.value)}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
