package com.example.webshop.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "categories") // todo: Możemy tak robić, ale musi być spójnie (Shop nie został zmieniony)
@JsonIgnoreProperties("parentCategory")
class Category(
        var name: String,
        @ManyToOne
        @JoinColumn(name = "parent_category_id", referencedColumnName = "id")
        var parentCategory: Category? = null
) {

    @Id
    @GeneratedValue
    var id: Long = 0

    @OneToMany(mappedBy = "parentCategory")
    var subcategories: Set<Category>? = null // todo: Czemu null a nie pusty zbiór? Nie lepiej typ Collection albo Iterable?

    override fun equals(o: Any?): Boolean {
        if (this === o) return true
        if (o !is Category) return false
        val category = o as Category?
        return id == category!!.id
    }

    override fun hashCode(): Int {
        return Objects.hash(id)
    }
}