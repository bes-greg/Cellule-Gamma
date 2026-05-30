<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cellule Gamma.</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <?php require_once 'includes/header.php'; ?>
    <div id="alertes" style="display: none;"></div>
    <button id="alertesMini">Alertes</button>
    <?php require_once 'includes/footer.php'; ?>
    <script src="js/script.js"></script>
    <script>loadAlertes(<?php echo isset($_SESSION['user']) ? 'true' : 'false'; ?>);</script>
</body>

</html>