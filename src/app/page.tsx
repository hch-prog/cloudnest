'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { Navbar } from '@/components/landing/Navbar';
import { features, FeatureCard } from '@/components/landing/Features';

const GradientBorder = ({ children }: { children: React.ReactNode }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 group-hover:opacity-100 blur rounded-lg transition duration-1000 group-hover:duration-200" />
    <div className="relative bg-black p-6 rounded-lg">{children}</div>
  </div>
);

export default function Home() {
  const { data: session, status } = useSession();
  const [refreshKey] = useState(0);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        
        <section className="relative pt-32 pb-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block animate-float">
                <span className="inline-flex items-center bg-blue-500/10 mb-6 px-3 py-1 rounded-full ring-1 ring-blue-500/20 ring-inset font-medium text-blue-400 text-sm">
                  <span className="bg-blue-400 mr-2 rounded-full w-2 h-2 animate-pulse" />
                  Now with AI-powered file organization
                </span>
              </div>

              <h1 className="mb-6 font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight">
                Better file uploads
                <span className="block bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mt-2 text-transparent">
                  for modern teams
                </span>
              </h1>
              <p className="mb-8 text-gray-400 text-lg sm:text-xl">
                A faster, simpler, and more secure alternative to Google Drive.
                From seamless uploads to intelligent file management, we've got you covered.
              </p>

              <div className="flex sm:flex-row flex-col sm:justify-center items-center gap-4">
                <button
                  onClick={() => signIn("google")}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Get Started Free</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-6 py-3 w-full sm:w-auto font-medium text-gray-300 text-sm hover:text-white transition-colors">
                  Watch Demo →
                </button>
              </div>

              <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3 mt-16">
                {features.map((feature) => (
                  <GradientBorder key={feature.title}>
                    <FeatureCard feature={feature} />
                  </GradientBorder>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-600">Cloud</span>Nest
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {session.user?.image && (
              <div className="flex items-center gap-2">
                <span className="text-gray-700">{session.user.name}</span>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={session.user.image}
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </nav>
        
        <Dashboard key={refreshKey} />
      </div>
    </main>
  );
}