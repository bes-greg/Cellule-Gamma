    <!DOCTYPE html>
    <html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gamma.</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/galerie.css">
    </head>

    <body>

    <div id="comm-status-banner" class="comm-banner nominal">
        <div class="comm-container">
            <span class="comm-pulse"></span>
            <span class="comm-text">SYS_STATUS: NOMINAL // COMM-LINK: STABLE</span>
        </div>
    </div>

    <div class="loadingScreen">
        <h1 class="loader-title">Gamma.</h1>
    </div>

    <?php require_once 'includes/header.php'; ?>
    <main id="main-viewer" class="fade-element">
        <div class="viewer-trigger">
            <div class="viewer">
                <div class="parts"></div>
                <div class="parts"></div>
                <div class="parts"></div>

                <div class="text">
                    <div class="left">
                        <h1>Gamma.</h1>
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

    <div class="hero">
        <div class="hero-content">
            <div class="hero-title-group">
                <h1 class="slide-in-target">Mission Aurora.</h1>
                <p class="hero-subtitle slide-in-target">Une <span class="secondary">planète</span> nous <br>attend.</p>
            </div>
            <p class="hero-text">A des milliers d’années-lumières de la Terre, une planète nous attend. Kepler-425c, plus
                grande, plus ancienne, mais étrangement familière. Depuis le centre de contrôle aurora, nous pilotons l’une des
                expéditions les plus ambitieuses de l’histoire humaine : atteindre ce monde lointain, l’observer, le
                comprendre, et répondre à la question qui nous hante depuis toujours.
                L'être humain peut-il y vivre ?
                Tout a commencé par un signal. puis des données, puis des images. Aujourd’hui, notre vaisseau fend le vide
                interstellaire, porteur des espoirs de toute une civilisation. A bord, un équipage d'élite : scientifiques,
                ingénieurs, explorateurs, scrutant chaque donnée, chaque variations atmosphérique, chaque indice que
                Kepler-425c nous livre.
            </p>


            <h2 class="slide-in-target propos-slide-in-target" >Cellule Gamma.</h2>
            <div class="propos-separator"></div>
            <p class="propos-text">La cellule Gamma est ici pour vous embarquer dans cette aventure. Nous sommes les
                narrateurs de la mission : nous recevons les transmissions, nous les décryptons, et nous vous les restituons en
                temps réel. Chaque signal capté, chaque image reçue, chaque découverte, vous en serez les premiers témoins. Pas
                de jargon, pas de formules obscures, juste la science, rendue vivante.
            </p>
        </div>
    </div>

    <section id="gallery" class="gallery-wrapper">
        <div class="titleArea">
            <h2>Galerie</h2>
        </div>
        <section class="gallery-wrapper">
            <div class='scroll-animations-example'>
                <div class='scrollsection' id="gallery-container">
                </div>
            </div>
        </section>

        <div id="gamma-modal" class="gamma-modal hidden">
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-image-container">
                    <img id="modal-image" src="" alt="Archive Kepler">
                </div>
                <div class="modal-legend">
                    <div class="legend-item">
                        <span class="label">Lieu_</span>
                        <span class="value" id="modal-loc">...</span>
                    </div>
                    <div class="legend-item">
                        <span class="label">Date_</span>
                        <span class="value" id="modal-date">...</span>
                    </div>
                    <div class="legend-item">
                        <span class="label">Opérateur_</span>
                        <span class="value" id="modal-astro">...</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php require_once 'includes/footer.php'; ?>

    <div id="solar-static-lines" style="position: fixed; inset: 0; pointer-events: none; z-index: 99999; overflow: hidden;"></div>

    <svg style="position: absolute; width: 0; height: 0; pointer-events: none;" xmlns="http://www.w3.org/2000/svg">
        <filter id="solar-glitch">
            <feTurbulence type="fractalNoise" baseFrequency="0.15 0.95" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" id="solar-displacement" />
        </filter>
    </svg>

    <script src="https://unpkg.com/@studio-freight/lenis@1.0.36/dist/lenis.min.js"></script>
    <script src="js/loading.js"></script>
    <script src="js/textAnimate.js"></script>
    <script src="js/app.js"></script>
    <script src="js/gallery.js"></script>
    </body>
    </html>