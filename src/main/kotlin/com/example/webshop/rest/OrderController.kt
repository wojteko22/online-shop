package com.example.webshop.rest

import com.example.webshop.entity.dto.UpdateOrderDto
import com.example.webshop.service.OrderService
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/orders")
class OrderController(private val orderService: OrderService) {

    @GetMapping
    fun getOrders(principal: Principal) = orderService.getOrders(principal.name)

    @GetMapping("/{id}")
    fun getOrderDetails(@PathVariable id: Long) = orderService.getOrderDetails(id)

    @PatchMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody dto: UpdateOrderDto, principal: Principal) {
        orderService.update(id, dto, principal.name)
    }
}
