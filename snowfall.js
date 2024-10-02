// Create a canvas element and set its properties
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas); // Append the canvas to the body

// Initialize variables
let snowflakes = [];
let maxSnowflakes = 150; // Maximum number of snowflakes
const snowflakeCharacters = ['❄', '❅', '❆']; // Characters for snowflakes

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize the canvas when the window is resized
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Function to create snowflakes
function createSnowflakes() {
  snowflakes = [];
  for (let i = 0; i < maxSnowflakes; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width, // Random x position
      y: Math.random() * canvas.height, // Random y position
      radius: Math.random() * 4 + 1, // Random radius
      speedY: Math.random() * 1 + 0.5, // Random speed
      drift: Math.random() * 2 - 1, // Random left-right drift
      character: snowflakeCharacters[Math.floor(Math.random() * snowflakeCharacters.length)] // Random snowflake character
    });
  }
}

// Function to draw snowflakes
function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = 'white'; // Set the fill color to white
  for (let flake of snowflakes) {
    ctx.fillText(flake.character, flake.x, flake.y); // Draw the snowflake character
  }
  updateSnowflakes(); // Update the positions of snowflakes
}

// Function to update the position of snowflakes
function updateSnowflakes() {
  for (let flake of snowflakes) {
    flake.y += flake.speedY; // Move the snowflake down
    flake.x += flake.drift; // Move the snowflake left or right

    // Reset flake position to the top when it falls off the bottom
    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width; // Random x position
    }

    // Wrap around horizontal movement for a continuous drift
    if (flake.x > canvas.width) {
      flake.x = 0; // Wrap to the left
    } else if (flake.x < 0) {
      flake.x = canvas.width; // Wrap to the right
    }
  }
}

// Animation function
function animate() {
  drawSnowflakes(); // Draw snowflakes
  requestAnimationFrame(animate); // Request the next animation frame
}

// Start the snow animation
createSnowflakes(); // Create initial snowflakes
animate(); // Start the animation
