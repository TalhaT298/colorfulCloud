// script.js (modified)
let score = 0;
const scoreDisplay = document.getElementById('score');
const colorNameDisplay = document.getElementById('colorName');
const gameContainer = document.getElementById('game-container');

const colors = [
    { name: 'White', code: '#ffffff' },
    { name: 'Gold', code: '#ffd700' },
    { name: 'Light Blue', code: '#add8e6' },
    { name: 'Red', code: '#ff0000' },
    { name: 'Green', code: '#00ff00' },
    { name: 'Blue', code: '#0000ff' },
    { name: 'Yellow', code: '#ffff00' },
    { name: 'Orange', code: '#ffa500' },
    { name: 'Purple', code: '#800080' },
    { name: 'Pink', code: '#ffc0cb' }
];

function createCloud() {
    const cloud = document.createElement('div');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    cloud.className = 'cloud';
    cloud.style.background = randomColor.code;
    
    // Adjust position calculation for container
    const containerRect = gameContainer.getBoundingClientRect();
    cloud.style.left = `${Math.random() * (containerRect.width - 80)}px`;
    cloud.style.top = `${containerRect.height}px`;

    gameContainer.appendChild(cloud);

    let posY = containerRect.height;
    const speed = Math.random() * 2 + 1;
    const move = setInterval(() => {
        posY -= speed;
        cloud.style.top = `${posY}px`;
        if (posY < -50) {
            cloud.remove();
            clearInterval(move);
        }
    }, 16);

    cloud.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling on touch
        score += (randomColor.code === '#ffd700') ? 5 : 1;
        scoreDisplay.textContent = `Score: ${score}`;
        colorNameDisplay.textContent = `Color: ${randomColor.name}`;
        cloud.remove();
        clearInterval(move);
    });

    // Keep click event for desktop
    cloud.onclick = () => {
        score += (randomColor.code === '#ffd700') ? 5 : 1;
        scoreDisplay.textContent = `Score: ${score}`;
        colorNameDisplay.textContent = `Color: ${randomColor.name}`;
        cloud.remove();
        clearInterval(move);
    };
}

// Adjust spawn rate based on screen size
const spawnInterval = window.innerWidth < 600 ? 1200 : 1000;
setInterval(createCloud, spawnInterval);

// Handle window resize
window.addEventListener('resize', () => {
    const clouds = document.getElementsByClassName('cloud');
    const containerRect = gameContainer.getBoundingClientRect();
    for (let cloud of clouds) {
        const left = parseFloat(cloud.style.left);
        if (left > containerRect.width - 80) {
            cloud.style.left = `${containerRect.width - 80}px`;
        }
    }
});