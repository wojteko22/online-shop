package com.example.webshop.service

import com.example.webshop.entity.Order
import com.example.webshop.entity.OrderPosition
import com.example.webshop.repository.OrderPositionRepository
import com.example.webshop.repository.OrderRepository
import org.springframework.stereotype.Service

@Service
class OrderService(
        private val orderRepository: OrderRepository,
        private val orderPositionRepository: OrderPositionRepository
) {

    fun getOrders(): List<Order> = orderRepository.findAll()

    fun getOrderDetails(orderId: Long): Iterable<OrderPosition> = orderPositionRepository.findByOrderId(orderId)
}
