<?php

class Transaction {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Get student profile ID by user ID
     */
    public function getStudentProfileIdByUserId($userId) {
        $query = "
            SELECT sp.StudentProfileID 
            FROM studentprofile sp 
            JOIN profile p ON sp.ProfileID = p.ProfileID 
            WHERE p.UserID = :user_id
        ";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result ? $result['StudentProfileID'] : null;
        } catch (PDOException $e) {
            error_log("Error in getStudentProfileIdByUserId: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Get total unpaid balance for a student
     */
    public function getTotalBalance($studentProfileId) {
        $query = "
            SELECT SUM(t.BalanceAmount) as totalBalance
            FROM transaction t
            JOIN TransactionStatus ts ON t.TransactionStatusID = ts.StatusID
            WHERE t.StudentProfileID = :student_profile_id AND ts.StatusName != 'Paid'
        ";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':student_profile_id', $studentProfileId, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['totalBalance'] ?? 0.00;
        } catch (PDOException $e) {
            error_log("Error in getTotalBalance: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Get current transaction for active school year
     */
    public function getCurrentTransaction($studentProfileId) {
        $query = "
            SELECT t.TransactionID, t.TotalAmount, t.PaidAmount, t.BalanceAmount, t.DueDate
            FROM transaction t
            JOIN schoolyear sy ON t.SchoolYearID = sy.SchoolYearID
            WHERE t.StudentProfileID = :student_profile_id AND sy.IsActive = 1
            LIMIT 1
        ";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':student_profile_id', $studentProfileId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error in getCurrentTransaction: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Get transaction item breakdown
     */
    public function getTransactionItems($transactionId) {
        $query = "
            SELECT ti.Description as description, SUM(ti.Amount) as amount
            FROM transactionitem ti
            WHERE ti.TransactionID = :transaction_id
            GROUP BY ti.Description
        ";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':transaction_id', $transactionId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error in getTransactionItems: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Get payment history for a student
     */
    public function getPaymentHistory($studentProfileId) {
        $query = "
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
        ";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':student_profile_id', $studentProfileId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error in getPaymentHistory: " . $e->getMessage());
            return false;
        }
    }
}

?>