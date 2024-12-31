'use client';

import { features } from '@/components/landing/Features';
import { signIn } from 'next-auth/react';

export const Header = () => {
    return (
        <div>
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Enhanced Background Effects */}
                <div className="absolute inset-0">
                    <div className="bg-[radial-gradient(ellipse_at_top_right,#1d4ed880_5%,transparent_60%)] absolute inset-0" />
                    <div className="bg-[radial-gradient(ellipse_at_top_left,#3b82f680_5%,transparent_60%)] absolute inset-0" />
                    <div className="bg-[radial-gradient(circle_at_bottom,#1e40af80_1%,transparent_50%)] absolute inset-0" />

                    {/* Improved Grid Pattern */}
                    <div className="bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] absolute inset-0 bg-[size:48px_48px]" />

                    {/* Enhanced Floating Orbs */}
                    <div className="top-20 left-1/4 absolute bg-blue-600/20 blur-3xl rounded-full w-[32rem] h-[32rem] animate-pulse-slow" />
                    <div className="top-40 right-1/4 absolute bg-blue-400/20 blur-3xl rounded-full w-[32rem] h-[32rem] animate-pulse-slow delay-1000" />
                </div>

                <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Enhanced Hero Section */}
                        <div className="relative mb-8">
                            <h1 className="font-bold text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight">
                                <span className="inline-block relative text-white group">
                                    The Future of
                                    <div className="group-hover:scale-x-100 bottom-0 left-0 absolute bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full h-px transform transition-transform duration-500 ease-out scale-x-0" />
                                </span>
                                <span className="block bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mt-4 text-transparent animate-gradient">
                                    File Management
                                </span>
                            </h1>
                        </div>

                        {/* Enhanced Subtitle */}
                        <p className="relative mx-auto mb-12 max-w-2xl text-lg text-slate-300 sm:text-xl leading-relaxed">
                            <span className="font-semibold text-white/90">A google drive replacement.</span>
                            <span className="block mt-2 text-slate-400">Experience lightning-fast uploads with bank-level security.</span>
                        </p>

                        {/* Enhanced CTA Button */}
                        <div className="flex justify-center items-center gap-6 mb-28">
                            <button
                                onClick={() => signIn("google")}
                                className="relative px-8 py-4 rounded-xl transition-all duration-300 overflow-hidden group hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 opacity-90" />
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer-slow" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                <div className="relative flex justify-center items-center gap-2 font-medium text-white">
                                    Get Started
                                    <svg
                                        className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* Enhanced Features Grid */}
                        <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="relative p-8 rounded-2xl transition-all hover:-translate-y-1 duration-300 group"
                                    style={{
                                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
                                    }}
                                >
                                    {/* Enhanced Card Background */}
                                    <div className="absolute inset-0 border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border rounded-2xl" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-500/0 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />

                                    <div className="relative">
                                        {/* Enhanced Icon Container */}
                                        <div className="group-hover:scale-110 flex justify-center items-center bg-gradient-to-r from-blue-600 to-blue-500 mb-4 ml-20 p-[1px] rounded-xl w-12 h-12 transition-transform duration-300">
                                            <div className="flex justify-center items-center bg-slate-950/90 rounded-xl w-full h-full">
                                                <feature.icon className="group-hover:text-blue-300 w-6 h-6 text-blue-400 transition-colors" />
                                            </div>
                                        </div>

                                        {/* Enhanced Text Content */}
                                        <h3 className="group-hover:text-blue-400 mb-2 font-semibold text-white text-xl transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="group-hover:text-slate-300 text-slate-400 text-sm leading-relaxed transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Header;