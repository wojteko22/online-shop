package com.example.webshop.dto

class ProductDto(
        val id: Long,
        val name: String,
        val price: Int,
        val unit: String,
        val status: String?,
        val description: String?,
        val photo: String?  ,
        val categoryId: Long,
        val shopId: Long
)

class CreateProductDto(
        val name: String,
        val price: Int,
        val unit: String,
        val status: String?,
        val description: String?,
        val photo: String?  ,
        val categoryId: Long
)

class UpdateProductDto(
        val name: String?,
        val price: Int?,
        val unit: String?,
        val status: String?,
        val description: String?,
        val photo: String?  ,
        val categoryId: Long?,
        val shopId: Long?
)
