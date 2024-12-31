'use client';

import { useSession, } from "next-auth/react";
import { Navbar } from '@/components/landing/Navbar';
import { FAQ } from "@/components/landing/FAQ";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import Header from "@/components/landing/Header";



export default function Home() {
  const { status } = useSession();


  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-2 border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }


  return (
    <main className="bg-black min-h-screen">
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <Header />
        <Testimonials />
        <Pricing />
        <FAQ />
      </div>
    </main>
  );
}
