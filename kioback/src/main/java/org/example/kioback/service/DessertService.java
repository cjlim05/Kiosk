package org.example.kioback.service;


import org.example.kioback.entity.Dessert;
import org.example.kioback.repository.DessertRepository;

import java.util.List;

public class DessertService {
    private final DessertRepository dessertRepository;

    public DessertService(DessertRepository coffeeRepository) {
        this.dessertRepository = coffeeRepository;
    }

    public List<Dessert> getAllCoffees() {
        return dessertRepository.findAll();
    }
}
