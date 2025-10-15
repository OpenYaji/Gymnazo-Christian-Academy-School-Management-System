<?php

session_start();
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/db.php';

header("Content-Type: application/json; charset=UTF-8");

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
            sy.YearName as schoolYear,
            gl.LevelName as gradeLevel,
            s.SubjectID as subjectId,
            s.SubjectName as subjectName,
            g.Quarter,
            g.GradeValue
        FROM grade g
        JOIN subject s ON g.SubjectID = s.SubjectID
        JOIN enrollment e ON g.EnrollmentID = e.EnrollmentID
        JOIN schoolyear sy ON e.SchoolYearID = sy.SchoolYearID
        JOIN section sec ON e.SectionID = sec.SectionID
        JOIN gradelevel gl ON sec.GradeLevelID = gl.GradeLevelID
        JOIN studentprofile sp ON e.StudentProfileID = sp.StudentProfileID
        JOIN profile p ON sp.ProfileID = p.ProfileID
        WHERE p.UserID = :user_id AND sy.IsActive = 0
        ORDER BY sy.StartDate DESC, s.SubjectID, g.Quarter;
    ";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $student_user_id, PDO::PARAM_INT);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $grouped_grades = [];
    foreach ($results as $row) {
        $year = $row['schoolYear'];
        
        if (!isset($grouped_grades[$year])) {
            $grouped_grades[$year] = [
                'schoolYear' => $year,
                'gradeLevel' => $row['gradeLevel'],
                'subjects_map' => [],
            ];
        }

        $subject_id = $row['subjectId'];
        if (!isset($grouped_grades[$year]['subjects_map'][$subject_id])) {
            $grouped_grades[$year]['subjects_map'][$subject_id] = [
                'id' => $subject_id, 'name' => $row['subjectName'],
                'q1' => null, 'q2' => null, 'q3' => null, 'q4' => null
            ];
        }

        switch ($row['Quarter']) {
            case 'First Quarter': $grouped_grades[$year]['subjects_map'][$subject_id]['q1'] = $row['GradeValue']; break;
            case 'Second Quarter': $grouped_grades[$year]['subjects_map'][$subject_id]['q2'] = $row['GradeValue']; break;
            case 'Third Quarter': $grouped_grades[$year]['subjects_map'][$subject_id]['q3'] = $row['GradeValue']; break;
            case 'Fourth Quarter': $grouped_grades[$year]['subjects_map'][$subject_id]['q4'] = $row['GradeValue']; break;
        }
    }

    $final_data = [];
    foreach($grouped_grades as $year => $data) {
        $total_final_grade = 0;
        $subject_count = 0;
        
        foreach($data['subjects_map'] as $subject_id => $subject_data) {
            $grades = array_filter([$subject_data['q1'], $subject_data['q2'], $subject_data['q3'], $subject_data['q4']], 'is_numeric');
            $final_grade = (count($grades) > 0) ? round(array_sum($grades) / count($grades), 2) : 0;
            
            $data['subjects_map'][$subject_id]['final'] = $final_grade;
            $data['subjects_map'][$subject_id]['remarks'] = ($final_grade >= 75) ? 'Passed' : 'Failed';

            if($final_grade > 0) {
                $total_final_grade += $final_grade;
                $subject_count++;
            }
        }
        
        $data['subjects'] = array_values($data['subjects_map']);
        unset($data['subjects_map']);

        $final_average = ($subject_count > 0) ? round($total_final_grade / $subject_count, 2) : 0;
        $data['summary'] = [
            'finalAverage' => $final_average,
            'attendanceRate' => 99, 
            'academicStanding' => $final_average >= 75 ? 'Promoted' : 'Retained'
        ];

        $final_data[] = $data;
    }

    http_response_code(200);
    echo json_encode(['success' => true, 'data' => $final_data]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>
