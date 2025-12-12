import { useState } from 'react';

function Popup() {
    const [status, setStatus] = useState('Ready');

    return (
        <div className="w-[300px] h-[400px] bg-gray-900 text-white p-4 flex flex-col">
            <header className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
                <h1 className="font-bold text-lg text-indigo-400">InterviewAI</h1>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <p className="text-gray-400 text-sm text-center">
                    Your undetected copilot is active.
                </p>

                <div className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-500 uppercase mb-1">Status</div>
                    <div className="font-medium">{status}</div>
                </div>

                <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors"
                    onClick={() => setStatus('Listening...')}
                >
                    Start Session
                </button>
            </div>

            <footer className="mt-auto pt-4 text-xs text-gray-600 text-center">
                v0.1.0 • <a href="#" className="hover:text-gray-400">Settings</a>
            </footer>
        </div>
    )
}

export default Popup
