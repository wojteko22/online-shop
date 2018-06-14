package com.example.webshop.repository

import com.example.webshop.entity.User
import com.example.webshop.entity.UserStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserStatusRepository : JpaRepository<UserStatus, Long> {
    fun findByUser(user: User) : UserStatus?
    fun findByToken(token: String): UserStatus?
}