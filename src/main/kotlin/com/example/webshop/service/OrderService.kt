package com.example.webshop.service

import com.example.webshop.dto.CreateOrderDto
import com.example.webshop.entity.Order
import com.example.webshop.dto.OrderPositionDto
import com.example.webshop.dto.UpdateOrderDto
import com.example.webshop.entity.OrderPosition
import com.example.webshop.repository.*
import org.springframework.stereotype.Service

@Service
class OrderService(
        private val orderRepository: OrderRepository,
        private val orderPositionRepository: OrderPositionRepository,
        private val shopRepository: ShopRepository,
        private val userRepository: UserRepository,
        private val productRepository: ProductRepository

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

    fun addOrder(dto: CreateOrderDto) {
        val shop = shopRepository.findById(dto.shopId)
        val user = userRepository.findById(dto.userId)
        val order = Order("przyjęte", orderRepository.count() + 1, shop = shop!!, user = user!!)
        orderRepository.save(order)

        for (orderPositionDto in dto.orderPositionsDto) {
            val product = productRepository.findById(orderPositionDto.productId)
            val orderPosition = OrderPosition(order, product!!, orderPositionDto.amount)
            orderPositionRepository.save(orderPosition)
        }
    }
}
