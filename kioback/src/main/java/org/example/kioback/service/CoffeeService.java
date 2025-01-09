package org.example.kioback.service;

import org.example.kioback.entity.Coffee;
import org.example.kioback.repository.CoffeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CoffeeService {

    private final CoffeeRepository coffeeRepository;

    public CoffeeService(CoffeeRepository coffeeRepository) {
        this.coffeeRepository = coffeeRepository;
    }

    public List<Coffee> getAllCoffees() {
        return coffeeRepository.findAll();
    }
}
