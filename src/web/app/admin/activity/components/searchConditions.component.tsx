import {
  CheckboxGroup,
  CheckboxOption,
} from "@commonComponents/inputs/checkboxGroup.component";

const SEARCH_CONDITIONS: CheckboxOption[] = [
  { key: "kind", label: "활동 종류" },
  { key: "memNo", label: "회원번호" },
  { key: "eventId", label: "이벤트 ID" },
  { key: "level", label: "레벨" },
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