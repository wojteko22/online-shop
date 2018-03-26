package com.example.webshop.rest

import com.example.webshop.entity.dto.CreateShopWithOwnerDto
import com.example.webshop.entity.dto.CreateUserDto
import com.example.webshop.service.SignUpService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
class SignUpController(private val signUp: SignUpService) {

    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    fun signUp(@RequestBody user: CreateUserDto) = signUp.addCustomer(user)


    @PostMapping("/user/shop")
    @ResponseStatus(HttpStatus.CREATED)
    fun signUpAsShop(@RequestBody dto: CreateShopWithOwnerDto) = signUp.addShop(dto.owner, dto.shop)

    @PostMapping("/user/vendor")
    @ResponseStatus(HttpStatus.CREATED)
    fun signUpVendor(@PathVariable shopId: Long, @RequestBody vendor: CreateUserDto) =
            signUp.addVendorToShop(shopId, vendor)
}
