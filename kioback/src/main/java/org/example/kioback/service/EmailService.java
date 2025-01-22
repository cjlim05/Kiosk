package org.example.kioback.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to) {
        // 이메일 제목과 내용 고정
        String subject = "Test Subject";
        String text = "This is a test email body.";

        // 이메일 메시지 설정
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("your-email@example.com");  // 발신 이메일 주소

        // 이메일 발송
        javaMailSender.send(message);
    }
}