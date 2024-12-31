'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Cloud, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignIn = () => {
    router.push('/auth');
  }

  return (
    <nav className="top-0 right-0 left-0 z-50 fixed border-slate-800 bg-gradient-to-r from-slate-950 to-slate-900 border-b">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Cloud className="w-8 h-8 text-blue-500" />
          <span className="font-bold text-white text-xl hover:text-white/90 transition-all duration-300 cursor-pointer">
            Cloud<span className="bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 text-transparent">Nest</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="md:flex items-center gap-8 hidden">
          <Link
            href="/features"
            className="relative text-slate-300 text-sm hover:text-white transition-all duration-300 group"
          >
            Features
            <span className="group-hover:w-full -bottom-1 left-0 absolute bg-blue-500/50 w-0 h-0.5 transition-all duration-300" />
          </Link>
          <Link
            href="/pricing"
            className="relative text-slate-300 text-sm hover:text-white transition-all duration-300 group"
          >
            Pricing
            <span className="group-hover:w-full -bottom-1 left-0 absolute bg-blue-500/50 w-0 h-0.5 transition-all duration-300" />
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 text-sm hover:text-white transition-all duration-300">
              Resources
              <ChevronDown className="group-hover:rotate-180 w-4 h-4 transition-transform duration-300" />
            </button>
            <div className="group-hover:visible top-full right-0 absolute border-slate-800 bg-slate-900 opacity-0 group-hover:opacity-100 shadow-xl mt-2 border rounded-lg w-48 transition-all duration-300 invisible">
              <Link
                href="/docs"
                className="block hover:bg-slate-800 px-4 py-2 rounded-t-lg text-slate-300 text-sm hover:text-white transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/tutorials"
                className="block hover:bg-slate-800 px-4 py-2 text-slate-300 text-sm hover:text-white transition-colors"
              >
                Tutorials
              </Link>
              <Link
                href="/blog"
                className="block hover:bg-slate-800 px-4 py-2 rounded-b-lg text-slate-300 text-sm hover:text-white transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
          <button
            onClick={handleSignIn}
            className="bg-blue-600 hover:bg-blue-500 shadow-lg hover:shadow-blue-500/20 px-4 py-2 rounded-lg text-white transition-all duration-300"
          >
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-slate-900 border-t border-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64' : 'max-h-0 invisible'} overflow-hidden`}>
        <div className="space-y-2 px-4 py-2">
          <Link
            href="/features"
            className="block py-2 text-slate-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="block py-2 text-slate-300 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="block py-2 text-slate-300 hover:text-white transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="/tutorials"
            className="block py-2 text-slate-300 hover:text-white transition-colors"
          >
            Tutorials
          </Link>
          <Link
            href="/blog"
            className="block py-2 text-slate-300 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <button
            onClick={handleSignIn}
            className="bg-blue-600 hover:bg-blue-500 shadow-lg hover:shadow-blue-500/20 px-4 py-2 rounded-lg w-full text-white transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;