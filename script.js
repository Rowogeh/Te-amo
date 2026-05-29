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
    'music/Caiste Del Cielo.mp3',
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

// =============================================
//  Love Notes — ✏️ Edit your letters here!
//  Each entry is an object with:
//    title: shown on the front of the card
//    text:  the full letter content (can be very long)
//  Use \n for line breaks inside the text.
// =============================================
const loveNotes = [
    {
        title: 'Recuerdos',
        text: `Para mi niña linda:

Si me preguntaran ¿Cuál es mi lugar seguro?
Yo estoy totalmente convencido que sería a tu lado.
¿Quién lo diría?
En tan poco tiempo, pasamos de ser completos desconocidos a querer pasar una vida entera juntos, y no es para menos, porque cada día que pasa me enamoro más de ti.
¿Será cosa del destino?
Tal vez en este momento no tengo respuesta a eso, pero si pudiera asegurarte algo es que definitivamente iría contigo hasta el fin del mundo.
Quiero verte crecer, que cumplas tus sueños, que sanes de todas esas cosas que no me has contado y te siguen haciendo daño, por sobre todo, quiero que seas feliz, que sonrías siempre.

Por mi parte, prometo estar a tu lado en cada paso que des, por pequeño que sea, sabes que te apoyo hoy, mañana y siempre. Mientras tu así me lo permitas, estaré siempre para ti.

— Te amo mucho mi niña linda.`
    },

    {
        title: 'Noches',
        text: `En algún momento he querido sonreír de verdad...
       Pero siempre quedo a medias... Luché por amor pero el remo a pleno mar se quebró...
    Entre las penumbras había un mar sin dirección... ¿Has estado alguna vez sin rumbo sin remo?
    La noche oscura envuelve y salen mis demonios internos, me pregunto de verdad si acá es donde pertenezco... 
    Me he quedado sola y aprendí a sobrevivir... Sin rumbo aparente flotando en el mar dejándome llevar del destino y sus hazañas...
    Pero como todo tiene inicio y en tus manos un final en esa noche oscura ví la luna preguntar si de casualidad junto a mi, ¿existía un lugar? 
    Entre la noche espesa sin rumbo ni dirección, esa hermosa luna a mi vida entró con su brillo
    Mi vida alumbró y entre penumbras todo tomó color, sonreí unas cuantas noches para demostrarme su amor y plenamente bella me alumbra sin temor porque aprendí que el amor llega cuando más oscuro estoy sin poder negarlo me salvó

        Porque tú llegaste a mi vida cuando menos lo esperaba, cuando todo era negro, cuando no había esperanzas y llegaste como la luna despacio y sin prisas tomando una sonrisa para poco a poco alumbrar mis días y por ende si yo soy el sol que alumbró tu alma tu eres la luna que le dió sentido a mi vida y como nosotros nos somos planetas para viajar años en encontrarnos seamos nuestro eclipse que dure 100 años`
    },

    {
        title: 'Deseos',
        text: `Yo hace mucho deje de pedir y dejé de soñar...
        
    Me preguntaba que se sentiría tener una persona que te ame de la misma manera en la que tú puedes amar.
    
    Qué graciosa es la vida, cuando menos lo esperas, te topa de frente con respuestas a preguntas que tú ni tan siquiera sabías que te hacías.
    
    Son dos meses es muy cierto. Pero en este momento solo pido que si fallo me tengas paciencia, que si caigo me ayudes a levantar y que si me tiro a rendir me empujes,
    que me ames como lo haces porque no hay nada que yo no quiera más que conocerte y amarte completamente`
    },

    {
        title: 'El amor dura 3 meses',
        text: `¿Que pasaría si hoy te dijera que soy totalmente afortunada?
        
    Por tener la maravillosa dicha de haberme topado en tu vida...
    
    Cuando muchas cosas en la vida se ponen en contra... 
    
    Cuando sientes que luchas por encajar... 
    
    Cuando ves que todos los demás van en una etapa en dónde tú aún no has logrado llegar.... 
    
    ¿Que pasaría si te digo que a veces me río del karma? si es que existe .... 
    
    Que me río de la vida, de mis acciones, de mis decisiones, que me tiro al vacío sabiendo que en algún momento he de tocar el fondo, he de caer, he de quebrarme...
    
    ¿Cuántas noches maldije al universo por el destino que me ha tocado tener? 
    
    ¿Cuántas noches he llorado preguntándome el por qué?
    
    Y soy afortunada porque creo que al fin Dios en algún punto de la vida diría: si, te he puesto cada una de las piedras en el camino, en donde en cada una has tropezado has caído y has aprendido a ser mejor y más mujer, más humilde, más sensible, más humana, más la versión de mujer que tu eres capaz de ser
    y me golpeé con la realidad de todo lo que había querido tener desde que tengo uso de razón en mi vida, porque siempre he descrito al amor de mi vida que sea alto blanco de ojos claros y de cabello castaño o café, que sea tierno, que sea amoroso, que sea cuidadoso, que sea una versión diferente de lo que la sociedad dicta ser, un hombre que sea totalmente diferente a lo que mi papá es... 
    
    Y ví tu mirada y entendí porque hay cientos de constelaciones, entendí porque aún siguen buscando vida fuera de este planeta, comprendí porque los números no tienen final pero si un principio y me di cuenta que me puedo estar muriendo con un ataque de lo que sea y pensar que puedo incluso faltarte hoy y saber,
    
    que me enamore de ti y que soy sumamente feliz a tu lado`
    },
    // ✏️ Agrega más cartas aquí — copia el bloque de arriba y escribe tu mensaje
    // {
    //     title: 'Mi segunda carta',
    //     text: `Escribe tu carta aquí...
    //
    // Puede ser tan larga como quieras.`
    // },
];

// =============================================
//  Flip Card Logic
// =============================================
let currentCardIndex = 0;
let isFlipped = false;
let isAnimating = false;

const flipCard = document.getElementById('flipCard');
const cardMessage = document.getElementById('cardMessage');
const cardNumber = document.getElementById('cardNumber');
const cardFrontTitle = document.getElementById('cardFrontTitle');
const cardDots = document.getElementById('cardDots');
const prevCardBtn = document.getElementById('prevCard');
const nextCardBtn = document.getElementById('nextCard');

// Build dot indicators
function buildDots() {
    cardDots.innerHTML = '';
    loveNotes.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'card-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToCard(i));
        cardDots.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll('.card-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCardIndex);
    });
}

function applyCardContent(index) {
    const note = loveNotes[index];
    cardMessage.textContent = note.text;
    cardFrontTitle.textContent = note.title || `Carta ${index + 1}`;
    cardNumber.textContent = index + 1;
    // Reset scroll to top
    const inner = document.querySelector('.card-scroll-inner');
    if (inner) inner.scrollTop = 0;
    updateDots();
}

// Show a card at a given index
function goToCard(index) {
    if (isAnimating) return;
    currentCardIndex = ((index % loveNotes.length) + loveNotes.length) % loveNotes.length;

    // If currently flipped, flip back first, then swap content
    if (isFlipped) {
        isAnimating = true;
        flipCard.classList.remove('flipped');
        isFlipped = false;
        setTimeout(() => {
            applyCardContent(currentCardIndex);
            isAnimating = false;
        }, 350);
    } else {
        applyCardContent(currentCardIndex);
    }
}

// Toggle flip on card click
flipCard.addEventListener('click', () => {
    if (isAnimating) return;
    isFlipped = !isFlipped;
    flipCard.classList.toggle('flipped', isFlipped);
});

// Nav buttons
prevCardBtn.addEventListener('click', () => goToCard(currentCardIndex - 1));
nextCardBtn.addEventListener('click', () => goToCard(currentCardIndex + 1));

// Swipe support for mobile
let touchStartX = 0;
flipCard.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
flipCard.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
        goToCard(dx < 0 ? currentCardIndex + 1 : currentCardIndex - 1);
    }
}, { passive: true });

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    buildDots();
    applyCardContent(0);
});
