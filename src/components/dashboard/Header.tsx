"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface HeaderProps {
  session: Session;
}
export const Header = ({ session }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const getUserInitials = (name?: string | null) => {
    if (!name) return "U";
    return name.split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="top-0 z-10 sticky border-white/10 bg-black/50 backdrop-blur-xl border-b">
      <div className="flex justify-between items-center px-8 h-16">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-white/10 bg-white/5 px-4 py-2 pl-10 border focus:border-blue-500/50 rounded-lg focus:ring-1 focus:ring-blue-500/20 w-full text-white focus:outline-none placeholder-gray-400"
            />
            <svg
              className="top-2.5 left-3 absolute w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex justify-center items-center bg-blue-500/20 hover:bg-blue-500/30 rounded-full w-8 h-8 transition-colors"
          >
            <span className="font-medium text-blue-500">
              {getUserInitials(session?.user?.name)}
            </span>
          </button>

          {showDropdown && (
            <div className="right-0 absolute border-white/10 bg-black/90 shadow-lg mt-2 py-1 border rounded-xl w-48">
              <div className="border-white/10 px-4 py-2 border-b">
                <p className="text-sm text-white">{session?.user?.name}</p>
                <p className="text-gray-400 text-xs">{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut()}
                className="hover:bg-white/5 px-4 py-2 w-full text-left text-red-400 text-sm"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}; 