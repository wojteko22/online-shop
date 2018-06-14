package com.example.webshop.service

import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import com.example.webshop.entity.UserRole
import com.example.webshop.dto.CreateShopDto
import com.example.webshop.dto.CreateUserDto
import com.example.webshop.entity.UserStatus
import com.example.webshop.repository.UserRepository
import com.example.webshop.repository.UserRoleRepository
import com.example.webshop.repository.ShopRepository
import com.example.webshop.repository.UserStatusRepository
import com.example.webshop.service.mail.MailService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.*
import kotlin.NoSuchElementException

@Service
class SignUpService(private val userRepository: UserRepository,
                    private val userRoleRepository: UserRoleRepository,
                    private val userStatusRepository: UserStatusRepository,
                    private val shopRepository: ShopRepository,
                    private val passwordEncoder: PasswordEncoder,
                    private val mailService: MailService) {

    fun addCustomer(customer: CreateUserDto): Long {
        validate(customer)
        val role: UserRole = userRoleRepository.findByRole("CUSTOMER")
        val user = getUserFromDTOAndRole(customer, role)
        val userPassword = user.password
        user.password=generateToken()
        val savedUser = userRepository.save(user)
        val status = getStatusForNewUser(savedUser, userPassword)
        userStatusRepository.save(status)
        mailService.sendSignUpMessage(savedUser, status)
        return savedUser.id
    }

    fun addShop(owner: CreateUserDto, shopDto: CreateShopDto): Long {
        validate(owner)
        val role: UserRole = userRoleRepository.findByRole("SHOP_OWNER")
        val user: User = getUserFromDTOAndRole(owner, role)
        val userPassword = user.password
        user.password=generateToken()
        val shop = Shop(shopDto.name, shopDto.city, shopDto.street, shopDto.postCode, user)
        val savedShop =  shopRepository.save(shop)
        val status = getStatusForNewUser(savedShop.user, userPassword)
        mailService.sendSignUpMessage(shop.user, status)
        userStatusRepository.save(status)
        return savedShop.id
    }

    fun addVendorToShop(shopId: Long, vendorDTO: CreateUserDto): Long {
        validate(vendorDTO)
        val role: UserRole = userRoleRepository.findByRole("VENDOR")
        val user: User = getUserFromDTOAndRole(vendorDTO, role)
        val userPassword = user.password
        user.password=generateToken()
        val shop: Shop = shopRepository.findById(shopId) ?: throw NoSuchElementException("Shop doesn't exists!")
        shop.sellers.add(user)
        val savedShop = shopRepository.save(shop)
        val savedSeller = savedShop.sellers.stream().filter{ s -> s.email.equals(user.email)}.findAny().get()
        val status = getStatusForNewUser(savedSeller, userPassword)
        mailService.sendSignUpMessage(savedSeller, status)
        userStatusRepository.save(status)
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

    private fun getStatusForNewUser(user: User, userPassword: String): UserStatus {
        val token = generateToken()
        return UserStatus(user=user,password = userPassword, token = token)
    }

    private fun generateToken(): String {
        var token = UUID.randomUUID().toString()
        while(userStatusRepository.findByToken(token) != null){
            token = UUID.randomUUID().toString()
        }
        return token
    }

    fun activateUserAccount(token: String): Any {
        val status = userStatusRepository.findByToken(token) ?: throw NoSuchElementException("Token doesn't exist")
        val user = userRepository.findByEmail(status.user.email) ?: throw NoSuchElementException("No user with token $token")
        user.password = status.password
        userRepository.save(user)
        userStatusRepository.delete(status.id)
        return status.id
    }

}