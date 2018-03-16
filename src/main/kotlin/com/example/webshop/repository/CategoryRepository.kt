package com.example.webshop.repository

import com.example.webshop.entity.Category
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryRepository : JpaRepository<Category, Long> {
    fun findByParentCategoryIsNull(): List<Category>
}