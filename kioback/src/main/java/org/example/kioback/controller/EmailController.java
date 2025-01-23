package org.example.kioback.controller;

import org.example.kioback.dto.EmailRequest;
import org.example.kioback.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            // 이메일 주소만 서비스로 전달
            emailService.sendEmail(emailRequest.getEmail());
            return "Email sent successfully!";
        } catch (Exception e) {
            // 실패 시 처리
            return "Failed to send email: " + e.getMessage();
        }
    }
}
