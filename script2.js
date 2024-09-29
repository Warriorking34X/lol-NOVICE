let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');

// Store positions of rectangles that form "CODEDAY 2024"
const targetRectangles = [];

// Initialize random rectangles
const rectangles = [];
for (let i = 0; i < 500; i++) { // Increased to ensure more rectangles are drawn
    rectangles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        w: Math.random() * 20 + 5, // Random width
        h: Math.random() * 20 + 5, // Random height
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    });
}

// Load the Codeday logo (use the correct logo file path)
const logo = new Image();
logo.src = 'codeday-logo.png'; // Make sure the path to your logo is correct
logo.onload = function() {
    draw();
};

// Function to form the text and calculate positions of rectangles
function formText() {
    // Set font and align text to the center
    ctx.font = '100px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    
    // Draw "CODEDAY 2024" to calculate the pixel positions
    ctx.fillText('CODEDAY 2024', canvas.width / 2, canvas.height / 2);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Loop through the image data to determine text pixel positions
    for (let y = 0; y < imageData.height; y += 5) {
        for (let x = 0; x < imageData.width; x += 5) {
            let index = (y * imageData.width + x) * 4;
            // If pixel is not white (text), it's part of the text
            if (imageData.data[index] < 255) {
                targetRectangles.push({ x, y });
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas after reading the text
}

// Function to animate the rectangles moving into the text
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update each rectangle's position to move toward its target
    rectangles.forEach((rect, i) => {
        if (i < targetRectangles.length) {
            const target = targetRectangles[i];
            rect.targetX = target.x;
            rect.targetY = target.y;
        }

        // Move rectangle toward its target position
        rect.x += (rect.targetX - rect.x) * 0.05;
        rect.y += (rect.targetY - rect.y) * 0.05;

        // Draw the rectangle
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    });

    // Draw the logo in the bottom right corner
    ctx.drawImage(logo, canvas.width - 200, canvas.height - 150, 150, 100);

    // Recursively call the draw function for animation
    requestAnimationFrame(draw);
}

// Initialize the text formation
formText();
