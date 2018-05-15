package com.example.webshop.security

import com.example.webshop.entity.Role
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.stereotype.Component

@Component
class Guard(private val tokenStore: TokenStore) {

    fun checkShopId(shopId: Long, auth: OAuth2Authentication) {
        val currentUserShopId = (extraInfo(auth).shopId as Int?)?.toLong()
        if (shopId != currentUserShopId) {
            ensureAdmin(auth, "User with shop $currentUserShopId does not have access to shop $shopId")
        }
    }

    fun checkUserId(id: Long, auth: OAuth2Authentication) {
        val currentUserId = extraInfo(auth).userId
        if (id != currentUserId) {
            ensureAdmin(auth, "User $currentUserId does not have access to resources of user $id")
        }
    }

    private fun extraInfo(auth: OAuth2Authentication): AdditionalTokenInfo {
        val details = auth.details as OAuth2AuthenticationDetails
        val accessToken = tokenStore.readAccessToken(details.tokenValue)
        return AdditionalTokenInfo(accessToken.additionalInformation)
    }

    fun ensureAdmin(auth: OAuth2Authentication, message: String = "Current user is not admin") {
        if (auth.authorities.first().authority != Role.ADMIN.name) {
            throw IllegalAccessException(message)
        }
    }
}
