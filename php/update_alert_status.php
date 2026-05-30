<?php
header('Content-Type: application/json');

$rawInput = file_get_contents('php://input');
$requestData = json_decode($rawInput, true);

$json = $requestData['data'] ?? null;
$toEnCours = $requestData['enCours'] ?? null;

if ($json) {
    $json['statut'] = $toEnCours ? "En cours" : "Caché";

    $structureComplete = [$json];

    file_put_contents('../json/alertes.json', json_encode($structureComplete, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode(['success' => true]);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Données invalides']);
}
?>