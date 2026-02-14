// Valentine's Day Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initFloatingHearts();
    initCardFlips();
    initSurpriseButton();
    initModal();
    initImageModal();
});

// Floating Hearts Animation
function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞', '🌹', '✨'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random properties
        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 2;
        
        heart.style.cssText = `
            left: ${left}%;
            font-size: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 300);
    }
    
    // Continuously create new hearts
    setInterval(createHeart, 800);
}

// Card Flip Animation
function initCardFlips() {
    const cards = document.querySelectorAll('.valentine-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
            
            // Add sparkle effect when flipping
            if (this.classList.contains('flipped')) {
                createSparkles(this);
            }
        });
    });
}

// Create sparkle effect around element
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '💫', '⭐'];
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: ${Math.random() * 15 + 15}px;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add sparkle animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 50}px, -50px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Surprise Button
function initSurpriseButton() {
    const btn = document.getElementById('surpriseBtn');
    
    btn.addEventListener('click', function() {
        // Create heart explosion
        createHeartExplosion(this);
        
        // Show modal after brief delay
        setTimeout(() => {
            document.getElementById('surpriseModal').classList.add('active');
        }, 500);
    });
}

// Heart explosion effect
function createHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const angle = (i / 20) * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const endX = Math.cos(angle) * velocity;
        const endY = Math.sin(angle) * velocity;
        
        heart.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: ${Math.random() * 15 + 20}px;
            pointer-events: none;
            z-index: 1000;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 1;
        `;
        
        document.body.appendChild(heart);
        
        // Trigger animation
        requestAnimationFrame(() => {
            heart.style.transform = `translate(${endX}px, ${endY}px)`;
            heart.style.opacity = '0';
        });
        
        setTimeout(() => heart.remove(), 800);
    }
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('surpriseModal');
    const closeBtn = document.getElementById('closeModal');
    
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Image Modal functionality
function initImageModal() {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeImageBtn = document.getElementById('closeImageModal');
    const cardPhotos = document.querySelectorAll('.card-photo');
    
    // Open image modal when clicking on card photos
    cardPhotos.forEach(photo => {
        photo.style.cursor = 'pointer';
        photo.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card flip
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            imageModal.classList.add('active');
        });
    });
    
    // Close image modal
    closeImageBtn.addEventListener('click', function() {
        imageModal.classList.remove('active');
    });
    
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            imageModal.classList.remove('active');
        }
    });
}

// Easter egg: Konami code for extra hearts
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger massive heart explosion!
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const fakeElement = {
                    getBoundingClientRect: () => ({
                        left: Math.random() * window.innerWidth,
                        top: Math.random() * window.innerHeight,
                        width: 0,
                        height: 0
                    })
                };
                createHeartExplosion(fakeElement);
            }, i * 200);
        }
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function(e) {
    // Create a small heart at touch position
    const touch = e.touches[0];
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.cssText = `
        position: fixed;
        left: ${touch.clientX}px;
        top: ${touch.clientY}px;
        font-size: 25px;
        pointer-events: none;
        z-index: 1000;
        animation: touchHeart 1s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
});

// Add touch heart animation
const touchStyle = document.createElement('style');
touchStyle.textContent = `
    @keyframes touchHeart {
        0% {
            opacity: 1;
            transform: scale(0) translateY(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) translateY(-20px);
        }
        100% {
            opacity: 0;
            transform: scale(1) translateY(-50px);
        }
    }
`;
document.head.appendChild(touchStyle);

// Console love message for developers
console.log('%c💕 Happy Valentine\'s Day! 💕', 'font-size: 24px; color: #e74c8c;');
console.log('%cMade with love for my cousin and sister', 'font-size: 14px; color: #b85c8a;');
