package com.example.webshop.dto

class CategoryDto(
        val name: String,
        val parentCategory: Long?,
        val id: Long = 0,
        val subcategories: MutableSet<CategoryDto>
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CategoryDto

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}

class CategorySimpleDto(val name: String,
                        val categoryId: Long,
                        val parentCategoryId: Long?
)

class CreateCategoryDto(val name: String,
                        val shopId: Long,
                        val parentCategoryId: Long?
)

class UpdateCategoryDto(val newName: String, val parentId: Long?)