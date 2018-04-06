package com.example.webshop.entity

import javax.persistence.*

@Entity
@Table(name = "products")
data class Product(
        val name: String,
        val price: Int,
        val unit: String,
        val status: String?,
        @Column(length = 65536)
        val description: String?,
        val photo: String?,
        @ManyToOne
        val category: Category,
        @ManyToOne
        val shop: Shop,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1)