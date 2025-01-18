package org.example.kioback.service;

import org.example.kioback.entity.User;
import org.example.kioback.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository; // Repository를 주입받습니다.

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean validateUser(String username, String password) {
        // 데이터베이스에서 사용자 조회
        User user = userRepository.findByUsername(username);

        System.out.println(user.getPassword());
        if (user != null && user.getPassword().equals(password)) {
            return true; // 로그인 성공
        }
        return false; // 로그인 실패
    }
}


