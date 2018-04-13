package com.example.webshop.entity

import javax.persistence.*

@Entity
@Table(name = "order_positions")
class OrderPosition(
        @ManyToOne
        val order: Order,
        @ManyToOne
        val product: Product,
        val amount: Int,
        @Id @GeneratedValue
        val id: Long = -1
)
