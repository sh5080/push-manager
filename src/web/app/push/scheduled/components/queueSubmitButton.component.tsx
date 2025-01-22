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
      <button
        onClick={onSubmit}
        disabled={extraCount === 0}
        className={`px-4 py-2 rounded-md ${
          extraCount > 0
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        예약 대기열 전송 ({extraCount}건)
      </button>
    </div>
  );
}
