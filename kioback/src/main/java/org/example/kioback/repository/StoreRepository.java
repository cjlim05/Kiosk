package org.example.kioback.repository;

import org.example.kioback.entity.Coffee;
import org.example.kioback.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
