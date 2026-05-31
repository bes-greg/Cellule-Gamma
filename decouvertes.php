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
    <div class="divDecouv">
        <h1>Dernières découvertes</h1>
        <div id="decouvertes">
        </div>
    </div>

    <?php require_once 'includes/footer.php'; ?>
    <script src="js/script.js"></script>
    <script>
        loadDecouvertes();
    </script>
</body>

</html>