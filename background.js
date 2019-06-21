chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        // Sending message to content script
        chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
    });
});

// Message received from Content script
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.message) {
            case "open_new_tab": openNewTabCommand(request.data);
                break;
        }
    }
);

function openNewTabCommand(data) {
    chrome.tabs.create({ url: "https://google.com" })
}