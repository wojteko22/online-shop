package com.example.webshop.entity.dto

class CreateProductDto(
        val name: String,
        val price: Int,
        val unit: String,
        val status: String?,
        val description: String?,
        val photo: String?  ,
        val categoryId: Long,
        val shopId: Long
)