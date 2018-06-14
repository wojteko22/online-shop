package com.example.webshop.service.mail

import com.example.webshop.entity.UserStatus
import org.springframework.stereotype.Service

@Service
class MessageFactory {

    fun getSignUpMessage(signUpMessageType: SignUpMessageType, userStatus: UserStatus): String {
        val sb = StringBuilder("Witaj!\n")
        sb.append("Twoje konto ")
        when (signUpMessageType) {
            SignUpMessageType.USER_SIGN_UP -> sb.append("klienta")
            SignUpMessageType.SELLER_SIGN_UP -> sb.append("pracownika")
            SignUpMessageType.SHOP_SIGN_UP -> sb.append("sprzedawcy")
        }
        sb.append(" w serwisie web-shop zostało utworzone!\n")
        sb.append("Aby móc się zalogować i korzystać z serwisu musisz potwierdzić adres email klikając w link: \n")
        sb.append("http://localhost:4200/user/activate/" + userStatus.token)
        return sb.toString()
    }
}