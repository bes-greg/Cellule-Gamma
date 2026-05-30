<?php

$config = parse_ini_file('.env');

try {
    $host = $config['DB_HOST'];
    $port = $config['DB_PORT'];
    $dbname = $config['DB_NAME'];
    $user = $config['DB_USER'];
    $pass = $config['DB_PASSWORD'];

    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    $pdo = new PDO($dsn, $user, $pass, $options);

} catch (PDOException $e) {
    die("Erreur de connexion à la base de données.");
}

?>