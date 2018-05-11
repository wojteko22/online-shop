package com.example.webshop.entity

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
@Table(name = "order_positions")
class OrderPosition(
        @ManyToOne @OnDelete(action = OnDeleteAction.CASCADE)
        val order: Order,
        @ManyToOne @OnDelete(action = OnDeleteAction.CASCADE)
        val product: Product,
        val amount: Int,
        @Id @GeneratedValue
        val id: Long = -1
)
