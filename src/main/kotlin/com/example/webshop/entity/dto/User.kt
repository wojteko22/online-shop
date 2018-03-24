package com.example.webshop.entity.dto

class UserDto(
        val id: Long,
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
        val password: String?,
        val passwordConfirmation: String?
)

class UpdatePasswordUserDto(
        val id: Long = 1,
        val oldPassword: String = "test",
        val password: String = "qwe",
        val passwordConfirmation: String = "qwe"
)
