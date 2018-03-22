package com.example.webshop.entity

import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Id
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType

@Entity
data class User(
        val email: String,
        val password: String,
        val name: String,
        @ManyToOne
        val role: UserRole,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1
)
