package com.example.webshop.rest

import com.example.webshop.service.OrderService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping("/orders")
class OrderController(private val orderService: OrderService) {

    @GetMapping
    fun getOrders(principal: Principal) = orderService.getOrders(principal.name)

    @GetMapping("/{id}")
    fun getOrderDetails(@PathVariable id: Long) = orderService.getOrderDetails(id)
}
