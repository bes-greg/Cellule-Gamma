const lenis = new Lenis({
    duration: 1.2,
    smoothWaveform: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const header = document.querySelector('header');
const mainContainer = document.getElementById('main-viewer');
const viewer = document.querySelector('main .viewer');
const viewerText = document.querySelector('main .viewer .text');
const kepler = document.querySelector('.kepler');
const parts = document.querySelectorAll('main .viewer .parts');
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

const DESKTOP_CONFIG = {
    startScroll: 90,
    startScrollCenter: 350,
    fadeStart: 600,
    fadeEnd: 800,
    zoomTriggerPoint: 820,
    baseZoomSpeed: 1.2,
    fillingSpeed: 2.5,
    mouseEase: 0.05
};

const MOBILE_CONFIG = {
    startScroll: 40,
    startScrollCenter: 150,
    fadeStart: 250,
    fadeEnd: 400,
    zoomTriggerPoint: 420,
    baseZoomSpeed: 2.2,
    fillingSpeed: 4.5,
    mouseEase: 0.05
};

let CONFIG = window.innerWidth <= 650 ? MOBILE_CONFIG : DESKTOP_CONFIG;

window.addEventListener('resize', () => {
    CONFIG = window.innerWidth <= 650 ? MOBILE_CONFIG : DESKTOP_CONFIG;
});

let latestScrollY = 0;
let currentX = 0, currentY = 0;
let targetX = 0, targetY = 0;
let currentPercentage = 0;
let currentPercentageCenter = 0;
let currentZoomProgress = 0;
let hasFinishedZoom = false;
let isResetting = false;
let isScrollLockedAtTop = false;

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

function skipIntroAnimation() {
    hasFinishedZoom = true;
    currentZoomProgress = 100;
    isScrollLockedAtTop = false;

    if (viewer) {
        if (viewerText) viewerText.style.opacity = '0';
        viewer.classList.add('hidden-view');
        viewer.style.setProperty('--zoom-progress', '1');
        viewer.style.setProperty('--zoom-scale', '10');
    }
    if (mainContainer) {
        mainContainer.classList.add('fully-zoomed-cleanup');
    }
    if (heroContent) {
        heroContent.classList.add('visible');
    }
    if (kepler) {
        kepler.style.opacity = '0';
        kepler.style.visibility = 'hidden';
    }
    if (parts[0] && parts[1] && parts[2]) {
        parts[0].style.backgroundImage = 'linear-gradient(to top, var(--c-black) 100%, transparent 100%)';
        parts[1].style.backgroundImage = 'linear-gradient(to top, var(--c-black) 100%, transparent 100%)';
        parts[2].style.backgroundImage = 'linear-gradient(to top, var(--c-black) 100%, transparent 100%)';
    }
}

window.addEventListener('wheel', (e) => {
    if (window.scrollY === 0 && hasFinishedZoom && e.deltaY < 0 && !isResetting) {
        if (!isScrollLockedAtTop) {
            e.preventDefault();
            isScrollLockedAtTop = true;

            if (heroContent) {
                heroContent.classList.remove('visible');
            }

            if (hero) {
                hero.classList.add('fade-out');
            }

            setTimeout(() => {
                hasFinishedZoom = false;
                isScrollLockedAtTop = false;
                currentZoomProgress = 0;
                currentPercentage = 0;
                currentPercentageCenter = 0;

                if (mainContainer) {
                    mainContainer.classList.remove('fully-zoomed-cleanup');
                }

                if (viewer) {
                    viewer.classList.remove('hidden-view');
                    viewer.classList.add('fade-in-view');
                    viewer.style.setProperty('--zoom-progress', '0');
                    viewer.style.setProperty('--zoom-scale', '1');
                    if (viewerText) viewerText.style.opacity = '1';
                }

                if (parts[0] && parts[1] && parts[2]) {
                    parts[0].style.backgroundImage = 'none';
                    parts[1].style.backgroundImage = 'none';
                    parts[2].style.backgroundImage = 'none';
                }

                if (kepler) {
                    kepler.style.opacity = '1';
                    kepler.style.visibility = 'visible';
                    kepler.style.transform = `translate(-50%, 45%)`;
                }

                window.scrollTo(0, 0);
                lenis.scrollTo(0, {immediate: true});
                latestScrollY = 0;

                setTimeout(() => {
                    if (hero) {
                        hero.classList.remove('fade-out');
                    }
                }, 50);
            }, 400);
        } else {
            isScrollLockedAtTop = false;
        }
    }
}, {passive: false});

let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, {passive: true});

window.addEventListener('touchmove', (e) => {
    const touchMoveY = e.touches[0].clientY;
    const isScrollingUp = touchMoveY > touchStartY;

    if (window.scrollY === 0 && hasFinishedZoom && isScrollingUp && !isResetting) {
        if (!isScrollLockedAtTop) {
            e.preventDefault();
            isScrollLockedAtTop = true;

            if (heroContent) heroContent.classList.remove('visible');
            if (hero) hero.classList.add('fade-out');

            setTimeout(() => {
                hasFinishedZoom = false;
                isScrollLockedAtTop = false;
                currentZoomProgress = 0;
                currentPercentage = 0;
                currentPercentageCenter = 0;

                if (mainContainer) {
                    mainContainer.classList.remove('fully-zoomed-cleanup');
                }

                if (viewer) {
                    viewer.classList.remove('hidden-view');
                    viewer.classList.add('fade-in-view');
                    viewer.style.setProperty('--zoom-progress', '0');
                    viewer.style.setProperty('--zoom-scale', '1');
                    if (viewerText) viewerText.style.opacity = '1';
                }

                if (parts[0] && parts[1] && parts[2]) {
                    parts[0].style.backgroundImage = 'none';
                    parts[1].style.backgroundImage = 'none';
                    parts[2].style.backgroundImage = 'none';
                }

                if (kepler) {
                    kepler.style.opacity = '1';
                    kepler.style.visibility = 'visible';
                    kepler.style.transform = `translate(-50%, 45%)`;
                }

                window.scrollTo(0, 0);
                lenis.scrollTo(0, {immediate: true});
                latestScrollY = 0;

                setTimeout(() => {
                    if (hero) {
                        hero.classList.remove('fade-out');
                    }
                }, 50);
            }, 400);
        }
    }
}, {passive: false});

lenis.on('scroll', (e) => {
    if (isResetting) return;
    latestScrollY = window.scrollY;

    if (latestScrollY > 50) {
        isScrollLockedAtTop = false;
    }
});

if (kepler) {
    window.addEventListener('mousemove', (e) => {
        if (latestScrollY > CONFIG.fadeEnd) return;

        const mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

        targetX = mouseX * 30;
        targetY = mouseY * 12;
    });

    function updateGlobalAnimation() {
        if (window.innerWidth <= 650) {
            if (viewer) {
                viewer.style.setProperty('--zoom-scale', '1');
                viewer.style.opacity = '1';
                viewerText.style.opacity = '1';
            }
            return;
        }

        if (isResetting && hasFinishedZoom) {
            requestAnimationFrame(updateGlobalAnimation);
            return;
        }

        if (hasFinishedZoom) {
            requestAnimationFrame(updateGlobalAnimation);
            return;
        }

        const scrollY = latestScrollY;

        if (scrollY <= CONFIG.fadeEnd) {
            currentX = lerp(currentX, targetX, CONFIG.mouseEase);
            currentY = lerp(currentY, targetY, CONFIG.mouseEase);
            kepler.style.transform = `translate(calc(-50% + ${currentX}px), calc(45% + ${currentY}px))`;
        }

        if (scrollY >= CONFIG.fadeStart) {
            const progress = Math.max(0, Math.min(1, (scrollY - CONFIG.fadeStart) / (CONFIG.fadeEnd - CONFIG.fadeStart)));
            const opacityValue = 1 - progress;
            kepler.style.opacity = opacityValue;
            kepler.style.visibility = opacityValue <= 0 ? 'hidden' : 'visible';
        } else {
            kepler.style.opacity = 1;
            kepler.style.visibility = 'visible';
        }

        if (scrollY >= CONFIG.zoomTriggerPoint) {
            const accelerationFactor = 1 + (currentZoomProgress / 35);
            currentZoomProgress = Math.min(100, currentZoomProgress + (CONFIG.baseZoomSpeed * accelerationFactor));
        } else {
            currentZoomProgress = Math.max(0, currentZoomProgress - CONFIG.baseZoomSpeed * 2);
        }

        if (currentZoomProgress >= 100) {
            hasFinishedZoom = true;
            if (viewer) {
                if (viewerText) viewerText.style.opacity = '0';
                viewer.classList.add('hidden-view');
            }
            if (mainContainer) {
                mainContainer.classList.add('fully-zoomed-cleanup');
            }
            window.scrollTo(0, 0);
            lenis.scrollTo(0, {immediate: true});

            setTimeout(() => {
                if (heroContent) {
                    heroContent.classList.add('visible');
                }
            }, 300);

            requestAnimationFrame(updateGlobalAnimation);
            return;
        }

        if (viewer) {
            const normProgress = currentZoomProgress / 100;
            const targetScaleX = window.innerWidth / (viewer.offsetWidth / 3);
            const targetScaleY = window.innerHeight / viewer.offsetHeight;
            const maxRequiredScale = Math.max(targetScaleX, targetScaleY) * 1.02;
            const finalScale = lerp(1, maxRequiredScale, normProgress);

            viewer.style.setProperty('--zoom-progress', normProgress);
            viewer.style.setProperty('--zoom-scale', finalScale);

            if (viewerText) {
                viewerText.style.opacity = 1 - normProgress;
            }
        }

        currentPercentage = (scrollY >= CONFIG.startScroll) ? Math.min(100, currentPercentage + CONFIG.fillingSpeed) : Math.max(0, currentPercentage - CONFIG.fillingSpeed);
        currentPercentageCenter = (scrollY >= CONFIG.startScrollCenter) ? Math.min(100, currentPercentageCenter + CONFIG.fillingSpeed) : Math.max(0, currentPercentageCenter - CONFIG.fillingSpeed);

        if (parts[0] && parts[2]) {
            const bgOuter = `linear-gradient(to top, var(--c-black) ${currentPercentage}%, transparent ${currentPercentage}%)`;
            parts[0].style.backgroundImage = bgOuter;
            parts[2].style.backgroundImage = bgOuter;
        }
        if (parts[1]) {
            parts[1].style.backgroundImage = `linear-gradient(to top, var(--c-black) ${currentPercentageCenter}%, transparent ${currentPercentageCenter}%)`;
        }

        requestAnimationFrame(updateGlobalAnimation);
    }

    requestAnimationFrame(updateGlobalAnimation);
}

const aboutLink = document.querySelector('#scroll-to-hero');

if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        skipIntroAnimation();

        const heroSection = document.querySelector('.hero');

        if (heroSection) {
            setTimeout(() => {
                lenis.scrollTo(heroSection, {
                    offset: 0,
                    duration: 2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }, 50);
        }
    });
}

const galleryLink = document.querySelector('#scroll-to-gallery');

if (galleryLink) {
    galleryLink.addEventListener('click', (e) => {
        e.preventDefault();
        skipIntroAnimation();

        const gallerySection = document.querySelector('#gallery') || document.querySelector('#galerie');

        if (gallerySection) {
            setTimeout(() => {
                lenis.scrollTo(gallerySection, {
                    offset: 0,
                    duration: 2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }, 50);
        }
    });
}

const burger = document.getElementById('burger-menu');
const modal = document.getElementById('nav-modal');

burger.addEventListener('click', () => {
    modal.classList.toggle('active');
    burger.classList.toggle('open');
});

modal.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        modal.classList.remove('active');
    });
});


















/* ==========================================================================
   MOTEUR DE TEMPÊTE SOLAIRE INTERACTIVE & BANDEAU LIVE (V9)
   ========================================================================== */

const STORM_CONFIG = {
    frequency: 0.00045,
    baseInterval: 120,
    phantomImages: [
        './images/Planet.png',
        './images/Animation/output.webm'
    ]
};

let stormTime = 0;
let isCrashed = false;
let mouseMovements = [];
const GLITCH_CHARS = "0110_ΔX██//##";

// --- EXPULSION VERS LE BLUE SCREEN ---
function executeBlueScreen() {
    isCrashed = true;
    if (typeof lenis !== 'undefined') lenis.stop();

    const crashOverlay = document.createElement('div');
    crashOverlay.classList.add('solar-crash-overlay', 'crash-blue');

    crashOverlay.innerHTML = `
        <h1>AURORA_OS_KERNEL_PANIC</h1>
        <p>A fatal electromagnetic exception has occurred due to irregular user navigation torque.</p>
        <p>The current data stream has been terminated to prevent total capacitor destruction.</p>
        <p>* Check your vessel shielding parameters.<br>
           * System reboot and trajectory recalibration in 10 seconds.</p>
        <div class="error-code">ERROR: MOUSE_FRENZY_OVERLOAD // TARGET: KEPLER-425C // NODE: 0x00A1F</div>
    `;

    document.body.appendChild(crashOverlay);

    setTimeout(() => {
        crashOverlay.remove();
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log(err));
        }
        if (typeof lenis !== 'undefined') lenis.start();

        isCrashed = false;
        stormTime = 0;
        mouseMovements = [];
        runSolarStormEngine();
    }, 10000);
}

// --- SUIVI SECRETS DES MOUVEMENTS SOURIS ---
window.addEventListener('mousemove', (e) => {
    if (isCrashed) return;
    mouseMovements.push({ x: e.clientX, y: e.clientY, time: Date.now() });
});

setInterval(() => {
    if (isCrashed) return;
    const now = Date.now();
    mouseMovements = mouseMovements.filter(m => now - m.time < 500);

    if (mouseMovements.length > 25) {
        let totalDistance = 0;
        for (let i = 1; i < mouseMovements.length; i++) {
            totalDistance += Math.hypot(
                mouseMovements[i].x - mouseMovements[i-1].x,
                mouseMovements[i].y - mouseMovements[i-1].y
            );
        }

        if (totalDistance > 3500) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
                    .then(() => { executeBlueScreen(); })
                    .catch(() => { isCrashed = false; });
            }
        }
    }
}, 100);

// --- EFFETS ET ARTIFACTS DE SURFACE ---
function scrambleElement(element, duration = 300) {
    if (element.dataset.scrambling === "true") return;
    element.dataset.scrambling = "true";
    const originalText = element.innerText;
    element.classList.add('corrupted-text');

    let interval = setInterval(() => {
        element.innerText = originalText.split("").map(char => (char === " " || char === "\n") ? char : (Math.random() > 0.5 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : char)).join("");
    }, 50);

    setTimeout(() => {
        clearInterval(interval); element.innerText = originalText; element.classList.remove('corrupted-text'); element.dataset.scrambling = "false";
    }, duration);
}

function spawnPhantomAsset() {
    if (document.querySelector('.phantom-glitch')) return;

    const phantom = document.createElement('div');
    phantom.classList.add('phantom-glitch');
    const width = Math.random() * 300 + 150, height = Math.random() * 180 + 80;
    phantom.style.width = `${width}px`; phantom.style.height = `${height}px`;
    phantom.style.top = `${Math.random() * (window.innerHeight - height)}px`; phantom.style.left = `${Math.random() * (window.innerWidth - width)}px`;

    if (Math.random() > 0.6 && STORM_CONFIG.phantomImages.length > 0) {
        phantom.style.backgroundImage = `url('${STORM_CONFIG.phantomImages[Math.floor(Math.random() * STORM_CONFIG.phantomImages.length)]}')`;
    } else {
        phantom.style.background = 'var(--c-main)';
    }
    document.body.appendChild(phantom);
    setTimeout(() => phantom.remove(), 100);
}

function spawnLineTear() {
    const container = document.getElementById('solar-static-lines');
    if (!container || document.querySelectorAll('.solar-line-tear').length > 2) return;

    const line = document.createElement('div');
    line.classList.add('solar-line-tear');
    line.style.setProperty('--lt-h', `${Math.floor(Math.random() * 3) + 1}px`);
    line.style.setProperty('--lt-y', `${Math.floor(Math.random() * 100)}%`);
    container.appendChild(line);
    setTimeout(() => line.remove(), 60);
}

// --- LE DECLENCHEUR DE MICRO-CRISES ---
function triggerMicroGlitch(intensity) {
    const body = document.body;
    const displacementMap = document.getElementById('solar-displacement');
    const header = document.querySelector('header');
    const titles = document.querySelectorAll('h1, h2, .hero-subtitle');

    body.classList.add('solar-flare');

    // Injection et altération du bandeau de comm en bas
    const commBanner = document.getElementById('comm-status-banner');
    if (commBanner) {
        commBanner.classList.remove('nominal');
        commBanner.classList.add('corrupted', 'hardware-jitter');

        const commText = commBanner.querySelector('.comm-text');
        if (commText && Math.random() > 0.4) {
            if (intensity > 0.7) {
                commText.innerText = "WARNING: COMM-LINK CRITICAL // SIGNAL LOSS IMMINENT";
            } else {
                commText.innerText = "ALERT: ELECTROMAGNETIC INTERFERENCES DETECTED";
            }
        }
    }

    if (displacementMap) {
        displacementMap.setAttribute('scale', Math.floor(Math.random() * 35 * intensity) + 5);
    }

    if (Math.random() * 0.9 < intensity) {
        const jX = `${Math.random() * 20 * intensity - (10 * intensity)}px`;
        const jY = `${Math.random() * 20 * intensity - (10 * intensity)}px`;
        const jR = `${Math.random() * 3 * intensity - (1.5 * intensity)}deg`;
        if (header) {
            header.classList.add('hardware-jitter');
            header.style.setProperty('--j-x', jX);
            header.style.setProperty('--j-y', jY);
            header.style.setProperty('--j-r', jR);
        }
    }

    if (intensity > 0.75 && Math.random() > 0.8) {
        body.classList.add('solar-flash-active');
        setTimeout(() => body.classList.remove('solar-flash-active'), 250);
    }

    if (intensity > 0.4 && Math.random() > 0.5) spawnLineTear();
    if (intensity > 0.7 && Math.random() > 0.8) spawnPhantomAsset();

    if (Math.random() * 0.5 < intensity) {
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        if (randomTitle) scrambleElement(randomTitle, 250);
    }

    setTimeout(() => {
        body.classList.remove('solar-flare');
        if (displacementMap) displacementMap.setAttribute('scale', '0');
        if (header) header.classList.remove('hardware-jitter');
        if (commBanner) commBanner.classList.remove('hardware-jitter');
    }, 80);
}

// --- BOUCLE TEMPORELLE SINUSOÏDALE ---
function runSolarStormEngine() {
    if (isCrashed) return;

    stormTime += STORM_CONFIG.baseInterval;
    const rawSine = Math.sin(stormTime * STORM_CONFIG.frequency);

    const currentIntensity = Math.min(1, Math.max(0, (rawSine * 1.3) + 0.3));

    if (currentIntensity > 0) {
        if (Math.random() > (1 - currentIntensity * 0.7)) {
            triggerMicroGlitch(currentIntensity);
        }
    } else {
        // Retour au calme : Normalisation du bandeau
        const commBanner = document.getElementById('comm-status-banner');
        if (commBanner && commBanner.classList.contains('corrupted')) {
            commBanner.classList.remove('corrupted', 'hardware-jitter');
            commBanner.classList.add('nominal');

            const commText = commBanner.querySelector('.comm-text');
            if (commText) commText.innerText = "SYS_STATUS: NOMINAL // COMM-LINK: STABLE";
        }
    }

    const nextCheck = STORM_CONFIG.baseInterval / (0.4 + currentIntensity);
    setTimeout(runSolarStormEngine, nextCheck);
}

window.addEventListener('load', () => {
    setTimeout(runSolarStormEngine, 2000);
});