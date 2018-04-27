package com.example.webshop.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import javax.persistence.*

@Entity
@Embeddable
@Table(name = "shops")
@JsonIgnoreProperties("user")
data class Shop(
        val name: String,
        val city: String,
        val street: String,
        val postCode: String,
        @OneToOne(cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        @JoinColumn(name = "owner_id")
        val user: User,
        @OneToMany(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        val sellers: MutableSet<User> = HashSet(),
        @Id @GeneratedValue
        val id: Long = -1
)
