interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm">
      <div className="text-red-500 text-xl font-bold mb-4">
        데이터를 불러오는데 실패했습니다
      </div>
      <p className="text-gray-600 mb-6">
        {error?.message || "알 수 없는 오류가 발생했습니다"}
      </p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
