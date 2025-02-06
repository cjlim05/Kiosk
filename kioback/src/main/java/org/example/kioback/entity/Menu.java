package org.example.kioback.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menu_id;

    private Long store_id;
    private String category;

    private String menu_name;
    private String description;
    private double price;
    private String imagefile;


}
