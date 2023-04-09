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
      var coordinates = message.coordinates;
      var theme = items.theme;
      var opacity = items.opacity;

      chrome.tabs.insertCSS(null, {
        code: `
          #coordinates-container {
            background-color: ${theme === 'dark' ? 'black' : 'white'};
            color: ${theme === 'dark' ? 'white' : 'black'};
            opacity: ${opacity};
          }
        `
      });

      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'updateCoordinates',
        coordinates: coordinates
      });
    });
  }
});
