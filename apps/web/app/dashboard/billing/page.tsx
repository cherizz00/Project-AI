"use client";

import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function BillingPage() {
    return (
        <Suspense fallback={<div className="text-white p-8">Loading billing info...</div>}>
            <BillingContent />
        </Suspense>
    );
}

function BillingContent() {
    const [loading, setLoading] = useState(false);
    const [planStatus, setPlanStatus] = useState<{ plan: string, isPro: boolean } | null>(null);
    const searchParams = useSearchParams();
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    useEffect(() => {
        fetch("/api/billing/plan-status")
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    try {
                        return JSON.parse(text); // Try parsing error JSON
                    } catch {
                        throw new Error(text || res.statusText);
                    }
                }
                return res.json();
            })
            .then(data => {
                if (data?.error) {
                    console.error("Plan Status Error:", data.error);
                } else {
                    setPlanStatus(data);
                }
            })
            .catch(err => {
                console.error("Failed to fetch plan status:", err);
            });
    }, []);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/billing/create-checkout", {
                method: "POST"
            });

            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.error("Billing Error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 text-white">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
                <p className="text-gray-400">Manage your plan and billing details.</p>
            </div>

            {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 text-green-500 rounded">
                    Payment successful! Your plan has been upgraded to PRO.
                </div>
            )}

            {canceled && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 rounded">
                    Payment canceled. You can try again anytime.
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
                    <h3 className="text-xl font-bold">Free Plan</h3>
                    <div className="text-3xl font-bold">$0<span className="text-sm font-normal text-gray-400">/mo</span></div>
                    <p className="text-gray-400 text-sm">Best for exploring the platform.</p>

                    <div className="space-y-2 pt-4">
                        <div className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-green-500" /> 10 Daily Generations</div>
                        <div className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-green-500" /> Basic Support</div>
                    </div>

                    <Button
                        disabled
                        variant="outline"
                        className="w-full text-white border-white/20 mt-4 disabled:opacity-50"
                    >
                        Current Plan
                    </Button>
                </div>

                <div className={`bg-gradient-to-br from-blue-500/10 to-violet-500/10 border ${planStatus?.isPro ? 'border-blue-500 bg-blue-500/20' : 'border-blue-500/30'} rounded-xl p-8 space-y-4 relative`}>
                    {planStatus?.isPro && <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">ACTIVE</div>}
                    <h3 className="text-xl font-bold text-blue-400">Pro Plan</h3>
                    <div className="text-3xl font-bold">$29<span className="text-sm font-normal text-gray-400">/mo</span></div>
                    <p className="text-gray-400 text-sm">Unlock full potential.</p>

                    <div className="space-y-2 pt-4">
                        <div className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-blue-500" /> Unlimited Generations</div>
                        <div className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-blue-500" /> Chrome Extension Access</div>
                        <div className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-blue-500" /> Priority Support</div>
                    </div>

                    {planStatus?.isPro ? (
                        <Button className="w-full bg-white text-blue-900 hover:bg-gray-100 mt-4" disabled>
                            Already Subscribed
                        </Button>
                    ) : (
                        <Button
                            onClick={onSubscribe}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 mt-4"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Upgrade Now
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
