import { TextareaComponent } from "app/common/components/textarea.component";

interface PushContentTabProps {
  title: string;
  content: string;
  onChange: (field: string, value: string) => void;
}

export function PushContentTab({
  title,
  content,
  onChange,
}: PushContentTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <TextareaComponent
          rows={1}
          label="푸시 제목"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
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
