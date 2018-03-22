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
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
class DataLoader {

    @Bean
    fun initUserRoleRep(repository: UserRoleRepository) = CommandLineRunner{
        repository.save(UserRole("CUSTOMER", "Rola klienta sklepu..."))
        repository.save(UserRole("VENDOR", "Rola sprzedawcy...."))
        repository.save(UserRole("SHOP_OWNER", "Własciciel sklepu..."))
    }

    @Bean
    fun initUserRep(repository: UserRepository) = CommandLineRunner {
        val encoder: PasswordEncoder = BCryptPasswordEncoder()
        val user = User("test@test.pl",
                encoder.encode("test"),
                "Jan Nowak",
                UserRole("CUSTOMER", "Domyślna rola użytkownika...", 1))
        repository.save(user)
    }

    @Bean
    fun initCategories(repository: CategoryRepository) = CommandLineRunner {
        val pieczywo = Category("Pieczywo")
        val nabial = Category("Nabial")
        val sery = Category("Sery", nabial)
        val maslo = Category("Maslo", nabial)
        val mleko = Category("Mleko", nabial)
        val bialySer = Category("Biale", sery)
        val zoltySer = Category("Zolte", sery)

        repository.save(pieczywo)
        repository.save(nabial)
        repository.save(sery)
        repository.save(maslo)
        repository.save(mleko)
        repository.save(bialySer)
        repository.save(zoltySer)
    }

    @Bean
    fun init(repository: ShopRepository) = CommandLineRunner {

        val user = User("test@test.pl",
        BCryptPasswordEncoder().encode("test"),
        "Jan Nowak",
        UserRole("CUSTOMER", "Domyślna rola użytkownika...", 1), 1);

        repository.save(Shop("Żabcia", "Wrocław", "Grunwaldzka", "50-387", user))

    }

}