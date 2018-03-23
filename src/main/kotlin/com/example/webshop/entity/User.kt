package com.example.webshop.entity

import com.example.webshop.entity.dto.UserDto
import javax.persistence.*

@Entity
@Embeddable
data class User(
        val email: String,
        val password: String,
        val name: String,
        @ManyToOne
        val role: UserRole,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1
) {
        fun toDto(): UserDto = UserDto(name, email)
}
