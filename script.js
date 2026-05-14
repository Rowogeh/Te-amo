// Photo Pool - Add all your photo filenames here
const photoPool = [
    'photos/photo1.jpeg',
    'photos/photo2.jpeg',
    'photos/photo3.jpeg',
    'photos/photo4.jpeg',
    'photos/photo5.jpeg',
    'photos/photo6.jpeg',
    'photos/photo7.jpeg',
    'photos/photo8.jpeg',
    'photos/photo9.jpeg',
    'photos/photo10.jpeg',
    'photos/photo11.jpeg',
    'photos/photo12.jpeg',
    'photos/photo13.jpeg',
    'photos/photo14.jpeg',
    'photos/photo15.jpeg',
    'photos/photo16.jpeg',
    'photos/photo17.jpeg',
    'photos/photo18.jpeg',
    'photos/photo19.jpeg',
    'photos/photo20.jpeg',
    'photos/photo21.jpeg',
    'photos/photo22.jpeg',
    'photos/photo23.jpeg',
    'photos/photo24.jpeg',
    'photos/photo25.jpeg',
    'photos/photo26.jpeg',
    'photos/photo27.jpeg',
    'photos/photo28.jpeg',
    'photos/photo29.jpeg',
    'photos/photo30.jpeg',
    'photos/photo31.jpeg',
    'photos/photo32.jpeg',
    'photos/photo33.jpeg',
    'photos/photo34.jpeg',
    'photos/photo35.jpeg',
    'photos/photo36.jpeg',
    'photos/photo37.jpeg',
    'photos/photo38.jpeg',
    'photos/photo39.jpeg',
    'photos/photo40.jpeg',
    'photos/photo41.jpeg',
    'photos/photo42.jpeg',
    'photos/photo43.jpeg',
    'photos/photo44.jpeg',
    'photos/photo45.jpeg',
    'photos/photo46.jpeg',
    'photos/photo47.jpeg',
    'photos/photo48.jpeg',
    'photos/photo49.jpeg',
    'photos/photo50.jpeg',
    'photos/photo51.jpeg',
    'photos/photo52.jpeg',
    'photos/photo53.jpeg',
    'photos/photo54.jpeg',
    'photos/photo55.jpeg',
    'photos/photo56.jpeg',
    'photos/photo57.jpeg',
    'photos/photo58.jpeg',
    'photos/photo59.jpeg',
    /*'photos/photo60.jpeg',
    'photos/photo61.jpeg',
    'photos/photo62.jpeg',
    'photos/photo63.jpeg',
    'photos/photo64.jpeg',
    'photos/photo65.jpeg',
    'photos/photo66.jpeg',
    'photos/photo67.jpeg',
    'photos/photo68.jpeg',
    'photos/photo69.jpeg',
    'photos/photo70.jpeg',
    'photos/photo71.jpeg',
    'photos/photo72.jpeg',
    'photos/photo73.jpeg',
    'photos/photo74.jpeg',
    'photos/photo75.jpeg',
    'photos/photo76.jpeg',
    'photos/photo77.jpeg',
    'photos/photo78.jpeg',
    'photos/photo79.jpeg',
    'photos/photo80.jpeg',
    'photos/photo81.jpeg',
    'photos/photo82.jpeg',
    'photos/photo83.jpeg',
    'photos/photo84.jpeg',
    'photos/photo85.jpeg',
    'photos/photo86.jpeg',
    'photos/photo87.jpeg',
    'photos/photo88.jpeg',
    'photos/photo89.jpeg',
    'photos/photo90.jpeg',
    'photos/photo91.jpeg',
    'photos/photo92.jpeg',
    'photos/photo93.jpeg',
    'photos/photo94.jpeg',
    'photos/photo95.jpeg',
    'photos/photo96.jpeg',
    'photos/photo97.jpeg',
    'photos/photo98.jpeg',
    'photos/photo99.jpeg',
    'photos/photo100.jpeg',*/
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

// Song Pool - Add all your song filenames here
const songPool = [
    'music/Qué Gusto Conocerte.mp3',
    'music/(They Long To Be) Close To You.mp3',
    'music/Amarte A La Antigua (Album Version).mp3',
    'music/Bolero Estelar.mp3',
    'music/Casi algo.mp3',
    'music/Cita con un Psicólogo.mp3',
    'music/La Casa de Nuestros Sueños.mp3',
    'music/La Mejor Versión.mp3',
    'music/Nunca digas Nunca.mp3',
    'music/Silver Lining.mp3',
    'music/The Only Exception.mp3',
    'music/Una tarde juntos.mp3',
    'music/Volare.mp3',
    'music/Yellow.mp3',
    // Add more songs here, for example:
    // 'music/song2.mp3',
    // 'music/song3.mp3',
];

// Music Player
const backgroundMusic = document.getElementById('backgroundMusic');
const musicPlayer = document.getElementById('musicPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const progressFill = document.getElementById('progressFill');
const progressBar = document.getElementById('progressBar');

let isPlaying = false;
let currentSongIndex = 0;

// Get a display name from the filename
function getSongDisplayName(path) {
    const filename = path.split('/').pop();              // "song.mp3"
    const name = filename.replace(/\.[^.]+$/, '');       // "song"
    return name.replace(/[-_]/g, ' ')                    // clean up
        .replace(/\b\w/g, c => c.toUpperCase());  // capitalize
}

// Load a song by index
function loadSong(index) {
    if (songPool.length === 0) return;
    currentSongIndex = ((index % songPool.length) + songPool.length) % songPool.length;
    backgroundMusic.src = songPool[currentSongIndex];
    songTitle.textContent = getSongDisplayName(songPool[currentSongIndex]);
    progressFill.style.width = '0%';
}

// Play / Pause
function togglePlay() {
    if (isPlaying) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
}

function setPlayingState(playing) {
    isPlaying = playing;
    playBtn.textContent = playing ? '⏸' : '▶';
    if (playing) {
        musicPlayer.classList.remove('paused');
    } else {
        musicPlayer.classList.add('paused');
    }
}

// Next / Previous
function nextSong() {
    const wasPlaying = isPlaying;
    loadSong(currentSongIndex + 1);
    if (wasPlaying) backgroundMusic.play();
}

function prevSong() {
    // If more than 3 seconds in, restart current song; otherwise go to previous
    if (backgroundMusic.currentTime > 3) {
        backgroundMusic.currentTime = 0;
    } else {
        const wasPlaying = isPlaying;
        loadSong(currentSongIndex - 1);
        if (wasPlaying) backgroundMusic.play();
    }
}

// Update progress bar
function updateProgress() {
    if (backgroundMusic.duration) {
        const percent = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
        progressFill.style.width = percent + '%';
    }
}

// Seek on progress bar click
progressBar.addEventListener('click', (e) => {
    if (backgroundMusic.duration) {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        backgroundMusic.currentTime = percent * backgroundMusic.duration;
    }
});

// Event listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

backgroundMusic.addEventListener('play', () => setPlayingState(true));
backgroundMusic.addEventListener('pause', () => setPlayingState(false));
backgroundMusic.addEventListener('timeupdate', updateProgress);
backgroundMusic.addEventListener('ended', nextSong);

// Initialize: load first song and try to autoplay
function initPlayer() {
    const randomIndex = Math.floor(Math.random() * songPool.length);
    loadSong(randomIndex);
    musicPlayer.classList.add('paused');

    const playPromise = backgroundMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Autoplay blocked — user will click play
        });
    }
}

window.addEventListener('DOMContentLoaded', initPlayer);


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
    '#E8B2C3', // soft blossom2
    '#ffc4d6', // Soft Blossom
    '#F8BFE1', // Blush pop
    '#F1BAEB', // Pink Orchid
    '#E2AFFF', // Mauve
    '#CB9CF5', // Mauve 2
    '#B388EB', // Bright Lavender
    '#AB9EEC', // Soft
    '#A2B4ED', // Baby blue Ice
    '#9CD1EF', // Baby Blue
    '#90E0EF', // frosted blue
    '#8CE8EA', // Electric Aqua
    '#88F0E5', // Soft Cyan
    '#84F8E0', // Aquamarine
    '#80FFDB', // Aquamarine2 
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
