chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const x = message.x;
  const y = message.y;

  const coordsContainer = document.createElement('div');
  coordsContainer.style.position = "fixed";
  coordsContainer.style.top = `${y + 10}px`;
  coordsContainer.style.left = `${x + 10}px`;
  coordsContainer.style.backgroundColor = "#333";
  coordsContainer.style.color = "#fff";
  coordsContainer.style.padding = "5px 10px";
  coordsContainer.style.fontSize = "16px";
  coordsContainer.style.fontFamily = "sans-serif";
  coordsContainer.style.borderRadius = "5px";
  coordsContainer.style.zIndex = "999999999";
  coordsContainer.textContent = `X: ${x}, Y: ${y}`;

  document.body.appendChild(coordsContainer);
});
