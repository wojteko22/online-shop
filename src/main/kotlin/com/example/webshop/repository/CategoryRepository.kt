package com.example.webshop.repository

import com.example.webshop.entity.Category
import com.example.webshop.entity.Shop
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryRepository : JpaRepository<Category, Long> {
    fun findByParentCategoryIsNull(): Iterable<Category>
    fun findById(id: Long): Category
    fun findByShopAndParentCategoryIsNull(shop: Shop) : Iterable<Category>
}