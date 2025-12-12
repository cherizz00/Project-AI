
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function AITester() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!question) return;
        setLoading(true);
        setAnswer("");
        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });
            const data = await res.json();
            if (res.ok) {
                setAnswer(data.answer || "No answer returned");
            } else {
                setAnswer("Error: " + (data.error || res.statusText));
            }
        } catch (err: any) {
            setAnswer("Net Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-white/5 border-white/10 text-white mt-8">
            <CardHeader>
                <CardTitle>Test AI Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <textarea
                    className="w-full p-2 rounded bg-black/50 border border-white/20 text-white"
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button onClick={handleGenerate} disabled={loading || !question} className="bg-purple-600 hover:bg-purple-500">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Answer"}
                </Button>
                {answer && (
                    <div className="p-4 rounded bg-black/30 border border-white/10 mt-4">
                        <strong>Agent Response:</strong>
                        <p className="mt-2 text-gray-300 whitespace-pre-wrap">{answer}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
