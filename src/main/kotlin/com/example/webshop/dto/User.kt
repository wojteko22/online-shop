package com.example.webshop.dto

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
        val id: Long,
        val oldPassword: String,
        val password: String,
        val passwordConfirmation: String
)
