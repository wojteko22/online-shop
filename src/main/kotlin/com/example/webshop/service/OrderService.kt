package com.example.webshop.service

import com.example.webshop.entity.Order
import com.example.webshop.entity.OrderPosition
import com.example.webshop.repository.OrderPositionRepository
import com.example.webshop.repository.OrderRepository
import com.example.webshop.repository.ShopRepository
import org.springframework.stereotype.Service

@Service
class OrderService(
        private val orderRepository: OrderRepository,
        private val orderPositionRepository: OrderPositionRepository,
        private val shopRepository: ShopRepository

) {

    fun getOrders(email: String): Iterable<Order> {
        val shop = shopRepository.findByUserEmail(email)
                ?: throw NoSuchElementException("No shop owned by user with email $email")
        return orderRepository.findByShop(shop)
    }

    fun getOrderDetails(orderId: Long): Iterable<OrderPosition> = orderPositionRepository.findByOrderId(orderId)
}
