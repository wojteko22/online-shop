package com.example.webshop.service

import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import com.example.webshop.entity.UserRole
import com.example.webshop.entity.dto.CreateShopDto
import com.example.webshop.entity.dto.CreateUserDto
import com.example.webshop.repository.UserRepository
import com.example.webshop.repository.UserRoleRepository
import com.example.webshop.repository.ShopRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class SignUpService(private val userRepository: UserRepository,
                    private val userRoleRepository: UserRoleRepository,
                    private val shopRepository: ShopRepository,
                    private val passwordEncoder: PasswordEncoder) {

    fun addCustomer(customer: CreateUserDto): User? {

        if (isValidCreateUserDto(customer)) {

            val role: UserRole = userRoleRepository.findByRole("CUSTOMER")
            val user = getUserFromDTOAndRole(customer, role)

            return userRepository.save(user)
        }
        return null
    }

    fun addShop(owner: CreateUserDto, shopDto: CreateShopDto): Shop? {
        if (isValidCreateUserDto(owner)) {
            val role: UserRole = userRoleRepository.findByRole("SHOP_OWNER")
            val user: User = getUserFromDTOAndRole(owner, role)
            val shop = Shop(shopDto.name, shopDto.city, shopDto.street, shopDto.postCode, user)

            return shopRepository.save(shop)
        }
        return null
    }

    fun addVendorToShop(shopId: Long, vendorDTO: CreateUserDto): Shop? {

        if (isValidCreateUserDto(vendorDTO)) {
            val role: UserRole = userRoleRepository.findByRole("VENDOR")
            val user: User = getUserFromDTOAndRole(vendorDTO, role)
            val shop: Shop = shopRepository.findById(shopId) ?: throw NoSuchElementException("Shop doesn't exists!")

            shop.vendors.add(user)
            return shopRepository.save(shop)
        }
        return null
    }


    private fun isValidCreateUserDto(createUserDto: CreateUserDto): Boolean {

        if (!createUserDto.password.equals(createUserDto.passwordConfirmation))
            return false

        if (userRepository.findByEmail(createUserDto.email) != null) {
            return false
        }

        return true
    }

    private fun getUserFromDTOAndRole(createUserDto: CreateUserDto, role: UserRole): User {
        return User(createUserDto.email,
                passwordEncoder.encode(createUserDto.password),
                createUserDto.passwordConfirmation,
                role)
    }
}