package com.example.webshop.security

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter


@EnableResourceServer
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
class ResourceServer : ResourceServerConfigurerAdapter() {

    /*
    TODO Zapezpieczyć endpointy
    /oauth/token musi być publiczny

     */

    override fun configure(http: HttpSecurity) {
        http
                .authorizeRequests()
                //TODO zabezpieczyć endpointy
                .antMatchers("/oauth/token").permitAll()
                .antMatchers("/user","/users/*/isActivated", "/user/activate/*", "/user/shop", "/user/vendor", "/shops").permitAll()
                .antMatchers(
                        "/products",
                        "/products/shop/*", "/products/*",
                        "/products/category/*",
                        "/products/").permitAll()
                .anyRequest().authenticated()
    }
}
