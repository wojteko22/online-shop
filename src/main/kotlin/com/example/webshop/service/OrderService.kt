package com.example.webshop.service

import com.example.webshop.entity.Order
import com.example.webshop.repository.OrderRepository
import org.springframework.stereotype.Service

@Service
class OrderService(private val orderRepository: OrderRepository) {

    fun getOrders(): List<Order> {
        return orderRepository.findAll()
    }
}
