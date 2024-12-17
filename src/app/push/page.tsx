import Link from "next/link";

export default function PushPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">푸시 메시지 관리</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 타겟 푸시 섹션 */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">타겟 푸시</h2>
          <div className="space-y-4">
            <Link
              href="/push/target/send"
              className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
            >
              타겟 푸시 발송
            </Link>
            <Link
              href="/push/target/history"
              className="block w-full border border-gray-300 text-center py-2 rounded hover:bg-gray-50"
            >
              발송 이력 조회
            </Link>
          </div>
        </div>

        {/* 전체 푸시 섹션 */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">전체 푸시</h2>
          <div className="space-y-4">
            <Link
              href="/push/all/send"
              className="block w-full bg-green-500 text-white text-center py-2 rounded hover:bg-green-600"
            >
              전체 푸시 발송
            </Link>
            <Link
              href="/push/all/history"
              className="block w-full border border-gray-300 text-center py-2 rounded hover:bg-gray-50"
            >
              발송 이력 조회
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
