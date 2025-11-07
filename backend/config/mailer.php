<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

class Mailer
{
    private $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);

        try {
            // Server settings
            $this->mail->isSMTP();
            $this->mail->Host       = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
            $this->mail->SMTPAuth   = true;
            $this->mail->Username   = getenv('SMTP_USERNAME') ?: 'johnreybisnarcalipes@gmail.com'; // TODO: Change this
            $this->mail->Password   = getenv('SMTP_PASSWORD') ?: 'iljb mmag gmsl mvnk';     // TODO: Change this (use App Password)
            $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mail->Port       = getenv('SMTP_PORT') ?: 587;

            // Default sender
            $this->mail->setFrom(
                getenv('SMTP_FROM_EMAIL') ?: 'johnreybisnarcalipes@gmail.com',
                getenv('SMTP_FROM_NAME') ?: 'Gymnazu School'
            );
        } catch (Exception $e) {
            // Silent fail
        }
    }

    public function sendPasswordResetEmail($recipientEmail, $recipientName, $resetToken)
    {
        try {
            // Clear any previous recipients
            $this->mail->clearAddresses();
            $this->mail->addAddress($recipientEmail, $recipientName);

            $this->mail->isHTML(true);
            $this->mail->Subject = 'Password Reset Request - Gymnazu School';

            // Update this URL to match your frontend URL
            $baseUrl = getenv('APP_URL') ?: 'http://localhost:5173';
            $resetLink = $baseUrl . '/reset-password?token=' . $resetToken;

            $this->mail->Body = $this->getPasswordResetTemplate($recipientName, $resetLink);
            $this->mail->AltBody = "Hello {$recipientName},\n\nYou requested to reset your password. Click the link below to reset it:\n\n{$resetLink}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.";

            $this->mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    private function getPasswordResetTemplate($name, $resetLink)
    {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f59e0b; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 30px; }
                .button { display: inline-block; padding: 12px 30px; background-color: #f59e0b; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Password Reset Request</h1>
                </div>
                <div class='content'>
                    <p>Hello <strong>{$name}</strong>,</p>
                    <p>You have requested to reset your password for your Gymnazu School student account.</p>
                    <p>Click the button below to reset your password:</p>
                    <center>
                        <a href='{$resetLink}' class='button'>Reset Password</a>
                    </center>
                    <p><strong>This link will expire in 1 hour.</strong></p>
                    <p>If you didn't request this password reset, please ignore this email or contact the school office if you have concerns.</p>
                </div>
                <div class='footer'>
                    <p>&copy; 2025 Gymnazu School. All rights reserved.</p>
                    <p>This is an automated email, please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
}
