package com.example.webshop.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@EnableResourceServer
public class ResourceServer extends WebSecurityConfigurerAdapter{

    /*
    TODO Zapezpieczyć endpointy
    /oauth/token musi być publiczny
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("*")
                .permitAll();
    }
}
