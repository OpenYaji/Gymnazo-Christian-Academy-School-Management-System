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
    $stmt = $db->prepare("SELECT sp.StudentProfileID FROM studentprofile sp JOIN profile p ON sp.ProfileID = p.ProfileID WHERE p.UserID = :user_id");
    $stmt->bindParam(':user_id', $student_user_id, PDO::PARAM_INT);
    $stmt->execute();
    $student_profile = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$student_profile) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Student profile not found.']);
        exit();
    }
    $student_profile_id = $student_profile['StudentProfileID'];

    $stmt = $db->prepare("
        SELECT SUM(t.BalanceAmount) as totalBalance
        FROM transaction t
        JOIN TransactionStatus ts ON t.TransactionStatusID = ts.StatusID
        WHERE t.StudentProfileID = :student_profile_id AND ts.StatusName != 'Paid'
    ");
    $stmt->bindParam(':student_profile_id', $student_profile_id, PDO::PARAM_INT);
    $stmt->execute();
    $balance_result = $stmt->fetch(PDO::FETCH_ASSOC);
    $current_balance = $balance_result['totalBalance'] ?? 0.00;

    $stmt = $db->prepare("
        SELECT t.TransactionID, t.TotalAmount, t.PaidAmount, t.BalanceAmount, t.DueDate
        FROM transaction t
        JOIN schoolyear sy ON t.SchoolYearID = sy.SchoolYearID
        WHERE t.StudentProfileID = :student_profile_id AND sy.IsActive = 1
        LIMIT 1
    ");
    $stmt->bindParam(':student_profile_id', $student_profile_id, PDO::PARAM_INT);
    $stmt->execute();
    $current_transaction = $stmt->fetch(PDO::FETCH_ASSOC);

    $breakdown_items = [];
    if ($current_transaction) {
        $stmt = $db->prepare("
            SELECT ti.Description as description, SUM(ti.Amount) as amount
            FROM transactionitem ti
            WHERE ti.TransactionID = :transaction_id
            GROUP BY ti.Description
        ");
        $stmt->bindParam(':transaction_id', $current_transaction['TransactionID'], PDO::PARAM_INT);
        $stmt->execute();
        $breakdown_items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    $stmt = $db->prepare("
        SELECT
            p.PaymentDateTime as dateTime,
            CONCAT('Payment for S.Y. ', sy.YearName) as purpose,
            pm.MethodName as method,
            p.AmountPaid as cost,
            p.VerificationStatus as status
        FROM payment p
        JOIN transaction t ON p.TransactionID = t.TransactionID
        JOIN schoolyear sy ON t.SchoolYearID = sy.SchoolYearID
        JOIN paymentmethod pm ON p.PaymentMethodID = pm.PaymentMethodID
        WHERE t.StudentProfileID = :student_profile_id AND p.VerificationStatus = 'Verified'
        ORDER BY p.PaymentDateTime DESC
    ");
    $stmt->bindParam(':student_profile_id', $student_profile_id, PDO::PARAM_INT);
    $stmt->execute();
    $payment_history = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --- 6. Calculate Pay Analysis for the Current School Year ---
    $paid_percent = 0;
    $pending_percent = 0;
    $overdue_percent = 0;

    if ($current_transaction && $current_transaction['TotalAmount'] > 0) {
        $total = (float)$current_transaction['TotalAmount'];
        $paid = (float)$current_transaction['PaidAmount'];
        $balance = (float)$current_transaction['BalanceAmount'];
        $due_date = $current_transaction['DueDate'];

        $paid_percent = round(($paid / $total) * 100);

        if ($balance > 0) {
            if ($due_date && new DateTime($due_date) < new DateTime()) {
                $overdue_percent = round(($balance / $total) * 100);
            } else {
                $pending_percent = round(($balance / $total) * 100);
            }
        }
    }

    $pay_analysis = [
        ['name' => 'Paid', 'value' => $paid_percent],
        ['name' => 'Pending', 'value' => $pending_percent],
        ['name' => 'Overdue', 'value' => $overdue_percent]
    ];

    $balance_breakdown_data = [
        'breakdownItems' => $breakdown_items,
        'totalAmount'    => $current_transaction ? (float)$current_transaction['TotalAmount'] : 0.00,
        'paidAmount'     => $current_transaction ? (float)$current_transaction['PaidAmount'] : 0.00,
        'balanceAmount'  => $current_transaction ? (float)$current_transaction['BalanceAmount'] : 0.00
    ];

    $response_data = [
        'currentBalance'   => (float)$current_balance,
        'balanceBreakdown' => $balance_breakdown_data,
        'paymentHistory'   => $payment_history,
        'payAnalysis'      => $pay_analysis
    ];

    http_response_code(200);
    echo json_encode(['success' => true, 'data' => $response_data]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>