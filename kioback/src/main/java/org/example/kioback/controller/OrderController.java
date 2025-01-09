package org.example.kioback.controller;

import org.example.kioback.entity.Order;
import org.example.kioback.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    // OrderRepository 주입
    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody List<Order> orders) {
        // 요청 받은 주문 데이터 로그 찍기
        orders.forEach(order -> System.out.println("Received order: " + order.getItemName()));

        // 주문 데이터 저장
        orderRepository.saveAll(orders);

        return ResponseEntity.ok("Order placed successfully!");
    }

    @GetMapping
    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }
}
