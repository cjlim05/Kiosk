package org.example.kioback.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SessionController {

    @GetMapping("/session")
    public Map<String, Object> checkSession(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        // 세션에서 로그인된 사용자 정보 확인
        Object user = session.getAttribute("user");

        if (user != null) {
            response.put("isLoggedIn", true);

            // 세션에서 즐겨찾기 목록 가져오기 (예시)
            List<Integer> favorites = (List<Integer>) session.getAttribute("favorites");
            response.put("favorites", favorites != null ? favorites : List.of());
        } else {
            response.put("isLoggedIn", false);
        }

        return response;
    }
}