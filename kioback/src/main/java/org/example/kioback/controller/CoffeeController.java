package org.example.kioback.controller;

import org.example.kioback.entity.Coffee;
import org.example.kioback.repository.CoffeeRepository;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/coffee")
public class CoffeeController {

    private final CoffeeRepository coffeeRepository;

    public CoffeeController(CoffeeRepository coffeeRepository) {
        this.coffeeRepository = coffeeRepository;
    }

    @GetMapping
    public List<Coffee> getAllCoffees() {
        return coffeeRepository.findAll();
    }
}