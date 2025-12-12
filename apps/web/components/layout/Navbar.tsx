'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        InterviewAI
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                    <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Login
                    </Link>
                    <Button className="bg-white text-black hover:bg-gray-200">
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    );
}
