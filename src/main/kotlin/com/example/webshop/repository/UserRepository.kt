package com.example.webshop.repository

import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
interface UserRepository : CrudRepository<User, Long> {
    fun findByEmail(email: String) : User?
    fun findById(id: Long): User?
}