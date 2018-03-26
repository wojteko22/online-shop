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

    fun addCustomer(customer: CreateUserDto): Long {
        validate(customer)
        val role: UserRole = userRoleRepository.findByRole("CUSTOMER")
        val user = getUserFromDTOAndRole(customer, role)
        val savedUser = userRepository.save(user)
        return savedUser.id
    }

    fun addShop(owner: CreateUserDto, shopDto: CreateShopDto): Long {
        validate(owner)
        val role: UserRole = userRoleRepository.findByRole("SHOP_OWNER")
        val user: User = getUserFromDTOAndRole(owner, role)
        val shop = Shop(shopDto.name, shopDto.city, shopDto.street, shopDto.postCode, user)
        val savedShop =  shopRepository.save(shop)
        return savedShop.id
    }

    fun addVendorToShop(shopId: Long, vendorDTO: CreateUserDto): Long {
        validate(vendorDTO)
        val role: UserRole = userRoleRepository.findByRole("VENDOR")
        val user: User = getUserFromDTOAndRole(vendorDTO, role)
        val shop: Shop = shopRepository.findById(shopId) ?: throw NoSuchElementException("Shop doesn't exists!")
        shop.vendors.add(user)
        return user.id
    }


    private fun validate(createUserDto: CreateUserDto) {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw IllegalArgumentException("Passwords are different")
        }
        if (userRepository.findByEmail(createUserDto.email) != null) {
            throw IllegalStateException("There is already user with such email")
        }
    }

    private fun getUserFromDTOAndRole(createUserDto: CreateUserDto, role: UserRole): User {
        return User(createUserDto.email,
                passwordEncoder.encode(createUserDto.password),
                createUserDto.name,
                role)
    }
}