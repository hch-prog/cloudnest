'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from 'react';
import Dashboard from '@/components/Dashboard';


export default function Home() {
  const { data: session, status } = useSession();
  const [refreshKey] = useState(0);

  

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Welcome to CloudNest</h1>
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">CloudNest</h1>
          <div className="flex items-center space-x-4">
            {session.user?.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-2">
                <Image
                  src={session.user.image}
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <button
              onClick={() => signOut()}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <Dashboard key={refreshKey} />
      </div>
    </main>
  );
}