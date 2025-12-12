'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from '@/components/ui/card';
import { Sparkles, Copy, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analytics } from '@/lib/analytics';

export default function SessionPage() {
    const [question, setQuestion] = useState('');
    const [type, setType] = useState('behavioral');
    const [isGenerating, setIsGenerating] = useState(false);
    const [answer, setAnswer] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!question.trim()) return;
        setIsGenerating(true);
        analytics.track('generate_answer', { type });

        try {
            const response = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
                body: JSON.stringify({
                    question,
                    context: {
                        role: "Candidate",
                        experience: type // Sending the selected type (Technical/Behavioral) as context
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to generate answer");
            }

            const data = await response.json();
            setAnswer(data.answer);

        } catch (error) {
            console.error(error);
            setAnswer("Sorry, I couldn't generate an answer at this time. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        analytics.track('copy_answer');
        // copy logic
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
            {/* Input Section */}
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Live Session</h2>
                    <p className="text-gray-400">Paste the interviewer&apos;s question or type keywords.</p>
                </div>

                <Card className="flex-1 bg-white/5 border-white/10 p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger className="w-[180px] bg-black/20 border-white/10 text-white">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="behavioral">Behavioral</SelectItem>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="system-design">System Design</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Textarea
                        placeholder="Paste question here..."
                        className="flex-1 bg-black/20 border-white/10 text-white resize-none text-lg p-4 focus-visible:ring-indigo-500"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />

                    <Button
                        size="lg"
                        className="bg-indigo-600 hover:bg-indigo-700 h-14 text-lg"
                        onClick={handleGenerate}
                        disabled={isGenerating || !question}
                    >
                        {isGenerating ? (
                            <>
                                <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-5 w-5" /> Generate Answer
                            </>
                        )}
                    </Button>
                </Card>
            </div>

            {/* Output Section */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between h-14">
                    <h2 className="text-xl font-bold text-indigo-300">AI Suggestion</h2>
                    {answer && (
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={handleCopy} className="text-gray-400 hover:text-white"><Copy className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => analytics.track('feedback_thumbs_up')} className="text-gray-400 hover:text-white"><ThumbsUp className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => analytics.track('feedback_thumbs_down')} className="text-gray-400 hover:text-white"><ThumbsDown className="h-4 w-4" /></Button>
                        </div>
                    )}
                </div>

                <Card className="flex-1 bg-indigo-950/20 border-indigo-500/20 p-6 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {answer ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="prose prose-invert max-w-none"
                            >
                                <div className="whitespace-pre-wrap font-medium text-gray-200 leading-relaxed">
                                    {answer}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                                <Sparkles className="h-12 w-12 opacity-20" />
                                <p>Waiting for question...</p>
                            </div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
}
