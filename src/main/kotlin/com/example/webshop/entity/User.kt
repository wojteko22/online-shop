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
        @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
        var shop : Shop? = null,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1
) {
        fun toDto(): UserDto = UserDto(id, name, email,role.role, shop?.id)
        override fun toString(): String {
        return "User(email='$email', password='$password', name='$name', role=$role, shop=${shop?.id}, id=$id)"
    }

}
