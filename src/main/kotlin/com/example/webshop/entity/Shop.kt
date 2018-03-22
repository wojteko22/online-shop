package com.example.webshop.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "shops")
data class Shop(
    val name: String,
    val city: String,
    val street: String,
    val postCode: String,
    @Id @GeneratedValue
    val id: Long = -1
)
