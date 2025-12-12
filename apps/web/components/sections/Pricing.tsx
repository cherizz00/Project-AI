'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function Pricing() {
    const handleCheckout = async (priceId: string) => {
        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section id="pricing" className="py-20 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
                    <p className="text-gray-400">Start for free, upgrade when you land the interview.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                        <h3 className="text-2xl font-bold mb-2">Starter</h3>
                        <div className="text-4xl font-bold mb-6">$0</div>
                        <p className="text-gray-400 mb-8">Perfect for exploring the tool and preparing for your first interviews.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-gray-300">
                                <Check className="h-5 w-5 text-indigo-400" /> 5 AI Suggestions / day
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Check className="h-5 w-5 text-indigo-400" /> Basic Response Templates
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Check className="h-5 w-5 text-indigo-400" /> Standard Latency
                            </li>
                        </ul>

                        <Button
                            variant="outline"
                            className="w-full border-white/20 hover:bg-white/10"
                            onClick={() => handleCheckout('free')}
                        >
                            Get Started Free
                        </Button>
                    </div>

                    {/* Pro Plan */}
                    <div className="p-8 rounded-2xl bg-indigo-600/10 border border-indigo-500/50 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            MOST POPULAR
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-indigo-300">Pro</h3>
                        <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                        <p className="text-gray-400 mb-8">For serious job seekers who want every advantage.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white">
                                <Check className="h-5 w-5 text-green-400" /> Unlimited AI Suggestions
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <Check className="h-5 w-5 text-green-400" /> Resume Context Injection
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <Check className="h-5 w-5 text-green-400" /> Ultra-low Latency Mode
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <Check className="h-5 w-5 text-green-400" /> Behavioral & Coding Modes
                            </li>
                        </ul>

                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => handleCheckout('price_pro')}
                        >
                            Upgrade to Pro
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
