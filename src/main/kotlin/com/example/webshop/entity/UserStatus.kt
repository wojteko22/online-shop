package com.example.webshop.entity

import javax.persistence.*

@Entity
data class UserStatus(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1,
        @OneToOne
        val user: User,
        val password: String,
        val token: String
)