package com.example.webshop

import com.example.webshop.entity.Shop
import com.example.webshop.repository.ShopRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
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
    fun corsConfigurer(): WebMvcConfigurer = object : WebMvcConfigurerAdapter() { // todo
        override fun addCorsMappings(registry: CorsRegistry) {
            registry.addMapping("/**").allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH")
        }
    }
}

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
