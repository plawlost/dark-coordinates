chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: () => {
      const style = document.createElement('style');
      style.innerHTML = `
        body {
          position: relative;
        }
        .coordinates {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background-color: #333;
          color: #fff;
          padding: 5px 10px;
          font-size: 16px;
          font-family: sans-serif;
          border-radius: 5px;
          z-index: 999999999;
        }
      `;
      document.head.appendChild(style);

      const coordinatesContainer = document.createElement('div');
      coordinatesContainer.classList.add('coordinates');
      document.body.appendChild(coordinatesContainer);

      document.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        coordinatesContainer.textContent = `X: ${x}, Y: ${y}`;
      });

      // Send message to content.js to update the coordinates
      chrome.runtime.sendMessage({
        x: event.clientX,
        y: event.clientY
      });
    }
  });
});
