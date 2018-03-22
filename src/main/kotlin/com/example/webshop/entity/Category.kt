package com.example.webshop.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import javax.persistence.*

@Entity
@Table(name = "categories")
@JsonIgnoreProperties("parentCategory")
data class Category(
        val name: String,
        @ManyToOne @JoinColumn(name = "parent_category_id", referencedColumnName = "id")
        val parentCategory: Category? = null,
        @Id @GeneratedValue
        val id: Long = 0
) {

    @OneToMany(mappedBy = "parentCategory")
    val subcategories = setOf<Category>()
}
