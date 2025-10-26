<?php

require_once __DIR__ . '/../models/Transaction.php';
require_once __DIR__ . '/../config/db.php';

class TransactionController {
    private $db;
    private $transaction;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        
        if (!$this->db) {
            $this->sendResponse(500, false, 'Database connection failed.');
            exit();
        }
        
        $this->transaction = new Transaction($this->db);
    }


    public function getTransactionData() {
        if (!isset($_SESSION['user_id'])) {
            $this->sendResponse(401, false, 'Not authenticated.');
            return;
        }

        $userId = $_SESSION['user_id'];

        $studentProfileId = $this->transaction->getStudentProfileIdByUserId($userId);

        if ($studentProfileId === false) {
            $this->sendResponse(500, false, 'Error fetching student profile.');
            return;
        }

        if (!$studentProfileId) {
            $this->sendResponse(404, false, 'Student profile not found.');
            return;
        }

        $currentBalance = $this->transaction->getTotalBalance($studentProfileId);
        if ($currentBalance === false) {
            $currentBalance = 0.00; 
        }

        $currentTransaction = $this->transaction->getCurrentTransaction($studentProfileId);
        if ($currentTransaction === false) {
            $currentTransaction = null; 
        }

        $breakdownItems = [];
        if ($currentTransaction) {
            $items = $this->transaction->getTransactionItems($currentTransaction['TransactionID']);
            if ($items !== false) {
                $breakdownItems = $items;
            }
        }

        $paymentHistory = $this->transaction->getPaymentHistory($studentProfileId);
        if ($paymentHistory === false) {
            $paymentHistory = [];
        }

        $payAnalysis = $this->calculatePayAnalysis($currentTransaction);

        $balanceBreakdown = [
            'breakdownItems' => $breakdownItems,
            'totalAmount'    => $currentTransaction ? (float)$currentTransaction['TotalAmount'] : 0.00,
            'paidAmount'     => $currentTransaction ? (float)$currentTransaction['PaidAmount'] : 0.00,
            'balanceAmount'  => $currentTransaction ? (float)$currentTransaction['BalanceAmount'] : 0.00
        ];

        $responseData = [
            'currentBalance'   => (float)$currentBalance,
            'balanceBreakdown' => $balanceBreakdown,
            'paymentHistory'   => $paymentHistory,
            'payAnalysis'      => $payAnalysis
        ];

        $this->sendResponse(200, true, 'Transaction data retrieved successfully.', [
            'data' => $responseData
        ]);
    }


    private function calculatePayAnalysis($currentTransaction) {
        $paidPercent = 0;
        $pendingPercent = 0;
        $overduePercent = 0;

        if ($currentTransaction && isset($currentTransaction['TotalAmount']) && $currentTransaction['TotalAmount'] > 0) {
            $total = (float)$currentTransaction['TotalAmount'];
            $paid = (float)($currentTransaction['PaidAmount'] ?? 0);
            $balance = (float)($currentTransaction['BalanceAmount'] ?? 0);
            $dueDate = $currentTransaction['DueDate'] ?? null;

            $paidPercent = round(($paid / $total) * 100);

            if ($balance > 0) {
                try {
                    if ($dueDate && new DateTime($dueDate) < new DateTime()) {
                        $overduePercent = round(($balance / $total) * 100);
                    } else {
                        $pendingPercent = round(($balance / $total) * 100);
                    }
                } catch (Exception $e) {
                    $pendingPercent = round(($balance / $total) * 100);
                }
            }
        }

        return [
            ['name' => 'Paid', 'value' => $paidPercent],
            ['name' => 'Pending', 'value' => $pendingPercent],
            ['name' => 'Overdue', 'value' => $overduePercent]
        ];
    }


    private function sendResponse($statusCode, $success, $message, $data = []) {
        http_response_code($statusCode);
        $response = [
            'success' => $success,
            'message' => $message
        ];
        
        if (!empty($data)) {
            $response = array_merge($response, $data);
        }
        
        echo json_encode($response);
    }
}

?>