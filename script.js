// Photo Pool - Add all your photo filenames here
const photoPool = [
    'photo1.jpeg',
    'photo2.jpeg',
    'photo3.jpeg',
    'photo4.jpeg',
    'photo5.jpeg',
    'photo6.jpeg',
    'photo7.jpeg',
    'photo8.jpeg',
    'photo9.jpeg',
    'photo10.jpeg',
    'photo11.jpeg',
    'photo12.jpeg',
    'photo13.jpeg',
    'photo14.jpeg',
    'photo15.jpeg',
    'photo16.jpeg',
    'photo17.jpeg',
    'photo18.jpeg',
    'photo19.jpeg',
    'photo20.jpeg',
    'photo21.jpeg',
    'photo22.jpeg',
    'photo23.jpeg',
    'photo24.jpeg',
    'photo25.jpeg',
    'photo26.jpeg',
    // Add more photos as needed
];

// Randomly select 6 photos from the pool
function getRandomPhotos(pool, count = 6) {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Load random photos into the grid
function loadRandomPhotos() {
    const selectedPhotos = getRandomPhotos(photoPool);
    const photoItems = document.querySelectorAll('.photo-item img');

    photoItems.forEach((img, index) => {
        if (selectedPhotos[index]) {
            img.src = selectedPhotos[index];
            img.alt = `Memory ${index + 1}`;
        }
    });
}

// Load photos when page loads
window.addEventListener('DOMContentLoaded', loadRandomPhotos);

// Background Music
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Try to autoplay music (may be blocked by browser)
function tryAutoplay() {
    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Autoplay started successfully
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicToggle.classList.remove('paused');
            })
            .catch(() => {
                // Autoplay was blocked - user will need to click the button
                isPlaying = false;
                musicToggle.classList.add('paused');
                musicToggle.classList.remove('playing');
            });
    }
}

// Toggle music on button click
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        isPlaying = false;
        musicToggle.classList.add('paused');
        musicToggle.classList.remove('playing');
    } else {
        backgroundMusic.play();
        isPlaying = true;
        musicToggle.classList.add('playing');
        musicToggle.classList.remove('paused');
    }
});

// Try to autoplay when page loads
window.addEventListener('DOMContentLoaded', tryAutoplay);


// Countdown Timer
const startDate = new Date('2025-12-11T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = now - startDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Color palette for falling petals
const colors = [
    '#ff1493', // Deep pink
    '#ff69b4', // Hot pink
    '#ffc0cb', // Pink
    '#ff6b9d', // Medium pink
    '#ffb6c1', // Light pink
    '#ff1744', // Red pink
    '#f50057', // Pink red
    '#ff4081', // Pink accent
    '#ffd700', // Gold
    '#ffb347', // Orange
    '#ff6347', // Tomato
    '#ff8c00', // Dark orange
    '#ffa500', // Orange
    '#ffff00', // Yellow
    '#ffeb3b', // Bright yellow
    '#ffd54f'  // Light yellow
];

// Falling Petals Animation
const fallingPetalsContainer = document.getElementById('fallingPetals');

function createFallingPetal() {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';

    // Random position
    petal.style.left = Math.random() * 100 + '%';

    // Random color
    petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Random size
    const size = 6 + Math.random() * 8;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    // Random animation duration
    const duration = 8 + Math.random() * 8;
    petal.style.animationDuration = duration + 's';

    // Random delay
    petal.style.animationDelay = Math.random() * 5 + 's';

    fallingPetalsContainer.appendChild(petal);

    // Remove petal after animation
    setTimeout(() => {
        petal.remove();
    }, (duration + 5) * 1000);
}

// Create initial falling petals
for (let i = 0; i < 15; i++) {
    createFallingPetal();
}

// Add new falling petals periodically
setInterval(createFallingPetal, 1500);
