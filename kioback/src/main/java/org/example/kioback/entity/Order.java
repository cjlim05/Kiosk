package org.example.kioback.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int username;
    @Column(name = "itemName")
    private String itemName;
    private int quantity;
    private int price;
}
