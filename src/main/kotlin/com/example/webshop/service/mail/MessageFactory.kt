package com.example.webshop.service.mail

import org.springframework.stereotype.Service

@Service
class MessageFactory {

    fun getSignUpMessage(signUpMessageType: SignUpMessageType): String {
        when(signUpMessageType) {
            SignUpMessageType.USER_SIGN_UP -> return "Witaj! Twoje konto klienta w serwisie web-shop zostało utworzone!"
            SignUpMessageType.SELLER_SIGN_UP -> return "Witaj! Twoje konto pracownika w serwisie web-shop zostało utwrzone!"
            SignUpMessageType.SHOP_SIGN_UP -> return "Witaj! Twoje konto sprzedawcy w serwisie web-shop zostało utwrzone!"
        }
    }
}