package com.manage.controller;

import com.manage.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<String> placeOrder(@RequestBody com.manage.dto.OrderRequest request) {
        try {
            String result = orderService.placeOrder(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public java.util.List<com.manage.model.Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public java.util.List<com.manage.model.Order> getOrdersByUser(@PathVariable("userId") Integer userId) {
        return orderService.getOrdersByUser(userId);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("id") Integer id,
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "paymentStatus", required = false) String paymentStatus) {
        try {
            return ResponseEntity.ok(orderService.updateStatus(id, status, paymentStatus));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}