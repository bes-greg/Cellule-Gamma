<?php
session_start();
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gamma.</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/galerie.css">
    <link rel="stylesheet" href="css/dashboard.css">
    <link rel="stylesheet" href="css/cristallin.css">
</head>

<body>
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
            <p class="hero-text">A des milliers d’années-lumières de la Terre, une planète nous attend. Kepler-425c,
                plus
                grande, plus ancienne, mais étrangement familière. Depuis le centre de contrôle aurora, nous pilotons
                l’une des
                expéditions les plus ambitieuses de l’histoire humaine : atteindre ce monde lointain, l’observer, le
                comprendre, et répondre à la question qui nous hante depuis toujours.
                L'être humain peut-il y vivre ?
                Tout a commencé par un signal. puis des données, puis des images. Aujourd’hui, notre vaisseau fend le
                vide
                interstellaire, porteur des espoirs de toute une civilisation. A bord, un équipage d'élite :
                scientifiques,
                ingénieurs, explorateurs, scrutant chaque donnée, chaque variations atmosphérique, chaque indice que
                Kepler-425c nous livre.
            </p>


            <h2 class="slide-in-target propos-slide-in-target">Cellule Gamma.</h2>
            <div class="propos-separator"></div>
            <p class="propos-text">La cellule Gamma est ici pour vous embarquer dans cette aventure. Nous sommes les
                narrateurs de la mission : nous recevons les transmissions, nous les décryptons, et nous vous les
                restituons en
                temps réel. Chaque signal capté, chaque image reçue, chaque découverte, vous en serez les premiers
                témoins. Pas
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

    <div class="divDashboard">
        <div class="titleArea">
            <h2>Journal de bord</h2>
        </div>
        <div id="dashboard">

        </div>
    </div>

    <div class="discovery-parallax-wrapper">
        <section id="discovery-cristallin" class="discovery-section">
            <div class="discovery-container">

                <div class="discovery-badge">
                    <span class="pulse-dot"></span>
                    <span class="badge-text">Nouvelle Découverte</span>
                </div>

                <div class="discovery-hero-grid">
                    <div class="discovery-title-wrapper">
                        <h1 class="giant-title">LE CRISTALLIN</h1>
                    </div>

                    <div class="discovery-image-wrapper">
                        <img src="./images/cristallin.png" alt="Le Cristallin" class="floating-crystal"
                            id="js-crystal-target">
                        <div class="crystal-glow"></div>
                    </div>
                </div>

                <div class="discovery-details-grid">
                    <div class="tech-specs">
                        <div class="spec-item">
                            <span class="spec-label">ID_SPECIMEN //</span>
                            <span class="spec-value">K425C-CR-01</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">COMPOSITION //</span>
                            <span class="spec-value">Silicates d'Aigue-marine</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">RADIATION //</span>
                            <span class="spec-value stabilized">Stable (0.04% uSv)</span>
                        </div>
                    </div>

                    <div class="discovery-description">
                        <p>
                            Découvert au cœur des failles géothermiques de l'hémisphère nord de <span
                                class="highlight-orange">Kepler-425c</span>, cette structure cristalline unique bouscule
                            toutes nos certitudes géologiques. Émettant une luminescence cyan constante, le Cristallin
                            semble agir comme un conducteur d'énergie naturelle trans-atmosphérique.
                        </p>
                        <p>
                            Les analyses préliminaires de la Cellule Gamma révèlent une densité moléculaire inédite,
                            capable de stocker des charges cinétiques. Plus qu'un simple minéral, il pourrait s'agir de
                            la clé de voûte de l'écosystème énergétique de cette nouvelle Terre.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    </div>

    <section id="crisis-center" class="crisis-section">
        <div class="crisis-container">

            <div class="crisis-header">
                <div class="crisis-status">
                    <span class="status-pulse"></span> STATUS : CELLULE INFO ACTIVE
                </div>
                <h2>Centre de Crise _</h2>
                <p class="crisis-lead">Face aux spéculations récentes concernant la Mission Aurora et Kepler-425c, la
                    Cellule Gamma centralise ici les faits vérifiés, les transmissions de l'équipage et les réponses
                    officielles.</p>
            </div>

            <div class="crisis-grid">

                <!-- Colonne Principale (Gauche) -->
                <div class="crisis-main-content">

                    <!-- 1. Le Communiqué de Presse / Démenti Officiel -->
                    <div class="crisis-card alert-card">
                        <div class="card-meta">COMMUNIQUÉ DE PRESSE OFFICIEL • <span class="timestamp">DIFFUSION
                                IMMÉDIATE - 30 MAI 2026</span></div>
                        <span class="location-tag">GRENOBLE, FRANCE_</span>

                        <h3>Démenti officiel concernant les rumeurs du #AuroraAlien</h3>

                        <p>Face à la propagation rapide de fausses informations et de contenus manipulés sous le hashtag
                            <strong>#AuroraAlien</strong>, le Centre de Contrôle Aurora (CCA) tient à rétablir
                            formellement et incontestablement la vérité des faits.
                        </p>

                        <p>Le CCA dément catégoriquement l’existence de toute forme de vie extraterrestre ou anomalie
                            biologique à bord ou à proximité du vaisseau Aurora. La vidéo circulant actuellement sur les
                            plateformes numériques et reprise par certains médias est un <strong>deepfake
                                intégral</strong>.</p>

                        <p>Les analyses de télédétection et les observations menées lors de la sortie extra-véhiculaire
                            (EVA-01) confirment de manière exclusive la détection d'une formation géologique inerte :
                            <strong>une structure cristalline naturelle stable</strong> sur la surface de Kepler-452c.
                        </p>

                        <p>Le CCA condamne avec la plus grande fermeté les dérives inacceptables constatées ces
                            dernières heures, et notamment le harcèlement médiatique ciblant les familles de l’équipage
                            à leur domicile. La protection et la dignité de nos personnels et de leurs proches
                            constituent une priorité absolue. Des mesures juridiques immédiates ont été engagées pour
                            faire cesser ces agissements.</p>

                        <p class="signature">Pôle Communication CCA - Cellule Gamma</p>
                    </div>

                    <!-- 2. La Preuve Vidéo (Placée juste en dessous du communiqué) -->
                    <div class="crisis-card video-card">
                        <div class="card-meta">PREUVE VIDÉO DE TRANSMISSION • <span class="timestamp">REÇU LE : 31 MAI
                                2026 - 15:34 UTC</span></div>
                        <h3>Séquence vidéo brute originale (EVA-01)</h3>

                        <div class="video-container">
                            <video controls poster="./images/Planet.png">
                                <source src="./images/Animation/output.webm" type="video/webm">
                                Votre navigateur ne supporte pas la lecture de cette vidéo.
                            </video>
                        </div>
                        <p class="video-caption">Flux vidéo non coupé de la sortie extra-véhiculaire confirmant
                            l'intégrité de la mission face à la formation géologique cristalline.</p>
                    </div>

                </div> <!-- Fin de la colonne principale -->

                <!-- Colonne Secondaire (Droite) : FAQ Structurée -->
                <div class="crisis-sidebar">
                    <div class="crisis-card">
                        <h3>Questions Fréquentes _</h3>

                        <!-- Q1 -->
                        <div class="faq-item">
                            <div class="faq-question">Quelle est la nature de la vidéo qui circule sous le hashtag
                                #AuroraAlien ?</div>
                            <div class="faq-answer">Il s'agit d'un <strong>deepfake intégral</strong>. Cette vidéo a été
                                générée de toutes pièces à l'aide d'intelligences artificielles avancées pour simuler
                                des images et des voix réalistes mais totalement fictives. Elle ne provient en aucun cas
                                de nos flux de transmission.</div>
                        </div>

                        <!-- Q2 -->
                        <div class="faq-item">
                            <div class="faq-question">Qu'a réellement découvert l'équipage lors de la sortie EVA-01 ?
                            </div>
                            <div class="faq-answer">Les analyses de télédétection et les observations directes menées
                                lors de la sortie extra-véhiculaire (EVA-01) confirment de manière exclusive la présence
                                d'une <strong>structure cristalline naturelle stable</strong>. Il s'agit d'une formation
                                géologique parfaitement inerte sur la surface de Kepler-452c.</div>
                        </div>

                        <!-- Q3 -->
                        <div class="faq-item">
                            <div class="faq-question">Comment vérifier la véracité et l'intégrité des données de la
                                mission ?</div>
                            <div class="faq-answer">Dans un souci de transparence totale, le CCA va publier
                                l’intégralité des <strong>paquets de données brutes certifiées</strong> ainsi que la
                                séquence vidéo originale, non coupée, de la sortie extra-véhiculaire. Ces éléments
                                factuels seront entièrement vérifiables par la communauté scientifique internationale.
                            </div>
                        </div>
                    </div>
                </div> <!-- Fin de la colonne secondaire -->

            </div>
        </div>
    </section>


    <?php require_once 'includes/footer.php'; ?>

    <script src="https://unpkg.com/@studio-freight/lenis@1.0.36/dist/lenis.min.js"></script>
    <script src="js/loading.js"></script>
    <script src="js/textAnimate.js"></script>
    <script src="js/app.js"></script>
    <script src="js/gallery.js"></script>
    <script src="js/dashboard.js"></script>
    <script src="js/cristallin.js"></script>
</body>

</html>