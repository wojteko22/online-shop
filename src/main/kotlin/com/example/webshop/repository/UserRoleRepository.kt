package com.example.webshop.repository

import com.example.webshop.entity.UserRole
import org.springframework.data.repository.CrudRepository

interface UserRoleRepository : CrudRepository<UserRole, Long> {
    fun findByName(name: String) : UserRole
}