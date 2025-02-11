import {
  CheckboxGroup,
  CheckboxOption,
} from "@commonComponents/inputs/checkboxGroup.component";

const SEARCH_CONDITIONS: CheckboxOption[] = [
  { key: "sn", label: "쿠폰번호" },
  { key: "memNo", label: "회원번호" },
  { key: "status", label: "상태" },
  { key: "date", label: "사용일시" },
];

interface SearchConditionsProps {
  conditions: Record<string, boolean>;
  onChange: (key: string, checked: boolean) => void;
}

export function SearchConditions({
  conditions,
  onChange,
}: SearchConditionsProps) {
  return (
    <CheckboxGroup
      options={SEARCH_CONDITIONS}
      selectedKeys={conditions}
      onChange={onChange}
    />
  );
}
