package com.example.webshop.service

import com.example.webshop.dto.UpdatePasswordUserDto
import com.example.webshop.dto.UserDto
import com.example.webshop.entity.User
import com.example.webshop.entity.UserStatus
import com.example.webshop.repository.UserRepository
import com.example.webshop.repository.UserStatusRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository,
                  private val userStatusRepository: UserStatusRepository) {

    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    fun getUsers(): Iterable<User> {
        return userRepository.findAll()
    }

    fun getUserByEmail(email: String): UserDto {
        val user = userRepository.findByEmail(email) ?: throw NoSuchElementException("No user with email $email")
        return user.toDto()
    }

    fun getUser(id: Long) = getUserById(id).toDto()

    fun changeUserPassword(userId: Long, dto: UpdatePasswordUserDto) {
        val user = getUserById(userId)
        if (!passwordEncoder.matches(dto.oldPassword, user.password)) {
            throw IllegalArgumentException("Invalid password")
        }
        user.password = passwordEncoder.encode(dto.password)
        userRepository.save(user)
    }

    fun deleteUser(id: Long) {
        val user = getUserById(id)
        userRepository.delete(user)
    }

    private fun getUserById(id: Long): User {
        return userRepository.findById(id) ?: throw NoSuchElementException("No user with id $id")
    }

    fun isUserActivated(email: String): Boolean {
        val user = userRepository.findByEmail(email)
        if (user != null) {
            val status = userStatusRepository.findByUser(user)
            return status==null
        }
        return false
    }
}
