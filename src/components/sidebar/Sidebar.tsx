"use client";
import { useState } from "react";
import Link from "next/link";
import { SidebarItem } from "@/types/sidebar";
import { StorageIndicator } from "./StorageIndicator";
import { UploadModal } from "./UploadModal";




const menuItems: SidebarItem[] = [
    {
        name: "My Files",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
        ),
        active: true,
    },
    {
        name: "Shared",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        ),
        count: 5,
    },
    {
        name: "Starred",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        ),
    },
    {
        name: "Recent Activity",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: "Trash",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        ),
    },

];

export const Sidebar = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    return (
        <>
            <div className="fixed border-white/10 p-4 border-r w-80 h-screen">

                <div className="mb-10">
                    <Link href="/" className="flex items-center gap-3 font-bold text-2xl">
                        <span className="text-white">Cloud<span className="text-blue-500">Nest</span></span>
                    </Link>
                </div>



                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <a
                            key={item.name}
                            href="#"
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${item.active
                                ? "bg-blue-500/10 text-blue-500"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                            {item.count && (
                                <span className="bg-white/10 ml-auto px-3 py-1 rounded-full text-sm">
                                    {item.count}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>

                {/* Storage indicator */}
                <StorageIndicator />
            </div>

            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </>
    );
}; 