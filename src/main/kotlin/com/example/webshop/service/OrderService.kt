package com.example.webshop.service

import com.example.webshop.dto.CreateOrderDto
import com.example.webshop.dto.OrderPositionDto
import com.example.webshop.dto.UpdateOrderDto
import com.example.webshop.entity.Order
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

    fun getOrders(shopId: Long): Iterable<Order> {
        val shop = shopRepository.findById(shopId) ?: throw NoSuchElementException("No shop with id $shopId")
        return orderRepository.findByShop(shop)
    }

    fun getOrderDetails(orderId: Long, shopId: Long): Iterable<OrderPositionDto> {
        checkedOrder(orderId, shopId)
        return orderPositionRepository.findByOrderId(orderId).map { it.toDto() }
    }

    fun update(orderId: Long, dto: UpdateOrderDto, shopId: Long) {
        val order = checkedOrder(orderId, shopId)
        val updatedOrder = order.copy(status = dto.status)
        orderRepository.save(updatedOrder)
    }

    private fun checkedOrder(orderId: Long, shopId: Long): Order {
        val order = order(orderId)
        if (order.shop.id != shopId) {
            orderLackError(orderId)
        }
        return order
    }

    private fun order(id: Long) = orderRepository.findById(id) ?: orderLackError(id)

    private fun orderLackError(id: Long): Nothing = throw NoSuchElementException("No order with id $id")

    fun addOrder(dto: CreateOrderDto, shopId: Long) {
        val shop = shopRepository.findById(shopId) ?: throw NoSuchElementException("No shop with id $shopId")
        val userId = dto.userId
        val user = userRepository.findById(userId) ?: throw NoSuchElementException("No user with id $userId")
        val order = Order("przyjęte", shop, user)
        val savedOrder = orderRepository.save(order)

        for (orderPositionDto in dto.orderPositionsDto) {
            val productId = orderPositionDto.productId
            val product = productRepository.findById(productId) ?: errorLackOfProduct(productId)
            if (product.shop.id != shopId) {
                errorLackOfProduct(productId)
            }
            val orderPosition = OrderPosition(savedOrder, product, orderPositionDto.amount)
            orderPositionRepository.save(orderPosition)
        }
    }

    private fun errorLackOfProduct(productId: Long): Nothing =
            throw IllegalAccessException("No product with id $productId")
}
