package com.example.webshop.entity

import com.example.webshop.dto.UserTokenDto
import java.util.*
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
        val shop: Shop? = null,
        var passwordReminderToken: String? = null,
        var passwordReminderExpiration: Date? = null

) {
    fun toReminderTokenDto(): UserTokenDto = UserTokenDto(email, passwordReminderToken, passwordReminderExpiration)
}
