'use client';

import Link from "next/link";
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Secure Storage",
    description: "Bank-grade encryption for your files",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast",
    description: "Instant uploads and downloads",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Auto Backup",
    description: "Never lose important files again",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Team Sharing",
    description: "Collaborate with your team easily",
  },
];

function AuthContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="flex min-h-screen bg-black">
      
      <div className="relative lg:flex flex-1 hidden overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 animate-pulse" />
          <div className="bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] absolute inset-0 from-blue-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative flex flex-col justify-center items-center p-20 w-full h-full">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-4xl text-white">
              Welcome to{" "}
              <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-transparent">
                CloudNest
              </span>
            </h2>
            <p className="mx-auto max-w-md text-gray-400 text-lg">
              The secure cloud storage platform trusted by millions worldwide
            </p>
          </div>

          <div className="gap-6 grid grid-cols-2 w-full max-w-2xl">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="hover:bg-white/5 p-6 transition-all duration-300 glass-card group"
              >
                <div className="flex items-center gap-4">
                  <div className="group-hover:scale-110 flex justify-center items-center bg-blue-500/10 rounded-lg w-12 h-12 text-blue-500 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <div className="px-8 w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <span className="font-bold text-2xl text-white">
              Cloud<span className="text-blue-500">Nest</span>
            </span>
          </Link>

          <h1 className="mb-2 font-bold text-3xl text-white">Welcome back</h1>
          <p className="mb-8 text-gray-400">
            Sign in to access your files and continue your work
          </p>

          <button
            className="flex justify-center items-center gap-3 border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 border rounded-lg w-full text-white transition-all duration-300 group"
            onClick={() => signIn('google', { callbackUrl })}
          >
            <svg className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}