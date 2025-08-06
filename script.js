// script.js

const canvas = document.getElementById('fallingSymbolsCanvas');
const ctx = canvas.getContext('2d');

let symbols = [];
const symbolTypes = ['star', 'heart', 'rose', 'dove', 'sparkle']; // Define symbol types

// Get references to the new elements
const envelope = document.getElementById('envelope');
const loveLetterContainer = document.getElementById('loveLetterContainer');
const closeLetterButton = document.getElementById('closeLetterButton'); // Get the new close button

// Resize canvas to fill window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial resize

// Function to generate a random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to draw a star
function drawStar(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(x + Math.cos((18 + i * 72) * Math.PI / 180) * size,
                   y + Math.sin((18 + i * 72) * Math.PI / 180) * size);
        ctx.lineTo(x + Math.cos((54 + i * 72) * Math.PI / 180) * (size / 2),
                   y + Math.sin((54 + i * 72) * Math.PI / 180) * (size / 2));
    }
    ctx.closePath();
    ctx.fill();
}

// Function to draw a heart
function drawHeart(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y - size / 2, x + size, y, x, y + size);
    ctx.bezierCurveTo(x - size, y, x - size / 2, y - size / 2, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
}

// Function to draw a simple rose (abstract representation)
function drawRose(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2); // Center circle
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + size / 4, y - size / 4, size / 3, 0, Math.PI * 2); // Petal 1
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - size / 4, y - size / 4, size / 3, 0, Math.PI * 2); // Petal 2
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y + size / 4, size / 3, 0, Math.PI * 2); // Petal 3
    ctx.fill();
}

// Function to draw a simple dove (abstract representation)
function drawDove(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    // Body
    ctx.ellipse(x, y, size * 0.7, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.arc(x + size * 0.6, y - size * 0.2, size * 0.2, 0, Math.PI * 2);
    ctx.fill();
    // Tail
    ctx.beginPath();
    ctx.moveTo(x - size * 0.7, y);
    ctx.lineTo(x - size, y + size * 0.3);
    ctx.lineTo(x - size * 0.7, y + size * 0.1);
    ctx.closePath();
    ctx.fill();
    // Wing (simple arc)
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.4);
    ctx.quadraticCurveTo(x + size * 0.5, y - size * 0.8, x + size * 0.7, y - size * 0.4);
    ctx.lineTo(x, y - size * 0.4); // Close path
    ctx.fill();
}


// Function to draw a sparkle (simple cross)
function drawSparkle(x, y, size, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x, y + size / 2);
    ctx.stroke();
}


// Symbol class
class Symbol {
    constructor() {
        this.type = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
        this.x = random(0, canvas.width);
        this.y = random(-50, -10); // Start above the canvas
        this.size = random(15, 30);
        this.speed = random(0.5, 2);
        this.opacity = random(0.5, 1);
        this.color = this.getRandomColor();
        this.rotation = random(0, Math.PI * 2); // Initial rotation
        this.rotationSpeed = random(-0.02, 0.02); // Rotation speed
    }

    getRandomColor() {
        switch (this.type) {
            case 'star':
                return `rgba(255, 255, 200, ${this.opacity})`; // Yellowish white
            case 'heart':
                return `rgba(255, 100, 150, ${this.opacity})`; // Pinkish red
            case 'rose':
                return `rgba(255, 0, 0, ${this.opacity})`; // Red
            case 'dove':
                return `rgba(200, 200, 200, ${this.opacity})`; // Light grey
            case 'sparkle':
                return `rgba(255, 255, 255, ${this.opacity})`; // Pure white
            default:
                return `rgba(255, 255, 255, ${this.opacity})`;
        }
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height) {
            this.reset();
        }
    }

    reset() {
        this.type = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
        this.x = random(0, canvas.width);
        this.y = random(-50, -10);
        this.size = random(15, 30);
        this.speed = random(0.5, 2);
        this.opacity = random(0.5, 1);
        this.color = this.getRandomColor();
        this.rotation = random(0, Math.PI * 2);
        this.rotationSpeed = random(-0.02, 0.02);
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        switch (this.type) {
            case 'star':
                drawStar(0, 0, this.size, this.color);
                break;
            case 'heart':
                drawHeart(0, 0, this.size, this.color);
                break;
            case 'rose':
                drawRose(0, 0, this.size, this.color);
                break;
            case 'dove':
                drawDove(0, 0, this.size, this.color);
                break;
            case 'sparkle':
                drawSparkle(0, 0, this.size, this.color);
                break;
        }
        ctx.restore();
    }
}

// Initialize symbols
for (let i = 0; i < 50; i++) { // Start with 50 symbols
    symbols.push(new Symbol());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    symbols.forEach(symbol => {
        symbol.update();
        symbol.draw();
    });

    requestAnimationFrame(animate);
}

// Event listener for the envelope click
envelope.addEventListener('click', () => {
    envelope.classList.add('open'); // Add 'open' class to trigger envelope animation
    // After a short delay to allow envelope animation, reveal the letter
    setTimeout(() => {
        loveLetterContainer.classList.remove('hidden-letter');
        loveLetterContainer.classList.add('visible');
    }, 500); // Adjust delay to match envelope animation duration
});

// Event listener for the close button click
closeLetterButton.addEventListener('click', () => {
    loveLetterContainer.classList.remove('visible'); // Hide the letter
    loveLetterContainer.classList.add('hidden-letter'); // Add hidden class back
    // After a short delay, reset the envelope
    setTimeout(() => {
        envelope.classList.remove('open'); // Remove 'open' class to close envelope
    }, 500); // Adjust delay to match letter fade-out
});


// Start the animation on window load.
window.onload = function () {
    animate();
}
