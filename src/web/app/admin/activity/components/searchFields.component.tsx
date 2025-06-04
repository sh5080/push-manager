import { Dropdown } from "@commonComponents/inputs/dropdown.component";
import { Input } from "@commonComponents/inputs/input.component";

export const KIND_OPTIONS = [
  { value: 0, label: "EVENT", key: "EVENT_COMPLETED" },
  { value: 1, label: "CPA", key: "CPA_COMPLETED" },
];

interface SearchFieldsProps {
  conditions: Record<string, boolean>;
  kind: string;
  memNo: string;
  eventId: string;
  level?: number;
  onKindChange: (value: string) => void;
  onMemNoChange: (value: string) => void;
  onEventIdChange: (value: string) => void;
  onLevelChange: (value: number | undefined) => void;
}

export function SearchFields({
  conditions,
  kind,
  memNo,
  eventId,
  level,
  onKindChange,
  onMemNoChange,
  onEventIdChange,
  onLevelChange,
}: SearchFieldsProps) {
  return (
    <div className="space-y-4">
      {conditions.kind && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">활동 종류</label>
          <Dropdown
            options={KIND_OPTIONS}
            value={KIND_OPTIONS.find((opt) => opt.key === kind)?.value || 0}
            onChange={(value) => {
              const newKind = KIND_OPTIONS.find((opt) => opt.value === value);
              if (newKind) onKindChange(newKind.key);
            }}
            buttonLabel={(value) =>
              KIND_OPTIONS.find((opt) => opt.value === value)?.label || ""
            }
            itemLabel={(value) =>
              KIND_OPTIONS.find((opt) => opt.value === value)?.label || ""
            }
          />
        </div>
      )}

      {conditions.memNo && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">회원번호</label>
          <Input
            type="text"
            value={memNo}
            onChange={(e) => onMemNoChange(e.target.value)}
            placeholder="회원번호 입력"
          />
        </div>
      )}

      {conditions.eventId && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">이벤트 ID</label>
          <Input
            type="text"
            value={eventId}
            onChange={(e) => onEventIdChange(e.target.value)}
            placeholder="이벤트 ID 입력"
          />
        </div>
      )}

      {conditions.level && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">레벨</label>
          <Input
            type="number"
            value={level || ""}
            onChange={(e) => onLevelChange(Number(e.target.value) || undefined)}
            placeholder="레벨 입력"
          />
        </div>
      )}
    </div>
  );
} 