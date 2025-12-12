'use client';

import { Shield, Zap, Sparkles, Brain, Code2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <Zap className="h-6 w-6 text-yellow-400" />,
        title: "Real-time Suggestions",
        description: "Get instant answers as soon as the interviewer speaks or you select text."
    },
    {
        icon: <Shield className="h-6 w-6 text-green-400" />,
        title: "100% Undetectable",
        description: "Designed to be invisible to screen sharing and proctoring software."
    },
    {
        icon: <Brain className="h-6 w-6 text-purple-400" />,
        title: "Context Aware",
        description: "AI understands your resume and tailors answers to your specific experience."
    },
    {
        icon: <Code2 className="h-6 w-6 text-blue-400" />,
        title: "Live Coding Help",
        description: "Stuck on a LeetCode problem? Get optimal solutions explained instantly."
    },
    {
        icon: <Sparkles className="h-6 w-6 text-pink-400" />,
        title: "Behavioral Coaching",
        description: "STAR method structures for every behavioral question tailored to you."
    },
    {
        icon: <Globe className="h-6 w-6 text-indigo-400" />,
        title: "Multilingual",
        description: "Support for interviews in English, Spanish, French, and 20+ languages."
    }
];

export function Features() {
    return (
        <section id="features" className="py-20 bg-black/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                        Everything you need to <br /> crush the interview
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Powered by advanced LLMs and specialized for interview scenarios.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group"
                        >
                            <div className="mb-4 p-3 bg-white/5 rounded-lg inline-block group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
