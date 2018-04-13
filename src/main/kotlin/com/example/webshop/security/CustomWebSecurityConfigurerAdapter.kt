package com.example.webshop.security

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

//@Configuration // todo: Jak się odkomentuje, to można podejrzeć h2, ale front wtedy nie działa
class CustomWebSecurityConfigurerAdapter : WebSecurityConfigurerAdapter() {

    override fun configure(web: WebSecurity) {
        web
                .ignoring().antMatchers("/h2/**")
    }
}
