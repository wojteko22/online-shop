package com.example.webshop.entity

import com.example.webshop.entity.dto.ProductDto
import javax.persistence.*

@Entity
@Table(name = "products")
data class Product(
        var name: String,
        var price: Int,
        var unit: String,
        var status: String?,
        @Column(length = 65536)
        var description: String?,
        var photo: String?,
        @ManyToOne
        var category: Category,
        @ManyToOne
        val shop: Shop,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1) {

    fun toDto(): ProductDto {
        return ProductDto(name,price,unit,status,description,photo,category.id,shop.id)
    }
}