import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isLast?: boolean;
}

export function Section({
  title,
  children,
  defaultOpen = true,
  isLast = false,
}: SectionProps) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className={`${!isLast ? "border-b pb-4" : ""}`}>
          <DisclosureButton className="w-full flex justify-between items-center py-2">
            <h3 className="font-bold text-lg text-gray-700">{title}</h3>
            <HiChevronDown
              className={`${
                open ? "transform rotate-180" : ""
              } w-5 h-5 text-gray-500 transition-transform`}
            />
          </DisclosureButton>
          <DisclosurePanel className="space-y-2 mt-3">
            {children}
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
