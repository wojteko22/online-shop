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

    fun changeUserPassword(dto: UpdatePasswordUserDto) {
        val userId = dto.id
        val user = userRepository.findById(userId) ?: throw IllegalArgumentException("No user with id $userId")
        if (!passwordEncoder.matches(dto.oldPassword, user.password)) {
            throw IllegalArgumentException("Invalid password")
        }
        user.password = passwordEncoder.encode(dto.password)
        userRepository.save(user)
    }

    fun deleteUser(id: Long) {
        val user = getUserById(id)
        val shop = shopRepository.findByUser(user)
        // todo: Chyba można prościej
        if (shop != null) {
            shopRepository.delete(shop)
        } else {
            userRepository.delete(id)
        }
    }

    fun getUserById(id: Long): User {
        return userRepository.findById(id) ?: throw NoSuchElementException("No user with id $id")
    }
}
