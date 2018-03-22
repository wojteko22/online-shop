package com.example.webshop.entity

import org.hibernate.annotations.Cascade
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
    @OneToMany(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    val vendors: MutableSet<User> = HashSet(),
    @Id @GeneratedValue
    val id: Long = -1
)

