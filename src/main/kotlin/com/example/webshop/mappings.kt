package com.example.webshop

import com.example.webshop.entity.OrderPosition
import com.example.webshop.dto.OrderPositionDto

fun OrderPosition.toDto()= OrderPositionDto(amount, product.toDto())