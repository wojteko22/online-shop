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
            principal: Principal
    ): ResponseEntity<HttpStatus> =
            if (userService.getUserById(id).email == principal.name) {
                userService.changeUserPassword(id, dto)
                ResponseEntity.status(HttpStatus.NO_CONTENT).build()
            } else {
                ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build()
            }
}
