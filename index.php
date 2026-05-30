<?php
session_start();

?>
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
            La cellule Gamma est ici pour vous embarquer dans cette aventure. Nous sommes les narrateurs de la mission :
            nous recevons les transmissions, nous les décryptons, et nous vous les restituons en temps réel. Chaque
            signal capté, chaque image reçue, chaque découverte, vous en serez les premiers témoins.
            pas de jargon, pas de formules obscures, juste la science, rendue vivante.

        </p>
    </div>

    <?php require_once 'includes/footer.php'; ?>
    <div class="loadingScreen">
        <h1>Aurora.</h1>
    </div>

    <script src="js/script.js"></script>
    <script>genererDot();</script>
</body>

</html>