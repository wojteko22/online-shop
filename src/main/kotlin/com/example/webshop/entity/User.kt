package com.example.webshop.entity

import javax.persistence.*

@Entity
@Embeddable
data class User(
        val email: String,
        var password: String,
        val name: String,
        @ManyToOne
        val role: UserRole,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1,
        @OneToOne(mappedBy = "user")
        val shop: Shop? = null
)
