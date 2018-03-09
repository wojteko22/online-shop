package com.example.webshop.rest

import com.example.webshop.entity.Shop
import com.example.webshop.repository.ShopRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/shops")
class ShopController(private val repository: ShopRepository) {

    @GetMapping
    fun findAll(): Iterable<Shop> = repository.findAll()
}
