<?php
session_start();

require_once '../connexion_bdd.php';

$username = $_POST['username'] ?? "";
$password = $_POST['password'] ?? "";

$stmt = $pdo->prepare("SELECT * FROM comptes WHERE login = :username");
$stmt->execute([':username' => $username]);
$user = $stmt->fetch();

if (!empty($user) && password_verify($password, $user['pwd'])) {

    $_SESSION['user'] = $user['id'];
    header('Location: ../index.php');
    exit();
} else {
    header('Location: ../login.php?error=1');
    exit();
}

?>