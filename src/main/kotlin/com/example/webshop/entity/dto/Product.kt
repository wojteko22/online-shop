package com.example.webshop.entity.dto

class ProductDto(
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
        val categoryId: Long,
        val shopId: Long
)

class UpdateProductDto(
        val id: Long,
        val name: String?,
        val price: Int?,
        val unit: String?,
        val status: String?,
        val description: String?,
        val photo: String?  ,
        val categoryId: Long?,
        val shopId: Long?
)

class DeleteProductDto(
        val id: Long
)