<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../controllers/AdmissionController.php';

$controller = new AdmissionController($pdo);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    switch ($method) {
        case 'POST':
            handlePost($action, $controller);
            break;
        
        case 'GET':
            handleGet($action, $controller);
            break;
        
        default:
            throw new Exception('Method not allowed');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

function handlePost($action, $controller) {
    switch ($action) {
        case 'submit':
            submitAdmission($controller);
            break;
        
        default:
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid action'
            ]);
    }
}

function handleGet($action, $controller) {
    switch ($action) {
        case 'check_status':
            checkStatus($controller);
            break;
        
        case 'grade_levels':
            getGradeLevels($controller);
            break;
        
        default:
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid action'
            ]);
    }
}

function submitAdmission($controller) {
    $postData = $_POST;
    $files = $_FILES ?? [];
    
    $result = $controller->submitApplication($postData, $files);
    
    if ($result['success']) {
        http_response_code(201);
    } else {
        http_response_code(400);
    }
    
    echo json_encode($result);
}

function checkStatus($controller) {
    $trackingNumber = $_GET['tracking_number'] ?? '';
    
    if (empty($trackingNumber)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Tracking number is required'
        ]);
        return;
    }
    
    $application = $controller->checkStatus($trackingNumber);
    
    if ($application) {
        echo json_encode([
            'success' => true,
            'data' => $application
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Application not found'
        ]);
    }
}

function getGradeLevels($controller) {
    $gradeLevels = $controller->getGradeLevels();
    
    echo json_encode([
        'success' => true,
        'data' => $gradeLevels
    ]);
}
?>