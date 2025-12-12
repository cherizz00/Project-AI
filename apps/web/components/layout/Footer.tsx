import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-white text-xl">InterviewAI</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The undetectable AI copilot that helps you ace your technical interviews with confidence and ease.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#features" className="hover:text-indigo-400 transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                            <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Download Extension</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Stay Updated</h4>
                        <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for tips and updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white w-full focus:outline-none focus:border-indigo-500"
                            />
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} InterviewAI Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-500">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                        <a href="#" className="hover:text-white">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
