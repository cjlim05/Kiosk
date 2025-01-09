package org.example.kioback.controller;

import org.example.kioback.entity.Dessert;
import org.example.kioback.repository.DessertRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dessert")
public class DessertController {
    private DessertRepository dessertRepository;

    public DessertController(DessertRepository dessertRepository){
        this.dessertRepository = dessertRepository;
    }

    @GetMapping
    public List<Dessert> getAllDesserts() {return dessertRepository.findAll();}
}
