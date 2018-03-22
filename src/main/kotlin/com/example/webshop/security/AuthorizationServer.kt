package com.example.webshop.security


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer

@EnableAuthorizationServer
@Configuration
class AuthorizationServer() : AuthorizationServerConfigurerAdapter() {

    private val expiration: Int = 3600

    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Bean
    fun userDetailsService(): UserDetailsService = CustomUserDetailsService()

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun authProvider(): DaoAuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setUserDetailsService(userDetailsService())
        authProvider.setPasswordEncoder(passwordEncoder())
        return authProvider
    }


    override fun configure(security: AuthorizationServerSecurityConfigurer?) {
    }

    override fun configure(clients: ClientDetailsServiceConfigurer) {
        clients.inMemory()
                .withClient("angularApp").secret("BardzoSilneHaslo2018").accessTokenValiditySeconds(expiration)
                .scopes("read", "write", "trust")
                .authorizedGrantTypes("refresh_token", "password")
//                .resourceIds("resource")
    }

    override fun configure(endpoints: AuthorizationServerEndpointsConfigurer) {
        endpoints.userDetailsService(userDetailsService())
        endpoints.authenticationManager(authenticationManager)
    }


}