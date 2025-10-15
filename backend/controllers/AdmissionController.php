<?php
require_once __DIR__ . '/../models/Admission.php';

class AdmissionController {
    private $pdo;
    private $admissionModel;
    private $uploadDir = __DIR__ . '/../uploads/admission_documents/';
    private $allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    private $maxFileSize = 5242880;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
        $this->admissionModel = new Admission($pdo);
        $this->ensureUploadDirectory();
    }
    
    private function ensureUploadDirectory() {
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }
    
    // Sanitize input
    private function sanitize($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }
    
    // Validate email
    private function isValidEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
    
    // Validate Philippine phone number
    private function isValidPhoneNumber($phone) {
        $pattern = '/^(09|\+639)\d{9}$/';
        return preg_match($pattern, str_replace([' ', '-', '(', ')'], '', $phone));
    }
    
    // Generate tracking number
    private function generateTrackingNumber() {
        $year = date('Y');
        $randomNum = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        return "GCA-{$year}-{$randomNum}";
    }
    
    // Validate admission data
    private function validate($data) {
        $errors = [];
        
        // Student validation
        if (empty($data['enrolleeType'])) $errors[] = "Enrollee type is required";
        if (empty($data['studentFirstName']) || strlen($data['studentFirstName']) < 2) {
            $errors[] = "Valid student first name is required";
        }
        if (empty($data['studentLastName']) || strlen($data['studentLastName']) < 2) {
            $errors[] = "Valid student last name is required";
        }
        
        if (empty($data['birthdate'])) {
            $errors[] = "Birthdate is required";
        } else {
            $birthDate = new DateTime($data['birthdate']);
            $today = new DateTime();
            $age = $today->diff($birthDate)->y;
            if ($age < 3 || $age > 20) {
                $errors[] = "Student age must be between 3 and 20 years";
            }
        }
        
        if (empty($data['gender'])) $errors[] = "Gender is required";
        if (empty($data['address'])) $errors[] = "Address is required";
        
        if (empty($data['contactNumber']) || !$this->isValidPhoneNumber($data['contactNumber'])) {
            $errors[] = "Valid contact number is required (Philippine format)";
        }
        
        if (!empty($data['emailAddress']) && !$this->isValidEmail($data['emailAddress'])) {
            $errors[] = "Valid email address is required";
        }
        
        // Guardian validation
        if (empty($data['guardianFirstName'])) $errors[] = "Guardian first name is required";
        if (empty($data['guardianLastName'])) $errors[] = "Guardian last name is required";
        if (empty($data['relationship'])) $errors[] = "Relationship to student is required";
        
        if (empty($data['guardianContact']) || !$this->isValidPhoneNumber($data['guardianContact'])) {
            $errors[] = "Valid guardian contact number is required";
        }
        
        if (!empty($data['guardianEmail']) && !$this->isValidEmail($data['guardianEmail'])) {
            $errors[] = "Valid guardian email is required";
        }
        
        // Academic validation
        if (empty($data['gradeLevel'])) $errors[] = "Grade level is required";
        
        // Privacy agreement
        if (empty($data['privacyAgreement']) || $data['privacyAgreement'] !== 'agreed') {
            $errors[] = "You must agree to the Privacy Policy";
        }
        
        return $errors;
    }
    
    // Handle file upload
    private function handleFileUpload($file, $studentId, $documentType) {
        if (!isset($file) || $file['error'] === UPLOAD_ERR_NO_FILE) {
            return null;
        }
        
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new Exception("File upload error: " . $file['error']);
        }
        
        if ($file['size'] > $this->maxFileSize) {
            throw new Exception("File size exceeds 5MB limit");
        }
        
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
        
        if (!in_array($mimeType, $this->allowedFileTypes)) {
            throw new Exception("Invalid file type. Only PDF, JPG, JPEG, and PNG allowed");
        }
        
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = $studentId . '_' . $documentType . '_' . time() . '.' . $fileExtension;
        $filePath = $this->uploadDir . $fileName;
        
        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            throw new Exception("Failed to move uploaded file");
        }
        
        return $fileName;
    }
    
    // Submit admission application
    public function submitApplication($postData, $files = []) {
        try {
            $this->pdo->beginTransaction();
            
            // Validate data
            $errors = $this->validate($postData);
            if (!empty($errors)) {
                throw new Exception(implode(", ", $errors));
            }
            
            // Generate tracking number
            $trackingNumber = $this->generateTrackingNumber();
            
            // Prepare data for insertion
            $data = [
                ':tracking_number' => $trackingNumber,
                ':enrollee_type' => $this->sanitize($postData['enrolleeType']),
                ':student_first_name' => $this->sanitize($postData['studentFirstName']),
                ':student_last_name' => $this->sanitize($postData['studentLastName']),
                ':birthdate' => $postData['birthdate'],
                ':gender' => $this->sanitize($postData['gender']),
                ':address' => $this->sanitize($postData['address']),
                ':contact_number' => $this->sanitize($postData['contactNumber']),
                ':email_address' => $this->sanitize($postData['emailAddress'] ?? ''),
                ':guardian_first_name' => $this->sanitize($postData['guardianFirstName']),
                ':guardian_last_name' => $this->sanitize($postData['guardianLastName']),
                ':relationship' => $this->sanitize($postData['relationship']),
                ':guardian_contact' => $this->sanitize($postData['guardianContact']),
                ':guardian_email' => $this->sanitize($postData['guardianEmail'] ?? ''),
                ':grade_level' => $this->sanitize($postData['gradeLevel']),
                ':previous_school' => $this->sanitize($postData['previousSchool'] ?? ''),
                ':privacy_agreement' => 1
            ];
            
            // Insert application
            $applicationId = $this->admissionModel->create($data);
            
            // Handle file uploads if any
            if (!empty($files)) {
                $this->processDocuments($files, $applicationId, $trackingNumber);
            }
            
            $this->pdo->commit();
            
            return [
                'success' => true,
                'message' => 'Application submitted successfully',
                'tracking_number' => $trackingNumber,
                'application_id' => $applicationId
            ];
            
        } catch (Exception $e) {
            $this->pdo->rollBack();
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }
    
    // Process document uploads
    private function processDocuments($files, $applicationId, $trackingNumber) {
        $documentTypes = [
            'reportCard' => 'Report Card',
            'goodMoral' => 'Good Moral Certificate',
            'birthCertificate' => 'Birth Certificate',
            'certificateOfCompletion' => 'Certificate of Completion',
            'sf10Form137' => 'SF10 Form 137'
        ];
        
        foreach ($documentTypes as $key => $label) {
            if (isset($files[$key]) && $files[$key]['error'] !== UPLOAD_ERR_NO_FILE) {
                try {
                    $fileName = $this->handleFileUpload($files[$key], $trackingNumber, $key);
                    
                    if ($fileName) {
                        $this->admissionModel->addDocument(
                            $applicationId,
                            $label,
                            $fileName,
                            $this->uploadDir . $fileName
                        );
                    }
                } catch (Exception $e) {
                    error_log("Document upload error for {$key}: " . $e->getMessage());
                }
            }
        }
    }
    
    // Check application status
    public function checkStatus($trackingNumber) {
        return $this->admissionModel->findByTrackingNumber($trackingNumber);
    }
    
    // Get grade levels
    public function getGradeLevels() {
        return [
            'pre-elem' => 'Pre-Elem',
            'kinder' => 'Kinder',
            'grade1' => 'Grade 1',
            'grade2' => 'Grade 2',
            'grade3' => 'Grade 3',
            'grade4' => 'Grade 4',
            'grade5' => 'Grade 5',
            'grade6' => 'Grade 6'
        ];
    }
}
?>