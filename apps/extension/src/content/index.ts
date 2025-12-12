console.log("AI Interview Content Script Loaded");

document.addEventListener("selectionchange", () => {
    const selection = window.getSelection()?.toString();
    if (selection && selection.length > 5) {
        chrome.runtime.sendMessage({
            type: "TEXT_SELECTED",
            text: selection
        });
    }
});
