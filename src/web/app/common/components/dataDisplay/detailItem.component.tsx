import { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { HiInformationCircle } from "react-icons/hi";

interface DetailItemProps {
  label: string;
  value: any;
  isDate?: boolean;
  isError?: boolean;
  isUrl?: boolean;
  isBoolean?: boolean;
  badge?: boolean;
  badgeColor?: string;
  bold?: boolean;
  className?: string;
  tooltip?: string;
}

export function DetailItem({
  label,
  value,
  isDate,
  isError,
  isUrl,
  isBoolean,
  badge,
  badgeColor,
  bold,
  className = "",
  tooltip,
}: DetailItemProps) {
  if (value === null || value === undefined) return null;

  let displayValue = value;
  if (isDate && value) {
    displayValue = new Date(value).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  if (isBoolean) {
    displayValue = value === "Y" ? "예" : "아니오";
  }

  return (
    <div className="grid grid-cols-4 gap-4 items-center">
      <div className="text-sm text-gray-500 flex items-center gap-1">
        {label}
        {tooltip && (
          <Popover className="relative">
            <PopoverButton className="focus:outline-none">
              <HiInformationCircle className="w-4 h-4 text-gray-400" />
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-64 px-4 mt-3 transform -translate-x-1/2 left-5 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="p-4 bg-white">
                    <p className="text-sm text-gray-500">{tooltip}</p>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        )}
      </div>
      <div
        className={`col-span-3 ${isError ? "text-red-500" : ""} ${
          bold ? "font-semibold" : ""
        } ${className}`}
      >
        {badge ? (
          <span className={`px-2 py-1 rounded-full text-sm ${badgeColor}`}>
            {displayValue}
          </span>
        ) : isUrl ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          displayValue
        )}
      </div>
    </div>
  );
}
