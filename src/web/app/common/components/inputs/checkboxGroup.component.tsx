import { Field, Label } from "@headlessui/react";
import { Switch } from "./switch.component";

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
          <Switch
            checked={selectedKeys[key]}
            onChange={(checked) => onChange(key, checked)}
          >
            <Label className="ml-2 text-sm text-gray-600">{label}</Label>
          </Switch>
        </Field>
      ))}
    </div>
  );
}
