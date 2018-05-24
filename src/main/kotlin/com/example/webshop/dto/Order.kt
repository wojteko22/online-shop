package com.example.webshop.dto

class OrderPositionDto(val amount: Int, val product: ProductDto)

class UpdateOrderDto(val status: String)

class CreateOrderPositionDto(val amount: Int, val productId: Long)

class CreateOrderDto(val userId: Long, val orderPositionsDto: Set<CreateOrderPositionDto>)