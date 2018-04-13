package com.example.webshop.rest

import com.example.webshop.service.OrderService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/orders")
class OrderController(private val orderService: OrderService) {

    @GetMapping
    fun getOrders() = orderService.getOrders()

    @GetMapping("/{id}")
    fun getOrderDetails(@PathVariable id: Long) = orderService.getOrderDetails(id)
}
