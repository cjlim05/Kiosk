package org.example.kioback.controller;

import org.example.kioback.dto.EmailRequest;
import org.example.kioback.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/api/send-email")
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

   @PostMapping("/api/verify-code")
   public ResponseEntity<String> verifyCode(@RequestBody Map<String, String> request) {
       String email = request.get("email");
       String code = request.get("code");

       if (email == null || code == null) {
           return ResponseEntity.badRequest().body("이메일 또는 인증번호가 누락되었습니다.");
       }

       boolean isValid = emailService.verifyCode(email, code);

       if (isValid) {
           return ResponseEntity.ok("인증에 성공했습니다.");
       } else {
           return ResponseEntity.badRequest().body("인증번호가 유효하지 않거나 만료되었습니다.");
       }
   }
}
