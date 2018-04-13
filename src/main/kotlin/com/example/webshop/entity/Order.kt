package com.example.webshop.entity

import javax.persistence.*

@Entity
@Table(name = "orders")
class Order(
        val status: String,
        @Id @GeneratedValue
        val id: Long = -1
) {
    @OneToMany
    val positions: List<OrderPosition> = listOf()
}
