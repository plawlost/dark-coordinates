// Get the coordinates container and the coordinates
const coordinatesContainer = document.getElementById("coordinates-container");
const coordinates = document.getElementById("coordinates");

// Function to update the coordinates when the mouse moves
function updateCoordinates(event) {
  // Update the text of the coordinates to show the current mouse position
  coordinates.textContent = `${event.clientX}, ${event.clientY}`;
}

// Add an event listener to update the coordinates when the mouse moves
document.addEventListener("mousemove", updateCoordinates);

// When the extension is opened, set the focus on the coordinates container to enable scrolling
coordinatesContainer.focus();

// Add a click event listener to the coordinates container to copy the coordinates to the clipboard
coordinatesContainer.addEventListener("click", function() {
  // Create a temporary input element to copy the coordinates to the clipboard
  const input = document.createElement("input");
  input.setAttribute("value", coordinates.textContent);
  document.body.appendChild(input);
  input.select();

  // Copy the coordinates to the clipboard and remove the temporary input element
  document.execCommand("copy");
  document.body.removeChild(input);
});

// When the popup is closed, remove the event listener for updating the coordinates to avoid performance issues
window.addEventListener("unload", function() {
  document.removeEventListener("mousemove", updateCoordinates);
});
