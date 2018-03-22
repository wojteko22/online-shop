package com.example.webshop.repository

import com.example.webshop.entity.UserRole
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRoleRepository : CrudRepository<UserRole, Long> {
    fun findByRole(role: String) : UserRole
}