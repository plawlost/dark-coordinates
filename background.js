chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    theme: 'dark',
    opacity: 0.8
  });
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.executeScript(activeInfo.tabId, { file: 'content.js' });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'updateCoordinates') {
    chrome.storage.sync.get(['theme', 'opacity'], function(items) {
      const { coordinates } = message;
      const { theme, opacity } = items;

      chrome.tabs.insertCSS(null, {
        code: `
          #coordinates-container {
            color: ${theme === 'dark' ? 'white' : 'black'};
            opacity: ${opacity};
          }
        `
      });

      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'updateCoordinates',
        coordinates
      });
    });
  }
});
