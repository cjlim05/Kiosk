package org.example.kioback.service;

import org.example.kioback.entity.Menu;
import org.example.kioback.repository.MenuRepository;

import java.util.List;

public class MenuService {
    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<Menu> getAllCoffees() {
        return menuRepository.findAll();
    }
}
