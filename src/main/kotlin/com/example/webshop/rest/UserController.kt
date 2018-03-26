package com.example.webshop.rest

import com.example.webshop.entity.dto.UpdatePasswordUserDto
import com.example.webshop.entity.dto.UserDto
import com.example.webshop.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping(("/user"))
class UserController(private val userService: UserService) {

    @GetMapping("/me")
    fun me(principal: Principal): UserDto = userService.getUserByEmail(principal.name)!!.toDto()

    @PutMapping("/password")
    fun changePassword(@RequestBody dto: UpdatePasswordUserDto, principal: Principal): ResponseEntity<HttpStatus> =
            if (userService.getUserById(dto.id)?.email == principal.name) {
                if (userService.changeUserPassword(dto) != null) {
                    ResponseEntity.status(HttpStatus.OK).build()
                } else {
                    ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build()
                }
            } else {
                ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build()
            }
}