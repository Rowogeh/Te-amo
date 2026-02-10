# Script to generate standalone.html with embedded photos

# Read the photos.txt file
with open('photos.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Parse the base64 strings
photos = {}
for line in lines:
    if line.strip() and ':' in line:
        parts = line.split(':', 1)
        photo_name = parts[0].strip()
        base64_data = parts[1].strip()
        photos[photo_name] = base64_data

# Read the template HTML
with open('standalone.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Create the photo pool JavaScript array
photo_pool_js = "const photoPool = [\n"
for i in range(1, 27):
    photo_key = f"photo{i}"
    if photo_key in photos:
        photo_pool_js += f"    '{photos[photo_key]}',\n"
photo_pool_js += "];\n"

# Create the updated JavaScript section
js_section = """
    <script>
        """ + photo_pool_js + """
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
            '#ff1493', '#ff69b4', '#ffc0cb', '#ff6b9d', '#ffb6c1', '#ff1744',
            '#f50057', '#ff4081', '#ffd700', '#ffb347', '#ff6347', '#ff8c00',
            '#ffa500', '#ffff00', '#ffeb3b', '#ffd54f'
        ];

        // Falling Petals Animation
        const fallingPetalsContainer = document.getElementById('fallingPetals');

        function createFallingPetal() {
            const petal = document.createElement('div');
            petal.className = 'falling-petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const size = 6 + Math.random() * 8;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            
            const duration = 8 + Math.random() * 8;
            petal.style.animationDuration = duration + 's';
            petal.style.animationDelay = Math.random() * 5 + 's';
            
            fallingPetalsContainer.appendChild(petal);
            
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
    </script>
"""

# Find and replace the script section
import re
script_pattern = r'<script>.*?</script>'
html_content = re.sub(script_pattern, js_section, html_content, flags=re.DOTALL)

# Write the updated HTML
with open('standalone_with_photos.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✓ Generated standalone_with_photos.html successfully!")
print(f"✓ Embedded {len(photos)} photos")
print("✓ File size: ~" + str(len(html_content) // 1024 // 1024) + " MB")
