import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-16 border-b bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="h-full flex items-center px-6">
        <Link 
          href="/" 
          className="text-xl font-bold hover:text-gray-700 transition-colors"
        >
          Push Manager
        </Link>
      </div>
    </header>
  );
} 