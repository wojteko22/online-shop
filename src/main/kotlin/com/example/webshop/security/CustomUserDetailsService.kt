package com.example.webshop.security

import com.example.webshop.entity.User
import com.example.webshop.entity.UserRole
import com.example.webshop.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.GrantedAuthority
import org.springframework.stereotype.Service
import java.util.HashSet

@Service
class CustomUserDetailsService : UserDetailsService {

    @Autowired
    lateinit var userRepository: UserRepository

    override fun loadUserByUsername(userEmail: String): UserDetails {
        val user: User = userRepository.findByEmail(userEmail) ?: error("Username not found")
        return org.springframework.security.core.userdetails.User(
                user.email,
                user.password,
                convertAuthorities(user.role))
    }

    private fun convertAuthorities(userRole: UserRole): Set<GrantedAuthority> {
        val authorities = HashSet<GrantedAuthority>()
        authorities.add(SimpleGrantedAuthority(userRole.role))
        return authorities
    }
}