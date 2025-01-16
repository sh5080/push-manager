import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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
}

export function Dropdown({
  options,
  value,
  onChange,
  buttonLabel,
  itemLabel,
  direction = "down",
}: DropdownProps) {
  const menuItemsClassName = `
    absolute left-0 z-10 w-32 bg-white border border-gray-200 rounded-md shadow-lg
    ${direction === "up" ? "bottom-full mb-1" : "top-full mt-1"}
  `;

  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex items-center px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
        {buttonLabel(value)}
      </MenuButton>
      <MenuItems className={menuItemsClassName}>
        {options.map((option) => (
          <MenuItem key={option.value}>
            {({ active }) => (
              <button
                onClick={() => onChange(option.value)}
                className={`
                  block w-full px-4 py-2 text-sm text-left text-gray-700
                  ${active ? "bg-gray-50" : ""}
                  ${value === option.value ? "bg-gray-100" : ""}
                  hover:bg-gray-50
                `}
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
