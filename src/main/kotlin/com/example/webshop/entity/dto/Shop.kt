package com.example.webshop.entity.dto

class CreateShopDto(
        val name: String,
        val city: String,
        val street: String,
        val postCode: String
)

class CreateShopWithOwnerDto(
        val shop: CreateShopDto,
        val owner: CreateUserDto
)

class ShopDto(
        val id: Long,
        val name: String,
        val city: String,
        val street: String,
        val postCode: String)