chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    theme: 'dark',
    opacity: 0.8
  });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.executeScript(activeInfo.tabId, { file: 'content.js' }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateCoordinates') {
    chrome.storage.local.get(['theme', 'opacity'], (items) => {
      const coordinates = message.coordinates;
      const theme = items.theme;
      const opacity = items.opacity;

      chrome.tabs.insertCSS(sender.tab.id, {
        code: `
          #coordinates-container {
            background-color: ${theme === 'dark' ? 'black' : 'white'};
            color: ${theme === 'dark' ? 'white' : 'black'};
            opacity: ${opacity};
          }
        `
      }, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        }
      });

      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'updateCoordinates',
        coordinates: coordinates
      });
    });
  }
});
