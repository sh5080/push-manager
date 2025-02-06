import { Switch } from "@headlessui/react";
import { TextareaComponent } from "@commonComponents/inputs/textarea.component";
import { HiQuestionMarkCircle } from "react-icons/hi";

interface PushContentTabProps {
  title: string;
  content: string;
  isTestMode: boolean;
  onChange: (field: string, value: string | boolean) => void;
}

export function PushContentTab({
  title,
  content,
  isTestMode,
  onChange,
}: PushContentTabProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    // 테스트 모드가 켜져있을 때 [TEST] 접두어 처리
    if (isTestMode && !newTitle.startsWith("[TEST]")) {
      onChange("title", `[TEST] ${newTitle}`);
    } else if (!isTestMode && newTitle.startsWith("[TEST]")) {
      onChange("title", newTitle.replace("[TEST] ", ""));
    } else {
      onChange("title", newTitle);
    }
  };

  const handleTestModeChange = (checked: boolean) => {
    onChange("isTestMode", checked);
    // 테스트 모드 전환 시 제목 업데이트
    if (checked && !title.startsWith("[TEST]")) {
      onChange("title", `[TEST] ${title}`);
    } else if (!checked && title.startsWith("[TEST]")) {
      onChange("title", title.replace("[TEST] ", ""));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-medium text-gray-700">
            테스트 발송
          </label>
          <div className="group relative">
            <HiQuestionMarkCircle className="h-4 w-4 text-gray-400" />
            <div className="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
              테스트 발송 시 제목 앞에 [TEST]가 자동으로 추가됩니다.
            </div>
          </div>
        </div>
        <Switch
          checked={isTestMode}
          onChange={handleTestModeChange}
          className={`${
            isTestMode ? "bg-gray-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
        >
          <span className="sr-only">테스트 발송 모드</span>
          <span
            className={`${
              isTestMode ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>

      <div>
        <TextareaComponent
          rows={1}
          label="푸시 제목"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <TextareaComponent
          rows={3}
          label="푸시 내용"
          value={content}
          onChange={(e) => onChange("content", e.target.value)}
        />
      </div>
    </div>
  );
}
