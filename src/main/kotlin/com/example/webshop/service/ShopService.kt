package com.example.webshop.service

import com.example.webshop.entity.dto.ShopDto
import com.example.webshop.repository.ShopRepository
import org.springframework.stereotype.Service

@Service
class ShopService(private val shopRepository: ShopRepository) {

    fun getShops(): List<ShopDto> {
        return shopRepository.findAll().map { it.toDto() }
    }
}