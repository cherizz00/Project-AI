// Background service worker
console.log('InterviewAI Background Service Worker Started');

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});
