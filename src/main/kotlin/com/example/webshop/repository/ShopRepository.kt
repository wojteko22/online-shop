package com.example.webshop.repository

import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import org.springframework.data.repository.CrudRepository

interface ShopRepository : CrudRepository<Shop, Long> {
    fun findById(shopId: Long): Shop?
    fun findByUser(user: User) : Shop?
    fun findByUserEmail(email: String): Shop?

    fun getByUserEmail(email: String) = findByUserEmail(email)
            ?: throw NoSuchElementException("No shop owned by user with email $email")
}
