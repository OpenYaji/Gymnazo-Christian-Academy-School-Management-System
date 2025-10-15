<?php
class Admission {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function create($data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO admission_applications (
                tracking_number, enrollee_type, student_first_name, student_last_name,
                birthdate, gender, address, contact_number, email_address,
                guardian_first_name, guardian_last_name, relationship,
                guardian_contact, guardian_email, grade_level, previous_school,
                privacy_agreement, application_status, submitted_at
            ) VALUES (
                :tracking_number, :enrollee_type, :student_first_name, :student_last_name,
                :birthdate, :gender, :address, :contact_number, :email_address,
                :guardian_first_name, :guardian_last_name, :relationship,
                :guardian_contact, :guardian_email, :grade_level, :previous_school,
                :privacy_agreement, 'pending', NOW()
            )
        ");
        
        $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }
    
    public function findByTrackingNumber($trackingNumber) {
        $stmt = $this->pdo->prepare("
            SELECT 
                tracking_number, 
                CONCAT(student_first_name, ' ', student_last_name) as student_name,
                grade_level,
                application_status,
                submitted_at,
                updated_at
            FROM admission_applications 
            WHERE tracking_number = :tracking_number
        ");
        
        $stmt->execute([':tracking_number' => $trackingNumber]);
        return $stmt->fetch();
    }
    
    public function addDocument($applicationId, $documentType, $fileName, $filePath) {
        $stmt = $this->pdo->prepare("
            INSERT INTO admission_documents (
                application_id, document_type, file_name, file_path, uploaded_at
            ) VALUES (
                :application_id, :document_type, :file_name, :file_path, NOW()
            )
        ");
        
        return $stmt->execute([
            ':application_id' => $applicationId,
            ':document_type' => $documentType,
            ':file_name' => $fileName,
            ':file_path' => $filePath
        ]);
    }
    
    public function getAll($limit = 50, $offset = 0) {
        $stmt = $this->pdo->prepare("
            SELECT 
                id,
                tracking_number,
                CONCAT(student_first_name, ' ', student_last_name) as student_name,
                grade_level,
                application_status,
                submitted_at
            FROM admission_applications
            ORDER BY submitted_at DESC
            LIMIT :limit OFFSET :offset
        ");
        
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    public function updateStatus($id, $status) {
        $stmt = $this->pdo->prepare("
            UPDATE admission_applications 
            SET application_status = :status, updated_at = NOW()
            WHERE id = :id
        ");
        
        return $stmt->execute([
            ':status' => $status,
            ':id' => $id
        ]);
    }
}
?>