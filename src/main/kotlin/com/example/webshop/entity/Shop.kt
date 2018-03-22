package com.example.webshop.entity

import javax.persistence.*

@Entity
@Table(name = "shops")
data class Shop(
    val name: String,
    val city: String,
    val street: String,
    val postCode: String,
    @OneToOne
    val user: User,
    @Id @GeneratedValue
    val id: Long = -1
)
