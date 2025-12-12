export default function QuestionsPage() {
    return (
        <div className="space-y-4 text-white">
            <h2 className="text-3xl font-bold tracking-tight">Saved Questions</h2>
            <p className="text-gray-400">Your library of interview questions and answers.</p>

            <div className="border border-dashed border-white/10 rounded-lg h-64 flex items-center justify-center text-gray-500 bg-white/5">
                No saved questions yet. Start generating!
            </div>
        </div>
    );
}
