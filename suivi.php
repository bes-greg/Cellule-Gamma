<!DOCTYPE html>

<html lang="fr">



<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cellule Gamma.</title>
    <link rel="stylesheet" href="css/suivi.css">

</head>

<body>
    <?php require_once 'includes/header.php'; ?>
    <main class="eva-dashboard-layout">

        <div class="divSuivi">
            <h1>Suivi de l'EVA</h1>
            <div id="suivi">
                <img src="svg/pin.svg" alt="Emplacement de l'EVA" class="imgSuivi">
            </div>
        </div>

        <section class="mission-timeline">

            <div class="timeline-header">
                <h2>JOURNAL DE BORD — EVA-01</h2>
                <span class="status-badge"><span class="pulse"></span>TERMINEE</span>
            </div>

            <div class="timeline-container">
                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-title">
                            <h3>[BULLETIN 1/5] LE DÉPART</h3>
                            <div class="timeline-time">
                                <span class="time">14:00</span>
                                <span class="location">CCA</span>
                            </div>
                        </div>
                        <p>Feu vert accordé ! Le sas externe du vaisseau vient de s’ouvrir. Les membres de l'équipage
                            entament officiellement leur sortie extra-véhiculaire. Objectif de l'EVA : inspecter
                            l’antenne principale et déployer les capteurs de proximité face au quadrant Nord-Est. Les
                            constantes de nos spationautes sont nominales.</p>
                    </div>
                </div>

                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-title">
                            <h3>[BULLETIN 2/5] LA PROGRESSION</h3>
                            <div class="timeline-time">
                                <span class="time">14:15</span>
                                <span class="location">CCA</span>
                            </div>
                        </div>
                        <p>Progression millimétrée dans le vide spatial. L'équipage se déplace le long de la structure
                            extérieure, à plus de 400 kilomètres au-dessus de l'atmosphère de Kepler-452c. Les images
                            reçues au Centre de Contrôle montrent une clarté exceptionnelle.</p>
                    </div>
                </div>

                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-title">
                            <h3>[BULLETIN 3/5] L'APPROCHE TARGET</h3>
                            <div class="timeline-time">
                                <span class="time">14:32</span>
                                <span class="location">CCA</span>
                            </div>
                        </div>
                        <p>L'équipage vient d'atteindre l'extrémité du mât de télécommunication. Le premier capteur
                            haute sensibilité est en cours de fixation. Les caméras embarquées se focalisent sur la zone
                            d'origine de la fluctuation électromagnétique. Visuel direct en cours de stabilisation avec
                            les équipes au sol.</p>
                    </div>
                </div>

                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-title">
                            <h3>[BULLETIN 4/5] LA DÉCOUVERTE</h3>
                            <div class="timeline-time">
                                <span class="time">14:45</span>
                                <span class="location">CCA</span>
                            </div>
                        </div>
                        <p>Premiers relevés confirmés ! Les capteurs de proximité enregistrent à l’instant une variation
                            thermique et magnétique très précise à la surface de l'antenne, corrélée au signal reçu
                            hier. <span class="quote">« Les données physiques se matérialisent sous nos yeux, c'est
                                fascinant »</span>, commente l'équipage en direct. Début du transfert des paquets de
                            données brutes vers le pôle Data.</p>
                    </div>
                </div>

                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-title">
                            <h3>[BULLETIN 5/5] RETOUR AU SAS</h3>
                            <div class="timeline-time">
                                <span class="time">15:00</span>
                                <span class="location">CCA</span>
                            </div>
                        </div>
                        <p>Mission accomplie pour l'EVA-01. Les capteurs sont parfaitement opérationnels et l'équipage
                            entame sa procédure de retour sécurisée vers le sas principal. Les équipes de la cellule
                            Gamma prennent le relais pour analyser cette mine d'informations inédite.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <div class="divGallerie">
        <h1>Données</h1>
        <div id="gallery">
        </div>
    </div>


    <?php require_once 'includes/footer.php'; ?>
    <script src="js/suivi.js"></script>
</body>

</html>