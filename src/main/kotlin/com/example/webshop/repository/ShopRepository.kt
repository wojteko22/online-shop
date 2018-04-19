package com.example.webshop.repository

import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import org.springframework.data.repository.CrudRepository

interface ShopRepository : CrudRepository<Shop, Long> {
    fun findById(shopId: Long): Shop?
    fun findByName(name : String) : Shop?
    fun findByUser(user: User) : Shop?
}
