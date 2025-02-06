import { Button } from "@commonComponents/inputs/button.component";

interface QueueSubmitButtonProps {
  extraCount: number;
  onSubmit: () => void;
}

export function QueueSubmitButton({
  extraCount,
  onSubmit,
}: QueueSubmitButtonProps) {
  return (
    <div className="flex justify-end mt-6 pt-4 border-t">
      <Button
        onClick={onSubmit}
        disabled={extraCount === 0}
        variant={extraCount > 0 ? "square-solid" : "square-line"}
      >
        예약 대기열 전송 ({extraCount}건)
      </Button>
    </div>
  );
}
