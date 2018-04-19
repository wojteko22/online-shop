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

    private val owner = UserRole("SHOP_OWNER", "Rola sprzedawcy....", 1)

    @Bean
    fun initRoles(roleRepository: UserRoleRepository) = CommandLineRunner {
        val customer = UserRole("CUSTOMER", "Rola klienta sklepu...", 2)
        val seller = UserRole("SELLER", "Rola sprzedawcy....", 3)
        roleRepository.save(owner)
        roleRepository.save(customer)
        roleRepository.save(seller)
    }

    private val owner1 = User("test@test.pl", BCryptPasswordEncoder().encode("test"), "Jan Nowak", owner, 1)
    private val owner2 = User("test2@test.pl", BCryptPasswordEncoder().encode("test"), "Jan Zdzislaw", owner, 2)
    private val owner3 = User("test3@test.pl", BCryptPasswordEncoder().encode("test"), "Jakub Rolnik", owner, 3)
    private val owner4 = User("test4@test.pl", BCryptPasswordEncoder().encode("test"), "Bartosz Wodnik", owner, 4)
    private val owner5 = User("test5@test.pl", BCryptPasswordEncoder().encode("test"), "Janusz Swawolny", owner, 5)
    private val owner6 = User("test6@test.pl", BCryptPasswordEncoder().encode("test"), "Milosz Laty", owner,6 )
    private val owner7 = User("test7@test.pl", BCryptPasswordEncoder().encode("test"), "Mikolaj Wasik", owner, 7)

    @Bean
    fun initUser(userRepository: UserRepository) = CommandLineRunner {
        userRepository.save(owner1)
        userRepository.save(owner2)
        userRepository.save(owner3)
        userRepository.save(owner4)
        userRepository.save(owner5)
        userRepository.save(owner6)
        userRepository.save(owner7)
    }

    private val shop1 = Shop("Żabcia", "Wrocław", "Grunwaldzka", "50-387", owner1, id = 1)

    @Bean
    fun initShop(shopRepository: ShopRepository) = CommandLineRunner {
        val shop2 = Shop("Biedronka", "Wrocław", "Polna", "50-387", owner2)
        val shop3 = Shop("Bartosz", "Wrocław", "Baciarellego", "50-387", owner3)
        val shop4 = Shop("Ikea", "Wrocław", "Miła", "50-387", owner4)
        val shop5 = Shop("Mila", "Wrocław", "Kolorowa", "50-387", owner5)
        val shop6 = Shop("Kasa", "Wrocław", "Norwida", "50-387", owner6)
        val shop7 = Shop("Maza", "Wrocław", "Wajdy", "50-387", owner7)
        shopRepository.save(shop1)
        shopRepository.save(shop2)
        shopRepository.save(shop3)
        shopRepository.save(shop4)
        shopRepository.save(shop5)
        shopRepository.save(shop6)
        shopRepository.save(shop7)
    }

    private val pieczywo = Category("Pieczywo", shop1)

    @Bean
    fun initCategories(repository: CategoryRepository, shopRepository: ShopRepository) = CommandLineRunner {
        val nabial = Category("Nabial", shop1)
        val sery = Category("Sery", shop1, nabial)
        val maslo = Category("Maslo", shop1, nabial)
        val mleko = Category("Mleko", shop1, nabial)
        val bialySer = Category("Biale", shop1, sery)
        val zoltySer = Category("Zolte", shop1, sery)

        repository.save(pieczywo)
        repository.save(nabial)
        repository.save(sery)
        repository.save(maslo)
        repository.save(mleko)
        repository.save(bialySer)
        repository.save(zoltySer)
    }

    private val product1 = Product("Heineken", 3, "unit", "status", "description", "photo", pieczywo, shop1, 1)
    private val product2 = Product("Warka", 2, "unit", "status", "description", "photo", pieczywo, shop1, 2)

    @Bean
    fun initProducts(repository: ProductRepository) = CommandLineRunner {
        repository.save(product1)
        repository.save(product2)
    }

    private val order1 = Order("złożone", 1)
    private val order2 = Order("złożone", 2)

    @Bean
    fun initOrders(repository: OrderRepository) = CommandLineRunner {
        repository.save(order1)
        repository.save(order2)
    }

    @Bean
    fun initOrderPositions(repository: OrderPositionRepository) = CommandLineRunner {
        val orderPosition1 = OrderPosition(order1, product1, 3)
        val orderPosition2 = OrderPosition(order1, product2, 2)
        val orderPosition3 = OrderPosition(order2, product1, 1)
        repository.save(orderPosition1)
        repository.save(orderPosition2)
        repository.save(orderPosition3)
    }
}
