import { useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('Ready');
  const [pageContent, setPageContent] = useState('');

  const handleScan = async () => {
    setStatus('Scanning...');
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (currentTab.id) {
      try {
        const response = await chrome.tabs.sendMessage(currentTab.id, { action: "read_page" });
        if (response && response.content) {
          setPageContent(response.content.substring(0, 100) + '...');
          setStatus('Connected & Scanned');
        } else {
          setStatus('No content found');
        }
      } catch (error) {
        console.error(error);
        setStatus('Error: Could not read page');
      }
    }
  };

  return (
    <div className="w-[300px] h-[400px] bg-slate-900 text-white p-4 flex flex-col font-sans">
      <header className="mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
        <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold text-xs">AI</div>
        <h1 className="font-bold text-lg">InterviewAI</h1>
      </header>

      <main className="flex-1 flex flex-col gap-4">
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <span className="text-xs text-gray-400 block mb-1">Status</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-sm font-medium">{status}</span>
          </div>
        </div>

        {pageContent && (
          <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex-1 overflow-hidden">
            <span className="text-xs text-gray-400 block mb-1">Context Reference</span>
            <p className="text-xs text-gray-300 break-words">{pageContent}</p>
          </div>
        )}

        <button
          onClick={handleScan}
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors py-2 rounded font-medium mt-auto"
        >
          Scan Current Page
        </button>
      </main>
    </div>
  )
}

export default App
