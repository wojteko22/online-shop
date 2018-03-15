package com.example.webshop

import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import com.example.webshop.entity.UserRole
import com.example.webshop.repository.ShopRepository
import com.example.webshop.repository.UserRepository
import com.example.webshop.repository.UserRoleRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter

@SpringBootApplication
class Application {

    @Bean
    fun init(repository: ShopRepository) = CommandLineRunner {
        repository.save(Shop("Żabcia", "Wrocław", "Grunwaldzka", "50-387"))
        repository.save(Shop("Biedroneczka", "Wrocław", "Piękna", "50-388"))
    }

    @Bean
    fun initUserRoleRep(repository: UserRoleRepository) = CommandLineRunner{
        repository.save(UserRole("DEFAULT", "Domyślna rola użytkownika..."))
    }

    @Bean
    fun initUserRep(repository: UserRepository) = CommandLineRunner {
        val encoder: PasswordEncoder = BCryptPasswordEncoder()
        val user = User("test@test.pl",
                encoder.encode("test"),
                "Jan Nowak",
                UserRole("DEFAULT", "Domyślna rola użytkownika...", 1))
        repository.save(user)
    }

    @Bean
    fun corsConfigurer(): WebMvcConfigurer = object : WebMvcConfigurerAdapter() { // todo
        override fun addCorsMappings(registry: CorsRegistry) {
            registry.addMapping("/**").allowedOrigins("http://localhost:4200")
                    .allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH")
        }
    }
}

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}