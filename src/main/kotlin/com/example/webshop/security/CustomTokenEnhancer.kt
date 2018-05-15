package com.example.webshop.security

import com.example.webshop.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken
import org.springframework.security.oauth2.common.OAuth2AccessToken
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.token.TokenEnhancer
import org.springframework.stereotype.Component

@Component
class CustomTokenEnhancer : TokenEnhancer {

    @Autowired
    lateinit var userRepository: UserRepository

    override fun enhance(accessToken: OAuth2AccessToken, authentication: OAuth2Authentication): OAuth2AccessToken {
        val email = authentication.name
        val user = userRepository.findByEmail(email)!!
        val additionalInfo = AdditionalTokenInfo(user.id, user.shop?.id)
        (accessToken as DefaultOAuth2AccessToken).additionalInformation = additionalInfo.map
        return accessToken
    }
}
