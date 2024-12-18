'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  
  const handleSignIn = () => {
    router.push('/auth');
  }

  return (
    <nav className="top-0 right-0 left-0 z-50 fixed border-white/10 bg-black/50 backdrop-blur-xl border-b">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16">
        <div className="flex items-center">
          <span className="font-bold text-white text-xl hover:text-white hover:opacity-80 transition-opacity">
            Cloud<span className="text-blue-500">Nest</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/docs"
            className="relative text-gray-400 text-sm hover:text-white transition-colors group"
          >
            Documentation
            <span className="group-hover:w-full -bottom-1 left-0 absolute bg-blue-500 w-0 h-0.5 transition-all" />
          </Link>
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};
