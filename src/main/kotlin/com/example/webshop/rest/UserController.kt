package com.example.webshop.rest

import com.example.webshop.dto.UpdatePasswordUserDto
import com.example.webshop.dto.UserDto
import com.example.webshop.security.AuthReader
import com.example.webshop.service.UserService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping(("/users"))
class UserController(private val userService: UserService, private val authReader: AuthReader) {

    @GetMapping
    // todo: Zabezpieczyć
    fun all(principal: Principal) = userService.getUsers()

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) {
        // todo: Koniecznie zabezpieczyć!
        userService.deleteUser(id)
    }

    @GetMapping("/me")
    fun me(principal: Principal): UserDto = userService.getUserByEmail(principal.name)

    @PutMapping("/{id}/password")
    fun changePassword(
            @PathVariable id: Long,
            @RequestBody dto: UpdatePasswordUserDto,
            authentication: OAuth2Authentication
    ) {
        authReader.check(id, authentication)
        userService.changeUserPassword(id, dto)
    }
}
