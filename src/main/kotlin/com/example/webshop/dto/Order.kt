package com.example.webshop.dto

class OrderPositionDto(val amount: Int, val product: ProductDto)

class UpdateOrderDto(val status: String)

class CreateOrderDto(val shopId: Long,val orderPositionsDto: Set<OrderPositionDto> )