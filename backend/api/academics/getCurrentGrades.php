<?php
/**
 * API Endpoint: Get Current Academic Grades
 * Fetches the grades, subject details, and academic summary for the
 * currently logged-in student for the active school year.
 */

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
    $query = "
        SELECT 
            s.SubjectID AS id,
            s.SubjectName AS name,
            MAX(CASE WHEN g.Quarter = 'First Quarter' THEN g.GradeValue ELSE NULL END) AS q1,
            MAX(CASE WHEN g.Quarter = 'Second Quarter' THEN g.GradeValue ELSE NULL END) AS q2,
            MAX(CASE WHEN g.Quarter = 'Third Quarter' THEN g.GradeValue ELSE NULL END) AS q3,
            MAX(CASE WHEN g.Quarter = 'Fourth Quarter' THEN g.GradeValue ELSE NULL END) AS q4
        FROM grade g
        JOIN subject s ON g.SubjectID = s.SubjectID
        JOIN enrollment e ON g.EnrollmentID = e.EnrollmentID
        JOIN schoolyear sy ON e.SchoolYearID = sy.SchoolYearID
        JOIN studentprofile sp ON e.StudentProfileID = sp.StudentProfileID
        JOIN profile p ON sp.ProfileID = p.ProfileID
        WHERE p.UserID = :user_id AND sy.IsActive = 1
        GROUP BY s.SubjectID, s.SubjectName
        ORDER BY s.SubjectID;
    ";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $student_user_id, PDO::PARAM_INT);
    $stmt->execute();

    $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $total_grade = 0;
    $subject_count = 0;
    $final_general_average = 0;

    if (!empty($subjects)) {
        foreach($subjects as &$subject) {
            $subject['details'] = [
                'quizzes' => round($subject['q1'] * 0.95, 2),
                'performance' => round($subject['q1'] * 1.05, 2),
                'exam' => $subject['q1'],
                'comments' => 'Performing well. Keep up the good work.'
            ];

            $grades = array_filter([$subject['q1'], $subject['q2'], $subject['q3'], $subject['q4']], 'is_numeric');
            if (count($grades) === 4) { 
                 $subject['final'] = round(array_sum($grades) / 4, 2);
                 $subject['remarks'] = $subject['final'] >= 75 ? 'Passed' : 'Failed';
            } else {
                 $subject['final'] = null;
                 $subject['remarks'] = 'In Progress';
            }
            
            $running_average = count($grades) > 0 ? array_sum($grades) / count($grades) : 0;
            if ($running_average > 0) {
                $total_grade += $running_average;
                $subject_count++;
            }
        }
        unset($subject); 
    }
    
    if ($subject_count > 0) {
        $final_general_average = round($total_grade / $subject_count, 2);
    }
    
    $summary = [
        'generalAverage' => $final_general_average,
        'attendanceRate' => 98, 
        'academicStanding' => $final_general_average >= 90 ? 'Excellent' : 'Very Good' 
    ];
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => [
            'summary' => $summary,
            'subjects' => $subjects
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>
