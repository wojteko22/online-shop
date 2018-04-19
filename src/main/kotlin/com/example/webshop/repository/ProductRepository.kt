package com.example.webshop.repository

import com.example.webshop.entity.Product
import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface ProductRepository : JpaRepository<Product, Long> {
    fun findByShop(shop: Shop): List<Product>
    fun findById(id: Long): Product?
}
