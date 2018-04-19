package com.example.webshop.entity

import com.example.webshop.entity.dto.UserDto
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
        val id: Long = -1
) {
    fun toDto(shop: Shop?): UserDto = UserDto(id, name, email, role.role, shop?.id)
}
