package org.example.kioback.repository;

import org.example.kioback.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByItemName(String itemName);  // itemName으로 주문 조회

    @Query("SELECT o FROM Order o WHERE o.price > ?1")
    List<Order> findOrdersByPriceGreaterThan(int price);  // 가격이 특정 금액보다 큰 주문 조회
}
