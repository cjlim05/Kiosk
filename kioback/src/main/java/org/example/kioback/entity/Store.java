package org.example.kioback.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "store") // 테이블 이름 명시
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long storeId; // store_id와 매핑

    @Column(name = "store_name", nullable = false, length = 255)
    private String storeName; // store_name과 매핑

    @Column(name = "city", length = 100)
    private String city; // city와 매핑

    @Column(name = "district", length = 100)
    private String district; // district와 매핑

    @Column(name = "neighborhood", length = 100)
    private String neighborhood; // neighborhood와 매핑

    @Column(name = "detail_address", columnDefinition = "TEXT")
    private String detailAddress; // detail_address와 매핑

    @Column(name = "postal_code", length = 10)
    private String postalCode; // postal_code와 매핑

    @Column(name = "phone_number", length = 15)
    private String phoneNumber; // phone_number와 매핑

    @Column(name = "category", length = 100)
    private String category; // category와 매핑

    @Column(name = "logoimg", length = 255)
    private String logoImg; // logoimg와 매핑
}