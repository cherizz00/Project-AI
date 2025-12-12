// Content script
console.log('InterviewAI Content Script Loaded');

// Listen for messages
chrome.runtime.onMessage.addListener((request: { action: string }, _sender: chrome.runtime.MessageSender, sendResponse: (response?: unknown) => void) => {
    console.log('Message received:', request);
    if (request.action === 'read_page') {
        const content = document.body.innerText;
        sendResponse({ content: content.substring(0, 5000) }); // Limit for safety
    }
});
