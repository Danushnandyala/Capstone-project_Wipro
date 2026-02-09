package com.manage.service;

import com.manage.model.*;
import com.manage.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public String placeOrder(com.manage.dto.OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new com.manage.exception.ResourceNotFoundException("User not found!"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PLACED");
        order.setPayment_status("PENDING");
        order.setOrder_date(LocalDateTime.now());

        double totalAmount = 0;

        // Save order first to get ID (if needed, but we can save last due to
        // cascading?)
        // Actually best to save Order first, then Items.
        order = orderRepository.save(order);

        for (com.manage.dto.OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new com.manage.exception.ResourceNotFoundException(
                            "Product not found: " + itemRequest.getProductId()));

            if (product.getStock_quantity() < itemRequest.getQuantity()) {
                throw new RuntimeException("Insufficient stock for: " + product.getName());
            }

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            orderItemRepository.save(item);

            product.setStock_quantity(product.getStock_quantity() - itemRequest.getQuantity());
            productRepository.save(product);

            totalAmount += product.getPrice() * itemRequest.getQuantity();
        }

        order.setTotal_amount(totalAmount);
        orderRepository.save(order);

        return "Order placed successfully! Order ID: " + order.getOrder_id();
    }

    public java.util.List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public java.util.List<Order> getOrdersByUser(Integer userId) {
        return orderRepository.findOrdersByUserId(userId);
    }

    public Order updateStatus(Integer orderId, String status, String paymentStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new com.manage.exception.ResourceNotFoundException("Order not found!"));

        if (status != null && !status.isEmpty())
            order.setStatus(status);
        if (paymentStatus != null && !paymentStatus.isEmpty())
            order.setPayment_status(paymentStatus);

        return orderRepository.save(order);
    }
}