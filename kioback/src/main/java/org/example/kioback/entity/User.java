package org.example.kioback.entity; // 패키지 선언 추가

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {

    @Id

    @Column(name = "tableNumber")
    private String tableNumber; // 테이블 번호
    @Column(name = "password")
    private String password;    // 비밀번호
}

// entity는 디비 테이블과 ""매핑"", 데이터베이스 테이블 구조를 자바객체로 변환하는 역할
