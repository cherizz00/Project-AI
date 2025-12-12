'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    New: Gemini 1.5 Pro Real-time Audio Support
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
                >
                    Ace Your Interview with an <br />
                    <span className="text-indigo-400">Undetectable AI Copilot</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                >
                    Get real-time answers, coding solutions, and behavioral suggestions during your interview.
                    Private, secure, and completely invisible.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    <Button size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg">
                        Install Extension <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-lg border-white/10 hover:bg-white/5">
                        <Play className="mr-2 h-4 w-4" /> Watch Demo
                    </Button>
                </motion.div>

                {/* UI Mockup Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="relative max-w-5xl mx-auto rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-4 shadow-2xl shadow-indigo-500/10"
                >
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-black overflow-hidden relative group">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                            <span className="text-lg">Browser Mockup / Demo Video Placeholder</span>
                        </div>
                        {/* Simulated Overlay */}
                        <div className="absolute top-10 right-10 w-80 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 p-4 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-indigo-400">InterviewAI Copilot</span>
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse"></div>
                                <div className="h-2 w-full bg-white/10 rounded animate-pulse"></div>
                                <div className="h-2 w-5/6 bg-white/10 rounded animate-pulse"></div>
                            </div>
                            <div className="mt-4 p-2 bg-indigo-500/10 rounded text-xs text-indigo-200 border border-indigo-500/20">
                                Suggestion: &quot;I utilize a STAR method approach...&quot;
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
