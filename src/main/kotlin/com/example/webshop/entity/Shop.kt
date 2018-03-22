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
    @OneToOne
    @JoinColumn(name = "owner_id")
    val user: User,
    @OneToMany
    val vendors: MutableSet<User> = HashSet<User>(),
    @Id @GeneratedValue
    val id: Long = -1
)

