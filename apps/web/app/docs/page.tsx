
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Installation Guide
                </h1>

                <div className="space-y-6">
                    <section className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <Download className="mr-2 h-5 w-5 text-blue-400" />
                            1. Download the Extension
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Since we are in developer mode, you need to load the extension manually.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto">
                            Download .zip (Adding soon)
                        </Button>
                    </section>

                    <section className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <h2 className="text-xl font-semibold mb-4">2. Load in Chrome</h2>
                        <ol className="list-decimal list-inside space-y-2 text-gray-300">
                            <li>Open Chrome and navigate to <code className="bg-black/50 px-2 py-1 rounded text-orange-400">chrome://extensions</code></li>
                            <li>Enable <strong>Developer mode</strong> in the top right.</li>
                            <li>Click <strong>Load unpacked</strong>.</li>
                            <li>Select the <code className="bg-black/50 px-2 py-1 rounded">dist</code> folder from the project.</li>
                        </ol>
                    </section>
                </div>
            </div>
        </div>
    );
}
