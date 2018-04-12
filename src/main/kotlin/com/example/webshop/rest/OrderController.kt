package com.example.webshop.rest

import com.example.webshop.service.OrderService
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/orders")
class OrderController(private val orderService: OrderService) {

    @GetMapping()
    fun getOrders(principal: Principal) = orderService.getOrders()
}
