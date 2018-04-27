package com.example.webshop.service

import com.example.webshop.entity.Order
import com.example.webshop.entity.dto.OrderPositionDto
import com.example.webshop.entity.dto.UpdateOrderDto
import com.example.webshop.repository.OrderPositionRepository
import com.example.webshop.repository.OrderRepository
import com.example.webshop.repository.ShopRepository
import com.example.webshop.toDto
import org.springframework.stereotype.Service

@Service
class OrderService(
        private val orderRepository: OrderRepository,
        private val orderPositionRepository: OrderPositionRepository,
        private val shopRepository: ShopRepository

) {

    fun getOrders(email: String): Iterable<Order> {
        val shop = shopRepository.getByUserEmail(email)
        return orderRepository.findByShop(shop)
    }

    fun getOrderDetails(orderId: Long): Iterable<OrderPositionDto> = orderPositionRepository.findByOrderId(orderId)
            .map { it.toDto() }

    fun update(id: Long, dto: UpdateOrderDto, email: String) {
        val order = orderRepository.findById(id) ?: throw NoSuchElementException("No order with id $id")
        if (order.shop != shopRepository.findByUserEmail(email)) {
            throw NoSuchElementException("No order with id $id for user with email $email")
        }
        val updatedOrder = order.copy(status = dto.status)
        orderRepository.save(updatedOrder)
    }
}
