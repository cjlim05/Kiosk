package org.example.kioback.repository;

import org.example.kioback.entity.Store;
import org.example.kioback.service.StoresService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

public interface StoresRepository extends JpaRepository<Store, Long> {
}
