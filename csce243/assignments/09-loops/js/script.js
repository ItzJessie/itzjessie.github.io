// Create bubbles using a for loop
// Bubbles appear in random x positions and float to the surface infinitely

const bubblesContainer = document.querySelector('.bubbles-container');

// Number of bubbles to create
const numberOfBubbles = 15;

// Using a for loop to create bubbles
for (let i = 0; i < numberOfBubbles; i++) {
    // Create a new bubble element
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Set random x position (0 to 100%)
    const randomXPosition = Math.random() * 100;
    bubble.style.left = randomXPosition + '%';
    
    // Set random animation delay (0 to 3 seconds)
    const randomDelay = Math.random() * 3;
    bubble.style.animationDelay = randomDelay + 's';
    
    // Set random bubble size (10px to 20px)
    const randomSize = Math.random() * 10 + 10;
    bubble.style.width = randomSize + 'px';
    bubble.style.height = randomSize + 'px';
    
    // Add bubble to container
    bubblesContainer.appendChild(bubble);
}
