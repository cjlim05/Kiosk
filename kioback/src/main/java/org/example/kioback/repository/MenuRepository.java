package org.example.kioback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.example.kioback.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
