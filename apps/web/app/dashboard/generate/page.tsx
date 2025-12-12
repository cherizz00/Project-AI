"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Copy } from 'lucide-react';

export default function GeneratePage() {
    const [question, setQuestion] = useState("");
    const [role, setRole] = useState("Software Engineer");
    const [experience, setExperience] = useState("Mid-Level");
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                body: JSON.stringify({
                    question,
                    context: { role, experience }
                })
            });

            if (!res.ok) {
                if (res.status === 429) {
                    setError("Daily limit reached. Please upgrade to Pro.");
                } else {
                    setError("Something went wrong.");
                }
                return;
            }

            const data = await res.json();
            setResult(data);
        } catch {
            setError("Failed to generate.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 text-white">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Generate Answer</h2>
                <p className="text-gray-400">Get instant, structured answers for interview questions.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Input
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-white/5 border-white/10 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Experience Level</Label>
                        <Input
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="bg-white/5 border-white/10 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Question</Label>
                        <Textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="e.g. Explain the difference between process and thread."
                            className="bg-white/5 border-white/10 text-white h-32"
                        />
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={loading || !question}
                        className="w-full bg-blue-600 hover:bg-blue-500"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate Answer
                    </Button>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded text-sm">
                            {error}
                        </div>
                    )}
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    {!result && !loading && (
                        <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-lg text-gray-500 bg-white/5 p-8">
                            Enter a question to see the answer generated here.
                        </div>
                    )}

                    {result && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                <h3 className="font-semibold mb-2 text-blue-400">Short Version</h3>
                                <p className="text-sm text-gray-300">{result.shortVersion}</p>
                            </div>

                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                <h3 className="font-semibold mb-2 text-blue-400">Key Points</h3>
                                <ul className="list-disc pl-4 text-sm text-gray-300 space-y-1">
                                    {result.structure?.map((point: string, i: number) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-blue-400">Detailed Answer</h3>
                                    <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3" /></Button>
                                </div>
                                <p className="text-sm text-gray-300 whitespace-pre-wrap">{result.answer}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
