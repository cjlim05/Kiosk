package org.example.kioback.service;

import org.example.kioback.entity.Order;
import org.example.kioback.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // 주문 저장
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    // 모든 주문 조회
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}

