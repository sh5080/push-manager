import { Field, Label, Switch } from "@headlessui/react";

export interface CheckboxOption {
  key: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedKeys: Record<string, boolean>;
  onChange: (key: string, checked: boolean) => void;
  className?: string;
}

export function CheckboxGroup({
  options,
  selectedKeys,
  onChange,
  className = "flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg",
}: CheckboxGroupProps) {
  return (
    <div className={className}>
      {options.map(({ key, label }) => (
        <Field key={key}>
          <div className="flex items-center gap-2">
            <Switch
              checked={selectedKeys[key]}
              onChange={(checked) => onChange(key, checked)}
              className={`${
                selectedKeys[key] ? "bg-green-600" : "bg-gray-200"
              } relative inline-flex h-5 w-9 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  selectedKeys[key] ? "translate-x-5" : "translate-x-1"
                } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
            <Label className="text-sm text-gray-600">{label}</Label>
          </div>
        </Field>
      ))}
    </div>
  );
}
