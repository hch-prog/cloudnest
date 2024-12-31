'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Home from "@/components/Home";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/dashboard/Header";


const LoadingSpinner = () => (
    <div className="flex justify-center items-center bg-black min-h-screen">
        <div className="relative w-12 h-12">
            <div className="absolute border-4 border-blue-500/20 rounded-full w-12 h-12" />
            <div className="absolute border-4 border-t-transparent border-blue-500 rounded-full w-12 h-12 animate-spin" />
        </div>
    </div>
);



export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [refreshKey] = useState(0);

    if (status === "loading") {
        return <LoadingSpinner />;
    }


    if (!session) {
        router.push('/auth');
        return <LoadingSpinner />;
    }

    return (
        <main className="bg-black min-h-screen">
            <main className="bg-black min-h-screen">
                <Sidebar />

                <div className="pl-80">
                    <Header session={session} />


                    <Home key={refreshKey} />
                </div>
            </main>
        </main>
    );
}
