package org.example.kioback.controller;

import org.example.kioback.dto.LoginRequest;
import org.example.kioback.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // 로그인 검증 서비스 호출
        boolean isValidUser = userService.validateUser(username, password);

        if (isValidUser) {
            return ResponseEntity.ok().body(Map.of("message", "로그인 성공!"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "잘못된 테이블 번호 또는 비밀번호"));
        }
    }
}
