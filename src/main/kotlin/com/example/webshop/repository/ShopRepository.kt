package com.example.webshop.repository

import com.example.webshop.entity.Shop
import org.springframework.data.repository.CrudRepository

interface ShopRepository : CrudRepository<Shop, Long> {
    fun findById(shopId: Long): Shop?
}
