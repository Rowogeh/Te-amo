# Romantic Love Countdown Webpage 💕

A beautiful, mobile-optimized romantic webpage featuring a photo collage, Spanish love message, and live countdown timer.

## Features

- 📱 **Mobile-First Responsive Design** - Optimized for mobile devices
- 🖼️ **Photo Collage** - Display 6 photos in a creative grid layout
- 🎲 **Random Photo Selection** - Randomly picks 6 photos from your pool each time
- 💌 **Customizable Love Message** - Spanish text that's easy to edit
- ⏱️ **Live Countdown Timer** - Shows days, hours, minutes, seconds since your special date
- 🎵 **Background Music** - Auto-plays your favorite song with toggle control
- 🌺 **Falling Petal Animations** - Beautiful background effects
- 🎨 **Premium Design** - Soft gradients and smooth animations

## How to Add Your Photos

The webpage uses a **photo pool system** that randomly selects 6 photos each time you open it!

### Option 1: Photo Pool (Recommended - Random Selection)

1. Add as many photos as you want to the `love-countdown` folder (e.g., `photo1.jpg`, `photo2.jpg`, ... `photo20.jpg`)
2. Open `script.js` and update the `photoPool` array with your photo filenames:
   ```javascript
   const photoPool = [
       'photo1.jpg',
       'photo2.jpg',
       'photo3.jpg',
       // ... add all your photos here
       'photo20.jpg',
   ];
   ```
3. Refresh the page - 6 random photos will be selected and displayed!
4. Each time you reload, you'll see a different random selection

### Option 2: Fixed Photos (Always Show Same 6)

If you prefer to always show the same 6 photos:
1. Add exactly 6 photos named `photo1.jpg` through `photo6.jpg`
2. Don't modify the `photoPool` array in `script.js`
3. The same 6 photos will appear every time

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.webp`

**Recommended:** Square photos (1:1 aspect ratio) work best, but any size will be cropped to fit.

## How to Add Background Music

1. Add your music file to the `love-countdown` folder
2. Name it `song.mp3` (or `song.ogg` for better browser compatibility)
3. Refresh the page - the music will try to auto-play!

**Note:** Most browsers block auto-play. If the music doesn't start automatically, click the 🎵 button in the bottom-right corner to play/pause.

**Supported formats:** `.mp3`, `.ogg`, `.wav`


## How to Edit the Love Message

Open `index.html` and find lines 21-31. Edit the Spanish text between the `<p class="message-text">` tags:

```html
<p class="message-text">
    Para el amor de mi vida:<br><br>
    <!-- Your custom message here -->
</p>
```

## How to Change the Countdown Date

Open `script.js` and edit line 2:

```javascript
const startDate = new Date('2025-12-11T00:00:00').getTime();
```

Change `2025-12-11` to your desired date (format: `YYYY-MM-DD`).

## Files

- `index.html` - Main webpage structure
- `style.css` - Styling and animations
- `script.js` - Countdown timer and animations
- `README.md` - This file

## Viewing the Webpage

Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

---

Made with ❤️ for mobile devices
