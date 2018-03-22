package com.example.webshop.service

import com.example.webshop.entity.User
import com.example.webshop.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    fun getUserByEmail(email: String): User {
        return userRepository.findByEmail(email);
    }
}