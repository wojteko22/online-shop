package com.example.webshop.repository

import com.example.webshop.entity.Order
import com.example.webshop.entity.Shop
import org.springframework.data.jpa.repository.JpaRepository

interface OrderRepository : JpaRepository<Order, Long> {
    fun findByShop(shop: Shop): Iterable<Order>
}
