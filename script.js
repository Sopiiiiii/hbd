// Global Variables
let clickCount = 0;
const maxClicks = 3;
let interactionCount = 0;
let isTypingComplete = false; // Flag untuk mengecek apakah typing selesai

// Comprehensive rendering tracking
let renderingStatus = {
    pageLoaded: false,
    cssLoaded: false,
    fontsLoaded: false,
    imagesLoaded: false,
    animationsReady: false,
    hintTypingComplete: false,
    allElementsVisible: false
};

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
        // showFloatingMessage(`Wah! ${interactionCount} interaksi! 🎉`);
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
function typeText(element, text, speed = 50, callback = null) {
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
            // Panggil callback jika ada (untuk menandai typing selesai)
            if (callback) callback();
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
    const openButton = document.getElementById('openButton');

    if (!hintText) return;

    // Disable button saat typing dimulai
    isTypingComplete = false;
    if (openButton) {
        openButton.disabled = true;
        openButton.style.opacity = '0.5';
        openButton.style.cursor = 'not-allowed';
        openButton.style.pointerEvents = 'none';
    }

    // Use typing effect for hint dengan callback
    typeText(hintText, hints[clickCount], 80, () => {
        // Callback dipanggil saat typing selesai
        isTypingComplete = true;
        updateRenderingStatus('hintTypingComplete', true);
    });

    if (clickCount < maxClicks - 1) {
        // Add shake effect to button setelah typing selesai
        setTimeout(() => {
            if (openButton && isTypingComplete) {
                openButton.classList.add('shake');
                setTimeout(() => {
                    openButton.classList.remove('shake');
                }, 500);
            }
        }, hints[clickCount].length * 80 + 200); // Delay berdasarkan panjang teks
    }
}

// Check if all rendering is complete
function isAllRenderingComplete() {
    return Object.values(renderingStatus).every(status => status === true);
}

// Update rendering status and check button availability
function updateRenderingStatus(key, value) {
    renderingStatus[key] = value;

    const openButton = document.getElementById('openButton');
    if (!openButton) return;

    if (isAllRenderingComplete()) {
        // Semua sudah selesai render
        openButton.disabled = false;
        openButton.style.opacity = '1';
        openButton.style.cursor = 'pointer';
        openButton.style.pointerEvents = 'auto';

        // Tambahkan efek ready glow
        openButton.classList.add('ready-glow');
        setTimeout(() => {
            openButton.classList.remove('ready-glow');
        }, 1500);

        // showFloatingMessage("Semua siap! Tombol bisa diklik! ✨");
    } else {
        // Masih ada yang belum selesai
        openButton.disabled = true;
        openButton.style.opacity = '0.5';
        openButton.style.cursor = 'not-allowed';
        openButton.style.pointerEvents = 'none';
    }

    // Update progress indicator
    updateProgressIndicator();
}

// Create progress indicator
function updateProgressIndicator() {
    const completedCount = Object.values(renderingStatus).filter(status => status === true).length;
    const totalCount = Object.keys(renderingStatus).length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    // Update progress bar if exists
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }

    // Show loading message
    if (percentage < 100) {
        const loadingMessages = [
            "Memuat halaman... 📄",
            "Memuat font... 🔤",
            "Memuat gambar... 🖼️",
            "Menyiapkan animasi... 🎭",
            "Mengetik teks... ⌨️",
            "Menampilkan elemen... 👁️",
            "Hampir selesai... ⏳"
        ];

        const messageIndex = Math.min(Math.floor(completedCount), loadingMessages.length - 1);

        // Update loading indicator
        let loadingIndicator = document.getElementById('loadingIndicator');
        if (!loadingIndicator) {
            loadingIndicator = document.createElement('div');
            loadingIndicator.id = 'loadingIndicator';
            loadingIndicator.style.position = 'fixed';
            loadingIndicator.style.top = '50%';
            loadingIndicator.style.left = '50%';
            loadingIndicator.style.transform = 'translate(-50%, -50%)';
            loadingIndicator.style.background = 'rgba(255, 255, 255, 0.95)';
            loadingIndicator.style.padding = '20px 30px';
            loadingIndicator.style.borderRadius = '15px';
            loadingIndicator.style.fontFamily = "'Poppins', sans-serif";
            loadingIndicator.style.fontSize = '1.1em';
            loadingIndicator.style.color = '#ff6b9d';
            loadingIndicator.style.zIndex = '2000';
            loadingIndicator.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            loadingIndicator.style.textAlign = 'center';
            loadingIndicator.style.border = '2px solid rgba(255, 107, 157, 0.3)';
            document.body.appendChild(loadingIndicator);
        }

        loadingIndicator.innerHTML = `
            <div style="margin-bottom: 10px;">${loadingMessages[messageIndex]}</div>
            <div style="font-size: 0.9em; color: #666;">Loading... ${percentage}%</div>
            <div style="width: 200px; height: 6px; background: #f0f0f0; border-radius: 3px; margin: 10px auto; overflow: hidden;">
                <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #ff6b9d, #ffd93d); border-radius: 3px; transition: width 0.3s ease;"></div>
            </div>
        `;
    } else {
        // Remove loading indicator when complete
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.opacity = '0';
            setTimeout(() => {
                if (loadingIndicator.parentNode) {
                    loadingIndicator.parentNode.removeChild(loadingIndicator);
                }
            }, 500);
        }
    }
}

// Handle button click
function handleButtonClick(event) {
    // Cek apakah semua rendering sudah selesai
    if (!isAllRenderingComplete()) {
        // Jika belum semua selesai, tampilkan pesan detail
        const incompleteItems = Object.entries(renderingStatus)
            .filter(([key, value]) => !value)
            .map(([key]) => key);

        const messages = {
            pageLoaded: "Halaman masih loading... 📄",
            cssLoaded: "Style masih dimuat... 🎨",
            fontsLoaded: "Font masih dimuat... 🔤",
            imagesLoaded: "Gambar masih dimuat... 🖼️",
            animationsReady: "Animasi masih disiapkan... 🎭",
            hintTypingComplete: "Teks masih diketik... ⌨️",
            allElementsVisible: "Elemen masih ditampilkan... 👁️"
        };

        const firstIncomplete = incompleteItems[0];
        const message = messages[firstIncomplete] || "Masih loading... ⏳";

        // showFloatingMessage(message);
        createSparkle(event.clientX, event.clientY);
        return;
    }

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

        // Show encouraging messages
        const encouragingMessages = [
            "Ayo lagi! 😄",
            "Hampir sampai! 🎯",
            "Satu lagi ya! 🌟"
        ];
        // showFloatingMessage(encouragingMessages[clickCount - 1]);
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
    // showFloatingMessage("Selamat! Kartu terbuka! 🎉");

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
                typeText(mainTitle, 'SELAMAT ULANG TAHUN SOPI!', 100);
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
            // showFloatingMessage(cuteMessages[Math.floor(Math.random() * cuteMessages.length)]);
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
            // showFloatingMessage(`Tahun ${years[index] || '2024'} dipilih! ⏰`);
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
            // showFloatingMessage("Klik tombolnya! 😊");
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
    document.addEventListener('click', function (e) {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
            // Double click detected
            createConfetti();
            // showFloatingMessage("Surprise! Double click! 🎊");
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

// Check if fonts are loaded
function checkFontsLoaded() {
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            updateRenderingStatus('fontsLoaded', true);
        });
    } else {
        // Fallback for older browsers
        setTimeout(() => {
            updateRenderingStatus('fontsLoaded', true);
        }, 2000);
    }
}

// Check if images are loaded
function checkImagesLoaded() {
    const images = document.querySelectorAll('img');
    if (images.length === 0) {
        updateRenderingStatus('imagesLoaded', true);
        return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    updateRenderingStatus('imagesLoaded', true);
                }
            });
            img.addEventListener('error', () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    updateRenderingStatus('imagesLoaded', true);
                }
            });
        }
    });

    if (loadedCount === totalImages) {
        updateRenderingStatus('imagesLoaded', true);
    }
}

// Check if CSS is loaded
function checkCSSLoaded() {
    // Check if stylesheets are loaded
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    let loadedCount = 0;

    if (stylesheets.length === 0) {
        updateRenderingStatus('cssLoaded', true);
        return;
    }

    stylesheets.forEach(link => {
        if (link.sheet) {
            loadedCount++;
        } else {
            link.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === stylesheets.length) {
                    updateRenderingStatus('cssLoaded', true);
                }
            });
        }
    });

    if (loadedCount === stylesheets.length) {
        updateRenderingStatus('cssLoaded', true);
    }
}

// Check if animations are ready
function checkAnimationsReady() {
    // Wait for CSS animations to be applied
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.cute-icon, .envelope-flap, .birthday-icon');
        let readyCount = 0;

        animatedElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.animationName !== 'none' || computedStyle.transform !== 'none') {
                readyCount++;
            }
        });

        updateRenderingStatus('animationsReady', true);
    }, 1000);
}

// Check if all elements are visible
function checkAllElementsVisible() {
    const criticalElements = [
        '.envelope-container',
        '.hint-text',
        '.open-button',
        '.cute-icon',
        '.envelope-stamp'
    ];

    let visibleCount = 0;

    criticalElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);

            if (rect.width > 0 && rect.height > 0 && style.opacity !== '0' && style.visibility !== 'hidden') {
                visibleCount++;
            }
        }
    });

    if (visibleCount === criticalElements.length) {
        updateRenderingStatus('allElementsVisible', true);
    } else {
        // Recheck after a short delay
        setTimeout(checkAllElementsVisible, 200);
    }
}

// Initialize everything when page loads
window.addEventListener('load', function () {
    // Mark page as loaded
    updateRenderingStatus('pageLoaded', true);

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
        // showFloatingMessage("Memulai loading... 🚀");

        // Initialize all components
        createProgressBar();
        setupEnvelopeEffects();
        setupCursorEffects();
        setupEasterEgg();

        // Setup button click handler
        const openButton = document.getElementById('openButton');
        if (openButton) {
            openButton.onclick = handleButtonClick;

            // Initially disable button
            openButton.disabled = true;
            openButton.style.opacity = '0.5';
            openButton.style.cursor = 'not-allowed';
            openButton.style.pointerEvents = 'none';
        }

        // Start checking all rendering components
        checkCSSLoaded();
        checkFontsLoaded();
        checkImagesLoaded();
        checkAnimationsReady();
        checkAllElementsVisible();

        // Start typing hint after a delay
        setTimeout(() => {
            const hintText = document.getElementById('hintText');
            if (hintText) {
                typeText(hintText, hints[0], 80, () => {
                    isTypingComplete = true;
                    updateRenderingStatus('hintTypingComplete', true);
                });
            }
        }, 2000);

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
    
    .ready-glow {
        box-shadow: 0 0 25px rgba(76, 175, 80, 0.8) !important;
        animation: ready-pulse 1s ease-in-out !important;
    }
    
    @keyframes ready-pulse {
        0%, 100% { 
            box-shadow: 0 0 25px rgba(76, 175, 80, 0.8);
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 35px rgba(76, 175, 80, 1);
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(style);