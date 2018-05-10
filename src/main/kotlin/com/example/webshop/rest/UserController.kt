package com.example.webshop.rest

import com.example.webshop.dto.UpdatePasswordUserDto
import com.example.webshop.dto.UserDto
import com.example.webshop.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping(("/users"))
class UserController(private val userService: UserService) {

    @GetMapping("/me")
    fun me(principal: Principal): UserDto = userService.getUserByEmail(principal.name)

    @PutMapping("/password")
    fun changePassword(@RequestBody dto: UpdatePasswordUserDto, principal: Principal): ResponseEntity<HttpStatus> =
            if (userService.getUserById(dto.id)?.email == principal.name) {
                userService.changeUserPassword(dto)
                ResponseEntity.status(HttpStatus.NO_CONTENT).build()
            } else {
                ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build()
            }
}
