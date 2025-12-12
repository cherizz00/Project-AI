'use client';

import { motion } from 'framer-motion';
import { Upload, Mic, Play } from 'lucide-react';

const steps = [
    {
        icon: Upload,
        title: '1. Upload Resume',
        description: 'We analyze your experience to tailor questions specifically for your role.',
    },
    {
        icon: Mic,
        title: '2. Start Session',
        description: 'Open the browser extension or uses the web dashboard during your call.',
    },
    {
        icon: Play,
        title: '3. Receive Answers',
        description: 'Get real-time, context-aware suggestions without typing a keyword.',
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-black relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                        How it Works
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Your personal AI copilot in just three simple steps.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
                                <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                                    <step.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector Line (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-white/10" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
