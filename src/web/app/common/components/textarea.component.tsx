import { Textarea } from "@headlessui/react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  label?: string;
}

export function TextareaComponent({
  rows = 3,
  label,
  className,
  ...props
}: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Textarea
        rows={rows}
        className={`
          mt-3 block w-full resize-none rounded-lg border-none bg-gray-50 py-1.5 px-3 text-sm/6 text-gray-700
          focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-200
          ${className || ""}
        `}
        {...props}
      />
    </div>
  );
}
