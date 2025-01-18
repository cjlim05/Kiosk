package org.example.kioback.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String username;
    private String password;
}


//cf) dto(data transfer object) 프론틍에서 전달된 데이터를 백엔드로 매핑하기 위한 클래스이다.
// JSON으로 보낸 데이터를 Spring이 처리하기 위해 사용하기 위해 테이터 구조를 정의