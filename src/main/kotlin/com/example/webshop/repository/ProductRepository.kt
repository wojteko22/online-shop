package com.example.webshop.repository

import com.example.webshop.entity.Category
import com.example.webshop.entity.Product
import com.example.webshop.entity.Shop
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ProductRepository : JpaRepository<Product, Long> {
    fun findByShop(shop: Shop): List<Product>
    fun findById(id: Long): Product?
    fun findByCategory(category: Category): List<Product>
    fun findByCategory(category: Category, pageable: Pageable): List<Product>
    fun countByCategory(category: Category) : Int
    @Query(value = "SELECT p FROM Product p WHERE p.shop = :shop AND LOWER(p.name) LIKE CONCAT('%', LOWER(:pattern),'%')")
    fun findByShopAndPattern(@Param("shop") shop: Shop, @Param("pattern") pattern: String): List<Product>
}
