package org.example.kioback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    private final Map<String, VerificationCode> verificationCodes = new HashMap<>();

    @Autowired
    private TemplateEngine templateEngine;

    // 이메일 전송 및 인증번호 저장
    public void sendEmail(String email) throws MessagingException {
        String code = createCode(); // 인증번호 생성
        long createdAt = System.currentTimeMillis(); // 생성 시간 기록

        // 인증번호 저장
        verificationCodes.put(email, new VerificationCode(code, createdAt));

        // HTML 템플릿에 값을 전달하기 위한 Context 생성
        Context context = new Context();
        context.setVariable("code", code);

        // HTML 템플릿 처리
        String htmlContent = templateEngine.process("mail", context);

        // MimeMessage 생성
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // 이메일 설정
        helper.setTo(email);
        helper.setSubject("이메일 인증 코드");
        helper.setText(htmlContent, true); // HTML을 메일 본문으로 설정

        // 이메일 전송
        javaMailSender.send(mimeMessage);
    }

    // 인증번호 확인
    public boolean verifyCode(String email, String code) {
        if (!verificationCodes.containsKey(email)) {
            return false; // 이메일이 저장되지 않았으면 실패
        }

        VerificationCode storedCode = verificationCodes.get(email);

        // 5분 이내 유효성 확인
        long now = System.currentTimeMillis();
        if ((now - storedCode.getCreatedAt()) > 5 * 60 * 1000) {
            verificationCodes.remove(email); // 만료된 코드 삭제
            return false; // 인증번호 만료
        }

        // 인증번호 일치 확인
        return storedCode.getCode().equals(code);
    }

    // 인증번호 생성
    private String createCode() {
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for (int i = 0; i < 6; i++) { // 6자리 숫자로 제한
            key.append(random.nextInt(10));
        }
        return key.toString();
    }

    // 인증번호 및 생성시간 저장 클래스
    private static class VerificationCode {
        private final String code;
        private final long createdAt;

        public VerificationCode(String code, long createdAt) {
            this.code = code;
            this.createdAt = createdAt;
        }

        public String getCode() {
            return code;
        }

        public long getCreatedAt() {
            return createdAt;
        }
    }
}
