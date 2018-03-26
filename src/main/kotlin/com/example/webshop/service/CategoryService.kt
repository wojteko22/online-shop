package com.example.webshop.service

import com.example.webshop.entity.Category
import com.example.webshop.entity.dto.CategoryDto
import com.example.webshop.repository.CategoryRepository
import com.example.webshop.repository.ShopRepository
import org.springframework.stereotype.Service

@Service
class CategoryService(private val categoryRepository: CategoryRepository, private val shopRepository: ShopRepository) {

    fun save(categoryWithoutParent: Category, parentCategoryId: String) {
        val categoryToSave = categoryToSave(categoryWithoutParent, parentCategoryId)
        categoryRepository.save(categoryToSave)
    }

    private fun categoryToSave(categoryWithoutParent: Category, parentCategoryId: String) =
            if (!parentCategoryId.isEmpty()) {
                val parentCategory: Category = categoryRepository.getOne(parentCategoryId.toLong())
                categoryWithoutParent.copy(parentCategory = parentCategory)
            } else {
                categoryWithoutParent
            }

    fun deleteById(id: Long) {
        val category: Category = categoryRepository.findById(id)
        if (category.subcategories.isNotEmpty()) {
            error("Cannot delete category with subcategories")
        }
        categoryRepository.delete(category)
    }

    fun update(id: Long, parentCategoryId: String?, categoryNewName: String) {
        val category: Category = categoryRepository.findById(id)
        val newParentOrNull = newParentOrNull(parentCategoryId, category)
        val updated = category.copy(name = categoryNewName, parentCategory = newParentOrNull)
        categoryRepository.save(updated)
    }

    private fun newParentOrNull(parentCategoryId: String?, category: Category): Category? =
            if (parentCategoryId.isNullOrEmpty()) {
                null
            } else {
                newParent(parentCategoryId!!, category)
            }

    private fun newParent(parentCategoryId: String, category: Category): Category {
        val newParent = categoryRepository.findById(parentCategoryId.toLong())
        val forbiddenCategories = getForbiddenParentCategories(category)
        if (forbiddenCategories.contains(newParent)) {
            error("Cannot set parent category to subcategory")
        }
        return newParent
    }

    private fun getForbiddenParentCategories(category: Category): Set<Category> =
            category.subcategories + category.subcategories.flatMap { getForbiddenParentCategories(it) }

    fun findByShopId(shopId: Long): Iterable<CategoryDto> {
        val shop = shopRepository.findById(shopId)!!
        val categories = categoryRepository.findByShop(shop)
        return toCategoryDto(categories)
    }

    private fun toCategoryDto(categories: Iterable<Category>): MutableList<CategoryDto> {
        val categoriesDto: MutableSet<CategoryDto> = mutableSetOf<CategoryDto>()
        categories.forEach { categoriesDto.add(CategoryDto(it.name,it.parentCategory?.id,it.id, mutableSetOf())) }

        for (categoryDto1 in categoriesDto){
            for (categoryDto2 in categoriesDto){
                if (categoryDto1.parentCategory==categoryDto2.id){
                    categoryDto2.subcategories.add(categoryDto1)
                }
            }
        }
        val categoryDtoDistinct = mutableListOf<CategoryDto>()
        categoriesDto.forEach { if (it.parentCategory==null) categoryDtoDistinct.add(it) }
        return categoryDtoDistinct
    }

}
