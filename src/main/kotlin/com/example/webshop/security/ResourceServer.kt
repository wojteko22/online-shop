package com.example.webshop.security

import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer

@EnableResourceServer
class ResourceServer : WebSecurityConfigurerAdapter() {

    /*
    TODO Zapezpieczyć endpointy
    /oauth/token musi być publiczny

     */
    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.authorizeRequests()
                .antMatchers("*")
                .permitAll()
    }
}
