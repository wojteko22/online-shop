package com.example.webshop.service

import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import com.example.webshop.entity.UserRole
import com.example.webshop.entity.Vendor
import com.example.webshop.entity.api.CreateUserDto
import com.example.webshop.entity.dto.CreateShopDto
import com.example.webshop.repository.UserRepository
import com.example.webshop.repository.UserRoleRepository
import com.example.webshop.repository.ShopRepository
import com.example.webshop.repository.VendorRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class SignUpService(private val userRepository: UserRepository,
                    private val userRoleRepository: UserRoleRepository,
                    private val shopRepository: ShopRepository,
                    private val passwordEncoder: PasswordEncoder) {

    @Autowired
    lateinit var vendorRepository: VendorRepository;

    fun addCustomer(customer: CreateUserDto) {
        if (isValidCreateUserDto(customer)) {

            var role: UserRole = userRoleRepository.findByName("CUSTOMER")
            var user = getUserFromDTOAndRole(customer, role);

            userRepository.save(user);
        }
    }

    fun addShop(owner: CreateUserDto, shop: CreateShopDto) {
        if (isValidCreateUserDto(owner)) {

            var role: UserRole = userRoleRepository.findByName("SHOP_OWNER")
            var user: User = getUserFromDTOAndRole(owner, role);
            var shop = Shop(shop.name, shop.city, shop.street, shop.postCode, user);

            userRepository.save(user);
            shopRepository.save(shop);
        }
    }

    fun addVendorToShop(shopId: Long, vendorDTO: CreateUserDto) {
        if (isValidVendorDTO(shopId, vendorDTO)) {

            var role: UserRole = userRoleRepository.findByName("VENDOR")
            var user = getUserFromDTOAndRole(vendorDTO, role)
            var shop: Shop = shopRepository.findById(shopId)
            userRepository.save(user);

            user = userRepository.findByEmail(user.email);
            var vendor: Vendor = Vendor(user, shop)

            vendorRepository.save(vendor);
        }
    }

    private fun isValidVendorDTO(shopId: Long, vendor: CreateUserDto): Boolean {

        if (shopRepository.findById(shopId) == null)
            return false

        if (!isValidCreateUserDto(vendor))
            return false

        return true
    }

    private fun isValidCreateUserDto(createUserDto: CreateUserDto): Boolean {
        if (!createUserDto.password.equals(createUserDto.passwordConfirmation))
            return false

        if (userRepository.findByEmail(createUserDto.email) != null)
            return false

        return true
    }

    private fun getUserFromDTOAndRole(createUserDto: CreateUserDto, role: UserRole): User {
        return User(createUserDto.email,
                passwordEncoder.encode(createUserDto.password),
                createUserDto.passwordConfirmation,
                role)
    }
}