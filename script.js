// Global Variables
let clickCount = 0;
const maxClicks = 3;
let interactionCount = 0;
const hints = [
    "Klik tombolnya dong! 😊",
    "Hehe, coba lagi! 😄",
    "Satu lagi nih! 😉",
    "Yeay! Berhasil! 🎉"
];

// Update interaction counter
function updateInteractionCounter() {
    interactionCount++;
    const counterElement = document.getElementById('interactionCount');
    if (counterElement) {
        counterElement.textContent = interactionCount;
    }
    
    // Add celebration effect every 5 interactions
    if (interactionCount % 5 === 0) {
        const counterContainer = document.getElementById('interactionCounter');
        if (counterContainer) {
            counterContainer.classList.add('celebration-mode');
            setTimeout(() => {
                counterContainer.classList.remove('celebration-mode');
            }, 600);
        }
        showFloatingMessage(`Wah! ${interactionCount} interaksi! 🎉`);
    }
}

// Show floating message
function showFloatingMessage(message) {
    const floatingMsg = document.createElement('div');
    floatingMsg.className = 'floating-message';
    floatingMsg.textContent = message;
    floatingMsg.style.position = 'fixed';
    floatingMsg.style.top = '20px';
    floatingMsg.style.right = '20px';
    floatingMsg.style.background = 'rgba(255, 107, 157, 0.9)';
    floatingMsg.style.color = 'white';
    floatingMsg.style.padding = '10px 20px';
    floatingMsg.style.borderRadius = '25px';
    floatingMsg.style.fontFamily = "'Poppins', sans-serif";
    floatingMsg.style.fontSize = '0.9em';
    floatingMsg.style.zIndex = '1000';
    floatingMsg.style.animation = 'float-in 0.5s ease-out, float-out 0.5s ease-out 2.5s forwards';
    
    document.body.appendChild(floatingMsg);
    
    setTimeout(() => {
        if (floatingMsg.parentNode) {
            floatingMsg.parentNode.removeChild(floatingMsg);
        }
    }, 3000);
}

// Create sound wave effect
function createSoundWave(x, y) {
    const wave = document.createElement('div');
    wave.className = 'sound-wave';
    wave.style.left = (x - 10) + 'px';
    wave.style.top = (y - 10) + 'px';
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (wave.parentNode) {
            wave.parentNode.removeChild(wave);
        }
    }, 1000);
}

// Typing effect for text
function typeText(element, text, speed = 50) {
    element.textContent = '';
    element.classList.add('typing-text');
    let i = 0;
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            element.classList.remove('typing-text');
        }
    }, speed);
}

// Create floating hearts background (hanya setelah amplop dibuka)
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    if (!heartsContainer) return;
    
    const heartEmojis = ['💕', '💖', '💗', '🌸'];

    const heartInterval = setInterval(() => {
        // Hanya buat 1 heart setiap 2 detik
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = '0s';
        heart.style.animationDuration = '8s';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }, 2000);

    // Stop after 30 seconds
    setTimeout(() => {
        clearInterval(heartInterval);
    }, 30000);
}

// Create confetti effect
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    if (!confettiContainer) return;
    
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4d9de0', '#e15554', '#f9844a'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confettiPiece = document.createElement('div');
            confettiPiece.className = 'confetti-piece';
            confettiPiece.style.left = Math.random() * 100 + '%';
            confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiPiece.style.animationDelay = Math.random() * 2 + 's';
            confettiPiece.style.animationDuration = (Math.random() * 2 + 2) + 's';

            confettiContainer.appendChild(confettiPiece);

            // Remove confetti after animation
            setTimeout(() => {
                if (confettiPiece.parentNode) {
                    confettiPiece.parentNode.removeChild(confettiPiece);
                }
            }, 4000);
        }, i * 50);
    }
}

// Create sparkle effect on click
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Update hint text
function updateHint() {
    const hintText = document.getElementById('hintText');
    if (!hintText) return;
    
    // Use typing effect for hint
    typeText(hintText, hints[clickCount], 80);

    if (clickCount < maxClicks - 1) {
        // Add shake effect to button
        const openButton = document.getElementById('openButton');
        if (openButton) {
            openButton.classList.add('shake');
            setTimeout(() => {
                openButton.classList.remove('shake');
            }, 500);
        }
    }
}

// Handle button click
function handleButtonClick(event) {
    clickCount++;
    updateInteractionCounter();

    // Create sparkle and sound wave effect at button position
    const rect = event.target.getBoundingClientRect();
    createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    createSoundWave(rect.left + rect.width / 2, rect.top + rect.height / 2);

    if (clickCount < maxClicks) {
        updateHint();

        // Ganti icon yang lucu dengan efek bounce
        const cuteIcon = document.querySelector('.cute-icon');
        if (cuteIcon) {
            const icons = ['🎁', '🎈', '🎉', '🎂'];
            cuteIcon.textContent = icons[clickCount % icons.length];
            cuteIcon.style.animation = 'bounce 0.6s ease-in-out';

            // Reset animation
            setTimeout(() => {
                cuteIcon.style.animation = 'wiggle 2s ease-in-out infinite';
            }, 600);
        }

        // Add glow effect to button
        const openButton = document.getElementById('openButton');
        if (openButton) {
            openButton.classList.add('glow');
            setTimeout(() => {
                openButton.classList.remove('glow');
            }, 2000);
        }

        // Show encouraging messages
        const encouragingMessages = [
            "Ayo lagi! 😄",
            "Hampir sampai! 🎯",
            "Satu lagi ya! 🌟"
        ];
        showFloatingMessage(encouragingMessages[clickCount - 1]);
    } else {
        openEnvelope();
    }
}

// Open envelope function
function openEnvelope() {
    const envelopeContainer = document.getElementById('envelopeContainer');
    const birthdayCard = document.getElementById('birthdayCard');
    
    if (!envelopeContainer || !birthdayCard) return;

    // Update hint terakhir
    updateHint();

    // Animasi buka amplop
    envelopeContainer.classList.add('opening');

    // Create confetti when opening
    createConfetti();
    showFloatingMessage("Selamat! Kartu terbuka! 🎉");

    // MULAI floating hearts setelah amplop dibuka
    setTimeout(() => {
        createFloatingHearts();
    }, 1500);

    // Setelah 1 detik, sembunyikan amplop dan tampilkan kartu
    setTimeout(() => {
        envelopeContainer.classList.add('opened');
        birthdayCard.classList.add('show');

        // Type the main title with effect
        setTimeout(() => {
            const mainTitle = document.querySelector('.main-title');
            if (mainTitle) {
                typeText(mainTitle, 'SELAMAT ULANG TAHUN!', 100);
            }
        }, 800);

        // Add interactive effects to wish items
        setTimeout(() => {
            addWishItemEffects();
            startMemorableAnimations();
        }, 1500);
    }, 1000);
}

// Add interactive effects to wish items
function addWishItemEffects() {
    const wishItems = document.querySelectorAll('.wish-story, .wish-interactive, .wish-memory, .wish-animated, .wish-garden, .wish-treasure, .wish-timemachine, .wish-energy');
    
    wishItems.forEach((item, index) => {
        item.addEventListener('click', function (e) {
            updateInteractionCounter();
            
            // Create sparkle and sound wave effect
            const rect = this.getBoundingClientRect();
            createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
            createSoundWave(rect.left + rect.width / 2, rect.top + rect.height / 2);

            // Add temporary glow effect
            this.style.boxShadow = '0 0 20px rgba(255, 107, 157, 0.6)';
            this.classList.add('celebration-mode');
            
            setTimeout(() => {
                this.style.boxShadow = '';
                this.classList.remove('celebration-mode');
            }, 1000);

            // Show random cute messages
            const cuteMessages = [
                "Aww, manis sekali! 💕",
                "Doa yang indah! 🙏",
                "Semoga terkabul ya! ✨",
                "Aamiin! 🤲",
                "So sweet! 🥰",
                "Barakallahu! 🌟",
                "Terharu banget! 😭",
                "Bikin senyum-senyum! 😊"
            ];
            showFloatingMessage(cuteMessages[Math.floor(Math.random() * cuteMessages.length)]);
        });

        // Staggered animation entrance
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

// Start memorable animations
function startMemorableAnimations() {
    // Animate day cycle
    animateDayCycle();
    
    // Animate strength bars
    animateStrengthBars();
    
    // Start time machine effect
    startTimeMachine();
}

// Animate day cycle
function animateDayCycle() {
    const dayItems = document.querySelectorAll('.day-item');
    if (dayItems.length === 0) return;
    
    let currentDay = 0;
    
    setInterval(() => {
        dayItems.forEach(item => item.classList.remove('active'));
        dayItems[currentDay].classList.add('active');
        currentDay = (currentDay + 1) % dayItems.length;
    }, 1500);
}

// Animate strength bars
function animateStrengthBars() {
    const strengthFill = document.querySelector('.strength-fill');
    const wisdomFill = document.querySelector('.wisdom-fill');
    const spiritFill = document.querySelector('.spirit-fill');
    
    if (strengthFill) {
        setTimeout(() => {
            strengthFill.style.width = '95%';
        }, 500);
    }
    
    if (wisdomFill) {
        setTimeout(() => {
            wisdomFill.style.width = '88%';
        }, 1000);
    }
    
    if (spiritFill) {
        setTimeout(() => {
            spiritFill.style.width = '100%';
        }, 1500);
    }
}

// Start time machine effect
function startTimeMachine() {
    const timeButtons = document.querySelectorAll('.time-btn');
    
    timeButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            timeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const yearDisplay = document.querySelector('.year-number');
            if (yearDisplay) {
                const years = ['2023', '2024', '2025'];
                yearDisplay.textContent = years[index] || '2024';
            }
            
            createSparkle(btn.getBoundingClientRect().left + 25, btn.getBoundingClientRect().top + 25);
            showFloatingMessage(`Tahun ${years[index] || '2024'} dipilih! ⏰`);
        });
    });
}

// Enhanced hover effects for envelope
function setupEnvelopeEffects() {
    const envelopeContainer = document.getElementById('envelopeContainer');
    if (!envelopeContainer) return;
    
    envelopeContainer.addEventListener('mouseenter', function () {
        if (!this.classList.contains('opening')) {
            this.style.transform = 'scale(1.02) rotate(1deg)';
            this.style.filter = 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.2))';
            updateInteractionCounter();
            showFloatingMessage("Klik tombolnya! 😊");
        }
    });

    envelopeContainer.addEventListener('mouseleave', function () {
        if (!this.classList.contains('opening')) {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))';
        }
    });
}

// Add cute cursor trail effect
function setupCursorEffects() {
    let mouseTrail = [];
    document.addEventListener('mousemove', function (e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        // Keep only recent trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);

        // Occasionally create a small sparkle
        if (Math.random() < 0.01) {
            createSparkle(e.clientX, e.clientY);
        }
    });
}

// Easter egg: Double click anywhere for surprise
function setupEasterEgg() {
    let clickTimeout;
    document.addEventListener('click', function(e) {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
            // Double click detected
            createConfetti();
            showFloatingMessage("Surprise! Double click! 🎊");
            updateInteractionCounter();
        } else {
            clickTimeout = setTimeout(() => {
                clickTimeout = null;
            }, 300);
        }
    });
}

// Add age number with special effect
function addAgeNumber() {
    setTimeout(() => {
        const ageNumber = document.createElement('div');
        ageNumber.className = 'age-number';
        ageNumber.textContent = '23';
        ageNumber.style.fontSize = '3em';
        ageNumber.style.fontWeight = '300';
        ageNumber.style.color = '#495057';
        ageNumber.style.margin = '20px 0';
        ageNumber.style.background = 'linear-gradient(45deg, #ff6b9d, #ffd93d)';
        ageNumber.style.webkitBackgroundClip = 'text';
        ageNumber.style.webkitTextFillColor = 'transparent';
        ageNumber.style.backgroundClip = 'text';

        const cardContent = document.querySelector('.card-content');
        const mainTitle = document.querySelector('.main-title');
        if (cardContent && mainTitle) {
            cardContent.insertBefore(ageNumber, mainTitle);
        }
    }, 2000);
}

// Create interaction counter
function createInteractionCounter() {
    const counterDiv = document.createElement('div');
    counterDiv.id = 'interactionCounter';
    counterDiv.style.position = 'fixed';
    counterDiv.style.bottom = '20px';
    counterDiv.style.left = '20px';
    counterDiv.style.background = 'rgba(255, 255, 255, 0.9)';
    counterDiv.style.padding = '10px 15px';
    counterDiv.style.borderRadius = '20px';
    counterDiv.style.fontFamily = "'Poppins', sans-serif";
    counterDiv.style.fontSize = '0.8em';
    counterDiv.style.color = '#ff6b9d';
    counterDiv.style.zIndex = '1000';
    counterDiv.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    
    counterDiv.innerHTML = '✨ Interaksi: <span id="interactionCount">0</span>';
    document.body.appendChild(counterDiv);
}

// Create progress bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.background = 'linear-gradient(90deg, #ff6b9d, #ffd93d, #6bcf7f)';
    progressBar.style.zIndex = '1000';
    progressBar.style.width = '0%';
    progressBar.style.animation = 'progress-load 3s ease-out forwards';
    
    document.body.appendChild(progressBar);
    
    // Hide progress bar after loading
    setTimeout(() => {
        progressBar.style.opacity = '0';
        setTimeout(() => {
            progressBar.style.display = 'none';
        }, 500);
    }, 3000);
}

// Initialize everything when page loads
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
        showFloatingMessage("Selamat datang! 🎉");
        
        // Initialize all components
        createInteractionCounter();
        createProgressBar();
        setupEnvelopeEffects();
        setupCursorEffects();
        setupEasterEgg();
        addAgeNumber();
        
        // Setup button click handler
        const openButton = document.getElementById('openButton');
        if (openButton) {
            openButton.onclick = handleButtonClick;
        }
    }, 100);
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes progress-load {
        0% { width: 0%; }
        100% { width: 100%; }
    }
    
    @keyframes float-in {
        0% { transform: translateX(100px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes float-out {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);