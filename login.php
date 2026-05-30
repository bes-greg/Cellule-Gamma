<?php
session_start();

$erreur = $_GET['error'] ?? 0;
if ($erreur > 0) {
    echo "<script>alert('Identifiants incorrects.');</script>";
}

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
    <div class="divForm">
        <form action="php/traitement-login.php" method="post" class="formLogin">
            <h2 class="titleForm">Connexion</h2>
            <div class="blocInput">
                <label for="username">Nom d'utilisateur :</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="blocInput">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" required>
            </div>
            <input class="btnLogin" type="submit" value="Se connecter">
        </form>
    </div>
</body>

</html>