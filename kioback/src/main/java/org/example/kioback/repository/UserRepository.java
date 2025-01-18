package org.example.kioback.repository;

import org.example.kioback.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 테이블 번호로 사용자 조회
    User findByUsername(String username);
}

//entity와 상호작용하는 데이터베이스 액세스 계층,
//데이터 베이스와 통신, 객체를 저장 삭제 조회 등

//entity를 데이터베이스에 저장하거나 불러오는 작업을 담당합니다.
