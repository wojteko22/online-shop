package com.example.webshop.service

import com.example.webshop.entity.User
import com.example.webshop.dto.UpdatePasswordUserDto
import com.example.webshop.dto.UserDto
import com.example.webshop.toDto
import com.example.webshop.repository.ShopRepository
import com.example.webshop.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository, private val shopRepository: ShopRepository) {

    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    fun getUsers(): Iterable<User> {
        return userRepository.findAll()
    }

    fun getUserByEmail(email: String): UserDto {
        val shop = shopRepository.findByUserEmail(email)
        val user = userRepository.findByEmail(email) ?: throw NoSuchElementException("No user with email $email")
        return user.toDto(shop)
    }

    fun getUserById(id: Long): User? {
        return userRepository.findById(id)
    }

    fun changeUserPassword(dto: UpdatePasswordUserDto) {
        val userId = dto.id
        val user = userRepository.findById(userId) ?: throw IllegalArgumentException("No user with id $userId")
        if (!passwordEncoder.matches(dto.oldPassword, user.password)) {
            throw IllegalArgumentException("Invalid password")
        }
        user.password = passwordEncoder.encode(dto.password)
        userRepository.save(user)
    }
}
