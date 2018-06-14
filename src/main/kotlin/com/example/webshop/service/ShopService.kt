package com.example.webshop.service

import com.example.webshop.dto.ShopDto
import com.example.webshop.repository.ShopRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class ShopService(private val shopRepository: ShopRepository) {

    fun getShops(): List<ShopDto> {
        return shopRepository.findAll().map { it.toDto() }
    }

    @Cacheable("shops", key = "shopId")
    fun getById(shopId: Long): ShopDto? {
        return shopRepository.findById(shopId)?.toDto()
    }
}