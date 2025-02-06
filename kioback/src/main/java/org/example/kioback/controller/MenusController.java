package org.example.kioback.controller;


import org.example.kioback.entity.Menu;
import org.example.kioback.repository.MenuRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenusController {
    private final MenuRepository menuRepository;

    public MenusController(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @GetMapping
    public List<Menu> getAllMenus() {return menuRepository.findAll();}
}
