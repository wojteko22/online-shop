package com.example.webshop.rest

import com.example.webshop.entity.api.UserDto
import com.example.webshop.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController("/user")
class UserController(private val userService: UserService) {

    @PostMapping("/me")
    fun me(principal: Principal) : UserDto = userService.getUserByEmail(principal.name).toDto()

}