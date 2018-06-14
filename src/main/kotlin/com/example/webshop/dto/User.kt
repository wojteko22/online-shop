package com.example.webshop.dto

import java.util.*

class UserDto(
        val id: Long,
        val name: String,
        val email: String,
        val role: String,
        val shopId: Long?
)

class CreateUserDto(
        val name: String,
        val email: String,
        val password: String,
        val passwordConfirmation: String,
        val role: String
)

class UpdateUserDto(
        val id: Long,
        val name: String?,
        val email: String?,
        val password: String?,
        val passwordConfirmation: String?
)

class UpdatePasswordUserDto(
        val oldPassword: String,
        val password: String,
        val passwordConfirmation: String
)

class UpdatePasswordUserUsingTokenDto(
        val email: String,
        val token: String,
        val password: String
)

class UserTokenDto(
        val email: String,
        val token: String?,
        val expiration: Date?
)