package com.example.webshop

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Shop(
    val name: String,
    val city: String,
    val street: String,
    val postCode: String,
    @Id @GeneratedValue
    val id: Long = -1
)
