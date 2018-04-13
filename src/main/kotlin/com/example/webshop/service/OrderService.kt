package com.example.webshop.service

import com.example.webshop.entity.Order
import com.example.webshop.entity.OrderPosition
import com.example.webshop.repository.OrderRepository
import org.springframework.stereotype.Service

@Service
class OrderService(private val orderRepository: OrderRepository) {

    fun getOrders(): List<Order> {
        return orderRepository.findAll()
    }

    fun getOrderDetails(orderId: Long): Iterable<OrderPosition> {
        val order = orderRepository.findById(orderId) ?: throw NoSuchElementException("No order with id $orderId")
        return order.positions
    }
}
