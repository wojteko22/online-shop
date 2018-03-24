package com.example.webshop.entity

import javax.persistence.*

@Entity
@Embeddable
@Table(name = "shops")
data class Shop(
        val name: String,
        val city: String,
        val street: String,
        val postCode: String,
        @OneToOne(cascade = [CascadeType.ALL])
        @JoinColumn(name = "owner_id")
        val user: User,
        @OneToMany(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        val sellers: MutableSet<User> = HashSet(),
        @Id @GeneratedValue
        val id: Long = -1
)

