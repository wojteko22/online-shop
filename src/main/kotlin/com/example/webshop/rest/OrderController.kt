package com.example.webshop.rest

import com.example.webshop.dto.CreateOrderDto
import com.example.webshop.dto.OrderPositionDto
import com.example.webshop.dto.UpdateOrderDto
import com.example.webshop.entity.Order
import com.example.webshop.security.Guard
import com.example.webshop.service.OrderService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("shops/{shopId}/orders")
class OrderController(private val orderService: OrderService, private val guard: Guard) {

    @GetMapping
    fun getOrders(@PathVariable shopId: Long, auth: OAuth2Authentication): Iterable<Order> {
        guard.checkShopId(shopId, auth)
        return orderService.getOrders(shopId)
    }

    @GetMapping("/{orderId}")
    fun getOrderDetails(
            @PathVariable shopId: Long,
            @PathVariable orderId: Long,
            auth: OAuth2Authentication
    ): Iterable<OrderPositionDto> {
        guard.checkShopId(shopId, auth)
        return orderService.getOrderDetails(orderId, shopId)
    }

    @PatchMapping("/{orderId}")
    fun update(
            @PathVariable shopId: Long,
            @PathVariable orderId: Long,
            @RequestBody dto: UpdateOrderDto,
            auth: OAuth2Authentication
    ) {
        guard.checkShopId(shopId, auth)
        orderService.update(orderId, dto, shopId)
    }

    @PostMapping
    fun addOrder(@PathVariable shopId: Long, @RequestBody dto: CreateOrderDto, auth: OAuth2Authentication) {
        guard.checkUserId(dto.userId, auth)
        orderService.addOrder(dto, shopId)
    }
}
