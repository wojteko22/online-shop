package com.example.webshop.rest

import com.example.webshop.entity.dto.ShopDto
import com.example.webshop.service.ShopService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/shops")
class ShopController(private val shopService: ShopService) {

    @GetMapping
    fun findAll(): Iterable<ShopDto> = shopService.getShops()

    @GetMapping("/{shopId}")
    fun findById(@PathVariable shopId: Long)= shopService.getById(shopId)
}
