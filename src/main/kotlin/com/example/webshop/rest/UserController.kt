package com.example.webshop.rest

import com.example.webshop.dto.UpdatePasswordUserDto
import com.example.webshop.dto.UserDto
import com.example.webshop.entity.User
import com.example.webshop.security.Guard
import com.example.webshop.service.UserService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping(("/users"))
class UserController(private val userService: UserService, private val guard: Guard) {

    @GetMapping
    fun getAllUsers(authentication: OAuth2Authentication): Iterable<User> {
        guard.ensureAdmin(authentication)
        return userService.getUsers()
    }

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long, authentication: OAuth2Authentication): UserDto {
        guard.ensureAdmin(authentication)
        return userService.getUser(id)
    }

    @GetMapping("/me")
    fun me(principal: Principal): UserDto = userService.getUserByEmail(principal.name)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long, authentication: OAuth2Authentication) {
        guard.ensureAdmin(authentication)
        userService.deleteUser(id)
    }

    @PutMapping("/{id}/password")
    fun changePassword(
            @PathVariable id: Long,
            @RequestBody dto: UpdatePasswordUserDto,
            authentication: OAuth2Authentication
    ) {
        guard.checkUserId(id, authentication)
        userService.changeUserPassword(id, dto)
    }

    @GetMapping("/{email}/isActivated")
    fun isActivated(@PathVariable email: String) : Boolean = userService.isUserActivated(email)
}
