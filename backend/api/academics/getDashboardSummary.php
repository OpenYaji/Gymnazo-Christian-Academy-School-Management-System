<?php

session_start();
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/db.php';

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not authenticated.']);
    exit();
}

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

$student_user_id = $_SESSION['user_id'];

try {
    $gwa_query = "
        SELECT 
            AVG(g.GradeValue) as generalAverage,
            g.Quarter as quarter
        FROM grade g
        JOIN enrollment e ON g.EnrollmentID = e.EnrollmentID
        JOIN schoolyear sy ON e.SchoolYearID = sy.SchoolYearID
        JOIN studentprofile sp ON e.StudentProfileID = sp.StudentProfileID
        JOIN profile p ON sp.ProfileID = p.ProfileID
        WHERE p.UserID = :user_id AND sy.IsActive = 1
        GROUP BY g.Quarter
        ORDER BY FIELD(g.Quarter, 'First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter') DESC
        LIMIT 1;
    ";
    $gwa_stmt = $db->prepare($gwa_query);
    $gwa_stmt->bindParam(':user_id', $student_user_id, PDO::PARAM_INT);
    $gwa_stmt->execute();
    $gwa_result = $gwa_stmt->fetch(PDO::FETCH_ASSOC);

    $generalAverage = $gwa_result ? floatval($gwa_result['generalAverage']) : 0;
    $currentQuarter = $gwa_result ? $gwa_result['quarter'] : 'N/A';
    
    $remark = "Needs Improvement";
    if ($generalAverage >= 90) $remark = "Excellent";
    else if ($generalAverage >= 85) $remark = "Very Satisfactory";
    else if ($generalAverage >= 80) $remark = "Satisfactory";
    else if ($generalAverage >= 75) $remark = "Fair";


 
    $totalDaysPresent = 58;
    $totalSchoolDays = 60;
    $attendancePercentage = ($totalSchoolDays > 0) ? round(($totalDaysPresent / $totalSchoolDays) * 100) : 0;
    $attendanceRemark = "Perfect Attendance";
    
    $participation = [
        "rating" => 4,
        "remark" => "Excellent"
    ];

    $summary_data = [
        'generalAverage' => $generalAverage,
        'remark' => $remark,
        'quarter' => $currentQuarter,
        'attendance' => $attendancePercentage,
        'totalDaysPresent' => $totalDaysPresent,
        'totalDays' => $totalSchoolDays,
        'attendanceRemark' => $attendanceRemark,
        'participation' => $participation
    ];
    
    http_response_code(200);
    echo json_encode(['success' => true, 'data' => $summary_data]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}

?>
