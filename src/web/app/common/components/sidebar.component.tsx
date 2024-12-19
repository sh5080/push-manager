import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="h-full flex items-center">
      <ul className="w-full space-y-2 px-4">
        <li>
          <Link 
            href="/" 
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            대시보드
          </Link>
        </li>
        <li>
          <Link 
            href="/push" 
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            푸시 발송
          </Link>
        </li>
        <li>
          <Link 
            href="/push/history" 
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            푸시 조회
          </Link>
        </li>
      </ul>
    </nav>
  );
}
