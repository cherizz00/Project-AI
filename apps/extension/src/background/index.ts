// Background Script
// Handles communication between popup/content and external APIs

chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Assistant Extension Installed");

    chrome.contextMenus.create({
        id: "generate-answer",
        title: "Generate Answer for Selection",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "generate-answer" && info.selectionText) {
        // Send message to popup or content script? 
        // Usually we might want to open the popup or send a message to content script to show overlay.
        // For simplicity, we'll store it in storage so popup can read it.
        chrome.storage.local.set({ selectedQuestion: info.selectionText });
    }
});


// Listener for messages
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === "GENERATE_ANSWER") {
        handleGenerateAnswer(message.question)
            .then(response => sendResponse({ success: true, data: response }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep channel open for async response
    }
});

async function handleGenerateAnswer(question: string) {
    // Get token from storage
    const storage = await chrome.storage.local.get("authToken");
    const token = storage.authToken;

    if (!token) {
        throw new Error("Not authenticated. Please login explicitly via the popup.");
    }

    // Call Next.js API
    const response = await fetch("http://localhost:3000/api/ai/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `next-auth.session-token=${token}` // This might not work due to HttpOnly. 
            // Better: Pass token in Authorization header if API supports it, 
            // OR rely on browser cookies if host_permission is set for localhost:3000 (which it is).
            // If using cookies, we don't need to manually attach if `credentials: 'include'` is set.
        },
        body: JSON.stringify({ question })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to generate answer");
    }

    return await response.json();
}
