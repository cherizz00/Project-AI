import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState<{ answer: string, structure: string[], shortVersion: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();

        // Check for selected question from storage (set by background context menu)
        chrome.storage.local.get("selectedQuestion", (data) => {
            if (data.selectedQuestion) {
                setQuestion(data.selectedQuestion as string);
                // Clear it so it doesn't persist forever
                chrome.storage.local.remove("selectedQuestion");
            }
        });
    }, []);

    const checkAuth = async () => {
        // Try to find the next-auth cookie for localhost or production URL
        // This requires 'cookies' permission which we need to ensure is in manifest or host_permissions covers it
        try {
            const cookie = await chrome.cookies.get({ url: "http://localhost:3000", name: "next-auth.session-token" });
            if (cookie) {
                setIsAuthenticated(true);
                // Optionally store it
                chrome.storage.local.set({ authToken: cookie.value });
            } else {
                setIsAuthenticated(false);
            }
        } catch (e) {
            console.error("Auth check failed", e);
        }
    };

    const handleLogin = () => {
        chrome.tabs.create({ url: "http://localhost:3000/api/auth/signin" });
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError("");
        setAnswer(null);

        try {
            const response = await chrome.runtime.sendMessage({
                type: "GENERATE_ANSWER",
                question
            });

            if (response.success) {
                setAnswer(response.data);
            } else {
                setError(response.error || "Failed to generate");
            }
        } catch {
            setError("Communication error");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="p-4 w-96 font-sans">
                <h1 className="text-xl font-bold mb-4">AI Interview Helper</h1>
                <p className="mb-4 text-gray-600">Please log in to use the extension.</p>
                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Log In via Web
                </button>
                <button onClick={checkAuth} className="text-sm text-blue-500 mt-2 underline">
                    Refresh Auth Status
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 w-96 font-sans max-h-[600px] overflow-y-auto">
            <h1 className="text-xl font-bold mb-4">AI Interview Helper</h1>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Question</label>
                <textarea
                    className="w-full border rounded p-2 h-24 text-sm"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Paste interview question here..."
                />
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading || !question.trim()}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full disabled:opacity-50"
            >
                {loading ? "Generating..." : "Generate Answer"}
            </button>

            {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 text-sm rounded">
                    {error}
                </div>
            )}

            {answer && (
                <div className="mt-4 space-y-4">
                    <div className="p-3 bg-gray-50 rounded border">
                        <h3 className="font-bold text-sm mb-1">Short Answer</h3>
                        <p className="text-sm">{answer.shortVersion}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm mb-2">Key Points</h3>
                        <ul className="list-disc pl-4 text-sm space-y-1">
                            {answer.structure.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm mb-1">Detailed</h3>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{answer.answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
