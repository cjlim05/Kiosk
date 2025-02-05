package org.example.kioback.controller;

import org.example.kioback.entity.Store;
import org.example.kioback.service.StoresService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/stores")
public class StoresController {
    private final StoresService storesService;

    public StoresController(StoresService storesService) {
        this.storesService = storesService;
    }

    @GetMapping("/{storeId}")
    public Optional<Store> getStore(@PathVariable Long storeId) {
        return storesService.getStoreById(storeId);
    }


}
