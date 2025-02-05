package org.example.kioback.service;


import org.example.kioback.entity.Store;
import org.example.kioback.repository.StoresRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StoresService {

    private final StoresRepository storesRepository;

    public StoresService(StoresRepository storesRepository) {
        this.storesRepository = storesRepository;
    }

    public Optional<Store> getStoreById(Long id) {
        return storesRepository.findById(id);
    }
}
