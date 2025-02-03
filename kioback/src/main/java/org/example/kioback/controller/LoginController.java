package org.example.kioback.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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

    // 로그인 API (세션 생성)
    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        boolean isValidUser = userService.validateUser(username, password);

        if (isValidUser) {
            HttpSession session = request.getSession(true);
            session.setAttribute("user", username);
            return ResponseEntity.ok().body(Map.of("message", "로그인 성공!"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인 실패"));
        }
    }

    // 로그아웃 API (세션 삭제)
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().body(Map.of("message", "로그아웃 성공!"));
    }

    // 로그인 상태 확인 API
    @GetMapping("/status")
    public ResponseEntity<?> getSessionStatus(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            return ResponseEntity.ok().body(Map.of("loggedIn", true, "user", session.getAttribute("user")));
        } else {
            return ResponseEntity.ok().body(Map.of("loggedIn", false));
        }
    }
}