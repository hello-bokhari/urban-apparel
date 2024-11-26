// Create a canvas to draw the favicon
const canvas = document.createElement("canvas");
canvas.width = 64; 
canvas.height = 64;
const context = canvas.getContext("2d");

// Set background color (optional, white by default)
context.fillStyle = "rgba(0, 0, 0, 0)"; //"#ffffff"; // White background
context.fillRect(0, 0, canvas.width, canvas.height);

// Set text properties
context.font = "bold 48px Arial"; // Bold, large font for the favicon
context.fillStyle = "#ffffff"; // Black text
context.textAlign = "center";
context.textBaseline = "middle";

// Draw "UA" text in the center
context.fillText("UA", canvas.width / 2, canvas.height / 2);

// Convert canvas to a data URL for the favicon
const faviconURL = canvas.toDataURL("image/png");

// Create or update the favicon link element
let favicon = document.querySelector("link[rel='icon']");
if (!favicon) {
  favicon = document.createElement("link");
  favicon.rel = "icon";
  document.head.appendChild(favicon);
}
favicon.href = faviconURL;
