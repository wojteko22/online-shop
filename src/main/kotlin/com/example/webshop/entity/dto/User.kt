package com.example.webshop.entity.dto

class UserDto(
        val name: String,
        val email: String)

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
        val password: String?
)

class UpdatePasswordUserDto(
        val id: Long,
        val oldPassword: String,
        val password: String,
        val passwordConfirmation: String
)
