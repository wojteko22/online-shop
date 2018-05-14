package com.example.webshop.security


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.provider.token.*
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore

@Configuration
@EnableAuthorizationServer
class AuthorizationServer : AuthorizationServerConfigurerAdapter() {

    @Autowired
    private lateinit var authenticationManager: AuthenticationManager

    override fun configure(clients: ClientDetailsServiceConfigurer) {
        clients.inMemory()
                .withClient("angularApp")
                .secret("BardzoSilneHaslo2018")
                .authorizedGrantTypes("refresh_token", "password")
                .scopes("read", "write", "trust")
                .accessTokenValiditySeconds(3600)
    }

    @Bean
    fun userDetailsService(): UserDetailsService = CustomUserDetailsService()

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun authProvider() = DaoAuthenticationProvider().apply {
        setUserDetailsService(userDetailsService())
        setPasswordEncoder(passwordEncoder())
    }

    @Bean
    @Primary
    fun tokenServices(): AuthorizationServerTokenServices = DefaultTokenServices().apply {
        setTokenStore(tokenStore())
        setSupportRefreshToken(true)
    }

    override fun configure(endpoints: AuthorizationServerEndpointsConfigurer) {
        val tokenEnhancerChain = TokenEnhancerChain().apply {
            setTokenEnhancers(
                    listOf(tokenEnhancer(), accessTokenConverter())
            )
        }
        endpoints
                .tokenStore(tokenStore())
                .tokenEnhancer(tokenEnhancerChain)
                .authenticationManager(authenticationManager)
                .userDetailsService(userDetailsService())
    }

    @Bean
    fun tokenStore(): TokenStore = JwtTokenStore(accessTokenConverter())

    @Bean
    fun accessTokenConverter() = JwtAccessTokenConverter().apply {
        setSigningKey("123")
    }

    @Bean
    fun tokenEnhancer(): TokenEnhancer = CustomTokenEnhancer()
}
