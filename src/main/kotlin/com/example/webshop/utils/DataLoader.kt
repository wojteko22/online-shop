package com.example.webshop.utils

// todo: tej klasy bym nie nazwał utilem,
// jak macie jakiś pomysł to można zmienić

import com.example.webshop.entity.Category
import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import com.example.webshop.entity.UserRole
import com.example.webshop.repository.CategoryRepository
import com.example.webshop.repository.ShopRepository
import com.example.webshop.repository.UserRepository
import com.example.webshop.repository.UserRoleRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Configuration
class DataLoader {

    var owner : User? = null
    var shop : Shop? = null

    @Bean
    fun initUser(userRepository: UserRepository, roleRepository: UserRoleRepository) = CommandLineRunner {
        val sellerUserRole = UserRole("SELLER", "Rola sprzedawcy....",1)
        val customerUserRole = UserRole("CUSTOMER", "Rola klienta sklepu...",2)
        val ownerUserRole = UserRole("SHOP_OWNER", "Rola sprzedawcy....",3)

        roleRepository.save(customerUserRole)
        roleRepository.save(sellerUserRole)
        roleRepository.save(ownerUserRole)
        owner = User("test@test.pl", BCryptPasswordEncoder().encode("test"), "Jan Nowak", roleRepository.findByRole("SHOP_OWNER"))
        userRepository.save(owner)
    }

    @Bean
    fun initShop(shopRepository: ShopRepository, userRepository: UserRepository) = CommandLineRunner {
        shop = Shop("Żabcia", "Wrocław", "Grunwaldzka", "50-387", userRepository.findByEmail("test@test.pl")!!)
        shopRepository.save(shop)
    }

    @Bean
    fun initCategories(repository: CategoryRepository, shopRepository: ShopRepository) = CommandLineRunner {
        val shop = shopRepository.findByName("Żabcia")!!
        val pieczywo = Category("Pieczywo", shop)
        val nabial = Category("Nabial", shop)
        val sery = Category("Sery", shop)
        val maslo = Category("Maslo", shop)
        val mleko = Category("Mleko", shop)
        val bialySer = Category("Biale", shop)
        val zoltySer = Category("Zolte", shop)

        repository.save(pieczywo)
        repository.save(nabial)
        repository.save(sery)
        repository.save(maslo)
        repository.save(mleko)
        repository.save(bialySer)
        repository.save(zoltySer)
    }

}