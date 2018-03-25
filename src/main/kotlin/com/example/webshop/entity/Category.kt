package com.example.webshop.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import javax.persistence.*

@Entity
@Table(name = "categories")
@JsonIgnoreProperties("name","shop","parentCategory","id")
data class Category(
        val name: String,
        @ManyToOne @JoinColumn(name = "shop_id")
        val shop: Shop,
        @ManyToOne @JoinColumn(name = "parent_category_id")
        val parentCategory: Category? = null,
        @Id @GeneratedValue
        val id: Long = 0
) {

    @OneToMany(mappedBy = "parentCategory")
    val subcategories = setOf<Category>()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Category

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }


}
