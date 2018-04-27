package com.example.webshop

import com.example.webshop.dto.*
import com.example.webshop.entity.*

fun OrderPosition.toDto() = OrderPositionDto(amount, product.toDto())
fun User.toDto(shop: Shop?) = UserDto(id, name, email, role.role, shop?.id)
fun Category.toSimpleDto() = CategorySimpleDto(name, id, parentCategory?.id)
fun Product.toDto() = ProductDto(id, name, price, unit, status, description, photo, category.id, shop.id)
fun Shop.toDto() = ShopDto(id, name, city, street, postCode)
