package com.example.webshop.service

import com.example.webshop.entity.Category
import com.example.webshop.repository.CategoryRepository
import org.springframework.stereotype.Service

@Service
class CategoryService(private val categoryRepository: CategoryRepository) {

    fun findAll() = categoryRepository.findByParentCategoryIsNull()

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
        val category: Category = categoryRepository.findById(id).get()
        if (category.subcategories.isNotEmpty()) {
            error("Cannot delete category with subcategories")
        }
        categoryRepository.delete(category)
    }

    fun update(id: Long, parentCategoryId: String?, categoryNewName: String) {
        val category: Category = categoryRepository.findById(id).get()
        val forbiddenCategories: Set<Category> = getForbiddenParentCategories(category)
        var newParent: Category? = null
        if (!parentCategoryId.isNullOrEmpty()) {
            newParent = categoryRepository.findById(parentCategoryId!!.toLong()).get()
            if (forbiddenCategories.contains(newParent)) {
                error("Cannot set parent category to subcategory")
            }
        }
        val updated = category.copy(name = categoryNewName, parentCategory = newParent)
        categoryRepository.save(updated)
    }

    private fun getForbiddenParentCategories(category: Category): Set<Category> {
        val forbiddenParentCategories: MutableSet<Category> = mutableSetOf()
        for (c in category.subcategories) {
            forbiddenParentCategories.add(c)
            forbiddenParentCategories.addAll(getForbiddenParentCategories(c))
        }
        return forbiddenParentCategories
    }

}