package com.example.webshop.entity

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
@Table(name = "orders")
data class Order(
        val status: String,
        @Id @GeneratedValue
        val id: Long = -1,
        @ManyToOne @OnDelete(action = OnDeleteAction.CASCADE)
        val shop: Shop,
        @ManyToOne
        val user: User
)
