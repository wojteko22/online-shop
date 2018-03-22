package com.example.webshop.rest

import com.example.webshop.entity.api.CreateUserDto
import com.example.webshop.entity.dto.CreateShopDto
import com.example.webshop.service.SignUpService
import org.springframework.web.bind.annotation.*

@RestController
class SignUpController(private val signUp: SignUpService) {

    @PostMapping("/user")
    fun signUp(@RequestBody user: CreateUserDto) = signUp.addCustomer(user)

    @PostMapping("/user/shop")
    fun signUpAsShop(@RequestBody owner: CreateUserDto,
                     @RequestBody shop: CreateShopDto) = signUp.addShop(owner, shop)

    @PostMapping("/user/vendor")
    fun signUpVendor(@PathVariable shopId: Long,
                     @RequestBody vendor: CreateUserDto) = signUp.addVendorToShop(shopId, vendor)

}