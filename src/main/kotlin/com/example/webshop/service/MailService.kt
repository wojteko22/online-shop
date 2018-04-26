package com.example.webshop.service

import com.example.webshop.entity.User
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class MailService(private val mailSender: JavaMailSender) {

    fun sendSignUpMessage(user: User) {
        val smm: SimpleMailMessage = SimpleMailMessage()
        smm.setTo(user.email)
        smm.setSubject("Web-Shop rejestracja")
        smm.setFrom("web-shop@kamo.ovh")
        smm.setText("Witaj! Twoje konto w serwisie web-shop zostało utworzone!")
        mailSender.send(smm)
    }

}