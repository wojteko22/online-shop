package com.example.webshop

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.JavaMailSenderImpl
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter

@EnableCaching
@SpringBootApplication
class Application {

    @Bean
    fun corsConfigurer(): WebMvcConfigurer = object : WebMvcConfigurerAdapter() {
        override fun addCorsMappings(registry: CorsRegistry) {
            registry.addMapping("/**").allowedOrigins("http://localhost:4200")
                    .allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH")
        }
    }

    @Bean
    fun javaMailSender(): JavaMailSender {
        val mailSender = JavaMailSenderImpl()
        mailSender.host = ""
        mailSender.port = 587
        mailSender.username = ""
        mailSender.password = ""

        val props = mailSender.javaMailProperties
        props["mail.transport.protocol"] = "smtp"
        props["mail.smtp.auth"] = "true"
        props["mail.smtp.starttls.enable"] = "true"
        props["mail.debug"] = "true"
        return mailSender
    }
}

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}
