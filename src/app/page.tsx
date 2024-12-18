'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { Navbar } from '@/components/landing/Navbar';
import { features } from '@/components/landing/Features';
import { FAQ } from "@/components/landing/FAQ";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";



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

        <section className="relative pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#3b82f680_5%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#8b5cf680_5%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#1d4ed880_1%,transparent_40%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />

            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
          </div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <div className="relative mb-6">
                <h1 className="font-bold text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-none">
                  <span className="relative inline-block text-white/90">
                    The Future of
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </span>
                  <span className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 animate-gradient">
                    File Management
                  </span>
                </h1>
              </div>

              <p className="relative mb-12 text-gray-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                <span className="font-medium text-gray-300">A google drive replacement.</span>
                <span className="block mt-2">Experience lightning-fast uploads with bank-level security.</span>
              </p>

              <div className="flex justify-center items-center gap-6 mb-24">
                <button
                  onClick={() => signIn("google")}
                  className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,138,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer-slow" />
                  <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                    Start now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group relative p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-4px]"
                    style={{
                      animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10" />

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                    <div className="relative">
                      <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-[1px] flex items-center justify-center ml-20">
                        <div className="w-full h-full rounded-xl bg-black/50 flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Testimonials />
        <Pricing />
        <FAQ />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between mb-8 bg-black/95 p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Cloud</span>
              <span className="text-white">Nest</span>
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            {session.user?.image && (
              <div className="flex items-center gap-3"> 
                <span className="text-gray-300">{session.user.name}</span>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[1px]">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt="Profile picture"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => signOut()}
              className="px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-sm font-medium backdrop-blur-sm hover:scale-[1.02]"
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