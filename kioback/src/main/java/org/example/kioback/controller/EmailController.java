package org.example.kioback.controller;

import org.example.kioback.dto.EmailRequest;
import org.example.kioback.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")  // 경로가 정확한지 확인
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest.getEmail());
        return "Email sent successfully!";
    }
}