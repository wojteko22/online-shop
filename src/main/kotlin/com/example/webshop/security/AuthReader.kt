package com.example.webshop.security

import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.stereotype.Component

@Component
class AuthReader(private val tokenStore: TokenStore) {

    fun id(auth: OAuth2Authentication) = extraInfo(auth).userId

    fun extraInfo(auth: OAuth2Authentication): AdditionalTokenInfo {
        val details = auth.details as OAuth2AuthenticationDetails
        val accessToken = tokenStore.readAccessToken(details.tokenValue)
        return AdditionalTokenInfo(accessToken.additionalInformation)
    }
}
