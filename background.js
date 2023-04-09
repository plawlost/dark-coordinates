const theme = 'dark';
const opacity = 0.8;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    theme,
    opacity
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
    const coordinates = message.coordinates;

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
      coordinates
    });
  }
});
