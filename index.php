<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cellule Gamma.</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
<?php require_once 'includes/header.php'; ?>
<main>
    <div class="viewer-trigger">
        <div class="viewer">
            <div class="parts"></div>
            <div class="parts"></div>
            <div class="parts"></div>

            <div class="text">
                <div class="left">
                    <h1>Aurora.</h1>
                    <p>Kepler-425c, plus grande, plus ancienne, mais étrangement familière.</p>
                </div>
                <a href="#" class="CTA">Journal de missions</a>
            </div>

            <video autoplay loop muted playsinline class="kepler">
                <source src="./images/Animation/output.webm" type="video/webm">
                <img src="./images/Planet.png" alt="Kepler">
            </video>
        </div>
    </div>
</main>
<div id="hero">
    <h1>Mission AURORA</h1>
    <p>A des milliers d’années-lumières de la Terre, une planète nous attend. Kepler-425c, plus grande, plus
        ancienne, mais étrangement familière. Depuis le centre de contrôle aurora, nous pilotons l’une des
        expéditions les plus ambitieuses de l’histoire humaine : atteindre ce monde lointain, l’observer, le
        comprendre, et répondre à la question qui nous hante depuis toujours.
        L'être humain peut-il y vivre ?
        Tout a commencé par un signal. puis des données, puis des images. Aujourd’hui, notre vaisseau fend le vide
        interstellaire, porteur des espoirs de toute une civilisation. A bord, un équipage d'élite : scientifiques,
        ingénieurs, explorateurs, scrutant chaque donnée, chaque variations atmosphérique, chaque indice que
        Kepler-425c nous livre.
    </p>
</div>
<div id="propos">
    <h2>À propos</h2>
    <p>
        La cellule Gamma est ici pour vous embarquer dans cette aventure. We sommes les narrateurs de la mission :
        nous recevons les transmissions, nous les décryptons, et nous vous les restituons en temps réel. Chaque
        signal capté, chaque image reçue, chaque découverte, vous en serez les premiers témoins.
        pas de jargon, pas de formules obscures, juste la science, rendue vivante.
    </p>
</div>

<?php require_once 'includes/footer.php'; ?>

<script src="https://unpkg.com/@studio-freight/lenis@1.0.36/dist/lenis.min.js"></script>
<script>
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
    const viewer = document.querySelector('main .viewer');
    const viewerText = document.querySelector('main .viewer .text');
    const kepler = document.querySelector('.kepler');
    const parts = document.querySelectorAll('main .viewer .parts');

    const CONFIG = {
        startScroll: 90,
        startScrollCenter: 300,
        fadeStart: 400,
        fadeEnd: 600,
        zoomTriggerPoint: 650,
        zoomSpeed: 2.5,
        fillingSpeed: 2,
        mouseEase: 0.05
    };

    let latestScrollY = 0;

    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let currentPercentage = 0;
    let currentPercentageCenter = 0;
    let currentZoomProgress = 0;

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    function updateProgress(currentVal, condition, speed) {
        if (condition) {
            return Math.min(100, currentVal + speed);
        } else {
            return Math.max(0, currentVal - speed);
        }
    }

    lenis.on('scroll', (e) => {
        latestScrollY = window.scrollY;

        if (header) {
            if (e.direction === 1 && latestScrollY > 100) {
                header.classList.add('hidden');
            } else if (e.direction === -1) {
                header.classList.remove('hidden');
            }
        }
    });

    if (kepler) {
        window.addEventListener('mousemove', (e) => {
            if (latestScrollY > CONFIG.fadeEnd) return;

            const mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            const mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

            targetX = mouseX * 60;
            targetY = mouseY * 20;
        });

        function updateGlobalAnimation() {
            const scrollY = latestScrollY;

            // A. Parallaxe Planète
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

            if (scrollY < CONFIG.fadeEnd) {
                currentZoomProgress = 0;
            } else {
                currentZoomProgress = updateProgress(currentZoomProgress, scrollY >= CONFIG.zoomTriggerPoint, CONFIG.zoomSpeed);
            }

            if (viewer) {
                viewer.style.setProperty('--zoom-progress', `${currentZoomProgress}%`);
                if (viewerText) {
                    viewerText.style.opacity = 1 - (currentZoomProgress / 100);
                }
            }

            currentPercentage = updateProgress(currentPercentage, scrollY >= CONFIG.startScroll, CONFIG.fillingSpeed);
            currentPercentageCenter = updateProgress(currentPercentageCenter, scrollY >= CONFIG.startScrollCenter, CONFIG.fillingSpeed);

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

        // Lancement de la boucle
        requestAnimationFrame(updateGlobalAnimation);
    }
</script>

</body>
</html>