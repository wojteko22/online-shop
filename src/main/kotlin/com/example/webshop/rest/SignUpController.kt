package com.example.webshop.rest

import com.example.webshop.entity.dto.CreateShopWithOwnerDto
import com.example.webshop.entity.dto.CreateUserDto
import com.example.webshop.service.SignUpService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class SignUpController(private val signUp: SignUpService) {

    @PostMapping("/user")
    fun signUp(@RequestBody user: CreateUserDto): ResponseEntity<HttpStatus> =
            if (signUp.addCustomer(user) != null) {
                ResponseEntity.status(HttpStatus.OK).build()
            } else {
                ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build()
            }

    @PostMapping("/user/shop")
    fun signUpAsShop(@RequestBody dto: CreateShopWithOwnerDto): ResponseEntity<HttpStatus> =
            if (signUp.addShop(dto.owner, dto.shop) != null) {
                ResponseEntity.status(HttpStatus.OK).build()
            } else {
                ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build()
            }

    @PostMapping("/user/vendor")
    fun signUpVendor(@PathVariable shopId: Long,
                     @RequestBody vendor: CreateUserDto) : ResponseEntity<HttpStatus> =
            if (signUp.addVendorToShop(shopId, vendor) != null) {
                ResponseEntity.status(HttpStatus.OK).build()
            } else {
                ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build()
            }

}