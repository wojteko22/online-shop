package com.example.webshop.service

import com.example.webshop.dto.UpdatePasswordUserDto
import com.example.webshop.dto.UpdatePasswordUserUsingTokenDto
import com.example.webshop.dto.UserDto
import com.example.webshop.dto.UserTokenDto
import com.example.webshop.entity.User
import com.example.webshop.entity.UserStatus
import com.example.webshop.repository.UserRepository
import com.example.webshop.repository.UserStatusRepository
import com.example.webshop.service.mail.MailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.sql.Date
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.util.*

@Service
class UserService(private val userRepository: UserRepository,
                  private val userStatusRepository: UserStatusRepository,
                  private val mailService: MailService) {

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

    fun sendReminderToken(email: String): UserTokenDto {
        val user: User? = userRepository.findByEmail(email) ?: throw IllegalArgumentException("No user with id $email")
        if (user != null) {
            user.passwordReminderExpiration = Date.from(LocalDateTime.now().plusMinutes(5).toInstant(ZoneOffset.UTC))
            val token: String = generateNewReminderToken()
            user.passwordReminderToken = token
            this.mailService.sendReminderToken(email, token)
            this.userRepository.save(user)
        }
        return user!!.toReminderTokenDto()
    }

    fun changeUserPassword(dto: UpdatePasswordUserUsingTokenDto) {
        val user: User? = userRepository.findByEmail(dto.email)
        if (user != null) {
            user.password = passwordEncoder.encode(dto.password)
            userRepository.save(user)
        }
    }

    fun generateNewReminderToken(): String {
        val leftLimit = 97
        val rightLimit = 122
        val targetStringLength = 10
        val random = Random()
        val buffer = StringBuilder(targetStringLength)
        for (i in 0 until targetStringLength) {
            val randomLimitedInt = leftLimit + (random.nextFloat() * (rightLimit - leftLimit + 1)).toInt()
            buffer.append(randomLimitedInt.toChar())
        }
        return buffer.toString()
    }
}
