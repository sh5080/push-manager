import { forwardRef } from "react";
import { Textarea } from "@headlessui/react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  label?: string;
}

export const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ rows = 3, label, className, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          rows={rows}
          className={`
            mt-3 block w-full resize-none rounded-lg bg-gray-50 py-1.5 px-3 text-sm/6 text-gray-700
            ring-1 ring-inset ring-gray-200
            focus:outline-none focus:ring-2 focus:ring-gray-200
            ${className || ""}
          `}
          {...props}
        />
      </div>
    );
  }
);

TextareaComponent.displayName = "TextareaComponent";
