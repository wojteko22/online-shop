package com.example.webshop.utils

// todo: tej klasy bym nie nazwał utilem,
// jak macie jakiś pomysł to można zmienić

import com.example.webshop.entity.*
import com.example.webshop.repository.*
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Configuration
class DataLoader {


    @Bean
    fun initUser(userRepository: UserRepository, roleRepository: UserRoleRepository) = CommandLineRunner {


        roleRepository.save(UserRole("CUSTOMER", "Rola klienta sklepu..."))
        roleRepository.save(UserRole("SELLER", "Rola sprzedawcy...."))
        roleRepository.save(UserRole("SHOP_OWNER", "Rola sprzedawcy...."))
        val owner1 = User("test@test.pl", BCryptPasswordEncoder().encode("test"), "Jan Nowak", roleRepository.findByRole("SHOP_OWNER"))
        val owner2 = User("test2@test.pl", BCryptPasswordEncoder().encode("test"), "Jan Zdzislaw", roleRepository.findByRole("SHOP_OWNER"))
        val owner3 = User("test3@test.pl", BCryptPasswordEncoder().encode("test"), "Jakub Rolnik", roleRepository.findByRole("SHOP_OWNER"))
        val owner4 = User("test4@test.pl", BCryptPasswordEncoder().encode("test"), "Bartosz Wodnik", roleRepository.findByRole("SHOP_OWNER"))
        val owner5 = User("test5@test.pl", BCryptPasswordEncoder().encode("test"), "Janusz Swawolny", roleRepository.findByRole("SHOP_OWNER"))
        val owner6 = User("test6@test.pl", BCryptPasswordEncoder().encode("test"), "Milosz Laty", roleRepository.findByRole("SHOP_OWNER"))
        val owner7 = User("test7@test.pl", BCryptPasswordEncoder().encode("test"), "Mikolaj Wasik", roleRepository.findByRole("SHOP_OWNER"))
        userRepository.save(owner1)
        userRepository.save(owner2)
        userRepository.save(owner3)
        userRepository.save(owner4)
        userRepository.save(owner5)
        userRepository.save(owner6)
        userRepository.save(owner7)
    }

    @Bean
    fun initShop(shopRepository: ShopRepository, userRepository: UserRepository) = CommandLineRunner {
        val shop1 = Shop("Żabcia", "Wrocław", "Grunwaldzka", "50-387", userRepository.findByEmail("test@test.pl")!!)
        val shop2 = Shop("Biedronka", "Wrocław", "Polna", "50-387", userRepository.findByEmail("test2@test.pl")!!)
        val shop3 = Shop("Bartosz", "Wrocław", "Bacarellego", "50-387", userRepository.findByEmail("test3@test.pl")!!)
        val shop4 = Shop("Ikea", "Wrocław", "Mila", "50-387", userRepository.findByEmail("test4@test.pl")!!)
        val shop5 = Shop("Mila", "Wrocław", "Kolorowa", "50-387", userRepository.findByEmail("test5@test.pl")!!)
        val shop6 = Shop("Kasa", "Wrocław", "Wiosenna", "50-387", userRepository.findByEmail("test6@test.pl")!!)
        val shop7 = Shop("Maza", "Wrocław", "Piekna", "50-387", userRepository.findByEmail("test7@test.pl")!!)
        shopRepository.save(shop1)
        shopRepository.save(shop2)
        shopRepository.save(shop3)
        shopRepository.save(shop4)
        shopRepository.save(shop5)
        shopRepository.save(shop6)
        shopRepository.save(shop7)
    }

    @Bean
    fun initCategories(repository: CategoryRepository, shopRepository: ShopRepository) = CommandLineRunner {
        val shop = shopRepository.findByName("Żabcia")!!
        val pieczywo = Category("Pieczywo", shop)
        val nabial = Category("Nabial", shop)
        val sery = Category("Sery", shop, nabial)
        val maslo = Category("Maslo", shop, nabial)
        val mleko = Category("Mleko", shop, nabial)
        val bialySer = Category("Biale", shop, sery)
        val zoltySer = Category("Zolte", shop, sery)

        repository.save(pieczywo)
        repository.save(nabial)
        repository.save(sery)
        repository.save(maslo)
        repository.save(mleko)
        repository.save(bialySer)
        repository.save(zoltySer)
    }

    @Bean
    fun initOrders(repository: OrderRepository) = CommandLineRunner {
        val order = Order("serwerowy")
        repository.save(order)
    }

}