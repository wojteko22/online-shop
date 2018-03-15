package com.example.webshop.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class UserRole(
        val role: String,
        val description: String,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1
)