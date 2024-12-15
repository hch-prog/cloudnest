'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Welcome to My App</h1>
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
      {session.user?.image && (
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={session.user.image}
            alt="Profile picture"
            fill
            className="object-cover"
          />
        </div>
      )}
      <p className="text-gray-600">{session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
